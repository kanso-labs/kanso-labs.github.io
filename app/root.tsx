import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import '@kanso-labs/kanso-ui/styles.css'
import '@kanso-labs/kanso-ui/tokens.css'
import './styles/theme.css'
import './styles/layout.css'

import { Button, Container, Stack, Text } from '@kanso-labs/kanso-ui'

import type { Route } from './+types/root'

const description =
  'Design tokens and the component libraries built on them, Home Assistant applications and integrations, Daily, and the shared CI that releases all of it.'

export const links: Route.LinksFunction = () => [
  { href: 'https://kansolabs.org/', rel: 'canonical' },
  { href: '/favicon.png', rel: 'icon', type: 'image/png' },
  { href: '/apple-touch-icon.png', rel: 'apple-touch-icon' },
]

export const meta: Route.MetaFunction = () => [
  { title: 'Kanso Labs' },
  { content: description, name: 'description' },
  { content: 'Kanso Labs', property: 'og:site_name' },
  { content: 'Kanso Labs', property: 'og:title' },
  { content: description, property: 'og:description' },
  { content: 'https://kansolabs.org/', property: 'og:url' },
  { content: 'website', property: 'og:type' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {/* The page's surface in each scheme, so the browser's own chrome
            meets it with no seam. */}
        <meta
          content="#fafafa"
          media="(prefers-color-scheme: light)"
          name="theme-color"
        />
        <meta
          content="#121212"
          media="(prefers-color-scheme: dark)"
          name="theme-color"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Something went wrong'
  let details = 'An unexpected error occurred.'

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Not found' : 'Error'
    details =
      error.status === 404
        ? 'There is one page here, and this is not it.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
  }

  return (
    <main className="hero">
      <Container maxInlineSize="1200px">
        <Stack align="start" gap="lg">
          <Text render={<h1 />} variant="headlineLarge">
            {message}
          </Text>
          <Text block tone="muted" variant="bodyLarge">
            {details}
          </Text>
          <Button href="/" variant="outlined">
            Go to the home page
          </Button>
        </Stack>
      </Container>
    </main>
  )
}
