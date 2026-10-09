import { LoaderCircle, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ label = "Submit" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="button" disabled={pending}>
      {pending ? (
        <LoaderCircle size={15} className="animate-spin" />
      ) : (
        <Send size={15} />
      )}
      {pending ? "Submitting..." : label}
    </button>
  );
}
