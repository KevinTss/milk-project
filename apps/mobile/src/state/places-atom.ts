import type { Place } from '@milk/domain';
import { atom } from 'jotai';
import { loadable } from 'jotai/utils';

import { API_BASE_URL } from '@/constants/api';

const EMPTY_PLACES: Place[] = [];

const placesFetchAtom = atom<Promise<Place[]>>(async () => {
  const response = await fetch(`${API_BASE_URL}/places`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as Place[];
});

/**
 * Loading/error/data status of the café fetch — for anything that shows a
 * banner or retry UI. Read this one only if you care *why* data isn't
 * there yet; read `placesAtom` if you just want what to render.
 */
export const placesLoadableAtom = loadable(placesFetchAtom);

/**
 * The cafés themselves, defaulting to empty until the fetch resolves. Any
 * component that needs café data reads this atom directly instead of
 * receiving it as a prop — so adding a new consumer (e.g. a future list
 * view) never requires threading it through a shared parent again.
 */
export const placesAtom = atom((get) => {
  const fetchState = get(placesLoadableAtom);
  return fetchState.state === 'hasData' ? fetchState.data : EMPTY_PLACES;
});
