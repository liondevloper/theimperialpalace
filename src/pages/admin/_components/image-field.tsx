import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "../../../lib/content.ts";
import { BTN, FIELD } from "../../../lib/styles.ts";

type Props = { id: string; value: string; onChange: (value: string) => void };

export default function ImageField({ id, value, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." className={FIELD} />
        <button type="button" disabled={busy} onClick={() => input.current?.click()} className={`${BTN.outline} shrink-0 px-4`}>
          <ImagePlus className="h-4 w-4" />{busy ? "Uploading" : "Upload"}
        </button>
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
      </div>
      {value && <img src={value} alt="Preview" className="h-28 w-44 border border-border object-cover" />}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
