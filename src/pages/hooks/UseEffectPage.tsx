import LessonPage from "@/components/LessonPage";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function UseEffectPage() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(
      () => setSeconds((previous) => previous + 1),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <LessonPage
      title="useEffect"
      summary="Keep your component synchronized with something outside React."
      what="Runs a setup after a commit and cleans it up before a changed dependency reruns it or the component unmounts."
      why="Connects React to timers, browser events, network connections, and other external systems."
      how="Declare an effect with all reactive dependencies. Return a cleanup that undoes its setup."
      scenario="A session timer subscribes to the browser clock only while running. Pause it or leave this page to clean up the interval."
      pitfall="Do not use effects to calculate values you can derive during rendering. In Strict Mode, React intentionally runs an extra setup/cleanup cycle in development."
      code={`useEffect(() => {\n  if (!running) return\n  const interval = setInterval(() => {\n    setSeconds(previous => previous + 1)\n  }, 1000)\n  return () => clearInterval(interval)\n}, [running])`}
    >
      <div className="flex flex-wrap items-center gap-5">
        <output className="font-mono text-4xl tabular-nums">
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </output>
        <button className="button" onClick={() => setRunning(!running)}>
          {running ? <Pause size={15} /> : <Play size={15} />}
          {running ? "Pause" : "Start timer"}
        </button>
        <button
          className="icon-button"
          aria-label="Reset timer"
          title="Reset timer"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          <RotateCcw size={16} />
        </button>
        <span className="text-xs text-muted">
          {running ? "Interval connected" : "Interval disconnected"}
        </span>
      </div>
    </LessonPage>
  );
}
