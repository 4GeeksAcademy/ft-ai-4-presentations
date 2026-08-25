import { RevealDeck } from './components/RevealDeck'
import { defaultLectureId, getLecture } from './lectures'
import './theme/deck.css'

/**
 * Shell: loads one lecture from the registry.
 * To add a lecture: create `src/lectures/<id>.tsx`, register it in `src/lectures/index.ts`.
 */
function App() {
  const lecture = getLecture(defaultLectureId)

  return <RevealDeck lectureId={lecture.id}>{lecture.render()}</RevealDeck>
}

export default App
