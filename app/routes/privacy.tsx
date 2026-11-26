import {
  Button,
  Code,
  Container,
  Link,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'

import { useAnalytics } from '../components/analytics'
import { MEASURE } from '../components/site'
import type { Route } from './+types/privacy'

const title = 'Privacy · Kanso Labs'
const description =
  'kansolabs.org counts visits with Google Analytics, anonymously. What it records, for how long, and how to turn it off.'
const url = 'https://kansolabs.org/privacy'

export const meta: Route.MetaFunction = () => [
  { title },
  { content: description, name: 'description' },
  { href: url, rel: 'canonical', tagName: 'link' },
  { content: 'Kanso Labs', property: 'og:site_name' },
  { content: title, property: 'og:title' },
  { content: description, property: 'og:description' },
  { content: url, property: 'og:url' },
  { content: 'article', property: 'og:type' },
]

function Section({
  children,
  heading,
}: {
  children: React.ReactNode
  heading: string
}) {
  return (
    <>
      <Text render={<h2 />} variant="headlineSmall">
        {heading}
      </Text>
      {children}
    </>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text block variant="bodyLarge">
      {children}
    </Text>
  )
}

// The visitor's own setting, and the buttons that change it. It is drawn
// only once public/analytics.js has loaded, since the prerendered page cannot
// know what this browser chose.
function Choice() {
  const state = useAnalytics()

  if (!state) {
    return (
      <Paragraph>
        The setting for this browser appears here once the page has loaded.
      </Paragraph>
    )
  }

  const { analytics, status } = state

  return (
    <Stack align="start" gap="md">
      <Paragraph>
        {status === 'granted'
          ? 'Google Analytics is on for this browser.'
          : 'Google Analytics is off for this browser.'}
      </Paragraph>
      {status === 'granted' ? (
        <Button onPress={analytics.deny} variant="outlined">
          Turn it off
        </Button>
      ) : (
        <Button onPress={analytics.grant} variant="outlined">
          Turn it on
        </Button>
      )}
    </Stack>
  )
}

export default function Privacy() {
  return (
    <main className="document">
      <Container maxInlineSize={MEASURE}>
        <article className="document__article">
          <header className="document__header">
            <Text render={<h1 />} variant="displaySmall">
              Privacy
            </Text>
          </header>
          <div className="prose">
            <Paragraph>
              This site uses Google Analytics to count visits anonymously, so
              Kanso Labs can see which pages are read. There are no accounts
              here and no ads, and nothing that names you is collected.
            </Paragraph>
            <Section heading="What is recorded">
              <Paragraph>
                The pages you open and the page that led you here; how far down
                a page you scroll; clicks on links that leave the site; and
                files you download. With each, Google Analytics records your
                browser, device, language and approximate location, which it
                derives from your IP address without storing the address. No
                user ID is set, and nothing you type is sent.
              </Paragraph>
              <Paragraph>
                Google signals and every advertising feature are off, and the
                site tells Google that consent for ads is denied, for every
                visitor.
              </Paragraph>
            </Section>
            <Section heading="Cookies">
              <Paragraph>
                While analytics is on, Google Analytics sets two cookies on this
                site, <Code>_ga</Code> and one beginning <Code>_ga_</Code>, to
                tell a returning browser from a new one. Your choice below is
                kept in your browser&rsquo;s local storage, and goes nowhere
                else.
              </Paragraph>
            </Section>
            <Section heading="How long it is kept">
              <Paragraph>
                Google Analytics keeps the records for 14 months and then
                deletes them.
              </Paragraph>
            </Section>
            <Section heading="Your choice">
              <Paragraph>
                In the European Economic Area, the United Kingdom and
                Switzerland, nothing is collected until you allow it. The site
                tells where you are from your browser&rsquo;s time zone, and
                asks whenever it is unsure. Elsewhere analytics is on until you
                turn it off.
              </Paragraph>
              <Choice />
              <Paragraph>
                Google also offers a{' '}
                <Link
                  href="https://tools.google.com/dlpage/gaoptout"
                  tone="primary"
                  underline="always"
                >
                  browser add-on that turns Google Analytics off
                </Link>{' '}
                on every site, and explains{' '}
                <Link
                  href="https://policies.google.com/technologies/partner-sites"
                  tone="primary"
                  underline="always"
                >
                  how it uses information from sites that use its services
                </Link>
                .
              </Paragraph>
            </Section>
            <Section heading="Questions">
              <Paragraph>
                Write to{' '}
                <Link
                  href="mailto:contact@kansolabs.org"
                  tone="primary"
                  underline="always"
                >
                  contact@kansolabs.org
                </Link>
                .
              </Paragraph>
            </Section>
          </div>
        </article>
      </Container>
    </main>
  )
}
