/**
 * Sample data for the workshop. Route names and the first puzzle come from Figma;
 * answers and the later steps are made up for the demo. Copy stays Polish because it is user-facing.
 */

export type Difficulty = 'Łatwy' | 'Średni' | 'Trudny';

export type Location = {
  latitude: number;
  longitude: number;
  label: string;
};

export type Step = {
  id: string;
  title: string;
  story: string;
  task: string;
  cipherHint: string;
  /** Compared case-insensitively, ignoring surrounding whitespace. */
  answer: string;
  location: Location;
};

export type Game = {
  id: string;
  title: string;
  city: string;
  durationHours: number;
  difficulty: Difficulty;
  bestseller: boolean;
  description: string;
  /** Code printed on the business card; unlocks the game on the access screen. */
  accessCode: string;
  steps: Step[];
};

export const cities = ['Kraków', 'Warszawa'] as const;

export const games: Game[] = [
  {
    id: 'tajemnica-zegarmistrza',
    title: 'Tajemnica Zegarmistrza',
    city: 'Kraków',
    durationHours: 2.5,
    difficulty: 'Średni',
    bestseller: true,
    description: 'Ślady starego zegarmistrza prowadzą przez Rynek Główny. Każda wskazówka to kolejny punkt na mapie.',
    accessCode: 'QUEST',
    steps: [
      {
        id: 'sw-wojciech',
        title: 'Twoja próba',
        story:
          'Twoja Próba zaczyna się tam, skąd pewien misjonarz wyruszył na rzeź, a jego poćwiartowane ciało król wykupił za wagę kruszcu. Udaj się na Rynek Główny, pod najstarszą, zatopioną w bruku świątynię – Kościół św. Wojciecha.',
        task: 'Odnajdź na jej zewnętrznym murze żeliwną tablicę Jana Kapistrana.',
        cipherHint: 'Wpisz ostatnie słowo z pierwszej linijki tekstu. Złam go, a wskażemy Ci cel.',
        answer: 'ZEGAR',
        location: { latitude: 50.06135, longitude: 19.93802, label: 'Kościół św. Wojciecha' },
      },
      {
        id: 'sukiennice',
        title: 'Druga próba',
        story: 'Kupcy przez wieki ważyli tu sukno i sól. Zegarmistrz zostawił znak tam, gdzie ważono najcenniejsze towary.',
        task: 'Stań przy wschodnim wejściu do Sukiennic i policz maszkarony nad arkadami.',
        cipherHint: 'Wpisz nazwę budynku, w którym stoisz.',
        answer: 'SUKIENNICE',
        location: { latitude: 50.06167, longitude: 19.93737, label: 'Sukiennice' },
      },
      {
        id: 'mariacki',
        title: 'Ostatnia próba',
        story: 'Melodia urywa się w połowie od siedmiuset lat. Zegarmistrz wiedział dlaczego.',
        task: 'Wysłuchaj sygnału z wieży kościoła Mariackiego o pełnej godzinie.',
        cipherHint: 'Jak nazywa się melodia grana z wieży?',
        answer: 'HEJNAŁ',
        location: { latitude: 50.06164, longitude: 19.93948, label: 'Kościół Mariacki' },
      },
    ],
  },
  {
    id: 'widmo-ekspresu',
    title: 'Widmo Ekspresu',
    city: 'Kraków',
    durationHours: 3,
    difficulty: 'Trudny',
    bestseller: false,
    description: 'Pociąg, który nigdy nie dojechał do celu. Pasażerowie zniknęli, ale zostawili wiadomość.',
    accessCode: 'EKSPRES',
    steps: [],
  },
  {
    id: 'archiwum-alchemika',
    title: 'Archiwum Alchemika',
    city: 'Warszawa',
    durationHours: 1.5,
    difficulty: 'Łatwy',
    bestseller: false,
    description: 'Zapomniane receptury ukryte w miejskim archiwum czekają na kogoś, kto potrafi je odczytać.',
    accessCode: 'ALCHEMIA',
    steps: [],
  },
];

export function findGame(id: string | undefined): Game | undefined {
  return games.find((game) => game.id === id);
}

export function isCorrectAnswer(input: string, expected: string): boolean {
  return input.trim().toLocaleUpperCase('pl') === expected.toLocaleUpperCase('pl');
}
