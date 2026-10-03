import { useId, useState } from "react";
import { ArrowDown, ArrowUp, Copy, ExternalLink, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import { getContent, resetContent, saveContent } from "../../../lib/content.ts";
import type { Row } from "../../../lib/content.ts";
import { BTN, FIELD, LABEL } from "../../../lib/styles.ts";
import type { AdminField, SectionDef } from "../_lib/schema.ts";
import ImageField from "./image-field.tsx";
import ImagesField from "./images-field.tsx";

const str = (value: unknown) => (typeof value === "string" ? value : "");
const list = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);
const isList = (f: AdminField) => f.type === "lines" || f.type === "images";

function cleanRow(fields: AdminField[], row: Row): Row {
  const out: Row = { ...row };
  for (const f of fields) {
    const v = row[f.name];
    if (isList(f)) out[f.name] = list(v).map((x) => x.trim()).filter(Boolean);
    else if (f.type === "optionalText") out[f.name] = str(v).trim() || null;
    else if (f.type === "text" || f.type === "textarea" || f.type === "image") out[f.name] = str(v).trim();
  }
  return out;
}

function isMissing(f: AdminField, row: Row) {
  if (!f.required) return false;
  const v = row[f.name];
  return isList(f) ? list(v).length === 0 : !str(v);
}

type InputProps = { field: AdminField; id: string; value: unknown; onChange: (value: unknown) => void };

function FieldInput({ field, id, value, onChange }: InputProps) {
  switch (field.type) {
    case "textarea":
      return <textarea id={id} rows={3} value={str(value)} onChange={(e) => onChange(e.target.value)} className={`${FIELD} h-auto py-2`} />;
    case "lines":
      return <textarea id={id} rows={4} value={list(value).join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} className={`${FIELD} h-auto py-2`} />;
    case "image":
      return <ImageField id={id} value={str(value)} onChange={onChange} />;
    case "images":
      return <ImagesField id={id} value={list(value)} onChange={onChange} />;
    case "checkbox":
      return (
        <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3">
          <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#c9a84c]" />
          <span className="text-sm text-foreground">{value === true ? "Yes" : "No"}</span>
        </label>
      );
    case "select":
      return <select id={id} value={str(value)} onChange={(e) => onChange(e.target.value)} className={FIELD}>{field.options?.map((o) => <option key={o}>{o}</option>)}</select>;
    default:
      return <input id={id} value={str(value)} onChange={(e) => onChange(e.target.value)} className={FIELD} />;
  }
}

// Small thumbnail for list rows, taken from the first image-like field.
function thumbOf(def: SectionDef, row: Row): string {
  const f = def.fields.find((x) => x.type === "image" || x.type === "images");
  if (!f) return "";
  return f.type === "images" ? (list(row[f.name])[0] ?? "") : str(row[f.name]);
}

export default function ContentEditor({ def }: { def: SectionDef }) {
  const uid = useId();
  const [data, setData] = useState<Row[] | Row>(() => getContent(def.key));
  const [open, setOpen] = useState<number | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState("");

  const items = Array.isArray(data) ? data : [];
  const update = (next: Row[] | Row) => { setData(next); setStatus(null); setDirty(true); };
  const setField = (index: number, name: string, value: unknown) => {
    if (Array.isArray(data)) update(data.map((r, i) => (i === index ? { ...r, [name]: value } : r)));
    else update({ ...data, [name]: value });
  };
  const move = (index: number, dir: number) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    update(next);
    setOpen(target);
  };
  const duplicate = (index: number) => {
    const copy = structuredClone(items[index]);
    copy[def.titleField] = `${str(copy[def.titleField])} (copy)`;
    if ("slug" in copy) copy.slug = "";
    if ("id" in copy) copy.id = "";
    const next = [...items.slice(0, index + 1), copy, ...items.slice(index + 1)];
    update(next);
    setOpen(index + 1);
  };

  const save = async () => {
    const rows = Array.isArray(data) ? data.map((r) => cleanRow(def.fields, r)) : cleanRow(def.fields, data);
    const all = Array.isArray(rows) ? rows : [rows];
    const bad = all.findIndex((r) => def.fields.some((f) => isMissing(f, r)));
    if (Array.isArray(rows) && rows.length === 0) return setStatus({ ok: false, text: `Keep at least one ${def.noun}.` });
    if (bad >= 0) {
      setOpen(bad);
      setQuery("");
      return setStatus({ ok: false, text: `Please fill every required field${Array.isArray(rows) ? ` (check ${def.noun} ${bad + 1})` : ""}.` });
    }
    setBusy(true);
    const error = await saveContent(def.key, rows);
    setBusy(false);
    if (!error) { setData(getContent(def.key)); setDirty(false); }
    setStatus(error ? { ok: false, text: error } : { ok: true, text: "Saved. The live website now shows these changes." });
  };

  const reset = async () => {
    if (!window.confirm("Restore the original content for this section? Your edits will be removed.")) return;
    setBusy(true);
    const error = await resetContent(def.key);
    setBusy(false);
    if (!error) { setData(getContent(def.key)); setDirty(false); }
    setStatus(error ? { ok: false, text: error } : { ok: true, text: "Original content restored." });
  };

  const renderFields = (row: Row, index: number) => (
    <div className="grid gap-5 sm:grid-cols-2">
      {def.fields.map((f) => {
        const id = `${uid}-${index}-${f.name}`;
        const wide = f.type === "textarea" || isList(f) || f.type === "image";
        return (
          <div key={f.name} className={`grid min-w-0 content-start gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
            <label htmlFor={id} className={LABEL}>{f.label}{f.required ? " *" : ""}</label>
            <FieldInput field={f} id={id} value={row[f.name]} onChange={(v) => setField(index, f.name, v)} />
            {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
          </div>
        );
      })}
    </div>
  );

  const q = query.trim().toLowerCase();
  const visible = items.map((row, index) => ({ row, index })).filter(({ row }) => !q || str(row[def.titleField]).toLowerCase().includes(q));
  const iconBtn = "flex h-11 w-11 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30";

  return (
    <div>
      <div className="sticky top-0 z-[5] -mx-5 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#e6d9b8] bg-[#faf6ec]/95 px-5 py-4 backdrop-blur lg:top-0">
        <div className="min-w-0">
          <h2 className="font-serif text-3xl font-light text-foreground">{def.label}</h2>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${dirty ? "bg-amber-500" : "bg-emerald-500"}`} />
            {dirty ? "Unsaved changes" : "All changes saved"}
            {Array.isArray(data) && <span>· {items.length} {def.noun}{items.length === 1 ? "" : "s"}</span>}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {def.page && <a href={def.page} target="_blank" rel="noopener noreferrer" className={`${BTN.outline} px-4`}><ExternalLink className="h-4 w-4" />View page</a>}
          <button type="button" disabled={busy} onClick={() => void reset()} className={`${BTN.outline} px-4`}><RotateCcw className="h-4 w-4" />Restore</button>
          <button type="button" disabled={busy || !dirty} onClick={() => void save()} className={`${BTN.gold} disabled:opacity-50`}>{busy ? "Saving..." : "Save & publish"}</button>
        </div>
      </div>
      {status && <p role="status" className={`mb-4 border px-4 py-3 text-sm ${status.ok ? "border-emerald-600/40 bg-emerald-50 text-emerald-900" : "border-destructive bg-red-50 text-destructive"}`}>{status.text}</p>}

      {!Array.isArray(data) ? (
        <div className="border border-[#e6d9b8] bg-white p-5 md:p-7">{renderFields(data, 0)}</div>
      ) : (
        <>
          {items.length > 5 && (
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input aria-label={`Search ${def.label}`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${def.label.toLowerCase()}...`} className={`${FIELD} pl-9`} />
            </div>
          )}
          <ul className="space-y-3">
            {visible.map(({ row, index }) => {
              const thumb = thumbOf(def, row);
              return (
                <li key={index} className={`border bg-white transition-shadow ${open === index ? "border-[#c9a84c] shadow-[0_20px_50px_-30px_rgba(90,70,30,0.5)]" : "border-[#e6d9b8]"}`}>
                  <div className="flex items-center gap-2 p-2 pl-3">
                    {thumb ? <img src={thumb} alt="" className="h-12 w-16 shrink-0 object-cover" /> : <span className="h-12 w-16 shrink-0 bg-muted" />}
                    <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} className="min-h-11 min-w-0 flex-1 cursor-pointer truncate text-left font-serif text-xl text-foreground">{str(row[def.titleField]) || `Untitled ${def.noun}`}</button>
                    <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || !!q} aria-label="Move up" className={iconBtn}><ArrowUp className="h-4 w-4" /></button>
                    <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1 || !!q} aria-label="Move down" className={iconBtn}><ArrowDown className="h-4 w-4" /></button>
                    <button type="button" onClick={() => duplicate(index)} aria-label="Duplicate" className={`${iconBtn} hidden sm:flex`}><Copy className="h-4 w-4" /></button>
                    <button type="button" aria-label={`Delete ${str(row[def.titleField])}`} onClick={() => { if (window.confirm(`Delete this ${def.noun}?`)) { update(items.filter((_, i) => i !== index)); setOpen(null); } }} className={`${iconBtn} text-destructive`}><Trash2 className="h-4 w-4" /></button>
                  </div>
                  {open === index && <div className="border-t border-[#e6d9b8] p-4 md:p-6">{renderFields(row, index)}</div>}
                </li>
              );
            })}
          </ul>
          {visible.length === 0 && <p className="border border-dashed border-[#e6d9b8] p-6 text-center text-sm text-muted-foreground">No {def.noun} matches your search.</p>}
          <button type="button" onClick={() => { update([...items, structuredClone(def.blank)]); setOpen(items.length); setQuery(""); }} className={`${BTN.outline} mt-4`}><Plus className="h-4 w-4" />Add {def.noun}</button>
        </>
      )}
    </div>
  );
}
