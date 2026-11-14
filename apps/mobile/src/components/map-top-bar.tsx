import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface MapTopBarProps {
  onPressSearch: () => void;
  onPressFilter: () => void;
  filterActive: boolean;
}

/** Google Maps–style search bar + filter button, positioned below the device's own status bar/notch. */
export function MapTopBar({ onPressSearch, onPressFilter, filterActive }: MapTopBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.container, { top: insets.top + Spacing.two }]}>
      <Pressable style={styles.searchBar} onPress={onPressSearch} hitSlop={4}>
        <ThemedView type="background" style={styles.searchBarInner}>
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={16}
            tintColor={theme.textSecondary}
          />
          <ThemedText type="small" themeColor="textSecondary">
            Search cafés
          </ThemedText>
        </ThemedView>
      </Pressable>
      <Pressable onPress={onPressFilter} hitSlop={4}>
        <ThemedView type="background" style={[styles.iconButton, filterActive && styles.iconButtonActive]}>
          <SymbolView
            name={{ ios: 'line.3.horizontal.decrease', android: 'tune', web: 'tune' }}
            size={18}
            tintColor={filterActive ? '#ffffff' : theme.text}
          />
        </ThemedView>
      </Pressable>
    </View>
  );
}

/** White chrome needs its own separation from the map underneath, now that it no longer gets that for free from a tinted background. */
const cardShadow = Platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.15, shadowRadius: 3 },
  android: { elevation: 3 },
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  searchBar: {
    flex: 1,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    height: 46,
    borderRadius: 23,
    paddingHorizontal: Spacing.three,
    ...cardShadow,
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadow,
  },
  iconButtonActive: {
    backgroundColor: '#0f172a',
  },
});
