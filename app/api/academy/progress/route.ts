import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get('user_id')
  const course_id = searchParams.get('course_id')

  if (!user_id || !course_id) {
    return NextResponse.json({ error: 'user_id and course_id are required' }, { status: 400 })
  }

  const { data: lessons } = await supabaseAdmin
    .from('academy_lessons')
    .select('id, title, order_num')
    .eq('course_id', course_id)
    .order('order_num')

  const { data: completed } = await supabaseAdmin
    .from('academy_progress')
    .select('lesson_id')
    .eq('user_id', user_id)

  const completedIds = new Set((completed || []).map(c => c.lesson_id))
  const total = lessons?.length || 0
  const done = completed?.length || 0

  return NextResponse.json({
    total,
    completed_count: done,
    percentage: total > 0 ? Math.round((done / total) * 100) : 0,
    lessons: (lessons || []).map(l => ({
      ...l,
      completed: completedIds.has(l.id)
    }))
  })
}

export async function POST(req: NextRequest) {
  const { user_id, lesson_id, course_id } = await req.json()

  if (!user_id || !lesson_id || !course_id) {
    return NextResponse.json({ error: 'user_id, lesson_id, and course_id are required' }, { status: 400 })
  }

  const { error: progressError } = await supabaseAdmin
    .from('academy_progress')
    .upsert({ user_id, lesson_id, completed: true, completed_at: new Date().toISOString() })

  if (progressError) return NextResponse.json({ error: progressError.message }, { status: 500 })

  const { data: lessons } = await supabaseAdmin
    .from('academy_lessons')
    .select('id')
    .eq('course_id', course_id)

  const { data: completed } = await supabaseAdmin
    .from('academy_progress')
    .select('lesson_id')
    .eq('user_id', user_id)

  const total = lessons?.length || 0
  const done = completed?.length || 0
  const isComplete = total > 0 && done >= total

  if (isComplete) {
    await supabaseAdmin
      .from('academy_enrollments')
      .update({ completed_at: new Date().toISOString() })
      .eq('user_id', user_id)
      .eq('course_id', course_id)
  }

  return NextResponse.json({
    success: true,
    percentage: total > 0 ? Math.round((done / total) * 100) : 0,
    course_completed: isComplete
  })
}
