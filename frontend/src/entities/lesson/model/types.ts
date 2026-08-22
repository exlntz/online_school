export type LessonModel = {
    id: string;
    title: string;
    moduleNumber: number;
    moduleTopic: string;
    lessonNumber: number;
    lessonTotal: number;
    duration: number; 
    isWebinar?: boolean; 
}