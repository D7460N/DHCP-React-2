import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'DHCP-React-2',
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
    port: 4173,
    cors: true,
    headers: {
      'Access-Control_Allow_Origin': '*',
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
})
