export type TaskItem = {
    title: string;
    total: number;
    solved: number;
};

export type TaskModel = {
    number: string;
    title: string;
    meta: string;
    topics: TaskItem[];
};