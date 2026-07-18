export type User = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'student' | 'admin';
}