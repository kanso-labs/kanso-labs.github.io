import type { Config } from '@react-router/dev/config'

export default {
  // GitHub Pages serves files and runs nothing, so the page is rendered to HTML
  // at build time. Visitors and crawlers get the whole page before any script
  // loads, and the script only hydrates it. /404 is the not-found page, which
  // the deploy publishes as 404.html.
  prerender: ['/', '/404'],
  ssr: false,
} satisfies Config
