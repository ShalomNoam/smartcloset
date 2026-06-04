import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    // 'node' is enough — we test service functions, no DOM needed
    environment: 'node',

    // Expose describe/it/expect/vi globally (no need to import in each file)
    globals: true,

    // Load .env so import.meta.env.VITE_* are available in integration tests
    envDir: '.',

    // Where tests live
    include: ['src/tests/**/*.test.js'],

    // Reporter used by `vitest run` (CI-friendly)
    reporters: ['verbose'],
  },
})
