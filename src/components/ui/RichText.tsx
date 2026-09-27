import Link from 'next/link'
import type { ReactNode } from 'react'

import type { RichText as Rich } from '@/types/content'

/**
 * Renders a run of copy with its links and emphasis. `markClassName` styles
 * the highlighted phrases; internal links use next/link.
 */
export function RichText({ text, markClassName }: { text: Rich; markClassName?: string }): ReactNode {
  return text.map((segment, i) => {
    if (typeof segment === 'string') return segment
    if ('href' in segment) {
      return segment.href.startsWith('/') ? (
        <Link key={i} href={segment.href}>
          {segment.text}
        </Link>
      ) : (
        <a key={i} href={segment.href}>
          {segment.text}
        </a>
      )
    }
    if ('mark' in segment)
      return (
        <em key={i} className={markClassName}>
          {segment.text}
        </em>
      )
    return <b key={i}>{segment.text}</b>
  })
}
