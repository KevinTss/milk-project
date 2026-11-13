import type { Place } from '@milk/domain';
import { Marker, type MarkerEvent } from '@maplibre/maplibre-react-native';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';

import { MapColors } from '@/constants/map-colors';
import { type AmberTier, placeColorState } from '@/utils/place-pricing';

interface PlaceMarkerProps {
  place: Place;
  selected: boolean;
  onPress: (place: Place) => void;
}

const AMBER_BY_TIER: Record<AmberTier, string> = {
  low: MapColors.amberLow,
  mid: MapColors.amberMid,
  high: MapColors.amberHigh,
};

/**
 * Memoized so selecting one café only re-renders that marker and the
 * previously selected one, not every marker on the map.
 */
export const PlaceMarker = memo(function PlaceMarker({ place, selected, onPress }: PlaceMarkerProps) {
  const state = placeColorState(place);
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
      <View style={[styles.pinBase, { width: size, height: size, borderRadius: size / 2 }, selected && styles.pinSelected]}>
        {state.kind === 'green' && <View style={[styles.fill, { backgroundColor: MapColors.green }]} />}
        {state.kind === 'gray' && <View style={[styles.fill, { backgroundColor: MapColors.gray }]} />}
        {state.kind === 'amber' && (
          <View style={[styles.fill, { backgroundColor: AMBER_BY_TIER[state.tier] }]} />
        )}
        {state.kind === 'split' && (
          <View style={styles.splitRow}>
            <View style={[styles.splitHalf, { backgroundColor: MapColors.green }]} />
            <View style={[styles.splitHalf, { backgroundColor: AMBER_BY_TIER[state.tier] }]} />
          </View>
        )}
        {state.kind === 'outline' && <View style={[styles.fill, styles.outlineFill]} />}
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  pinBase: {
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  pinSelected: {
    borderWidth: 3,
  },
  fill: {
    flex: 1,
  },
  outlineFill: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: MapColors.outline,
  },
  splitRow: {
    flex: 1,
    flexDirection: 'row',
  },
  splitHalf: {
    flex: 1,
  },
});
