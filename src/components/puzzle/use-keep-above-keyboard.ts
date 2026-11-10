import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { Keyboard, type LayoutChangeEvent, type ScrollViewInstance } from 'react-native';

import { space } from '@/theme';

/**
 * Scrolls so the whole block (field, error and button) sits above the keyboard.
 * The OS only keeps the focused field visible, which leaves the button hidden.
 * Attach `onLayout` to a direct child of the ScrollView's content container.
 */
export function useKeepAboveKeyboard(scrollRef: RefObject<ScrollViewInstance | null>) {
  const blockBottom = useRef(0);

  const reveal = useCallback(
    (keyboardTop: number) => {
      scrollRef.current?.measureInWindow((_x, scrollTop) => {
        const visibleHeight = keyboardTop - scrollTop;
        const offset = blockBottom.current + space.lg - visibleHeight;
        if (offset > 0) scrollRef.current?.scrollTo({ y: offset, animated: true });
      });
    },
    [scrollRef],
  );

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidShow', (event) => reveal(event.endCoordinates.screenY));
    return () => sub.remove();
  }, [reveal]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;
      blockBottom.current = y + height;
      // The error message makes the block taller; keep the button visible.
      const keyboard = Keyboard.metrics();
      if (Keyboard.isVisible() && keyboard) reveal(keyboard.screenY);
    },
    [reveal],
  );

  return onLayout;
}
