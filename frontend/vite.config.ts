
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import config from '../config.json' assert { type: 'json' }

const OUT_DIR = resolve(config.output, config.name, 'html')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  }
})
