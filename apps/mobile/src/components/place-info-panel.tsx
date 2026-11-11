import type { Place } from '@milk/domain';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { availabilitySummary, milkTypeLabel, surchargeSummary } from '@/utils/place-display';

interface PlaceInfoPanelProps {
  place: Place;
}

export function PlaceInfoPanel({ place }: PlaceInfoPanelProps) {
  const milkTypes = place.milkTypes.value;

  return (
    <ThemedView type="backgroundElement" style={styles.panel}>
      <ThemedText type="subtitle">{place.name}</ThemedText>
      {place.address && (
        <ThemedText type="small" themeColor="textSecondary">
          {place.address}
        </ThemedText>
      )}
      <ThemedText type="smallBold" style={styles.availability}>
        {availabilitySummary(place.plantMilkAvailable)}
      </ThemedText>
      {milkTypes && milkTypes.length > 0 && (
        <ThemedView style={styles.milkTypes}>
          {milkTypes.map((offering) => (
            <ThemedText key={offering.type} type="small" themeColor="textSecondary">
              {milkTypeLabel(offering.type)} — {surchargeSummary(offering)}
            </ThemedText>
          ))}
        </ThemedView>
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
    gap: Spacing.one,
  },
  availability: {
    marginTop: Spacing.two,
  },
  milkTypes: {
    marginTop: Spacing.one,
    gap: Spacing.half,
  },
});
