import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// DEPLOY_BASE allows the same source tree to be built for a root host (Vercel/Netlify)
// or a project sub-path (GitHub Pages: /ecommerce-storefront-portfolio/).
const base = process.env.DEPLOY_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
