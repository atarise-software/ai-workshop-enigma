import { router, useLocalSearchParams } from 'expo-router';
import { type ComponentRef, useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CodeForm } from '@/components/access/code-form';
import { OutlineButton } from '@/components/access/outline-button';
import { Panel } from '@/components/access/panel';
import { findGame, isCorrectAnswer } from '@/data/games';
import { colors, fonts, space } from '@/theme';

/** Works after a deep link too: opens the list when it is not in the stack. */
function backToRoutes() {
  router.dismissTo('/');
}

/** Screen 2: unlock a game with an access code. Design: design/02-access-code.png */
export default function AccessScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const game = findGame(gameId);
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);

  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const contentRef = useRef<ComponentRef<typeof View>>(null);
  const formRef = useRef<ComponentRef<typeof View>>(null);

  // The code field is the only input here: when the keyboard opens, scroll the field,
  // the error and AKTYWUJ into view.
  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidShow', () => {
      if (!formRef.current || !contentRef.current) return;
      formRef.current.measureLayout(contentRef.current, (_x, y) => {
        scrollRef.current?.scrollTo({ y: Math.max(0, y - space.xl), animated: true });
      });
    });
    return () => sub.remove();
  }, []);

  if (!game) {
    return (
      <View style={[styles.screen, styles.notFound]}>
        <Panel style={styles.notFoundPanel}>
          <Text style={styles.notFoundTitle} accessibilityRole="header">
            Nie znaleziono trasy
          </Text>
          <Text style={styles.notFoundText}>Wybierz trasę z listy, aby wpisać do niej kod.</Text>
          <OutlineButton label="WRÓĆ DO TRAS" onPress={backToRoutes} />
        </Panel>
      </View>
    );
  }

  const submit = () => {
    if (isCorrectAnswer(code, game.accessCode)) {
      Keyboard.dismiss();
      router.push({ pathname: '/puzzle', params: { gameId: game.id } });
    } else {
      setShowError(true);
    }
  };

  const changeCode = (next: string) => {
    setCode(next);
    setShowError(false);
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + space.xxl }]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      automaticallyAdjustKeyboardInsets>
      <View ref={contentRef} style={styles.stack}>
        <Panel>
          <Text style={styles.title} accessibilityRole="header">
            TRAFIŁEŚ NA TROP TAJNEJ ORGANIZACJI
          </Text>
          <Text style={styles.subtitle}>Aby do niej dołączyć, musisz przejść szereg prób.</Text>
        </Panel>

        <CodeForm
          code={code}
          showError={showError}
          onChangeCode={changeCode}
          onSubmit={submit}
          formRef={formRef}
        />

        <Panel>
          <Text style={styles.noCodeTitle} accessibilityRole="header">
            NIE ZNASZ HASŁA?
          </Text>
          <Text style={styles.noCodeSubtitle}>ODNAJDŹ NAJBLIŻSZĄ TAJNĄ TRASĘ</Text>
          <OutlineButton label="WEJDŹ DO GRY" onPress={backToRoutes} />
        </Panel>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: space.xl, paddingTop: space.xxl + space.lg },
  stack: { gap: space.xxl },
  title: {
    color: colors.gold,
    fontFamily: fonts.bold,
    fontSize: 34,
    lineHeight: 44,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: space.lg,
  },
  noCodeTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 2.4,
    textAlign: 'center',
  },
  noCodeSubtitle: {
    color: colors.textMuted,
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: space.sm,
    marginBottom: space.lg,
  },
  notFound: { justifyContent: 'center', paddingHorizontal: space.xl },
  notFoundPanel: { gap: space.lg },
  notFoundTitle: { color: colors.gold, fontFamily: fonts.bold, fontSize: 24, lineHeight: 32, textAlign: 'center' },
  notFoundText: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
