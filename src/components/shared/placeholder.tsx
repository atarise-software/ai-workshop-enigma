import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, space } from '@/theme';

type Props = { name: string; ticket: string; next?: { href: Href; label: string } };

/** Stand-in screen, replaced by the ticket that implements it. */
export function Placeholder({ name, ticket, next }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{ticket}</Text>
      <Text style={styles.name}>{name}</Text>
      {next ? (
        <Link href={next.href} style={styles.link}>
          {next.label} →
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', padding: space.xl, gap: space.md },
  label: { color: colors.textMuted, fontFamily: fonts.medium, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 28 },
  link: { color: colors.gold, fontFamily: fonts.semibold, fontSize: 16 },
});
