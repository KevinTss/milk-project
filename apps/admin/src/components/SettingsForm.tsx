import { useState } from 'react';

import type { Settings } from '../lib/settings';

interface SettingsFormProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [draft, setDraft] = useState(settings);

  return (
    <form
      className="settings-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      <h1>Milk Admin</h1>
      <p>
        Connect a GitHub personal access token with <strong>Contents: Read and write</strong> on this repo. The
        token is kept only in this browser's local storage and is sent only to api.github.com.
      </p>
      <label>
        GitHub token (fine-grained PAT)
        <input
          type="password"
          value={draft.token}
          onChange={(e) => setDraft({ ...draft, token: e.target.value })}
          placeholder="github_pat_..."
          required
        />
      </label>
      <div className="field-row">
        <label>
          Repo owner
          <input type="text" value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
        </label>
        <label>
          Repo name
          <input type="text" value={draft.repo} onChange={(e) => setDraft({ ...draft, repo: e.target.value })} />
        </label>
      </div>
      <div className="field-row">
        <label>
          Branch
          <input type="text" value={draft.branch} onChange={(e) => setDraft({ ...draft, branch: e.target.value })} />
        </label>
        <label>
          File path
          <input type="text" value={draft.path} onChange={(e) => setDraft({ ...draft, path: e.target.value })} />
        </label>
      </div>
      <button type="submit" className="primary-button">
        Connect
      </button>
    </form>
  );
}
