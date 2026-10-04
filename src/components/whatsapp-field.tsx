import { useId } from "react";
import PhoneInput from "./phone-input.tsx";
import { FIELD, LABEL } from "../lib/styles.ts";

const PHONE_RE = /^\+?[\d\s()-]{8,18}$/;

/** Empty string when the WhatsApp number is blank (optional) or valid. */
export function whatsappError(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return PHONE_RE.test(v) && v.replace(/\D/g, "").length >= 8 ? "" : "Please enter a valid WhatsApp number.";
}

type Props = {
  phone: string;
  value: string;
  same: boolean;
  onSameChange: (same: boolean) => void;
  onChange: (value: string) => void;
  error?: string;
};

// When the tick is on, the box mirrors the phone number so guests do not type it twice.
export default function WhatsappField({ phone, value, same, onSameChange, onChange, error }: Props) {
  const id = useId();
  return (
    <div className="grid min-w-0 content-start gap-1.5">
      <label htmlFor={id} className={LABEL}>WhatsApp number</label>
      {same ? (
        <input id={id} type="tel" readOnly value={phone} placeholder="Same as phone number" className={FIELD} />
      ) : (
        <PhoneInput id={id} value={value} onChange={onChange} invalid={!!error} describedBy={error ? `${id}-error` : undefined} />
      )}
      <label className="flex min-h-9 cursor-pointer items-center gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={same} onChange={(e) => onSameChange(e.target.checked)} className="h-4 w-4 accent-[var(--brand-gold)]" />
        My phone number is also my WhatsApp number
      </label>
      {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
