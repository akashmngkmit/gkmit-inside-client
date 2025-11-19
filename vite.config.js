import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
test: {
    // 1. Test Discovery: Tells Vitest to look for files in the src/tests folder
    include: ['src/tests/**/*.test.js'],
    
    // 2. Environment: Set the testing environment
    environment: 'jsdom',
    
    // 3. Global Mocks: Makes 'describe', 'it', 'expect' global
    globals: true,

    // 4. Alias Resolution: This is redundant if 'resolve.alias' is set, but helpful for Vitest stability.
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    
    // 5. Setup Files (must be empty or point to a valid file)
    setupFiles: [], 
  },
});
