import type { VerifiedDetail } from './verification.js';

/**
 * The V1 place model. See docs/product/place-information.md for the product
 * requirements this encodes, and docs/research/verification.md for how each
 * `VerifiedDetail` gets its label.
 */

export type MilkType =
  | 'oat'
  | 'soy'
  | 'almond'
  | 'coconut'
  | 'rice'
  | 'other'
  /** A surcharge is known but which milk type(s) it applies to isn't. */
  | 'unspecified';

export type Surcharge =
  | { kind: 'none' }
  | { kind: 'amount'; amount: number; currency: string };

export interface MilkTypeOffering {
  type: MilkType;
  surcharge: VerifiedDetail<Surcharge>;
}

export interface Place {
  id: string;
  /** Café name and the specific branch, e.g. "Slake Terreaux". Always known. */
  name: string;
  /** Precise location of this branch. Always known. */
  location: {
    latitude: number;
    longitude: number;
  };
  /** Free-text address, for display only — not used for map placement. */
  address?: string;
  website?: string;
  plantMilkAvailable: VerifiedDetail<boolean>;
  /**
   * Known plant-milk offerings. Empty when `plantMilkAvailable` isn't `true`,
   * or when availability is known but which types are offered isn't.
   */
  milkTypes: VerifiedDetail<MilkTypeOffering[]>;
}
