import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

import { GoldButton } from './gold-button';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  title: string;
  body?: string;
};

/** Completion, "coming soon" and "not found" states, each with a way back to the route list. */
export function StatusMessage({ icon, iconColor = colors.gold, title, body }: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={32} color={iconColor} />
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      <View style={styles.action}>
        <GoldButton label="Wróć do tras" onPress={() => router.dismissTo('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    gap: space.lg,
    padding: space.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  icon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
  },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 22, lineHeight: 30, textAlign: 'center' },
  body: { color: colors.textMuted, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, textAlign: 'center' },
  action: { alignSelf: 'stretch', marginTop: space.sm },
});
