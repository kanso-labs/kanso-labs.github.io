import { Button, Container, Stack, Text } from '@kanso-labs/kanso-ui'

import type { Route } from './+types/not-found'

export const meta: Route.MetaFunction = () => [
  { title: 'Not found · Kanso Labs' },
  { content: 'noindex', name: 'robots' },
]

// Whatever path it is served at, this draws the same thing, so the page
// prerendered at /404 hydrates cleanly under any address Pages serves it for.
export default function NotFound() {
  return (
    <main className="hero">
      <Container maxInlineSize="1200px">
        <Stack align="start" gap="lg">
          <Text render={<h1 />} variant="headlineLarge">
            Not found
          </Text>
          <Text block tone="muted" variant="bodyLarge">
            There is one page here, and this is not it.
          </Text>
          <Button href="/" variant="outlined">
            Go to the home page
          </Button>
        </Stack>
      </Container>
    </main>
  )
}
