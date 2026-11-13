import type { Place } from '@milk/domain';
import { Marker, type MarkerEvent } from '@maplibre/maplibre-react-native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';

import { PlaceColorDot } from '@/components/place-color-dot';

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
  const size = selected ? 22 : 16;

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
      <View
        style={[
          styles.ring,
          { width: size, height: size, borderRadius: size / 2 },
          selected && styles.ringSelected,
        ]}
      >
        <PlaceColorDot place={place} size={size} />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  ring: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  ringSelected: {
    borderWidth: 3,
  },
});
