import type { ReactNode } from "react";
import Seo from "./seo.tsx";
import SiteHeader from "./site-header.tsx";
import SiteFooter from "./site-footer.tsx";
import FloatingActions from "./floating-actions.tsx";
import ThemeSwitcher from "./theme-switcher.tsx";

type Props = { title: string; description: string; children: ReactNode };

export default function PageLayout({ title, description, children }: Props) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[300] focus:bg-[#c9a84c] focus:px-4 focus:py-2 focus:text-[#0f1a30]">Skip to content</a>
      <Seo title={title} description={description} />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingActions />
      <ThemeSwitcher />
    </div>
  );
}
