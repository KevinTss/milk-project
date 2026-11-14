import { SymbolView } from 'expo-symbols';
import { Modal, Pressable, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface PlaceFilterOverlayProps {
  noSurchargeOnly: boolean;
  onChangeNoSurchargeOnly: (value: boolean) => void;
  onClose: () => void;
}

/** Full-screen filter config. Today this is a single toggle; more filters would get their own rows here. */
export function PlaceFilterOverlay({ noSurchargeOnly, onChangeNoSurchargeOnly, onClose }: PlaceFilterOverlayProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Filters</ThemedText>
          <Pressable onPress={onClose} hitSlop={8}>
            <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} size={20} tintColor={theme.text} />
          </Pressable>
        </View>
        <View style={styles.row}>
          <ThemedText type="default">Without surcharge</ThemedText>
          <Switch value={noSurchargeOnly} onValueChange={onChangeNoSurchargeOnly} />
        </View>
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
    justifyContent: 'space-between',
    paddingBottom: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
});
