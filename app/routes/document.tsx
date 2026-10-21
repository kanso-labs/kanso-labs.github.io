import {
  Code,
  Container,
  Link,
  Separator,
  Stack,
  Text,
} from '@kanso-labs/kanso-ui'
import Markdown, { type Components } from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { MEASURE } from '../components/site'
import { documentBySlug, documents, resolveHref, sourceUrl } from '../documents'
import { loadDocument } from '../documents.server'
import type { Route } from './+types/document'

// Runs when the site is built, once for each document's path, since the site
// has no server. The page is therefore the file as it stood at that build.
export async function loader({ request }: Route.LoaderArgs) {
  // The prerender asks for the page and for its data, the second at the same
  // path with `.data` on the end.
  const slug = new URL(request.url).pathname
    .replace(/\.data$/, '')
    .replace(/^\/+|\/+$/g, '')
  const document = documentBySlug(slug)

  if (!document) {
    throw new Response('Not found', { status: 404 })
  }

  return { document, ...(await loadDocument(document)) }
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) {
    return [{ title: 'Kanso Labs' }]
  }

  const title = `${loaderData.title} · Kanso Labs`
  const url = `https://kansolabs.org/${loaderData.document.slug}`

  return [
    { title },
    { content: loaderData.description, name: 'description' },
    { href: url, rel: 'canonical', tagName: 'link' },
    { content: 'Kanso Labs', property: 'og:site_name' },
    { content: title, property: 'og:title' },
    { content: loaderData.description, property: 'og:description' },
    { content: url, property: 'og:url' },
    { content: 'article', property: 'og:type' },
  ]
}

// One timezone for every visitor, so the day the browser draws is the day the
// build wrote.
const day = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

// Each Markdown element drawn as the kanso-ui component that plays its part, so
// the documents read in the same type and colour as the rest of the site.
const components: Components = {
  a: ({ children, href }) => (
    <Link href={resolveHref(href ?? '')} tone="primary" underline="always">
      {children}
    </Link>
  ),
  // A fenced block carries a language class or spans lines; anything else is
  // code inside a sentence.
  code: ({ children, className }) =>
    className || String(children).includes('\n') ? (
      <code className={className}>{children}</code>
    ) : (
      <Code>{children}</Code>
    ),
  h2: ({ children, id }) => (
    <Text id={id} render={<h2 />} variant="headlineSmall">
      {children}
    </Text>
  ),
  h3: ({ children, id }) => (
    <Text id={id} render={<h3 />} variant="titleLarge">
      {children}
    </Text>
  ),
  hr: () => <Separator />,
  p: ({ children }) => (
    <Text block variant="bodyLarge">
      {children}
    </Text>
  ),
  table: ({ children }) => (
    <div className="prose__table">
      <table>{children}</table>
    </div>
  ),
}

export default function DocumentPage({ loaderData }: Route.ComponentProps) {
  const { body, document, title, updatedAt } = loaderData
  const others = documents.filter((other) => other.slug !== document.slug)

  return (
    <main className="document">
      <Container maxInlineSize={MEASURE}>
        <article className="document__article">
          <header className="document__header">
            <Text render={<h1 />} variant="displaySmall">
              {title}
            </Text>
            <Text block tone="muted" variant="bodyMedium">
              Updated{' '}
              <time dateTime={updatedAt}>
                {day.format(new Date(updatedAt))}
              </time>
              {' · '}
              <Link
                href={sourceUrl(document.file)}
                tone="inherit"
                underline="always"
              >
                {document.file} on GitHub
              </Link>
            </Text>
          </header>
          <div className="prose">
            <Markdown
              components={components}
              rehypePlugins={[rehypeSlug]}
              remarkPlugins={[remarkGfm]}
            >
              {body}
            </Markdown>
          </div>
          <nav aria-labelledby="document-others" className="document__others">
            <Text
              id="document-others"
              render={<h2 />}
              tone="muted"
              variant="labelLarge"
            >
              Other guidelines
            </Text>
            <Stack direction="row" gap="xl" wrap>
              {others.map((other) => (
                <Text key={other.slug} variant="labelLarge">
                  <Link
                    href={`/${other.slug}`}
                    tone="inherit"
                    underline="always"
                  >
                    {other.label}
                  </Link>
                </Text>
              ))}
            </Stack>
          </nav>
        </article>
      </Container>
    </main>
  )
}
