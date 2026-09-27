import { NextResponse, type NextRequest } from 'next/server'

import { site } from '@/lib/site'

/**
 * The 402 beta signup — the one route handler (docs/BUILD.md §Contact).
 *
 * Emails each signup to the studio through Resend; stores nothing. Accepts a
 * plain form post (no JavaScript: answers with a 303 back to the page, where
 * a :target block shows the result) or JSON (the enhanced form).
 */

const MAX_BODY = 2048
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PLATFORMS = { ios: 'iPhone', android: 'Android' } as const
type Result = 'ok' | 'invalid' | 'error'

function respond(request: NextRequest, json: boolean, result: Result) {
  if (json) {
    const status = result === 'ok' ? 200 : result === 'invalid' ? 400 : 502
    return NextResponse.json({ result }, { status })
  }
  return NextResponse.redirect(new URL(`/work/the-402#beta-${result}`, request.url), 303)
}

export async function POST(request: NextRequest) {
  const json = (request.headers.get('content-type') ?? '').includes('application/json')

  const body = await request.text()
  if (body.length > MAX_BODY) return respond(request, json, 'invalid')

  let fields: Record<string, unknown>
  try {
    fields = json ? (JSON.parse(body) as Record<string, unknown>) : Object.fromEntries(new URLSearchParams(body))
  } catch {
    return respond(request, json, 'invalid')
  }

  // The honeypot: a field people never see. Anything that fills it is a bot;
  // it is told "ok" and nothing is sent.
  if (typeof fields.company === 'string' && fields.company.trim() !== '') return respond(request, json, 'ok')

  const email = typeof fields.email === 'string' ? fields.email.trim() : ''
  const os = typeof fields.os === 'string' ? fields.os : ''
  if (email.length > 254 || !EMAIL.test(email) || !(os in PLATFORMS)) return respond(request, json, 'invalid')
  const platform = PLATFORMS[os as keyof typeof PLATFORMS]

  const key = process.env.RESEND_API_KEY
  if (!key) return respond(request, json, 'error')

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: site.betaSender,
        to: [site.email],
        reply_to: email,
        subject: `402 beta: ${platform}`,
        text: `New beta signup.\n\nEmail: ${email}\nPhone: ${platform}\n`,
      }),
      signal: AbortSignal.timeout(8000),
    })
    return respond(request, json, sent.ok ? 'ok' : 'error')
  } catch {
    return respond(request, json, 'error')
  }
}
