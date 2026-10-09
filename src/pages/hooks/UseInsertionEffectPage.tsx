import LessonPage from "@/components/LessonPage";
import { useInsertionEffect, useState } from "react";

export default function UseInsertionEffectPage() {
  const [color, setColor] = useState("#218365");
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.insertion-example { border-color: ${color}; color: ${color}; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [color]);

  return (
    <LessonPage
      title="useInsertionEffect"
      summary="A specialized hook for CSS-in-JS library authors, not everyday application styling."
      what="Inserts styles before layout effects read the DOM, so measurements use the intended CSS."
      why="CSS-in-JS libraries need predictable style insertion before layout calculations. Most apps should use Tailwind or static styles instead."
      how="Insert a stylesheet inside the hook and remove it during cleanup. Do not read layout, refs, or update state here."
      scenario="This miniature style injector updates the preview's border and text. It demonstrates the timing a CSS-in-JS library needs."
      pitfall="You already have Tailwind in this app, so you do not need this hook for normal styling. DOM update timing is not guaranteed inside it, refs are not ready, and it only runs on the client."
      code={`useInsertionEffect(() => {\n  const style = document.createElement('style')\n  style.textContent = '.preview { color: ' + color + '; }'\n  document.head.appendChild(style)\n  return () => style.remove()\n}, [color])`}
    >
      <label className="demo-label flex items-center gap-3">
        Injected color
        <input
          aria-label="Injected color"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-line"
        />
      </label>
      <div className="insertion-example mt-5 border-2 p-5 text-sm font-semibold">
        Styled before layout effects run.
      </div>
    </LessonPage>
  );
}
