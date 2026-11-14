import type { Surcharge, VerifiedDetail } from '@milk/domain';

import { VerifiedMeta } from './VerifiedMeta';

interface SurchargeEditorProps {
  detail: VerifiedDetail<Surcharge>;
  onChange: (detail: VerifiedDetail<Surcharge>) => void;
}

export function SurchargeEditor({ detail, onChange }: SurchargeEditorProps) {
  const value = detail.value;

  function setKind(kind: Surcharge['kind']) {
    const nextValue: Surcharge | null =
      detail.label === 'unknown'
        ? null
        : kind === 'none'
          ? { kind: 'none' }
          : { kind: 'amount', amount: value && value.kind === 'amount' ? value.amount : 0, currency: value && value.kind === 'amount' ? value.currency : 'EUR' };
    onChange({ ...detail, value: nextValue });
  }

  return (
    <div className="surcharge-editor">
      <div className="field-row">
        <label>
          Surcharge
          <select
            value={value?.kind ?? 'none'}
            disabled={detail.label === 'unknown'}
            onChange={(e) => setKind(e.target.value as Surcharge['kind'])}
          >
            <option value="none">None</option>
            <option value="amount">Amount</option>
          </select>
        </label>
        {value?.kind === 'amount' && (
          <>
            <label>
              Amount
              <input
                type="number"
                step="0.1"
                min="0"
                value={value.amount}
                onChange={(e) => onChange({ ...detail, value: { ...value, amount: Number(e.target.value) } })}
              />
            </label>
            <label>
              Currency
              <input
                type="text"
                value={value.currency}
                onChange={(e) => onChange({ ...detail, value: { ...value, currency: e.target.value } })}
              />
            </label>
          </>
        )}
      </div>
      <VerifiedMeta detail={detail} onChange={onChange} />
    </div>
  );
}
