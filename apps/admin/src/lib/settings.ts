const STORAGE_KEY = 'milk-admin-settings';

export interface Settings {
  /** GitHub repo owner, e.g. "KevinTss". */
  owner: string;
  /** GitHub repo name, e.g. "milk-project". */
  repo: string;
  /** Branch to read from and commit to. */
  branch: string;
  /** Path to the places data file, relative to the repo root. */
  path: string;
  /** Fine-grained personal access token with Contents: Read and write on this repo. Never sent anywhere but api.github.com. */
  token: string;
}

export const DEFAULT_SETTINGS: Settings = {
  owner: 'KevinTss',
  repo: 'milk-project',
  branch: 'main',
  path: 'apps/api/data/places.json',
  token: '',
};

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function clearSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
}
