import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

import { documents } from './documents'

export default [
  layout('routes/site.tsx', [
    index('routes/home.tsx'),
    // One route per community document, all drawn by the same module, which
    // reads which document it is from the path.
    ...documents.map((document) =>
      route(document.slug, 'routes/document.tsx', {
        id: `document-${document.slug}`,
      }),
    ),
    // Every other path. Prerendered at /404 and published as 404.html, which
    // GitHub Pages serves for any path it has no file for.
    route('*', 'routes/not-found.tsx'),
  ]),
] satisfies RouteConfig
