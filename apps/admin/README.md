# @milk/admin

A small admin dashboard for viewing and editing `apps/api/data/places.json` —
the café data the mobile app and API read from.

There's no backend and no database: this is a static React app, deployable
to GitHub Pages, that talks directly to the
[GitHub Contents API](https://docs.github.com/en/rest/repos/contents) to
read the file, let you edit it, and commit the result straight back to the
repo. Every save is a real Git commit, so the existing commit history is
the audit trail.

## Using it

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)
   scoped to this repo only, with **Contents: Read and write** permission.
2. Open the app and paste the token into the connect screen. It's stored
   only in this browser's `localStorage` and sent only to `api.github.com` —
   never to any other host.
3. Edit, then hit **Commit to GitHub**. If `main` is connected to Vercel's
   Git integration, the API redeploys automatically once the commit lands.

## Development

```bash
pnpm --filter admin dev
pnpm --filter admin build
```

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy-admin.yml`) builds and
publishes this app to GitHub Pages whenever `apps/admin/**` changes on
`main`. The Pages site must be enabled once in the repo's Settings → Pages,
with source set to "GitHub Actions".
