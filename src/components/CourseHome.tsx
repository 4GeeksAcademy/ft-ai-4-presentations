import { listLectures } from '../lectures'
import './CourseHome.css'

function hrefForLecture(lectureId: string): string {
  const params = new URLSearchParams(window.location.search)
  params.set('lecture', lectureId)
  params.delete('print-pdf')
  const query = params.toString()
  return `${import.meta.env.BASE_URL}${query ? `?${query}` : ''}`
}

/**
 * Course entry: pick a lecture. Query-param routing stays compatible with GitHub Pages.
 */
export function CourseHome() {
  const lectures = listLectures()

  return (
    <main className="course-home">
      <header className="course-home__header">
        <p className="course-home__eyebrow">FT-AI-4</p>
        <h1>Presentations</h1>
        <p className="course-home__lede">
          Choose a lecture. Use multiplex query params on the same URL for live
          follow-along.
        </p>
      </header>

      <ul className="course-home__list">
        {lectures.map((lecture) => (
          <li key={lecture.id}>
            <a className="course-home__link" href={hrefForLecture(lecture.id)}>
              <span className="course-home__title">{lecture.title}</span>
              <span className="course-home__summary">{lecture.summary}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="course-home__hint">
        PDF: open a lecture and add <code>?print-pdf</code>, then print. Notes: press{' '}
        <kbd>S</kbd> in a deck.
      </p>
    </main>
  )
}
