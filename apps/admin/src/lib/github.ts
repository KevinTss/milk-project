import type { Place } from '@milk/domain';

import { base64ToUtf8, utf8ToBase64 } from './base64';
import type { Settings } from './settings';

export class GitHubApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

function contentsUrl(settings: Settings): string {
  return `https://api.github.com/repos/${settings.owner}/${settings.repo}/contents/${settings.path}`;
}

function authHeaders(settings: Settings): HeadersInit {
  return {
    Authorization: `Bearer ${settings.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

export interface LoadedPlacesFile {
  places: Place[];
  /** The blob SHA the file had when loaded — required to commit back without conflicts. */
  sha: string;
}

export async function loadPlacesFile(settings: Settings): Promise<LoadedPlacesFile> {
  const response = await fetch(`${contentsUrl(settings)}?ref=${settings.branch}`, {
    headers: authHeaders(settings),
  });
  if (!response.ok) {
    throw new GitHubApiError(response.status, await readErrorMessage(response));
  }
  const body = (await response.json()) as { content: string; sha: string };
  const places = JSON.parse(base64ToUtf8(body.content)) as Place[];
  return { places, sha: body.sha };
}

export async function commitPlacesFile(
  settings: Settings,
  places: Place[],
  sha: string,
  message: string,
): Promise<{ sha: string }> {
  const content = `${JSON.stringify(places, null, 2)}\n`;
  const response = await fetch(contentsUrl(settings), {
    method: 'PUT',
    headers: { ...authHeaders(settings), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: utf8ToBase64(content),
      sha,
      branch: settings.branch,
    }),
  });
  if (!response.ok) {
    throw new GitHubApiError(response.status, await readErrorMessage(response));
  }
  const body = (await response.json()) as { content: { sha: string } };
  return { sha: body.content.sha };
}
