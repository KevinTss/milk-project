import type { Place } from '@milk/domain';
import { Marker, type MarkerEvent } from '@maplibre/maplibre-react-native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';

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
      <View style={[styles.pin, selected && styles.pinSelected]} />
    </Marker>
  );
});

const styles = StyleSheet.create({
  pin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3c87f7',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  pinSelected: {
    backgroundColor: '#1d4ed8',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
