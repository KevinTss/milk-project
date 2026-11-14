import type { Place } from '@milk/domain';
import { Camera, Map, UserLocation, useCurrentPosition } from '@maplibre/maplibre-react-native';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { MapTopBar } from '@/components/map-top-bar';
import { PlaceFilterOverlay } from '@/components/place-filter-overlay';
import { PlaceInfoPanel } from '@/components/place-info-panel';
import { PlaceMarker } from '@/components/place-marker';
import { PlaceSearchOverlay } from '@/components/place-search-overlay';
import { LYON_CENTER, LYON_CENTER_LNG_LAT } from '@/constants/map';
import { placesAtom } from '@/state/places-atom';
import { isFullyFree } from '@/utils/place-pricing';

const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Module-level so it's the same object every render — a fresh one would
 * make `Camera` think its props changed on every keystroke-sized re-render
 * (e.g. selecting a café). Centers on Lyon until a real location fix
 * arrives, so the map never opens over Null Island (0,0). */
const INITIAL_VIEW_STATE = { zoom: 14, center: LYON_CENTER_LNG_LAT };

/**
 * Owns café selection, search, and filter state locally so picking a café
 * only re-renders this component's tree, not the screen around it — and
 * `PlaceMarker` is memoized so only the (at most two) markers whose
 * `selected` prop actually changed re-render, not the whole marker list.
 * Reads café data straight from `placesAtom` rather than taking it as a
 * prop, so nothing upstream (like the screen handling location permission)
 * needs to know it exists.
 */
export function CafeMap() {
  const places = useAtomValue(placesAtom);
  const currentPosition = useCurrentPosition();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [noSurchargeOnly, setNoSurchargeOnly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const deselect = useCallback(() => setSelectedPlace(null), []);
  const selectPlace = useCallback((place: Place) => setSelectedPlace(place), []);

  const visiblePlaces = useMemo(
    () => (noSurchargeOnly ? places.filter(isFullyFree) : places),
    [places, noSurchargeOnly],
  );
  const origin = currentPosition?.coords ?? LYON_CENTER;

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
            onPress={selectPlace}
          />
        ))}
      </Map>

      <MapTopBar
        onPressSearch={() => setSearchOpen(true)}
        onPressFilter={() => setFilterOpen(true)}
        filterActive={noSurchargeOnly}
      />

      {selectedPlace && <PlaceInfoPanel place={selectedPlace} places={places} />}

      {searchOpen && (
        <PlaceSearchOverlay
          places={places}
          origin={origin}
          onSelect={(place) => {
            setSearchOpen(false);
            selectPlace(place);
          }}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {filterOpen && (
        <PlaceFilterOverlay
          noSurchargeOnly={noSurchargeOnly}
          onChangeNoSurchargeOnly={setNoSurchargeOnly}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
