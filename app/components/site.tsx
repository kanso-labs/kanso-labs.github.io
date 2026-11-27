import {
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'

import { DOCS } from '../projects'
import { PRIVACY } from './analytics'
import { GitHubMark, Logo } from './marks'

export const BRAND = 'https://brand.kansolabs.org'
export const GITHUB = 'https://github.com/kanso-labs'
// The social card, from kanso-labs/brand. A route with metadata of its own
// replaces the home page's, so each one lists it.
export const CARD = [
  {
    content: 'https://kansolabs.org/og-card-1200x630.png',
    property: 'og:image',
  },
  { content: '1200', property: 'og:image:width' },
  { content: '630', property: 'og:image:height' },
  { content: 'Kanso Labs', property: 'og:image:alt' },
  { content: 'summary_large_image', name: 'twitter:card' },
]

// The width every region's content stops growing at.
export const MEASURE = '1200px'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container maxInlineSize={MEASURE}>
        <div className="site-header__row">
          <a
            aria-label="Kanso Labs, home"
            className="site-header__home"
            href="/"
          >
            <Logo form="horizontal" />
          </a>
          {/* The sections are on the home page, so from any other page these
              links lead back to it. */}
          <Stack
            align="center"
            aria-label="Main"
            direction="row"
            gap="xs"
            render={<nav />}
          >
            <Button
              className="site-nav__section"
              href="/#projects"
              variant="text"
            >
              Projects
            </Button>
            <Button
              className="site-nav__section"
              href="/#principles"
              variant="text"
            >
              Principles
            </Button>
            <Button
              className="site-nav__section"
              href="/#roadmap"
              variant="text"
            >
              Roadmap
            </Button>
            <Button href={DOCS} variant="text">
              Docs
            </Button>
            <IconButton
              aria-label="Kanso Labs on GitHub"
              href={GITHUB}
              variant="standard"
            >
              <GitHubMark />
            </IconButton>
          </Stack>
        </div>
      </Container>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxl">
          <div className="site-footer__row">
            <Stack align="center" direction="row" gap="lg">
              <Logo form="leaf" />
              <Stack gap="xxs">
                <Text variant="titleMedium">Kanso Labs</Text>
                <Text tone="muted" variant="bodyMedium">
                  <Link
                    href="mailto:contact@kansolabs.org"
                    tone="inherit"
                    underline="hover"
                  >
                    contact@kansolabs.org
                  </Link>
                </Text>
              </Stack>
            </Stack>
            <Stack
              aria-label="Footer"
              direction="row"
              gap="xl"
              render={<nav />}
              wrap
            >
              <Text variant="labelLarge">
                <Link href={GITHUB} tone="inherit" underline="hover">
                  GitHub
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={DOCS} tone="inherit" underline="hover">
                  Docs
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={BRAND} tone="inherit" underline="hover">
                  Brand
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href="/code-of-conduct" tone="inherit" underline="hover">
                  Code of conduct
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href="/security" tone="inherit" underline="hover">
                  Security
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={PRIVACY} tone="inherit" underline="hover">
                  Privacy
                </Link>
              </Text>
            </Stack>
          </div>
          <Text block tone="muted" variant="bodySmall">
            © Kanso Labs. The open-source projects are MIT licensed.
          </Text>
        </Stack>
      </Container>
    </footer>
  )
}
