import type { Place } from '@milk/domain';
import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/constants/api';

type PlacesState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; places: Place[] };

export function usePlaces() {
  const [state, setState] = useState<PlacesState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/places`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json() as Promise<Place[]>;
      })
      .then((places) => setState({ status: 'success', places }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;
        setState({ status: 'error', message: 'Could not load cafés. Pull down to retry.' });
      });
    return () => controller.abort();
  }, []);

  return state;
}
