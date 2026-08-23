import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { AuthMode } from '../../../features/auth';

export interface AuthPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
}
