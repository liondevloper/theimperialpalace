import { useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import Modal from "./modal.tsx";
import EnquiryModal from "./enquiry-modal.tsx";
import { formatDate, nightsBetween, todayIso } from "../lib/forms.ts";
import { ROOMS } from "../lib/hotel-data.ts";
import { BTN, FIELD, LABEL } from "../lib/styles.ts";

const ANY_ROOM = "Any room type";
type Search = { checkin: string; checkout: string; adults: string; children: string; rooms: string; roomType: string };
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 content-start gap-1.5">
      <label htmlFor={htmlFor} className={LABEL}>{label}</label>
      {children}
      {error && <p id={`${htmlFor}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function BookingWidget() {
  const uid = useId();
  const [search, setSearch] = useState<Search>({ checkin: "", checkout: "", adults: "2", children: "0", rooms: "1", roomType: ANY_ROOM });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resultOpen, setResultOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const today = todayIso();
  const id = (name: string) => `${uid}-${name}`;

  const update = (key: keyof Search, value: string) => {
    setSearch((prev) => ({ ...prev, [key]: value, ...(key === "checkin" && prev.checkout <= value ? { checkout: "" } : {}) }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found: Record<string, string> = {};
    if (!search.checkin) found.checkin = "Choose a check-in date.";
    else if (search.checkin < today) found.checkin = "Check-in cannot be in the past.";
    if (!search.checkout) found.checkout = "Choose a check-out date.";
    else if (search.checkin && search.checkout <= search.checkin) found.checkout = "Check-out must be after check-in.";
    setErrors(found);
    if (Object.keys(found).length === 0) setResultOpen(true);
  };

  const matches = search.roomType === ANY_ROOM ? ROOMS.slice(0, 3) : ROOMS.filter((r) => r.name === search.roomType);
  const nights = search.checkin && search.checkout ? nightsBetween(search.checkin, search.checkout) : 0;
  const guests = Number(search.adults) + Number(search.children);
  const select = (name: keyof Search, options: string[]) => (
    <select id={id(name)} value={search[name]} onChange={(e) => update(name, e.target.value)} className={FIELD}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
  const summary = [
    ["Check-in", formatDate(search.checkin || today)],
    ["Check-out", formatDate(search.checkout || today)],
    ["Nights", String(nights)],
    ["Guests", `${guests} (${search.adults} adults, ${search.children} children)`],
    ["Rooms", search.rooms],
    ["Room type", search.roomType],
  ];

  return (
    <>
      <form onSubmit={onSubmit} noValidate aria-label="Check availability" className="border border-border bg-card p-5 md:p-7">
        <div className="grid gap-4 min-[420px]:grid-cols-2 lg:grid-cols-6">
          <Field label="Check-in" htmlFor={id("checkin")} error={errors.checkin}>
            <input id={id("checkin")} type="date" min={today} value={search.checkin} onChange={(e) => update("checkin", e.target.value)} aria-invalid={errors.checkin ? true : undefined} aria-describedby={errors.checkin ? `${id("checkin")}-error` : undefined} className={FIELD} />
          </Field>
          <Field label="Check-out" htmlFor={id("checkout")} error={errors.checkout}>
            <input id={id("checkout")} type="date" min={search.checkin || today} value={search.checkout} onChange={(e) => update("checkout", e.target.value)} aria-invalid={errors.checkout ? true : undefined} aria-describedby={errors.checkout ? `${id("checkout")}-error` : undefined} className={FIELD} />
          </Field>
          <Field label="Adults" htmlFor={id("adults")}>{select("adults", range(1, 8))}</Field>
          <Field label="Children" htmlFor={id("children")}>{select("children", range(0, 6))}</Field>
          <Field label="Rooms" htmlFor={id("rooms")}>{select("rooms", range(1, 5))}</Field>
          <Field label="Room type" htmlFor={id("roomType")}>{select("roomType", [ANY_ROOM, ...ROOMS.map((r) => r.name)])}</Field>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">Demonstration widget. No live availability or rates are shown.</p>
          <button type="submit" className={BTN.gold}><CalendarDays className="h-4 w-4" />Check availability</button>
        </div>
      </form>

      <Modal open={resultOpen} onClose={() => setResultOpen(false)} label="Availability preview" wide>
        <span className="inline-block border border-[#8a6a22] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#6f5318]">Demo preview</span>
        <h2 className="mt-4 pr-10 font-serif text-3xl font-light text-foreground">Your stay at a glance</h2>
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-border py-5 text-sm sm:grid-cols-3">
          {summary.map(([term, detail]) => (
            <div key={term}><dt className={LABEL}>{term}</dt><dd className="mt-1 text-foreground">{detail}</dd></div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">These are illustrative room categories only. Live availability and rates will appear here once this website is connected to the hotel's booking system.</p>
        <ul className="mt-5 divide-y divide-border border border-border">
          {matches.map((room) => (
            <li key={room.slug} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0"><p className="font-serif text-xl text-foreground">{room.name}</p><p className="text-xs text-muted-foreground">{room.size}</p></div>
              <Link to={`/stay/${room.slug}`} onClick={() => setResultOpen(false)} className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[#6f5318] underline underline-offset-4">View room</Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" className={BTN.gold} onClick={() => { setResultOpen(false); setEnquiryOpen(true); }}>Send booking enquiry</button>
          <button type="button" className={BTN.outline} onClick={() => setResultOpen(false)}>Edit search</button>
        </div>
      </Modal>

      <EnquiryModal kind="booking" open={enquiryOpen} onClose={() => setEnquiryOpen(false)} defaults={{ checkin: search.checkin, checkout: search.checkout, guests: String(guests), roomType: search.roomType }} />
    </>
  );
}
