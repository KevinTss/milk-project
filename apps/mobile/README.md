# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

This app uses native modules (`expo-maps`, `expo-glass-effect`, `expo-dev-client`, ...) that aren't available in the plain **Expo Go** app from the App Store. You need a custom dev client build instead — Expo builds and installs this for you automatically, no extra setup required.

This repo is a pnpm workspace. Always use `pnpm`, not `npm`/`yarn` — install is enforced repo-wide via a `preinstall` guard.

1. Install dependencies (from the repo root)

   ```bash
   pnpm install
   ```

2. First run on a simulator — builds the native app and installs it

   ```bash
   pnpm ios       # or: pnpm android
   ```

   This boots a simulator if none is running, compiles the native project, installs the dev client, and starts Metro automatically.

   **The simulator window usually opens on its own, but it can take a while (well after the build finishes) — give it a minute before assuming something's wrong.** If it still hasn't shown up, see the troubleshooting section below for how to open it manually.

3. Day-to-day iteration — once the dev client is installed, you don't need to rebuild it for JS/TS changes

   ```bash
   pnpm start
   ```

   Then press `i` (iOS) or `a` (Android) in the terminal to relaunch against the already-installed app. Saved changes hot-reload via Fast Refresh, same as a web dev server.

   Only rerun `pnpm ios` / `pnpm android` when you add/remove a native module or change native config in `app.json`.

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Café data

The map fetches cafés from the [API](../api) at startup (see
[use-places.ts](src/hooks/use-places.ts)). For local dev, run the API
alongside the mobile app:

```bash
# from the repo root, in another terminal
pnpm --filter api start:dev
```

By default the app talks to `http://localhost:3000` (`10.0.2.2` on the
Android emulator, which can't resolve `localhost` as the host machine). To
point at a deployed API instead — e.g. a Vercel URL — copy `.env.example` to
`.env` and set `EXPO_PUBLIC_API_BASE_URL`. A plain-HTTP local server works
from the simulator because `app.json` allows local networking
(`NSAllowsLocalNetworking`) under iOS's App Transport Security; this is why a
change to `app.json` needs a native rebuild (`pnpm ios`/`pnpm android`) to
take effect, not just a JS reload.

### Troubleshooting: "Unable to resolve ..." from a pnpm-only package

If Metro fails to resolve a package that clearly exists in `node_modules/.pnpm`, it's almost always one of two pnpm-specific issues:

- **A phantom dependency**: the package is an *optional peer dependency* of something you depend on (e.g. `@expo/metro-runtime`, `@expo/log-box`), so npm used to hoist it "by accident" but pnpm's strict linking won't. Fix: add it explicitly to this package's `dependencies` in `package.json`, then `pnpm install`.
- **Metro can't see it**: check `metro.config.js` doesn't set `resolver.disableHierarchicalLookup = true` — that flag is for hoisted npm/Yarn workspaces and breaks pnpm's symlink-based resolution.

### Troubleshooting: I don't see the app or the simulator window

- **"Port 8081 is running this app in another window"** — a dev server (`expo start`) from an earlier `pnpm ios`/`pnpm start` is already running. It's not an error; find it instead of starting a new one:

  ```bash
  lsof -nP -iTCP:8081 -sTCP:LISTEN
  ```

  This is very commonly left running in an editor's integrated terminal (VS Code, etc.) in a tab you've since lost track of — check there before assuming it's a stray process.

- **The simulator window itself isn't on screen** — the app can build and launch successfully (check for `Build Succeeded` and `Opening on <device>` in the logs) even though no window is visible yet. It can take a minute to appear after the build finishes, or it may open behind another window / on a different desktop. If after waiting it's still not showing, try:

  ```bash
  open -a Simulator
  ```

  On some Xcode versions this fails with "Unable to find application named 'Simulator'" — the simulator app has been renamed/relocated (e.g. `DeviceHub.app` on Xcode 27+). Find the real path with:

  ```bash
  find /Applications/Xcode.app -iname "*simulator*.app" -o -iname "*devicehub*.app"
  ```

  then `open -a "<path found>"`.

## Get a fresh project

When you're ready, run:

```bash
pnpm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- Linting is already configured — run `pnpm lint`. See our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/) for more
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
