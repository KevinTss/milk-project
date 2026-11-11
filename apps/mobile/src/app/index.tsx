import type { Place } from '@milk/domain';
import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { PlaceInfoPanel } from '@/components/place-info-panel';
import { PlaceMarker } from '@/components/place-marker';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePlaces } from '@/hooks/use-places';

const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

type PermissionState = 'checking' | 'granted' | 'denied';

export default function HomeScreen() {
  const [permission, setPermission] = useState<PermissionState>('checking');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
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
      <Map style={styles.map} mapStyle={MAP_STYLE_URL} onPress={() => setSelectedPlace(null)}>
        <Camera trackUserLocation="default" initialViewState={{ zoom: 14 }} />
        <UserLocation accuracy />
        {places.status === 'success' &&
          places.places.map((place) => (
            <PlaceMarker
              key={place.id}
              place={place}
              selected={selectedPlace?.id === place.id}
              onPress={setSelectedPlace}
            />
          ))}
      </Map>
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
      {selectedPlace && <PlaceInfoPanel place={selectedPlace} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
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
