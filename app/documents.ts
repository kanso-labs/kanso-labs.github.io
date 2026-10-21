// The organization's community health files, which kanso-labs/.github serves
// to every repository and this site renders as pages of its own. The Markdown
// is read when the site is built, so a page is the file as it stood on that
// repository's main branch at the last deploy.

export const SOURCE_BRANCH = 'main'
export const SOURCE_REPOSITORY = 'kanso-labs/.github'

export interface CommunityDocument {
  file: string
  // What a link to the page says, where the page is offered.
  label: string
  slug: string
}

export const documents: CommunityDocument[] = [
  { file: 'CONTRIBUTING.md', label: 'How to contribute', slug: 'contributing' },
  { file: 'SUPPORT.md', label: 'Where to ask a question', slug: 'support' },
  { file: 'SECURITY.md', label: 'Security policy', slug: 'security' },
  {
    file: 'CODE_OF_CONDUCT.md',
    label: 'Code of conduct',
    slug: 'code-of-conduct',
  },
]

export function documentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug)
}

export function sourceUrl(file: string) {
  return `https://github.com/${SOURCE_REPOSITORY}/blob/${SOURCE_BRANCH}/${file}`
}

// The files link to one another the way GitHub reads them, relative to the
// repository. A link to another of these files becomes a link to its page here,
// and any other relative link becomes the file it names on GitHub, which is
// where it would have led. Absolute links and anchors are left as written.
export function resolveHref(href: string) {
  if (href.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(href)) {
    return href
  }

  const hashAt = href.indexOf('#')
  const path = (hashAt === -1 ? href : href.slice(0, hashAt)).replace(
    /^\.\//,
    '',
  )
  const hash = hashAt === -1 ? '' : href.slice(hashAt)
  const document = documents.find((candidate) => candidate.file === path)

  return document ? `/${document.slug}${hash}` : `${sourceUrl(path)}${hash}`
}
