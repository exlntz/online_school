import { useEffect, type RefObject } from "react";


interface UseClickOutsideOptions {
    ref: RefObject<HTMLElement | null>; 
    handler: () => void;
    enabled?: boolean;
}

export const useClickOutside = ({ ref, handler, enabled=true }: UseClickOutsideOptions): void => {
    useEffect(() => {
        if (!enabled) return; 

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handler();
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [ref, handler, enabled]);
}
 
 