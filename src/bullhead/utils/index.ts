import {KeyboardEvent} from 'react';

export const delay = async (durationInMs: number) => {
    return new Promise(done => setTimeout(done, durationInMs))
};

export const handleEscape = (handler: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        event.preventDefault();
        handler();
    }
};