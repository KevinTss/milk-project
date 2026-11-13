import type { Place } from '@milk/domain';
import { Marker, type MarkerEvent } from '@maplibre/maplibre-react-native';
import { memo } from 'react';
import type { NativeSyntheticEvent } from 'react-native';

import { PlacePricePin } from '@/components/place-price-pin';

interface PlaceMarkerProps {
  place: Place;
  selected: boolean;
  onPress: (place: Place) => void;
}

/**
 * Memoized so selecting one café only re-renders that marker and the
 * previously selected one, not every marker on the map.
 */
export const PlaceMarker = memo(function PlaceMarker({ place, selected, onPress }: PlaceMarkerProps) {
  return (
    <Marker
      id={place.id}
      lngLat={[place.location.longitude, place.location.latitude]}
      anchor="center"
      onPress={(event: NativeSyntheticEvent<MarkerEvent>) => {
        event.stopPropagation();
        onPress(place);
      }}
    >
      <PlacePricePin place={place} selected={selected} />
    </Marker>
  );
});
