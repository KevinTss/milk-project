# Café information for V1

Milk helps people find nearby cafés offering their preferred plant milk with the lowest surcharge. Our focus is the price barrier between cow milk and plant-based alternatives; total drink prices are outside V1.

## What we collect

“Required” means we need an answer or an explicit unknown status. Only a café's name and precise location must be known before it appears on the map.

| Information | Why we need it | Required or optional |
| --- | --- | --- |
| Café name and location of the specific branch | Identify the café, place it on the map, and show nearby options. | Required and known. |
| Whether plant milk is available | Establish whether the café can meet the user's need. | Required: yes, no, or unknown. |
| Available plant-milk types | Help users find their preferred milk, such as oat or soy. | Required when available; types may be unknown. |
| Surcharge for each milk type | Compare the extra cost of choosing that milk instead of cow milk. Different types may have different charges. | Required for each known type: amount, explicitly no extra charge, or unknown. |
| Currency | Make surcharge amounts meaningful. | Required for a numeric surcharge; if missing, the price is incomplete and cannot be compared. |
| Café website or social media | Help users find menus or contact the café. | Optional. Check that the link belongs to the correct café or branch. |
| Status, sources, and dates | Let users judge the basis and freshness of each detail. | Record the visible status, supporting sources, evidence dates, and verification date where applicable, following the verification rules below. |

## Verification and confidence

Use only three visible labels, applied to each detail rather than the whole café:

- **Verified:** reviewed evidence meets the source and freshness rules, with no unresolved credible conflict.
- **Reported:** current eligible customer evidence exists, but does not meet the verification threshold.
- **Unknown:** the answer is missing, ambiguous, conflicting, or has no usable current evidence.

For example, oat-milk availability can be Verified while its surcharge is Unknown. These labels describe the evidence, not a guarantee that information has not changed.

Follow the [V1 verification rules](../research/verification.md) for eligible sources, customer corroboration, the 90-day freshness window, dates, conflict resolution, and manual review. That document is the source of truth for verification. Disputes and information needing rechecking are tracked internally, not shown as extra labels.

A café website or social media link helps users find or contact the café; the link alone does not verify a detail. Social media is not a verification source in V1.

## Unknown information and map results

- Keep identifiable cafés on the map even when availability, milk types, or surcharges are unknown. Label the missing detail clearly so visitors can help fill the gap.
- Distinguish “no plant milk available” from “availability unknown.” Neither is a confirmed match for a user's preferred milk. Unknown milk types are not a confirmed match either.
- Distinguish “surcharge unknown” from “no extra charge.” An omitted surcharge on a menu is not proof that plant milk is free.
- Do not treat Unknown surcharges as zero or rank them as the cheapest. Include only supported, unchallenged zero-surcharge claims in “no surcharge” results, preserving their Reported or Verified labels. Exclude Reported details from verified-only results.
- Do not extend evidence for one milk type or branch to another.

## What can wait

Detailed surcharge conditions are outside the V1 minimum. However, evidence limited to a particular drink must not become a verified café-wide price. If that limitation prevents a reliable general answer, leave the surcharge uncertain until clarified.

Total drink prices, opening hours, milk brands, ratings, venue photos, and amenities are also outside V1's collection scope. Requirements for supporting menu or receipt photos are defined in the verification rules; these are separate from venue photos.

This document defines the information users need, not a database design.

Related issue: [#2 — Define the information we need about a café](https://github.com/KevinTss/milk-project/issues/2).
