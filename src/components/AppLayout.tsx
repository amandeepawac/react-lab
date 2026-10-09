import { groups, lessons } from "@/data/lessons";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

export default function AppLayout() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const current = lessons.find(
    (lesson) => `/${lesson.slug}` === location.pathname,
  );
  const filtered = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      {menuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-7"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">
            <Code2 size={22} />
          </span>
          <span className="font-display text-xl font-bold tracking-normal">
            react<span className="text-muted font-normal">/</span>lab
            <span className="text-accent">.</span>
          </span>
        </Link>
        <div className="px-5">
          <label className="search-box">
            <Search size={16} className="shrink-0 text-muted" />
            <input
              aria-label="Search lessons"
              placeholder="Find a lesson..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <nav
          aria-label="Main navigation"
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5"
        >
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `nav-link mb-6 ${isActive ? "nav-active" : ""}`
            }
          >
            <BookOpen size={17} /> Overview{" "}
            <span className="ml-auto text-xs">{lessons.length}</span>
          </NavLink>
          {groups.map((group) => {
            const items = filtered.filter((lesson) => lesson.group === group);
            return (
              items.length > 0 && (
                <div key={group} className="mb-6">
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    {group}
                  </p>
                  {items.map((lesson) => (
                    <NavLink
                      key={lesson.slug}
                      to={`/${lesson.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "nav-active" : ""}`
                      }
                    >
                      <span className="nav-dot" />
                      {lesson.title}
                    </NavLink>
                  ))}
                </div>
              )
            );
          })}
          {filtered.length === 0 && (
            <p className="px-3 text-sm text-muted">No lessons found.</p>
          )}
        </nav>
        <div className="sidebar-footer">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            React 19.2
          </span>
          <span className="flex items-center gap-1">
            <Check size={13} />
            Compiler on
          </span>
        </div>
      </aside>
      <div className="lg:ml-[256px]">
        <header className="topbar">
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <button
              className="icon-button lg:hidden"
              title={menuOpen ? "Close menu" : "Open menu"}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <span className="text-muted hidden sm:block">
              Your React field guide
            </span>
            <ChevronRight size={14} className="text-muted hidden sm:block" />
            <span className="truncate font-medium">
              {current?.title ?? "Overview"}
            </span>
          </div>
          <a
            className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink"
            href="https://react.dev/reference/react"
            target="_blank"
            rel="noreferrer"
          >
            React docs <ArrowUpRight size={14} />
          </a>
        </header>
        <main
          key={location.pathname}
          id="main-content"
          className="page-enter mx-auto max-w-[1200px] px-5 py-8 sm:px-10 sm:py-10 xl:px-14"
        >
          <Outlet />
        </main>
        <footer className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-2 px-5 py-8 text-xs text-muted sm:px-10 xl:px-14">
          <span>Small experiments. Deeper understanding.</span>
          <span>Built with React 19 + TypeScript</span>
        </footer>
      </div>
    </div>
  );
}
