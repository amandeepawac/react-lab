import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold">
        That lesson isn't here.
      </h1>
      <Link to="/" className="button mt-6 inline-flex">
        Back to the collection
      </Link>
    </section>
  );
}
