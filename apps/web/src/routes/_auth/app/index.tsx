import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = Route.useRouteContext();
  // we can also use the useAuth() or useAuthSuspense() hooks here from ~/lib/auth/hooks
  // this is just to demo that route context is available in route components, in addition to loaders/beforeLoad

  return (
    <div className="flex flex-col items-center gap-3 text-center text-sm">
      <pre className="mb-1 rounded-md border bg-card p-1 text-xs text-card-foreground">
        _auth/app/index.tsx
      </pre>

      <div>
        User from route context:
        <span className="mt-0.5 block font-mono text-xs">{user.name}</span>
      </div>

      <div>
        <p>The /app index page, a protected route, since it is under the _auth layout:</p>
        <pre className="mx-auto mt-0.5 block w-fit rounded-md border bg-card p-1 text-xs text-card-foreground">
          _auth/route.tsx
        </pre>
      </div>
    </div>
  );
}
