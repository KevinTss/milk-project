import type { Place } from '@milk/domain';
import { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MapColors } from '@/constants/map-colors';
import { Spacing } from '@/constants/theme';
import { distanceMeters, walkingMinutesLabel } from '@/utils/geo';
import { milkTypeLabel, priceDisplay, verificationLabelText } from '@/utils/place-display';
import { type AmberTier, isFullyFree, placeColorState } from '@/utils/place-pricing';

interface PlaceInfoPanelProps {
  place: Place;
  /** All nearby cafés, used to surface a fully-free alternative when this one isn't. */
  places: Place[];
}

const AMBER_BG_BY_TIER: Record<AmberTier, string> = {
  low: MapColors.amberLowBg,
  mid: MapColors.amberMidBg,
  high: MapColors.amberHighBg,
};

function heroCopy(place: Place): { title: string; backgroundColor: string } {
  const state = placeColorState(place);
  const offerings = place.milkTypes.value ?? [];
  const freeTypeNames = offerings
    .filter((offering) => offering.surcharge.value?.kind === 'none')
    .map((offering) => milkTypeLabel(offering.type));

  switch (state.kind) {
    case 'green':
      return { title: 'No surcharge — €0 for every plant milk', backgroundColor: MapColors.greenBg };
    case 'split':
      return {
        title: `Mixed pricing — €0 for ${freeTypeNames.join(' or ')}, extra for the rest`,
        backgroundColor: MapColors.greenBg,
      };
    case 'amber':
      return { title: 'Surcharge on every plant milk type here', backgroundColor: AMBER_BG_BY_TIER[state.tier] };
    case 'outline':
      return {
        title:
          place.plantMilkAvailable.label === 'reported'
            ? 'Reported to have no plant milk'
            : 'No plant milk available',
        backgroundColor: MapColors.grayBg,
      };
    case 'gray':
      return {
        title:
          place.plantMilkAvailable.value === true
            ? 'Plant milk available — pricing not yet verified'
            : 'Plant milk availability unknown',
        backgroundColor: MapColors.grayBg,
      };
  }
}

const PRICE_COLOR: Record<ReturnType<typeof priceDisplay>['colorKind'], string> = {
  green: MapColors.green,
  low: MapColors.amberLow,
  mid: MapColors.amberMid,
  high: MapColors.amberHigh,
  gray: MapColors.gray,
};

export function PlaceInfoPanel({ place, places }: PlaceInfoPanelProps) {
  const offerings = place.milkTypes.value;
  const hero = heroCopy(place);

  const alternative = useMemo(() => {
    if (isFullyFree(place)) return null;
    const candidates = places.filter((other) => other.id !== place.id && isFullyFree(other));
    if (candidates.length === 0) return null;

    let nearest = candidates[0];
    let nearestDistance = distanceMeters(place.location, nearest.location);
    for (const candidate of candidates.slice(1)) {
      const distance = distanceMeters(place.location, candidate.location);
      if (distance < nearestDistance) {
        nearest = candidate;
        nearestDistance = distance;
      }
    }
    return { place: nearest, distanceMeters: nearestDistance };
  }, [place, places]);

  return (
    <ThemedView type="background" style={styles.panel}>
      <ThemedText type="subtitle">{place.name}</ThemedText>
      {place.address && (
        <ThemedText type="small" themeColor="textSecondary">
          {place.address}
        </ThemedText>
      )}

      <View style={[styles.hero, { backgroundColor: hero.backgroundColor }]}>
        <ThemedText type="smallBold">{hero.title}</ThemedText>
      </View>

      {offerings && offerings.length > 0 && (
        <View style={styles.milkTypes}>
          {offerings.map((offering) => {
            const price = priceDisplay(offering);
            return (
              <View key={offering.type} style={styles.milkRow}>
                <ThemedText type="small">{milkTypeLabel(offering.type)}</ThemedText>
                <View style={styles.milkRowRight}>
                  <ThemedText type="smallBold" style={{ color: PRICE_COLOR[price.colorKind] }}>
                    {price.text}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {verificationLabelText(offering.surcharge.label)}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {alternative && (
        <ThemedText type="small" themeColor="textSecondary">
          No surcharge nearby: {alternative.place.name} — {walkingMinutesLabel(alternative.distanceMeters)}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    bottom: Spacing.four,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
      android: { elevation: 4 },
    }),
  },
  hero: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  milkTypes: {
    gap: Spacing.half,
  },
  milkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.half,
  },
  milkRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
});
