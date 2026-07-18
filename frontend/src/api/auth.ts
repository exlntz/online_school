import type { RegisterFirstStep, RegisterSecondStep } from '../types/register';
import type { User } from '../types/user';
import { setAccessToken } from './apiClient';

// 1. Функция логина
export const sendLoginSmsCode = async (data: { phone: string }): Promise<{ success: boolean }> => {
    console.log(data)
    return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
    });
};

// 2. Проверка СМС при входе (Бэкенд находит юзера по номеру и возвращает его ИМЯ)
export const verifyLoginSmsCode = async (data: { phone: string; code: string }): Promise<{ user: User }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.code === '0000') {
                const mockToken = 'mock-access-token-login';
                setAccessToken(mockToken);
                localStorage.setItem('temp_mock_token', mockToken);
                
                resolve({
                    // Эмулируем, что бэкенд нашел Ивана в базе данных по номеру телефона
                    user: { id: 1, name: 'Вадим', email: '', role: 'user' }
                });
            } else {
                reject(new Error('Неверный код'));
            }
        }, 1000);
    });
};

// 3. Функция проверки пользователя
export const getMe = async (): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const token = localStorage.getItem('temp_mock_token');

            if (token) {
                resolve({ 
                    id: 1, 
                    name: 'Вадим',
                    email: '', 
                    role: 'user' 
                });
            } else {
                reject(new Error('Не авторизован'));
            }
        }, 800);
    });
};

// Отправка телефона
// export const sendSmsCode = async (data: RegisterFirstStep): Promise<{ status: string }> => {
//     // В реальности: await apiClient.post('/auth/register/send', data);
//     return new Promise((resolve) => setTimeout(() => resolve({ status: 'ok' }), 1000));
// };

// // Проверка кода и завершение регистрации
// export const verifySmsCode = async (data: RegisterSecondStep): Promise<{ user: User }> => {
//     // В реальности: await apiClient.post('/auth/register/verify', data);
//     return new Promise((resolve) => setTimeout(() => {
//         resolve({ user: { id: 2, name: 'Новый Студент', email: '...', role: 'user' } });
//     }, 1000));
// };

// 4. Отправка телефона
export const sendSmsCode = async (data: RegisterFirstStep): Promise<{ success: boolean }> => {
    console.log(data)
    return new Promise((resolve) => {
        // Имитируем запрос на бэкенд (1 секунда)
        setTimeout(() => resolve({ success: true }), 1000);
    });
};

// 5. Проверка СМС и успешная регистрация
export const verifySmsCode = async (data: RegisterSecondStep): Promise<{ user: User }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Для мока: пускай "правильным" кодом всегда будет '0000'
            if (data.code === '0000') {
                const mockToken = 'mock-access-token-777';
                setAccessToken(mockToken);
                localStorage.setItem('temp_mock_token', mockToken);
                
                resolve({
                    user: { id: 2, name: data.name, email: '', role: 'user' }
                });
            } else {
                reject(new Error('Неверный код'));
            }
        }, 1000);
    });
};