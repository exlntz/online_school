export type HomeworkStatus = 'current' | 'done' | 'overdue';

export type HomeworkModel = {
    title: string;
    topic: string;
    deadline: string;
    progress: string;
    status: HomeworkStatus;
};