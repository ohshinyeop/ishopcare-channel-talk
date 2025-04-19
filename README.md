1. By default, all imports are rooted at `@`. This is defined in `tsconfig`.

```javascript
// EX
import Loading from "@/src/components/commons/Loading";
```

2. Make sure to add the `LoadingPage` component to the `pendingComponent` of every route root.

```javascript
// Example
export const Route = createFileRoute("/someurl")({
  component: <SomeComponent />,
  pendingComponent: () => <LoadingPage />,
});
```

3. Make sure to add the `ErrorPage` component to the `errorComponent` of every route root.

```javascript
// Example
export const Route = createFileRoute("/someurl")({
  component: <SomeComponent />,
  pendingComponent: () => <ErrorPage />,
});
```

4. In folder routing, if you prefix with `@`, it will be ignored in the routing. Use @ to create folders to hold components or files that are used in that route

5. the required components of the shadcn ui are added using `pnpm dlx shadcn@canary add {button}` to add them using

6. Don't directly define types for backend API requests. We generate them automatically by hooking into the backend swagger.
