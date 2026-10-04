import { Fragment, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Check } from "lucide-react";
import { FORM_CONFIGS, SUBJECT_FIELD, SUBJECT_KIND, todayIso, validate } from "../lib/forms.ts";
import type { EnquiryKind, FormField } from "../lib/forms.ts";
import { submitEnquiry } from "../lib/enquiries.ts";
import { THANK_YOU } from "../lib/site-config.ts";
import { BTN, FIELD, LABEL } from "../lib/styles.ts";
import PhoneInput from "./phone-input.tsx";
import WhatsappField, { whatsappError } from "./whatsapp-field.tsx";

// `stickySubmit` keeps the send button pinned at the bottom of a popup so it never needs scrolling to.
// `subjectSwitch` (contact kind only) lets the guest pick a subject; the form below then becomes that subject's form.
type Props = { kind: EnquiryKind; defaults?: Record<string, string>; showHeading?: boolean; stickySubmit?: boolean; subjectSwitch?: boolean };

function initialValues(fields: FormField[], defaults: Record<string, string>) {
  const values: Record<string, string> = {};
  for (const field of fields) values[field.name] = defaults[field.name] ?? (field.type === "select" ? (field.options?.[0] ?? "") : "");
  return values;
}

// Non-contact forms have no subject field of their own, so the switcher adds it at the top.
const fieldsFor = (kind: EnquiryKind, switcher: boolean): FormField[] => {
  const fields = FORM_CONFIGS[kind].fields;
  return switcher && kind !== "contact" ? [SUBJECT_FIELD, ...fields] : fields;
};

export default function EnquiryForm({ kind, defaults = {}, showHeading = true, stickySubmit = false, subjectSwitch = false }: Props) {
  const switcher = subjectSwitch && kind === "contact";
  const uid = useId();
  const [activeKind, setActiveKind] = useState<EnquiryKind>(kind);
  const config = FORM_CONFIGS[activeKind];
  const fields = fieldsFor(activeKind, switcher);
  const [values, setValues] = useState(() => initialValues(fields, defaults));
  const [whatsapp, setWhatsapp] = useState("");
  const [sameWhatsapp, setSameWhatsapp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fieldId = (name: string) => `${uid}-${name}`;

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Switching subject swaps the form but keeps what the guest already typed about themselves.
  const changeSubject = (subject: string) => {
    const nextKind = SUBJECT_KIND[subject] ?? "contact";
    const keep = { name: values.name ?? "", email: values.email ?? "", phone: values.phone ?? "", subject };
    setActiveKind(nextKind);
    setValues(initialValues(fieldsFor(nextKind, true), keep));
    setErrors({});
    setSubmitError("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (switcher && event.target.name === "subject") changeSubject(event.target.value);
    else setValue(event.target.name, event.target.value);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate(fields, values);
    const finalWhatsapp = (sameWhatsapp ? values.phone : whatsapp).trim();
    const waError = sameWhatsapp ? "" : whatsappError(finalWhatsapp);
    if (waError) found.whatsapp = waError;
    setErrors(found);
    const firstInvalid = fields.find((f) => found[f.name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid.name))?.focus();
      return;
    }
    if (waError) return;
    setSending(true);
    setSubmitError("");
    const result = await submitEnquiry(activeKind, { ...values, whatsapp: finalWhatsapp });
    setSending(false);
    if (result.ok) setSent(true);
    else setSubmitError(result.message);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-8 text-center" role="status">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-gold)] text-[var(--brand-ink-alt)]"><Check className="h-7 w-7" /></span>
        <h3 className="font-serif text-3xl font-light text-foreground">{THANK_YOU}</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {showHeading && (
        <div className="sm:col-span-2">
          <h2 className="pr-10 font-serif text-2xl font-light text-foreground sm:text-3xl">{config.title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{config.subtitle}</p>
        </div>
      )}
      {fields.map((field) => {
        const id = fieldId(field.name);
        const error = errors[field.name];
        const shared = { id, name: field.name, value: values[field.name], onChange, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined };
        return (
          <Fragment key={field.name}>
            <div className={`grid min-w-0 content-start gap-1.5 ${field.wide || field.type === "textarea" ? "sm:col-span-2" : ""}`}>
              <label htmlFor={id} className={LABEL}>{field.label}{field.required ? " *" : ""}</label>
              {field.type === "textarea" ? (
                <textarea {...shared} rows={3} placeholder={field.placeholder} className={`${FIELD} h-auto py-2`} />
              ) : field.type === "select" ? (
                <select {...shared} className={FIELD}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select>
              ) : field.type === "tel" ? (
                <PhoneInput id={id} name={field.name} value={values[field.name] ?? ""} onChange={(v) => setValue(field.name, v)} invalid={!!error} describedBy={error ? `${id}-error` : undefined} />
              ) : (
                <input {...shared} type={field.type} min={field.type === "date" ? todayIso() : field.min} placeholder={field.placeholder} className={FIELD} />
              )}
              {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
            </div>
            {field.name === "phone" && (
              <WhatsappField phone={values.phone ?? ""} value={whatsapp} same={sameWhatsapp} onSameChange={setSameWhatsapp} onChange={(v) => { setWhatsapp(v); setErrors((p) => ({ ...p, whatsapp: "" })); }} error={errors.whatsapp} />
            )}
          </Fragment>
        );
      })}
      {submitError && <p role="alert" className="text-sm text-destructive sm:col-span-2">{submitError}</p>}
      <div className={`sm:col-span-2 ${stickySubmit ? "sticky bottom-0 z-10 -mx-5 -mb-5 border-t border-border bg-white px-5 py-3 sm:-mx-8 sm:-mb-8 sm:px-8" : ""}`}>
        <button type="submit" disabled={sending} className={`${BTN.gold} w-full disabled:opacity-60`}>{sending ? "Sending..." : config.submitLabel}</button>
      </div>
    </form>
  );
}
