import { StyleSheet, Text, View } from 'react-native';

import type { Step } from '@/data/games';
import { colors, fonts, radius, space } from '@/theme';

type Props = { step: Step };

export function StepCard({ step }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} accessibilityRole="header">
        {step.title.toLocaleUpperCase('pl')}
      </Text>
      <Story text={step.story} highlight={step.location.label} />
      <View style={styles.divider} />
      <Text style={styles.body}>{step.task}</Text>

      <View style={styles.cipher}>
        <Text style={styles.cipherTitle}>SZYFR WEJŚCIOWY</Text>
        <Text style={styles.cipherHint}>{step.cipherHint}</Text>
      </View>
    </View>
  );
}

/** Story text with the place name in bold, as in the design. */
function Story({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight);
  if (at === -1) return <Text style={styles.body}>{text}</Text>;

  return (
    <Text style={styles.body}>
      {text.slice(0, at)}
      <Text style={styles.strong}>{highlight}</Text>
      {text.slice(at + highlight.length)}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: space.xl,
    gap: space.xl,
  },
  title: {
    color: colors.gold,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  body: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 26, textAlign: 'center' },
  strong: { fontFamily: fonts.bold },
  divider: { alignSelf: 'center', width: 48, height: 1, backgroundColor: colors.border },
  cipher: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.xl,
    gap: space.sm,
  },
  cipherTitle: {
    color: colors.gold,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 3,
    textAlign: 'center',
  },
  cipherHint: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, textAlign: 'center' },
});
