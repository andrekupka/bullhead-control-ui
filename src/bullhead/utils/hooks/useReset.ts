import {useEffect} from 'react';

export const useReset = (reset: () => void) => useEffect(() => () => reset(), [reset]);