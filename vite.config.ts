import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // kanso-ui's entry imports its own compiled stylesheet. Left external, that
    // import reaches Node as a bare `.css` while the page is prerendered, and
    // Node has no loader for it. Bundling the package lets Vite's CSS pipeline
    // take the import instead.
    noExternal: ['@kanso-labs/kanso-ui'],
  },
})
