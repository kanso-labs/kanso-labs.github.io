# kansolabs.org

The home page of [Kanso Labs](https://kansolabs.org/): design tokens and the
component libraries built on them, Home Assistant applications and integrations,
Daily, and the shared CI that releases all of it.

It is one prerendered [React Router](https://reactrouter.com/) page built with
[kanso-ui](https://github.com/kanso-labs/kanso-ui), served by GitHub Pages.

## Running it

You need the Node version in `.tool-versions`, which
[mise](https://mise.jdx.dev) installs.

```shell
npm ci
npm run dev
```

`npm run build` prerenders the page into `build/client`, and `npm run preview`
serves it as Pages will. `AGENTS.md` lists every command, and says how the page
is built and why.

## Licence

MIT. See [LICENSE.md](LICENSE.md).
