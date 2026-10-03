import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, BedDouble, CalendarDays, Check, Moon, Users } from "lucide-react";
import Modal from "./modal.tsx";
import PhoneInput from "./phone-input.tsx";
import WhatsappField, { whatsappError } from "./whatsapp-field.tsx";
import { FORM_CONFIGS, formatDate, nightsBetween, todayIso, validate } from "../lib/forms.ts";
import { submitEnquiry } from "../lib/enquiries.ts";
import { ROOMS } from "../lib/hotel-data.ts";
import { THANK_YOU } from "../lib/site-config.ts";
import { BTN, FIELD, LABEL } from "../lib/styles.ts";

const ANY_ROOM = "Any room type";
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

type Stay = { checkin: string; checkout: string; adults: string; children: string; rooms: string; roomType: string };
type Guest = { name: string; email: string; phone: string; message: string };
type Step = "stay" | "guest" | "done";

function Field({ label, htmlFor, error, wide, children }: { label: string; htmlFor: string; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`grid min-w-0 content-start gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className={LABEL}>{label}</label>
      {children}
      {error && <p id={`${htmlFor}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function StepDots({ step }: { step: Step }) {
  const index = step === "stay" ? 0 : 1;
  return (
    <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground" aria-label="Booking steps">
      {["Your stay", "Guest details"].map((label, i) => (
        <li key={label} className="flex items-center gap-2" aria-current={i === index ? "step" : undefined}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${i <= index ? "border-[#b8933a] bg-[#b8933a] text-[#0f1a30]" : "border-border"}`}>{i + 1}</span>
          <span className={i === index ? "text-foreground" : ""}>{label}</span>
          {i === 0 && <span className="mx-1 h-px w-6 bg-border" />}
        </li>
      ))}
    </ol>
  );
}

// Lives inside the Modal, so all state resets every time the popup is reopened.
function BookStayFlow({ defaultRoom }: { defaultRoom?: string }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const today = todayIso();
  const [step, setStep] = useState<Step>("stay");
  const [stay, setStay] = useState<Stay>({ checkin: "", checkout: "", adults: "2", children: "0", rooms: "1", roomType: defaultRoom ?? ANY_ROOM });
  const [guest, setGuest] = useState<Guest>({ name: "", email: "", phone: "", message: "" });
  const [whatsapp, setWhatsapp] = useState("");
  const [sameWhatsapp, setSameWhatsapp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nights = stay.checkin && stay.checkout ? nightsBetween(stay.checkin, stay.checkout) : 0;
  const guests = Number(stay.adults) + Number(stay.children);

  const updateStay = (key: keyof Stay, value: string) => {
    // Clear check-out if the new check-in is on or after it.
    setStay((prev) => ({ ...prev, [key]: value, ...(key === "checkin" && prev.checkout && prev.checkout <= value ? { checkout: "" } : {}) }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const updateGuest = (key: keyof Guest, value: string) => {
    setGuest((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const continueToGuest = () => {
    const found: Record<string, string> = {};
    if (!stay.checkin) found.checkin = "Choose a check-in date.";
    else if (stay.checkin < today) found.checkin = "Check-in cannot be in the past.";
    if (!stay.checkout) found.checkout = "Choose a check-out date.";
    else if (stay.checkin && stay.checkout <= stay.checkin) found.checkout = "Check-out must be after check-in.";
    setErrors(found);
    if (Object.keys(found).length === 0) setStep("guest");
  };

  const submit = async () => {
    const finalWhatsapp = (sameWhatsapp ? guest.phone : whatsapp).trim();
    const values: Record<string, string> = {
      ...guest,
      whatsapp: finalWhatsapp,
      guests: String(guests),
      checkin: stay.checkin,
      checkout: stay.checkout,
      roomType: stay.roomType,
      adults: stay.adults,
      children: stay.children,
      rooms: stay.rooms,
      nights: String(nights),
    };
    const found = validate(FORM_CONFIGS.booking.fields, values);
    const waError = sameWhatsapp ? "" : whatsappError(finalWhatsapp);
    if (waError) found.whatsapp = waError;
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSending(true);
    setSubmitError("");
    const result = await submitEnquiry("booking", values);
    setSending(false);
    if (result.ok) setStep("done");
    else setSubmitError(result.message);
  };

  const select = (name: keyof Stay, options: string[]) => (
    <select id={id(name)} value={stay[name]} onChange={(e) => updateStay(name, e.target.value)} className={FIELD}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
  const invalid = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${id(name)}-error` } : {});

  if (step === "done") {
    return (
      <div className="flex flex-col items-center py-8 text-center" role="status">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a84c] text-[#0f1a30]"><Check className="h-7 w-7" /></span>
        <h2 className="font-serif text-3xl font-light text-foreground">{THANK_YOU}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Your booking request for {formatDate(stay.checkin)} to {formatDate(stay.checkout)} has been received. Our reservations team will confirm availability shortly.
        </p>
      </div>
    );
  }

  const summary = [
    { icon: CalendarDays, label: "Dates", value: `${formatDate(stay.checkin)} - ${formatDate(stay.checkout)}` },
    { icon: Moon, label: "Nights", value: String(nights) },
    { icon: Users, label: "Guests", value: `${stay.adults} adults, ${stay.children} children` },
    { icon: BedDouble, label: "Rooms", value: `${stay.rooms} x ${stay.roomType}` },
  ];

  return (
    <div className="grid gap-6">
      <div className="pr-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-primary">The Imperial Palace, Rajkot</span>
        <h2 className="mt-2 font-serif text-3xl font-light text-foreground md:text-4xl">Book your stay</h2>
        <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-primary">5 Star Hotel</p>
        <div className="mt-4"><StepDots step={step} /></div>
      </div>

      {step === "stay" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Check-in" htmlFor={id("checkin")} error={errors.checkin}>
              <input id={id("checkin")} type="date" min={today} value={stay.checkin} onChange={(e) => updateStay("checkin", e.target.value)} className={FIELD} {...invalid("checkin")} />
            </Field>
            <Field label="Check-out" htmlFor={id("checkout")} error={errors.checkout}>
              <input id={id("checkout")} type="date" min={stay.checkin || today} value={stay.checkout} onChange={(e) => updateStay("checkout", e.target.value)} className={FIELD} {...invalid("checkout")} />
            </Field>
            <div className="grid grid-cols-3 gap-3 sm:col-span-2">
              <Field label="Adults" htmlFor={id("adults")}>{select("adults", range(1, 8))}</Field>
              <Field label="Children" htmlFor={id("children")}>{select("children", range(0, 6))}</Field>
              <Field label="Rooms" htmlFor={id("rooms")}>{select("rooms", range(1, 5))}</Field>
            </div>
            <Field label="Room type" htmlFor={id("roomType")} wide>{select("roomType", [ANY_ROOM, ...ROOMS.map((r) => r.name)])}</Field>
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {nights > 0 ? <><span className="font-serif text-2xl text-foreground">{nights}</span> night{nights > 1 ? "s" : ""} &middot; Check-in 2:00 PM &middot; Check-out 12:00 PM</> : "Check-in 2:00 PM \u00b7 Check-out 12:00 PM"}
            </p>
            <button type="button" onClick={continueToGuest} className={BTN.gold}>Continue</button>
          </div>
        </>
      ) : (
        <>
          <dl className="grid grid-cols-2 gap-4 border border-border bg-secondary/60 p-4 text-sm">
            {summary.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex min-w-0 gap-2.5">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0"><dt className={LABEL}>{label}</dt><dd className="mt-0.5 break-words text-foreground">{value}</dd></div>
              </div>
            ))}
          </dl>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name *" htmlFor={id("name")} error={errors.name} wide>
              <input id={id("name")} type="text" autoComplete="name" placeholder="John Smith" value={guest.name} onChange={(e) => updateGuest("name", e.target.value)} className={FIELD} {...invalid("name")} />
            </Field>
            <Field label="Email *" htmlFor={id("email")} error={errors.email}>
              <input id={id("email")} type="email" autoComplete="email" placeholder="example@gmail.com" value={guest.email} onChange={(e) => updateGuest("email", e.target.value)} className={FIELD} {...invalid("email")} />
            </Field>
            <Field label="Phone *" htmlFor={id("phone")} error={errors.phone}>
              <PhoneInput id={id("phone")} value={guest.phone} onChange={(v) => updateGuest("phone", v)} invalid={!!errors.phone} describedBy={errors.phone ? `${id("phone")}-error` : undefined} />
            </Field>
            <WhatsappField phone={guest.phone} value={whatsapp} same={sameWhatsapp} onSameChange={setSameWhatsapp} onChange={(v) => { setWhatsapp(v); setErrors((p) => ({ ...p, whatsapp: "" })); }} error={errors.whatsapp} />
            <Field label="Special requests" htmlFor={id("message")} wide>
              <textarea id={id("message")} rows={3} placeholder="Early check-in, airport pickup, extra bed..." value={guest.message} onChange={(e) => updateGuest("message", e.target.value)} className={`${FIELD} h-auto py-2`} />
            </Field>
          </div>
          {(submitError || errors.checkin || errors.checkout) && <p role="alert" className="text-sm text-destructive">{submitError || errors.checkin || errors.checkout}</p>}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => setStep("stay")} className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Change dates</button>
            <button type="button" onClick={() => void submit()} disabled={sending} className={`${BTN.gold} disabled:opacity-60`}>{sending ? "Sending..." : "Request booking"}</button>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">No payment now. Our team will confirm availability and rates by phone, WhatsApp or email.</p>
        </>
      )}
    </div>
  );
}

type Props = { open: boolean; onClose: () => void; defaultRoom?: string };

export default function BookStayModal({ open, onClose, defaultRoom }: Props) {
  return (
    <Modal open={open} onClose={onClose} label="Book your stay" wide>
      <BookStayFlow defaultRoom={defaultRoom} />
    </Modal>
  );
}

type ButtonProps = { className: string; children: ReactNode; onOpen?: () => void; defaultRoom?: string };

// Self-contained trigger: a button that opens its own booking popup (optionally with a room preselected).
export function BookStayButton({ className, children, onOpen, defaultRoom }: ButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>{children}</button>
      <BookStayModal open={open} onClose={() => setOpen(false)} defaultRoom={defaultRoom} />
    </>
  );
}
