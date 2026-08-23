export type VariantStatus = 'assigned' | 'in-progress' | 'done';

export type VariantModel = {
    title: string;
    meta: string;
    rated: boolean;
    status: VariantStatus;
    score?: string;
    deadline: string;
};