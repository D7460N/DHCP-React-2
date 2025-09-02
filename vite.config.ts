import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'dhcp-portal',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3004,
  },
  preview: {
    port: 4443,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
})
