import { generateWorld, toLayers } from '@/lib/pixelWorld'

import styles from './BeforeTwelve.module.css'

type Chip = readonly [string, string]

/**
 * About's "Before twelve." band — docs/DESIGN.md §5.2. The site's own pixel
 * world (server-rendered, seed 402) with a ticker of what Jaycee made growing
 * up. The ticker is a real list; its repeat, which makes the loop seamless,
 * is aria-hidden. It pauses while hovered or focused (§7.5).
 */
export function BeforeTwelve({
  title,
  line,
  hint,
  listLabel,
  chips,
}: {
  title: string
  line: string
  hint: string
  listLabel: string
  chips: readonly Chip[]
}) {
  const world = generateWorld('about')
  const width = world.cols * world.cell
  const height = world.rows * world.cell
  const chip = ([plain, strong]: Chip) => (
    <>
      {plain} <b>{strong}</b>
    </>
  )
  return (
    <section className={styles.band} aria-labelledby="before-twelve">
      <svg
        className={styles.world}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {toLayers(world.base, world.cell).map((layer) => (
          <path key={layer.fill} d={layer.d} fill={layer.fill} />
        ))}
        <g className={styles.clouds}>
          {toLayers(world.clouds, world.cell).map((layer) => (
            <path key={layer.fill} d={layer.d} fill={layer.fill} />
          ))}
        </g>
      </svg>
      <div className={styles.cap}>
        <div>
          <h2 id="before-twelve" className={styles.title}>
            {title}
          </h2>
          <p className={styles.line}>{line}</p>
        </div>
        <span className={styles.hint}>{hint}</span>
      </div>
      <div className={styles.ticker} tabIndex={0} aria-label={listLabel}>
        <div className={styles.row}>
          <ul className={styles.list}>
            {chips.map((c) => (
              <li key={c.join(' ')} className={styles.chip}>
                {chip(c)}
              </li>
            ))}
          </ul>
          <ul className={styles.list} aria-hidden="true">
            {chips.map((c) => (
              <li key={c.join(' ')} className={styles.chip}>
                {chip(c)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
