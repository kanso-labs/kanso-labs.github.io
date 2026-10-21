# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

The website at [kansolabs.org](https://kansolabs.org/): a home page that says
what Kanso Labs makes and links to each project, and the organization's
community guidelines, each a page of its own. It is the organization's GitHub
Pages site, which is why the repository is named `kanso-labs.github.io`, served
at kansolabs.org.

It is a [React Router](https://reactrouter.com/) app with no server. Every page,
the not-found page among them, is prerendered to HTML at build time, so visitors
and crawlers get the whole page before any script loads, and the script only
hydrates it. Its components come from
[kanso-ui](https://github.com/kanso-labs/kanso-ui), themed with the
organization's own palette.

| Path                       | What it is                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `app/routes/home.tsx`      | The home page                                                                      |
| `app/routes/document.tsx`  | A community guideline's page, one route per guideline                              |
| `app/routes/not-found.tsx` | Every other path, published as `404.html`                                          |
| `app/routes/site.tsx`      | The header and footer around every page                                            |
| `app/projects.ts`          | What the home page lists: the project groups, the principles and the roadmaps      |
| `app/documents.ts`         | Which guidelines are pages, at which paths, and where the links inside them lead   |
| `app/documents.server.ts`  | Reads each guideline from GitHub as the site builds                                |
| `app/styles/theme.css`     | The palette and type, as kanso-ui `--kui-*` tokens                                 |
| `app/styles/layout.css`    | The pages' own layout: region rhythm, the columns that stack on a phone, the prose |
| `app/root.tsx`             | The document, its metadata, and the state shown when a page fails                  |
| `public/`                  | The mark and the favicons, copied into the build as they are                       |

The design is the Claude Design canvas "Kanso Labs Home Page", direction A, Ink.
It draws the page at desktop width in light and dark, and at a phone's.

## Commands

Install with the Node version in `.tool-versions`. If `node --version` disagrees
with it, prefix the command:

```shell
mise exec node@"$(awk '/^nodejs/{print $2}' .tool-versions)" -- npm install
```

| Task       | Command             | Notes                                                         |
| ---------- | ------------------- | ------------------------------------------------------------- |
| Dev server | `npm run dev`       | http://localhost:5173                                         |
| Build      | `npm run build`     | Prerenders every page into `build/client`                     |
| Preview    | `npm run preview`   | Serves `build/client`, as Pages will                          |
| Typecheck  | `npm run typecheck` | Generates React Router's route types, then runs `tsc`         |
| Format     | `npm run format`    | oxfmt; `npm run format:check` is the check                    |
| Lint       | `npm run lint`      | The formatting check and the typecheck, which is what CI runs |

## Conventions

### Shared with the other kanso-labs repositories

The canonical text is
[`CONVENTIONS.md`](https://github.com/kanso-labs/.github/blob/main/CONVENTIONS.md)
in `kanso-labs/.github`; this is a copy, kept in step by hand. Change that file
first, then every copy.

- **Keys in JSON and YAML are ordered by name.** Files whose order carries
  meaning are exempt: workflows, where step order is execution order;
  changelogs, which are chronological; and `package.json`, where the npm
  ecosystem expects `name` and `version` first.
- **A workflow's filename is the kebab-case of its `name:` field.** Reusable
  workflows, meaning those triggered only by `workflow_call`, take a leading
  underscore.
- **Job names and step names are imperative verb phrases.** Job ids, step ids,
  and matrix keys are exempt.
- **Actions are pinned to exact release tags**, `actions/checkout@v7.0.1`, never
  `@main` and never a tag the publisher moves — `@v7` and `@v7.0` both move.
  Renovate opens the bump pull requests, and it has nothing to open when the pin
  never changes: `frenck/action-app-linter@v2.21` sat still through a repository
  rename and a release that fixed something a consumer was working around,
  because the tag it named was moved onto both.
- **Dependency versions are pinned exactly.** Every `dependencies`,
  `devDependencies`, and `optionalDependencies` entry is a bare version,
  `1.2.3`, never `^1.2.3`, `~1.2.3`, `>=1.2.3`, `*`, `1.x`, or an `||` union.
  Renovate opens those bumps too. `peerDependencies` are the deliberate
  exception: they state what the consumer's own installed copy must satisfy, so
  ranges are correct there and stay.
- **`.tool-versions` pins a fully-specified version on every line**,
  `nodejs <major>.<minor>.<patch>`, never `nodejs 24` or `nodejs lts`.

### Specific to this repository

- **oxfmt formats this repository**, so the command is `npm run format`.
  `LICENSE.md` is exempt, as in every kanso-labs repository, so its copy stays
  byte-identical to the others.
- **The page's words are the projects' own.** A description in `app/projects.ts`
  is the one its repository's README or GitHub description gives, and the
  principles are the organization profile README's. When a project changes what
  it says about itself, copy the new wording here rather than writing a second
  one.

## The page

**Every colour and face is a kanso-ui token, set in `app/styles/theme.css`.**
The mark is black ink on white and nothing else, so the theme is the same: an
ink primary and neutral greys, with no hue of its own. Each colour is written
once with `light-dark()`, and `color-scheme: light dark` on the root lets the
visitor's own setting choose. The overrides sit at `:root`, because kanso-ui
resolves its tokens there once, and the same declarations on a wrapping element
would not reach a component.

**kanso-ui ships no typefaces.** The three its roles are drawn for, Roboto
Serif, Roboto Flex and Roboto Mono, are self-hosted through Fontsource, whose
family names end in "Variable", so the theme names those first. The large serif
roles are set lighter than Material's 400, to sit beside the mark's light
wordmark.

**`app/styles/layout.css` styles no component, with one exception.** On a phone
the hero's headline and lede step down one type role each, through the same
tokens kanso-ui's own roles read. kanso-ui's styles sit in cascade layers, so
these unlayered rules win without raising their specificity.

**The mark is the organization's avatar, a 460px raster with a white ground.**
`public/kanso.png` and `public/leaf.png` are crops of it, and the `.mark` class
multiplies them over the page so the white disappears, and inverts and screens
them in the dark scheme so the ink turns light. Replace them with a vector the
day one exists, and drop the blend.

## The community guidelines

**Four pages are the organization's community health files, read from
[kanso-labs/.github](https://github.com/kanso-labs/.github) as the site
builds.** `CONTRIBUTING.md`, `SUPPORT.md`, `SECURITY.md` and
`CODE_OF_CONDUCT.md` are the files GitHub serves to every repository that has no
copy of its own, and each is a page here, at the path `app/documents.ts` gives
it. Their text lives only in that repository, so nothing here is copied from it.

**A page is the file as it stood when the site was last built.** The build reads
each file from `main` through the GitHub API, with the date of the last commit
that changed it. `Deploy Pages` also runs on `workflow_dispatch`, so a rebuild
needs no commit here.

**A file's first heading is its page's title, and the rest is drawn as Markdown
in kanso-ui's components.** The build fails on a file that does not open with a
`#` heading. A link from one guideline to another becomes a link to that one's
page, and any other relative link leads to the file on GitHub, where it led
before.

## Deploys

`Deploy Pages` builds every pull request and publishes every push to `main`. It
uploads `build/client` as the Pages artifact, after copying each page from
`<path>/index.html`, where the prerender writes it, to `<path>.html`. Pages
answers `/contributing` with a redirect to `/contributing/` when all it has is
the directory, but serves `contributing.html` there directly. One of the copies
is `404.html`, which Pages serves for any path it has no file for.

**The not-found route matches every path and draws the same thing at each.**
Pages has no rewrite rules, so `404.html` arrives under whatever address was
asked for. The route is `*`, prerendered at `/404`, and renders nothing that
depends on the address, so the page hydrates cleanly under any of them. React
Router's own SPA fallback does not: it is prerendered with no route in it, and
hydrating it fails as soon as the router draws one.

**The custom domain is a repository setting, not a file.** A site published by a
workflow ignores any `CNAME` file, so there is none here. kansolabs.org is set
under Settings › Pages, or through the API:
`gh api -X PUT repos/kanso-labs/kanso-labs.github.io/pages -f cname=kansolabs.org`.

**DNS for kansolabs.org is on Cloudflare.** The apex is a flattened CNAME to
`kanso-labs.github.io`, as each project site's subdomain is a CNAME to the same
host, and `www` is a CNAME there too, which Pages redirects to the apex. Both
are DNS only rather than proxied, so GitHub sees its own servers behind the name
and issues and renews the HTTPS certificate itself.

## Commits and pull requests

Pull requests are squash-merged, with the pull request title as the commit
subject, so that title is the one line that reaches `main`. It is a Conventional
Commit, and `Lint` runs it through commitlint. `.commitlintrc.json` admits
`deps` beside the standard types, for Renovate's pull requests.

## Traps

**A fresh worktree has no `node_modules`**, so the first `npm run lint` fails in
a way that looks like a broken branch. Run `npm ci` first.

**The build and the dev server read from GitHub.** Offline, or past the
anonymous rate limit of 60 requests an hour, with eight to a build, they fail.
With `GITHUB_TOKEN` or `GH_TOKEN` set they read as that token instead:
`export GH_TOKEN="$(gh auth token)"`. CI passes the workflow's own token.

**An older npm rewrites the lockfile in ways that break a Linux install.**
Install with the Node in `.tool-versions`, through the `mise exec` line under
Commands when the shell's own Node is another.

**`light-dark()` needs `color-scheme` on the element it is read at.** The root
declares `light dark`; take that away and every colour resolves to its light
value whatever the visitor has chosen.
