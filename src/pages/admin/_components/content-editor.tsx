import { useId, useState } from "react";
import { ArrowDown, ArrowUp, Plus, RotateCcw, Trash2 } from "lucide-react";
import { getContent, resetContent, saveContent } from "../../../lib/content.ts";
import type { Row } from "../../../lib/content.ts";
import { BTN, FIELD, LABEL } from "../../../lib/styles.ts";
import type { AdminField, SectionDef } from "../_lib/schema.ts";
import ImageField from "./image-field.tsx";

const str = (value: unknown) => (typeof value === "string" ? value : "");
const lines = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string").join("\n") : "");

function cleanRow(fields: AdminField[], row: Row): Row {
  const out: Row = { ...row };
  for (const f of fields) {
    const v = row[f.name];
    if (f.type === "lines") out[f.name] = (Array.isArray(v) ? v : []).map((x) => String(x).trim()).filter(Boolean);
    else if (f.type === "optionalText") out[f.name] = str(v).trim() || null;
    else if (f.type === "text" || f.type === "textarea" || f.type === "image") out[f.name] = str(v).trim();
  }
  return out;
}

function isMissing(f: AdminField, row: Row) {
  if (!f.required) return false;
  const v = row[f.name];
  return f.type === "lines" ? !Array.isArray(v) || v.length === 0 : !str(v);
}

type InputProps = { field: AdminField; id: string; value: unknown; onChange: (value: unknown) => void };

function FieldInput({ field, id, value, onChange }: InputProps) {
  switch (field.type) {
    case "textarea":
      return <textarea id={id} rows={3} value={str(value)} onChange={(e) => onChange(e.target.value)} className={`${FIELD} h-auto py-2`} />;
    case "lines":
      return <textarea id={id} rows={4} value={lines(value)} onChange={(e) => onChange(e.target.value.split("\n"))} className={`${FIELD} h-auto py-2`} />;
    case "image":
      return <ImageField id={id} value={str(value)} onChange={onChange} />;
    case "checkbox":
      return <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#c9a84c]" />;
    case "select":
      return <select id={id} value={str(value)} onChange={(e) => onChange(e.target.value)} className={FIELD}>{field.options?.map((o) => <option key={o}>{o}</option>)}</select>;
    default:
      return <input id={id} value={str(value)} onChange={(e) => onChange(e.target.value)} className={FIELD} />;
  }
}

export default function ContentEditor({ def }: { def: SectionDef }) {
  const uid = useId();
  const [data, setData] = useState<Row[] | Row>(() => getContent(def.key));
  const [open, setOpen] = useState<number | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const items = Array.isArray(data) ? data : [];
  const setItems = (next: Row[]) => { setData(next); setStatus(null); };
  const setField = (index: number, name: string, value: unknown) => {
    if (Array.isArray(data)) setItems(data.map((r, i) => (i === index ? { ...r, [name]: value } : r)));
    else { setData({ ...data, [name]: value }); setStatus(null); }
  };
  const move = (index: number, dir: number) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setOpen(target);
  };

  const save = async () => {
    const rows = Array.isArray(data) ? data.map((r) => cleanRow(def.fields, r)) : cleanRow(def.fields, data);
    const list = Array.isArray(rows) ? rows : [rows];
    const bad = list.findIndex((r) => def.fields.some((f) => isMissing(f, r)));
    if (Array.isArray(rows) && rows.length === 0) return setStatus({ ok: false, text: `Keep at least one ${def.noun}.` });
    if (bad >= 0) {
      setOpen(bad);
      return setStatus({ ok: false, text: `Please fill every required field${Array.isArray(rows) ? ` (check ${def.noun} ${bad + 1})` : ""}.` });
    }
    setBusy(true);
    const error = await saveContent(def.key, rows);
    setBusy(false);
    if (!error) setData(getContent(def.key));
    setStatus(error ? { ok: false, text: error } : { ok: true, text: "Saved. The live website now shows these changes." });
  };

  const reset = async () => {
    if (!window.confirm("Restore the original content for this section? Your edits will be removed.")) return;
    setBusy(true);
    const error = await resetContent(def.key);
    setBusy(false);
    if (!error) setData(getContent(def.key));
    setStatus(error ? { ok: false, text: error } : { ok: true, text: "Original content restored." });
  };

  const renderFields = (row: Row, index: number) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {def.fields.map((f) => {
        const id = `${uid}-${index}-${f.name}`;
        const wide = f.type === "textarea" || f.type === "lines" || f.type === "image";
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

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl font-light text-foreground">{def.label}</h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => void reset()} className={BTN.outline}><RotateCcw className="h-4 w-4" />Restore original</button>
          <button type="button" disabled={busy} onClick={() => void save()} className={BTN.gold}>{busy ? "Saving..." : "Save changes"}</button>
        </div>
      </div>
      {status && <p role="status" className={`mb-4 border px-4 py-3 text-sm ${status.ok ? "border-[#8a6a22] text-foreground" : "border-destructive text-destructive"}`}>{status.text}</p>}

      {!Array.isArray(data) ? (
        <div className="border border-border p-5">{renderFields(data, 0)}</div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((row, index) => (
              <li key={index} className="border border-border">
                <div className="flex items-center gap-2 p-3">
                  <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} className="min-h-11 flex-1 cursor-pointer truncate text-left font-serif text-xl text-foreground">{str(row[def.titleField]) || `Untitled ${def.noun}`}</button>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="flex h-11 w-11 cursor-pointer items-center justify-center disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down" className="flex h-11 w-11 cursor-pointer items-center justify-center disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                  <button type="button" aria-label={`Delete ${str(row[def.titleField])}`} onClick={() => { if (window.confirm(`Delete this ${def.noun}?`)) { setItems(items.filter((_, i) => i !== index)); setOpen(null); } }} className="flex h-11 w-11 cursor-pointer items-center justify-center text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                {open === index && <div className="border-t border-border p-4 md:p-5">{renderFields(row, index)}</div>}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => { setItems([...items, structuredClone(def.blank)]); setOpen(items.length); }} className={`${BTN.outline} mt-4`}><Plus className="h-4 w-4" />Add {def.noun}</button>
        </>
      )}
    </div>
  );
}
