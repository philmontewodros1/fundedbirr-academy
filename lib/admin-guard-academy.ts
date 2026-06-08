import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import type { NextRequest } from 'next/server'

export async function requireAcademyAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) as never
  }

  const supabaseAdmin = getSupabaseAdmin()
  const { data: { user: authUser }, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) as never
  }

  const { data: profile } = await supabaseAdmin
    .from('academy_users')
    .select('is_admin')
    .eq('id', authUser.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 }) as never
  }

  return authUser
}
