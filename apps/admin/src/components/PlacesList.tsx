import type { Place } from '@milk/domain';

interface PlacesListProps {
  places: Place[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onCreate: () => void;
}

export function PlacesList({ places, selectedIndex, onSelect, onCreate }: PlacesListProps) {
  return (
    <div className="places-list">
      <button type="button" className="primary-button" onClick={onCreate}>
        + New café
      </button>
      <ul>
        {places.map((place, index) => (
          <li key={place.id || index}>
            <button
              type="button"
              className={index === selectedIndex ? 'place-row selected' : 'place-row'}
              onClick={() => onSelect(index)}
            >
              <span className="place-name">{place.name || '(unnamed)'}</span>
              <span className="place-status">
                {place.plantMilkAvailable.label === 'unknown'
                  ? 'unknown'
                  : place.plantMilkAvailable.value
                    ? 'available'
                    : 'not available'}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
