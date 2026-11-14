import type { Evidence } from '@milk/domain';

interface EvidenceListEditorProps {
  evidence: Evidence[];
  onChange: (evidence: Evidence[]) => void;
}

export function EvidenceListEditor({ evidence, onChange }: EvidenceListEditorProps) {
  function update(index: number, patch: Partial<Evidence>) {
    onChange(evidence.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function remove(index: number) {
    onChange(evidence.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...evidence, { source: '', evidenceDate: null }]);
  }

  return (
    <div className="evidence-list">
      {evidence.map((item, index) => (
        <div className="evidence-row" key={index}>
          <input
            type="text"
            placeholder="Source URL or description"
            value={item.source}
            onChange={(e) => update(index, { source: e.target.value })}
          />
          <input
            type="date"
            value={item.evidenceDate ?? ''}
            onChange={(e) => update(index, { evidenceDate: e.target.value || null })}
          />
          <button type="button" className="icon-button" onClick={() => remove(index)} aria-label="Remove evidence">
            &times;
          </button>
        </div>
      ))}
      <button type="button" className="link-button" onClick={add}>
        + Add evidence
      </button>
    </div>
  );
}
