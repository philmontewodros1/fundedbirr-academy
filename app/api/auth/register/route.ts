import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { fullName, email, phone, password } = await req.json()

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'Full name, email, and password are required.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }

    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 })
      }
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    const userId = authUser.user.id

    const { error: profileError } = await supabaseAdmin.from('users').upsert({
      id: userId,
      email,
      full_name: fullName,
      phone: phone || null,
      is_admin: false,
    }, { onConflict: 'id' })

    if (profileError) {
      console.error('Profile insert error:', profileError)
    }

    const { data: signInData, error: signInError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
    })

    if (!signInError && signInData?.properties?.action_link) {
    }

    return NextResponse.json({
      success: true,
      user: { id: userId, email, full_name: fullName, is_admin: false },
      message: 'Account created successfully. You can now sign in.',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
