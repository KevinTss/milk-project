# @milk/domain

The shared `Place` model for Milk — the technical representation of a café
and its plant-milk information, referenced by the API and mobile app.

This implements [issue #6](https://github.com/KevinTss/milk-project/issues/6),
built on top of the product requirements in
[docs/product/place-information.md](../../docs/product/place-information.md)
and the confidence rules in
[docs/research/verification.md](../../docs/research/verification.md).

## The model

Every fact we don't know for certain (is plant milk available, which types,
what they cost) is wrapped in a `VerifiedDetail<T>`: a `value`, a confidence
`label` (`'verified' | 'reported' | 'unknown'`), and the `evidence` behind it.
`value` is always `null` when `label` is `'unknown'` — we never guess.

```ts
import type { Place } from '@milk/domain';

const zeitgeist: Place = {
  id: 'zeitgeist-lyon-1',
  name: 'Zeitgeist',
  location: { latitude: 45.7673, longitude: 4.8343 },
  address: '12 rue des Augustins, 69001 Lyon',
  website: 'https://zeitgeist-cafe.com',
  plantMilkAvailable: {
    label: 'verified',
    value: true,
    evidence: [
      {
        source: 'https://zeitgeist-cafe.com/wp-content/uploads/2026/10/OCT-A4-combine.pdf',
        evidenceDate: '2026-10-04',
      },
    ],
    verificationDate: '2026-10-04',
  },
  milkTypes: {
    label: 'verified',
    value: [
      { type: 'oat', surcharge: { label: 'verified', value: { kind: 'none' }, evidence: [], verificationDate: '2026-10-04' } },
      { type: 'soy', surcharge: { label: 'verified', value: { kind: 'none' }, evidence: [], verificationDate: '2026-10-04' } },
      {
        type: 'almond',
        surcharge: {
          label: 'verified',
          value: { kind: 'amount', amount: 0.5, currency: 'EUR' },
          evidence: [],
          verificationDate: '2026-10-04',
        },
      },
    ],
    evidence: [
      {
        source: 'https://zeitgeist-cafe.com/wp-content/uploads/2026/10/OCT-A4-combine.pdf',
        evidenceDate: '2026-10-04',
      },
    ],
    verificationDate: '2026-10-04',
  },
};
```

Use `'unspecified'` as a `MilkType` when a surcharge is known but the exact
milk type(s) it applies to isn't (see Café Bacatá in
[issue #3](https://github.com/KevinTss/milk-project/issues/3)'s research).

`MILK_TYPE_LABELS` gives the canonical display name for each `MilkType`
(`'oat' → 'Oat'`, `'unspecified' → 'Unspecified type'`, ...), so every client
shows the same wording instead of each inventing its own.

## What's deliberately left out

Per the product doc: total drink prices, opening hours, milk brands,
ratings, photos, and per-drink surcharge conditions. This model covers V1
only — extend it as new requirements land, rather than anticipating them
here.
