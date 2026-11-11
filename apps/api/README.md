# Milk API

A [NestJS](https://nestjs.com) app that exposes café data to the mobile app. See [issue #7](https://github.com/KevinTss/milk-project/issues/7).

## Local development

From the repo root:

```bash
pnpm install
pnpm --filter api start:dev
```

Then `GET http://localhost:3000/places` returns the places in
[data/places.json](data/places.json), typed as `Place[]` from
[@milk/domain](../../packages/domain).

## Data

For V1 there's no database. Places live in [data/places.json](data/places.json),
edited and reviewed like code — a PR per change, same as any other
contribution (see the root [CONTRIBUTING.md](../../CONTRIBUTING.md)). This is
deliberate: see [packages/domain](../../packages/domain) and
[docs/research/verification.md](../../docs/research/verification.md) for why.
Revisit this once the "Contribute information" review queue needs runtime
writes from end users.

## Deploying to Vercel

The app is deployed as a single Vercel Function — [api/index.ts](api/index.ts)
wraps the Nest app with an Express adapter and is cached across invocations on
warm instances; [vercel.json](vercel.json) rewrites every path to it so Nest's
own router handles everything.

This is a pnpm workspace, so the Vercel project's **Root Directory** is set to
`apps/api` while its **Install Command** stays `pnpm install` run from the
repo root (so the `@milk/domain` workspace dependency resolves) — both are
project settings, not something in this folder's config.

```bash
# from the repo root, once linked (`vercel link`)
vercel deploy --archive=tgz         # preview
vercel deploy --archive=tgz --prod  # production
```

`--archive=tgz` is required — the monorepo has more files than Vercel's
per-deploy limit without it.

Deployments currently require a Vercel login to view (deployment protection).
That's fine for previews, but it blocks real app users from reaching
production — turn it off for this project before the mobile app depends on
it: `vercel project protection disable api --sso`.
