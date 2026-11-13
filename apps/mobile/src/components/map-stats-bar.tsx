import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface MapStatsBarProps {
  freeCount: number;
  totalCount: number;
  noSurchargeOnly: boolean;
  onToggleNoSurchargeOnly: () => void;
}

/**
 * The restrained activism framing Kevin asked for: one computed stat line,
 * no ribbons or scoring. Paired with the single "No surcharge" filter chip
 * kept from Direction B.
 */
export function MapStatsBar({ freeCount, totalCount, noSurchargeOnly, onToggleNoSurchargeOnly }: MapStatsBarProps) {
  return (
    <View style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.statLine}>
        <ThemedText type="smallBold">
          🌱 {freeCount} of {totalCount} nearby cafés have a €0 option
        </ThemedText>
      </ThemedView>
      <Pressable
        onPress={onToggleNoSurchargeOnly}
        style={[styles.chip, noSurchargeOnly ? styles.chipActive : styles.chipInactive]}
      >
        <ThemedText type="small" style={noSurchargeOnly ? styles.chipTextActive : undefined}>
          No surcharge
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Spacing.five,
    left: Spacing.three,
    right: Spacing.three,
    gap: Spacing.two,
  },
  statLine: {
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    alignSelf: 'flex-start',
  },
  chip: {
    borderRadius: Spacing.five,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    alignSelf: 'flex-start',
  },
  chipInactive: {
    backgroundColor: '#f1f5f9',
  },
  chipActive: {
    backgroundColor: '#0f172a',
  },
  chipTextActive: {
    color: '#ffffff',
  },
});
