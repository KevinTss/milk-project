import { useAtomValue } from 'jotai';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { placesLoadableAtom } from '@/state/places-atom';

/**
 * Reads the fetch status directly from the atom, independently of
 * `CafeMap` — so showing/hiding this banner never re-renders the map.
 */
export function PlacesStatusBanner() {
  const places = useAtomValue(placesLoadableAtom);

  if (places.state === 'loading') {
    return (
      <ThemedView type="backgroundElement" style={styles.banner}>
        <ActivityIndicator size="small" />
        <ThemedText type="small">Loading cafés…</ThemedText>
      </ThemedView>
    );
  }

  if (places.state === 'hasError') {
    return (
      <ThemedView type="backgroundElement" style={styles.banner}>
        <ThemedText type="small">Could not load cafés. Pull down to retry.</ThemedText>
      </ThemedView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: Spacing.five,
    left: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
});
