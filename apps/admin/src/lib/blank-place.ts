import type { Place, VerifiedDetail } from '@milk/domain';

function blankDetail<T>(): VerifiedDetail<T> {
  return { label: 'unknown', value: null, evidence: [], verificationDate: null };
}

export function createBlankPlace(): Place {
  return {
    id: '',
    name: '',
    location: { latitude: 0, longitude: 0 },
    address: '',
    website: '',
    plantMilkAvailable: blankDetail<boolean>(),
    milkTypes: blankDetail(),
  };
}

/** Slug a café name into a stable id, e.g. "Café Zeitgeist" -> "cafe-zeitgeist". */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
