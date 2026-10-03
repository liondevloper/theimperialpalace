import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, FileText, Mail, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { supabase } from "../../../lib/supabase.ts";
import { BTN, FIELD, LABEL } from "../../../lib/styles.ts";
import { exportCsv, exportEnquiryPdf, exportPdf, formatDateTime, formatValue, label } from "../_lib/enquiry-export.ts";

export type Enquiry = {
  id: string;
  kind: string;
  name: string;
  email: string | null;
  phone: string | null;
  details: Record<string, unknown>;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "closed"];
const KINDS = ["all", "booking", "wedding", "event", "contact", "dining", "wellness"];
const LIMIT = 200;
// New enquiries show up on their own: the list re-checks every few seconds.
export const REFRESH_MS = 10_000;

export const STATUS_STYLE: Record<string, string> = {
  new: "bg-amber-100 text-amber-900",
  contacted: "bg-sky-100 text-sky-900",
  closed: "bg-emerald-100 text-emerald-900",
};

const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "91")}`;

/** Start of the viewer's current day as an instant, so "today" follows local (Indian) time. */
const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

// `onlyKind` turns this into a dedicated tab, for example "career" shows only job applications.
export default function EnquiriesPanel({ onlyKind, title = "Enquiries" }: { onlyKind?: string; title?: string }) {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [kind, setKind] = useState("all");
  const [status, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Which PDF is being prepared: "all" for the report, or an enquiry id.
  const [pdfBusy, setPdfBusy] = useState<string | null>(null);

  // Without a search we show only today's enquiries; typing a search looks through all of them.
  const searching = query.trim() !== "";
  const activeKind = onlyKind ?? kind;

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(LIMIT);
    if (!searching) q = q.gte("created_at", startOfToday());
    if (onlyKind) q = q.eq("kind", onlyKind);
    else if (kind !== "all") q = q.eq("kind", kind);
    else q = q.neq("kind", "career");
    if (status !== "all") q = q.eq("status", status);
    const { data, error: err } = await q;
    setLoading(false);
    if (err) setError("Could not load enquiries.");
    else { setError(""); setRows(data as Enquiry[]); }
  }, [kind, status, searching, onlyKind]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!rows || !s) return rows;
    return rows.filter((r) => [r.name, r.email, r.phone, JSON.stringify(r.details)].some((v) => (v ?? "").toLowerCase().includes(s)));
  }, [rows, query]);

  const setStatus = async (id: string, next: string) => {
    const { error: err } = await supabase.from("enquiries").update({ status: next }).eq("id", id);
    if (err) setError("Could not update status.");
    else setRows((prev) => prev?.map((r) => (r.id === id ? { ...r, status: next } : r)) ?? null);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    const { error: err } = await supabase.from("enquiries").delete().eq("id", id);
    if (err) setError("Could not delete.");
    else setRows((prev) => prev?.filter((r) => r.id !== id) ?? null);
  };

  const makePdf = async (key: string, task: () => Promise<void>) => {
    setPdfBusy(key);
    try {
      await task();
    } catch {
      setError("Could not create the PDF. Please try again.");
    } finally {
      setPdfBusy(null);
    }
  };

  const filterText = [`Type: ${label(activeKind)}`, `Status: ${label(status)}`, searching ? `Search: "${query.trim()}"` : "Date: Today"].filter(Boolean).join(" | ");
  const contactBtn = "inline-flex min-h-9 items-center gap-1.5 border border-[#e6d9b8] px-3 text-xs text-foreground transition-colors hover:border-[#c9a84c] hover:bg-[#faf6ec]";

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-serif text-3xl font-light text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {searching ? "Showing search results from all records." : "Showing today's records. Use search to find older ones."} Updates automatically. Times are in Indian time (IST).
        </p>
      </div>

      {/* Refresh on the left, PDF in the centre, Excel on the right. */}
      <div className="mb-6 grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
        <button type="button" onClick={() => void load()} className={`${BTN.outline} px-4 sm:justify-self-start`}><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />Refresh</button>
        <button type="button" disabled={!filtered?.length || pdfBusy !== null} onClick={() => filtered && void makePdf("all", () => exportPdf(filtered, filterText))} className={`${BTN.gold} px-4 disabled:opacity-50 sm:justify-self-center`}>
          <FileText className="h-4 w-4" />{pdfBusy === "all" ? "Preparing PDF..." : "Download PDF"}
        </button>
        <button type="button" disabled={!filtered?.length} onClick={() => filtered && exportCsv(filtered)} className={`${BTN.outline} px-4 disabled:opacity-50 sm:justify-self-end`}><Download className="h-4 w-4" />Download Excel</button>
      </div>

      <div className={`mb-5 grid gap-3 border border-[#e6d9b8] bg-white p-4 ${onlyKind ? "sm:grid-cols-[1fr_auto]" : "sm:grid-cols-[1fr_auto_auto]"}`}>
        <div className="relative grid gap-1.5">
          <label htmlFor="enq-search" className={LABEL}>Search</label>
          <Search className="pointer-events-none absolute bottom-3.5 left-3 h-4 w-4 text-muted-foreground" />
          <input id="enq-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, phone, email..." className={`${FIELD} pl-9`} />
        </div>
        {!onlyKind && (
          <div className="grid gap-1.5">
            <label htmlFor="enq-kind" className={LABEL}>Type</label>
            <select id="enq-kind" value={kind} onChange={(e) => setKind(e.target.value)} className={`${FIELD} sm:w-40`}>{KINDS.map((k) => <option key={k} value={k}>{label(k)}</option>)}</select>
          </div>
        )}
        <div className="grid gap-1.5">
          <label htmlFor="enq-status" className={LABEL}>Status</label>
          <select id="enq-status" value={status} onChange={(e) => setStatusFilter(e.target.value)} className={`${FIELD} sm:w-40`}>{["all", ...STATUSES].map((s) => <option key={s} value={s}>{label(s)}</option>)}</select>
        </div>
      </div>

      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
      {filtered === null ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse bg-[#efe6d2]" />)}</div>
      ) : filtered.length === 0 ? (
        <p className="border border-dashed border-[#e6d9b8] bg-white p-10 text-center text-sm text-muted-foreground">{searching ? "Nothing matches your search." : "Nothing today yet. New ones from the website will appear here."}</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((r) => {
            const whatsapp = typeof r.details.whatsapp === "string" && r.details.whatsapp ? r.details.whatsapp : r.phone;
            return (
              <li key={r.id} className={`border-l-4 bg-white p-4 shadow-sm md:p-5 ${r.status === "new" ? "border-l-[#c9a84c]" : "border-l-transparent"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6f5318]">
                      <span className="bg-[#1a140c] px-2 py-0.5 text-[#e8d5a3]">{r.kind}</span>
                      <span className={`px-2 py-0.5 ${STATUS_STYLE[r.status] ?? "bg-muted"}`}>{r.status}</span>
                      {formatDateTime(r.created_at)}
                    </p>
                    <p className="mt-2 font-serif text-2xl text-foreground">{r.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {r.phone && <a href={`tel:${r.phone}`} className={contactBtn}><Phone className="h-3.5 w-3.5" />{r.phone}</a>}
                      {whatsapp && <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" className={`${contactBtn} text-[#128C7E]`}><WhatsappLogo weight="fill" className="h-4 w-4" />WhatsApp</a>}
                      {r.email && <a href={`mailto:${r.email}`} className={`${contactBtn} break-all`}><Mail className="h-3.5 w-3.5" />{r.email}</a>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select aria-label="Status" value={r.status} onChange={(e) => void setStatus(r.id, e.target.value)} className={`${FIELD} w-36`}>{STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select>
                    <button type="button" disabled={pdfBusy !== null} onClick={() => void makePdf(r.id, () => exportEnquiryPdf(r))} aria-label="Download this enquiry as PDF" title="Download PDF" className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#8a6a22] disabled:opacity-50">
                      <FileText className={`h-4 w-4 ${pdfBusy === r.id ? "animate-pulse" : ""}`} />
                    </button>
                    <button type="button" onClick={() => void remove(r.id)} aria-label="Delete enquiry" className="flex h-11 w-11 cursor-pointer items-center justify-center text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                {Object.keys(r.details).length > 0 && (
                  <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-[#efe6d2] pt-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(r.details).map(([k, v]) => (<div key={k} className={k === "message" ? "sm:col-span-2 lg:col-span-3" : ""}><dt className={LABEL}>{label(k)}</dt><dd className="break-words text-foreground">{formatValue(v)}</dd></div>))}
                  </dl>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {rows && rows.length === LIMIT && <p className="mt-4 text-xs text-muted-foreground">Showing the latest {LIMIT} records.</p>}
    </div>
  );
}
