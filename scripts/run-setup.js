#!/usr/bin/env node
// Run: node scripts/run-setup.js
// Requires DATABASE_URL env var or SUPABASE_DB_PASSWORD

const https = require('https')

async function getDbUrl() {
  const url = process.env.DATABASE_URL
  if (url) return url

  const projectRef = 'nbulfiypyhnyswawsrbm'
  const pwd = process.env.SUPABASE_DB_PASSWORD
  if (pwd) {
    return `postgresql://postgres:${encodeURIComponent(pwd)}@db.${projectRef}.supabase.co:5432/postgres`
  }

  return null
}

async function main() {
  const dbUrl = await getDbUrl()
  if (!dbUrl) {
    console.log('')
    console.log('No DATABASE_URL found. Two options:')
    console.log('')
    console.log('Option 1 — Add DATABASE_URL to Vercel, then curl:')
    console.log('  curl https://fundedbirracademy.vercel.app/api/setup-db')
    console.log('')
    console.log('Option 2 — Run SQL manually in Supabase Dashboard:')
    console.log('  1. Go to https://supabase.com/dashboard/project/nbulfiypyhnyswawsrbm/sql/new')
    console.log('  2. Paste the contents of scripts/setup-schema.sql')
    console.log('  3. Click "Run"')
    console.log('')
    return
  }

  console.log('Connecting to database...')
  const { Client } = require('pg')
  const client = new Client({ connectionString: dbUrl })
  await client.connect()
  console.log('Connected. Creating schema...')

  const fs = require('fs')
  const path = require('path')
  const sql = fs.readFileSync(path.join(__dirname, 'setup-schema.sql'), 'utf8')

  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0)
  for (const stmt of statements) {
    await client.query(stmt + ';')
    console.log('  ✓', stmt.split('\n')[0].substring(0, 60))
  }

  await client.end()
  console.log('')
  console.log('Schema created and courses seeded!')
  console.log('')
  console.log('Next: Set yourself as admin:')
  console.log(`  curl -X POST https://fundedbirracademy.vercel.app/api/auth/make-admin \\
    -H "Content-Type: application/json" \\
    -d '{"email":"YOUR_EMAIL"}'`)
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
