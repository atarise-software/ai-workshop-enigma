import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, radius } from '@/theme';

type Props = ViewProps & { children: ReactNode };

/** Bordered dark card used by every section of the access screen. */
export function Panel({ children, style, ...rest }: Props) {
  return (
    <View style={[styles.panel, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 32,
    alignItems: 'center',
  },
});
