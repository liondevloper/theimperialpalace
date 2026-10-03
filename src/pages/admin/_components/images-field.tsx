import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Plus, X } from "lucide-react";
import { uploadImage } from "../../../lib/content.ts";
import { BTN, FIELD } from "../../../lib/styles.ts";

type Props = { id: string; value: string[]; onChange: (value: string[]) => void };

// Photo list editor: upload several images, paste a link, reorder (first = main photo) and remove.
export default function ImagesField({ id, value, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) added.push(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      if (added.length) onChange([...value, ...added]);
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  const move = (i: number, dir: number) => {
    const t = i + dir;
    if (t < 0 || t >= value.length) return;
    const next = [...value];
    [next[i], next[t]] = [next[t], next[i]];
    onChange(next);
  };

  const addLink = () => {
    const url = link.trim();
    if (!url) return;
    onChange([...value, url]);
    setLink("");
  };

  return (
    <div className="grid gap-3">
      {value.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((src, i) => (
            <li key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden border border-border bg-muted">
              <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-1.5 top-1.5 bg-[#1a140c]/80 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#e8d5a3]">Main</span>}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-[#1a140c]/75 p-1 text-white">
                <button type="button" aria-label="Move left" disabled={i === 0} onClick={() => move(i, -1)} className="flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button>
                <button type="button" aria-label="Remove photo" onClick={() => onChange(value.filter((_, j) => j !== i))} className="flex h-8 w-8 cursor-pointer items-center justify-center text-red-300"><X className="h-4 w-4" /></button>
                <button type="button" aria-label="Move right" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-30"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id={id} value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLink(); } }} placeholder="Paste an image link and press Add" className={FIELD} />
        <button type="button" onClick={addLink} className={`${BTN.outline} shrink-0 px-4`}><Plus className="h-4 w-4" />Add</button>
        <button type="button" disabled={busy} onClick={() => input.current?.click()} className={`${BTN.gold} shrink-0 px-4`}><ImagePlus className="h-4 w-4" />{busy ? "Uploading" : "Upload photos"}</button>
        <input ref={input} type="file" accept="image/*" multiple className="hidden" onChange={(e) => void onFiles(e.target.files)} />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
