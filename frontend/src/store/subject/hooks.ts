import { subjectActionsSelector, subjectSelector } from "./selectors";
import { useSubjectStore } from "./subjectStore";
import type { SubjectStore } from "./types";


export const useSubject = (): SubjectStore['subject'] => 
    useSubjectStore(subjectSelector)

export const useSubjectActions = (): SubjectStore['actions'] => 
    useSubjectStore(subjectActionsSelector)