const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Workspace packages like @milk/domain use TypeScript's "nodenext" module
// resolution, which requires relative imports to say `./foo.js` even though
// the source file on disk is `./foo.ts` — `tsc` rewrites that for us, but
// Metro doesn't, so a real (non type-only) export from such a file fails to
// resolve unless we redirect it here.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('.') && moduleName.endsWith('.js')) {
    try {
      return context.resolveRequest(context, moduleName.replace(/\.js$/, '.ts'), platform);
    } catch {
      // No `.ts` sibling — fall through to resolving the literal `.js` file.
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
