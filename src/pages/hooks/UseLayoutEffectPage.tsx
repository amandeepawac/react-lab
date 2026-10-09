import LessonPage from "@/components/LessonPage";
import { useLayoutEffect, useRef, useState } from "react";

function MeasuredTooltip() {
  const tooltipRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    const width = tooltip.getBoundingClientRect().width;
    tooltip.style.left = `${-width / 2}px`;
    tooltip.style.visibility = "visible";
  }, []);
  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      id="layout-tooltip"
      style={{ visibility: "hidden" }}
      className="absolute bottom-full mb-3 w-48 rounded-md bg-ink px-3 py-2 text-center text-xs text-white"
    >
      Measured and centered before the browser paints.
    </div>
  );
}

export default function UseLayoutEffectPage() {
  const [visible, setVisible] = useState(false);
  return (
    <LessonPage
      title="useLayoutEffect"
      summary="Measure and adjust the DOM before the user sees a frame."
      what="Runs after DOM updates but before the browser paints. It blocks painting until the work completes."
      why="Prevents visible jumps when tooltips, popovers, or other layout-sensitive UI need a DOM measurement."
      how="Attach a ref, measure its node in a layout effect, then apply a small layout correction. Prefer ordinary effects otherwise."
      scenario="Toggle this tooltip. Its measured width determines the horizontal offset before the first visible frame."
      pitfall="Layout effects block rendering and do not run during server rendering. Keep them small. This isolated tooltip adjusts its own style; do not overwrite DOM properties that React is managing."
      code={`const tooltipRef = useRef(null)\n\nuseLayoutEffect(() => {\n  const node = tooltipRef.current\n  const width = node.getBoundingClientRect().width\n  node.style.left = (-width / 2) + 'px'\n  node.style.visibility = 'visible'\n}, [])`}
    >
      <div className="flex min-h-40 items-end justify-center pb-3">
        <div className="relative">
          <div className="absolute left-1/2 top-0">
            {visible && <MeasuredTooltip />}
          </div>
          <button
            className="button"
            aria-expanded={visible}
            aria-describedby={visible ? "layout-tooltip" : undefined}
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide tooltip" : "Show tooltip"}
          </button>
        </div>
      </div>
    </LessonPage>
  );
}
