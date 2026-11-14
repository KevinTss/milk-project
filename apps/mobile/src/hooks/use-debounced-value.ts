import { useEffect, useState } from 'react';

/** `isPending` is true while `debounced` hasn't caught up to the latest `value` yet. */
export function useDebouncedValue<T>(value: T, delayMs: number): { debounced: T; isPending: boolean } {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return { debounced, isPending: debounced !== value };
}
