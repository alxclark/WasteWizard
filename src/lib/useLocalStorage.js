// Inspired by streamich's react-use

import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

export default function useLocalStorage(key, initialValue) {
  if (!isClient) {
    return [initialValue, () => { }];
  }

  const [state, setState] = useState(() => {
    // In case localStorage is unavailable
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        return JSON.parse(localStorageValue || 'null');
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch { }
  });

  return [state, setState];
}