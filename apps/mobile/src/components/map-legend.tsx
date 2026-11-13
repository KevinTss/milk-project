import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MapColors } from '@/constants/map-colors';
import { Spacing } from '@/constants/theme';

/** Height of the bottom bar's stat pill, so the legend sits just above it. */
const STAT_LINE_HEIGHT = 56;

/**
 * Explains the price-pill convention from the "Proposed direction" in
 * docs/design/first-exploration.md: a mini version of the actual pin for
 * each state, since the pin already shows its own price. Sits just above
 * the bottom stat pill — close to the bottom edge, but not quite in the
 * corner, which MapLibre reserves for its own native attribution controls.
 */
export function MapLegend() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.legend, { bottom: insets.bottom + Spacing.three + STAT_LINE_HEIGHT + Spacing.one }]}
    >
      <LegendRow swatch={<PillSwatch text="€0" color={MapColors.green} />} label="Free" />
      <LegendRow
        swatch={<PillSwatch text="€0" color={MapColors.green} badgeColor={MapColors.amberLow} />}
        label="Some types cost extra"
      />
      <LegendRow swatch={<PillSwatch text="+€" color={MapColors.amberMid} />} label="Surcharge, shown on the pin" />
      <LegendRow swatch={<PillSwatch text="?" color={MapColors.gray} />} label="Pricing unknown" />
    </ThemedView>
  );
}

function PillSwatch({ text, color, badgeColor }: { text: string; color: string; badgeColor?: string }) {
  return (
    <View style={styles.swatchWrapper}>
      <View style={[styles.swatchPill, { backgroundColor: color }]}>
        <Text style={styles.swatchText}>{text}</Text>
      </View>
      {badgeColor && <View style={[styles.swatchBadge, { backgroundColor: badgeColor }]} />}
    </View>
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

const styles = StyleSheet.create({
  legend: {
    position: 'absolute',
    right: Spacing.three,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    gap: Spacing.half,
    maxWidth: 150,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  swatchWrapper: {
    width: 24,
    alignItems: 'center',
  },
  swatchPill: {
    minWidth: 20,
    height: 13,
    borderRadius: 7,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  swatchText: {
    color: '#ffffff',
    fontSize: 7,
    fontWeight: '700',
  },
  swatchBadge: {
    position: 'absolute',
    top: -2,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  label: {
    flexShrink: 1,
    fontSize: 10,
    lineHeight: 13,
  },
});
