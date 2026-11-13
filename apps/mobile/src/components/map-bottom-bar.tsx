import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface MapBottomBarProps {
  freeCount: number;
  totalCount: number;
}

/**
 * The restrained activism framing Kevin asked for: one computed stat line,
 * no ribbons or scoring. Kept clear of the bottom corners, which MapLibre
 * reserves for its own native attribution controls.
 */
export function MapBottomBar({ freeCount, totalCount }: MapBottomBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom + Spacing.three }]}>
      <ThemedView type="backgroundElement" style={styles.statLine}>
        <ThemedText type="smallBold">
          🌱 {freeCount} of {totalCount} nearby cafés have a €0 option
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
  },
  statLine: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
});
