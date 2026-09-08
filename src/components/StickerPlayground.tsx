import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React, { useCallback, useState } from 'react'

interface Sticker {
  id: number
  text: string
  x: number
  y: number
  rotation: number
  bg: string
  color: string
  borderColor: string
}

const STICKER_POOL = [
  'Task ✓',
  'Feedback?',
  'Deadline!',
  'Iterate ↻',
  'Ship it ✓',
  'One more pixel',
  'WIP',
  'User first',
]

const STICKER_THEMES = [
  { bg: '#fef9c3', color: '#713f12', borderColor: '#fde047' }, // Soft yellow
  { bg: '#f3e8ff', color: '#581c87', borderColor: '#e9d5ff' }, // Soft lavender
  { bg: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }, // Soft mint
  { bg: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }, // Soft blue
  { bg: '#fff1f2', color: '#9f1239', borderColor: '#fecdd3' }, // Soft peach
  { bg: '#18181b', color: '#ffffff', borderColor: '#27272a' }, // Dark pill
  { bg: '#ffffff', color: '#090909', borderColor: '#e4e4e7' }, // Crisp paper
]

interface StickerPlaygroundProps {
  children: React.ReactNode
  className?: string
}

export function StickerPlayground({ children, className = '' }: StickerPlaygroundProps) {
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [poolIndex, setPoolIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary click / tap
    if (e.button !== 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const rawX = e.clientX - rect.left
    const rawY = e.clientY - rect.top

    // Clamp coordinates so stickers stay comfortably inside illustration bounds
    const x = Math.max(55, Math.min(rawX, rect.width - 55))
    const y = Math.max(28, Math.min(rawY, rect.height - 28))

    const text = STICKER_POOL[poolIndex % STICKER_POOL.length]
    const theme = STICKER_THEMES[Math.floor(Math.random() * STICKER_THEMES.length)]
    const rotation = (Math.random() - 0.5) * 16 // -8deg to +8deg

    const newSticker: Sticker = {
      id: Date.now() + Math.random(),
      text,
      x,
      y,
      rotation,
      bg: theme.bg,
      color: theme.color,
      borderColor: theme.borderColor,
    }

    setPoolIndex((prev) => prev + 1)
    setHasInteracted(true)

    setStickers((prev) => {
      // Keep max 5 stickers: retain 4 newest and append the new one
      const updated = prev.length >= 5 ? prev.slice(prev.length - 4) : prev
      return [...updated, newSticker]
    })
  }, [poolIndex])

  return (
    <div
      className={`intro-bg-video-wrapper ${className}`}
      onPointerDown={handlePointerDown}
      role="region"
      aria-label="Interactive illustration playground"
    >
      {children}

      <AnimatePresence>
        {!hasInteracted && (
          <motion.span
            className="sticker-hint-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <span className="hint-desktop">click around :)</span>
            <span className="hint-mobile">tap around :)</span>
          </motion.span>
        )}
      </AnimatePresence>

      <div className="stickers-container" aria-hidden="true">
        <AnimatePresence>
          {stickers.map((st) => (
            <motion.span
              key={st.id}
              className="sticker-item"
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.7,
                rotate: shouldReduceMotion ? 0 : st.rotation,
              }}
              animate={{
                opacity: 1,
                scale: shouldReduceMotion ? 1 : [0.7, 1.05, 1],
                rotate: shouldReduceMotion ? 0 : st.rotation,
              }}
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.85,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.25,
                times: [0, 0.7, 1],
                ease: 'easeOut',
              }}
              style={{
                left: st.x,
                top: st.y,
                backgroundColor: st.bg,
                color: st.color,
                borderColor: st.borderColor,
              }}
            >
              {st.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
