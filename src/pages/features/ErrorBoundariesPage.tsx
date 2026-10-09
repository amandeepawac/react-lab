import ErrorBoundary from "@/components/ErrorBoundary";
import LessonPage from "@/components/LessonPage";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

function FragileWidget({ fail }: { fail: boolean }) {
  if (fail) throw new Error("A deliberate render error from the demo widget.");
  return (
    <p className="border-l-2 border-accent bg-[#f1f8f3] p-4 text-sm text-accent">
      The widget is rendering normally.
    </p>
  );
}

export default function ErrorBoundariesPage() {
  const [fail, setFail] = useState(false);
  return (
    <LessonPage
      title="Error boundaries"
      summary="Contain a rendering failure so the rest of the page can keep working."
      what="A component boundary that catches errors during rendering in its descendants and renders a fallback."
      why="Isolates failures in a widget, route, or data panel instead of losing the entire application."
      how="Use a class component with getDerivedStateFromError to switch to a fallback. componentDidCatch can report errors to monitoring."
      scenario="Trigger a deliberate widget error. Only the widget is replaced; this lesson and navigation remain usable. Try again resets the cause and the boundary."
      pitfall="Boundaries don't catch ordinary event-handler errors, arbitrary async callbacks, server rendering errors, or errors inside themselves. Catch request failures in their owning action. The deliberate error may also appear in the development console."
      docs="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
      code={`class ErrorBoundary extends Component {\n  state = { error: null }\n  static getDerivedStateFromError(error) {\n    return { error }\n  }\n  render() {\n    if (this.state.error) return <p>Something went wrong.</p>\n    return this.props.children\n  }\n}\n\n<ErrorBoundary><FragileWidget /></ErrorBoundary>`}
    >
      <button
        className="button-secondary mb-5"
        onClick={() => setFail(true)}
        disabled={fail}
      >
        <TriangleAlert size={15} />
        Trigger render error
      </button>
      <ErrorBoundary onReset={() => setFail(false)}>
        <FragileWidget fail={fail} />
      </ErrorBoundary>
    </LessonPage>
  );
}
