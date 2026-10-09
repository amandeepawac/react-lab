import { lessons } from "@/data/lessons";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  CircleDot,
  Code2,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function HomePage() {
  const [category, setCategory] = useState("All lessons");
  const [query, setQuery] = useState("");
  const visible = lessons.filter(
    (lesson) =>
      (category === "All lessons" ||
        (category === "Hooks"
          ? lesson.group !== "React features"
          : lesson.group === "React features")) &&
      `${lesson.title} ${lesson.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <>
      <section className="overview-intro relative border-b border-line pb-9">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow">
            <span className="size-1.5 rounded-full bg-accent" />
            THE REACT 19 FIELD GUIDE
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            React, one concept
            <br />
            at a <span className="text-accent">time.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Understand the what. Discover the why. Try the how.
            <br className="hidden sm:block" /> A hands-on collection of hooks
            and modern React features.
          </p>
          <Link to="/hooks/use-state" className="button mt-6 inline-flex">
            Start with useState
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="react-art hidden xl:flex" aria-hidden="true">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt=""
          />
          <span className="art-tag">
            <Code2 size={14} /> build. understand. repeat.
          </span>
        </div>
      </section>
      <section
        aria-label="Collection highlights"
        className="grid grid-cols-1 divide-y divide-line border-b border-line py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {[
          {
            icon: Braces,
            value: `${lessons.filter((lesson) => lesson.group !== "React features").length} hooks`,
            label: "Every built-in hook, explained",
            color: "text-accent",
          },
          {
            icon: Layers,
            value: `${lessons.filter((lesson) => lesson.group === "React features").length} features`,
            label: "Modern React, beyond hooks",
            color: "text-blue-600",
          },
          {
            icon: CircleDot,
            value: "Learn by doing",
            label: "Live examples in every lesson",
            color: "text-orange-600",
          },
        ].map(({ icon: Icon, value, label, color }) => (
          <div
            key={value}
            className="flex items-center gap-3 py-5 sm:px-5 first:pl-0"
          >
            <span className={`stat-icon ${color}`}>
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold">{value}</p>
              <p className="mt-1 text-xs text-muted">{label}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="mt-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-muted">THE COLLECTION</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Find your next aha.
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Sparkles size={14} className="text-accent" />
            React Compiler ready
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-line">
          <div
            role="tablist"
            aria-label="Lesson category"
            className="flex gap-5"
          >
            {["All lessons", "Hooks", "Features"].map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={category === tab}
                onClick={() => setCategory(tab)}
                className={`category-tab ${category === tab ? "category-active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 pb-3 text-muted">
            <Search size={15} />
            <input
              aria-label="Filter collection"
              className="w-40 bg-transparent text-xs outline-none focus:underline"
              placeholder="Search the collection"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((lesson) => (
            <Link
              to={`/${lesson.slug}`}
              key={lesson.slug}
              className="lesson-card group"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`lesson-symbol ${lesson.group === "React features" ? "feature-symbol" : ""}`}
                >
                  {lesson.group === "React features" ? (
                    <Layers size={18} />
                  ) : (
                    <Braces size={18} />
                  )}
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
                {lesson.group}
              </p>
              <h3 className="mt-1 font-mono text-lg font-semibold">
                {lesson.title}
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {lesson.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted">
                <span className="size-1 rounded-full bg-accent" />
                Explanation + live example
              </div>
            </Link>
          ))}
        </div>
        {visible.length === 0 && (
          <p role="status" className="py-12 text-center text-sm text-muted">
            No matching lessons. Try another search.
          </p>
        )}
      </section>
      <section className="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6">
        <div>
          <h2 className="font-display text-base font-semibold">
            Less memorizing. More understanding.
          </h2>
          <p className="mt-1 text-xs text-muted">
            Each lesson stands on its own. Follow your curiosity.
          </p>
        </div>
        <a
          href="https://react.dev/learn"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-accent"
        >
          Explore React docs
          <ArrowUpRight size={15} />
        </a>
      </section>
    </>
  );
}
