import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { CafeMap } from '@/components/cafe-map';
import { PlacesStatusBanner } from '@/components/places-status-banner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type PermissionState = 'checking' | 'granted' | 'denied';

export default function HomeScreen() {
  const [permission, setPermission] = useState<PermissionState>('checking');

  useEffect(() => {
    let isMounted = true;
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (isMounted) setPermission(status === 'granted' ? 'granted' : 'denied');
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (permission === 'checking') {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (permission === 'denied') {
    return (
      <ThemedView style={styles.center}>
        <ThemedText type="small" style={styles.message}>
          Milk app needs location access to show the map centered on you. Enable it in Settings to
          continue.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CafeMap />
      <PlacesStatusBanner />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
  },
  message: {
    textAlign: 'center',
  },
});
