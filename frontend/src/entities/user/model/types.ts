export type Role = 'student' | 'parent'

export type User = {
    id: number;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    role: Role | 'admin';
}

export type UserDto = {
    id: number;
    first_name: string;
    last_name?: string;
    phone_number: string;
    role: Role;
}