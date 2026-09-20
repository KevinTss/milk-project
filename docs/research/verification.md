# Café verification rules — V1

Use these rules for each detail at a specific café branch: availability, milk type, or surcharge. One detail can be Verified while another is Unknown.

These rules address [issue #4](https://github.com/KevinTss/milk-project/issues/4) and define how to verify the information collected in [place information](../product/place-information.md).

## 1. Check the source

| Source | How to use it |
| --- | --- |
| Official café website/menu or written café confirmation | Can verify an explicit, current answer directly. |
| Customer menu photo, receipt photo, or specific firsthand review | Starts as Reported. Requires independent supporting evidence to become Verified. |
| Google Maps | Apply the rules to the underlying review or photo. A generic listing does not verify a surcharge. |

For customer evidence, require **two independent sources agreeing on the same detail, with at least one supporting menu or receipt photo**. Copies of the same photo or review count as one source; different accounts alone do not prove independence. Even ten matching reports without a photo remain Reported.

Do not use social media, delivery platforms, phone calls, or in-person conversations as sources in V1. An optional café social media link is still allowed.

## 2. Check what the evidence actually proves

- Match the branch, milk type, and detail. Photos must be readable.
- A menu listing oat milk proves availability, not a zero surcharge.
- A receipt must explicitly identify the surcharge. A total price or missing surcharge line does not prove plant milk is free.
- Do not extend a price for one drink, milk type, or branch to all others. Detailed drink-specific pricing is outside V1.

## 3. Check and record dates

Availability and surcharge evidence must be **no more than 90 days old**. Both customer sources must meet this limit.

Record the source, evidence date (visit, photo, receipt, response, or source update), and verification date. Show dates to users. Reopening an old page or photo does not reset its age. If the evidence date is unknown, it cannot establish verification.

When either supporting customer source expires, recalculate the label: use Reported if current eligible customer evidence remains, otherwise Unknown. Fresh qualifying evidence can restore Verified status.

## 4. Handle disagreements

First check whether different branches, milk types, or drinks explain the difference.

A vague review such as “plant milk is expensive” does not overturn a specific price. A specific, newer firsthand report of a different surcharge can trigger a conflict.

If a clear update resolves the difference, update the detail. Otherwise, keep both sources, show Unknown, and seek a current menu or written café confirmation. Neither the newest source nor an official source automatically wins.

## 5. Choose one visible label

| Label | Use when |
| --- | --- |
| **Verified** | Reviewed evidence meets the source and freshness rules, with no unresolved credible conflict. |
| **Reported** | Current eligible customer evidence exists, but the verification threshold is not met. |
| **Unknown** | The answer is missing, ambiguous, conflicting, or has no usable current evidence. |

“Disputed” and “needs rechecking” are internal reasons, not extra labels. A short explanation can clarify why information is Unknown.

“No plant milk available” is different from “availability unknown.” Never guess missing milk types or prices. Keep cafés with unknown details visible, but never treat an unknown surcharge as zero or include it in “no surcharge” results. Reported details are excluded from verified-only results.

## 6. Review contributions and request help

V1 needs a small authenticated review queue. A reviewer accepts evidence, rejects it, or flags a conflict, recording the decision. The same evidence rules apply to everyone, including maintainers.

Software can check fields and dates and calculate labels from reviewed evidence. A person checks whether the evidence supports the claim and is independent. Full automatic verification is outside V1; AI assistance can come later.

For Reported or Unknown details, show a **Contribute information** button and one reusable message:

> Help keep this information accurate. Share a recent menu or receipt photo, or another source.

Use one form with the café and detail selected, asking for the answer, evidence date, and photo or source link. Submissions go through review; uploading evidence does not automatically verify a claim. Notifications and tailored messages can wait. Start with a small café set to keep review manageable.

## Contributor checklist

1. Identify the branch, milk type, and detail.
2. Check the source, supporting evidence, and dates.
3. Check for duplicates, limitations, and conflicting information.
4. Record the evidence and review decision; apply the label above.

This document defines the agreed rules and contribution approach. Building the form and review queue is separate implementation work.
