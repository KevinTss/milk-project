import type { Place } from '@milk/domain';
import { StyleSheet, View } from 'react-native';

import { MapColors } from '@/constants/map-colors';
import { type AmberTier, placeColorState } from '@/utils/place-pricing';

const AMBER_BY_TIER: Record<AmberTier, string> = {
  low: MapColors.amberLow,
  mid: MapColors.amberMid,
  high: MapColors.amberHigh,
};

interface PlaceColorDotProps {
  place: Place;
  size?: number;
}

/** The plain colored dot from the pin color convention, reused on the map pins and in search results. */
export function PlaceColorDot({ place, size = 16 }: PlaceColorDotProps) {
  const state = placeColorState(place);
  const dimensions = { width: size, height: size, borderRadius: size / 2 };

  if (state.kind === 'split') {
    return (
      <View style={[styles.base, dimensions, styles.splitRow]}>
        <View style={[styles.half, { backgroundColor: MapColors.green }]} />
        <View style={[styles.half, { backgroundColor: AMBER_BY_TIER[state.tier] }]} />
      </View>
    );
  }

  if (state.kind === 'outline') {
    return <View style={[styles.base, dimensions, styles.outline]} />;
  }

  const color = state.kind === 'green' ? MapColors.green : state.kind === 'gray' ? MapColors.gray : AMBER_BY_TIER[state.tier];
  return <View style={[styles.base, dimensions, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  splitRow: {
    flexDirection: 'row',
  },
  half: {
    flex: 1,
  },
  outline: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: MapColors.outline,
  },
});
