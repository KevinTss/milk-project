import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MapColors } from '@/constants/map-colors';
import { Spacing } from '@/constants/theme';

/** Height of the top bar's row of pills/buttons, so the legend drops down just below it. */
const TOP_BAR_HEIGHT = 46;

/**
 * Explains the pin color convention from the "Proposed direction" in
 * docs/design/first-exploration.md. The 3-step amber scale is shown as a
 * compact 3-block swatch rather than three separate legend rows. Anchored
 * below the top bar rather than in a bottom corner, which MapLibre reserves
 * for its own native attribution controls.
 */
export function MapLegend() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.legend, { top: insets.top + Spacing.two + TOP_BAR_HEIGHT + Spacing.two }]}
    >
      <LegendRow swatch={<View style={[styles.dot, { backgroundColor: MapColors.green }]} />} label="All free" />
      <LegendRow
        swatch={
          <View style={styles.dot}>
            <View style={[styles.dotHalf, { backgroundColor: MapColors.green }]} />
            <View style={[styles.dotHalf, { backgroundColor: MapColors.amberLow }]} />
          </View>
        }
        label="Mixed"
      />
      <LegendRow
        swatch={
          <View style={styles.gradientSwatch}>
            <View style={[styles.gradientBlock, { backgroundColor: MapColors.amberLow }]} />
            <View style={[styles.gradientBlock, { backgroundColor: MapColors.amberMid }]} />
            <View style={[styles.gradientBlock, { backgroundColor: MapColors.amberHigh }]} />
          </View>
        }
        label="Surcharge — darker = pricier"
      />
      <LegendRow swatch={<View style={[styles.dot, { backgroundColor: MapColors.gray }]} />} label="Unknown" />
    </ThemedView>
  );
}

function LegendRow({ swatch, label }: { swatch: ReactNode; label: string }) {
  return (
    <View style={styles.row}>
      {swatch}
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
}

const DOT_SIZE = 12;

const styles = StyleSheet.create({
  legend: {
    position: 'absolute',
    right: Spacing.three,
    borderRadius: Spacing.two,
    padding: Spacing.two,
    gap: Spacing.one,
    maxWidth: 176,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  dotHalf: {
    flex: 1,
  },
  gradientSwatch: {
    width: DOT_SIZE * 2,
    height: DOT_SIZE / 1.5,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  gradientBlock: {
    flex: 1,
  },
  label: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 14,
  },
});
