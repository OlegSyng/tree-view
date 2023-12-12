/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/tree-view/',
  test: {
    globals: true,
    environment: 'happy-dom', // or 'jsdom', 'node'
    setupFiles: ['./src/tests/setup.ts'],
  }
})
