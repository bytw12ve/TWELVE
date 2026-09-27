import Image from 'next/image'

import type { AppScreen as Screen } from '@/types/content'

import styles from './AppScreen.module.css'

/**
 * A real screen from the 402, captured from the app (docs/DESIGN.md §5.7).
 * Decorative copies pass alt="" and sit inside an aria-hidden wrapper.
 */
export function AppScreen({
  screen,
  className,
  sizes = '(max-width: 860px) 70vw, 340px',
  priority = false,
  decorative = false,
}: {
  screen: Screen
  className?: string
  sizes?: string
  priority?: boolean
  decorative?: boolean
}) {
  return (
    <Image
      src={screen.src}
      alt={decorative ? '' : screen.alt}
      width={screen.width}
      height={screen.height}
      sizes={sizes}
      priority={priority}
      className={[styles.screen, className].filter(Boolean).join(' ')}
    />
  )
}
