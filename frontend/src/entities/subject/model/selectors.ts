import type { SubjectStore } from "./types";

export const subjectSelector = (state: SubjectStore) => state.subject;

export const subjectActionsSelector = (state: SubjectStore) => state.actions;