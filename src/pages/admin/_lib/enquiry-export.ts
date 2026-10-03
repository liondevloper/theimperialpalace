import type { jsPDF } from "jspdf";
import type { Enquiry } from "../_components/enquiries-panel.tsx";
import { CONTACT_INFORMATION } from "../../../lib/hotel-data.ts";
import { formatDate } from "../../../lib/forms.ts";

// The hotel is in India, so every export shows Indian time regardless of the admin's device clock.
const TIME_ZONE = "Asia/Kolkata";
const LOGO_URL = "https://hercules-cdn.com/cdn-cgi/image/w=480,quality=90,fit=scale-down,format=auto/file_In72XlrUsnNamC72DdnGy1s0";
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

type RGB = [number, number, number];
const NAVY: RGB = [17, 28, 51];
const GOLD: RGB = [184, 147, 58];
const CHAMPAGNE: RGB = [232, 213, 163];
const IVORY: RGB = [250, 246, 236];
const MARGIN = 14;

export const label = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

/** "03 Oct 2026, 7:30 pm" in Indian time. */
export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: TIME_ZONE, day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });

/** Form dates are saved as YYYY-MM-DD; show them as "12 Oct 2026". */
export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return ISO_DAY.test(value) ? formatDate(value) : value;
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  return String(value);
}

const detailEntries = (r: Enquiry): [string, string][] =>
  Object.entries(r.details)
    .map(([k, v]): [string, string] => [label(k), formatValue(v)])
    .filter(([, v]) => v.trim() !== "");

const fileStamp = () => new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "guest";

function saveBlob(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ------------------------------------ Excel ----------------------------------- */

const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function exportCsv(rows: Enquiry[]) {
  const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.details))));
  const head = ["Date & time (IST)", "Type", "Status", "Name", "Email", "Phone", ...keys.map(label)];
  const body = rows.map((r) => [formatDateTime(r.created_at), label(r.kind), label(r.status), r.name, r.email, r.phone, ...keys.map((k) => formatValue(r.details[k]))]);
  // The BOM makes Excel open the file as UTF-8 so names and symbols show correctly.
  const csv = "\uFEFF" + [head, ...body].map((line) => line.map(csvCell).join(",")).join("\r\n");
  saveBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), `enquiries-${fileStamp()}.csv`);
}

/* ------------------------------------- PDF ------------------------------------ */

type Logo = { data: string; width: number; height: number };
let logoPromise: Promise<Logo | null> | null = null;

// Re-draws the logo as PNG on a canvas so the PDF accepts it whatever format the CDN serves.
function loadLogo(): Promise<Logo | null> {
  logoPromise ??= new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve({ data: canvas.toDataURL("image/png"), width: img.naturalWidth, height: img.naturalHeight });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = LOGO_URL;
  });
  return logoPromise;
}

/** Logo, hotel name and address on the left; report title and print time on the right. Returns the Y to start content at. */
function drawHeader(doc: jsPDF, logo: Logo | null, title: string, subtitle: string): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  let x = MARGIN;
  if (logo) {
    const h = 22;
    const w = Math.min(44, (logo.width / logo.height) * h);
    doc.addImage(logo.data, "PNG", MARGIN, 8, w, (w / ((logo.width / logo.height) * h)) * h);
    x = MARGIN + w + 5;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...NAVY);
  doc.text(String(CONTACT_INFORMATION.name || "The Imperial Palace"), x, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(95, 95, 95);
  doc.text(CONTACT_INFORMATION.addressLines.join(", "), x, 21.5, { maxWidth: pageWidth / 2 - x + MARGIN });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...GOLD);
  doc.text(title.toUpperCase(), pageWidth - MARGIN, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(95, 95, 95);
  doc.text(subtitle, pageWidth - MARGIN, 20.5, { align: "right" });
  doc.text(`Downloaded: ${formatDateTime(new Date().toISOString())} IST`, pageWidth - MARGIN, 25, { align: "right" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, 33, pageWidth - MARGIN, 33);
  return 38;
}

function addFooters(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(String(CONTACT_INFORMATION.name || "The Imperial Palace"), MARGIN, height - 8);
    doc.text(`Page ${i} of ${pages}`, width - MARGIN, height - 8, { align: "right" });
  }
}

async function loadPdfTools() {
  // Loaded only when an admin clicks download, so the public website stays light.
  const [{ jsPDF }, { default: autoTable }, logo] = await Promise.all([import("jspdf"), import("jspdf-autotable"), loadLogo()]);
  return { jsPDF, autoTable, logo };
}

/** All visible enquiries in one landscape table. */
export async function exportPdf(rows: Enquiry[], filterText: string) {
  const { jsPDF, autoTable, logo } = await loadPdfTools();
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const startY = drawHeader(doc, logo, "Enquiries report", `${rows.length} ${rows.length === 1 ? "enquiry" : "enquiries"} | ${filterText}`);
  autoTable(doc, {
    startY,
    head: [["#", "Received (IST)", "Type", "Status", "Name", "Phone", "Email", "Details"]],
    body: rows.map((r, i) => [
      String(i + 1), formatDateTime(r.created_at), label(r.kind), label(r.status), r.name, r.phone ?? "", r.email ?? "",
      detailEntries(r).map(([k, v]) => `${k}: ${v}`).join("\n"),
    ]),
    styles: { font: "helvetica", fontSize: 8, cellPadding: 2, valign: "top", overflow: "linebreak", textColor: [30, 30, 30] },
    headStyles: { fillColor: NAVY, textColor: CHAMPAGNE, fontStyle: "bold" },
    alternateRowStyles: { fillColor: IVORY },
    columnStyles: { 0: { cellWidth: 8 }, 1: { cellWidth: 30 }, 2: { cellWidth: 18 }, 3: { cellWidth: 18 }, 4: { cellWidth: 32 }, 5: { cellWidth: 28 }, 6: { cellWidth: 42 } },
    margin: { left: MARGIN, right: MARGIN, top: MARGIN, bottom: 14 },
  });
  addFooters(doc);
  doc.save(`enquiries-${fileStamp()}.pdf`);
}

/** One enquiry as a neat single-page sheet. */
export async function exportEnquiryPdf(r: Enquiry) {
  const { jsPDF, autoTable, logo } = await loadPdfTools();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const startY = drawHeader(doc, logo, `${label(r.kind)} enquiry`, `Received: ${formatDateTime(r.created_at)} IST`);
  const rows: [string, string][] = [
    ["Received", `${formatDateTime(r.created_at)} IST`],
    ["Type", label(r.kind)],
    ["Status", label(r.status)],
    ["Name", r.name],
    ["Phone", r.phone ?? ""],
    ["Email", r.email ?? ""],
    ...detailEntries(r),
  ];
  autoTable(doc, {
    startY,
    body: rows.filter(([, v]) => v !== ""),
    theme: "grid",
    styles: { font: "helvetica", fontSize: 10, cellPadding: 3, valign: "top", lineColor: [230, 217, 184], textColor: [30, 30, 30] },
    columnStyles: { 0: { cellWidth: 45, fontStyle: "bold", fillColor: IVORY, textColor: NAVY } },
    margin: { left: MARGIN, right: MARGIN, bottom: 14 },
  });
  addFooters(doc);
  doc.save(`enquiry-${slug(r.name)}-${new Date(r.created_at).toLocaleDateString("en-CA", { timeZone: TIME_ZONE })}.pdf`);
}
