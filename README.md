# [TanStarter Monorepo](https://github.com/mugnavo/tanstarter-monorepo)

> [!WARNING]
> This is still a work in progress. Mainly waiting on:
>
> - [ ] Drizzle Relations v2 support in Better Auth (https://github.com/better-auth/better-auth/pull/6913)
>
> Also see the [issue watchlist](#issue-watchlist) below.

<!-- scaffold:description -->

A minimal monorepo starter for 🏝️ TanStack Start, based on [mugnavo/tanstarter](https://github.com/mugnavo/tanstarter).

```
pnpm create mugnavo -t monorepo
```

- [Vite Plus](https://viteplus.dev/) + pnpm workspaces with [catalogs](https://pnpm.io/catalogs)
- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest) + [Form](https://tanstack.com/form/latest)
- [Vite 8](https://vite.dev/) + [Nitro v3](https://nitro.build/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) (base-maia) + [Remix Icon](https://remixicon.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://www.better-auth.com/)

```sh
├── apps
│    ├── web                    # TanStack Start web app
├── packages
│    ├── auth                   # Better Auth
│    ├── db                     # Drizzle ORM + Drizzle Kit + PostgreSQL
│    └── ui                     # shadcn/ui primitives & utils
├── tooling
│    └── tsconfig               # Shared TypeScript configuration
├── vite.config.ts
├── LICENSE
└── README.md
```

## Table of Contents

- [Getting Started](#getting-started)
- [Deploying to production](#deploying-to-production)
- [Issue watchlist](#issue-watchlist)
- [Goodies](#goodies)
  - [Scripts](#scripts)
  - [Utilities](#utilities)
- [Third-party integrations](#thirdparty-integrations)
- [Ecosystem](#ecosystem)

## Getting Started

> [!IMPORTANT]
> This template requires [Vite+ `vp`](https://viteplus.dev/guide/#install-vp) and [pnpm](https://pnpm.io/installation) to be installed.

1. [Use this template](https://github.com/new?template_name=tanstarter-monorepo&template_owner=mugnavo) or create a project using our CLI:

   ```
   pnpm create mugnavo -t monorepo
   ```

2. Create `.env` files in [`/apps/web`](./apps/web/.env.example) and [`/packages/db`](./packages/db/.env.example) based on their respective `.env.example` files.

3. Generate the initial migration with drizzle-kit, then apply to your database:

   ```sh
   pnpm db generate
   pnpm db migrate
   ```

4. Run the development server:

   ```sh
   pnpm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

> [!TIP]
> If you want to run a local Postgres instance via Docker Compose with the dev server, you can use the [dev.sh](./dev.sh) script:
>
> ```sh
> ./dev.sh # runs "pnpm dev"
> # or
> ./dev.sh web # runs pnpm dev:web
> ```

## Deploying to production

The [vite config](./apps/web/vite.config.ts#L15-L16) is currently configured to use Nitro to deploy on Netlify, but supports many other [deployment presets](https://nitro.build/deploy) like Vercel and Node.

While Nitro provides a great multi-provider default, the official [@netlify/vite-plugin-tanstack-start](https://npmx.dev/package/@netlify/vite-plugin-tanstack-start) is also available for Netlify deployments.

Refer to the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for deploying to other platforms.

## Issue watchlist

- [Vite+ issues](https://github.com/voidzero-dev/vite-plus/issues) - Vite+ is in alpha.
- [Router/Start issues](https://github.com/TanStack/router/issues) - TanStack Start is in RC.
- [Devtools releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.
- [Nitro v3 beta](https://nitro.build/blog/v3-beta) - This template is configured with Nitro v3 beta by default.
- [Drizzle ORM v1 Beta](https://orm.drizzle.team/docs/relations-v1-v2) - Drizzle ORM v1 is in beta with relations v2.
- [Better Auth experimental branch](https://github.com/better-auth/better-auth/pull/6913) - We're using a separate branch of Better Auth v1.5 that supports Drizzle relations v2.

## Goodies

#### Git hooks

We use [Vite+ Commit Hooks](https://viteplus.dev/guide/commit-hooks) to run git hooks with the following tools:

- [`vp staged`](https://viteplus.dev/guide/commit-hooks#configuration) - Run Oxfmt to format staged files on commit (`pre-commit`).
- [commitlint](https://commitlint.js.org/) - Enforce [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) messages (`commit-msg`).

#### Scripts

This template is configured for **[pnpm](https://pnpm.io/)** by default. Check the root [package.json](./package.json) and each workspace package's `package.json` for the full list of available scripts.

- **`auth:generate`** - Regenerate the [auth db schema](./packages/db/src/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./packages/auth/src/auth.ts).
- **`ui`** - The shadcn/ui CLI. (e.g. `pnpm ui add button`)
- **`format`**, **`lint`** - Run Oxfmt and Oxlint, or both via `pnpm check`.
- **`deps`** - Selectively upgrade dependencies via taze.

> [!NOTE]
> To switch to another package manager (e.g., bun or npm), update the commands in your `package.json` files and [`dev.sh`](./dev.sh). You'll also need to replace or remove [`pnpm-workspace.yaml`](./pnpm-workspace.yaml), which uses pnpm [catalogs](https://pnpm.io/catalogs). Bun and Yarn have their own equivalents, but the file formats may differ.

#### Utilities

- [`/auth/src/tanstack/middleware.ts`](./packages/auth/src/tanstack/middleware.ts) - Sample middleware for forcing authentication on server functions.
- [`/web/src/components/theme-toggle.tsx`](./apps/web/src/components/theme-toggle.tsx), [`/ui/lib/theme-provider.tsx`](./packages/ui/lib/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode.

## Third‑party integrations

The template is kept minimal by default, but is compatible with many third‑party integrations. Here are a few we use in our projects:

- [PostHog](https://posthog.com/) - analytics & observability
- [Resend](https://resend.com/) - email
- [Polar](https://polar.sh/) - billing
- ... and many more!

## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.

## Ecosystem

- [TanStack CLI](https://tanstack.com/cli/latest) - The official CLI for TanStack, which includes docs search commands for agent workflows.
- [awesome-tanstack-start](https://github.com/Balastrong/awesome-tanstack-start) - A curated list of awesome resources for TanStack Start.
- [shadcn/ui Directory](https://ui.shadcn.com/docs/directory), [MCP](https://ui.shadcn.com/docs/mcp), [shoogle.dev](https://shoogle.dev/) - Component directories & registries for shadcn/ui.
