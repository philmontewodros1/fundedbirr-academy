import { NextResponse } from 'next/server'

const SQL = `
create table if not exists academy_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  is_admin boolean default false,
  created_at timestamp default now()
);

create table if not exists academy_courses (
  id text primary key,
  title text not null,
  description text,
  price_etb numeric default 0,
  is_free boolean default false,
  lessons_count int default 0,
  duration_minutes int default 0,
  category text,
  is_published boolean default true,
  created_at timestamp default now()
);

create table if not exists academy_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id text references academy_courses(id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  order_num int,
  duration_minutes int default 0,
  is_free_preview boolean default false
);

create table if not exists academy_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references academy_users(id) on delete cascade,
  course_id text references academy_courses(id) on delete cascade,
  payment_tx_ref text,
  payment_status text default 'pending',
  enrolled_at timestamp default now(),
  completed_at timestamp,
  unique(user_id, course_id)
);

create table if not exists academy_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references academy_users(id) on delete cascade,
  lesson_id uuid references academy_lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamp,
  unique(user_id, lesson_id)
);

create table if not exists academy_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references academy_users(id) on delete cascade,
  course_id text references academy_courses(id) on delete cascade,
  amount_etb numeric,
  telebirr_tx_ref text,
  telebirr_phone text,
  status text default 'pending',
  rejection_reason text,
  submitted_at timestamp default now(),
  approved_at timestamp
);

insert into academy_courses (id, title, description, price_etb, is_free, lessons_count, duration_minutes, category) values
('intro-forex', 'What is Forex Trading?', 'The complete beginner guide to forex markets.', 0, true, 5, 45, 'beginner'),
('intro-gold', 'Introduction to Gold (XAUUSD)', 'Why traders focus on gold and how to read XAUUSD.', 0, true, 4, 35, 'beginner'),
('candlesticks', 'Reading Candlestick Charts', 'Master price action and candlestick patterns.', 0, true, 6, 55, 'beginner'),
('forex-fundamentals', 'Forex Fundamentals', 'Deep dive into currency pairs, pips, leverage, and margin.', 500, false, 12, 180, 'beginner'),
('gold-mastery', 'Gold Trading Mastery', 'Complete XAUUSD trading system with market structure.', 1500, false, 18, 300, 'intermediate'),
('risk-management', 'Risk Management & Psychology', 'Position sizing, drawdown control, and trader mindset.', 800, false, 10, 150, 'intermediate'),
('market-structure', 'Advanced Market Structure', 'HH/HL, BOS, CHoCH, supply and demand zones.', 2000, false, 15, 240, 'advanced'),
('bootcamp', 'Full Trading Bootcamp', 'All 4 paid courses bundled at the best price.', 4500, false, 55, 840, 'bundle'),
('certification', 'Certification Exam', 'Prove your knowledge and earn your certificate.', 500, false, 1, 60, 'exam')
on conflict (id) do nothing;
`

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    return NextResponse.json({
      error: 'DATABASE_URL not set. Add it to .env.local',
      hint: 'Get it from Supabase Dashboard → Project Settings → Database → Connection string (URI)',
      sql: SQL,
    })
  }

  try {
    const { Client } = await import('pg')
    const client = new Client({ connectionString: databaseUrl })
    await client.connect()

    const statements = SQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    for (const stmt of statements) {
      await client.query(stmt + ';')
    }

    await client.end()
    return NextResponse.json({ success: true, message: 'Schema created and courses seeded!' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
