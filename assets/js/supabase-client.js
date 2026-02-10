// Configuração Global Supabase - Ecossistema Patrick Sonata
const SUPABASE_URL = "https://aawmgvvmwejikqetachl.supabase.co";
const SUPABASE_KEY = "sb_publishable_jYtoTTK_HZiMukDLA1mrsA_I2G4cio9";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Exporta para uso global
window.supabaseClient = _supabase;

async function checkAuth() {
    const { data: { user } } = await _supabase.auth.getUser();
    return user;
}
