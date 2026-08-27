import type { ReactNode } from "react";
import { HowToLecture } from "./how-to";
import { WelcomeLecture } from "./welcome";
import { WorkingWithAgentsLecture } from "./working-with-agents";
import { IntrospectionLecture } from "./introspection";

export type Lecture = {
  id: string;
  title: string;
  summary: string;
  render: () => ReactNode;
};

/**
 * Lecture registry.
 * Add a lecture: create `./<id>.tsx` exporting a component of `<section>` trees,
 * then add an entry below.
 */
export const lectures: Record<string, Lecture> = {
  welcome: {
    id: "welcome",
    title: "Welcome",
    summary: "What this SPA is and how slides work",
    render: () => <WelcomeLecture />,
  },
  "how-to": {
    id: "how-to",
    title: "How to present",
    summary: "Local master, Pages audience, notes, and PDF",
    render: () => <HowToLecture />,
  },
  "working-with-agents": {
    id: "working-with-agents",
    title: "Working With Coding Agents",
    summary: "Introduction to AI-assisted development",
    render: () => <WorkingWithAgentsLecture />,
  },
  introspection: {
    id: "introspection",
    title: "Introspection",
    summary: "How to use an agent to understand a codebase",
    render: () => <IntrospectionLecture />,
  },
};

export function listLectures(): Lecture[] {
  return Object.values(lectures);
}

export function getLecture(id: string): Lecture {
  const lecture = lectures[id];
  if (!lecture) {
    throw new Error(`Unknown lecture: ${id}`);
  }
  return lecture;
}

/** Read `?lecture=` from the current URL (Pages-friendly; no path router). */
export function lectureIdFromSearch(
  search = window.location.search,
): string | null {
  const id = new URLSearchParams(search).get("lecture")?.trim();
  return id && id in lectures ? id : null;
}
