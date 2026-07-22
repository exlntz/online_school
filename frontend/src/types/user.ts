export type Role = 'student' | 'parent'

export type User = {
    id: number;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    role: Role | 'admin';
}
