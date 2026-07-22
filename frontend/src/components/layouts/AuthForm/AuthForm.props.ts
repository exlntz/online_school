import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { AuthMode } from '../../../types/auth';

export interface AuthFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
}
