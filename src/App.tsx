import { CourseHome } from './components/CourseHome'
import { RevealDeck } from './components/RevealDeck'
import { getLecture, lectureIdFromSearch } from './lectures'
import './theme/deck.css'

/**
 * Shell: course home, or one lecture from `?lecture=<id>`.
 * To add a lecture: create `src/lectures/<id>.tsx`, register it in `src/lectures/index.tsx`.
 */
function App() {
  const lectureId = lectureIdFromSearch()

  if (!lectureId) {
    return <CourseHome />
  }

  const lecture = getLecture(lectureId)

  return <RevealDeck lectureId={lecture.id}>{lecture.render()}</RevealDeck>
}

export default App
