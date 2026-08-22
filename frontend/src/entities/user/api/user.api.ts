import type { UserDto } from "../../../features/auth";
import { API, apiClient } from "../../../shared/api";
import type { User } from "../../../types/user";


// 1. Функция проверки пользователя
export const getMe = async (): Promise<User> => {
    const response = await apiClient.get<UserDto>(API.users.me);
    const userData = response.data

    return {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        phoneNumber: userData.phone_number,
        role: userData.role
    }
};


