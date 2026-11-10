import { Placeholder } from '@/components/shared/placeholder';

/** Screen 1: route selection. Design: design/01-route-selection.png */
export default function RouteSelectionScreen() {
  return (
    <Placeholder
      ticket="Screen 1"
      name="Wybór trasy"
      next={{ href: { pathname: '/access', params: { gameId: 'tajemnica-zegarmistrza' } }, label: 'Tajemnica Zegarmistrza' }}
    />
  );
}
