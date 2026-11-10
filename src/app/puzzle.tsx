import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState, type ReactNode, type Ref } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnswerForm } from '@/components/puzzle/answer-form';
import { ProgressHeader } from '@/components/puzzle/progress-header';
import { StatusMessage } from '@/components/puzzle/status-message';
import { StepCard } from '@/components/puzzle/step-card';
import { TargetMap } from '@/components/puzzle/target-map';
import { useKeepAboveKeyboard } from '@/components/puzzle/use-keep-above-keyboard';
import { findGame, isCorrectAnswer, type Game } from '@/data/games';
import { colors, radius, space } from '@/theme';

/** Screen 3: puzzle with map and progress. Design: design/03-puzzle.png */
export default function PuzzleScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const game = findGame(gameId);

  if (!game) {
    return (
      <Screen>
        <StatusMessage
          icon="help-circle-outline"
          iconColor={colors.textMuted}
          title="Nie znaleziono trasy"
          body="Ta trasa nie istnieje. Wybierz inną z listy tras."
        />
      </Screen>
    );
  }

  if (game.steps.length === 0) {
    return (
      <Screen>
        <StatusMessage icon="hourglass-outline" title="Ta trasa będzie dostępna wkrótce" body={game.title} />
      </Screen>
    );
  }

  // The key resets progress when the player opens a different route.
  return <PuzzleGame key={game.id} game={game} />;
}

function PuzzleGame({ game }: { game: Game }) {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const onAnswerLayout = useKeepAboveKeyboard(scrollRef);
  const [stepIndex, setStepIndex] = useState(0);
  const total = game.steps.length;
  const step = game.steps[stepIndex];

  function handleSubmit(answer: string): boolean {
    if (!step || !isCorrectAnswer(answer, step.answer)) return false;
    Keyboard.dismiss();
    setStepIndex((index) => index + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    return true;
  }

  return (
    <>
      <ProgressHeader solved={stepIndex} total={total} />
      <Screen scrollRef={scrollRef}>
        {step ? (
          <>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="head-cog" size={36} color={colors.gold} />
            </View>
            <StepCard step={step} />
            <View onLayout={onAnswerLayout}>
              <AnswerForm onSubmit={handleSubmit} />
            </View>
            <View style={styles.map}>
              <TargetMap location={step.location} />
            </View>
          </>
        ) : (
          <StatusMessage
            icon="trophy-outline"
            title="Zagadka rozwiązana!"
            body={`Trasa „${game.title}” ukończona. Gratulacje, detektywie!`}
          />
        )}
      </Screen>
    </>
  );
}

type ScreenProps = { children: ReactNode; scrollRef?: Ref<ScrollViewInstance> };

function Screen({ children, scrollRef }: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'android' ? 'height' : undefined}>
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + space.xxl }]}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: space.lg, paddingTop: space.lg, gap: space.xxl },
  badge: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
  },
  map: { marginTop: space.sm },
});
