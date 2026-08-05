import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { AuthMode } from '../../types/auth';

export interface AuthPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
}
