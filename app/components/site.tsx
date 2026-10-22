import {
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'

import { DOCS } from '../projects'
import { GitHubMark } from './marks'

export const GITHUB = 'https://github.com/kanso-labs'
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
            <img
              alt="Kanso"
              className="mark"
              height={56}
              src="/kanso.png"
              width={133}
            />
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
              <img
                alt=""
                className="mark"
                height={28}
                src="/leaf.png"
                width={54}
              />
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
                <Link href="/code-of-conduct" tone="inherit" underline="hover">
                  Code of conduct
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href="/security" tone="inherit" underline="hover">
                  Security
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
