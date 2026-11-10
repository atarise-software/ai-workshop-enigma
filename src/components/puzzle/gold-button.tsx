import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

type Props = {
  label: string;
  onPress: () => void;
  /** Arrow after the label, as on "ZWERYFIKUJ HASŁO →". */
  arrow?: boolean;
};

export function GoldButton({ label, onPress, arrow = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Text style={styles.label}>{label.toLocaleUpperCase('pl')}</Text>
      {arrow && <Ionicons name="arrow-forward" size={18} color={colors.textOnGold} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    borderRadius: radius.sm,
    backgroundColor: colors.gold,
    shadowColor: colors.gold,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  pressed: { backgroundColor: colors.goldDim },
  label: { color: colors.textOnGold, fontFamily: fonts.bold, fontSize: 16, lineHeight: 24, letterSpacing: 2 },
});
