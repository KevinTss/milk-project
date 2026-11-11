import type { Place } from '@milk/domain';
import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { PlaceInfoPanel } from '@/components/place-info-panel';
import { PlaceMarker } from '@/components/place-marker';

const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Module-level so it's the same object every render — a fresh one would
 * make `Camera` think its props changed on every keystroke-sized re-render
 * (e.g. selecting a café). */
const INITIAL_VIEW_STATE = { zoom: 14 };

interface CafeMapProps {
  places: Place[];
}

/**
 * Owns café selection locally so picking a café only re-renders this
 * component's tree, not the screen around it — and `PlaceMarker` is
 * memoized so only the (at most two) markers whose `selected` prop actually
 * changed re-render, not the whole marker list.
 */
export function CafeMap({ places }: CafeMapProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const deselect = useCallback(() => setSelectedPlace(null), []);

  return (
    <>
      <Map style={styles.map} mapStyle={MAP_STYLE_URL} onPress={deselect}>
        <Camera trackUserLocation="default" initialViewState={INITIAL_VIEW_STATE} />
        <UserLocation accuracy />
        {places.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            selected={selectedPlace?.id === place.id}
            onPress={setSelectedPlace}
          />
        ))}
      </Map>
      {selectedPlace && <PlaceInfoPanel place={selectedPlace} />}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
