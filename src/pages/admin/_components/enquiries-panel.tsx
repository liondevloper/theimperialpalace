import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../../../lib/supabase.ts";
import { BTN, FIELD, LABEL } from "../../../lib/styles.ts";

type Enquiry = {
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
const LIMIT = 100;

export default function EnquiriesPanel() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [kind, setKind] = useState("all");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(LIMIT);
    if (kind !== "all") query = query.eq("kind", kind);
    const { data, error: err } = await query;
    if (err) setError("Could not load enquiries.");
    else { setError(""); setRows(data as Enquiry[]); }
  }, [kind]);

  useEffect(() => { void load(); }, [load]);

  const setStatus = async (id: string, status: string) => {
    const { error: err } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (err) setError("Could not update status.");
    else setRows((prev) => prev?.map((r) => (r.id === id ? { ...r, status } : r)) ?? null);
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    const { error: err } = await supabase.from("enquiries").delete().eq("id", id);
    if (err) setError("Could not delete.");
    else setRows((prev) => prev?.filter((r) => r.id !== id) ?? null);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-3xl font-light text-foreground">Enquiries</h2>
        <div className="grid gap-1.5">
          <label htmlFor="enq-kind" className={LABEL}>Type</label>
          <select id="enq-kind" value={kind} onChange={(e) => setKind(e.target.value)} className={`${FIELD} w-44`}>{KINDS.map((k) => <option key={k} value={k}>{k}</option>)}</select>
        </div>
      </div>
      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
      {rows === null ? <p className="text-sm text-muted-foreground">Loading...</p> : rows.length === 0 ? (
        <p className="border border-border p-8 text-center text-sm text-muted-foreground">No enquiries yet. New ones from the website will appear here.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="border border-border p-4 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#6f5318]">{r.kind} · {new Date(r.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                  <p className="mt-1 font-serif text-2xl text-foreground">{r.name}</p>
                  <p className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                    {r.email && <a href={`mailto:${r.email}`} className="break-all underline">{r.email}</a>}
                    {r.phone && <a href={`tel:${r.phone}`} className="underline">{r.phone}</a>}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select aria-label="Status" value={r.status} onChange={(e) => void setStatus(r.id, e.target.value)} className={`${FIELD} w-36`}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
                  <button type="button" onClick={() => void remove(r.id)} aria-label="Delete enquiry" className="flex h-11 w-11 cursor-pointer items-center justify-center text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {Object.entries(r.details).map(([k, v]) => (<div key={k}><dt className={LABEL}>{k}</dt><dd className="break-words text-foreground">{String(v)}</dd></div>))}
              </dl>
            </li>
          ))}
        </ul>
      )}
      {rows && rows.length === LIMIT && <p className="mt-4 text-xs text-muted-foreground">Showing the latest {LIMIT} enquiries.</p>}
      <button type="button" onClick={() => void load()} className={`${BTN.outline} mt-5`}>Refresh</button>
    </div>
  );
}
