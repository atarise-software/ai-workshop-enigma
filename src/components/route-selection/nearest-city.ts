import { cities } from '@/data/games';

export type City = (typeof cities)[number];

/** City centres (Rynek Główny, Plac Zamkowy). Kept here because games.ts has no city coordinates. */
const cityCenters: Record<City, { latitude: number; longitude: number }> = {
  Kraków: { latitude: 50.0617, longitude: 19.9373 },
  Warszawa: { latitude: 52.2477, longitude: 21.0137 },
};

function distanceKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function findNearestCity(position: { latitude: number; longitude: number }): { city: City; km: number } {
  return cities
    .map((city) => ({ city, km: distanceKm(position, cityCenters[city]) }))
    .reduce((best, candidate) => (candidate.km < best.km ? candidate : best));
}
