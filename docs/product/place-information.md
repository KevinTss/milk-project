# Café information for V1

Milk helps people find nearby cafés offering their preferred plant milk with the lowest surcharge. Our focus is the price barrier between cow milk and plant-based alternatives; total drink prices are outside V1.

## What we collect

“Required” means we need an answer or an explicit unknown status. Only a café's name and precise location must be known before it appears on the map.

| Information | Why we need it | Required or optional |
| --- | --- | --- |
| Café name and location of the specific branch | Identify the café, place it on the map, and show nearby options. | Required and known. |
| Whether plant milk is available | Establish whether the café can meet the user's need. | Required: yes, no, or unknown. |
| Available plant-milk types | Help users find their preferred milk, such as oat or soy. | Required when available; types may be unknown. |
| Surcharge for each milk type | Compare the extra cost of choosing that milk instead of cow milk. Different types may have different charges. | Required for each known type: amount, explicitly no extra charge, unknown, or disputed. |
| Currency | Make surcharge amounts meaningful. | Required for a numeric surcharge; if missing, the price is incomplete and cannot be compared. |
| Café website or social media | Help users find menus or contact the café. | Optional. Check that the link belongs to the correct café or branch. |
| Status, source, and date checked | Let users judge the basis and freshness of each detail. | Required for reported or verified details; retain both sources when disputed. |

## Verification and confidence

Confidence applies to each detail, not to the whole café. Oat-milk availability might be verified while its surcharge is unknown. These labels describe evidence, not a guarantee that information has not changed.

- **Reported:** one firsthand visitor report is sufficient for V1. Record whether they asked staff or paid, and the visit date. A photo or direct source link is encouraged but optional: a valid conversation or purchase may have no public evidence.
- **Verified:** a maintainer has checked that supporting evidence establishes the specific claim for the correct branch. Evidence may include a clear dated menu photo, an official menu, or direct café confirmation. An attachment alone does not confer verification. AI may assist review; a maintainer makes the final decision.
- **Unknown:** we do not have enough information to answer. Do not invent a source or check date for a missing fact.
- **Disputed:** conflicting evidence remains unresolved. Retain the competing claims, sources, and dates for review.

Check the name and location against the café's own information or a firsthand visit. Check availability, milk types, and surcharges against explicit menu information, café confirmation, or a visitor's firsthand report. A general website link is useful for investigation but is not evidence of a particular surcharge. Record the direct supporting source where available and show when the information was checked; for visitor reports, record the visit date and, if reviewed, the review date.

## Unknown information and map results

- Keep identifiable cafés on the map even when availability, milk types, or surcharges are unknown. Label the missing detail clearly so visitors can help fill the gap.
- Distinguish “no plant milk available” from “availability unknown.” Neither is a confirmed match for a user's preferred milk. Unknown milk types are not a confirmed match either.
- Distinguish “surcharge unknown” from “no extra charge.” An omitted surcharge on a menu is not proof that plant milk is free.
- Do not treat unknown or disputed prices as zero or rank them as the cheapest. Include only supported, unchallenged zero-surcharge claims in “no surcharge” results, preserving their reported or verified labels.
- Do not extend evidence for one milk type or branch to another.

## Resolving conflicting reports

A newer report does not automatically override verified information. A maintainer checks whether the sources concern the same branch, milk type, and circumstances, then seeks current evidence such as an updated menu or café confirmation.

If the evidence resolves the conflict, update the affected detail and its status, source, and date. If it remains inconclusive, keep the detail disputed: the café stays visible, its surcharge is uncertain, and it is excluded from “no surcharge” results. AI may help compare evidence; resolution remains a maintainer decision in V1.

## What can wait

Detailed surcharge conditions are outside the V1 minimum. However, evidence limited to a particular drink must not become a verified café-wide price. If that limitation prevents a reliable general answer, leave the surcharge uncertain until clarified.

Total drink prices, opening hours, milk brands, ratings, venue photos, and amenities are also outside V1's collection scope. Supporting evidence photos remain optional.

This document defines product information and review rules, not a database design.

Related issue: [#2 — Define the information we need about a café](https://github.com/KevinTss/milk-project/issues/2).
