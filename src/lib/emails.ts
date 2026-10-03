import { mailEmailList, reservationEmailList } from "./hotel-data.ts";

// Department emails and fax shown in the footer and on the contact page.
export const FAX = { label: "+91-281-248 1481", href: "tel:+912812481481" } as const;
// The careers email is shown only on the Career page, not in the footer or contact page.
export const CAREER_EMAIL = "hr@imperialpalace.in";

export type EmailGroup = { label: string; emails: string[] };

/** Every email group, read at call time so edits to Contact details in admin still show. */
export function emailGroups(): EmailGroup[] {
  return [
    { label: "Reservations", emails: reservationEmailList() },
    { label: "Mail", emails: mailEmailList() },
    { label: "Banquets", emails: ["banquet@imperialpalace.in"] },
    { label: "Sales", emails: ["sales@imperialpalace.in"] },
  ].filter((g) => g.emails.length > 0);
}
