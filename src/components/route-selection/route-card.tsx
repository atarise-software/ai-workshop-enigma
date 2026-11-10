import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Game } from '@/data/games';
import { colors, fonts, radius, space } from '@/theme';

type Props = {
  game: Game;
  onPressDetails: () => void;
};

export function RouteCard({ game, onPressDetails }: Props) {
  const duration = `${game.durationHours.toFixed(1)} h`;

  return (
    <View style={styles.card}>
      {/* Dark block instead of the route photo (out of scope). */}
      <View style={styles.photo}>
        <Ionicons
          name="compass-outline"
          size={48}
          color={colors.border}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        {game.bestseller && (
          <View style={styles.badge} accessible accessibilityLabel="Bestseller">
            <Ionicons name="star" size={12} color={colors.gold} />
            <Text style={styles.badgeText}>Bestseller</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{game.title}</Text>

        <View style={styles.meta}>
          <View style={styles.metaItem} accessible accessibilityLabel={`Czas: ${duration}`}>
            <Ionicons name="time-outline" size={15} color={colors.textMuted} />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          <View style={styles.metaItem} accessible accessibilityLabel={`Poziom trudności: ${game.difficulty}`}>
            <Ionicons name="walk-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>{game.difficulty}</Text>
          </View>
        </View>

        <Pressable
          onPress={onPressDetails}
          style={({ pressed }) => [styles.details, pressed && styles.detailsPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Szczegóły: ${game.title}`}>
          <Text style={styles.detailsText}>SZCZEGÓŁY</Text>
          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  photo: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  badge: {
    position: 'absolute',
    top: space.lg,
    right: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingHorizontal: space.md,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.goldDim,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  badgeText: { color: colors.gold, fontFamily: fonts.medium, fontSize: 14, lineHeight: 24 },
  body: { padding: 20, gap: space.lg },
  title: { color: colors.text, fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  metaText: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20 },
  details: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space.lg,
    paddingRight: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  detailsPressed: { backgroundColor: colors.surfaceRaised },
  detailsText: { color: colors.text, fontFamily: fonts.bold, fontSize: 14, lineHeight: 20, letterSpacing: 1.5 },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
