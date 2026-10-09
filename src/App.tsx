import AppLayout from "@/components/AppLayout";
import { lessons } from "@/data/lessons";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          {lessons.map(({ slug, component: Page }) => (
            <Route
              key={slug}
              path={slug}
              element={
                <Suspense
                  fallback={
                    <div className="py-16 text-muted" role="status">
                      Loading lesson...
                    </div>
                  }
                >
                  <Page />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
