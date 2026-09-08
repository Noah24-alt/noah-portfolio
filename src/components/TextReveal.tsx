import { motion, useReducedMotion, type Transition, type Variants } from 'framer-motion'
import React from 'react'

export const EDITORIAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const PAGE_EXIT_TRANSITION: Transition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
}

interface MaskedLineProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
  as?: 'span' | 'div'
  viewportTrigger?: boolean
}

export function MaskedLine({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  className = '',
  innerClassName = '',
  style,
  as: Component = 'span',
  viewportTrigger = false,
}: MaskedLineProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: shouldReduceMotion ? 0.2 : duration,
          ease: EDITORIAL_EASE,
          delay: shouldReduceMotion ? 0 : delay,
        },
        opacity: {
          duration: shouldReduceMotion ? 0.2 : Math.min(duration * 0.75, 0.6),
          ease: 'easeOut',
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    },
  }

  const animProps = viewportTrigger
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      }

  return (
    <Component className={`reveal-line-mask ${className}`} style={style}>
      <motion.span
        className={`reveal-line-inner ${innerClassName}`}
        variants={variants}
        {...animProps}
      >
        {children}
      </motion.span>
    </Component>
  )
}

interface HighlightedWordProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  style?: React.CSSProperties
}

export function HighlightedWord({
  children,
  delay = 0.08,
  duration = 0.75,
  yOffset = 16,
  className = '',
  style,
}: HighlightedWordProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: shouldReduceMotion ? 0.2 : duration,
          ease: EDITORIAL_EASE,
          delay: shouldReduceMotion ? 0 : delay,
        },
        opacity: {
          duration: shouldReduceMotion ? 0.2 : 0.5,
          ease: 'easeOut',
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    },
  }

  return (
    <motion.span
      className={`reveal-highlight-word ${className}`}
      style={style}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.span>
  )
}

interface FadeUpRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  style?: React.CSSProperties
  viewportTrigger?: boolean
}

export function FadeUpReveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 16,
  className = '',
  style,
  viewportTrigger = false,
}: FadeUpRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: shouldReduceMotion ? 0.2 : duration,
          ease: EDITORIAL_EASE,
          delay: shouldReduceMotion ? 0 : delay,
        },
        opacity: {
          duration: shouldReduceMotion ? 0.2 : Math.min(duration * 0.8, 0.48),
          ease: 'easeOut',
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    },
  }

  const animProps = viewportTrigger
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.15 },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      }

  return (
    <motion.div
      className={`reveal-fade-up ${className}`}
      style={style}
      variants={variants}
      {...animProps}
    >
      {children}
    </motion.div>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  className?: string
  style?: React.CSSProperties
  amount?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 20,
  className = '',
  style,
  amount = 0.15,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: shouldReduceMotion ? 0.2 : duration,
          ease: EDITORIAL_EASE,
          delay: shouldReduceMotion ? 0 : delay,
        },
        opacity: {
          duration: shouldReduceMotion ? 0.2 : 0.55,
          ease: 'easeOut',
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    },
  }

  return (
    <motion.div
      className={`reveal-scroll ${className}`}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}
