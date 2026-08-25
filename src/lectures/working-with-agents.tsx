/**
 * Sample lecture — proves horizontal slides, a vertical stack, fragments, and notes.
 */
export function WorkingWithAgentsLecture() {
  return (
    <>
      <section>
        <h1>Working With Coding Agents</h1>
        <h3>Coming Up:</h3>
        <ul>
          <li>Introduction to AI-assisted development</li>
          <li>Agent work modes</li>
          <li>Structured Formats</li>
          <li>Setting up the milestone project</li>
        </ul>
        <aside className="notes"></aside>
      </section>

      <section>
        <h2>Introduction to AI-assisted development</h2>
        <ul>
          <li>Copilot setup</li>
          <li>4Geeks extension</li>
        </ul>
        <aside className="notes"></aside>
      </section>

      <section>
        <h2>Agent Work Modes</h2>
        <ul>
          <li>Ask</li>
          <li>Plan</li>
          <li>Agent</li>
        </ul>
        <aside className="notes"></aside>
      </section>

      <section>
        <h2>Structured Formats</h2>
        <ul>
          <li>
            <a
              href="https://www.json.org/json-en.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              JSON
            </a>
            /
            <a
              href="https://yaml.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              YAML
            </a>
          </li>
          <li>
            <a
              href="https://www.markdownguide.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Markdown
            </a>
          </li>
          <li>
            <a
              href="https://toonformat.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TOON Format
            </a>
          </li>
        </ul>
        <aside className="notes"></aside>
      </section>

      <section>
        <section>
          <h2>Setting up the milestone project</h2>
          <aside className="notes"></aside>
        </section>

        <section>
          <ul>
            <li>
              Use this repo as a template:{" "}
              <a
                href="https://github.com/4GeeksAcademy/ai-engineering-company-project-monorepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/4GeeksAcademy/ai-engineering-company-project-monorepo
              </a>
            </li>
            <li>Make sure to set 4Geeks as the owner of the repo</li>
            <li>
              Set the name to "&lt;your github username&gt;-milestone-project"
              or similar .
            </li>
          </ul>
        </section>

        <section>
          <ul>
            <li>Either clone the repo locally or start a codespace.</li>
            <li>
              Pick one of the companies from the contexts here:{" "}
              <a
                href="https://github.com/4GeeksAcademy/ai-engineering-syllabus/tree/main/content/contexts/00-general-contexts"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/4GeeksAcademy/ai-engineering-syllabus/tree/main/content/contexts/00-general-contexts
              </a>
            </li>
            <li>
              Add the context to your project (There will be more added later,
              and we'll talk about how to organize them tomorrow.)
            </li>
          </ul>
        </section>
      </section>

      <section>
        <h1>For next class:</h1>
        <ul>
          <li>Work on practices in the "CONTEXT ENGINEERING" module</li>
          <li>
            We'll start talking about memory banks and how you can build them.
          </li>
        </ul>
      </section>
    </>
  );
}
