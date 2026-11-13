import type { Place, Surcharge } from '@milk/domain';

export type AmberTier = 'low' | 'mid' | 'high';

/**
 * A café's pin/summary color, per the "Proposed direction" convention in
 * docs/design/first-exploration.md: solid green (all free), split (mixed —
 * some free, some surcharged), solid amber (surcharge on everything), gray
 * (unknown pricing), outline (no plant milk at all).
 */
export type PlaceColorState =
  | { kind: 'green' }
  | { kind: 'split'; tier: AmberTier }
  | { kind: 'amber'; tier: AmberTier }
  | { kind: 'gray' }
  | { kind: 'outline' };

/** ≤€0.50 = low, €0.51–0.99 = mid, ≥€1.00 = high — the real thresholds in apps/api/data/places.json. */
export function amberTierFor(amount: number): AmberTier {
  if (amount <= 0.5) return 'low';
  if (amount < 1) return 'mid';
  return 'high';
}

/**
 * Determines a café's color state from its known milk offerings. When a
 * café has several surcharged types, the *highest* surcharge among them
 * sets the tier — a "most you might pay here" signal, per Kevin's call.
 */
export function placeColorState(place: Place): PlaceColorState {
  if (place.plantMilkAvailable.value === false) return { kind: 'outline' };

  const offerings = place.milkTypes.value;
  if (place.plantMilkAvailable.value !== true || !offerings || offerings.length === 0) {
    return { kind: 'gray' };
  }

  const known = offerings
    .map((offering) => offering.surcharge.value)
    .filter((value): value is Surcharge => value !== null);
  if (known.length === 0) return { kind: 'gray' };

  const hasFree = known.some((surcharge) => surcharge.kind === 'none');
  const paidAmounts = known
    .filter((surcharge) => surcharge.kind === 'amount')
    .map((surcharge) => surcharge.amount);

  if (paidAmounts.length === 0) return { kind: 'green' };

  const tier = amberTierFor(Math.max(...paidAmounts));
  return hasFree ? { kind: 'split', tier } : { kind: 'amber', tier };
}

/** True when a café has at least one free (€0) plant-milk type. */
export function hasFreeOption(place: Place): boolean {
  const state = placeColorState(place);
  return state.kind === 'green' || state.kind === 'split';
}

/** True when every known plant-milk type at this café is free. */
export function isFullyFree(place: Place): boolean {
  return placeColorState(place).kind === 'green';
}
