import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface MapTopBarProps {
  onPressSearch: () => void;
  onPressFilter: () => void;
  filterActive: boolean;
  onPressLegend: () => void;
  legendActive: boolean;
}

/**
 * Google Maps–style search bar + filter/legend buttons, positioned below the
 * device's own status bar/notch. The legend toggle lives up here rather
 * than in a bottom corner because MapLibre reserves both bottom corners for
 * its own native attribution controls, which swallow touches meant for any
 * sibling view placed there.
 */
export function MapTopBar({ onPressSearch, onPressFilter, filterActive, onPressLegend, legendActive }: MapTopBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.container, { top: insets.top + Spacing.two }]}>
      <Pressable style={styles.searchBar} onPress={onPressSearch} hitSlop={4}>
        <ThemedView type="backgroundElement" style={styles.searchBarInner}>
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
      <Pressable onPress={onPressLegend} hitSlop={4}>
        <ThemedView type="backgroundElement" style={[styles.iconButton, legendActive && styles.iconButtonActive]}>
          <SymbolView
            name={{ ios: 'info', android: 'info', web: 'info' }}
            size={18}
            tintColor={legendActive ? '#ffffff' : theme.text}
          />
        </ThemedView>
      </Pressable>
      <Pressable onPress={onPressFilter} hitSlop={4}>
        <ThemedView type="backgroundElement" style={[styles.iconButton, filterActive && styles.iconButtonActive]}>
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
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#0f172a',
  },
});
