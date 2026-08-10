import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { useI18n } from './i18n'
import BiblePage from './components/BiblePage'
import VerseOfTheDay from './components/VerseOfTheDay'
import OrderOfService from './components/OrderOfService'
const BibleModel = lazy(() => import('./components/BibleModel'))

const API_URL = import.meta.env.VITE_API_URL || 'https://ack-berea-api.vercel.app'

type Page = 'home' | 'about' | 'sermons' | 'plan-visit' | 'give' | 'contact' | 'events' | 'ministries' | 'kama' | 'mothers-union' | 'sunday-school' | 'youth' | 'service-times' | 'leadership' | 'get-involved' | 'prayer-requests' | 'news' | 'gallery' | 'faq' | 'small-groups' | 'live' | 'testimonies' | 'bible' | 'outreach' | 'choir' | 'order-of-service'

// ─── Reeded Glass Nav ────────────────────────────────────────────────────────

function Nav({ page, go, goBack, goForward, canGoBack, canGoForward }: { page: Page; go: (p: Page) => void; goBack: () => void; goForward: () => void; canGoBack: boolean; canGoForward: boolean }) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links: [string, Page][] = [
    [t('nav.about'), 'about'],
    [t('nav.sermons'), 'sermons'],
    [t('nav.events'), 'events'],
    [t('nav.ministries'), 'ministries'],
    [t('nav.contact'), 'contact'],
  ]

  const moreLinks: [string, Page][] = [
    [t('menu.serviceTimes'), 'service-times'],
    [t('menu.leadership'), 'leadership'],
    [t('menu.getInvolved'), 'get-involved'],
    [t('menu.prayerRequests'), 'prayer-requests'],
    [t('menu.news'), 'news'],
    [t('menu.gallery'), 'gallery'],
    ['Bible', 'bible'],
    ['Order of Service', 'order-of-service'],
    ['Community Outreach', 'outreach'],
    ['Choir & Worship', 'choir'],
    [t('menu.smallGroups'), 'small-groups'],
    [t('menu.liveStream'), 'live'],
    [t('menu.testimonies'), 'testimonies'],
    [t('menu.faq'), 'faq'],
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px), rgba(247,245,241,${scrolled ? '0.88' : '0.12'})`
          : `repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.08)`,
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderBottom: scrolled ? '1px solid rgba(184,178,168,0.3)' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Back/Forward Buttons + Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              background: scrolled ? 'rgba(34,32,29,0.08)' : 'rgba(247,245,241,0.12)',
              border: `1px solid ${scrolled ? 'rgba(184,178,168,0.3)' : 'rgba(255,255,255,0.15)'}`,
            }}
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#22201D' : '#F7F5F1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed"
            style={{
              background: scrolled ? 'rgba(34,32,29,0.08)' : 'rgba(247,245,241,0.12)',
              border: `1px solid ${scrolled ? 'rgba(184,178,168,0.3)' : 'rgba(255,255,255,0.15)'}`,
            }}
            aria-label="Go forward"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#22201D' : '#F7F5F1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button
            onClick={() => go('home')}
            className="flex items-center gap-3"
          >
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(184,178,168,0.35)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-600 tracking-tight" style={{ color: scrolled ? '#22201D' : '#F7F5F1' }}>
              {t('nav.churchName')}
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: scrolled ? '#B8B2A8' : 'rgba(247,245,241,0.7)' }}>
              {t('nav.tolaParish')}
            </div>
          </div>
        </button>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-sm font-medium tracking-wide transition-opacity"
              style={{
                color: scrolled ? (page === id ? '#22201D' : '#B8B2A8') : (page === id ? '#F7F5F1' : 'rgba(247,245,241,0.65)'),
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="text-sm font-medium tracking-wide transition-opacity flex items-center gap-1.5"
              style={{
                color: scrolled ? (moreOpen ? '#22201D' : '#B8B2A8') : (moreOpen ? '#F7F5F1' : 'rgba(247,245,241,0.65)'),
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {t('nav.more')}
              <span style={{ transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-3 z-50 p-3 w-60"
                  style={{
                    background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.95)`,
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(184,178,168,0.3)',
                    borderRadius: 12,
                    boxShadow: '0 12px 40px rgba(34,32,29,0.15)',
                  }}
                >
                  {moreLinks.map(([label, id]) => (
                    <button
                      key={id}
                      onClick={() => { setMoreOpen(false); go(id) }}
                      className="block w-full text-left px-4 py-2.5 text-sm rounded-md transition-colors"
                      style={{
                        color: page === id ? '#1B4CE0' : '#22201D',
                        background: page === id ? 'rgba(27,76,224,0.08)' : 'transparent',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: page === id ? 600 : 400,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => go('plan-visit')}
            className="px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: '#1B4CE0',
              color: '#F7F5F1',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            {t('nav.planVisit')}
          </button>
        </nav>

        {/* Mobile Give CTA */}
        <button
          onClick={() => go('plan-visit')}
          className="md:hidden px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ background: '#1B4CE0', color: '#F7F5F1' }}
        >
          {t('nav.visit')}
        </button>
      </div>
    </header>
  )
}

// ─── Bottom Mobile Nav ───────────────────────────────────────────────────────

function BottomNav({ page, go, onMenu }: { page: Page; go: (p: Page) => void; onMenu: () => void }) {
  const { t } = useI18n()
  const items: { label: string; page: Page; icon: string; menu?: boolean }[] = [
    { label: t('nav.home'), page: 'home', icon: '⌂' },
    { label: t('nav.visit'), page: 'plan-visit', icon: '✦' },
    { label: t('nav.give'), page: 'give', icon: '❤' },
    { label: t('nav.watch'), page: 'sermons', icon: '▶' },
    { label: t('nav.menu'), page: 'about', icon: '≡', menu: true },
  ]

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.92)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(184,178,168,0.3)',
      }}
    >
      <div className="flex items-center justify-around h-[72px] pb-safe">
        {items.map((item) => (
          <button
            key={item.page}
            onClick={() => { if (item.menu) { onMenu() } else { go(item.page) } }}
            className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center"
            style={{ color: page === item.page ? '#1B4CE0' : '#B8B2A8' }}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile Menu Drawer ───────────────────────────────────────────────────────

function MobileMenu({ open, page, go, onClose }: { open: boolean; page: Page; go: (p: Page) => void; onClose: () => void }) {
  const { t } = useI18n()
  const groups: { title: string; items: [string, Page][] }[] = [
    {
      title: t('menu.explore'),
      items: [
        [t('menu.home'), 'home'],
        [t('menu.about'), 'about'],
        [t('menu.serviceTimes'), 'service-times'],
        [t('menu.planVisit'), 'plan-visit'],
        [t('menu.sermons'), 'sermons'],
        [t('menu.liveStream'), 'live'],
      ],
    },
    {
      title: t('menu.community'),
      items: [
        [t('menu.ministries'), 'ministries'],
        [t('menu.youth'), 'youth'],
        [t('menu.kama'), 'kama'],
        [t('menu.mothersUnion'), 'mothers-union'],
        [t('menu.sundaySchool'), 'sunday-school'],
        [t('menu.smallGroups'), 'small-groups'],
      ],
    },
    {
      title: t('menu.connect'),
      items: [
        [t('menu.getInvolved'), 'get-involved'],
        [t('menu.leadership'), 'leadership'],
        [t('menu.news'), 'news'],
        [t('menu.gallery'), 'gallery'],
        [t('menu.testimonies'), 'testimonies'],
        [t('menu.prayerRequests'), 'prayer-requests'],
        ['Community Outreach', 'outreach'],
        ['Choir & Worship', 'choir'],
        [t('menu.events'), 'events'],
        [t('menu.faq'), 'faq'],
        [t('menu.give'), 'give'],
        [t('menu.contact'), 'contact'],
      ],
    },
  ]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden overflow-y-auto" style={{ background: '#22201D' }}>
      <div className="absolute inset-0 chromatic-gradient opacity-20" />
      <div className="relative px-6 py-6 min-h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.4)' }}>
              <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
            </div>
            <div className="font-display text-lg font-600" style={{ color: '#F7F5F1' }}>
              {t('nav.churchName')}
              <div className="text-[10px] uppercase tracking-[0.15em] font-sans" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('nav.tolaParish')}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center"
            style={{ border: '1px solid rgba(247,245,241,0.25)', color: '#F7F5F1', fontSize: 20 }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {groups.map((g) => (
          <div key={g.title} className="mb-7">
            <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{g.title}</div>
            <div className="grid grid-cols-2 gap-1">
              {g.items.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => { go(id); onClose() }}
                  className="text-left px-4 py-3 text-sm transition-colors"
                  style={{
                    color: page === id ? '#E8A93B' : '#F7F5F1',
                    background: page === id ? 'rgba(232,169,59,0.1)' : 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid rgba(247,245,241,0.08)',
                    minHeight: 44,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-auto pt-6 text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
          {t('footer.address')}<br />{t('footer.phone')}
        </div>
      </div>
    </div>
  )
}

// ─── Regency Ornamental Divider ──────────────────────────────────────────────

function RegencyDivider() {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A24B, transparent)' }} />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full" style={{ background: '#C9A24B' }} />
        <div className="w-3 h-3 border border-gold rotate-45" style={{ borderColor: '#C9A24B' }} />
        <div className="text-xs" style={{ color: '#C9A24B' }}>✦</div>
        <div className="w-3 h-3 border border-gold rotate-45" style={{ borderColor: '#C9A24B' }} />
        <div className="w-1 h-1 rounded-full" style={{ background: '#C9A24B' }} />
      </div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A24B, transparent)' }} />
    </div>
  )
}

// ─── Glass Card ──────────────────────────────────────────────────────────────

function GlassCard({ children, className = '', glow = '' }: { children: React.ReactNode; className?: string; glow?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.2)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(247,245,241,0.3)',
        boxShadow: glow ? `0 0 40px 0 ${glow}` : '0 4px 32px rgba(34,32,29,0.08)',
      }}
    >
      {children}
    </div>
  )
}

// ─── Series Tag (Editorial + Glass) ───────────────────────────────────────────

function SeriesTag({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider glass-light-subtle" style={{ color, fontFamily: 'Inter, sans-serif' }}>
      {label}
    </span>
  )
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function HomePage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const [activeSermon, setActiveSermon] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', data: { email: newsletterEmail } }),
      })
      if (res.ok) {
        setNewsletterStatus('sent')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const sermons = [
    { title: 'Effective Prayer', speaker: 'ACK', date: 'Nov 3, 2024', dur: '55 min', color: '#1E3A6D', videoId: '-ULy3PA14Gk' },
    { title: 'Sermon by Ev. Elvis', speaker: 'Ev. Elvis', date: 'Nov 17, 2024', dur: '40 min', color: '#0F5C42', videoId: 'zm8otfP-DS4' },
    { title: 'African Anglican Worship', speaker: 'Bishop Prof. Julius Wanyoike', date: 'Jun 8, 2025', dur: '45 min', color: '#C4432B', videoId: 'oM5CC_AF4Ro' },
    { title: 'Where Are You?', speaker: 'Dean Mark Derry', date: 'Oct 20, 2024', dur: '38 min', color: '#6B1E2B', videoId: '0cdQRGKCV1c' },
    { title: 'Into a Fruitful Territory', speaker: 'ACK', date: 'Sep 15, 2024', dur: '50 min', color: '#E8A93B', videoId: 'FZv45geGA-8' },
    { title: 'Palm Sunday Service', speaker: 'Willy Kombe', date: 'Apr 13, 2025', dur: '42 min', color: '#1B4CE0', videoId: 'eZfcoD3NKHU' },
  ]

  const featured = sermons[activeSermon]

  const quickLinks = [
    { title: t('home.sermonsTitle'), desc: t('home.sermonsDesc'), page: 'sermons' as Page, color: '#1B4CE0', shape: 'circle' },
    { title: t('home.eventsTitle'), desc: t('home.eventsDesc'), page: 'events' as Page, color: '#E8A93B', shape: 'square' },
    { title: t('home.giveTitle'), desc: t('home.giveDesc'), page: 'give' as Page, color: '#0F5C42', shape: 'triangle' },
    { title: t('home.ministriesTitle'), desc: t('home.ministriesDesc'), page: 'ministries' as Page, color: '#C4432B', shape: 'circle' },
  ]

  return (
    <div className="page-fade">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Chromatic gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1B4CE0 0%, #5B2DB8 28%, #C4432B 52%, #E8A93B 76%, #F4A5C0 100%)',
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        {/* Hero content — glass panel */}
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pt-24 pb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Glass panel */}
            <div
              className="p-8 md:p-12"
              style={{
                background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.15)`,
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(247,245,241,0.25)',
              }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-6 flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.3)' }}>
                <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>
                {t('home.eyebrow')}
              </div>
              <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
                {t('home.heroLine1')}<br />{t('home.heroLine2')}
              </h1>
              <div className="font-display text-lg italic mb-8" style={{ color: 'rgba(247,245,241,0.75)', fontWeight: 300 }}>
                {t('home.tolaParish')}
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-px h-12" style={{ background: 'rgba(201,162,75,0.6)' }} />
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(247,245,241,0.55)', fontFamily: 'Inter, sans-serif' }}>{t('home.nextService')}</div>
                  <div className="font-display text-xl font-600" style={{ color: '#F7F5F1' }}>{t('home.serviceTimes')}</div>
                  <div className="text-sm mt-0.5" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>{t('home.address')}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { go('plan-visit'); window.scrollTo(0, 0) }}
                  className="px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                  style={{ background: '#F7F5F1', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                >
                  {t('home.planVisitBtn')}
                </button>
                <button
                  onClick={() => { go('sermons'); window.scrollTo(0, 0) }}
                  className="px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                >
                  {t('home.watchSermonsBtn')}
                </button>
              </div>
            </div>

            {/* Verse of the Day */}
            <div className="flex flex-col items-center justify-center p-6 md:p-8" style={{ background: 'rgba(247,245,241,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
              <div className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(201,162,75,0.7)', fontFamily: 'Inter, sans-serif' }}>Verse of the Day</div>
              <div className="w-full"><VerseOfTheDay /></div>
              <button
                onClick={() => { go('bible'); window.scrollTo(0, 0) }}
                className="mt-4 text-[11px] font-medium uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}
              >
                Search the Bible →
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(247,245,241,0.5)' }}>
          <div className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>{t('home.scroll')}</div>
          <div className="w-px h-8" style={{ background: 'rgba(247,245,241,0.3)' }} />
        </div>
      </section>

      {/* Quick Links — Editorial grid */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SeriesTag label={t('home.explore')} color="#22201D" />
            <h2 className="font-display text-3xl md:text-4xl font-600" style={{ color: '#22201D', lineHeight: 1.1 }}>
              {t('home.whatBrings')}
            </h2>
          </div>
          <div className="hidden md:block font-display text-7xl font-300 italic" style={{ color: '#B8B2A8', lineHeight: 1 }}>
            →
          </div>
        </div>

        <RegencyDivider />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10">
          {quickLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => { go(item.page); window.scrollTo(0, 0) }}
              className="group relative p-6 md:p-8 text-left transition-all hover:scale-[1.02] active:scale-98"
              style={{ background: item.color, minHeight: 160 }}
            >
              {/* Editorial shape accent */}
              <div className="absolute top-4 right-4 opacity-20">
                {item.shape === 'circle' && <div className="w-12 h-12 rounded-full border-2 border-white" />}
                {item.shape === 'square' && <div className="w-10 h-10 border-2 border-white" />}
                {item.shape === 'triangle' && (
                  <div className="w-0 h-0" style={{ borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '32px solid white' }} />
                )}
              </div>
              <div className="text-xs uppercase tracking-widest mb-3 opacity-70" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                {String(quickLinks.indexOf(item) + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-xl md:text-2xl font-600 mb-2" style={{ color: '#F7F5F1' }}>
                {item.title}
              </div>
              <div className="text-xs md:text-sm" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* The Word — Bible Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A1612 0%, #22201D 40%, #1A1814 100%)',
        }}
      >
        {/* Decorative grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,75,0.3), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,75,0.3), transparent)' }} />

        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: 3D Model */}
            <div className="relative order-1 md:order-1">
              {/* Glow circle behind model */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(201,162,75,0.12) 0%, transparent 70%)' }}
              />
              <Suspense fallback={null}><BibleModel /></Suspense>
            </div>

            {/* Right: Content */}
            <div className="order-2 md:order-2">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6"
                style={{
                  background: 'rgba(201,162,75,0.08)',
                  border: '1px solid rgba(201,162,75,0.2)',
                  borderRadius: 100,
                }}
              >
                <span style={{ color: '#C9A24B', fontSize: 12 }}>✝</span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>
                  The Living Word
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-600 mb-6 leading-[1.05]" style={{ color: '#F7F5F1' }}>
                Explore the{' '}
                <span className="italic" style={{ color: '#C9A24B' }}>Bible</span>
              </h2>

              <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>
                Search, read, and reflect on Scripture. Browse every book and chapter, discover daily verses, and let God's Word speak into your day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => { go('bible'); window.scrollTo(0, 0) }}
                  className="px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #C9A24B 0%, #E8A93B 100%)',
                    color: '#22201D',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Open Bible →
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all hover:bg-[rgba(247,245,241,0.06)]"
                  style={{
                    border: '1px solid rgba(247,245,241,0.15)',
                    color: 'rgba(247,245,241,0.8)',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Verse of the Day
                </button>
              </div>

              {/* Quick stats */}
              <div className="flex gap-10 mt-12 pt-8" style={{ borderTop: '1px solid rgba(247,245,241,0.06)' }}>
                {[
                  { num: '66', label: 'Books' },
                  { num: '1,189', label: 'Chapters' },
                  { num: '31,102', label: 'Verses' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl md:text-3xl font-600" style={{ color: '#C9A24B' }}>{stat.num}</div>
                    <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'rgba(247,245,241,0.4)', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermon — Carousel */}
      <section style={{ background: '#22201D' }} className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 mb-12">
            <SeriesTag label={t('home.latestMessage')} color="#1B4CE0" />
            <div className="flex-1 h-px" style={{ background: 'rgba(247,245,241,0.1)' }} />
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Featured sermon video */}
            <div className="md:col-span-3">
              <div
                className="relative aspect-video mb-6 overflow-hidden group cursor-pointer"
                style={{ background: '#1A1814', borderRadius: 12 }}
                onClick={() => go('sermons')}
              >
                <img
                  src={`https://img.youtube.com/vi/${featured.videoId}/maxresdefault.jpg`}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featured.videoId}/hqdefault.jpg` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(247,245,241,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,245,241,0.3)' }}
                  >
                    <div className="w-0 h-0 ml-2" style={{ borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #F7F5F1' }} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <SeriesTag label={t('home.latestMessage')} color={featured.color} />
                </div>
                <div className="absolute bottom-4 right-4 text-xs px-2 py-1" style={{ color: 'rgba(247,245,241,0.8)', fontFamily: 'Inter, sans-serif', background: 'rgba(0,0,0,0.5)', borderRadius: 4 }}>
                  {featured.dur}
                </div>
              </div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                {featured.date} · {featured.speaker}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-600 mb-4" style={{ color: '#F7F5F1', lineHeight: 1.1 }}>
                {featured.title}
              </h3>
              <button
                onClick={() => go('sermons')}
                className="text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ color: '#E8A93B', fontFamily: 'Inter, sans-serif' }}
              >
                {t('home.watchFullSermon')} <span>→</span>
              </button>
            </div>

            {/* Carousel sidebar */}
            <div className="md:col-span-2">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                {t('home.moreSermons')}
              </div>
              <div className="space-y-3">
                {sermons.map((s, i) => (
                  <button
                    key={s.videoId}
                    onClick={() => setActiveSermon(i)}
                    className="w-full flex items-center gap-4 text-left group transition-all"
                    style={{
                      padding: '12px 16px',
                      background: activeSermon === i ? 'rgba(247,245,241,0.08)' : 'transparent',
                      border: `1px solid ${activeSermon === i ? 'rgba(201,162,75,0.4)' : 'rgba(247,245,241,0.06)'}`,
                      borderRadius: 8,
                    }}
                  >
                    <div className="w-16 h-10 flex-shrink-0 overflow-hidden" style={{ borderRadius: 6, background: s.color }}>
                      <img
                        src={`https://img.youtube.com/vi/${s.videoId}/mqdefault.jpg`}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: activeSermon === i ? '#F7F5F1' : 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
                        {s.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                        {s.date} · {s.dur}
                      </div>
                    </div>
                    {activeSermon === i && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A24B' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Life — Editorial photo feature */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-photo-frame aspect-[4/3]">
            <img
              src="assets/images/youth/youth-02.webp"
              alt="Congregation gathered together in worship at ACK Berea Church"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('home.lifeTogether')}</div>
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-5" style={{ color: '#22201D', lineHeight: 1.1 }}>
              {t('home.growingTogether')}
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '50ch' }}>
              {t('home.communityBody')}
            </p>
            <button
              onClick={() => { go('plan-visit'); window.scrollTo(0, 0) }}
              className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: '#1B4CE0', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              {t('home.planVisitBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* Service Info Band */}
      <section className="py-16 md:py-20" style={{ background: '#F7F5F1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-px" style={{ background: '#B8B2A8' }}>
            {[
              { label: t('home.sundayServices'), val: '8:00 AM & 10:45 AM', sub: t('home.mainSanctuary') },
              { label: t('home.wednesdayStudy'), val: '6:00 PM', sub: t('home.parishHall') },
              { label: t('home.location'), val: 'Ngoingwa, Weteithie Road', sub: t('home.nairobi') },
            ].map((item) => (
              <div key={item.label} className="p-8 md:p-10" style={{ background: '#F7F5F1' }}>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
                <div className="font-display text-2xl font-600 mb-1" style={{ color: '#22201D' }}>{item.val}</div>
                <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA — gradient + glass */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1E3A6D 0%, #0F5C42 50%, #1B4CE0 100%)' }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <div className="font-display text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(201,162,75,0.8)' }}>
            {t('home.stayConnected')}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-600 mb-4" style={{ color: '#F7F5F1', lineHeight: 1.1 }}>
            {t('home.joinParish')}
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>
            {t('home.newsletterBody')}
          </p>
          {newsletterStatus === 'sent' ? (
            <div className="text-sm py-4" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>
              Thank you for subscribing! You'll hear from us soon.
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder={t('home.emailPlaceholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 text-sm outline-none"
                style={{
                  background: 'rgba(247,245,241,0.12)',
                  border: '1px solid rgba(247,245,241,0.25)',
                  color: '#F7F5F1',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: 44,
                }}
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'sending'}
                className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
                style={{ background: '#C9A24B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44, opacity: newsletterStatus === 'sending' ? 0.7 : 1 }}
              >
                {newsletterStatus === 'sending' ? 'Sending...' : t('home.subscribe')}
              </button>
            </form>
          )}
          {newsletterStatus === 'error' && (
            <div className="text-xs mt-3" style={{ color: '#E8A93B', fontFamily: 'Inter, sans-serif' }}>
              Something went wrong. Please try again later.
            </div>
          )}
        </div>
      </section>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────

function AboutPage() {
  const { t } = useI18n()
  const chapters = [
    {
      num: '01',
      title: t('about.storyTitle'),
      body: t('about.storyBody'),
    },
    {
      num: '02',
      title: t('about.missionTitle'),
      body: t('about.missionBody'),
    },
    {
      num: '03',
      title: t('about.beliefTitle'),
      body: t('about.beliefBody'),
    },
  ]

  const beliefs = [
    t('about.b1'),
    t('about.b2'),
    t('about.b3'),
    t('about.b4'),
    t('about.b5'),
    t('about.b6'),
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1' }}>
      {/* Hero */}
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-6" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
              <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              {t('home.eyebrow')}
            </div>
            <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#22201D', letterSpacing: '-0.02em' }}>
              {t('about.title')}
            </h1>
          </div>
          <div className="relative">
            <div className="glass-photo-frame" style={{ height: 280 }}>
              <img
                src="assets/images/general/congregation-01.webp"
                alt="ACK Berea Church congregation gathered together"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16" style={{ background: '#1B4CE0' }} />
          </div>
        </div>
      </div>

      <RegencyDivider />

      {/* Chapters */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 space-y-20">
        {chapters.map((ch, i) => (
          <div key={ch.num} className={`grid md:grid-cols-5 gap-8 items-start ${i % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
            <div className={`md:col-span-1 ${i % 2 === 1 ? 'md:col-start-5' : ''}`}>
              <div className="font-display text-7xl font-300 italic" style={{ color: '#B8B2A8', lineHeight: 1 }}>
                {ch.num}
              </div>
            </div>
            <div className="md:col-span-4 glass-light-subtle p-8 md:p-10">
              <h2 className="font-display text-3xl md:text-4xl font-600 mb-5" style={{ color: '#22201D' }}>
                {ch.title}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '60ch' }}>
                {ch.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <RegencyDivider />

      {/* Statement of Faith */}
      <div className="py-16 md:py-24" style={{ background: '#1E3A6D' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="font-display text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#C9A24B' }}>
            {t('about.statementOfFaith')}
          </div>
          <h2 className="font-display text-3xl font-600 mb-10" style={{ color: '#F7F5F1' }}>
            {t('about.whatWeHold')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {beliefs.map((b, i) => (
              <div key={i} className="flex items-start gap-4 py-5" style={{ borderTop: '1px solid rgba(201,162,75,0.2)' }}>
                <div className="font-mono text-sm flex-shrink-0 mt-0.5" style={{ color: '#C9A24B' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-lg" style={{ color: '#F7F5F1' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── SERMONS PAGE ────────────────────────────────────────────────────────────

function SermonsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [playing, setPlaying] = useState<string | null>(null)
  const series = [
    { key: 'all', label: t('sermons.all') },
    { key: 'general', label: 'General' },
    { key: 'john', label: t('sermons.seriesJohn') },
    { key: 'hebrews', label: t('sermons.seriesHebrews') },
    { key: 'psalms', label: t('sermons.seriesPsalms') },
    { key: 'romans', label: t('sermons.seriesRomans') },
  ]

  const seriesLabels: Record<string, string> = {
    general: 'General',
    john: t('sermons.seriesJohn'),
    hebrews: t('sermons.seriesHebrews'),
    psalms: t('sermons.seriesPsalms'),
    romans: t('sermons.seriesRomans'),
  }

  const sermons = [
    { title: 'Effective Prayer', seriesKey: 'general', date: 'Nov 3, 2024', speaker: 'ACK', dur: '55 min', color: '#1E3A6D', videoId: '-ULy3PA14Gk' },
    { title: 'Second Sunday Before Advent — Sermon by Ev. Elvis', seriesKey: 'general', date: 'Nov 17, 2024', speaker: 'Ev. Elvis', dur: '40 min', color: '#0F5C42', videoId: 'zm8otfP-DS4' },
    { title: 'African Anglican Worship — Sermon by Bishop Prof. Julius Wanyoike', seriesKey: 'general', date: 'Jun 8, 2025', speaker: 'Bishop Prof. Julius Wanyoike', dur: '45 min', color: '#C4432B', videoId: 'oM5CC_AF4Ro' },
    { title: 'Where Are You? — Sermon by Dean Mark Derry', seriesKey: 'general', date: 'Oct 20, 2024', speaker: 'Dean Mark Derry', dur: '38 min', color: '#6B1E2B', videoId: '0cdQRGKCV1c' },
    { title: 'Into a Fruitful Territory', seriesKey: 'general', date: 'Sep 15, 2024', speaker: 'ACK', dur: '50 min', color: '#E8A93B', videoId: 'FZv45geGA-8' },
    { title: 'Palm Sunday Service — Sermon by Willy Kombe', seriesKey: 'general', date: 'Apr 13, 2025', speaker: 'Willy Kombe', dur: '42 min', color: '#1B4CE0', videoId: 'eZfcoD3NKHU' },
  ]

  const filtered = filter === 'all' ? sermons : sermons.filter(s => s.seriesKey === filter)

  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  const active = playing ? sermons.find(s => s.videoId === playing) : null

  return (
    <div className="page-fade" style={{ background: '#22201D', minHeight: '100vh' }}>
      {/* Live Banner */}
      <div
        className="relative py-5 px-6 md:px-10 text-center overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #1B4CE0, #5B2DB8, #C4432B)' }}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full pulse-live" style={{ background: '#F7F5F1' }} />
          <span className="font-display italic text-lg" style={{ color: '#F7F5F1' }}>{t('sermons.live')}</span>
          <button className="ml-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(247,245,241,0.2)', color: '#F7F5F1', border: '1px solid rgba(247,245,241,0.3)', fontFamily: 'Inter, sans-serif' }}>
            {t('sermons.joinStream')}
          </button>
        </div>
      </div>

      <div className="pt-24 pb-8 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.4)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              {t('sermons.messagesMedia')}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#F7F5F1', letterSpacing: '-0.02em' }}>
              {t('sermons.title')}
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-12">
          {series.map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all"
              style={{
                background: filter === s.key ? '#1B4CE0' : 'transparent',
                color: filter === s.key ? '#F7F5F1' : '#B8B2A8',
                border: `1px solid ${filter === s.key ? '#1B4CE0' : 'rgba(184,178,168,0.3)'}`,
                fontFamily: 'Inter, sans-serif',
                minHeight: 44,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sermon Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.title}
              onClick={() => setPlaying(s.videoId)}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.06)`,
                border: '1px solid rgba(247,245,241,0.1)',
              }}
            >
              <div className="relative aspect-video overflow-hidden" style={{ background: '#1A1814' }}>
                <img
                  src={`https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`}
                  alt={`${s.title} sermon video`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-3 left-3">
                  <SeriesTag label={seriesLabels[s.seriesKey]} color={s.color} />
                </div>
                <div className="absolute bottom-3 right-3 text-xs px-2 py-1" style={{ background: 'rgba(34,32,29,0.6)', color: 'rgba(247,245,241,0.8)', fontFamily: 'Inter, sans-serif', borderRadius: 6 }}>
                  {s.dur}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'rgba(247,245,241,0.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,245,241,0.35)' }}>
                    <div className="w-0 h-0 ml-1" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #F7F5F1' }} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs mb-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{s.date} · {s.speaker}</div>
                <h3 className="font-display text-xl font-600" style={{ color: '#F7F5F1' }}>{s.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video player modal */}
      {playing && active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ background: 'rgba(34,32,29,0.94)', backdropFilter: 'blur(12px)' }} onClick={() => setPlaying(null)}>
          <button className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center z-10" style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1', fontSize: 20 }} onClick={() => setPlaying(null)} aria-label={t('sermons.closeVideo')}>✕</button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="glass-photo-frame" style={{ padding: 8 }}>
              <div className="aspect-video" style={{ borderRadius: 8, overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-display text-xl font-600" style={{ color: '#F7F5F1' }}>{active.title}</div>
                <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{seriesLabels[active.seriesKey]} · {active.date} · {active.speaker}</div>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${active.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44, textDecoration: 'none' }}
              >
                {t('sermons.openOnYouTube')}
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── PLAN VISIT PAGE ─────────────────────────────────────────────────────────

function PlanVisitPage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const steps = [
    { num: '01', title: t('plan.step1Title'), body: t('plan.step1Body') },
    { num: '02', title: t('plan.step2Title'), body: t('plan.step2Body') },
    { num: '03', title: t('plan.step3Title'), body: t('plan.step3Body') },
    { num: '04', title: t('plan.step4Title'), body: t('plan.step4Body') },
  ]

  const faqs = [
    { q: t('plan.faq1q'), a: t('plan.faq1a') },
    { q: t('plan.faq2q'), a: t('plan.faq2a') },
    { q: t('plan.faq3q'), a: t('plan.faq3a') },
    { q: t('plan.faq4q'), a: t('plan.faq4a') },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1' }}>
      {/* Hero */}
      <div
        className="relative pt-24 pb-20 px-6 md:px-10 overflow-hidden"
        style={{ background: '#22201D' }}
      >
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            {t('plan.eyebrow')}
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            {t('plan.title')}
          </h1>
          <button
            className="px-8 py-4 font-semibold uppercase tracking-wider text-sm transition-all"
            style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            {t('plan.comingSunday')} →
          </button>
          <button
            onClick={() => { go('service-times'); window.scrollTo(0, 0) }}
            className="ml-3 px-6 py-4 font-semibold uppercase tracking-wider text-sm"
            style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            {t('plan.serviceTimes')}
          </button>
        </div>
        {/* Editorial accent */}
        <div className="absolute right-10 top-10 hidden md:block opacity-10">
          <div className="w-48 h-48 rounded-full border-2 border-offwhite" style={{ borderColor: '#F7F5F1' }} />
        </div>
      </div>

      {/* Welcome Image — Editorial photo feature */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="glass-photo-frame aspect-video">
          <img
            src="assets/images/general/congregation-02.webp"
            alt="Warm welcome at ACK Berea Church entrance"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Steps */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <SeriesTag label={t('plan.whatToExpect')} color="#1B4CE0" />
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={s.num} className="grid md:grid-cols-5 gap-6 py-10 glass-light-subtle" style={{ borderTop: '1px solid rgba(184,178,168,0.3)' }}>
              <div className="md:col-span-1 flex items-start gap-4">
                <div className="font-display text-5xl font-300 italic" style={{ color: '#B8B2A8', lineHeight: 1 }}>
                  {s.num}
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-600 mb-3" style={{ color: '#22201D' }}>{s.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glass info cards */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { label: t('plan.dressCode'), icon: '✦', detail: t('plan.dressDetail') },
            { label: t('plan.kidsChurch'), icon: '✦', detail: t('plan.kidsDetail') },
            { label: t('plan.parking'), icon: '✦', detail: t('plan.parkingDetail') },
          ].map((c) => (
            <div
              key={c.label}
              className="p-8"
              style={{
                background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.08)`,
                border: '1px solid rgba(247,245,241,0.1)',
              }}
            >
              <div className="text-lg mb-3" style={{ color: '#C9A24B' }}>{c.icon}</div>
              <div className="font-display text-xl font-600 mb-2" style={{ color: '#F7F5F1' }}>{c.label}</div>
              <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24 glass-light-subtle">
        <SeriesTag label={t('plan.faqTitle')} color="#22201D" />
        <div className="space-y-0 max-w-3xl">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(184,178,168,0.3)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ minHeight: 60 }}
      >
        <span className="font-display text-lg font-500" style={{ color: '#22201D' }}>{q}</span>
        <span className="ml-4 flex-shrink-0 text-xl transition-transform" style={{ color: '#1B4CE0', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <div className="pb-5 text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '60ch' }}>
          {a}
        </div>
      )}
    </div>
  )
}

// ─── GIVE PAGE ───────────────────────────────────────────────────────────────

function GivePage() {
  const { t } = useI18n()
  const [account, setAccount] = useState('offering')
  const [amount, setAmount] = useState('50')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const presets = ['50', '100', '500', '1000', '2500', '5000']

  const accounts = [
    { key: 'offering', label: 'Offering', icon: '⛪' },
    { key: 'tithe', label: 'Tithe', icon: '🙌' },
    { key: 'firstfruit', label: 'First Fruit', icon: '🌾' },
    { key: 'thanksgiving', label: 'Thanksgiving', icon: '🙏' },
  ]

  const handleStkPush = async () => {
    if (!phone || !amount) {
      setStatus('error')
      setStatusMsg('Please enter your phone number and amount.')
      return
    }

    setLoading(true)
    setStatus('idle')

    try {
      const res = await fetch(`${API_URL}/api/mpesa/stkpush`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: parseInt(amount),
          accountReference: `ACK Berea - ${account}`,
          description: `${accounts.find(a => a.key === account)?.label} Donation`,
        }),
      })

      const data = await res.json()

      if (res.ok && data.CheckoutRequestID) {
        setStatus('success')
        setStatusMsg('Check your phone for the M-Pesa prompt. Enter your PIN to complete the donation.')
      } else {
        setStatus('error')
        setStatusMsg(data.error || data.details || 'Failed to initiate payment. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setStatusMsg('Could not connect to payment server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-fade" style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="relative pt-24 pb-20 px-6 md:px-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E3A6D 0%, #0F5C42 40%, #6B1E2B 80%, #C9A24B 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
        <div className="relative max-w-screen-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.3)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <RegencyDivider />
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: '#F7F5F1', letterSpacing: '-0.02em', lineHeight: 1.0 }}>
            {t('give.title')}
          </h1>
          <p className="font-display text-xl italic font-300 max-w-lg mx-auto" style={{ color: 'rgba(247,245,241,0.75)' }}>
            {t('give.quote')}
          </p>
          <div className="text-xs mt-3 uppercase tracking-widest" style={{ color: 'rgba(201,162,75,0.8)', fontFamily: 'Inter, sans-serif' }}>
            {t('give.verse')}
          </div>
          <RegencyDivider />
        </div>
      </div>

      {/* Giving Content */}
      <div className="glass-light" style={{ background: '#F7F5F1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12 items-start">

          {/* M-Pesa Paybill */}
          <div>
            <h2 className="font-display text-3xl font-600 mb-2" style={{ color: '#22201D' }}>M-Pesa Paybill</h2>
            <p className="text-sm mb-8" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>
              Use Lipa Na M-Pesa to give securely via your phone.
            </p>

            {/* Paybill Details */}
            <div className="p-6 mb-8" style={{ background: '#22201D', borderRadius: 12 }}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Business Number</div>
                  <div className="font-display text-3xl font-700" style={{ color: '#C9A24B' }}>121389</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Account</div>
                  <div className="font-display text-lg font-600 capitalize" style={{ color: '#F7F5F1' }}>{account}</div>
                </div>
              </div>
            </div>

            {/* Account Type Selection */}
            <div className="mb-8">
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Select Account</div>
              <div className="grid grid-cols-2 gap-3">
                {accounts.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setAccount(a.key)}
                    className="p-4 text-left transition-all"
                    style={{
                      background: account === a.key ? '#22201D' : '#fff',
                      color: account === a.key ? '#F7F5F1' : '#22201D',
                      border: `1px solid ${account === a.key ? '#22201D' : '#B8B2A8'}`,
                      borderRadius: 8,
                    }}
                  >
                    <div className="text-lg mb-1">{a.icon}</div>
                    <div className="text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{a.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('give.selectAmount')}</div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    className="py-3 text-sm font-semibold transition-all"
                    style={{
                      background: amount === p ? '#C9A24B' : 'transparent',
                      color: '#22201D',
                      border: `1px solid ${amount === p ? '#C9A24B' : '#B8B2A8'}`,
                      fontFamily: 'Inter, sans-serif',
                      minHeight: 44,
                    }}
                  >
                    {parseInt(p).toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Other amount"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>M-Pesa Phone Number</div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
              />
            </div>

            {/* STK Push Button */}
            <button
              onClick={handleStkPush}
              disabled={loading || !phone || !amount}
              className="w-full py-4 text-sm font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
              style={{
                background: loading ? '#B8B2A8' : 'linear-gradient(135deg, #0F5C42 0%, #0A4A34 100%)',
                color: '#F7F5F1',
                borderRadius: 8,
                fontFamily: 'Inter, sans-serif',
                minHeight: 52,
              }}
            >
              {loading ? 'Sending STK Push...' : `Pay KES ${parseInt(amount || '0').toLocaleString()} via M-Pesa`}
            </button>

            {/* Status Message */}
            {status !== 'idle' && (
              <div
                className="mt-4 p-4 text-sm"
                style={{
                  background: status === 'success' ? 'rgba(15,92,66,0.08)' : 'rgba(196,67,43,0.08)',
                  border: `1px solid ${status === 'success' ? 'rgba(15,92,66,0.2)' : 'rgba(196,67,43,0.2)'}`,
                  color: status === 'success' ? '#0F5C42' : '#C4432B',
                  borderRadius: 8,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {status === 'success' ? '✅ ' : '❌ '}{statusMsg}
              </div>
            )}

            {/* Manual Instructions */}
            <div className="mt-6 p-5" style={{ background: 'rgba(15,92,66,0.06)', border: '1px solid rgba(15,92,66,0.15)', borderRadius: 8 }}>
              <div className="text-sm font-semibold mb-2" style={{ color: '#0F5C42', fontFamily: 'Inter, sans-serif' }}>Or give manually via M-Pesa:</div>
              <ol className="text-sm space-y-1" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', paddingLeft: 20 }}>
                <li>1. Go to <strong>Lipa Na M-Pesa</strong></li>
                <li>2. Business Number: <strong>121389</strong></li>
                <li>3. Account: <strong>{accounts.find(a => a.key === account)?.label}</strong></li>
                <li>4. Enter amount: <strong>KES {parseInt(amount || '0').toLocaleString()}</strong></li>
                <li>5. Confirm with your M-Pesa PIN</li>
              </ol>
            </div>
          </div>

          {/* Info sidebar */}
          <div>
            <h2 className="font-display text-3xl font-600 mb-8" style={{ color: '#22201D' }}>{t('give.whereGiftsGo')}</h2>
            <div className="space-y-6">
              {[
                { icon: '⛪', title: t('give.a1'), desc: 'Worship, ministry programmes, and pastoral care across the parish.' },
                { icon: '🤝', title: t('give.a2'), desc: 'Supporting families, orphans, and vulnerable communities in Berea and beyond.' },
                { icon: '🏗', title: t('give.a3'), desc: 'Maintaining our church buildings and grounds for future generations.' },
                { icon: '🌍', title: t('give.a4'), desc: 'Supporting the Diocese of Thika and mission work across Kenya.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl" style={{ background: 'rgba(201,162,75,0.1)', borderRadius: 8 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display text-lg font-600 mb-1" style={{ color: '#22201D' }}>{item.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6" style={{ background: '#22201D', borderRadius: 12 }}>
              <div className="font-display text-xl italic font-300 mb-3" style={{ color: '#F7F5F1', lineHeight: 1.4 }}>
                &ldquo;{t('give.proverbsQuote')}&rdquo;
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                {t('give.proverbsVerse')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── EVENTS PAGE ─────────────────────────────────────────────────────────────

function EventsPage() {
  const { t } = useI18n()
  const events = [
    { date: 'Aug 3', day: 'sun', title: t('events.e1'), time: '8:00 AM & 10:45 AM', tag: t('events.tagWorship'), color: '#1B4CE0' },
    { date: 'Aug 6', day: 'wed', title: t('events.e2'), time: '6:00 PM', tag: t('events.tagStudy'), color: '#0F5C42' },
    { date: 'Aug 9', day: 'sat', title: t('events.e3'), time: '10:00 AM', tag: t('events.tagCommunity'), color: '#C4432B' },
    { date: 'Aug 10', day: 'sun', title: t('events.e4'), time: '10:45 AM', tag: t('events.tagYouth'), color: '#E8A93B' },
    { date: 'Aug 15', day: 'fri', title: t('events.e5'), time: '7:00 AM', tag: t('events.tagMen'), color: '#1E3A6D' },
    { date: 'Aug 17', day: 'sun', title: t('events.e6'), time: '12:00 PM', tag: t('events.tagFormation'), color: '#6B1E2B' },
    { date: 'Aug 23', day: 'sat', title: t('events.e7'), time: '9:00 AM', tag: t('events.tagOutreach'), color: '#0F5C42' },
    { date: 'Aug 31', day: 'sun', title: t('events.e8'), time: '12:30 PM', tag: t('events.tagParish'), color: '#B8B2A8' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-end gap-5">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
              <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('events.month')}</div>
              <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>{t('events.title')}</h1>
            </div>
          </div>
          <div className="font-display text-6xl font-300 italic hidden md:block" style={{ color: '#E8E5E0' }}>08</div>
        </div>
        <RegencyDivider />
        <div className="mt-10 space-y-3">
          {events.map((e) => (
            <div
              key={e.title}
              className="flex items-center gap-5 p-5 transition-all hover:scale-[1.01] cursor-pointer glass-light-subtle"
              style={{ border: '1px solid rgba(184,178,168,0.2)' }}
            >
              <div className="flex-shrink-0 w-14 text-center">
                <div className="text-2xl font-display font-700" style={{ color: '#22201D' }}>{e.date.split(' ')[1]}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t(`day.${e.day}`).slice(0, 3)}</div>
              </div>
              <div className="w-px h-10 flex-shrink-0" style={{ background: e.color }} />
              <div className="flex-1">
                <div className="font-display text-lg font-600" style={{ color: '#22201D' }}>{e.title}</div>
                <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{e.time}</div>
              </div>
              <SeriesTag label={e.tag} color={e.color} />
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── MINISTRIES PAGE ─────────────────────────────────────────────────────────

function MinistriesPage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const ministries = [
    {
      title: t('ministries.m1Title'),
      subtitle: t('ministries.m1Sub'),
      lead: 'Dea. Grace Wanjiku',
      page: 'youth' as Page,
      img: 'assets/images/youth/youth-01.webp',
      color: '#E8A93B',
      tag: t('ministries.tagYouth'),
      desc: t('ministries.m1Desc'),
      featured: true,
    },
    {
      title: t('ministries.m2Title'),
      subtitle: t('ministries.m2Sub'),
      lead: 'Bro. Joseph Maina',
      page: 'kama' as Page,
      img: 'assets/images/kama.webp',
      color: '#1E3A6D',
      tag: t('ministries.tagKAMA'),
      desc: t('ministries.m2Desc'),
      featured: false,
    },
    {
      title: t('ministries.m3Title'),
      subtitle: t('ministries.m3Sub'),
      lead: 'Mrs. Ruth Njoroge',
      page: 'mothers-union' as Page,
      img: 'assets/images/mothers-union.webp',
      color: '#6B1E2B',
      tag: t('ministries.tagMothers'),
      desc: t('ministries.m3Desc'),
      featured: false,
    },
    {
      title: t('ministries.m4Title'),
      subtitle: t('ministries.m4Sub'),
      lead: 'Sis. Anne Kamau',
      page: 'sunday-school' as Page,
      img: 'assets/images/general/sunday-school-05.webp',
      color: '#1B4CE0',
      tag: t('ministries.tagKids'),
      desc: t('ministries.m4Desc'),
      featured: false,
    },
    {
      title: t('ministries.m5Title'),
      subtitle: t('ministries.m5Sub'),
      lead: 'Mr. David Ochieng',
      page: 'choir' as Page,
      img: 'assets/images/choir/choir-01.webp',
      color: '#C4432B',
      tag: t('ministries.tagWorship'),
      desc: t('ministries.m5Desc'),
      featured: false,
    },
    {
      title: t('ministries.m6Title'),
      subtitle: t('ministries.m6Sub'),
      lead: 'Rev. Samuel Mwangi',
      page: 'outreach' as Page,
      img: 'assets/images/general/outreach-09.webp',
      color: '#0F5C42',
      tag: t('ministries.tagService'),
      desc: t('ministries.m6Desc'),
      featured: false,
    },
  ]

  const featured = ministries.find(m => m.featured)!
  const rest = ministries.filter(m => !m.featured)

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5 mb-6">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('ministries.eyebrow')}</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>{t('ministries.title')}</h1>
          </div>
        </div>
        <RegencyDivider />

        {/* Featured: Youth Ministry — real photos */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          <div className="glass-photo-frame aspect-[4/3]">
            <img
              src={featured.img}
              alt="Youth ministry group during a Saturday worship rehearsal"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <SeriesTag label={featured.tag} color={featured.color} />
            <h2 className="font-display text-3xl md:text-4xl font-600 mt-4 mb-2" style={{ color: '#22201D', lineHeight: 1.15 }}>
              {featured.title}
            </h2>
            <div className="text-sm mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              {featured.subtitle} · {t('ministries.ledBy')} {featured.lead}
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '52ch' }}>
              {featured.desc}
            </p>
            <button
              onClick={() => { go(featured.page); window.scrollTo(0, 0) }}
              className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              {t('ministries.exploreYouth')} →
            </button>
          </div>
        </div>

        {/* Ministry grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {rest.map((m) => (
            <button
              key={m.title}
              onClick={() => { go(m.page); window.scrollTo(0, 0) }}
              className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg glass-light-subtle text-left"
            >
              <div className="relative h-48 overflow-hidden" style={{ background: '#E8E5E0' }}>
                <img
                  src={m.img}
                  alt={`${m.title} at ACK Berea Church`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <SeriesTag label={m.tag} color={m.color} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(transparent, rgba(34,32,29,0.5))' }} />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-600 mb-1" style={{ color: '#22201D' }}>{m.title}</h3>
                <div className="text-xs mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{m.subtitle} · {t('ministries.ledBy')} {m.lead}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Choir & Worship Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Choir & Worship — In Song</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-photo-frame aspect-square">
            <img src="assets/images/choir/choir-02.webp" alt="Choir member" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="glass-photo-frame aspect-square">
            <img src="assets/images/choir/choir-03.webp" alt="Choir member" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="glass-photo-frame aspect-square">
            <img src="assets/images/choir/choir-04.webp" alt="Choir member" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="glass-photo-frame aspect-square">
            <img src="assets/images/choir/choir-01.webp" alt="Choir member" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── MINISTRY SECTION PAGES ──────────────────────────────────────────────────

function MinistryHero({ tag, title, subtitle, color, image, imageAlt }: {
  tag: string
  title: string
  subtitle: string
  color: string
  image: string
  imageAlt: string
}) {
  return (
    <div className="relative overflow-hidden" style={{ background: '#22201D' }}>
      <div className="absolute inset-0 chromatic-gradient opacity-40" />
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
        <SeriesTag label={tag} color={color} />
        <div className="flex items-center gap-5 mt-5 mb-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.4)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            {title}
          </h1>
        </div>
        <p className="font-display text-xl italic font-300 max-w-xl" style={{ color: 'rgba(247,245,241,0.75)' }}>
          {subtitle}
        </p>
      </div>
      <div className="glass-photo-frame relative max-w-screen-xl mx-auto px-6 md:px-10 -mb-6 md:-mb-8" style={{ height: 260 }}>
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

function MinistryInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-4" style={{ borderTop: '1px solid rgba(184,178,168,0.25)' }}>
      <div className="text-xs uppercase tracking-widest sm:w-40 flex-shrink-0 pt-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{label}</div>
      <div className="text-base" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>{value}</div>
    </div>
  )
}

function MinistryJoinCTA({ page, go }: { page: Page; go: (p: Page) => void }) {
  const { t } = useI18n()
  return (
    <div className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 chromatic-gradient" />
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-3" style={{ color: '#F7F5F1' }}>{t('min.joinTitle')}</h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
          {t('min.joinBody')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { go('contact'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ background: '#F7F5F1', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            {t('min.contactUs')}
          </button>
          <button
            onClick={() => { go('plan-visit'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            {t('min.planVisit')}
          </button>
        </div>
      </div>
    </div>
  )
}

function YouthPage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const activities = [
    { img: 'assets/images/youth/youth-01.webp', alt: 'Youth group gathered for a Saturday worship rehearsal' },
    { img: 'assets/images/youth/youth-03.webp', alt: 'Young people singing together during fellowship' },
    { img: 'assets/images/youth/youth-05.webp', alt: 'Youth ministry volunteers at a community service day' },
    { img: 'assets/images/youth/youth-07.webp', alt: 'Youth enjoying a group activity and games' },
    { img: 'assets/images/youth/youth-09.webp', alt: 'Teens studying scripture during Friday fellowship' },
    { img: 'assets/images/youth/youth-11.webp', alt: 'Youth camp morning devotion outside' },
    { img: 'assets/images/youth/youth-13.webp', alt: 'Youth ministry small group discussion' },
    { img: 'assets/images/youth/youth-15.webp', alt: 'Youth celebrating after a service project' },
    { img: 'assets/images/youth/youth-17.webp', alt: 'Youth fellowship activity' },
    { img: 'assets/images/youth/youth-19.webp', alt: 'Youth worship team' },
    { img: 'assets/images/youth/youth-21.webp', alt: 'Youth camp group photo' },
    { img: 'assets/images/youth/youth-23.webp', alt: 'Youth community service' },
    { img: 'assets/images/youth/youth-25.webp', alt: 'Youth Bible study' },
    { img: 'assets/images/youth/youth-27.webp', alt: 'Youth fellowship gathering' },
    { img: 'assets/images/youth/youth-29.webp', alt: 'Youth ministry event' },
    { img: 'assets/images/youth/youth-31.webp', alt: 'Youth celebration' },
    { img: 'assets/images/youth/youth-33.webp', alt: 'Youth outreach' },
    { img: 'assets/images/youth/youth-35.webp', alt: 'Youth worship' },
    { img: 'assets/images/youth/youth-37.webp', alt: 'Youth fellowship' },
    { img: 'assets/images/youth/youth-39.webp', alt: 'Youth gathering' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag={t('youth.tag')}
        title={t('youth.title')}
        subtitle={t('youth.subtitle')}
        color="#E8A93B"
        image="assets/images/youth/youth-01.webp"
        imageAlt="Youth ministry group during a Saturday worship rehearsal at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>{t('youth.aboutTitle')}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('youth.p1')}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('youth.p2')}
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>{t('min.meetingTimes')}</h3>
            <MinistryInfoRow label={t('youth.row1Label')} value={t('youth.row1Value')} />
            <MinistryInfoRow label={t('youth.row2Label')} value={t('youth.row2Value')} />
            <MinistryInfoRow label={t('youth.row3Label')} value={t('youth.row3Value')} />
            <MinistryInfoRow label={t('youth.row4Label')} value={t('youth.row4Value')} />
            <MinistryInfoRow label={t('youth.row5Label')} value={t('youth.row5Value')} />
            <MinistryInfoRow label={t('youth.row6Label')} value={t('youth.row6Value')} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-photo-frame aspect-[4/3]">
            <img
              src="assets/images/kayo.webp"
              alt="KAYO members of ACK Berea Church gathered together"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="regency-rule block mb-5" style={{ borderColor: '#E8A93B' }} />
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-5" style={{ color: '#22201D' }}>{t('youth.kayoTitle')}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('youth.kayoP1')}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('youth.kayoP2')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-600" style={{ color: '#22201D' }}>{t('youth.galleryTitle')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {activities.map((a, i) => (
            <div key={i} className="glass-photo-frame aspect-square">
              <img src={a.img} alt={a.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Youth Videos */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>{t('youth.videosTitle') || 'Youth Videos'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-light-subtle overflow-hidden">
            <div className="aspect-video" style={{ background: '#1A1814' }}>
              <video controls preload="metadata" className="w-full h-full object-cover">
                <source src="assets/videos/youth/youth-video-01.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <MinistryJoinCTA page="youth" go={go} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function KAMAPage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const pillars = [
    { num: '01', title: t('kama.p1Title'), body: t('kama.p1Body') },
    { num: '02', title: t('kama.p2Title'), body: t('kama.p2Body') },
    { num: '03', title: t('kama.p3Title'), body: t('kama.p3Body') },
    { num: '04', title: t('kama.p4Title'), body: t('kama.p4Body') },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag={t('kama.tag')}
        title={t('kama.title')}
        subtitle={t('kama.subtitle')}
        color="#1E3A6D"
        image="assets/images/kama.webp"
        imageAlt="Men of the Kenya Anglican Men Association at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>{t('kama.aboutTitle')}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('kama.p1')}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('kama.p2')}
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>{t('min.meetingTimes')}</h3>
            <MinistryInfoRow label={t('kama.row1Label')} value={t('kama.row1Value')} />
            <MinistryInfoRow label={t('kama.row2Label')} value={t('kama.row2Value')} />
            <MinistryInfoRow label={t('kama.row3Label')} value={t('kama.row3Value')} />
            <MinistryInfoRow label={t('kama.row4Label')} value={t('kama.row4Value')} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-10" style={{ color: '#22201D' }}>{t('kama.pillarsTitle')}</h2>
        <div className="space-y-0">
          {pillars.map((p, i) => (
            <div key={p.num} className="grid md:grid-cols-5 gap-6 py-10 glass-light-subtle" style={{ borderTop: '1px solid rgba(184,178,168,0.3)' }}>
              <div className="md:col-span-1 flex items-start gap-4">
                <div className="font-display text-5xl font-300 italic" style={{ color: '#B8B2A8', lineHeight: 1 }}>
                  {p.num}
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-600 mb-3" style={{ color: '#22201D' }}>{p.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MinistryJoinCTA page="kama" go={go} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function MothersUnionPage({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  const focuses = [
    { title: t('mu.f1Title'), body: t('mu.f1Body') },
    { title: t('mu.f2Title'), body: t('mu.f2Body') },
    { title: t('mu.f3Title'), body: t('mu.f3Body') },
    { title: t('mu.f4Title'), body: t('mu.f4Body') },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag={t('mu.tag')}
        title={t('mu.title')}
        subtitle={t('mu.subtitle')}
        color="#6B1E2B"
        image="assets/images/mothers-union.webp"
        imageAlt="Mothers' Union members in worship at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>{t('mu.aboutTitle')}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('mu.p1')}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              {t('mu.p2')}
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>{t('min.meetingTimes')}</h3>
            <MinistryInfoRow label={t('mu.row1Label')} value={t('mu.row1Value')} />
            <MinistryInfoRow label={t('mu.row2Label')} value={t('mu.row2Value')} />
            <MinistryInfoRow label={t('mu.row3Label')} value={t('mu.row3Value')} />
            <MinistryInfoRow label={t('mu.row4Label')} value={t('mu.row4Value')} />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-10" style={{ color: '#22201D' }}>{t('mu.whatWeDo')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {focuses.map((f) => (
            <div key={f.title} className="glass-light-subtle p-8">
              <h3 className="font-display text-xl font-600 mb-3" style={{ color: '#22201D' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mothers' Union Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Mothers' Union — Our Members</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
            <div key={n} className="glass-photo-frame aspect-square">
              <img src={`assets/images/mothers-union/mothers-union-${n.toString().padStart(2,'0')}.webp`} alt="Mothers' Union member" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <MinistryJoinCTA page="mothers-union" go={go} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function SundaySchoolPage({ go }: { go: (p: Page) => void }) {
  const classes = [
    { title: 'Beginners', age: 'Ages 3–5', body: 'Songs, stories, and play in a safe, loving environment.' },
    { title: 'Juniors', age: 'Ages 6–8', body: 'Bible stories, memory verses, and fun group activities.' },
    { title: 'Middles', age: 'Ages 9–12', body: 'Exploring Scripture, character-building, and friendships.' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag="Sunday School"
        title="The Sunday School Ministry"
        subtitle="Joyful, Bible-centred learning for children aged 3–12 every Sunday morning — songs, stories, crafts, and trained facilitators."
        color="#1B4CE0"
        image="assets/images/general/sunday-school-05.webp"
        imageAlt="Children of the Sunday School ministry at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>Planting Seeds of Faith</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Our Sunday School ministry provides safe, fun, and biblically grounded teaching for children aged 3–12 during both Sunday services. With trained facilitators, age-appropriate lessons, and a joyful atmosphere, children grow in their love for Jesus and one another.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Parents are always welcome to visit a class, and first-time visitors receive a warm welcome at the Sunday School registration desk in the foyer.
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>Class Times</h3>
            <MinistryInfoRow label="Kids Church" value="Sunday · 8:00 AM & 10:30 AM" />
            <MinistryInfoRow label="Registration" value="Sunday · Foyer · before service" />
            <MinistryInfoRow label="Ages" value="3–12 years" />
            <MinistryInfoRow label="Led By" value="Sis. Anne Kamau" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-10" style={{ color: '#22201D' }}>Age Groups</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.title} className="glass-light-subtle p-8">
              <SeriesTag label={c.age} color="#1B4CE0" />
              <h3 className="font-display text-xl font-600 mt-4 mb-3" style={{ color: '#22201D' }}>{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sunday School Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Sunday School — In Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[2,3,4,5,6,7,8].map(n => (
            <div key={n} className="glass-photo-frame aspect-square">
              <img src={`assets/images/general/sunday-school-${n.toString().padStart(2,'0')}.webp`} alt="Sunday School activity" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Sunday School Videos */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Sunday School — Videos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5].map(n => (
            <div key={n} className="glass-light-subtle overflow-hidden">
              <div className="aspect-video" style={{ background: '#1A1814' }}>
                <video controls preload="metadata" className="w-full h-full object-cover">
                  <source src={`assets/videos/sunday-school/sunday-school-video-${n.toString().padStart(2,'0')}.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MinistryJoinCTA page="sunday-school" go={go} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── COMMUNITY OUTREACH PAGE ─────────────────────────────────────────────────

function OutreachPage({ go }: { go: (p: Page) => void }) {
  const photos = [
    'assets/images/general/outreach-01.webp',
    'assets/images/general/outreach-02.webp',
    'assets/images/general/outreach-03.webp',
    'assets/images/general/outreach-04.webp',
    'assets/images/general/outreach-05.webp',
    'assets/images/general/outreach-06.webp',
    'assets/images/general/outreach-07.webp',
    'assets/images/general/outreach-08.webp',
    'assets/images/general/outreach-09.webp',
    'assets/images/general/outreach-10.webp',
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Serving our neighbours
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Community<br /><em>Outreach</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Putting faith into action — visiting the sick, feeding the hungry, and caring for the vulnerable in our community.
          </p>
        </div>
      </div>

      {/* About */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-6" style={{ color: '#22201D', lineHeight: 1.1 }}>
              Faith in Action
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              At ACK Berea Church, outreach is at the heart of our mission. We believe that the Gospel compels us to love and serve our neighbours — especially the most vulnerable.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Through regular visits to hospitals, orphanages, and homes for the elderly, our outreach teams bring hope, practical support, and the love of Christ to those in need.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              We also run food distribution drives, support education for underprivileged children, and partner with local organisations to address poverty and inequality in our community.
            </p>
          </div>
          <div>
            <div className="glass-light-subtle p-8">
              <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>What We Do</h3>
              {[
                { icon: '🏥', title: 'Hospital Visits', desc: 'Regular visits to hospitals and homes for the sick and elderly.' },
                { icon: '🍲', title: 'Food Distribution', desc: 'Providing meals and food packages to families in need.' },
                { icon: '📚', title: 'Education Support', desc: 'Sponsoring school fees and supplies for underprivileged children.' },
                { icon: '🏠', title: 'Orphanage Visits', desc: 'Spending time with and supporting children in orphanages.' },
                { icon: '🤝', title: 'Community Partnerships', desc: 'Working with local organisations to address systemic poverty.' },
                { icon: '⛪', title: 'Church Planting', desc: 'Supporting mission work and new congregations in the diocese.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 py-4" style={{ borderBottom: '1px solid rgba(184,178,168,0.2)' }}>
                  <div className="text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>{item.title}</div>
                    <div className="text-sm" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Outreach in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((img, i) => (
            <div key={i} className="glass-photo-frame aspect-square">
              <img src={img} alt={`Community outreach activity ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="p-8 md:p-12 text-center" style={{ background: '#22201D', borderRadius: 12 }}>
          <h2 className="font-display text-2xl md:text-3xl font-600 mb-4" style={{ color: '#F7F5F1' }}>Get Involved</h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Want to join our outreach teams? We welcome volunteers for hospital visits, food drives, and community service projects.
          </p>
          <button
            onClick={() => go('contact')}
            className="px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ background: '#C9A24B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── CHOIR & WORSHIP PAGE ────────────────────────────────────────────────────

function ChoirPage({ go }: { go: (p: Page) => void }) {
  const photos = [
    'assets/images/choir/choir-01.webp',
    'assets/images/choir/choir-02.webp',
    'assets/images/choir/choir-03.webp',
    'assets/images/choir/choir-04.webp',
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Leading the congregation in worship
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Choir &<br /><em>Worship</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Voices, instruments, and a heart for excellence — leading our parish in praise every Sunday.
          </p>
        </div>
      </div>

      {/* About */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-6" style={{ color: '#22201D', lineHeight: 1.1 }}>
              Worship Through Song
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              The Choir &amp; Worship Ministry at ACK Berea Church is dedicated to leading the congregation into the presence of God through music. Our team of singers and musicians prepare weekly to deliver heartfelt, excellence-driven worship during Sunday services.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              We blend traditional Anglican hymns with contemporary worship songs, creating a rich musical experience that speaks to every generation. Whether you sing, play an instrument, or have a passion for technical production, there is a place for you.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Our vision is to create an atmosphere where people encounter God through authentic, Spirit-led worship that glorifies Him and edifies the church.
            </p>
          </div>
          <div>
            <div className="glass-light-subtle p-8">
              <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>Ministry Info</h3>
              {[
                { label: 'Choir Practice', value: 'Sunday · 8:00 AM – 10:00 AM' },
                { label: 'Sunday Worship', value: '8:00 AM & 10:45 AM Services' },
                { label: 'Led By', value: 'Mr. David Ochieng' },
                { label: 'Open To', value: 'All ages — everyone welcome' },
                { label: 'Location', value: 'Choir Room' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 py-3" style={{ borderBottom: '1px solid rgba(184,178,168,0.2)' }}>
                  <div className="text-xs uppercase tracking-widest w-28 flex-shrink-0 pt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
                  <div className="text-sm" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="py-16" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-3xl font-600 mb-8" style={{ color: '#F7F5F1' }}>What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🎵', title: 'Sunday Worship', desc: 'Leading both services with a blend of hymns and contemporary worship songs.' },
              { icon: '🎹', title: 'Music Training', desc: 'Voice coaching, instrument lessons, and music theory for all skill levels.' },
              { icon: '🎤', title: 'Special Events', desc: 'Easter, Christmas, and other seasonal performances and concerts.' },
              { icon: '👥', title: 'Fellowship', desc: 'Building community through music, rehearsals, and shared meals.' },
              { icon: '📹', title: 'Media & Tech', desc: 'Sound engineering, live streaming, and visual production support.' },
              { icon: '🙏', title: 'Prayer & Devotion', desc: 'Weekly devotions and prayer sessions for the worship team.' },
            ].map((item) => (
              <div key={item.title} className="p-6" style={{ background: 'rgba(247,245,241,0.06)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-display text-lg font-600 mb-2" style={{ color: '#F7F5F1' }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>In the Life of Worship</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((img, i) => (
            <div key={i} className="glass-photo-frame aspect-square">
              <img src={img} alt={`Choir worship ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="p-8 md:p-12 text-center" style={{ background: '#22201D', borderRadius: 12 }}>
          <h2 className="font-display text-2xl md:text-3xl font-600 mb-4" style={{ color: '#F7F5F1' }}>Join the Choir</h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            No audition required — just a willing heart. Come to any Sunday practice at 8:00 AM and see if it feels like home.
          </p>
          <button
            onClick={() => go('contact')}
            className="px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
            style={{ background: '#C9A24B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── SERVICE TIMES & LOCATION PAGE ───────────────────────────────────────────

function ServiceTimesPage() {
  const services = [
    { day: 'Sunday', time: '8:00 AM', timeEnd: '10:30 AM', type: 'English Service', color: '#0F5C42' },
    { day: 'Sunday', time: '10:45 AM', timeEnd: '12:30 PM', type: 'Second Service', color: '#1E3A6D' },
    { day: 'Saturday', time: '2:00 AM', timeEnd: '5:00 AM', type: 'Praise & Worship', color: '#6B1E2B' },
    { day: 'Sunday', time: '8:00 AM', timeEnd: '10:00 AM', type: 'Choir Practice', color: '#1B4CE0' },
    { day: 'Weekly', time: '6:00 PM', timeEnd: '7:00 PM', type: 'Prayer Cell Groups', color: '#E8A93B' },
  ]

  const parking = [
    { icon: '⌂', title: 'On-Site Parking', body: 'Free parking inside the compound. Gates open at 7:30 AM on Sundays.' },
    { icon: '♿', title: 'Accessible Spaces', body: 'Reserved parking and ramp access near the main entrance.' },
    { icon: '✆', title: 'Boda-Boda & Drop-Off', body: 'Drop-off zone on the Weteithie Road side — easy for riders and drivers.' },
    { icon: '⏱', title: 'Peak Arrival', body: 'Arrive by 7:50 AM for the 8:00 AM service to find a spot comfortably.' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Come and worship with us
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Service Times<br /><em>& Location</em>
          </h1>
        </div>
      </div>

      {/* Schedule grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((s) => (
            <div key={s.type} className="p-6 flex flex-col justify-between min-h-[180px]" style={{ background: s.color, borderRadius: 12 }}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>{s.day}</div>
                <div className="font-display text-2xl font-700" style={{ color: '#F7F5F1' }}>{s.time}</div>
                <div className="text-xs" style={{ color: 'rgba(247,245,241,0.6)', fontFamily: 'Inter, sans-serif' }}>to {s.timeEnd}</div>
              </div>
              <div className="text-sm" style={{ color: 'rgba(247,245,241,0.9)', fontFamily: 'Inter, sans-serif' }}>{s.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Map + directions */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-light-subtle overflow-hidden">
            <div className="aspect-[4/3]">
              <iframe
                title="Map to ACK Berea Church, Tola Road, Berea, Nairobi"
                src="https://www.google.com/maps?q=Tola%20Road%2C%20Berea%2C%20Nairobi%2C%20Kenya&output=embed"
                className="w-full h-full"
                style={{ border: 0, filter: 'grayscale(1) sepia(0.15)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="glass-light-subtle p-8 flex flex-col justify-center">
            <SeriesTag label="Find Us" color="#1E3A6D" />
            <h2 className="font-display text-3xl font-600 mt-4 mb-5" style={{ color: '#22201D' }}>Ngoingwa, Weteithie Road</h2>
            <div className="space-y-4">
              {[
                ['Directions', 'Located on Ngoingwa, Weteithie Road — 10 minutes off the Super Highway.'],
                ['Public Transport', 'Matatus and boda-bodas along Weteithie Road drop you near the gate.'],
                ['Getting Around', 'Our compound has a circular drive — follow the ushers on arrival.'],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-4 py-3" style={{ borderTop: '1px solid rgba(184,178,168,0.25)' }}>
                  <div className="text-xs uppercase tracking-widest w-32 flex-shrink-0 pt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{label}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parking */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#F7F5F1' }}>Parking & Arrival</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {parking.map((p) => (
              <div key={p.title} className="p-6" style={{ background: 'rgba(247,245,241,0.06)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
                <div className="text-2xl mb-3" style={{ color: '#C9A24B' }}>{p.icon}</div>
                <div className="font-display text-lg font-600 mb-2" style={{ color: '#F7F5F1' }}>{p.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── LEADERSHIP PAGE ─────────────────────────────────────────────────────────

function LeadershipPage({ go }: { go: (p: Page) => void }) {
  const team = [
    { name: 'Rev. Samuel Mwangi', role: 'Vicar, ACK Berea Church', initial: 'SM', color: '#1E3A6D' },
    { name: 'Ven. Peter Kamau', role: 'Archdeacon', initial: 'PK', color: '#0F5C42' },
    { name: 'Dea. Grace Wanjiku', role: 'Deacon, Youth Ministry', initial: 'GW', color: '#6B1E2B' },
    { name: 'Bro. Joseph Maina', role: 'Parish Administrator', initial: 'JM', color: '#C9A24B' },
    { name: 'Sr. Esther Njeri', role: 'Mothers\u2019 Union Leader', initial: 'EN', color: '#6B35C8' },
    { name: 'Bro. David Otieno', role: 'KAMA Chairman', initial: 'DO', color: '#1B4CE0' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-20 px-6 md:px-10 overflow-hidden" style={{ background: '#0F5C42' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-20" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Those who lead us in faith
          </div>
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Leadership
          </h1>
          <p className="font-display text-xl italic max-w-2xl mx-auto" style={{ color: 'rgba(247,245,241,0.75)' }}>
            Servants first, leaders by calling — a team devoted to shepherding Tola Parish.
          </p>
        </div>
      </div>

      {/* Vicar editorial spread */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="glass-photo-frame aspect-[4/5]">
            <img src="assets/images/leadership/rev-mwangi/rev-mwangi-01.webp" alt="Rev. Samuel Mwangi, Vicar of ACK Berea Church" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="regency-rule block mb-5" style={{ borderColor: '#C9A24B' }} />
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-3" style={{ color: '#22201D' }}>A Word from the Vicar</h2>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Rev. Samuel Mwangi · Vicar
            </div>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              <p>
                "I count it a joy to shepherd a parish where faith is lived out in families, friendships, and faithful service. Whether you are new to Tola Parish or have worshipped here for years, you are welcome at the Lord's Table.
              </p>
              <blockquote className="font-display text-xl italic font-300 py-4" style={{ color: '#0F5C42' }}>
                "Our calling is simple: to know Christ, to make Him known, and to serve our neighbours with the same grace we have received."
              </blockquote>
              <p>
                The heart of our parish is a people — the youth on Friday nights, mothers serving their families, men walking together, children growing in faith. Come and belong with us."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rev. Mwangi Photo Gallery */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Rev. Samuel Mwangi — In Service</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[2,3,4,5,6,7,8,9,10,11,12,13].map(n => (
            <div key={n} className="glass-photo-frame aspect-square">
              <img src={`assets/images/leadership/rev-mwangi/rev-mwangi-${n.toString().padStart(2,'0')}.webp`} alt="Rev. Samuel Mwangi" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="glass-photo-frame aspect-square">
            <img src="assets/images/leadership/rev-mwangi/rev-mwangi-baptism.webp" alt="Rev. Samuel Mwangi baptising a member" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bishop + team */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#F7F5F1' }}>Shepherds & Servants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="glass-photo-frame aspect-square">
              <img src="assets/images/leadership/bishop.webp" alt="The Bishop of the Diocese of Mount Kenya South" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:col-span-1 flex flex-col justify-center" style={{ background: 'rgba(247,245,241,0.06)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>Diocesan Overseer</div>
              <div className="font-display text-2xl font-600 mb-1" style={{ color: '#F7F5F1' }}>The Rt. Rev. Bishop</div>
              <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Diocese of Mount Kenya South · ACK</div>
            </div>
            <div className="glass-photo-frame aspect-square">
              <img src="assets/images/general/worship-01.webp" alt="Worship service at ACK Berea Church" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:col-span-1 flex flex-col justify-center" style={{ background: 'rgba(247,245,241,0.06)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>Parish Leadership</div>
              <div className="font-display text-2xl font-600 mb-1" style={{ color: '#F7F5F1' }}>Parish Council</div>
              <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Elected lay leaders serving alongside the clergy.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#22201D' }}>Parish Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {team.map((t) => (
            <div key={t.name} className="glass-light-subtle p-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-display font-600 mb-4" style={{ background: t.color, color: '#F7F5F1' }}>
                {t.initial}
              </div>
              <div className="font-display text-lg font-600" style={{ color: '#22201D' }}>{t.name}</div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => { go('get-involved'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ background: '#1E3A6D', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Get Involved
          </button>
          <button
            onClick={() => { go('contact'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ border: '1px solid #22201D', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Contact the Team
          </button>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── GET INVOLVED PAGE ───────────────────────────────────────────────────────

function GetInvolvedPage() {
  const opportunities = [
    { icon: '✝', title: 'Ushering & Welcome', body: 'Be the first smile people see. Serve on the welcome desk or as an usher on Sundays.', color: '#1B4CE0' },
    { icon: '♪', title: 'Choir & Worship', body: 'Join the choir or worship team. Rehearsals are Saturday mornings.', color: '#0F5C42' },
    { icon: '☀', title: "Children's Ministry", body: 'Help shape young faith — Sunday School teachers and assistants.', color: '#E8A93B' },
    { icon: '◈', title: 'Youth Ministry', body: 'Mentor teens at Friday fellowship or join a camp planning team.', color: '#C4432B' },
    { icon: '◉', title: 'Media & Tech', body: 'Run sound, slides, or the livestream during services.', color: '#1E3A6D' },
    { icon: '✉', title: 'Hospitality', body: 'Host after-service teas, prepare meals, and care for our guests.', color: '#6B1E2B' },
    { icon: '☕', title: 'KAMA & Mothers\u2019 Union', body: 'Walk with fellow men and women through weekly groups and service.', color: '#6B35C8' },
    { icon: '♿', title: 'Visitation & Care', body: 'Visit the sick, the elderly, and those who can no longer come to church.', color: '#C9A24B' },
  ]

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [volName, setVolName] = useState('')
  const [volEmail, setVolEmail] = useState('')
  const [volArea, setVolArea] = useState('Ushering & Welcome')
  const [volAvailability, setVolAvailability] = useState('')

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!volName || !volEmail) return
    setSending(true)
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          data: { name: volName, email: volEmail, area: volArea, availability: volAvailability },
        }),
      })
      if (res.ok) setSent(true)
    } catch {
      // silent
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Everyone has a place
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Get <em>Involved</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Volunteering is the heartbeat of Tola Parish. Find a place to serve that fits your gifts and your season of life.
          </p>
        </div>
      </div>

      {/* Opportunities grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((o) => (
            <div key={o.title} className="glass-light-subtle p-6">
              <div className="w-11 h-11 flex items-center justify-center mb-4 text-lg" style={{ background: o.color, color: '#F7F5F1', borderRadius: 10 }}>{o.icon}</div>
              <h3 className="font-display text-lg font-600 mb-2" style={{ color: '#22201D' }}>{o.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{o.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sign-up form */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SeriesTag label="Sign Up" color="#E8A93B" />
            <h2 className="font-display text-3xl md:text-4xl font-600 mt-4 mb-4" style={{ color: '#F7F5F1' }}>Ready to Serve?</h2>
            <p className="text-base leading-relaxed" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif', maxWidth: '46ch' }}>
              Tell us where you'd like to help and when you're available. Our volunteer coordinator will reach out within a week.
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="font-display text-2xl font-600 mb-3" style={{ color: '#22201D' }}>Thank you!</div>
                <p className="text-sm" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>We've received your interest and will be in touch soon.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleVolunteerSubmit}>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Your Name</div>
                  <input type="text" placeholder="Jane Wanjiku" value={volName} onChange={(e) => setVolName(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Email Address</div>
                  <input type="email" placeholder="jane@example.com" value={volEmail} onChange={(e) => setVolEmail(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Area of Service</div>
                  <select value={volArea} onChange={(e) => setVolArea(e.target.value)} className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                    <option>Ushering & Welcome</option>
                    <option>Choir & Worship</option>
                    <option>Children's Ministry</option>
                    <option>Youth Ministry</option>
                    <option>Media & Tech</option>
                    <option>Hospitality</option>
                    <option>KAMA & Mothers' Union</option>
                    <option>Visitation & Care</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>When Are You Available?</div>
                  <textarea rows={3} placeholder="e.g. Sunday mornings and Thursday evenings" value={volAvailability} onChange={(e) => setVolAvailability(e.target.value)} className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <button type="submit" disabled={sending} className="w-full py-4 font-semibold uppercase tracking-wider text-sm" style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 52, opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Sign Me Up'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── PRAYER REQUESTS PAGE ────────────────────────────────────────────────────

function PrayerRequestsPage() {
  const [private_, setPrivate] = useState(true)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [prayerName, setPrayerName] = useState('')
  const [prayerRequest, setPrayerRequest] = useState('')

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prayerRequest) return
    setSending(true)
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'prayer-request',
          data: { name: prayerName, request: prayerRequest, isPrivate: private_ },
        }),
      })
      if (res.ok) setSent(true)
    } catch {
      // silent
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-fade relative overflow-hidden" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 chromatic-gradient-soft opacity-25" />
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="pt-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-5" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
              <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              We pray with you
            </div>
            <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#22201D', letterSpacing: '-0.02em' }}>
              Prayer<br /><em>Requests</em>
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '46ch' }}>
              Bring your joys and burdens to the Lord. Our prayer team lifts every request before God and stands with you in intercession.
            </p>
            <blockquote className="font-display text-xl italic font-300 py-4" style={{ color: '#0F5C42' }}>
              "Cast all your anxiety on Him because He cares for you." — 1 Peter 5:7
            </blockquote>
            <div className="text-xs mt-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Requests are confidential. You choose whether they are shared with the prayer team or kept private.
            </div>
          </div>

          {/* Glass form panel */}
          <div className="glass p-8 md:p-10">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: '#0F5C42', color: '#F7F5F1', fontSize: 22 }}>✓</div>
                <div className="font-display text-2xl font-600 mb-3" style={{ color: '#22201D' }}>Request Received</div>
                <p className="text-sm" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>
                  Our prayer team has received your request and will be praying for you.
                </p>
                <button onClick={() => { setSent(false); setPrayerName(''); setPrayerRequest('') }} className="mt-8 px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ border: '1px solid #22201D', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handlePrayerSubmit}>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Your Name (optional)</div>
                  <input type="text" placeholder="Jane Wanjiku" value={prayerName} onChange={(e) => setPrayerName(e.target.value)} className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid rgba(184,178,168,0.5)', background: 'rgba(255,255,255,0.7)', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Prayer Request</div>
                  <textarea rows={6} placeholder="Share what you'd like us to pray about…" value={prayerRequest} onChange={(e) => setPrayerRequest(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid rgba(184,178,168,0.5)', background: 'rgba(255,255,255,0.7)', color: '#22201D', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <label className="flex items-start gap-3 cursor-pointer" style={{ minHeight: 44 }}>
                  <input type="checkbox" checked={private_} onChange={(e) => setPrivate(e.target.checked)} className="mt-1 w-4 h-4" style={{ accentColor: '#0F5C42' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>
                    Keep my request private (shared only with the clergy, not the prayer team)
                  </span>
                </label>
                <button type="submit" disabled={sending} className="w-full py-4 font-semibold uppercase tracking-wider text-sm" style={{ background: '#0F5C42', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 52, opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Prayer Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── NEWS PAGE ───────────────────────────────────────────────────────────────

function NewsPage() {
  const posts = [
    { title: 'Baptism Sunday — A Day of New Beginnings', category: 'Sacraments', date: 'Jul 20, 2026', color: '#1E3A6D', img: 'assets/images/events/baptism.webp', read: '4 min read', excerpt: 'Seven souls were welcomed into the household of faith as Rev. Julius administered the sacrament of baptism.' },
    { title: 'The Easter Vigil & Lamp Lighting', category: 'Seasonal', date: 'Apr 5, 2026', color: '#0F5C42', img: 'assets/images/events/easter-lamp-lighting.webp', read: '3 min read', excerpt: 'Our candlelit Easter Vigil gathered the parish in darkness and watched the light of Christ rise once more.' },
    { title: 'Youth Camp 2026 — Photos & Reflections', category: 'Youth', date: 'Aug 1, 2026', color: '#E8A93B', img: 'assets/images/youth/youth-11.webp', read: '5 min read', excerpt: 'Three days at Lake Naivasha — morning devotions, small groups, and a church family growing closer.' },
    { title: 'KAMA Monthly Breakfast Fellowship', category: 'KAMA', date: 'Jul 12, 2026', color: '#C4432B', img: 'assets/images/kama.webp', read: '2 min read', excerpt: 'Men of the parish gathered for breakfast, the Word, and honest conversation around the table.' },
    { title: "Mothers' Union Service of Dedication", category: 'Mothers\u2019 Union', date: 'Jun 28, 2026', color: '#6B1E2B', img: 'assets/images/mothers-union.webp', read: '3 min read', excerpt: 'A joyful service as new members were dedicated into the Mothers\u2019 Union of the parish.' },
    { title: 'Sunday School Fun Day', category: 'Children', date: 'Jun 14, 2026', color: '#6B35C8', img: 'assets/images/general/congregation-01.webp', read: '2 min read', excerpt: 'Games, songs, and a big lunch — the youngest members of our church had a day to remember.' },
  ]

  const [featured, ...rest] = posts

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5 mb-3">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Stories from Tola Parish</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>News</h1>
          </div>
        </div>
      </div>

      {/* Featured story */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid md:grid-cols-2 gap-4 items-stretch">
          <button className="glass-photo-frame text-left group" onClick={() => window.scrollTo({ top: 0 })}>
            <img src={featured.img} alt={featured.title} loading="lazy" className="w-full h-72 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" style={{ minHeight: 240 }} />
          </button>
          <div className="glass-light-subtle p-8 md:p-10 flex flex-col justify-center">
            <SeriesTag label={featured.category} color={featured.color} />
            <h2 className="font-display text-3xl md:text-4xl font-600 mt-4 mb-3" style={{ color: '#22201D' }}>{featured.title}</h2>
            <div className="text-xs mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{featured.date} · {featured.read}</div>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '52ch' }}>{featured.excerpt}</p>
            <button className="self-start px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: featured.color, color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
              Read Story →
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <div key={p.title} className="glass-light-subtle overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden" style={{ background: '#E8E5E0' }}>
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <SeriesTag label={p.category} color={p.color} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{p.date}</span>
                </div>
                <h3 className="font-display text-xl font-600 mb-2" style={{ color: '#22201D' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{p.excerpt}</p>
                <div className="mt-4 text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{p.read}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── GALLERY PAGE ────────────────────────────────────────────────────────────

function GalleryPage() {
  const photos = [
    { img: 'assets/images/general/worship-01.webp', alt: 'Congregation singing during worship', cat: 'Worship' },
    { img: 'assets/images/leadership/rev-mwangi/rev-mwangi-01.webp', alt: 'Rev. Samuel Mwangi, Vicar', cat: 'Leadership' },
    { img: 'assets/images/events/baptism-rev-julius.webp', alt: 'Rev. Julius baptising a new member', cat: 'Sacraments' },
    { img: 'assets/images/choir/choir-01.webp', alt: 'Choir member', cat: 'Choir' },
    { img: 'assets/images/youth/youth-02.webp', alt: 'Youth worship team in rehearsal', cat: 'Youth' },
    { img: 'assets/images/mothers-union/mothers-union-01.webp', alt: "Mothers' Union member", cat: "Mothers' Union" },
    { img: 'assets/images/events/easter-lamp-lighting-2.webp', alt: 'Easter vigil lamp lighting', cat: 'Seasonal' },
    { img: 'assets/images/choir/choir-02.webp', alt: 'Choir member', cat: 'Choir' },
    { img: 'assets/images/youth/youth-04.webp', alt: 'Youth at a group activity', cat: 'Youth' },
    { img: 'assets/images/general/congregation-02.webp', alt: 'The congregation at Sunday service', cat: 'Worship' },
    { img: 'assets/images/mothers-union/mothers-union-02.webp', alt: "Mothers' Union member", cat: "Mothers' Union" },
    { img: 'assets/images/leadership/rev-mwangi/rev-mwangi-02.webp', alt: 'Rev. Samuel Mwangi', cat: 'Leadership' },
    { img: 'assets/images/youth/youth-06.webp', alt: 'Youth camp group photo', cat: 'Youth' },
    { img: 'assets/images/choir/choir-03.webp', alt: 'Choir member', cat: 'Choir' },
    { img: 'assets/images/events/rev-julis-lamp-lighting.webp', alt: 'Rev. Julius lighting the lamp', cat: 'Seasonal' },
    { img: 'assets/images/mothers-union/mothers-union-03.webp', alt: "Mothers' Union member", cat: "Mothers' Union" },
    { img: 'assets/images/kama.webp', alt: 'KAMA members of ACK Berea Church', cat: 'Fellowships' },
    { img: 'assets/images/leadership/rev-mwangi/rev-mwangi-03.webp', alt: 'Rev. Samuel Mwangi baptising', cat: 'Leadership' },
    { img: 'assets/images/youth/youth-08.webp', alt: 'Young people enjoying fellowship', cat: 'Youth' },
    { img: 'assets/images/choir/choir-04.webp', alt: 'Choir member', cat: 'Choir' },
    { img: 'assets/images/mothers-union.webp', alt: "Mothers' Union members gathered", cat: 'Fellowships' },
    { img: 'assets/images/mothers-union/mothers-union-04.webp', alt: "Mothers' Union member", cat: "Mothers' Union" },
    { img: 'assets/images/youth/youth-10.webp', alt: 'Youth ministry outing', cat: 'Youth' },
    { img: 'assets/images/leadership/rev-mwangi/rev-mwangi-04.webp', alt: 'Rev. Samuel Mwangi', cat: 'Leadership' },
    { img: 'assets/images/youth/youth-12.webp', alt: 'Youth group study time', cat: 'Youth' },
    { img: 'assets/images/events/baptism.webp', alt: 'Baptism service at the font', cat: 'Sacraments' },
    { img: 'assets/images/general/congregation-01.webp', alt: 'Worshippers at ACK Berea Church', cat: 'Worship' },
    { img: 'assets/images/youth/youth-16.webp', alt: 'Youth celebrating together', cat: 'Youth' },
    { img: 'assets/images/general/outreach-01.webp', alt: 'Community outreach activity', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-02.webp', alt: 'Community service', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-03.webp', alt: 'Outreach program', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-04.webp', alt: 'Community engagement', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-05.webp', alt: 'Outreach event', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-06.webp', alt: 'Community service day', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-07.webp', alt: 'Outreach ministry', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-08.webp', alt: 'Community care', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-09.webp', alt: 'Outreach fellowship', cat: 'Outreach' },
    { img: 'assets/images/general/outreach-10.webp', alt: 'Community mission', cat: 'Outreach' },
    { img: 'assets/images/general/sunday-school-02.webp', alt: 'Sunday School activity', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-03.webp', alt: 'Children in Sunday School', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-04.webp', alt: 'Sunday School learning', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-05.webp', alt: 'Sunday School worship', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-06.webp', alt: 'Sunday School fun', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-07.webp', alt: 'Sunday School fellowship', cat: 'Sunday School' },
    { img: 'assets/images/general/sunday-school-08.webp', alt: 'Sunday School celebration', cat: 'Sunday School' },
  ]

  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5 mb-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Moments from the parish</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Gallery</h1>
          </div>
        </div>
        <p className="text-base" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>Tap any photo to view it full-screen.</p>
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {photos.map((p, i) => (
            <button key={p.img} onClick={() => setSelected(i)} className="block w-full mb-3 md:mb-4 glass-photo-frame cursor-pointer" style={{ padding: 6 }}>
              <img src={p.img} alt={p.alt} loading="lazy" className="w-full object-cover" style={{ aspectRatio: i % 3 === 0 ? '3 / 4' : '4 / 3' }} />
              <div className="text-[10px] uppercase tracking-wider px-1 py-1.5 text-left" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{p.cat}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ background: 'rgba(34,32,29,0.92)', backdropFilter: 'blur(12px)' }} onClick={() => setSelected(null)}>
          <button className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center z-10" style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1', fontSize: 20 }} onClick={() => setSelected(null)} aria-label="Close">✕</button>
          <button
            className="absolute left-3 md:left-8 w-11 h-11 flex items-center justify-center z-10"
            style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1' }}
            onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + photos.length) % photos.length) }}
            aria-label="Previous photo"
          >‹</button>
          <button
            className="absolute right-3 md:right-8 w-11 h-11 flex items-center justify-center z-10"
            style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1' }}
            onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % photos.length) }}
            aria-label="Next photo"
          >›</button>
          <div className="glass-photo-frame max-w-4xl w-full" style={{ padding: 10 }} onClick={(e) => e.stopPropagation()}>
            <img src={photos[selected].img} alt={photos[selected].alt} className="w-full max-h-[75vh] object-contain" style={{ background: '#1A1814' }} />
            <div className="flex items-center justify-between px-2 pt-3">
              <div className="text-sm" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>{photos[selected].alt}</div>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{selected + 1} / {photos.length}</div>
            </div>
          </div>
        </div>
      )}
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── FAQ PAGE ────────────────────────────────────────────────────────────────

function FAQPage({ go }: { go: (p: Page) => void }) {
  const faqs = [
    { q: "What time should I arrive for a service?", a: "We recommend arriving 15 minutes before the service begins. Our ushers will welcome you at the gate and help you find a seat. The 8:00 AM service is the quieter, traditional Holy Communion; the 10:30 AM family service features the choir and children's church." },
    { q: "Do I need to be Anglican to attend?", a: "Not at all. Everyone is warmly welcome. You do not need to be a member, baptised, or Anglican to join us for worship. All baptised Christians are welcome to receive Holy Communion." },
    { q: "What do people wear to church?", a: "Smart casual is the norm — many dress in their Sunday best, while others come as they are. There is no dress code, and you will be received warmly either way." },
    { q: "Is there something for my children?", a: "Yes. Kids Church (ages 3–12) runs alongside both Sunday services with trained facilitators. Teens (13–17) join the main service and gather for youth group on Friday evenings at 6:00 PM." },
    { q: "How do I give an offering or tithe?", a: "Offerings are received during the service. You can also give online through our Give page, which supports one-time and recurring giving. Giving is entirely optional for visitors." },
    { q: "How can I request prayer or pastoral care?", a: "Use our Prayer Requests page to submit a request in confidence, or contact the parish office directly. Our clergy and prayer team respond to every request." },
    { q: "Where can I park?", a: "There is free on-site parking inside the compound, with accessible spaces near the entrance. Gates open at 7:30 AM on Sundays, and a drop-off zone is available on the Tola Road side." },
    { q: "Can I join a small group or ministry?", a: "Yes! Use the Small Groups page to find a group by day, location, or topic, and the Get Involved page to explore volunteer opportunities across the parish." },
  ]

  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Good questions, honest answers
          </div>
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            FAQ
          </h1>
          <p className="text-base" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Everything first-time visitors ask us most. Still curious? <button onClick={() => { go('contact'); window.scrollTo(0, 0) }} className="underline" style={{ color: '#E8A93B' }}>Contact us</button>.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        {faqs.map((f, i) => (
          <div key={f.q} className="glass-light-subtle mb-4 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-5 px-6 py-5 text-left"
              style={{ minHeight: 60 }}
            >
              <span className="font-display text-2xl font-300 italic flex-shrink-0" style={{ color: open === i ? '#1B4CE0' : '#B8B2A8' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-display text-lg font-500" style={{ color: '#22201D' }}>{f.q}</span>
              <span className="flex-shrink-0 text-xl transition-transform" style={{ color: '#1B4CE0', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div className="px-6 pb-6 pl-16 text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── SMALL GROUPS FINDER PAGE ────────────────────────────────────────────────

function SmallGroupsFinderPage() {
  const groups = [
    { name: 'Men\u2019s Breakfast Fellowship', day: 'Saturday', time: '7:00 AM', location: 'Parish Hall', topic: 'Men', color: '#1B4CE0', desc: 'A monthly breakfast with the Word and honest conversation.' },
    { name: "Mothers' Union Meeting", day: 'Wednesday', time: '10:00 AM', location: 'Parish Hall', topic: 'Women', color: '#6B1E2B', desc: 'Fellowship, prayer, and service among mothers of the parish.' },
    { name: 'Friday Youth Fellowship', day: 'Friday', time: '6:00 PM', location: 'Youth Room', topic: 'Youth', color: '#E8A93B', desc: 'Praise, teaching, and connection for ages 13–24.' },
    { name: 'Young Adults Bible Study', day: 'Thursday', time: '7:00 PM', location: 'Grace Home', topic: 'Young Adults', color: '#6B35C8', desc: 'Digging into Scripture together in a relaxed home setting.' },
    { name: 'KAMA Accountability Group', day: 'Tuesday', time: '6:30 AM', location: 'Church Compound', topic: 'Men', color: '#0F5C42', desc: 'An early-morning circle for men walking together in faith.' },
    { name: 'Couples Connect', day: 'Sunday', time: '4:30 PM', location: 'Main Hall', topic: 'Families', color: '#C4432B', desc: 'Monthly gathering for married couples to grow and share.' },
    { name: 'Prayer & Intercession Team', day: 'Friday', time: '5:00 AM', location: 'Sanctuary', topic: 'Prayer', color: '#1E3A6D', desc: 'Wrestling in prayer for the parish and community.' },
    { name: 'Sunday School Teachers', day: 'Saturday', time: '10:00 AM', location: 'Sunday School Block', topic: 'Children', color: '#C9A24B', desc: 'Lesson prep and fellowship for those serving our children.' },
  ]

  const days = ['All', 'Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const topics = ['All', 'Men', 'Women', 'Youth', 'Young Adults', 'Families', 'Prayer', 'Children']

  const [day, setDay] = useState('All')
  const [topic, setTopic] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = groups.filter((g) =>
    (day === 'All' || g.day === day) &&
    (topic === 'All' || g.topic === topic) &&
    (search.trim() === '' || g.name.toLowerCase().includes(search.toLowerCase()) || g.desc.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Find your people</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Small Groups</h1>
          </div>
        </div>

        {/* Search */}
        <input
          type="search"
          placeholder="Search groups…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 text-sm outline-none"
          style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
        />

        {/* Filter chips */}
        <div className="mt-6">
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>By Day</div>
          <div className="flex flex-wrap gap-2">
            {days.map((d) => (
              <button key={d} onClick={() => setDay(d)} className="px-4 py-2 text-xs uppercase tracking-wider font-medium" style={{ background: day === d ? '#1B4CE0' : 'transparent', color: day === d ? '#F7F5F1' : '#22201D', border: `1px solid ${day === d ? '#1B4CE0' : '#B8B2A8'}`, fontFamily: 'Inter, sans-serif', minHeight: 40 }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>By Topic</div>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button key={t} onClick={() => setTopic(t)} className="px-4 py-2 text-xs uppercase tracking-wider font-medium" style={{ background: topic === t ? '#0F5C42' : 'transparent', color: topic === t ? '#F7F5F1' : '#22201D', border: `1px solid ${topic === t ? '#0F5C42' : '#B8B2A8'}`, fontFamily: 'Inter, sans-serif', minHeight: 40 }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        {filtered.length === 0 ? (
          <div className="glass-light-subtle p-12 text-center">
            <div className="font-display text-2xl font-600 mb-2" style={{ color: '#22201D' }}>No groups match</div>
            <div className="text-sm" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>Try clearing a filter or adjusting your search.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((g) => (
              <div key={g.name} className="glass-light-subtle p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 flex items-center justify-center text-xs font-display font-600" style={{ background: g.color, color: '#F7F5F1', borderRadius: 8 }}>{g.topic.slice(0, 2).toUpperCase()}</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{g.day} · {g.time}</div>
                </div>
                <h3 className="font-display text-lg font-600 mb-1" style={{ color: '#22201D' }}>{g.name}</h3>
                <div className="text-xs mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{g.location}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── LIVE STREAM PAGE ────────────────────────────────────────────────────────

function LiveStreamPage() {
  const [live, setLive] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatSent, setChatSent] = useState(false)

  const handleChatSend = async () => {
    if (!chatMessage.trim()) return
    try {
      await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'live-chat', data: { message: chatMessage } }),
      })
      setChatSent(true)
      setChatMessage('')
      setTimeout(() => setChatSent(false), 3000)
    } catch {
      // silent
    }
  }

  return (
    <div className="page-fade" style={{ background: '#22201D', minHeight: '100vh' }}>
      {/* Header */}
      <div className="relative pt-24 pb-8 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img src="assets/images/logo/ack-crest.png" alt="" aria-hidden="true" className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block" />
        <div className="relative max-w-screen-xl mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Join us from anywhere</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#F7F5F1', letterSpacing: '-0.02em' }}>Live Stream</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ background: 'rgba(247,245,241,0.1)', border: '1px solid rgba(247,245,241,0.2)', borderRadius: 999 }}>
            <div className="w-2 h-2 rounded-full pulse-live" style={{ background: live ? '#C4432B' : '#B8B2A8' }} />
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
              {live ? 'Live Now' : 'Off Air'}
            </span>
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative aspect-video overflow-hidden glass-light-subtle" style={{ borderRadius: 12 }}>
              {live ? (
                <div className="absolute inset-0 flex items-center justify-center chromatic-gradient">
                  <div className="text-center">
                    <div className="text-4xl mb-3" style={{ color: '#F7F5F1' }}>▶</div>
                    <div className="font-display text-2xl font-600" style={{ color: '#F7F5F1' }}>Streaming now</div>
                    <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>Sunday · 8:00 AM & 10:45 AM</div>
                  </div>
                </div>
              ) : (
                <>
                  <img src="assets/images/general/congregation-02.webp" alt="Live stream poster — Sunday service at ACK Berea Church" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setLive(true)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    aria-label="Play live stream"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'rgba(247,245,241,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,245,241,0.3)' }}>
                      <div className="w-0 h-0 ml-1.5" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid #F7F5F1' }} />
                    </div>
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-600" style={{ color: '#F7F5F1' }}>Sunday Service</div>
                <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>English Service · 8:00 AM · ACK Berea Church, Tola Parish</div>
              </div>
              <button
                onClick={() => setLive(false)}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider hidden sm:block"
                style={{ border: '1px solid rgba(247,245,241,0.3)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
              >
                {live ? 'Stop' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Chat panel */}
          <div className="flex flex-col" style={{ background: 'rgba(247,245,241,0.05)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
            <div className="px-5 py-4 text-xs uppercase tracking-widest flex items-center justify-between" style={{ borderBottom: '1px solid rgba(247,245,241,0.1)', color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Live Chat
              <button className="lg:hidden" style={{ color: '#F7F5F1' }}>⌄</button>
            </div>
            <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-72 lg:max-h-none">
              {[
                ['Grace M.', 'Blessings to all worshipping from home today!'],
                ['Peter K.', 'Amen — joining from Kitengela.'],
                ['Esther W.', 'Beautiful praise this morning 🙌'],
              ].map(([name, msg]) => (
                <div key={name}>
                  <div className="text-xs font-semibold" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>{name}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>{msg}</div>
                </div>
              ))}
            </div>
            <div className="p-4" style={{ borderTop: '1px solid rgba(247,245,241,0.1)' }}>
              {chatSent && (
                <div className="text-xs mb-2" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>Message sent!</div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Say hello…"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend() }}
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid rgba(184,178,168,0.3)', background: 'rgba(247,245,241,0.08)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                />
                <button onClick={handleChatSend} className="px-5 text-xs font-semibold uppercase tracking-wider" style={{ background: '#C4432B', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { t: '8:00 AM', label: 'English Service' },
            { t: '10:45 AM', label: 'Second Service' },
            { t: '6:00 PM', label: 'Wednesday Bible Study' },
          ].map((s) => (
            <div key={s.label} className="p-6" style={{ background: 'rgba(247,245,241,0.05)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
              <div className="font-display text-2xl font-600" style={{ color: '#F7F5F1' }}>{s.t}</div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── TESTIMONIES PAGE ────────────────────────────────────────────────────────

function TestimoniesPage() {
  const stories = [
    { img: 'assets/images/youth/youth-09.webp', name: 'Brenda W.', role: 'Youth Member', quote: 'Youth fellowship became my second family. I found mentors who prayed with me through school and helped me discover my gifts in the choir.', body: 'When I joined Friday fellowship three years ago, I was shy and unsure of myself. Today I lead worship, serve in media, and I know, without a doubt, that God met me here.' },
    { img: 'assets/images/general/congregation-01.webp', name: 'Charles M.', role: 'KAMA Member', quote: 'The men of this parish walked with me when life was heavy. That is church.', body: 'After my business struggled and I pulled away from everything, a KAMA brother called me every single week. They prayed, they listened, and they showed up. It changed how I see fellowship.' },
    { img: 'assets/images/mothers-union.webp', name: 'Mama Jane K.', role: 'Mothers\u2019 Union', quote: 'In the Mothers\u2019 Union I found sisters — and a place to serve my community.', body: 'From home visits to caring for widows in Berea, the union gave my hands something faithful to do after my children grew up. The joy I have found here is beyond words.' },
    { img: 'assets/images/general/congregation-02.webp', name: 'Daniel & Ruth O.', role: 'Parents', quote: 'Our children run to Sunday School every week. That says everything.', body: 'As new parents in the parish, we wondered if our kids would settle. The Sunday School teachers love them so well that they ask to come early. We grew up too — through the new parents group.' },
  ]

  const [idx, setIdx] = useState(0)
  const s = stories[idx]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Stories of grace</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Testimonies</h1>
          </div>
        </div>
      </div>

      {/* Portrait-led feature */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-photo-frame aspect-[4/5] max-w-md mx-auto md:mx-0 w-full">
            <img src={s.img} alt={`${s.name} — testimony at ACK Berea Church`} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="regency-rule block mb-5" style={{ borderColor: '#C9A24B' }} />
            <blockquote className="font-display text-2xl md:text-3xl italic font-400 leading-snug mb-6" style={{ color: '#22201D' }}>
              "{s.quote}"
            </blockquote>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '52ch' }}>{s.body}</p>
            <div className="font-display text-lg font-600" style={{ color: '#22201D' }}>{s.name}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{s.role}</div>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-2.5 transition-all"
                  style={{ width: idx === i ? 28 : 10, background: idx === i ? '#0F5C42' : '#B8B2A8', borderRadius: 999, minHeight: 10 }}
                  aria-label={`Testimony ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIdx((idx - 1 + stories.length) % stories.length)} className="w-11 h-11 flex items-center justify-center" style={{ border: '1px solid #22201D', color: '#22201D', fontSize: 18 }} aria-label="Previous story">‹</button>
              <button onClick={() => setIdx((idx + 1) % stories.length)} className="w-11 h-11 flex items-center justify-center" style={{ border: '1px solid #22201D', color: '#22201D', fontSize: 18 }} aria-label="Next story">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Share your story */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-600 mb-2" style={{ color: '#F7F5F1' }}>Has God met you here?</h2>
            <p className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>We would love to hear your story and celebrate God's work in your life.</p>
          </div>
          <button onClick={() => window.scrollTo({ top: 0 })} className="px-7 py-4 text-sm font-semibold uppercase tracking-wider flex-shrink-0" style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
            Share Your Story
          </button>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage({ go }: { go: (p: Page) => void }) {
  const staff = [
    { name: 'Rev. Samuel Mwangi', role: 'Vicar', initial: 'SM', color: '#1E3A6D' },
    { name: 'Ven. Peter Kamau', role: 'Archdeacon', initial: 'PK', color: '#0F5C42' },
    { name: 'Dea. Grace Wanjiku', role: 'Youth Deacon', initial: 'GW', color: '#C4432B' },
    { name: 'Bro. Joseph Maina', role: 'Parish Administrator', initial: 'JM', color: '#E8A93B' },
  ]

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactEmail || !contactMessage) return
    setSending(true)
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: { name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage },
        }),
      })
      if (res.ok) setSent(true)
    } catch {
      // silent
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end gap-5 mb-6">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.5)', boxShadow: '0 4px 20px rgba(34,32,29,0.12)' }}>
            <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Get in Touch</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Contact</h1>
          </div>
        </div>
        <RegencyDivider />

        <div className="flex flex-wrap gap-3 mb-10">
          {([
            ['Submit a Prayer Request', 'prayer-requests'],
            ['Common Questions (FAQ)', 'faq'],
            ['Service Times & Location', 'service-times'],
          ] as [string, Page][]).map(([label, p]) => (
            <button
              key={p}
              onClick={() => { go(p) }}
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider"
              style={{ border: '1px solid #B8B2A8', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Staff */}
          <div className="glass-light-subtle p-8">
            <h2 className="font-display text-2xl font-600 mb-7" style={{ color: '#22201D' }}>Parish Team</h2>
            <div className="space-y-4">
              {staff.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-600 text-sm" style={{ background: s.color, color: '#F7F5F1' }}>
                    {s.initial}
                  </div>
                  <div>
                    <div className="font-display text-base font-600" style={{ color: '#22201D' }}>{s.name}</div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{s.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              {[
                { label: 'Address', val: 'Tola Road, Berea, Nairobi, Kenya' },
                { label: 'Phone', val: '+254 20 123 4567' },
                { label: 'Email', val: 'info@ackberea.org' },
                { label: 'Office Hours', val: 'Mon–Fri, 9 AM – 5 PM' },
              ].map((i) => (
                <div key={i.label} className="flex gap-4 py-3" style={{ borderBottom: '1px solid rgba(184,178,168,0.2)' }}>
                  <div className="text-xs uppercase tracking-widest w-24 flex-shrink-0 pt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{i.label}</div>
                  <div className="text-sm" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>{i.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-light-subtle p-8">
            <h2 className="font-display text-2xl font-600 mb-8" style={{ color: '#22201D' }}>Send a Message</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: '#0F5C42', color: '#F7F5F1', fontSize: 22 }}>✓</div>
                <div className="font-display text-2xl font-600 mb-3" style={{ color: '#22201D' }}>Message Sent</div>
                <p className="text-sm" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button onClick={() => { setSent(false); setContactName(''); setContactEmail(''); setContactSubject(''); setContactMessage('') }} className="mt-8 px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ border: '1px solid #22201D', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Your Name</div>
                  <input type="text" placeholder="Jane Wanjiku" value={contactName} onChange={(e) => setContactName(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Email Address</div>
                  <input type="email" placeholder="jane@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Subject</div>
                  <input type="text" placeholder="Prayer request, general inquiry…" value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Message</div>
                  <textarea rows={5} placeholder="How can we help?" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <button type="submit" disabled={sending} className="w-full py-4 font-semibold uppercase tracking-wider text-sm" style={{ background: '#22201D', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 52, opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ go }: { go: (p: Page) => void }) {
  const { t } = useI18n()
  return (
    <footer style={{ background: '#22201D', borderTop: '1px solid rgba(184,178,168,0.1)' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ background: '#F7F5F1', border: '1px solid rgba(201,162,75,0.4)' }}>
                <img src="assets/images/logo/ack-crest.png" alt="ACK Berea Church, Tola Parish emblem" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display text-base font-600" style={{ color: '#F7F5F1' }}>{t('nav.churchName')}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('nav.tolaParish')}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif', maxWidth: '36ch' }}>
              {t('footer.tagline')}
            </p>
            <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              {t('footer.address')}<br />{t('footer.phone')}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('footer.navigate')}</div>
            <div className="space-y-3">
              {([
                [t('nav.about'), 'about'],
                [t('nav.sermons'), 'sermons'],
                [t('nav.events'), 'events'],
                [t('nav.ministries'), 'ministries'],
                ['Order of Service', 'order-of-service'],
                [t('nav.give'), 'give'],
                [t('nav.contact'), 'contact'],
              ] as [string, Page][]).map(([label, p]) => (
                <button key={p} onClick={() => { go(p) }}
                  className="block text-sm hover:opacity-60 transition-opacity text-left"
                  style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Ministries */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('footer.ministries')}</div>
            <div className="space-y-3">
              {([
                [t('menu.youth'), 'youth'],
                [t('menu.kama'), 'kama'],
                [t('menu.mothersUnion'), 'mothers-union'],
                [t('menu.sundaySchool'), 'sunday-school'],
              ] as [string, Page][]).map(([label, p]) => (
                <button key={p} onClick={() => { go(p) }}
                  className="block text-sm hover:opacity-60 transition-opacity text-left"
                  style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('footer.services')}</div>
            <div className="space-y-3 text-sm" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
              <div>{t('day.sun')} <span style={{ color: '#B8B2A8' }}>8:00 AM – 10:30 AM</span></div>
              <div>{t('day.sun')} <span style={{ color: '#B8B2A8' }}>10:45 AM – 12:30 PM</span></div>
              <div>{t('day.sat')} <span style={{ color: '#B8B2A8' }}>2:00 AM – 5:00 AM</span></div>
            </div>
          </div>

          {/* More */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{t('footer.more')}</div>
            <div className="space-y-3">
              {([
                [t('menu.serviceTimes'), 'service-times'],
                [t('menu.leadership'), 'leadership'],
                [t('menu.getInvolved'), 'get-involved'],
                [t('menu.prayerRequests'), 'prayer-requests'],
                [t('menu.news'), 'news'],
                [t('menu.gallery'), 'gallery'],
                [t('menu.smallGroups'), 'small-groups'],
                [t('menu.liveStream'), 'live'],
                [t('menu.testimonies'), 'testimonies'],
                [t('menu.faq'), 'faq'],
              ] as [string, Page][]).map(([label, p]) => (
                <button key={p} onClick={() => { go(p) }}
                  className="block text-sm hover:opacity-60 transition-opacity text-left"
                  style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(184,178,168,0.1)' }}>
          <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            {t('footer.copyright')}
          </div>
          <div className="flex gap-4">
            {['#', '#', '#'].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity" style={{ border: '1px solid rgba(184,178,168,0.3)', color: '#B8B2A8', fontSize: 12 }}>
                {['f', 't', 'y'][i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [history, setHistory] = useState<Page[]>(['home'])
  const [forwardStack, setForwardStack] = useState<Page[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const go = (p: Page) => {
    setMenuOpen(false)
    setHistory((prev) => [...prev, p])
    setForwardStack([])
    setPage(p)
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    if (history.length <= 1) return
    const newHistory = history.slice(0, -1)
    const current = history[history.length - 1]
    setHistory(newHistory)
    setForwardStack((prev) => [...prev, current])
    setPage(newHistory[newHistory.length - 1])
    window.scrollTo(0, 0)
  }

  const goForward = () => {
    if (forwardStack.length === 0) return
    const next = forwardStack[forwardStack.length - 1]
    setForwardStack((prev) => prev.slice(0, -1))
    setHistory((prev) => [...prev, next])
    setPage(next)
    window.scrollTo(0, 0)
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrollY(y)
      setShowScrollTop(y > 400)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Nav page={page} go={go} goBack={goBack} goForward={goForward} canGoBack={history.length > 1} canGoForward={forwardStack.length > 0} />
      <BottomNav page={page} go={go} onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} page={page} go={go} onClose={() => setMenuOpen(false)} />

      {page === 'home' && <HomePage go={go} />}
      {page === 'about' && <AboutPage />}
      {page === 'sermons' && <SermonsPage />}
      {page === 'plan-visit' && <PlanVisitPage go={go} />}
      {page === 'give' && <GivePage />}
      {page === 'events' && <EventsPage />}
      {page === 'ministries' && <MinistriesPage go={go} />}
      {page === 'kama' && <KAMAPage go={go} />}
      {page === 'mothers-union' && <MothersUnionPage go={go} />}
      {page === 'sunday-school' && <SundaySchoolPage go={go} />}
      {page === 'youth' && <YouthPage go={go} />}
      {page === 'contact' && <ContactPage go={go} />}
      {page === 'service-times' && <ServiceTimesPage />}
      {page === 'leadership' && <LeadershipPage go={go} />}
      {page === 'get-involved' && <GetInvolvedPage />}
      {page === 'prayer-requests' && <PrayerRequestsPage />}
      {page === 'news' && <NewsPage />}
      {page === 'gallery' && <GalleryPage />}
      {page === 'faq' && <FAQPage go={go} />}
      {page === 'small-groups' && <SmallGroupsFinderPage />}
      {page === 'live' && <LiveStreamPage />}
      {page === 'testimonies' && <TestimoniesPage />}
      {page === 'bible' && <BiblePage />}
      {page === 'order-of-service' && <OrderOfService />}
      {page === 'outreach' && <OutreachPage go={go} />}
      {page === 'choir' && <ChoirPage go={go} />}

      {page !== 'sermons' && <Footer go={go} />}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollTop}
          className="fixed z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110 shadow-lg"
          style={{
            bottom: 90,
            right: 20,
            background: '#22201D',
            color: '#F7F5F1',
            border: '1px solid rgba(184,178,168,0.3)',
          }}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
