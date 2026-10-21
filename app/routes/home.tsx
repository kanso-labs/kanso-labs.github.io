import {
  Button,
  Code,
  Container,
  Link,
  Separator,
  Stack,
  Tag,
  Text,
} from '@kanso-labs/kanso-ui'
import { Fragment } from 'react'

import { Outbound } from '../components/marks'
import { GITHUB, MEASURE } from '../components/site'
import { groups, principles, roadmaps } from '../projects'

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
                <Link href="/contributing" tone="inherit">
                  How to contribute
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href="/support" tone="inherit">
                  Where to ask a question
                </Link>
              </Text>
              {/* The anchor rehype-slug gives SECURITY.md's "Reporting a
                  Vulnerability" heading. */}
              <Text variant="labelLarge">
                <Link href="/security#reporting-a-vulnerability" tone="inherit">
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

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Principles />
      <Roadmap />
    </main>
  )
}
