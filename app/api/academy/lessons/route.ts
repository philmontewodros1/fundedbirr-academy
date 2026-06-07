import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
  const { searchParams } = new URL(req.url)
  const course_id = searchParams.get('course_id')

  if (!course_id) {
    return NextResponse.json({ error: 'course_id is required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('academy_lessons')
    .select('id, title, order_num')
    .eq('course_id', course_id)
    .order('order_num')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data || [])
}
