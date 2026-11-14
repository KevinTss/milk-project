import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves a project site under /<repo>/, so built assets must be
// requested from that base path instead of the domain root. The dev server
// stays at the root so `pnpm dev` works without that prefix.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/milk-project/' : '/',
  plugins: [react()],
}));
