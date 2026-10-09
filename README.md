# react/lab

A hands-on React 19.2 + TypeScript field guide, built with Vite, React Router,
Tailwind CSS 4, Lucide icons, and React Compiler.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run build
npm run lint
npm run preview
```

## Code quality

```sh
npm run lint          # Check TypeScript and React rules
npm run lint:fix      # Apply available ESLint fixes
npm run format       # Format source and configuration files
npm run format:check # Check formatting without changing files
```

Prettier owns formatting; ESLint owns code-quality and React rules.
`eslint-config-prettier` disables conflicting ESLint formatting rules.
Generated output and the dependency lockfile are excluded from Prettier.

The `@/` alias resolves to `src/` in both TypeScript and Vite:

```tsx
import LessonPage from "@/components/LessonPage";
```

Relative imports remain supported. For editor formatting, use the Prettier
extension (`esbenp.prettier-vscode`) and the ESLint extension (`dbaeumer.vscode-eslint`).

## Lessons

Every lesson has its own lazy-loaded route and page module, a what/why/how
explanation, an interactive scenario, a copyable code excerpt, a caution, and
a link to the official React documentation.

- State: `useState`, `useReducer`, `useContext`
- Effects: `useEffect`, `useEffectEvent`, `useLayoutEffect`, `useInsertionEffect`
- References: `useRef`, `useImperativeHandle`
- Performance: `useMemo`, `useCallback`, `useTransition`, `useDeferredValue`
- Advanced: `useId`, `useSyncExternalStore`, `useDebugValue`, `useActionState`,
  `useOptimistic`, and React DOM's `useFormStatus`
- Features: `use`, Suspense/lazy, Activity, form Actions, ref-as-prop, portals,
  error boundaries, custom hooks, and React Compiler

`use` is a resource-reading API rather than a conventional hook. `useFormStatus`
comes from `react-dom`. Activity and useEffectEvent require React 19.2.

## Structure

```text
src/
  App.tsx                 Router composition
  components/             Shared layout, lesson template, and demo components
  data/lessons.ts          Catalog and explicit lazy page imports
  hooks/                  Reusable custom hooks
  lib/demoApi.ts          Local async simulation helper
  pages/
    HomePage.tsx          Searchable collection
    NotFoundPage.tsx      Unknown-route fallback
    hooks/               One module for each hook
    features/            One module for each feature
  index.css               Tailwind theme and shared component classes
```

To add a lesson, create a default-exported page under `pages/`, use the shared
`LessonPage` component, and register its slug and lazy import in `data/lessons.ts`.
The sidebar, overview, and previous/next navigation use that catalog.

## Notes

- All requests are explicitly labeled local simulations. There is no backend,
  account, or durable storage; examples reset when leaving their lesson.
- React Compiler is enabled in `vite.config.ts`. Explicit memoization is used
  only in lessons teaching `useMemo` and `useCallback`.
- Strict Mode is enabled. Effects clean up timers and subscriptions.
- React DevTools is needed to inspect `useDebugValue` labels and compiler output.
- React Server Components and Server Functions require a supporting framework;
  plain client-side Vite does not provide them.
- BrowserRouter deployments must rewrite unknown paths to `index.html` to
  support refreshed lesson URLs. The Vite development server handles this.
- Google Fonts and the overview React image use external URLs.
- Code excerpts focus on the concept; complete typed implementations live in
  the corresponding page modules.
