import type { Place } from '@milk/domain';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { CafeMap } from '@/components/cafe-map';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePlaces } from '@/hooks/use-places';

const EMPTY_PLACES: Place[] = [];

type PermissionState = 'checking' | 'granted' | 'denied';

export default function HomeScreen() {
  const [permission, setPermission] = useState<PermissionState>('checking');
  const places = usePlaces();

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
      <CafeMap places={places.status === 'success' ? places.places : EMPTY_PLACES} />
      {places.status === 'loading' && (
        <ThemedView type="backgroundElement" style={styles.statusBanner}>
          <ActivityIndicator size="small" />
          <ThemedText type="small">Loading cafés…</ThemedText>
        </ThemedView>
      )}
      {places.status === 'error' && (
        <ThemedView type="backgroundElement" style={styles.statusBanner}>
          <ThemedText type="small">{places.message}</ThemedText>
        </ThemedView>
      )}
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
  statusBanner: {
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
