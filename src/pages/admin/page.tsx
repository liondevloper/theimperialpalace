import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { BedDouble, CalendarHeart, Contact, ExternalLink, Home, Images, Inbox, LayoutDashboard, LogOut, Map, Sparkles, UtensilsCrossed, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase.ts";
import { BTN, FIELD, LABEL } from "../../lib/styles.ts";
import { Logo } from "../../components/site-header.tsx";
import ContentEditor from "./_components/content-editor.tsx";
import EnquiriesPanel from "./_components/enquiries-panel.tsx";
import DashboardPanel from "./_components/dashboard-panel.tsx";
import { SECTIONS } from "./_lib/schema.ts";

type Access = "loading" | "out" | "denied" | "admin";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard, enquiries: Inbox, home: Home, rooms: BedDouble, restaurants: UtensilsCrossed, venues: CalendarHeart,
  amenities: Waves, experiences: Sparkles, gallery: Images, tour: Map, contact: Contact,
};

const GROUPS = [
  { title: "Overview", keys: ["dashboard", "enquiries"] },
  { title: "Website content", keys: SECTIONS.map((s) => s.key as string) },
];

function LoginForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const creds = { email: email.trim(), password };
    const { data, error } = mode === "in" ? await supabase.auth.signInWithPassword(creds) : await supabase.auth.signUp(creds);
    setBusy(false);
    if (error) setMessage(error.message);
    else if (mode === "up" && !data.session) setMessage("Account created. Check your email to confirm it, then sign in.");
  };

  return (
    <form onSubmit={(e) => void submit(e)} className="mx-auto grid w-full max-w-sm gap-4 border border-[#e6d9b8] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(90,70,30,0.5)]">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[#8a6a22]">Control room</p>
      <h1 className="font-serif text-3xl font-light text-foreground">{mode === "in" ? "Admin sign in" : "Create admin account"}</h1>
      <div className="grid gap-1.5"><label htmlFor="a-email" className={LABEL}>Email</label><input id="a-email" type="email" required autoComplete="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={FIELD} /></div>
      <div className="grid gap-1.5"><label htmlFor="a-pass" className={LABEL}>Password</label><input id="a-pass" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={FIELD} /></div>
      {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
      <button type="submit" disabled={busy} className={BTN.gold}>{busy ? "Please wait..." : mode === "in" ? "Sign in" : "Create account"}</button>
      <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMessage(""); }} className="min-h-11 cursor-pointer text-xs text-muted-foreground underline">{mode === "in" ? "First time? Create the admin account" : "Already have an account? Sign in"}</button>
      {mode === "up" && <p className="text-xs leading-5 text-muted-foreground">The first account created becomes the only admin. Others cannot be added later from this page.</p>}
    </form>
  );
}

export default function AdminPage() {
  const [access, setAccess] = useState<Access>("loading");
  const [tab, setTab] = useState<string>("dashboard");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Admin | The Imperial Palace Rajkot";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    // The public site is dark; the admin control room keeps its light ivory palette.
    document.documentElement.classList.add("theme-ivory");

    const check = async (session: Session | null) => {
      if (!session) return setAccess("out");
      setEmail(session.user.email ?? "");
      const { data, error } = await supabase.rpc("claim_admin");
      setAccess(!error && data === true ? "admin" : "denied");
    };
    void supabase.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => void check(session), 0); });
    return () => { sub.subscription.unsubscribe(); robots.remove(); document.documentElement.classList.remove("theme-ivory"); };
  }, []);

  const signOut = () => void supabase.auth.signOut();
  const go = (key: string) => { setTab(key); window.scrollTo({ top: 0 }); };
  const section = SECTIONS.find((s) => s.key === tab);
  const labelOf = (key: string) => (key === "dashboard" ? "Dashboard" : key === "enquiries" ? "Enquiries" : SECTIONS.find((s) => s.key === key)?.label ?? key);
  const allKeys = GROUPS.flatMap((g) => g.keys);

  if (access !== "admin") {
    return (
      <main className="theme-ivory flex min-h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#f6efe0] to-background px-5 py-12 text-foreground">
        <Link to="/" aria-label="The Imperial Palace, home"><Logo alt="The Imperial Palace" tone="light" className="h-20 md:h-24" /></Link>
        {access === "loading" && <p className="text-sm text-muted-foreground">Loading...</p>}
        {access === "out" && <LoginForm />}
        {access === "denied" && (
          <div className="max-w-sm text-center">
            <h1 className="font-serif text-3xl font-light text-foreground">No admin access</h1>
            <p className="mt-3 text-sm text-muted-foreground">This account is not an administrator of the website.</p>
            <button type="button" onClick={signOut} className={`${BTN.outline} mt-5`}>Sign out</button>
          </div>
        )}
        <Link to="/" className="text-xs text-muted-foreground underline">Back to website</Link>
      </main>
    );
  }

  const navBtn = (active: boolean) => `flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 text-left text-[12px] uppercase tracking-[0.14em] transition-colors ${active ? "border-l-2 border-[#c9a84c] bg-[#2a2218] text-[#e8d5a3]" : "border-l-2 border-transparent text-[#e8d5a3]/60 hover:bg-[#2a2218]/60 hover:text-[#e8d5a3]"}`;

  return (
    <div className="theme-ivory flex min-h-dvh bg-[#faf6ec] text-foreground">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-[#1a140c] lg:flex">
        <div className="border-b border-[#3a2e1c] p-5">
          <p className="font-serif text-xl text-[#f6efe0]">The Imperial Palace</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#b8933a]">Admin control room</p>
        </div>
        <nav aria-label="Admin sections" className="flex-1 overflow-y-auto py-3">
          {GROUPS.map((g) => (
            <div key={g.title} className="mb-4">
              <p className="px-5 pb-2 pt-2 text-[9px] uppercase tracking-[0.3em] text-[#b8933a]/70">{g.title}</p>
              {g.keys.map((key) => {
                const Icon = ICONS[key] ?? Sparkles;
                return <button key={key} type="button" onClick={() => go(key)} className={navBtn(tab === key)}><Icon className="h-4 w-4" />{labelOf(key)}</button>;
              })}
            </div>
          ))}
        </nav>
        <div className="space-y-1 border-t border-[#3a2e1c] p-3">
          {email && <p className="truncate px-4 pb-2 text-[11px] text-[#e8d5a3]/50">{email}</p>}
          <Link to="/" target="_blank" className={navBtn(false)}><ExternalLink className="h-4 w-4" />View website</Link>
          <button type="button" onClick={signOut} className={navBtn(false)}><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-[#e6d9b8] bg-[#faf6ec]/90 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-2">
            <Logo alt="The Imperial Palace" tone="light" className="h-10" />
            <div className="flex">
              <Link to="/" target="_blank" aria-label="View website" className="flex h-11 w-11 items-center justify-center"><ExternalLink className="h-5 w-5" /></Link>
              <button type="button" onClick={signOut} aria-label="Sign out" className="flex h-11 w-11 cursor-pointer items-center justify-center"><LogOut className="h-5 w-5" /></button>
            </div>
          </div>
          <nav aria-label="Admin sections" className="flex overflow-x-auto px-2">
            {allKeys.map((key) => <button key={key} type="button" onClick={() => go(key)} className={`min-h-11 shrink-0 cursor-pointer border-b-2 px-3 text-[11px] uppercase tracking-[0.14em] ${tab === key ? "border-[#c9a84c] text-foreground" : "border-transparent text-muted-foreground"}`}>{labelOf(key)}</button>)}
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-5 py-8 lg:py-12">
          {section ? <ContentEditor key={section.key} def={section} /> : tab === "enquiries" ? <EnquiriesPanel /> : <DashboardPanel go={go} />}
        </main>
      </div>
    </div>
  );
}
