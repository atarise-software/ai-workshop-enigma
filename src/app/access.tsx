import { useLocalSearchParams } from 'expo-router';

import { Placeholder } from '@/components/shared/placeholder';

/** Screen 2: unlock a game with an access code. Design: design/02-access-code.png */
export default function AccessScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  return (
    <Placeholder
      ticket="Screen 2"
      name="Wejście kodem"
      next={{ href: { pathname: '/puzzle', params: { gameId } }, label: 'Aktywuj' }}
    />
  );
}
