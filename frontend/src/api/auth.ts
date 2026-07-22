import type { AuthMode, AuthResponseDTO, SendCodePayload, UserDto, VerifyCodePayload } from '../types/auth';
import type { User } from '../types/user';
import { apiClient, setAccessToken } from './apiClient';

// 1. Функция логина и регистрации
export const sendAuthCode = async (data: SendCodePayload, mode: AuthMode): Promise<{ success: boolean }> => {
    const payload = {
        phone_number: data.phoneNumber,
        action: mode,
        ...(data.role && { role: data.role })
    }

    const response = await apiClient.post(`auth/send-code`, payload);
    return response.data;
};

// 2. Проверка СМС при входе и регистрации
export const verifyAuthCode = async (data: VerifyCodePayload, mode: AuthMode): Promise<{ user: User }> => {
    const payload = mode === 'register' 
        ? { phone_number: data.phoneNumber, code: data.code, first_name: data.firstName, role: data.role}
        : { phone_number: data.phoneNumber, code: data.code };

    const response = await apiClient.post<AuthResponseDTO>(`auth/${mode}`, payload);
    
    setAccessToken(response.data.access_token);
    const userData = response.data.user

    return {
        user: {
            id: userData.id,
            firstName: userData.first_name,
            lastName: userData.last_name,
            phoneNumber: userData.phone_number,
            role: userData.role
        }
    }
};

// 3. Функция проверки пользователя
export const getMe = async (): Promise<User> => {
    const response = await apiClient.get<UserDto>('/users/me');
    const userData = response.data

    return {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        phoneNumber: userData.phone_number,
        role: userData.role
    }
};

// 4. Выход из аккаунта
export const logoutUser = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
}

