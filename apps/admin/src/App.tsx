import type { Place } from '@milk/domain';
import { useEffect, useState } from 'react';

import { PlaceEditor } from './components/PlaceEditor';
import { PlacesList } from './components/PlacesList';
import { SettingsForm } from './components/SettingsForm';
import { commitPlacesFile, GitHubApiError, loadPlacesFile } from './lib/github';
import { createBlankPlace } from './lib/blank-place';
import { clearSettings, loadSettings, saveSettings, type Settings } from './lib/settings';

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; places: Place[]; sha: string }
  | { status: 'error'; message: string };

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(() => {
    const stored = loadSettings();
    return stored.token ? stored : null;
  });
  const [load, setLoad] = useState<LoadState>(() => (settings ? { status: 'loading' } : { status: 'idle' }));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Runs the actual fetch and resolves to 'ready'/'error'. Callers that want a
  // visible loading state set it themselves before calling this, since
  // setting state synchronously inside this effect would trigger cascading
  // renders.
  function fetchPlaces(current: Settings) {
    loadPlacesFile(current)
      .then(({ places, sha }) => {
        setLoad({ status: 'ready', places, sha });
        setSelectedIndex(null);
        setDirty(false);
      })
      .catch((error: unknown) => {
        setLoad({ status: 'error', message: describeError(error) });
      });
  }

  useEffect(() => {
    if (settings) fetchPlaces(settings);
  }, [settings]);

  function reload() {
    if (!settings) return;
    setLoad({ status: 'loading' });
    fetchPlaces(settings);
  }

  function handleConnect(next: Settings) {
    saveSettings(next);
    setSettings(next);
    setLoad({ status: 'loading' });
  }

  function handleDisconnect() {
    clearSettings();
    setSettings(null);
    setLoad({ status: 'idle' });
    setSelectedIndex(null);
  }

  function updatePlace(index: number, place: Place) {
    if (load.status !== 'ready') return;
    const places = load.places.map((p, i) => (i === index ? place : p));
    setLoad({ ...load, places });
    setDirty(true);
  }

  function deletePlace(index: number) {
    if (load.status !== 'ready') return;
    const places = load.places.filter((_, i) => i !== index);
    setLoad({ ...load, places });
    setSelectedIndex(null);
    setDirty(true);
  }

  function createPlace() {
    if (load.status !== 'ready') return;
    const places = [...load.places, createBlankPlace()];
    setLoad({ ...load, places });
    setSelectedIndex(places.length - 1);
    setDirty(true);
  }

  async function handleCommit() {
    if (!settings || load.status !== 'ready') return;
    setSaveMessage('Committing...');
    try {
      const { sha } = await commitPlacesFile(
        settings,
        load.places,
        load.sha,
        'chore(data): update places via admin dashboard',
      );
      setLoad({ ...load, sha });
      setDirty(false);
      setSaveMessage('Committed. The production API redeploys shortly after this lands.');
    } catch (error) {
      setSaveMessage(describeError(error));
    }
  }

  if (!settings) {
    return <SettingsForm settings={loadSettings()} onSave={handleConnect} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Milk Admin</h1>
        <div className="header-actions">
          <button type="button" onClick={reload} disabled={load.status === 'loading'}>
            Reload
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={handleCommit}
            disabled={!dirty || load.status !== 'ready'}
          >
            Commit to GitHub
          </button>
          <button type="button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      </header>

      {saveMessage && <p className="save-message">{saveMessage}</p>}

      {load.status === 'loading' && <p>Loading places.json...</p>}
      {load.status === 'error' && <p className="error-message">{load.message}</p>}

      {load.status === 'ready' && (
        <div className="app-body">
          <PlacesList
            places={load.places}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onCreate={createPlace}
          />
          {selectedIndex !== null && load.places[selectedIndex] && (
            <PlaceEditor
              place={load.places[selectedIndex]}
              onChange={(place) => updatePlace(selectedIndex, place)}
              onDelete={() => deletePlace(selectedIndex)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function describeError(error: unknown): string {
  if (error instanceof GitHubApiError) {
    if (error.status === 401 || error.status === 403) {
      return `GitHub rejected the token (${error.status}): ${error.message}. Check the PAT's permissions.`;
    }
    if (error.status === 409) {
      return 'The file changed on GitHub since it was loaded. Reload and reapply your edits.';
    }
    return `GitHub API error (${error.status}): ${error.message}`;
  }
  return error instanceof Error ? error.message : String(error);
}
