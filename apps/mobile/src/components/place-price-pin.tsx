import type { Place } from '@milk/domain';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { MapColors } from '@/constants/map-colors';
import { pinPriceText } from '@/utils/place-display';
import { type AmberTier, placeColorState } from '@/utils/place-pricing';

const AMBER_BY_TIER: Record<AmberTier, string> = {
  low: MapColors.amberLow,
  mid: MapColors.amberMid,
  high: MapColors.amberHigh,
};

interface PlacePricePinProps {
  place: Place;
  selected?: boolean;
}

/**
 * The map pin: a white price pill with colored text/border, rather than a
 * filled color badge — reads cleanly against the map at any zoom without
 * turning the map into a field of solid color blobs. Shows the actual
 * price directly (€0, +€0.50, …) so a tap isn't needed just to learn the
 * price, and its pill shape keeps it visually distinct from the blue
 * current-location puck. A café with both free and surcharged types keeps
 * its free price as the main pill with a small surcharge-tier badge,
 * rather than cramming two prices into one pin.
 */
export function PlacePricePin({ place, selected = false }: PlacePricePinProps) {
  const state = placeColorState(place);
  const text = pinPriceText(place);

  if (state.kind === 'outline') {
    return <View style={[styles.outline, selected && styles.outlineSelected]} />;
  }

  const color =
    state.kind === 'gray' ? MapColors.gray : state.kind === 'amber' ? AMBER_BY_TIER[state.tier] : MapColors.green;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.pill, { borderColor: color }, selected && styles.pillSelected]}>
        <Text style={[styles.text, { color }]} numberOfLines={1}>
          {text}
        </Text>
      </View>
      {state.kind === 'split' && <View style={[styles.badge, { backgroundColor: AMBER_BY_TIER[state.tier] }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  pill: {
    minWidth: 34,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  pillSelected: {
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  outline: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: MapColors.outline,
  },
  outlineSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
});
