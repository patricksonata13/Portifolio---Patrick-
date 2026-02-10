const SUPABASE_URL = "https://aawmgvvmwejikqetachl.supabase.co";
const SUPABASE_KEY = "sb_publishable_jYtoTTK_HZiMukDLA1mrsA_I2G4cio9";

if (typeof supabase === 'undefined') {
    console.error("Erro crítico: Biblioteca Supabase não carregada no HTML!");
} else {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { 
            persistSession: true, 
            autoRefreshToken: true 
        }
    });
    console.log("Supabase conectado com sucesso.");
}
