import {
  RiCheckLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGithubFill,
  RiTerminalLine,
} from "@remixicon/react";
import { useAuthSuspense } from "@repo/auth/tanstack/hooks";
import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { SignOutButton } from "~/components/sign-out-button";
import { ThemeToggle } from "~/components/theme-toggle";

/**
 * This is the intro component for TanStarter, which you may delete after creating the project.
 * Have fun!
 */
export function IntroPageDeleteMe() {
  const [isCopied, setIsCopied] = useState(false);

  const repoUrl = "https://github.com/mugnavo/tanstarter-monorepo";
  const cloneCommand = "pnpm create mugnavo@latest -t monorepo";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand);
      setIsCopied(true);
      toast.success("Command copied to clipboard");

      setTimeout(() => {
        setIsCopied(false);
      }, 4000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-12 md:pt-32">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <a href={repoUrl} className="flex items-center gap-2 hover:underline">
              <img
                src="https://mugnavo.com/favicon-32x32.png"
                alt="Mugnavo logo"
                className="size-6"
              />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                tanstarter-monorepo
              </span>
            </a>
            <ThemeToggle />
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            A <span className="text-yellow-500 dark:text-yellow-200">minimal</span> monorepo starter
            for TanStack Start.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A minimal, opinionated monorepo foundation for building type-safe web applications
            without the extra boilerplate.
          </p>
        </header>

        {/* Command Section */}
        <section className="mb-12">
          <div className="rounded-xl border border-border bg-card p-1 shadow-2xl">
            <div className="group flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <RiTerminalLine className="hidden size-4 shrink-0 text-muted-foreground/70 sm:inline" />
                <code className="overflow-hidden font-mono text-sm text-ellipsis whitespace-nowrap text-primary md:text-base">
                  <span className="mr-2 hidden text-muted-foreground/70 select-none sm:inline">
                    $
                  </span>
                  {/* oxlint-disable-next-line eslint-plugin-jsx-a11y/click-events-have-key-events eslint-plugin-jsx-a11y/no-static-element-interactions */}
                  <span className="select-all" onClick={copyToClipboard}>
                    {cloneCommand}
                  </span>
                </code>
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-4 shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                title="Copy command"
              >
                {isCopied ? (
                  <RiCheckLine className="h-5 w-5 text-primary" />
                ) : (
                  <RiFileCopyLine className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="py-6">Loading session...</div>}>
          <UserAction />
        </Suspense>

        {/* Features Grid */}
        <section className="mb-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <Feature
            title="TanStack Start"
            desc="Harness the power of TanStack Router and Vite in a unified full-stack framework."
          />
          <Feature
            title="Drizzle ORM, Better Auth, shadcn/ui"
            desc="Only the essentials. Less complex boilerplate that you'll end up deleting anyway."
          />
          <Feature
            title="End-to-end Type Safety"
            desc="Effortless type safety powered by TanStack Router and Start server functions."
          />
          <Feature
            title="Turborepo, Vite 8, Rolldown, Oxc"
            desc="For the next generation of web apps with type-safe routing and next-gen tooling."
          />
        </section>

        <section className="mx-auto mb-16 hidden max-w-[60ch] space-y-3 bg-card/50 p-4 text-sm text-foreground/80 sm:block">
          <p>
            You may delete this component at{" "}
            <span className="rounded-md border border-border bg-card px-1 py-1.5 font-mono">
              components/_DELETE_ME_intro_page.tsx
            </span>{" "}
            after creating your project.
          </p>

          <p>Happy coding!</p>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-6 text-sm md:flex-row">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RiGithubFill className="size-5" />
            GitHub
          </a>
          <a
            href="https://mugnavo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary underline decoration-border transition-all hover:decoration-primary"
          >
            Mugnavo
            <RiExternalLinkLine className="size-4" />
          </a>
        </footer>
      </div>
    </div>
  );
}

function UserAction() {
  const { user } = useAuthSuspense();

  return user ? (
    <section className="mb-20 flex flex-col items-center space-y-1.5">
      <div className="mb-4 flex w-full items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
        <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          Session
        </h2>
      </div>
      <div className="mb-3 w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-border"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-border"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-border"></div>
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">
              useAuthSuspense() data
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/70 uppercase">ReadOnly</span>
        </div>
        <div className="overflow-x-auto p-6">
          <pre className="font-mono text-xs leading-relaxed text-foreground/80">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>

      <Button render={<Link to="/login" />} className="w-fit" size="lg" nativeButton={false}>
        Go to /app
      </Button>
      <SignOutButton />
    </section>
  ) : (
    <section className="mb-20 space-y-1 text-center">
      <p>You are not signed in.</p>
      <Button render={<Link to="/login" />} className="w-fit" size="lg" nativeButton={false}>
        Log in
      </Button>
    </section>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
