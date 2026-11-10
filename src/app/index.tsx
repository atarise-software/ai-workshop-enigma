import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CityPicker } from '@/components/route-selection/city-picker';
import { LocateButton } from '@/components/route-selection/locate-button';
import { type City } from '@/components/route-selection/nearest-city';
import { RouteCard } from '@/components/route-selection/route-card';
import { cities, games } from '@/data/games';
import { colors, fonts, space } from '@/theme';

/** Screen 1: route selection. Design: design/01-route-selection.png */
export default function RouteSelectionScreen() {
  const insets = useSafeAreaInsets();
  const [city, setCity] = useState<City>('Kraków');
  const cityGames = games.filter((game) => game.city === city);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + space.xxl }]}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.h1} accessibilityRole="header">
        Wybierz grę
      </Text>
      <Text style={styles.lead}>Wybierz trasę najbliższą Twojej aktualnej lokalizacji.</Text>

      <LocateButton onCityFound={setCity} />

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>ALBO</Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.hint}>Wybierz z pola wyboru miejscowość, w której się znajdujesz.</Text>
      <CityPicker options={cities} value={city} onChange={setCity} />

      <Text style={styles.h2} accessibilityRole="header">
        Najpopularniejsze trasy:
      </Text>
      <View style={styles.cards}>
        {cityGames.map((game) => (
          <RouteCard
            key={game.id}
            game={game}
            onPressDetails={() => router.push({ pathname: '/access', params: { gameId: game.id } })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: space.lg, paddingTop: space.xxl },
  h1: { color: colors.text, fontFamily: fonts.bold, fontSize: 30, lineHeight: 36 },
  lead: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: space.xl,
    marginBottom: space.xl,
  },
  divider: {
    maxWidth: 320,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    marginVertical: space.xl,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textMuted, fontFamily: fonts.semibold, fontSize: 10, lineHeight: 15, letterSpacing: 1.5 },
  hint: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: space.xl,
  },
  h2: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    marginTop: space.xxl + space.lg,
    marginBottom: space.xl,
  },
  cards: { gap: space.xl },
});
