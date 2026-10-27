import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['EVENTS_API_URL', 'CERTIFICATES_API_URL'])

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api-cert': {
          target: env.CERTIFICATES_API_URL || 'http://localhost:8083',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-cert/, ''),
        },
        '/api': {
          target: env.EVENTS_API_URL || 'http://localhost:8081',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
