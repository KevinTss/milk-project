/**
 * Shared verification wrapper for every café detail (availability, milk
 * type, surcharge). See docs/research/verification.md for the rules these
 * types encode.
 */

export type VerificationLabel = 'verified' | 'reported' | 'unknown';

export interface Evidence {
  /** URL, or a short description when no URL exists (e.g. a firsthand visit). */
  source: string;
  /** ISO 8601 date the evidence was produced (visit, photo, receipt, response, source update). */
  evidenceDate: string | null;
}

/**
 * A single fact about a café, carrying its own confidence label independent
 * of any other detail on the same place.
 */
export interface VerifiedDetail<T> {
  label: VerificationLabel;
  /** The known answer. Always `null` when `label` is `'unknown'`. */
  value: T | null;
  evidence: Evidence[];
  /** ISO 8601 date a reviewer confirmed this detail, or `null` if not yet reviewed. */
  verificationDate: string | null;
  /** Optional short explanation, e.g. why a detail is unknown or what's still pending. */
  note?: string;
}
