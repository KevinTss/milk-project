import { MILK_TYPE_LABELS, type MilkType, type MilkTypeOffering } from '@milk/domain';

import { SurchargeEditor } from './SurchargeEditor';

const MILK_TYPES = Object.keys(MILK_TYPE_LABELS) as MilkType[];

interface OfferingsEditorProps {
  offerings: MilkTypeOffering[];
  onChange: (offerings: MilkTypeOffering[]) => void;
}

export function OfferingsEditor({ offerings, onChange }: OfferingsEditorProps) {
  function update(index: number, offering: MilkTypeOffering) {
    onChange(offerings.map((item, i) => (i === index ? offering : item)));
  }

  function remove(index: number) {
    onChange(offerings.filter((_, i) => i !== index));
  }

  function add() {
    onChange([
      ...offerings,
      {
        type: 'oat',
        surcharge: { label: 'unknown', value: null, evidence: [], verificationDate: null },
      },
    ]);
  }

  return (
    <div className="offerings-editor">
      {offerings.map((offering, index) => (
        <div className="offering-row" key={index}>
          <div className="offering-header">
            <select
              value={offering.type}
              onChange={(e) => update(index, { ...offering, type: e.target.value as MilkType })}
            >
              {MILK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {MILK_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            <button type="button" className="icon-button" onClick={() => remove(index)} aria-label="Remove milk type">
              &times;
            </button>
          </div>
          <SurchargeEditor
            detail={offering.surcharge}
            onChange={(surcharge) => update(index, { ...offering, surcharge })}
          />
        </div>
      ))}
      <button type="button" className="link-button" onClick={add}>
        + Add milk type
      </button>
    </div>
  );
}
