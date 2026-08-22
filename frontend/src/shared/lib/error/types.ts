export type ApiErrorResponse = {
    message?: string;
    detail?: string;
};

export type ParseApiErrorFn = (error: unknown, fallbackMessage?: string) => string;