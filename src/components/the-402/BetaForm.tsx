'use client'

import { useRef, useState, type FormEvent } from 'react'

import styles from './BetaForm.module.css'

type Copy = {
  email: string
  placeholder: string
  phone: string
  ios: string
  android: string
  submit: string
  sending: string
  fine: string
  invalid: string
  failed: string
  done: string
  doneBody: string
  doneBodyPlain: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? '')

/**
 * The beta signup (docs/DESIGN.md §6.4). A real form that posts to
 * /api/beta without JavaScript; with it, it submits in place and shows each
 * state. The no-JavaScript results are :target blocks, so the page stays static.
 */
export function BetaForm({ copy, contactEmail }: { copy: Copy; contactEmail: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'invalid' | 'error' | 'done'>('idle')
  const [sent, setSent] = useState({ email: '', platform: '' })
  const emailRef = useRef<HTMLInputElement>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending') return
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const os = String(data.get('os') ?? 'ios')
    if (!EMAIL.test(email)) {
      setState('invalid')
      emailRef.current?.focus()
      return
    }
    setState('sending')
    try {
      const response = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, os, company: String(data.get('company') ?? '') }),
      })
      const { result } = (await response.json()) as { result?: string }
      if (result === 'ok') {
        setSent({ email, platform: os === 'android' ? copy.android : copy.ios })
        setState('done')
      } else if (result === 'invalid') {
        setState('invalid')
        emailRef.current?.focus()
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className={`${styles.card} ${styles.done}`} role="status">
        <span className={styles.ok} aria-hidden="true">
          <Check />
        </span>
        <p className={styles.doneHeading}>{copy.done}</p>
        <p className={styles.doneBody}>{fill(copy.doneBody, sent)}</p>
      </div>
    )
  }

  return (
    <form className={styles.card} action="/api/beta" method="post" onSubmit={submit} noValidate>
      {/* No-JavaScript results: the handler redirects to #beta-ok / -invalid / -error. */}
      <div id="beta-ok" className={styles.target} role="status">
        <p className={styles.doneHeading}>{copy.done}</p>
        <p className={styles.doneBody}>{copy.doneBodyPlain}</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="beta-email" className={styles.label}>
          {copy.email}
        </label>
        <input
          ref={emailRef}
          id="beta-email"
          className={styles.input}
          type="email"
          name="email"
          placeholder={copy.placeholder}
          autoComplete="email"
          required
          aria-invalid={state === 'invalid' || undefined}
          aria-describedby={state === 'invalid' ? 'beta-invalid' : undefined}
        />
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>{copy.phone}</legend>
        <div className={styles.seg}>
          <input type="radio" id="beta-ios" name="os" value="ios" defaultChecked className={styles.radio} />
          <label htmlFor="beta-ios" className={styles.choice}>
            <Apple />
            {copy.ios}
          </label>
          <input type="radio" id="beta-android" name="os" value="android" className={styles.radio} />
          <label htmlFor="beta-android" className={styles.choice}>
            <Android />
            {copy.android}
          </label>
        </div>
      </fieldset>

      {/* Hidden from people, tempting to bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="beta-company">Company</label>
        <input id="beta-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p id="beta-invalid" className={`${styles.error} ${state === 'invalid' ? '' : styles.target}`} role="alert">
        {copy.invalid}
      </p>
      <p id="beta-error" className={`${styles.error} ${state === 'error' ? '' : styles.target}`} role="alert">
        {fill(copy.failed, { email: contactEmail })}
      </p>

      <button type="submit" className={styles.submit} disabled={state === 'sending'}>
        {state === 'sending' ? copy.sending : copy.submit}
      </button>
      <p className={styles.fine}>{copy.fine}</p>
    </form>
  )
}

function Check() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  )
}

export function Apple({ className }: { className?: string }) {
  return (
    <svg className={className ?? styles.glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8C7 7.4 5.6 8.3 4.8 9.7c-1.6 2.8-.4 6.9 1.2 9.1.8 1.1 1.7 2.3 2.8 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.2-2.6 0 0-2.4-.9-2.4-3.7zM14.1 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3z" />
    </svg>
  )
}

export function Android({ className }: { className?: string }) {
  return (
    <svg className={className ?? styles.glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 9h12v8a1 1 0 0 1-1 1h-1v3h-2v-3h-4v3H8v-3H7a1 1 0 0 1-1-1V9zm1.5-1a4.5 4.5 0 0 1 9 0h-9zM10 6.2a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2zm4 0a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2zM3.5 9.5a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm15 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5z" />
    </svg>
  )
}

export function GooglePlay({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 2.8c-.3.2-.4.6-.4 1v16.4c0 .4.2.8.4 1l9.2-9.2L4 2.8zm10.3 9.2 2.6 2.6-11 6.3 8.4-8.9zm0 0L5.9 3.1l11 6.3-2.6 2.6zm3.8-2 3 1.7c.8.5.8 1.2 0 1.7l-3 1.7-2.8-2.8 2.8-2.3z" />
    </svg>
  )
}
