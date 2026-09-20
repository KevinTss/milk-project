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

3. Day-to-day iteration — once the dev client is installed, you don't need to rebuild it for JS/TS changes

   ```bash
   pnpm start
   ```

   Then press `i` (iOS) or `a` (Android) in the terminal to relaunch against the already-installed app. Saved changes hot-reload via Fast Refresh, same as a web dev server.

   Only rerun `pnpm ios` / `pnpm android` when you add/remove a native module or change native config in `app.json`.

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Troubleshooting: "Unable to resolve ..." from a pnpm-only package

If Metro fails to resolve a package that clearly exists in `node_modules/.pnpm`, it's almost always one of two pnpm-specific issues:

- **A phantom dependency**: the package is an *optional peer dependency* of something you depend on (e.g. `@expo/metro-runtime`, `@expo/log-box`), so npm used to hoist it "by accident" but pnpm's strict linking won't. Fix: add it explicitly to this package's `dependencies` in `package.json`, then `pnpm install`.
- **Metro can't see it**: check `metro.config.js` doesn't set `resolver.disableHierarchicalLookup = true` — that flag is for hoisted npm/Yarn workspaces and breaks pnpm's symlink-based resolution.

## Get a fresh project

When you're ready, run:

```bash
pnpm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
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
