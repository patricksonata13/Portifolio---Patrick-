// Configurações do Supabase - PATIKA
const SB_URL = "SUA_URL_AQUI";
const SB_KEY = "SUA_CHAVE_ANON_AQUI";

// Inicialização do Cliente (Script injetado via CDN no HTML)
const supabase = supabase.createClient(SB_URL, SB_KEY);
