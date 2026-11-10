import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, space } from '@/theme';

export function AppHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top + space.sm }]}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>QUEST</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    paddingHorizontal: space.lg,
    paddingBottom: space.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: { backgroundColor: '#000', paddingHorizontal: space.md, paddingVertical: 2 },
  logoText: { color: colors.text, fontFamily: fonts.extrabold, fontSize: 22, letterSpacing: 2 },
});
