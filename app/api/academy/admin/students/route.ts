import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { requireAcademyAdmin } from '@/lib/admin-guard-academy'

export async function GET(req: NextRequest) {
  const auth = await requireAcademyAdmin(req)
  const supabaseAdmin = getSupabaseAdmin()

  const { data: users, error: usersError } = await supabaseAdmin
    .from('academy_users')
    .select('id, email, full_name, phone, is_admin, created_at')
    .order('created_at', { ascending: false })

  if (usersError) return NextResponse.json({ error: usersError.message }, { status: 500 })

  const { data: enrollments } = await supabaseAdmin
    .from('academy_enrollments')
    .select('user_id, course_id, payment_status, enrolled_at, academy_courses(title)')

  const enrollmentsByUser: Record<string, any[]> = {}
  for (const e of enrollments || []) {
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = []
    enrollmentsByUser[e.user_id].push(e)
  }

  const students = (users || []).map((u: any) => ({
    ...u,
    enrollments: enrollmentsByUser[u.id] || [],
  }))

  return NextResponse.json({ students })
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAcademyAdmin(req)
  const supabaseAdmin = getSupabaseAdmin()
  const { user_id, is_admin } = await req.json()

  const { error } = await supabaseAdmin
    .from('academy_users')
    .update({ is_admin })
    .eq('id', user_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
