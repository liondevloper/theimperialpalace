import type { ReactNode } from "react";
import PageHeader from "./page-header.tsx";
import Footer from "../pages/home/_components/footer.tsx";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <PageHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
