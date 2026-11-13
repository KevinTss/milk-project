import type { Place } from '@milk/domain';
import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { MapLegend } from '@/components/map-legend';
import { MapStatsBar } from '@/components/map-stats-bar';
import { PlaceInfoPanel } from '@/components/place-info-panel';
import { PlaceMarker } from '@/components/place-marker';
import { placesAtom } from '@/state/places-atom';
import { hasFreeOption, isFullyFree } from '@/utils/place-pricing';

const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Module-level so it's the same object every render — a fresh one would
 * make `Camera` think its props changed on every keystroke-sized re-render
 * (e.g. selecting a café). */
const INITIAL_VIEW_STATE = { zoom: 14 };

/**
 * Owns café selection locally so picking a café only re-renders this
 * component's tree, not the screen around it — and `PlaceMarker` is
 * memoized so only the (at most two) markers whose `selected` prop actually
 * changed re-render, not the whole marker list. Reads café data straight
 * from `placesAtom` rather than taking it as a prop, so nothing upstream
 * (like the screen handling location permission) needs to know it exists.
 */
export function CafeMap() {
  const places = useAtomValue(placesAtom);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [noSurchargeOnly, setNoSurchargeOnly] = useState(false);
  const deselect = useCallback(() => setSelectedPlace(null), []);
  const toggleNoSurchargeOnly = useCallback(() => setNoSurchargeOnly((value) => !value), []);

  const visiblePlaces = useMemo(
    () => (noSurchargeOnly ? places.filter(isFullyFree) : places),
    [places, noSurchargeOnly],
  );
  const freeCount = useMemo(() => places.filter(hasFreeOption).length, [places]);

  return (
    <>
      <Map style={styles.map} mapStyle={MAP_STYLE_URL} onPress={deselect}>
        <Camera trackUserLocation="default" initialViewState={INITIAL_VIEW_STATE} />
        <UserLocation accuracy />
        {visiblePlaces.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            selected={selectedPlace?.id === place.id}
            onPress={setSelectedPlace}
          />
        ))}
      </Map>
      {places.length > 0 && (
        <MapStatsBar
          freeCount={freeCount}
          totalCount={places.length}
          noSurchargeOnly={noSurchargeOnly}
          onToggleNoSurchargeOnly={toggleNoSurchargeOnly}
        />
      )}
      {places.length > 0 && !selectedPlace && <MapLegend />}
      {selectedPlace && <PlaceInfoPanel place={selectedPlace} places={places} />}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
