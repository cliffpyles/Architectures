#!/usr/bin/env node
// Render a diagram to temp files for preview, or promote temp files.
//
// Usage:
//   node tools/render.mjs <input>            Render <input> to temp files.
//   node tools/render.mjs --promote <base>   Move <base>.tmp.excalidraw and
//                                            <base>.tmp.svg to their permanent
//                                            names and delete the other temp files.
//
// <input> is one of:
//   <base>.tmp.json         Array of Excalidraw element skeletons
//                           (the format the Excalidraw MCP tool accepts).
//   <base>.excalidraw       Excalidraw file.
//   <base>.tmp.excalidraw   Excalidraw file.
//
// Render writes, next to the input:
//   <base>.tmp.excalidraw   Excalidraw file (only when the input is .tmp.json)
//   <base>.tmp.svg          Export
//   <base>.tmp.png          Preview of the export, scaled to fit 1600x1200
//
// Rendering runs headless Chrome and loads the Excalidraw library from a CDN.
// It stops Chrome and fails if it has not finished within 12 seconds.

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const EXCALIDRAW = "https://esm.sh/@excalidraw/excalidraw@0.18.0";
const PSEUDO_ELEMENTS = new Set(["cameraUpdate", "restoreCheckpoint", "delete"]);
const SUFFIXES = [".tmp.json", ".tmp.excalidraw", ".excalidraw"];
const TIMEOUT_MS = 12000;
const PREVIEW = { width: 1600, height: 1200 };

const page = (input) => `<!doctype html>
<meta charset="utf-8">
<style>
  html, body { margin: 0; background: #fff; }
  #view svg { width: 100vw; height: 100vh; display: block; }
</style>
<div id="view"></div>
<script type="application/json" id="input">${JSON.stringify(input).replaceAll("</", "<\\/")}</script>
<script type="module">
  window.renderResult = (async () => {
    const E = await import("${EXCALIDRAW}");
    const input = JSON.parse(document.getElementById("input").textContent);
    const isSkeleton = Array.isArray(input);
    let elements = input.elements;
    if (isSkeleton) {
      // A label joins the group of the shape it is bound to, so the shape moves as one piece.
      const converted = E.convertToExcalidrawElements(input, { regenerateIds: false });
      const groupsById = new Map(converted.map((e) => [e.id, e.groupIds]));
      elements = converted.map((e) =>
        e.type === "text" && e.containerId ? { ...e, groupIds: groupsById.get(e.containerId) || [] } : e,
      );
    }
    const files = isSkeleton ? {} : input.files || {};
    const svg = await E.exportToSvg({
      elements,
      files,
      exportPadding: 24,
      appState: {
        exportBackground: true,
        exportWithDarkMode: false,
        exportEmbedScene: false,
        viewBackgroundColor: "#ffffff",
      },
    });
    const scene = {
      type: "excalidraw",
      version: 2,
      source: "architectures",
      elements,
      appState: { viewBackgroundColor: "#ffffff", gridSize: null },
      files,
    };
    const result = JSON.stringify({ svg: new XMLSerializer().serializeToString(svg), scene });
    document.getElementById("view").appendChild(svg);
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 300));
    return result;
  })();
</script>
`;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function splitBase(file) {
  const suffix = SUFFIXES.find((s) => file.endsWith(s));
  if (!suffix) fail(`Unsupported input: ${file}. Expected one of ${SUFFIXES.join(", ")}`);
  return { base: file.slice(0, -suffix.length), suffix };
}

async function connect(chrome) {
  const url = await new Promise((resolve, reject) => {
    let stderr = "";
    chrome.stderr.on("data", (chunk) => {
      stderr += chunk;
      const match = stderr.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) resolve(match[1]);
    });
    chrome.on("exit", () => reject(new Error("Chrome exited before it was ready.")));
  });
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = () => reject(new Error("Could not connect to Chrome."));
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    } else if (listeners.has(message.method)) {
      listeners.get(message.method)(message.params);
      listeners.delete(message.method);
    }
  };
  return {
    send: (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      }),
    once: (method) => new Promise((resolve) => listeners.set(method, resolve)),
    close: () => socket.close(),
  };
}

async function render(file) {
  const { base, suffix } = splitBase(file);
  let input = JSON.parse(readFileSync(file, "utf8"));
  if (suffix === ".tmp.json") input = input.filter((e) => !PSEUDO_ELEMENTS.has(e.type));

  const work = mkdtempSync(path.join(tmpdir(), "render-"));
  const pagePath = path.join(work, "render.html");
  writeFileSync(pagePath, page(input));

  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--remote-debugging-port=0",
      `--user-data-dir=${path.join(work, "profile")}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  const cleanUp = () => {
    chrome.kill("SIGKILL");
    rmSync(work, { recursive: true, force: true });
  };
  const timer = setTimeout(() => {
    cleanUp();
    fail(`Render did not finish within ${TIMEOUT_MS / 1000} s. Chrome was stopped.`);
  }, TIMEOUT_MS);

  try {
    const cdp = await connect(chrome);
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      { ...PREVIEW, deviceScaleFactor: 1, mobile: false },
      sessionId,
    );
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: pathToFileURL(pagePath).href }, sessionId);
    await loaded;
    const evaluation = await cdp.send(
      "Runtime.evaluate",
      { expression: "window.renderResult", awaitPromise: true, returnByValue: true },
      sessionId,
    );
    if (evaluation.exceptionDetails) {
      const { exception, text } = evaluation.exceptionDetails;
      throw new Error(`Render failed in the page: ${exception?.description || text}`);
    }
    const { svg, scene } = JSON.parse(evaluation.result.value);
    const screenshot = await cdp.send("Page.captureScreenshot", { format: "png" }, sessionId);
    cdp.close();

    const written = [];
    if (suffix === ".tmp.json") {
      writeFileSync(`${base}.tmp.excalidraw`, JSON.stringify(scene, null, 2) + "\n");
      written.push(`${base}.tmp.excalidraw`);
    }
    writeFileSync(`${base}.tmp.svg`, svg);
    writeFileSync(`${base}.tmp.png`, Buffer.from(screenshot.data, "base64"));
    written.push(`${base}.tmp.svg`, `${base}.tmp.png`);
    console.log(written.join("\n"));
  } catch (error) {
    clearTimeout(timer);
    cleanUp();
    fail(error.message);
  }
  clearTimeout(timer);
  cleanUp();
}

function promote(base) {
  const scene = `${base}.tmp.excalidraw`;
  const svg = `${base}.tmp.svg`;
  if (!existsSync(svg)) fail(`Missing ${svg}. Render before promoting.`);
  if (existsSync(scene)) renameSync(scene, `${base}.excalidraw`);
  else if (!existsSync(`${base}.excalidraw`)) fail(`Missing ${scene} and ${base}.excalidraw.`);
  renameSync(svg, `${base}.svg`);
  for (const suffix of [".tmp.json", ".tmp.png"]) rmSync(base + suffix, { force: true });
  console.log(`${base}.excalidraw\n${base}.svg`);
}

const args = process.argv.slice(2);
if (args.length === 2 && args[0] === "--promote") promote(args[1]);
else if (args.length === 1 && !args[0].startsWith("-")) await render(args[0]);
else fail("Usage: node tools/render.mjs <input> | --promote <base>");
