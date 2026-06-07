import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get('user_id')

  const { data: courses, error } = await supabaseAdmin
    .from('academy_courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  let enrollments: any[] = []
  if (user_id) {
    const { data: enr } = await supabaseAdmin
      .from('academy_enrollments')
      .select('course_id, payment_status, completed_at')
      .eq('user_id', user_id)
    enrollments = enr || []
  }

  const enrolledMap = new Map(enrollments.map(e => [e.course_id, e]))

  const result = (courses || []).map(c => ({
    ...c,
    enrolled: enrolledMap.has(c.id),
    payment_status: enrolledMap.get(c.id)?.payment_status || null,
    completed: !!enrolledMap.get(c.id)?.completed_at
  }))

  return NextResponse.json({ courses: result })
}
