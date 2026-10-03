import { useRef, useState } from "react";
import { Film, ImagePlus, X } from "lucide-react";
import { uploadMedia } from "../../../lib/content.ts";
import type { MediaKind } from "../../../lib/content.ts";
import { BTN, FIELD } from "../../../lib/styles.ts";

type Props = { id: string; value: string; onChange: (value: string) => void; kind?: MediaKind };

// Single photo or video: paste a link or upload a file, with a preview and a remove button.
export default function ImageField({ id, value, onChange, kind = "image" }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isVideo = kind === "video";
  const Icon = isVideo ? Film : ImagePlus;

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadMedia(file, kind));
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
          <Icon className="h-4 w-4" />{busy ? "Uploading" : "Upload"}
        </button>
        <input ref={input} type="file" accept={isVideo ? "video/mp4,video/webm,video/*" : "image/*"} className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
      </div>
      {value && (
        <div className="flex items-start gap-2">
          {isVideo
            ? <video src={value} muted controls playsInline className="h-28 w-44 border border-border bg-black object-cover" />
            : <img src={value} alt="Preview" className="h-28 w-44 border border-border object-cover" />}
          <button type="button" onClick={() => onChange("")} className="inline-flex min-h-11 cursor-pointer items-center gap-1 px-2 text-xs text-destructive"><X className="h-4 w-4" />Remove</button>
        </div>
      )}
      {busy && isVideo && <p className="text-xs text-muted-foreground">Uploading video, this can take a minute...</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
