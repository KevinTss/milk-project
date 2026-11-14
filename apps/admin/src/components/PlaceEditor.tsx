import type { MilkTypeOffering, Place } from '@milk/domain';

import { OfferingsEditor } from './OfferingsEditor';
import { VerifiedMeta } from './VerifiedMeta';

interface PlaceEditorProps {
  place: Place;
  onChange: (place: Place) => void;
  onDelete: () => void;
}

export function PlaceEditor({ place, onChange, onDelete }: PlaceEditorProps) {
  const plantMilkAvailable = place.plantMilkAvailable;

  return (
    <div className="place-editor">
      <section>
        <h2>Basics</h2>
        <label>
          Id (stable slug, used by the mobile app)
          <input type="text" value={place.id} onChange={(e) => onChange({ ...place, id: e.target.value })} />
        </label>
        <label>
          Name
          <input type="text" value={place.name} onChange={(e) => onChange({ ...place, name: e.target.value })} />
        </label>
        <label>
          Address
          <input
            type="text"
            value={place.address ?? ''}
            onChange={(e) => onChange({ ...place, address: e.target.value || undefined })}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            value={place.website ?? ''}
            onChange={(e) => onChange({ ...place, website: e.target.value || undefined })}
          />
        </label>
        <div className="field-row">
          <label>
            Latitude
            <input
              type="number"
              step="any"
              value={place.location.latitude}
              onChange={(e) =>
                onChange({ ...place, location: { ...place.location, latitude: Number(e.target.value) } })
              }
            />
          </label>
          <label>
            Longitude
            <input
              type="number"
              step="any"
              value={place.location.longitude}
              onChange={(e) =>
                onChange({ ...place, location: { ...place.location, longitude: Number(e.target.value) } })
              }
            />
          </label>
        </div>
      </section>

      <section>
        <h2>Plant milk available</h2>
        <label className="checkbox-label">
          <input
            type="checkbox"
            disabled={plantMilkAvailable.label === 'unknown'}
            checked={plantMilkAvailable.value ?? false}
            onChange={(e) => onChange({ ...place, plantMilkAvailable: { ...plantMilkAvailable, value: e.target.checked } })}
          />
          Available
        </label>
        <VerifiedMeta
          detail={plantMilkAvailable}
          onChange={(plantMilkAvailable) => onChange({ ...place, plantMilkAvailable })}
        />
      </section>

      <section>
        <h2>Milk types</h2>
        <OfferingsEditor
          offerings={place.milkTypes.value ?? []}
          onChange={(offerings: MilkTypeOffering[]) =>
            onChange({ ...place, milkTypes: { ...place.milkTypes, value: offerings } })
          }
        />
        <VerifiedMeta detail={place.milkTypes} onChange={(milkTypes) => onChange({ ...place, milkTypes })} />
      </section>

      <button type="button" className="danger-button" onClick={onDelete}>
        Delete this café
      </button>
    </div>
  );
}
