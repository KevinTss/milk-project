import type { MilkType, MilkTypeOffering, Place, VerificationLabel } from '@milk/domain';
import { MILK_TYPE_LABELS } from '@milk/domain';

import { amberTierFor, placeColorState } from '@/utils/place-pricing';

export function milkTypeLabel(type: MilkType): string {
  return MILK_TYPE_LABELS[type];
}

export function verificationLabelText(label: VerificationLabel): string {
  if (label === 'verified') return 'Verified';
  if (label === 'reported') return 'Reported';
  return 'Unknown';
}

/** Price text plus which color tier it should render in, for a milk-type row. */
export function priceDisplay(
  offering: MilkTypeOffering,
): { text: string; colorKind: 'green' | 'low' | 'mid' | 'high' | 'gray' } {
  const { surcharge } = offering;
  if (surcharge.label === 'unknown' || surcharge.value === null) {
    return { text: 'Price unknown', colorKind: 'gray' };
  }
  if (surcharge.value.kind === 'none') {
    return { text: '€0', colorKind: 'green' };
  }
  return { text: `+€${surcharge.value.amount}`, colorKind: amberTierFor(surcharge.value.amount) };
}

/** One-line summary of a café's pricing state, for the search result list. */
export function shortSummaryLabel(place: Place): string {
  const state = placeColorState(place);
  switch (state.kind) {
    case 'green':
      return 'No surcharge';
    case 'split':
      return 'Mixed pricing';
    case 'amber':
      return 'Surcharge';
    case 'outline':
      return 'No plant milk';
    case 'gray':
      return 'Pricing unknown';
  }
}
