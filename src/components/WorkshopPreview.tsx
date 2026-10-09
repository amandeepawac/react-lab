import { Check } from "lucide-react";

export default function WorkshopPreview() {
  return (
    <div className="border-l-2 border-accent bg-accent-soft p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-accent">
        <Check size={16} />
        Workshop module loaded
      </p>
      <p className="mt-2 text-sm text-muted">
        This component lives in its own file and is loaded only when requested.
      </p>
    </div>
  );
}
