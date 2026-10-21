// What the home page lists. The descriptions are the repositories' own, as
// their READMEs and GitHub descriptions word them, so a change to what a
// project is starts there and is copied here.

export interface Link {
  href: string
  label: string
}

export interface Project {
  description: string
  links: Link[]
  name: string
  // The repository, shown beside the name. Left out for Daily, whose source
  // is private.
  repository?: string
  tags: string[]
}

export interface Group {
  id: string
  projects: Project[]
  summary: string
  title: string
}

export interface Principle {
  description: string
  title: string
}

export interface Roadmap {
  href: string
  name: string
  note?: string
}

const github = (repository: string): Link => ({
  href: `https://github.com/kanso-labs/${repository}`,
  label: 'GitHub',
})

const npm = (name: string): Link => ({
  href: `https://www.npmjs.com/package/${name}`,
  label: 'npm',
})

export const groups: Group[] = [
  {
    id: 'design-system',
    projects: [
      {
        description:
          'A React component library on React Aria Components, styled with StyleX. Every token carries a default, light and dark, so a component renders correctly the moment it is imported.',
        links: [
          { href: 'https://kanso-ui.kansolabs.org/', label: 'Storybook' },
          github('kanso-ui'),
          npm('@kanso-labs/kanso-ui'),
        ],
        name: 'Kanso UI',
        repository: 'kanso-ui',
        tags: ['React', 'React Aria', 'StyleX'],
      },
      {
        description:
          "Kanso UI's Material Design components for React Native, on the same design tokens and theming as kanso-ui, so one theme object serves a web app and a native app alike.",
        links: [
          {
            href: 'https://react-native-kanso-ui.kansolabs.org/',
            label: 'Storybook',
          },
          github('react-native-kanso-ui'),
          npm('@kanso-labs/react-native-kanso-ui'),
        ],
        name: 'Kanso UI for React Native',
        repository: 'react-native-kanso-ui',
        tags: ['React Native', 'iOS', 'Android'],
      },
      {
        description:
          'Compiles Style Dictionary design tokens ahead of your bundler. One implementation targets Vite, Rolldown, Rollup, Rspack and Webpack, with watching and HMR under Vite.',
        links: [
          github('unplugin-style-dictionary'),
          npm('@kanso-labs/unplugin-style-dictionary'),
        ],
        name: 'Unplugin Style Dictionary',
        repository: 'unplugin-style-dictionary',
        tags: ['Style Dictionary', 'Vite', 'Webpack'],
      },
    ],
    summary:
      'One set of design tokens, drawn on the web and on iOS and Android.',
    title: 'Design system',
  },
  {
    id: 'apps',
    projects: [
      {
        description:
          'Small everyday tools under one calm shell: expenses shared across groups, each keeping its own currency and settled up without Daily ever moving money, and a focus timer. Installable, offline-ready, in English and Brazilian Portuguese.',
        links: [
          {
            href: 'https://daily.kanso-labs-org.workers.dev/',
            label: 'Open Daily',
          },
        ],
        name: 'Daily',
        tags: ['Web app', 'Installable'],
      },
    ],
    summary: 'Small everyday tools, built on Kanso UI.',
    title: 'Apps',
  },
  {
    id: 'home-assistant',
    projects: [
      {
        description:
          'Home Assistant applications for the arr stack, Plex, qBittorrent, NZBGet, Seerr and n8n. aarch64 and amd64, kept current automatically.',
        links: [
          { href: 'https://home-assistant.kansolabs.org/', label: 'Catalogue' },
          github('home-assistant-applications'),
        ],
        name: 'Home Assistant Applications',
        repository: 'home-assistant-applications',
        tags: ['aarch64', 'amd64'],
      },
      {
        description:
          "A Home Assistant integration, installed through HACS, that draws live maps of Xiaomi, Roborock, Dreame, Viomi, Roidmi and iJai robot vacuums from Xiaomi's cloud, with no rooting. Built on Piotr Machowski's Xiaomi Cloud Map Extractor.",
        links: [github('home-assistant-robot-vacuum-map')],
        name: 'Robot Vacuum Map',
        repository: 'home-assistant-robot-vacuum-map',
        tags: ['HACS', 'Python'],
      },
    ],
    summary: 'Applications and an integration for Home Assistant.',
    title: 'Home Assistant',
  },
  {
    id: 'shared-ci',
    projects: [
      {
        description:
          'Shared composite actions and reusable workflows: Node setup, workflow linting, release-please, npm trusted publishing and @renovate commands.',
        links: [github('actions')],
        name: 'Actions',
        repository: 'actions',
        tags: ['GitHub Actions'],
      },
      {
        description:
          'The self-hosted Renovate runner. One scheduled workflow keeps dependencies current across every repository, with @renovate comment commands.',
        links: [github('renovate')],
        name: 'Renovate',
        repository: 'renovate',
        tags: ['Renovate'],
      },
    ],
    summary:
      'What every repository here calls to lint, release and stay current.',
    title: 'Shared CI',
  },
]

// The organization profile README's "How this organization works", in the
// same words.
export const principles: Principle[] = [
  {
    description:
      'The code of conduct, contributing guide, security policy and issue templates are served from one repository to every other. A repository carrying its own copy has overridden the default on purpose, and says why.',
    title: 'Shared documentation lives once.',
  },
  {
    description:
      'AGENTS.md is the fullest reference in every repository: the conventions, the reasoning behind them, and the traps that have already caught someone. It is worth reading even if you never run an agent.',
    title: 'Written for coding agents as well as people.',
  },
  {
    description:
      'Dependencies are exact versions, actions are exact tags, and language runtimes are fully specified in .tool-versions. Renovate opens every bump.',
    title: 'Nothing is pinned loosely.',
  },
]

// The public GitHub Projects each repository's work is planned in.
export const roadmaps: Roadmap[] = [
  {
    href: 'https://github.com/orgs/kanso-labs/projects/1',
    name: 'Kanso UI',
    note: 'Also tracks Kanso UI for React Native',
  },
  {
    href: 'https://github.com/orgs/kanso-labs/projects/3',
    name: 'Unplugin Style Dictionary',
  },
  {
    href: 'https://github.com/orgs/kanso-labs/projects/5',
    name: 'Home Assistant Applications',
  },
  {
    href: 'https://github.com/orgs/kanso-labs/projects/7',
    name: 'Robot Vacuum Map',
  },
]
