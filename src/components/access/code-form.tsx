import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentRef, Ref } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Panel } from '@/components/access/panel';
import { colors, fonts, radius, space } from '@/theme';

type Props = {
  code: string;
  showError: boolean;
  onChangeCode: (code: string) => void;
  onSubmit: () => void;
  /** The input, button and error block; the screen scrolls it above the keyboard. */
  formRef: Ref<ComponentRef<typeof View>>;
};

/** "Podejmij wyzwanie!" panel: code input and the AKTYWUJ button. */
export function CodeForm({ code, showError, onChangeCode, onSubmit, formRef }: Props) {
  return (
    <Panel>
      <Text style={styles.heading} accessibilityRole="header">
        PODEJMIJ{'\n'}WYZWANIE!
      </Text>
      <Text style={styles.lead}>Jeżeli odnalazłeś ukryte hasło, wpisz je poniżej</Text>

      <View ref={formRef} style={styles.form}>
        <TextInput
          value={code}
          onChangeText={onChangeCode}
          onSubmitEditing={onSubmit}
          placeholder="WPISZ TAJNY KOD..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          returnKeyType="go"
          submitBehavior="submit"
          selectionColor={colors.gold}
          accessibilityLabel="Tajny kod"
          style={[styles.input, showError && styles.inputError]}
        />
        {showError ? (
          <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
            Nieprawidłowy kod, spróbuj ponownie
          </Text>
        ) : null}
        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Aktywuj">
          <Ionicons name="lock-closed" size={18} color={colors.textOnGold} />
          <Text style={styles.buttonText}>AKTYWUJ</Text>
        </Pressable>
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 3.6,
    textAlign: 'center',
  },
  lead: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: space.lg,
  },
  form: { alignSelf: 'stretch', marginTop: space.xl, gap: space.lg },
  input: {
    height: 50,
    paddingHorizontal: space.lg,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 2,
    textAlign: 'center',
  },
  inputError: { borderColor: colors.danger },
  error: {
    color: colors.danger,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -space.sm,
  },
  button: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    boxShadow: '0 0 20px rgba(242, 201, 76, 0.3)',
  },
  buttonPressed: { backgroundColor: colors.goldDim },
  buttonText: {
    color: colors.textOnGold,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 2.4,
  },
});
