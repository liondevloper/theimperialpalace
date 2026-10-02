import { createClient } from "@supabase/supabase-js";

// Publishable (anon) key: safe for the browser. Row Level Security limits it to inserting enquiries only.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://kpgcnlpxtyyfgaazbmmz.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_6lEHD9aFzhnRFuz5MMcx9g_575GRyfv";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
