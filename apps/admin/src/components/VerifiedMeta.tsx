import type { VerificationLabel, VerifiedDetail } from '@milk/domain';

import { EvidenceListEditor } from './EvidenceListEditor';

const LABELS: VerificationLabel[] = ['verified', 'reported', 'unknown'];

interface VerifiedMetaProps<T> {
  detail: VerifiedDetail<T>;
  onChange: (detail: VerifiedDetail<T>) => void;
}

/**
 * The fields every VerifiedDetail<T> carries besides its own `value`:
 * confidence label, verification date, note, and supporting evidence.
 */
export function VerifiedMeta<T>({ detail, onChange }: VerifiedMetaProps<T>) {
  return (
    <div className="verified-meta">
      <div className="field-row">
        <label>
          Confidence
          <select
            value={detail.label}
            onChange={(e) => {
              const label = e.target.value as VerificationLabel;
              // The domain model requires value === null whenever label is 'unknown'.
              onChange({ ...detail, label, value: label === 'unknown' ? null : detail.value });
            }}
          >
            {LABELS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Verified on
          <input
            type="date"
            value={detail.verificationDate ?? ''}
            onChange={(e) => onChange({ ...detail, verificationDate: e.target.value || null })}
          />
        </label>
      </div>
      <label>
        Note
        <input
          type="text"
          placeholder="Optional"
          value={detail.note ?? ''}
          onChange={(e) => onChange({ ...detail, note: e.target.value || undefined })}
        />
      </label>
      <EvidenceListEditor evidence={detail.evidence} onChange={(evidence) => onChange({ ...detail, evidence })} />
    </div>
  );
}
