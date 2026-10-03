import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, countryFromPhone, flagUrl } from "../lib/countries.ts";
import { FIELD } from "../lib/styles.ts";

type Props = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  placeholder?: string;
};

// Phone box with a country picker. The value is always the full number, for example "+91 98765 43210".
// India (+91) is selected by default; the list can be searched by country name or code.
export default function PhoneInput({ id, name, value, onChange, invalid, describedBy, placeholder = "98765 43210" }: Props) {
  const [iso, setIso] = useState(() => countryFromPhone(value).iso);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const country = COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
  const prefix = `+${country.dial}`;
  const local = value.startsWith(prefix) ? value.slice(prefix.length).replace(/^ /, "") : value;

  const emit = (dial: string, text: string) => onChange(text.trim() ? `+${dial} ${text}` : "");
  const close = () => { setOpen(false); setQuery(""); };
  const pick = (nextIso: string, dial: string) => {
    setIso(nextIso);
    emit(dial, local);
    close();
  };

  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const list = q ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.iso.toLowerCase() === q || c.dial.startsWith(q)) : COUNTRIES;

  return (
    <div className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Country code ${prefix}. Change country`}
        aria-expanded={open}
        className="flex h-11 shrink-0 cursor-pointer items-center gap-1.5 border border-r-0 border-input bg-secondary/60 px-2.5 text-sm text-foreground"
      >
        <img src={flagUrl(country.iso)} alt="" width={20} height={14} className="h-3.5 w-5 object-cover" />
        <span>{prefix}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={local}
        onChange={(e) => emit(country.dial, e.target.value.replace(/[^\d\s()-]/g, ""))}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className={FIELD}
      />
      {open && (
        <>
          <button type="button" aria-label="Close country list" tabIndex={-1} onClick={close} className="fixed inset-0 z-30 cursor-default" />
          <div className="absolute left-0 top-12 z-40 w-[min(20rem,calc(100vw-3rem))] border border-border bg-card text-foreground shadow-xl">
            <div className="relative border-b border-border p-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                aria-label="Search country"
                className="h-10 w-full border border-input bg-background pl-9 pr-2 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary/40"
              />
            </div>
            <ul className="max-h-60 overflow-y-auto py-1">
              {list.length === 0 && <li className="px-3 py-3 text-sm text-muted-foreground">No country found.</li>}
              {list.map((c) => (
                <li key={c.iso}>
                  <button
                    type="button"
                    onClick={() => pick(c.iso, c.dial)}
                    className={`flex min-h-10 w-full cursor-pointer items-center gap-3 px-3 text-left text-sm hover:bg-secondary ${c.iso === iso ? "bg-secondary" : ""}`}
                  >
                    <img src={flagUrl(c.iso)} alt="" width={20} height={14} loading="lazy" className="h-3.5 w-5 shrink-0 object-cover" />
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 text-muted-foreground">+{c.dial}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
