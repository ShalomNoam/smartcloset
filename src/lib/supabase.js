import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// TODO: remove after debugging
console.log('[supabase] URL defined:', !!supabaseUrl,    '| value:', supabaseUrl)
console.log('[supabase] KEY defined:', !!supabaseAnonKey, '| first 10 chars:', supabaseAnonKey?.slice(0, 10))

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
