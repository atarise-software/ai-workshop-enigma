import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

import { findNearestCity, type City } from './nearest-city';

/** Beyond this distance the player is not "in" the city, so we say it is only the nearest one. */
const IN_CITY_KM = 40;

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'found'; city: City; km: number }
  | { kind: 'error'; message: string };

type Props = {
  onCityFound: (city: City) => void;
};

/**
 * Asks for location only after the player taps the button. Any failure leaves the
 * city dropdown as the fallback, so location never blocks the flow (PRODUCT.md, Screen 1).
 */
export function LocateButton({ onCityFound }: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const loading = status.kind === 'loading';

  async function locate() {
    setStatus({ kind: 'loading' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setStatus({ kind: 'error', message: 'Brak zgody na lokalizację. Wybierz miejscowość z listy poniżej.' });
        return;
      }
      const position =
        (await Location.getLastKnownPositionAsync({ maxAge: 10 * 60 * 1000, requiredAccuracy: 3000 })) ??
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }));
      const nearest = findNearestCity(position.coords);
      onCityFound(nearest.city);
      setStatus({ kind: 'found', ...nearest });
    } catch {
      setStatus({ kind: 'error', message: 'Nie udało się ustalić lokalizacji. Wybierz miejscowość z listy poniżej.' });
    }
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={locate}
        disabled={loading}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Odnajdź najbliższą tajemnicę"
        accessibilityHint="Prosi o dostęp do lokalizacji i wybiera najbliższą miejscowość"
        accessibilityState={{ busy: loading, disabled: loading }}>
        <Text style={styles.label}>Odnajdź najbliższą tajemnicę</Text>
        {loading ? (
          <ActivityIndicator size="small" color={colors.gold} />
        ) : (
          <Ionicons name="location-outline" size={20} color={colors.gold} />
        )}
      </Pressable>

      {status.kind === 'found' && (
        <Text style={styles.info} accessibilityLiveRegion="polite">
          {status.km <= IN_CITY_KM
            ? `Jesteś w miejscowości ${status.city}.`
            : `Najbliższa miejscowość z trasami: ${status.city} (${Math.round(status.km)} km).`}
        </Text>
      )}
      {status.kind === 'error' && (
        <Text style={[styles.info, styles.error]} accessibilityLiveRegion="polite">
          {status.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { maxWidth: 320, gap: space.sm },
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  pressed: { backgroundColor: colors.surfaceRaised },
  label: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  info: { color: colors.gold, fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  error: { color: colors.danger },
});
