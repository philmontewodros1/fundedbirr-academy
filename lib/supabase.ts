import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null
let supabaseAdminInstance: SupabaseClient | null = null

const getUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL!
const getAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const getServiceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY!

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(getUrl(), getAnonKey())
  }
  return supabaseInstance
}

export function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(getUrl(), getServiceKey())
  }
  return supabaseAdminInstance
}
