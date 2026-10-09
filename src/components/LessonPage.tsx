import { lessons } from "@/data/lessons";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

type Props = {
  title: string;
  summary: string;
  what: string;
  why: string;
  how: string;
  scenario: string;
  code: string;
  children: ReactNode;
  pitfall: string;
  docs?: string;
};

export default function LessonPage({
  title,
  summary,
  what,
  why,
  how,
  scenario,
  code,
  children,
  pitfall,
  docs,
}: Props) {
  const { pathname } = useLocation();
  const index = lessons.findIndex((lesson) => `/${lesson.slug}` === pathname);
  const lesson = lessons[index];
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <article>
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink"
      >
        <ArrowLeft size={14} />
        All lessons
      </Link>
      <p className="eyebrow">
        {lesson?.group}{" "}
        <span className="text-muted">
          / Lesson {String(index + 1).padStart(2, "0")}
        </span>
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{summary}</p>
      <div className="mt-9 grid gap-6 border-y border-line py-7 md:grid-cols-3">
        {[
          ["01", "What it does", what],
          ["02", "Why it matters", why],
          ["03", "How to use it", how],
        ].map(([number, heading, text]) => (
          <section key={number}>
            <p className="mb-3 text-xs font-mono text-accent">{number}</p>
            <h2 className="mb-2 font-display text-base font-semibold">
              {heading}
            </h2>
            <p className="text-sm leading-6 text-muted">{text}</p>
          </section>
        ))}
      </div>
      <section className="mt-9">
        <div className="mb-4 flex items-center gap-2">
          <FlaskConical size={18} className="text-accent" />
          <h2 className="font-display text-lg font-semibold">In the lab</h2>
          <span className="badge ml-auto">Interactive example</span>
        </div>
        <p className="mb-5 text-sm leading-6 text-muted">{scenario}</p>
        <div className="demo-panel">{children}</div>
      </section>
      <section className="mt-7 overflow-hidden rounded-lg border border-line bg-code">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-white/60">
          <span className="font-mono">{title}.tsx</span>
          <button
            className="flex items-center gap-2 hover:text-white"
            onClick={copyCode}
            aria-label="Copy example code"
            title="Copy example code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-[#c8e9d7]">
          <code>{code}</code>
        </pre>
        {copyError && (
          <p role="alert" className="px-5 pb-3 text-sm text-white">
            Clipboard unavailable. Select the code to copy it.
          </p>
        )}
      </section>
      <aside className="mt-6 flex items-start gap-3 border-l-2 border-amber-500 bg-amber-50 px-5 py-4">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-amber-700" />
        <div>
          <h2 className="text-sm font-semibold">Keep in mind</h2>
          <p className="mt-1 text-sm leading-6 text-muted">{pitfall}</p>
        </div>
      </aside>
      <a
        href={docs ?? `https://react.dev/reference/react/${title}`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        Read the official reference
        <ExternalLink size={14} />
      </a>
      <nav
        aria-label="Lesson navigation"
        className="mt-10 flex justify-between gap-4 border-t border-line pt-6"
      >
        {index > 0 ? (
          <Link
            className="lesson-pagination"
            to={`/${lessons[index - 1].slug}`}
          >
            <ArrowLeft size={16} />
            <span>
              <small>Previous</small>
              {lessons[index - 1].title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {index < lessons.length - 1 && (
          <Link
            className="lesson-pagination text-right"
            to={`/${lessons[index + 1].slug}`}
          >
            <span>
              <small>Next lesson</small>
              {lessons[index + 1].title}
            </span>
            <ArrowRight size={16} />
          </Link>
        )}
      </nav>
    </article>
  );
}
