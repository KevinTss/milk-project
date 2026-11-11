import { MILK_TYPE_LABELS, type MilkType, type MilkTypeOffering, type VerifiedDetail } from '@milk/domain';

export function milkTypeLabel(type: MilkType): string {
  return MILK_TYPE_LABELS[type];
}

export function availabilitySummary(detail: VerifiedDetail<boolean>): string {
  if (detail.label === 'unknown' || detail.value === null) {
    return 'Plant milk availability unknown';
  }
  if (!detail.value) {
    return detail.label === 'verified' ? 'No plant milk available' : 'Reported to have no plant milk';
  }
  return detail.label === 'verified' ? 'Plant milk available' : 'Reported to have plant milk';
}

export function surchargeSummary(offering: MilkTypeOffering): string {
  const { surcharge } = offering;
  if (surcharge.label === 'unknown' || surcharge.value === null) return 'price unknown';
  if (surcharge.value.kind === 'none') return 'no extra charge';
  return `+${surcharge.value.amount} ${surcharge.value.currency}`;
}
