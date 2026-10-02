import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Check } from "lucide-react";
import { FORM_CONFIGS, todayIso, validate } from "../lib/forms.ts";
import type { EnquiryKind, FormField } from "../lib/forms.ts";
import { submitEnquiry } from "../lib/enquiries.ts";
import { THANK_YOU } from "../lib/site-config.ts";
import { BTN, FIELD, LABEL } from "../lib/styles.ts";

type Props = { kind: EnquiryKind; defaults?: Record<string, string>; showHeading?: boolean };

function initialValues(fields: FormField[], defaults: Record<string, string>) {
  const values: Record<string, string> = {};
  for (const field of fields) values[field.name] = defaults[field.name] ?? (field.type === "select" ? (field.options?.[0] ?? "") : "");
  return values;
}

export default function EnquiryForm({ kind, defaults = {}, showHeading = true }: Props) {
  const config = FORM_CONFIGS[kind];
  const uid = useId();
  const [values, setValues] = useState(() => initialValues(config.fields, defaults));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fieldId = (name: string) => `${uid}-${name}`;

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate(config.fields, values);
    setErrors(found);
    const firstInvalid = config.fields.find((f) => found[f.name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid.name))?.focus();
      return;
    }
    setSending(true);
    setSubmitError("");
    const result = await submitEnquiry(kind, values);
    setSending(false);
    if (result.ok) setSent(true);
    else setSubmitError(result.message);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-8 text-center" role="status">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a84c] text-[#14110c]"><Check className="h-7 w-7" /></span>
        <h3 className="font-serif text-3xl font-light text-foreground">{THANK_YOU}</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {showHeading && (
        <div className="sm:col-span-2">
          <h2 className="pr-10 font-serif text-3xl font-light text-foreground">{config.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{config.subtitle}</p>
        </div>
      )}
      {config.fields.map((field) => {
        const id = fieldId(field.name);
        const error = errors[field.name];
        const shared = { id, name: field.name, value: values[field.name], onChange, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined };
        return (
          <div key={field.name} className={`grid min-w-0 content-start gap-1.5 ${field.wide || field.type === "textarea" ? "sm:col-span-2" : ""}`}>
            <label htmlFor={id} className={LABEL}>{field.label}{field.required ? " *" : ""}</label>
            {field.type === "textarea" ? (
              <textarea {...shared} rows={4} placeholder={field.placeholder} className={`${FIELD} h-auto py-2`} />
            ) : field.type === "select" ? (
              <select {...shared} className={FIELD}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select>
            ) : (
              <input {...shared} type={field.type} min={field.type === "date" ? todayIso() : field.min} placeholder={field.placeholder} className={FIELD} />
            )}
            {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
          </div>
        );
      })}
      {submitError && <p role="alert" className="text-sm text-destructive sm:col-span-2">{submitError}</p>}
      <button type="submit" disabled={sending} className={`${BTN.gold} sm:col-span-2 disabled:opacity-60`}>{sending ? "Sending..." : config.submitLabel}</button>
    </form>
  );
}
