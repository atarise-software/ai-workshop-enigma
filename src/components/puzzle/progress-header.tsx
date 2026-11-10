import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, space } from '@/theme';

type Props = { solved: number; total: number };

export function ProgressHeader({ solved, total }: Props) {
  const remaining = total - solved;
  const ratio = total > 0 ? solved / total : 0;
  const label = `${solved} z ${total} punktów (pozostało ${remaining})`;

  return (
    <View style={styles.bar}>
      <View style={styles.row}>
        <Text style={styles.title}>TWÓJ POSTĘP</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={styles.track}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Twój postęp"
        accessibilityValue={{ min: 0, max: total, now: solved, text: label }}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.lg,
    gap: space.sm,
  },
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: space.md },
  title: { color: colors.gold, fontFamily: fonts.bold, fontSize: 16, lineHeight: 24, letterSpacing: 1.6 },
  label: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, flexShrink: 1 },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, backgroundColor: colors.gold },
});
