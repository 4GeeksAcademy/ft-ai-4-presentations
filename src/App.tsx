import { CourseHome } from './components/CourseHome'
import { PresenterConsole } from './components/PresenterConsole'
import { RevealDeck } from './components/RevealDeck'
import { getLecture, lectureIdFromSearch } from './lectures'
import './theme/deck.css'

function wantsPresenter(search = window.location.search): boolean {
  return new URLSearchParams(search).get('presenter') === '1'
}

/**
 * Shell: course home, local presenter console, or one lecture from `?lecture=<id>`.
 * To add a lecture: create `src/lectures/<id>.tsx`, register it in `src/lectures/index.tsx`.
 */
function App() {
  if (wantsPresenter()) {
    return <PresenterConsole />
  }

  const lectureId = lectureIdFromSearch()

  if (!lectureId) {
    return <CourseHome />
  }

  const lecture = getLecture(lectureId)

  return <RevealDeck lectureId={lecture.id}>{lecture.render()}</RevealDeck>
}

export default App
