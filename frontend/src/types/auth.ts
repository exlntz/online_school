import type { Role } from "./user";


export type AuthMode = 'login' | 'register';

export type AuthValues = {
    firstName?: string;
    phoneNumber: string;
    role?: Role;
}

export type SendCodePayload = AuthValues;

export type VerifyCodePayload = AuthValues & {
    code: string;
}

export type UserDto = {
    id: number;
    first_name: string;
    last_name?: string;
    phone_number: string;
    role: Role;
}

export type AuthResponseDTO = {
    message: string;
    access_token: string;
    token_type: string;
    user: UserDto;
}

