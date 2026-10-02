import { supabase } from "./supabase.ts";
import type { EnquiryKind } from "./forms.ts";

export type SubmitResult = { ok: true } | { ok: false; message: string };

// Saves one enquiry. Name, email and phone get their own columns; everything else goes in `details`.
export async function submitEnquiry(kind: EnquiryKind, values: Record<string, string>): Promise<SubmitResult> {
  const { name, email, phone, ...details } = values;
  const cleaned = Object.fromEntries(Object.entries(details).filter(([, v]) => v.trim() !== ""));
  const { error } = await supabase.from("enquiries").insert({
    kind,
    name: name.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    details: cleaned,
  });
  if (error) return { ok: false, message: "We could not send your enquiry. Please try again in a moment." };
  return { ok: true };
}
