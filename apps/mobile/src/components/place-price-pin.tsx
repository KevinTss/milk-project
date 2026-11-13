import type { Place } from '@milk/domain';
import { StyleSheet, Text, View } from 'react-native';

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
 * The map pin: a price pill rather than a plain dot. A plain colored dot
 * reads too much like the blue current-location puck and doesn't answer
 * "how much" without a tap — showing the actual price (or "€0") directly
 * on the pin does both. A café with both free and surcharged types shows
 * its free price with a small surcharge-tier badge rather than cramming
 * two numbers into one pin.
 */
export function PlacePricePin({ place, selected = false }: PlacePricePinProps) {
  const state = placeColorState(place);
  const text = pinPriceText(place);

  if (state.kind === 'outline') {
    return <View style={[styles.outline, selected && styles.outlineSelected]} />;
  }

  const backgroundColor =
    state.kind === 'gray' ? MapColors.gray : state.kind === 'amber' ? AMBER_BY_TIER[state.tier] : MapColors.green;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.pill, { backgroundColor }, selected && styles.pillSelected]}>
        <Text style={styles.text} numberOfLines={1}>
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
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  pillSelected: {
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
  },
  text: {
    color: '#ffffff',
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
