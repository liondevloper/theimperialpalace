import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Inbox, MessageCircle, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "../../../lib/supabase.ts";
import type { Enquiry } from "./enquiries-panel.tsx";
import { STATUS_STYLE } from "./enquiries-panel.tsx";
import { formatDateTime } from "../_lib/enquiry-export.ts";

type Counts = { total: number; new: number; contacted: number; closed: number; week: number };

async function count(apply: (q: ReturnType<typeof base>) => ReturnType<typeof base>) {
  const { count: c } = await apply(base());
  return c ?? 0;
}
const base = () => supabase.from("enquiries").select("id", { count: "exact", head: true });

const NAVY_CARD = "from-[#1c2a4a] to-[#111c33] text-[#e8d5a3]";

export default function DashboardPanel({ go }: { go: (tab: string) => void }) {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recent, setRecent] = useState<Enquiry[]>([]);

  useEffect(() => {
    const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();
    const run = async () => {
      const [total, n, contacted, closed, week, latest] = await Promise.all([
        count((q) => q),
        count((q) => q.eq("status", "new")),
        count((q) => q.eq("status", "contacted")),
        count((q) => q.eq("status", "closed")),
        count((q) => q.gte("created_at", weekAgo)),
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(6),
      ]);
      setCounts({ total, new: n, contacted, closed, week });
      setRecent((latest.data as Enquiry[] | null) ?? []);
    };
    void run();
  }, []);

  const stats: { label: string; value: number | undefined; icon: LucideIcon; accent: string }[] = [
    { label: "New enquiries", value: counts?.new, icon: Inbox, accent: "from-[#b8933a] to-[#d9bc6a] text-[#0f1a30]" },
    { label: "Last 7 days", value: counts?.week, icon: MessageCircle, accent: NAVY_CARD },
    { label: "Contacted", value: counts?.contacted, icon: PhoneCall, accent: NAVY_CARD },
    { label: "Closed", value: counts?.closed, icon: CheckCircle2, accent: NAVY_CARD },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-10">
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a6a22]">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        <h2 className="mt-2 font-serif text-4xl font-light text-foreground">{greeting}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here is what is happening at The Imperial Palace.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <button key={label} type="button" onClick={() => go("enquiries")} className={`cursor-pointer bg-gradient-to-br p-5 text-left shadow-[0_20px_40px_-25px_rgba(15,26,48,0.5)] transition-transform hover:-translate-y-1 ${accent}`}>
            <Icon className="h-5 w-5 opacity-80" />
            <p className="mt-6 font-serif text-5xl font-light">{value ?? "–"}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] opacity-80">{label}</p>
          </button>
        ))}
      </div>

      <section className="border border-[#e6d9b8] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6d9b8] px-5 py-4">
          <h3 className="font-serif text-2xl text-foreground">Latest enquiries</h3>
          <button type="button" onClick={() => go("enquiries")} className="flex min-h-11 cursor-pointer items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-[#8a6a22]">View all <ArrowRight className="h-4 w-4" /></button>
        </div>
        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">{counts ? "No enquiries yet." : "Loading..."}</p>
        ) : (
          <ul className="divide-y divide-[#efe6d2]">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.kind} · {formatDateTime(r.created_at)}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${STATUS_STYLE[r.status] ?? "bg-muted"}`}>{r.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
