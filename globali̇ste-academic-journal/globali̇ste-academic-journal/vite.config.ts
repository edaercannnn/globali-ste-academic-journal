import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, path.resolve('.'), '');

    // Prioritize system environment variables, then .env file variables, checking multiple common naming conventions
    const apiKey = process.env.API_KEY || 
                   process.env.VITE_API_KEY || 
                   process.env.GEMINI_API_KEY || 
                   env.API_KEY || 
                   env.VITE_API_KEY || 
                   env.GEMINI_API_KEY || '';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Expose env variables to the client
      define: {
        'process.env.API_KEY': JSON.stringify(apiKey),
      }
    };
});