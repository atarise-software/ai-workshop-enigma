import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

type Props<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

/** Dropdown built from Pressables; the project has no picker package. */
export function CityPicker<T extends string>({ options, value, onChange }: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        style={({ pressed }) => [styles.field, open && styles.fieldOpen, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`Miejscowość: ${value}`}
        accessibilityHint="Rozwija listę miejscowości"
        accessibilityState={{ expanded: open }}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.gold} />
      </Pressable>

      {open && (
        <View style={styles.list} accessibilityRole="list">
          {options.map((option) => {
            const selected = option === value;
            return (
              <Pressable
                key={option}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
                style={({ pressed }) => [styles.option, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={option}
                accessibilityState={{ selected }}>
                <Text style={[styles.optionText, selected && styles.optionSelected]}>{option}</Text>
                {selected && <Ionicons name="checkmark" size={18} color={colors.gold} />}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { maxWidth: 320 },
  field: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.input,
  },
  fieldOpen: { borderColor: colors.goldDim },
  pressed: { opacity: 0.7 },
  value: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  list: {
    marginTop: space.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceRaised,
    overflow: 'hidden',
  },
  option: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
  },
  optionText: { color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  optionSelected: { color: colors.gold, fontFamily: fonts.semibold },
});
