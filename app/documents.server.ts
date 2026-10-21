import {
  type CommunityDocument,
  SOURCE_BRANCH,
  SOURCE_REPOSITORY,
} from './documents'

export interface LoadedDocument {
  // The Markdown after its title.
  body: string
  // The first paragraph as plain text, for search results and shared links.
  description: string
  // The file's first-level heading.
  title: string
  // When the file last changed on the source branch, in ISO 8601.
  updatedAt: string
}

// One read per file per process, so a development server does not ask GitHub
// again on every request.
const loaded = new Map<string, Promise<LoadedDocument>>()

export function loadDocument(document: CommunityDocument) {
  let pending = loaded.get(document.file)

  if (!pending) {
    pending = fetchDocument(document)
    loaded.set(document.file, pending)
    pending.catch(() => loaded.delete(document.file))
  }

  return pending
}

// Through the API rather than raw.githubusercontent.com, whose cache can serve a
// file minutes old to the very build its change started. A token, which CI
// passes as GITHUB_TOKEN, keeps the reads out of the anonymous rate limit.
async function github(path: string, accept: string) {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
  const response = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: accept,
      'User-Agent': 'kansolabs.org',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status} for ${path}`)
  }

  return response
}

async function fetchDocument(
  document: CommunityDocument,
): Promise<LoadedDocument> {
  const file = encodeURIComponent(document.file)
  const [markdown, commits] = await Promise.all([
    github(
      `repos/${SOURCE_REPOSITORY}/contents/${file}?ref=${SOURCE_BRANCH}`,
      'application/vnd.github.raw+json',
    ).then((response) => response.text()),
    github(
      `repos/${SOURCE_REPOSITORY}/commits?path=${file}&sha=${SOURCE_BRANCH}&per_page=1`,
      'application/vnd.github+json',
    ).then(
      (response) =>
        response.json() as Promise<
          { commit: { committer: { date: string } } }[]
        >,
    ),
  ])

  const heading = /^# (.+)\n+/.exec(markdown)

  if (!heading) {
    throw new Error(`${document.file} does not open with a first-level heading`)
  }

  const body = markdown.slice(heading[0].length)

  return {
    body,
    description: firstParagraph(body),
    title: heading[1].trim(),
    updatedAt: commits[0].commit.committer.date,
  }
}

// The first block that is prose rather than a heading, list, table or code,
// with its links reduced to their text and its emphasis dropped.
function firstParagraph(markdown: string) {
  const paragraph = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|\||>|[-*+] |\d+\. |```)/.test(block))

  return (paragraph ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
}
