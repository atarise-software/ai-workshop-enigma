import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

import { GoldButton } from './gold-button';

type Props = {
  /** Returns true when the answer was correct; the field is then cleared. */
  onSubmit: (answer: string) => boolean;
};

export function AnswerForm({ onSubmit }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function submit() {
    if (onSubmit(value)) {
      setValue('');
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <View style={styles.form}>
      <View>
        <TextInput
          value={value}
          onChangeText={(text) => {
            setValue(text);
            setError(false);
          }}
          onSubmitEditing={submit}
          submitBehavior="submit"
          placeholder="WPROWADŹ TAJNY KOD..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          returnKeyType="done"
          style={[styles.input, error && styles.inputError]}
          accessibilityLabel="Tajny kod"
          accessibilityHint="Wpisz odpowiedź na zagadkę"
        />
        {error && (
          <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
            Nieprawidłowe hasło, spróbuj ponownie
          </Text>
        )}
      </View>
      <GoldButton label="Zweryfikuj hasło" arrow onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: space.lg },
  input: {
    height: 58,
    paddingHorizontal: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.input,
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 2,
    textAlign: 'center',
  },
  inputError: { borderColor: colors.danger },
  error: {
    marginTop: space.sm,
    color: colors.danger,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
