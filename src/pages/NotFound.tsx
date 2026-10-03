import { Link } from "react-router-dom";
import PageLayout from "../components/page-layout.tsx";
import { BTN } from "../lib/styles.ts";

export default function NotFound() {
  return (
    <PageLayout title="Page not found | The Imperial Palace Rajkot" description="The page you are looking for could not be found.">
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-primary">Error 404</p>
        <h1 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">This page could not be found</h1>
        <p className="mt-4 text-muted-foreground">The page may have moved. Let us take you back to the palace.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className={BTN.gold}>Back to home</Link>
          <Link to="/stay" className={BTN.outline}>View rooms</Link>
        </div>
      </section>
    </PageLayout>
  );
}
