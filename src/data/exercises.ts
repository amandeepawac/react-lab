type Exercise = { prompt: string; solution: string; explanation: string };

export const exercises: Record<string, Exercise> = {
  "hooks/use-state": {
    prompt:
      "Add a button that adds three items in one click. Why should it use a functional update?",
    solution: "setQuantity(previous => previous + 3)",
    explanation:
      "The updater receives the latest queued value. Reading quantity directly uses the snapshot from the current render.",
  },
  "hooks/use-reducer": {
    prompt:
      "Add a reset action that returns every checkout field to its initial value. Where should that update live?",
    solution: "case 'reset':\n  return initialCheckout",
    explanation:
      "The reducer owns the complete state transition. Resetting related fields together prevents an inconsistent checkout.",
  },
  "hooks/use-context": {
    prompt:
      "Add a third component that displays translated delivery text. Does language need to pass through its parent's props?",
    solution:
      "function DeliveryNote() {\n  const language = useContext(LanguageContext)\n  return <p>{translations[language].delivery}</p>\n}",
    explanation:
      "Consumers read their nearest provider directly, but must still be rendered inside it.",
  },
  "hooks/use-effect": {
    prompt:
      "What prevents a slow response for an old query from overwriting the current results?",
    solution:
      "if (!controller.signal.aborted) setResults(items)\n\nreturn () => controller.abort()",
    explanation:
      "Cleanup cancels the previous request. Check its signal before committing results, including work that finishes around cancellation.",
  },
  "hooks/use-effect-event": {
    prompt:
      "Add a notification preference that changes heartbeat behavior without reconnecting the interval.",
    solution:
      "const onHeartbeat = useEffectEvent(() => {\n  if (notificationsEnabled) logMessage(name)\n})",
    explanation:
      "The Effect Event reads current preferences; actual connection dependencies stay in the subscription effect.",
  },
  "hooks/use-layout-effect": {
    prompt:
      "Tooltip text can change after mounting. Which dependency should trigger another width measurement?",
    solution:
      "useLayoutEffect(() => {\n  const node = tooltipRef.current\n  if (!node) return\n  node.style.left = (-node.getBoundingClientRect().width / 2) + 'px'\n}, [text])",
    explanation:
      "Content changes affect geometry. Consider ResizeObserver too when size can change independently of props.",
  },
  "hooks/use-insertion-effect": {
    prompt:
      "How should a style injector clean up? Should ordinary Tailwind components use this hook?",
    solution: "document.head.appendChild(style)\nreturn () => style.remove()",
    explanation:
      "Remove the exact element created by setup. This is CSS library infrastructure, not normal application styling.",
  },
  "hooks/use-ref": {
    prompt:
      "Focus an input and select its text without storing its DOM node in state.",
    solution:
      "function selectInput() {\n  inputRef.current?.focus()\n  inputRef.current?.select()\n}",
    explanation:
      "DOM commands belong in handlers or effects. Refs hold handles without making them visual state.",
  },
  "hooks/use-imperative-handle": {
    prompt:
      "Add a select command to the custom input's handle without exposing its DOM node.",
    solution:
      "useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current?.focus(),\n  select: () => inputRef.current?.select(),\n}), [])",
    explanation:
      "Extend the handle's TypeScript type too. Expose only the API the parent needs.",
  },
  "hooks/use-memo": {
    prompt:
      "If products becomes a prop, which dependency is missing from the memoized calculation?",
    solution:
      "const affordable = useMemo(\n  () => products.filter(product => product.price <= budget),\n  [products, budget],\n)",
    explanation:
      "Props are reactive inputs. Omitting products can return stale results. With React Compiler, ordinary derived values are usually enough.",
  },
  "hooks/use-callback": {
    prompt:
      "A callback adds a selected product ID to the basket. Which dependency is still needed with a functional updater?",
    solution:
      "const addItem = useCallback(() => {\n  setBasket(previous => [...previous, productId])\n}, [productId])",
    explanation:
      "The updater removes the basket dependency, but the captured productId must remain in the dependency list.",
  },
  "hooks/use-transition": {
    prompt:
      "Why does setQuery stay outside the transition while the results filter changes inside it?",
    solution:
      "setQuery(nextQuery)\nstartTransition(() => {\n  setFilter(previous => ({ ...previous, query: nextQuery }))\n})",
    explanation:
      "Controlled inputs must update urgently. Non-urgent results rendering can be interrupted and restarted.",
  },
  "hooks/use-deferred-value": {
    prompt:
      "Dim stale results. Does deferred rendering also reduce the number of network requests?",
    solution:
      "const stale = query !== deferredQuery\n<div style={{ opacity: stale ? 0.5 : 1 }}>\n  <Results query={deferredQuery} />\n</div>",
    explanation:
      "Deferred rendering is not network debouncing. Request frequency needs a separate caching or debouncing strategy.",
  },
  "hooks/use-id": {
    prompt: "Associate an error message with a reusable field's generated ID.",
    solution:
      "const id = useId()\n<input id={id} aria-describedby={id + '-error'} aria-invalid={hasError} />\n<p id={id + '-error'}>{error}</p>",
    explanation:
      "Reuse the instance-specific prefix for related elements. Use data-derived IDs, not useId, for list keys.",
  },
  "hooks/use-sync-external-store": {
    prompt:
      "Why is returning a new object from getSnapshot on every read unsafe?",
    solution: "const getSnapshot = () => window.innerWidth",
    explanation:
      "React compares snapshots by identity. Use a primitive or a cached immutable value that changes only when the store changes.",
  },
  "hooks/use-debug-value": {
    prompt: "Add a lazily formatted timestamp label to a shared custom hook.",
    solution:
      "useDebugValue(timestamp, value => new Date(value).toLocaleTimeString())",
    explanation:
      "The formatter runs when DevTools inspects the hook instead of formatting on every render.",
  },
  "hooks/use-action-state": {
    prompt:
      "Which action argument contains FormData, and how can you prevent repeated submissions?",
    solution:
      "async function subscribe(previousState, formData) {\n  return await saveSubscription(formData.get('email'))\n}\n<button disabled={isPending}>Subscribe</button>",
    explanation:
      "Previous state is the first argument; FormData is the second. The hook's pending flag can disable submission.",
  },
  "hooks/use-optimistic": {
    prompt:
      "Why does patching a task by ID avoid duplicate rows when optimistic updates are rebased?",
    solution:
      "current.map(task =>\n  task.id === update.id ? { ...task, ...update } : task\n)",
    explanation:
      "Reapplying the patch changes the same row instead of appending another row with the same ID.",
  },
  "hooks/use-form-status": {
    prompt:
      "pending is always false when the hook is called in the component that creates the form. How would you fix it?",
    solution:
      "function SubmitButton() {\n  const { pending } = useFormStatus()\n  return <button disabled={pending}>Save</button>\n}\n<form action={save}><SubmitButton /></form>",
    explanation:
      "The hook observes a parent form, so move it into a child rendered inside the form. Import it from react-dom.",
  },
  "features/use": {
    prompt:
      "Where should a reload Promise be created, and where should it be read?",
    solution:
      "function reload() {\n  setProfilePromise(loadProfile('Grace'))\n}\nfunction Profile({ promise }) {\n  const profile = use(promise)\n  return <h2>{profile.name}</h2>\n}",
    explanation:
      "Create the stable Promise in a handler and read it under Suspense. Creating a Promise on every render would keep suspending.",
  },
  "features/suspense": {
    prompt:
      "Split a report component into its own chunk. Where should its lazy declaration live?",
    solution:
      "const Report = lazy(() => import('./Report'))\n\n<Suspense fallback={<p>Loading report...</p>}>\n  <Report />\n</Suspense>",
    explanation:
      "Declare lazy at module scope to preserve component identity. The imported component needs a default export.",
  },
  "features/activity": {
    prompt:
      "A draft should survive tab changes while its timer pauses. Which mode should the inactive panel use?",
    solution:
      "<Activity mode={active ? 'visible' : 'hidden'}>\n  <DraftEditor />\n</Activity>",
    explanation:
      "Hidden preserves state and cleans up effects. Unmounting the editor would discard its local draft.",
  },
  "features/form-actions": {
    prompt:
      "What attribute does an input need for a function action to receive its value?",
    solution:
      "<form action={save}>\n  <input name='title' required />\n  <SubmitButton />\n</form>",
    explanation:
      "The name supplies the FormData key. A client action does not automatically become a server function.",
  },
  "features/ref-as-prop": {
    prompt: "Type a React 19 input's ref prop and forward it to the DOM input.",
    solution:
      "type Props = { ref: Ref<HTMLInputElement> }\nfunction NameInput({ ref }: Props) {\n  return <input ref={ref} />\n}",
    explanation:
      "Import Ref as a type from react. React 19 function components do not need forwardRef for this.",
  },
  "features/portals": {
    prompt:
      "Does mounting in document.body automatically supply focus trapping and Escape handling?",
    solution:
      "createPortal(<dialog ref={dialogRef}>...</dialog>, document.body)\n\n// In an effect:\ndialogRef.current?.showModal()",
    explanation:
      "A portal changes DOM placement only. Native modal dialog behavior supplies focus and Escape handling in this example.",
  },
  "features/error-boundaries": {
    prompt:
      "Will a rendering boundary catch a rejected request inside a click handler?",
    solution:
      "try {\n  await saveDraft()\n} catch (error) {\n  setError(error instanceof Error ? error.message : 'Save failed')\n}",
    explanation:
      "Catch request and event-handler errors where they occur. Rendering boundaries catch failures during descendant rendering.",
  },
  "features/custom-hooks": {
    prompt:
      "Why are two useCounter calls independent? What would you use to share one value?",
    solution: "const morning = useCounter(0)\nconst afternoon = useCounter(5)",
    explanation:
      "Each call owns separate state. Lift shared state to a common parent, or use context or an external store.",
  },
  "features/compiler": {
    prompt:
      "What is the clearest starting point for an array derived from props in a compiler-enabled app?",
    solution: "const filtered = skills.filter(skill => skill.includes(query))",
    explanation:
      "Keep rendering pure and write the ordinary calculation. Add manual memoization only for a measured need or required API contract.",
  },
  "guides/state-or-reducer": {
    prompt:
      "Which hook would you start with for one email field versus a checkout with dependent steps?",
    solution: "Email field: useState\nCheckout transitions: useReducer",
    explanation:
      "The deciding factor is related transition logic, not whether the component is called a form.",
  },
  "guides/state-or-ref": {
    prompt:
      "Where should a timer ID and a displayed elapsed-time counter live?",
    solution:
      "const timerRef = useRef(null)\nconst [seconds, setSeconds] = useState(0)",
    explanation:
      "A timer ID is a non-visual handle; displayed elapsed time needs state to trigger rendering.",
  },
  "guides/effects-or-events": {
    prompt:
      "Should sending an order follow rendering or a specific confirmation click?",
    solution: "function handleConfirm() {\n  submitOrder(checkout)\n}",
    explanation:
      "Sending an order is a user command. A synchronization effect can rerun it when dependencies or lifecycle change.",
  },
};
