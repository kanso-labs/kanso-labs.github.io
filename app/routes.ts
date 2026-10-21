import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  // Every other path. Prerendered at /404 and published as 404.html, which
  // GitHub Pages serves for any path it has no file for.
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
