import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { user_id, course_id, telebirr_tx_ref, telebirr_phone, amount_etb } = await req.json()

    if (!telebirr_tx_ref || !/^[A-Z0-9]{10}$/i.test(telebirr_tx_ref)) {
      return NextResponse.json({ error: 'Invalid transaction reference. Must be 10 alphanumeric characters.' }, { status: 400 })
    }

    if (!telebirr_phone || !/(^09|^251)\d{8,9}$/.test(telebirr_phone.replace(/\s/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 })
    }

    const { data: existing } = await supabaseAdmin
      .from('academy_payments')
      .select('id')
      .eq('telebirr_tx_ref', telebirr_tx_ref)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'This transaction reference has already been used.' }, { status: 400 })
    }

    const { data: enrollment } = await supabaseAdmin
      .from('academy_enrollments')
      .select('id')
      .eq('user_id', user_id)
      .eq('course_id', course_id)
      .single()

    if (enrollment) {
      return NextResponse.json({ error: 'You are already enrolled in this course.' }, { status: 400 })
    }

    const { data: payment, error } = await supabaseAdmin
      .from('academy_payments')
      .insert({ user_id, course_id, amount_etb, telebirr_tx_ref: telebirr_tx_ref.toUpperCase(), telebirr_phone, status: 'pending' })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, payment_id: payment.id, message: 'Payment submitted. You will receive access within 2 hours after verification.' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
