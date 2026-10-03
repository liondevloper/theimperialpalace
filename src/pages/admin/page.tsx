import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase.ts";
import { BTN, FIELD, LABEL } from "../../lib/styles.ts";
import { Logo } from "../../components/site-header.tsx";
import ContentEditor from "./_components/content-editor.tsx";
import EnquiriesPanel from "./_components/enquiries-panel.tsx";
import { SECTIONS } from "./_lib/schema.ts";

type Access = "loading" | "out" | "denied" | "admin";

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
    <form onSubmit={(e) => void submit(e)} className="mx-auto grid w-full max-w-sm gap-4 border border-border p-6">
      <h1 className="font-serif text-3xl font-light text-foreground">{mode === "in" ? "Admin sign in" : "Create admin account"}</h1>
      <div className="grid gap-1.5"><label htmlFor="a-email" className={LABEL}>Email</label><input id="a-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={FIELD} /></div>
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
  const [tab, setTab] = useState<string>("enquiries");

  useEffect(() => {
    document.title = "Admin | The Imperial Palace Rajkot";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    const check = async (session: Session | null) => {
      if (!session) return setAccess("out");
      const { data, error } = await supabase.rpc("claim_admin");
      setAccess(!error && data === true ? "admin" : "denied");
    };
    void supabase.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => void check(session), 0); });
    return () => { sub.subscription.unsubscribe(); robots.remove(); };
  }, []);

  const signOut = () => void supabase.auth.signOut();
  const tabClass = (active: boolean) => `min-h-11 shrink-0 cursor-pointer border-b-2 px-4 text-[11px] uppercase tracking-[0.16em] ${active ? "border-[#c9a84c] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`;
  const section = SECTIONS.find((s) => s.key === tab);

  if (access !== "admin") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 py-12">
        <Link to="/" aria-label="The Imperial Palace, home"><Logo alt="The Imperial Palace" className="h-20 md:h-24" /></Link>
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

  return (
    <div className="min-h-dvh">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
          <span className="flex items-center gap-3">
            <Logo alt="The Imperial Palace" className="h-11" />
            <span className="hidden border-l border-border pl-3 font-serif text-sm uppercase tracking-[0.18em] sm:inline">Admin panel</span>
          </span>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className={`${BTN.outline} px-4`}>View website</Link>
            <button type="button" onClick={signOut} aria-label="Sign out" className="flex h-11 w-11 cursor-pointer items-center justify-center"><LogOut className="h-5 w-5" /></button>
          </div>
        </div>
        <nav aria-label="Admin sections" className="mx-auto flex max-w-5xl overflow-x-auto px-3">
          <button type="button" onClick={() => setTab("enquiries")} className={tabClass(tab === "enquiries")}>Enquiries</button>
          {SECTIONS.map((s) => <button key={s.key} type="button" onClick={() => setTab(s.key)} className={tabClass(tab === s.key)}>{s.label}</button>)}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        {section ? <ContentEditor key={section.key} def={section} /> : <EnquiriesPanel />}
      </main>
    </div>
  );
}
