import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

type Props = { label: string; onPress: () => void };

/** Outlined button with a gold pin on the left and an arrow on the right ("WEJDŹ DO GRY"). */
export function OutlineButton({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <View style={styles.label}>
        <Ionicons name="location-outline" size={20} color={colors.gold} />
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.arrow}>
        <Ionicons name="arrow-forward" size={16} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
  },
  pressed: { backgroundColor: colors.surfaceRaised },
  label: { flexDirection: 'row', alignItems: 'center', gap: space.lg, flexShrink: 1 },
  text: { color: colors.text, fontFamily: fonts.bold, fontSize: 14, lineHeight: 20, letterSpacing: 2.1 },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
