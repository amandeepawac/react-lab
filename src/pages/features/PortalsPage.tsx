import LessonPage from "@/components/LessonPage";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function PortalDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="portal-title"
      className="fixed inset-0 m-auto w-[calc(100%-40px)] max-w-md rounded-lg border border-line bg-white p-6 text-ink backdrop:bg-black/40"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="portal-title" className="font-display text-xl font-semibold">
          Outside the root. Inside React.
        </h2>
        <button
          className="icon-button"
          title="Close dialog"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={17} />
        </button>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">
        This dialog is mounted under document.body, but still belongs to the
        same React tree. Native dialog behavior manages focus and Escape.
      </p>
      <button className="button mt-5" onClick={onClose}>
        Got it
      </button>
    </dialog>,
    document.body,
  );
}

export default function PortalsPage() {
  const [open, setOpen] = useState(false);
  return (
    <LessonPage
      title="Portals"
      summary="Change where UI lives in the DOM, without changing its React parent."
      what="createPortal renders children into a different DOM container while keeping context and React event bubbling intact."
      why="Useful for dialogs and overlays that must escape overflow clipping or stacking contexts in their parent layout."
      how="Call createPortal with JSX and a container. Implement accessibility separately; a portal alone is not a modal."
      scenario="Open a dialog mounted directly in document.body. This example uses the native dialog element for focus trapping and Escape handling."
      pitfall="Events bubble through the React tree, not the physical DOM tree. Portals do not provide focus management or scroll locking by themselves. The target container must already exist."
      docs="https://react.dev/reference/react-dom/createPortal"
      code={`function Modal({ children }) {\n  return createPortal(\n    <dialog ref={dialogRef}>{children}</dialog>,\n    document.body,\n  )\n}\n\n// Call dialogRef.current.showModal() in an effect\n// to use native modal focus and Escape behavior.`}
    >
      <div className="overflow-hidden border border-dashed border-line p-5">
        <p className="mb-4 text-sm text-muted">
          This container clips overflow. The dialog escapes it through a portal.
        </p>
        <button className="button" onClick={() => setOpen(true)}>
          Open dialog
        </button>
      </div>
      {open && <PortalDialog onClose={() => setOpen(false)} />}
    </LessonPage>
  );
}
