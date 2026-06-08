import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const { data: user } = await supabaseAdmin
      .from('academy_users')
      .select('id, email, is_admin')
      .eq('email', email)
      .single()

    if (!user) {
      const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()
      const authUser = authUsers.users.find(u => u.email === email)
      if (!authUser) {
        return NextResponse.json({ error: 'User not found. They must register first.' }, { status: 404 })
      }
      await supabaseAdmin.from('academy_users').upsert({
        id: authUser.id,
        email,
        full_name: authUser.user_metadata?.full_name || email.split('@')[0],
        is_admin: true,
      })
    } else {
      await supabaseAdmin.from('academy_users').update({ is_admin: true }).eq('email', email)
    }

    return NextResponse.json({ success: true, message: `${email} is now an admin.` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
