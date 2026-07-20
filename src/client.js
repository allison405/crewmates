import { createClient } from '@supabase/supabase-js';

const URL = 'https://jwhqdwxjtvdiqvgkxtve.supabase.co';
const API_KEY = 'sb_publishable_ColHhIkcLtYr4Nq8irz95g_IOIjyZ5n';

export const supabase = createClient(URL, API_KEY);