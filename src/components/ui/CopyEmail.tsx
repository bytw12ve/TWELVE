'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './CopyEmail.module.css'

/**
 * The address as a real mailto link, and a button that copies it and confirms
 * (docs/DESIGN.md §7.5). If the clipboard is refused, the address is selected
 * so it can be copied by hand.
 */
export function CopyEmail({
  email,
  label,
  done,
  className,
  addressClassName,
  buttonClassName,
}: {
  email: string
  label: string
  done: string
  className?: string
  addressClassName?: string
  buttonClassName?: string
}) {
  const [copied, setCopied] = useState(false)
  const addressRef = useRef<HTMLAnchorElement>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const confirm = () => {
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  const select = () => {
    const node = addressRef.current
    if (!node) return
    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      select()
    }
    confirm()
  }

  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')}>
      <a ref={addressRef} href={`mailto:${email}`} className={addressClassName}>
        {email}
      </a>
      <button type="button" className={buttonClassName} onClick={copy}>
        <span aria-live="polite">{copied ? done : label}</span>
      </button>
    </div>
  )
}
