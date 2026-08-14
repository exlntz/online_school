export interface SubjectState {
    subject: string;
}

export interface SubjectActions {
    setSubject: (id: string) => void;
}

export interface SubjectStore extends SubjectState {
    actions: SubjectActions;
}