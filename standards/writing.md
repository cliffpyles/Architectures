# Writing standard

Applies to every README, diagram label, note and commit message in this repository.

## Rules

1. **State the point first.** Lead each section with its conclusion. Supporting detail follows.
2. **One idea per sentence.** Split a sentence that needs more than one comma to hold together.
3. **Use the specific term.** Write "the primary database", not "the data layer". Use one name per thing throughout a module.
4. **Name the role, not the product.** Write "object storage", not a vendor's service name. Name a product, vendor or protocol only when a requirement fixes it.
5. **Quantify.** Write "p99 under 200 ms", not "fast". If no number exists, say so.
6. **Use active voice and present tense.** "The CDN fetches from object storage."
7. **Remove words that carry no information.** Delete a word if the sentence means the same without it.
8. **State trade-offs neutrally.** Give what a choice costs next to what it provides.
9. **Separate fact, decision and assumption.** Label assumptions as assumptions.
10. **Define each abbreviation on first use** in a module, except those in the list below.
11. **Prefer a table or list** when items share the same attributes. Prefer prose for reasoning.

Abbreviations that need no definition: API, CDN, CPU, DNS, HTTP, HTTPS, ID, JSON, SQL, TLS, URL.

## Do not use

| Category | Examples | Use instead |
|---|---|---|
| Minimizers | simply, just, easily, obviously, of course, trivial | Delete |
| Promotional terms | robust, seamless, powerful, best-in-class, cutting-edge, elegant, modern | The measurable property |
| Vague quantities | fast, scalable, highly available, large, many, some | A number and a unit |
| Filler | in order to, it should be noted that, basically, actually, very, really | Delete, or "to" |
| Hedges without content | might possibly, should probably, fairly, somewhat | The condition under which it holds |
| Presumed conclusions | the right choice, the only option, clearly better | The criteria and how each option scores |
| Unattributed claims | industry standard, best practice, widely used | The named standard or source |

## Examples

| Do not write | Write |
|---|---|
| We simply put a CDN in front for great performance. | The CDN serves cached content. Target: p95 time to first byte under 100 ms. |
| The system is highly scalable. | The read path handles 5,000 requests per second. The CDN and object storage scale without configuration changes. |
| A cache is obviously unnecessary here. | No cache. Readers do not reach the CMS, so a cache would serve editor traffic only (under 10 requests per second). |
| CDC is the best way to publish. | CDC publishes content. It decouples publishing from the CMS. Cost: publishing is asynchronous, with a delay of up to 5 s. |
