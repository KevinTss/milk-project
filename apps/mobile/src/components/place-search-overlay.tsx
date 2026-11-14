import type { Place } from '@milk/domain';
import { SymbolView } from 'expo-symbols';
import { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlaceColorDot } from '@/components/place-color-dot';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTheme } from '@/hooks/use-theme';
import { distanceMeters, walkingMinutesLabel } from '@/utils/geo';
import { shortSummaryLabel } from '@/utils/place-display';

const DEBOUNCE_MS = 300;

interface PlaceSearchOverlayProps {
  places: Place[];
  origin: { latitude: number; longitude: number };
  onSelect: (place: Place) => void;
  onClose: () => void;
}

/** Full-screen search: nearest cafés by default, filtered by name as the query debounces. */
export function PlaceSearchOverlay({ places, origin, onSelect, onClose }: PlaceSearchOverlayProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { debounced: debouncedQuery, isPending } = useDebouncedValue(query.trim().toLowerCase(), DEBOUNCE_MS);

  const results = useMemo(() => {
    const withDistance = places.map((place) => ({ place, distance: distanceMeters(origin, place.location) }));
    const matching = debouncedQuery
      ? withDistance.filter(({ place }) => place.name.toLowerCase().includes(debouncedQuery))
      : withDistance;
    return matching.sort((a, b) => a.distance - b.distance);
  }, [places, origin, debouncedQuery]);

  return (
    <Modal
      visible
      animationType="slide"
      onRequestClose={onClose}
      // Focusing only once the slide-up finishes (rather than TextInput's own
      // autoFocus) keeps the keyboard's rise from fighting the modal's own
      // animation, which is what made it feel like the keyboard "forgot" to open.
      onShow={() => inputRef.current?.focus()}
    >
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
        <View style={styles.header}>
          <View style={styles.inputWrap}>
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={16}
              tintColor={theme.textSecondary}
            />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Search cafés"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
            />
          </View>
          <Pressable onPress={onClose} hitSlop={8}>
            <ThemedText type="small">Cancel</ThemedText>
          </Pressable>
        </View>
        <ScrollView
          style={[styles.list, isPending && styles.listPending]}
          keyboardShouldPersistTaps="handled"
        >
          {results.map(({ place, distance }) => (
            <Pressable key={place.id} style={styles.row} onPress={() => onSelect(place)}>
              <PlaceColorDot place={place} size={14} />
              <View style={styles.rowText}>
                <ThemedText type="smallBold">{place.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {shortSummaryLabel(place)} · {walkingMinutesLabel(distance)}
                </ThemedText>
              </View>
            </Pressable>
          ))}
          {results.length === 0 && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.empty}>
              No cafés match “{query}”.
            </ThemedText>
          )}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#f1f5f9',
    borderRadius: 23,
    paddingHorizontal: Spacing.three,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listPending: {
    opacity: 0.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
