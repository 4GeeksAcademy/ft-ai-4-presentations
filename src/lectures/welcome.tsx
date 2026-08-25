/**
 * Sample lecture — proves horizontal slides, a vertical stack, and fragments.
 */
export function WelcomeLecture() {
  return (
    <>
      <section>
        <h1>FT-AI-4</h1>
        <p>Presentations for an online course</p>
      </section>

      <section>
        <h2>What this is</h2>
        <ul>
          <li className="fragment">reveal.js for navigation</li>
          <li className="fragment">React + TypeScript for content</li>
          <li className="fragment">GitHub Pages for hosting</li>
        </ul>
      </section>

      <section>
        <section>
          <h2>Vertical stack</h2>
          <p>Down for detail · Up to return</p>
        </section>
        <section>
          <h3>Deeper slide</h3>
          <p>Nested sections become a vertical deck.</p>
        </section>
      </section>

      <section>
        <h2>Next</h2>
        <p>Deploy to Pages, then wire multiplex for live follow-along.</p>
      </section>
    </>
  )
}
