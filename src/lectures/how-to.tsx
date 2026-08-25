/**
 * Operator-oriented sample lecture (second deck for the course picker).
 */
export function HowToLecture() {
  return (
    <>
      <section>
        <h1>How to present</h1>
        <p>Live session checklist</p>
        <aside className="notes">
          Walk through this before class once so the multiplex token flow is familiar.
        </aside>
      </section>

      <section>
        <h2>Audience</h2>
        <p>
          Pages URL with <code>?lecture=how-to&amp;id=…</code>
        </p>
        <aside className="notes">
          Share the client URL only — never the master secret.
        </aside>
      </section>

      <section>
        <h2>Presenter</h2>
        <ul>
          <li className="fragment">
            <code>npm run dev</code> locally
          </li>
          <li className="fragment">
            <code>?role=master&amp;secret=…</code>
          </li>
          <li className="fragment">Press S for speaker notes</li>
        </ul>
      </section>

      <section>
        <h2>PDF export</h2>
        <p>
          Add <code>?print-pdf</code> and print from the browser
        </p>
        <aside className="notes">
          Example: ?lecture=how-to&print-pdf — then Ctrl/Cmd+P → Save as PDF.
        </aside>
      </section>
    </>
  )
}
