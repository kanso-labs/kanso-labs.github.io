import {
  Button,
  Code,
  Container,
  IconButton,
  Link,
  Separator,
  Stack,
  Tag,
  Text,
} from '@kanso-labs/kanso-ui'
import { Fragment } from 'react'

import { groups, principles, roadmaps } from '../projects'

const GITHUB = 'https://github.com/kanso-labs'
// Where the community health files every repository inherits are served from.
const HEALTH = 'https://github.com/kanso-labs/.github/blob/main'
const MEASURE = '1200px'

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 16 16"
      width="24"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

// Marks a link that leaves kansolabs.org.
function Outbound() {
  return (
    <svg
      aria-hidden="true"
      className="outbound"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function Header() {
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
          <Stack
            align="center"
            aria-label="Main"
            direction="row"
            gap="xs"
            render={<nav />}
          >
            <Button
              className="site-nav__section"
              href="#projects"
              variant="text"
            >
              Projects
            </Button>
            <Button
              className="site-nav__section"
              href="#principles"
              variant="text"
            >
              Principles
            </Button>
            <Button
              className="site-nav__section"
              href="#roadmap"
              variant="text"
            >
              Roadmap
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

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <Container maxInlineSize={MEASURE}>
        <Stack className="hero__body" gap="xxl">
          <Text
            className="hero__title"
            id="hero-title"
            render={<h1 />}
            variant="displayLarge"
          >
            Not what can be added, but what can be taken away.
          </Text>
          <Text block className="hero__lede" tone="muted" variant="titleLarge">
            Design tokens, and the component libraries built on them for React
            and React Native. Home Assistant applications and integrations.
            Daily, small everyday tools under one calm shell. And the shared CI
            that releases all of it.
          </Text>
          <Stack direction="row" gap="md" wrap>
            <Button href="#projects" variant="filled">
              See the projects
            </Button>
            <Button href={GITHUB} variant="outlined">
              View on GitHub
            </Button>
          </Stack>
        </Stack>
      </Container>
    </section>
  )
}

function Projects() {
  return (
    <section aria-labelledby="projects-title" className="section" id="projects">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <div className="section__intro">
            <Text id="projects-title" render={<h2 />} variant="headlineLarge">
              Projects
            </Text>
            <Text block className="measure" tone="muted" variant="bodyLarge">
              The open-source projects are MIT licensed, planned in public, and
              kept current by Renovate.
            </Text>
          </div>
          <div>
            {groups.map((group) => (
              <div
                aria-labelledby={`${group.id}-title`}
                className="group split"
                key={group.id}
                role="group"
              >
                <Stack className="split__aside group__aside" gap="sm">
                  <Text
                    id={`${group.id}-title`}
                    render={<h3 />}
                    variant="titleMedium"
                  >
                    {group.title}
                  </Text>
                  <Text block tone="muted" variant="bodyMedium">
                    {group.summary}
                  </Text>
                </Stack>
                <div className="split__main">
                  {group.projects.map((project, index) => (
                    <Fragment key={project.name}>
                      {index > 0 && <Separator />}
                      <article className="project">
                        <Stack className="project__body" gap="sm">
                          <div className="project__heading">
                            <Text render={<h4 />} variant="titleLarge">
                              {project.name}
                            </Text>
                            {project.repository && (
                              <Text tone="muted" variant="bodyMedium">
                                <Code>{project.repository}</Code>
                              </Text>
                            )}
                          </div>
                          <Text block tone="muted" variant="bodyLarge">
                            {project.description}
                          </Text>
                          <Stack
                            className="project__tags"
                            direction="row"
                            gap="sm"
                            wrap
                          >
                            {project.tags.map((tag) => (
                              <Tag key={tag} variant="outlined">
                                {tag}
                              </Tag>
                            ))}
                          </Stack>
                        </Stack>
                        <ul
                          aria-label={`${project.name} links`}
                          className="project__links"
                        >
                          {project.links.map((link) => (
                            <li key={link.href}>
                              <Text variant="labelLarge">
                                <Link
                                  href={link.href}
                                  tone="inherit"
                                  underline="hover"
                                >
                                  {link.label}
                                  <Outbound />
                                </Link>
                              </Text>
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  )
}

function Principles() {
  return (
    <section
      aria-labelledby="principles-title"
      className="section section--tinted"
      id="principles"
    >
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <div className="split">
            <Stack className="split__aside" gap="xs">
              <Text tone="muted" variant="displayLarge">
                <span lang="ja">簡素</span>
              </Text>
              <Text tone="muted" variant="labelLarge">
                kanso
              </Text>
            </Stack>
            <Stack className="split__main" gap="lg">
              <Text
                id="principles-title"
                render={<h2 />}
                variant="headlineLarge"
              >
                How the work is done
              </Text>
              <Text block className="measure" tone="muted" variant="bodyLarge">
                Kanso is the Japanese principle of simplicity through
                elimination. Here it is the working standard rather than a name:
                one canonical copy of anything shared, no dependency left on a
                range, and a reason written down beside every decision that
                looked obvious at the time.
              </Text>
            </Stack>
          </div>
          <ol className="principles">
            {principles.map((principle, index) => (
              <li className="principle" key={principle.title}>
                <Stack gap="md">
                  <Text tone="muted" variant="labelLarge">
                    <Code>{String(index + 1).padStart(2, '0')}</Code>
                  </Text>
                  <Text render={<h3 />} variant="titleLarge">
                    {principle.title}
                  </Text>
                  <Text block tone="muted" variant="bodyMedium">
                    {principle.description}
                  </Text>
                </Stack>
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </section>
  )
}

function Roadmap() {
  return (
    <section aria-labelledby="roadmap-title" className="section" id="roadmap">
      <Container maxInlineSize={MEASURE}>
        <div className="split">
          <div className="split__aside">
            <Text id="roadmap-title" render={<h2 />} variant="headlineLarge">
              Planned in the open
            </Text>
          </div>
          <Stack className="split__main" gap="xxl">
            <Text block className="measure" tone="muted" variant="bodyLarge">
              Each repository's work is planned in a public project, one issue
              per pull request, in the order it lands. Issues and pull requests
              are welcome on any repository.
            </Text>
            <ul className="roadmap">
              {roadmaps.map((roadmap) => (
                <li className="roadmap__item" key={roadmap.href}>
                  <Text variant="titleMedium">
                    <Link href={roadmap.href} tone="inherit" underline="hover">
                      {roadmap.name}
                      <Outbound />
                    </Link>
                  </Text>
                  {roadmap.note && (
                    <Text tone="muted" variant="bodyMedium">
                      {roadmap.note}
                    </Text>
                  )}
                </li>
              ))}
            </ul>
            <Stack direction="row" gap="xl" wrap>
              <Text variant="labelLarge">
                <Link href={`${HEALTH}/CONTRIBUTING.md`} tone="inherit">
                  How to contribute
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={`${HEALTH}/SUPPORT.md`} tone="inherit">
                  Where to ask a question
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={`${HEALTH}/SECURITY.md`} tone="inherit">
                  Report a vulnerability
                </Link>
              </Text>
            </Stack>
          </Stack>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
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
                <Link
                  href={`${HEALTH}/CODE_OF_CONDUCT.md`}
                  tone="inherit"
                  underline="hover"
                >
                  Code of conduct
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link
                  href={`${HEALTH}/SECURITY.md`}
                  tone="inherit"
                  underline="hover"
                >
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Principles />
        <Roadmap />
      </main>
      <Footer />
    </>
  )
}
