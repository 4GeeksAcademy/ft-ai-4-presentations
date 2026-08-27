/**
 * Sample lecture — proves horizontal slides, a vertical stack, fragments, and notes.
 */
export function IntrospectionLecture() {
  return (
    <>
      <section>
        <h1>Introspection</h1>
        <h3>Coming Up:</h3>
        <ul>
          <li>Memory bank review</li>
          <li>How to use an agent to understand a codebase</li>
        </ul>
        <aside className="notes"></aside>
      </section>

      <section>
        <h2>Memory bank review</h2>
        <ul>
          <li>Why do we use memory banks?</li>
          <li>What kind of information can we store in a memory bank?</li>
          <li>Why not just prompt?</li>
        </ul>
      </section>

      <section>
        <h2>Introspection Demo</h2>
        <ul>
          <li>
            Warning: I wrote this codebase in a hurry for a friend, and it's{" "}
            <em>very rough</em> (because it wasn't meant for heavy use)
          </li>
        </ul>
      </section>

      <section>
        <h2>By Monday:</h2>
        <ul>
          <li>
            Finish uyp the "Building context from an existing project" project.
          </li>
          <li>
            Start working on the practices and readings for the "SPEC-DRIVEN
            DEVELOPMENT" module.
          </li>
        </ul>
      </section>
    </>
  );
}
