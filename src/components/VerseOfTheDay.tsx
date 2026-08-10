import { useState, useEffect } from 'react'
import { getVerseOfTheDay } from '../lib/bible'

/**
 * Verse of the Day widget
 *
 * Displays a deterministically selected verse based on the current date.
 * Uses a curated list of ~100 encouraging verses (see lib/bible.ts).
 * Styled to match the ACK Berea Church design system:
 * - Fraunces serif for verse text
 * - Inter sans-serif for reference/attribution
 * - Warm offwhite (#F7F5F1) background with gold (#C9A24B) accents
 * - Generous whitespace, no harsh borders
 */
export default function VerseOfTheDay() {
  const [verse, setVerse] = useState<{ reference: string; text: string } | null>(null)

  useEffect(() => {
    setVerse(getVerseOfTheDay())
  }, [])

  if (!verse) return null

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #22201D 0%, #1a1815 100%)',
        borderRadius: 16,
        padding: 'clamp(2rem, 5vw, 3.5rem)',
      }}
    >
      {/* Decorative gold accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10"
        style={{
          background: 'radial-gradient(circle at top right, #C9A24B, transparent 70%)',
        }}
      />

      {/* Eyebrow */}
      <div
        className="text-xs uppercase tracking-[0.25em] mb-4"
        style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}
      >
        Verse of the Day
      </div>

      {/* Date */}
      <div
        className="text-sm mb-6"
        style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}
      >
        {dateStr}
      </div>

      {/* Verse text — Fraunces serif for warmth and gravitas */}
      <blockquote
        className="mb-6"
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.5,
          color: '#F7F5F1',
          margin: 0,
          maxWidth: '60ch',
        }}
      >
        &ldquo;{verse.text}&rdquo;
      </blockquote>

      {/* Reference */}
      <div
        className="flex items-center gap-3"
      >
        <span
          className="regency-rule"
          style={{ borderColor: '#C9A24B', width: 40 }}
        />
        <span
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#C9A24B',
          }}
        >
          {verse.reference}
        </span>
        <span
          className="text-xs"
          style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}
        >
          (KJV)
        </span>
      </div>

      {/* Attribution */}
      <div
        className="mt-6 text-[10px]"
        style={{ color: 'rgba(184,178,168,0.5)', fontFamily: 'Inter, sans-serif' }}
      >
        Scripture quotations marked (KJV) are from the King James Version, public domain.
      </div>
    </div>
  )
}
