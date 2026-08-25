import type { ReactNode } from 'react'
import { WelcomeLecture } from './welcome'

export type Lecture = {
  id: string
  title: string
  render: () => ReactNode
}

/**
 * Lecture registry.
 * Add a lecture: create `./<id>.tsx` exporting a component of `<section>` trees,
 * then add an entry below.
 */
export const lectures: Record<string, Lecture> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    render: () => <WelcomeLecture />,
  },
}

export const defaultLectureId = 'welcome'

export function getLecture(id: string): Lecture {
  const lecture = lectures[id]
  if (!lecture) {
    throw new Error(`Unknown lecture: ${id}`)
  }
  return lecture
}
