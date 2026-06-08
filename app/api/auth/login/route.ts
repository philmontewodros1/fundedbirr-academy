import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const supabaseAdmin = (await import('@/lib/supabase')).getSupabaseAdmin()
    const { data: profile } = await supabaseAdmin
      .from('academy_users')
      .select('id, email, full_name, is_admin')
      .eq('id', data.user.id)
      .single()

    return NextResponse.json({
      success: true,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile?.full_name || data.user.user_metadata?.full_name || '',
        is_admin: profile?.is_admin || false,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
