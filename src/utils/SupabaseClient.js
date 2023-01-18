import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SupabaseClient = createClient(supabaseUrl, supabaseSecretKey);
export default SupabaseClient;
