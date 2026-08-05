import { isAxiosError } from "axios";
import type { ApiErrorResponse, ParseApiErrorFn } from "../types/error";


export const parseApiError: ParseApiErrorFn = (error, fallbackMessage='Произошла ошибка') => {
    if (isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message
            || error.response?.data?.detail
            || fallbackMessage;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallbackMessage;
}