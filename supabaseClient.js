// supabaseClient.js
// Reemplazá con los datos de TU proyecto (Project Settings > API Keys)
const SUPABASE_URL = 'https://pahxmvbewyehiupgchfn.supabase.co'; // sin /rest/v1/
const SUPABASE_KEY = 'sb_publishable_MQda_hOkXPnR-aUT0okviQ_vDPatuf-';

// Ojo: 'supabase' (minúscula) es la librería del CDN. Se saca createClient de window.supabase
// y se guarda la conexión en una constante: así no hay conflicto de nombres.
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);