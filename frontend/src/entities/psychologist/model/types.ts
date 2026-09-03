export type PsychologistModel = {
    id: string;
    name: string;
    photo: string;
    rating: number;
    reviews: number;
    bio: string;
    tags: string[];
};

export type PsychologistNoteModel = {
    id: number;
    date: string;
    text: string;
};