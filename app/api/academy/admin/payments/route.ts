import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { requireAcademyAdmin } from '@/lib/admin-guard-academy'

export async function GET(req: NextRequest) {
  const auth = await requireAcademyAdmin(req)
  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('academy_payments')
    .select(`*, academy_users(full_name, email), academy_courses(title, price_etb)`)
    .eq('status', 'pending')
    .order('submitted_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ payments: data })
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAcademyAdmin(req)
  const supabaseAdmin = getSupabaseAdmin()
  const { payment_id, action, rejection_reason } = await req.json()

  const { data: payment } = await supabaseAdmin
    .from('academy_payments')
    .select('*')
    .eq('id', payment_id)
    .single()

  if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 })

  if (action === 'approve') {
    await supabaseAdmin.from('academy_payments').update({ status: 'approved', approved_at: new Date().toISOString() }).eq('id', payment_id)

    await supabaseAdmin.from('academy_enrollments').upsert({
      user_id: payment.user_id,
      course_id: payment.course_id,
      payment_tx_ref: payment.telebirr_tx_ref,
      payment_status: 'paid',
      enrolled_at: new Date().toISOString()
    })

    if (payment.course_id === 'bootcamp') {
      const paidCourses = ['forex-fundamentals', 'gold-mastery', 'risk-management', 'market-structure']
      for (const courseId of paidCourses) {
        await supabaseAdmin.from('academy_enrollments').upsert({
          user_id: payment.user_id,
          course_id: courseId,
          payment_tx_ref: payment.telebirr_tx_ref,
          payment_status: 'paid'
        })
      }
    }

    return NextResponse.json({ success: true, message: 'Payment approved, student enrolled.' })
  }

  if (action === 'reject') {
    await supabaseAdmin.from('academy_payments').update({ status: 'rejected', rejection_reason }).eq('id', payment_id)
    return NextResponse.json({ success: true, message: 'Payment rejected.' })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
