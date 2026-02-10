const SUPABASE_URL = "https://aawmgvvmwejikqetachl.supabase.co";
const SUPABASE_KEY = "sb_publishable_jYtoTTK_HZiMukDLA1mrsA_I2G4cio9";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabaseClient;
