import { useState, useEffect, useRef } from 'react'

type Page = 'home' | 'about' | 'sermons' | 'plan-visit' | 'give' | 'contact' | 'events' | 'ministries' | 'kama' | 'mothers-union' | 'sunday-school' | 'youth' | 'service-times' | 'leadership' | 'get-involved' | 'prayer-requests' | 'news' | 'gallery' | 'faq' | 'small-groups' | 'live' | 'testimonies'

// ─── Reeded Glass Nav ────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links: [string, Page][] = [
    ['About', 'about'],
    ['Sermons', 'sermons'],
    ['Events', 'events'],
    ['Ministries', 'ministries'],
    ['Contact', 'contact'],
  ]

  const moreLinks: [string, Page][] = [
    ['Service Times', 'service-times'],
    ['Leadership', 'leadership'],
    ['Get Involved', 'get-involved'],
    ['Prayer Requests', 'prayer-requests'],
    ['News', 'news'],
    ['Gallery', 'gallery'],
    ['Small Groups', 'small-groups'],
    ['Live Stream', 'live'],
    ['Testimonies', 'testimonies'],
    ['FAQ', 'faq'],
  ]

  const go = (p: Page) => { setMoreOpen(false); setPage(p); window.scrollTo(0, 0) }

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
        {/* Logo */}
        <button
          onClick={() => { setPage('home'); window.scrollTo(0, 0) }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-charcoal" style={{ borderColor: scrolled ? '#22201D' : '#F7F5F1' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3"
              style={{ background: scrolled ? '#22201D' : '#F7F5F1', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-600 tracking-tight" style={{ color: scrolled ? '#22201D' : '#F7F5F1' }}>
              ACK Berea Church
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: scrolled ? '#B8B2A8' : 'rgba(247,245,241,0.7)' }}>
              Tola Parish
            </div>
          </div>
        </button>

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
              More
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
                      onClick={() => go(id)}
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
            Plan Your Visit
          </button>
        </nav>

        {/* Mobile Give CTA */}
        <button
          onClick={() => go('plan-visit')}
          className="md:hidden px-4 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ background: '#1B4CE0', color: '#F7F5F1' }}
        >
          Visit
        </button>
      </div>
    </header>
  )
}

// ─── Bottom Mobile Nav ───────────────────────────────────────────────────────

function BottomNav({ page, setPage, onMenu }: { page: Page; setPage: (p: Page) => void; onMenu: () => void }) {
  const items: { label: string; page: Page; icon: string }[] = [
    { label: 'Home', page: 'home', icon: '⌂' },
    { label: 'Visit', page: 'plan-visit', icon: '✦' },
    { label: 'Give', page: 'give', icon: '❤' },
    { label: 'Watch', page: 'sermons', icon: '▶' },
    { label: 'Menu', page: 'about', icon: '≡' },
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
            key={item.label}
            onClick={() => { if (item.label === 'Menu') { onMenu() } else { setPage(item.page); window.scrollTo(0, 0) } }}
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

function MobileMenu({ open, page, setPage, onClose }: { open: boolean; page: Page; setPage: (p: Page) => void; onClose: () => void }) {
  const groups: { title: string; items: [string, Page][] }[] = [
    {
      title: 'Explore',
      items: [
        ['Home', 'home'],
        ['About Us', 'about'],
        ['Service Times', 'service-times'],
        ['Plan Your Visit', 'plan-visit'],
        ['Sermons', 'sermons'],
        ['Live Stream', 'live'],
      ],
    },
    {
      title: 'Community',
      items: [
        ['Ministries', 'ministries'],
        ['Youth', 'youth'],
        ['KAMA', 'kama'],
        ["Mothers' Union", 'mothers-union'],
        ['Sunday School', 'sunday-school'],
        ['Small Groups', 'small-groups'],
      ],
    },
    {
      title: 'Connect',
      items: [
        ['Get Involved', 'get-involved'],
        ['Leadership', 'leadership'],
        ['News', 'news'],
        ['Gallery', 'gallery'],
        ['Testimonies', 'testimonies'],
        ['Prayer Requests', 'prayer-requests'],
        ['Events', 'events'],
        ['FAQ', 'faq'],
        ['Give', 'give'],
        ['Contact', 'contact'],
      ],
    },
  ]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden overflow-y-auto" style={{ background: '#22201D' }}>
      <div className="absolute inset-0 chromatic-gradient opacity-20" />
      <div className="relative px-6 py-6 min-h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="font-display text-lg font-600" style={{ color: '#F7F5F1' }}>
            ACK Berea Church
            <div className="text-[10px] uppercase tracking-[0.15em] font-sans" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Tola Parish</div>
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
                  onClick={() => { setPage(id); window.scrollTo(0, 0); onClose() }}
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
          Tola Road, Berea, Nairobi, Kenya<br />+254 20 123 4567
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

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const sermonCards = [
    {
      num: '01',
      title: 'The Bread of Life',
      series: 'Gospel of John',
      date: 'Jul 27, 2025',
      duration: '42 min',
      color: '#1B4CE0',
      img: 'photo-1507003211169-0a1dd7228f2d',
    },
    {
      num: '02',
      title: 'Walking by Faith',
      series: 'Hebrews Series',
      date: 'Jul 20, 2025',
      duration: '38 min',
      color: '#0F5C42',
      img: 'photo-1464207687429-7505649dae38',
    },
    {
      num: '03',
      title: 'The Good Shepherd',
      series: 'Gospel of John',
      date: 'Jul 13, 2025',
      duration: '45 min',
      color: '#6B1E2B',
      img: 'photo-1529070538774-1843cb3265df',
    },
  ]

  const quickLinks = [
    { title: 'Sermons', desc: 'Watch & listen to messages', page: 'sermons' as Page, color: '#1B4CE0', shape: 'circle' },
    { title: 'Events', desc: 'Upcoming gatherings', page: 'events' as Page, color: '#E8A93B', shape: 'square' },
    { title: 'Give', desc: 'Support the parish', page: 'give' as Page, color: '#0F5C42', shape: 'triangle' },
    { title: 'Ministries', desc: 'Find your community', page: 'ministries' as Page, color: '#C4432B', shape: 'circle' },
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
              <div className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>
                Anglican Church of Kenya · Diocese of Mount Kenya South
              </div>
              <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
                ACK Berea<br />Church
              </h1>
              <div className="font-display text-lg italic mb-8" style={{ color: 'rgba(247,245,241,0.75)', fontWeight: 300 }}>
                Tola Parish
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-px h-12" style={{ background: 'rgba(201,162,75,0.6)' }} />
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(247,245,241,0.55)', fontFamily: 'Inter, sans-serif' }}>Next Service</div>
                  <div className="font-display text-xl font-600" style={{ color: '#F7F5F1' }}>Sunday · 8:00 AM & 10:30 AM</div>
                  <div className="text-sm mt-0.5" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>Tola Road, Berea, Nairobi</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setPage('plan-visit'); window.scrollTo(0, 0) }}
                  className="px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                  style={{ background: '#F7F5F1', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                >
                  Plan Your Visit
                </button>
                <button
                  onClick={() => { setPage('sermons'); window.scrollTo(0, 0) }}
                  className="px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                >
                  Watch Sermons
                </button>
              </div>
            </div>

            {/* Editorial geometry - desktop only */}
            <div className="hidden md:flex flex-col items-end gap-6">
              <div className="w-48 h-48 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(247,245,241,0.2)' }}>
                <div className="w-32 h-32 rounded-full" style={{ background: 'rgba(247,245,241,0.08)' }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full" style={{ background: 'rgba(247,245,241,0.15)' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px w-24" style={{ background: 'rgba(247,245,241,0.3)' }} />
                <div className="font-display text-6xl italic font-300" style={{ color: 'rgba(247,245,241,0.15)' }}>
                  Faith
                </div>
              </div>
              <div className="flex gap-3">
                {['#1B4CE0', '#E8A93B', '#C4432B'].map((c, i) => (
                  <div key={i} className="w-8 h-8" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(247,245,241,0.5)' }}>
          <div className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Scroll</div>
          <div className="w-px h-8" style={{ background: 'rgba(247,245,241,0.3)' }} />
        </div>
      </section>

      {/* Quick Links — Editorial grid */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SeriesTag label="Explore" color="#22201D" />
            <h2 className="font-display text-3xl md:text-4xl font-600" style={{ color: '#22201D', lineHeight: 1.1 }}>
              What brings<br />you here?
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
              onClick={() => { setPage(item.page); window.scrollTo(0, 0) }}
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

      {/* Latest Sermon — Editorial strip */}
      <section style={{ background: '#22201D' }} className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 mb-12">
            <SeriesTag label="Latest Message" color="#1B4CE0" />
            <div className="flex-1 h-px" style={{ background: 'rgba(247,245,241,0.1)' }} />
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
            {/* Featured sermon */}
            <div className="md:col-span-3">
              <div
                className="relative aspect-video mb-6 overflow-hidden"
                style={{ background: '#1A1814' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&auto=format"
                  alt="Pastor preaching"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(247,245,241,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(247,245,241,0.3)' }}
                  >
                    <div className="w-0 h-0 ml-1" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #F7F5F1' }} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <SeriesTag label="Gospel of John" color="#1B4CE0" />
                </div>
                <div className="absolute bottom-4 right-4 text-xs" style={{ color: 'rgba(247,245,241,0.6)', fontFamily: 'Inter, sans-serif' }}>
                  42 min
                </div>
              </div>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                Jul 27, 2025 · Rev. Samuel Mwangi
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-600 mb-4" style={{ color: '#F7F5F1', lineHeight: 1.1 }}>
                The Bread of Life
              </h3>
              <button
                onClick={() => { setPage('sermons'); window.scrollTo(0, 0) }}
                className="text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ color: '#E8A93B', fontFamily: 'Inter, sans-serif' }}
              >
                Watch Full Sermon <span>→</span>
              </button>
            </div>

            {/* Pull quote + sidebar */}
            <div className="md:col-span-2">
              <div
                className="p-6 mb-8"
                style={{ borderLeft: '3px solid #C9A24B' }}
              >
                <div className="font-display text-2xl italic font-300 mb-4" style={{ color: '#F7F5F1', lineHeight: 1.4 }}>
                  "I am the bread of life. Whoever comes to me will never go hungry."
                </div>
                <div className="text-xs uppercase tracking-widest" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                  John 6:35
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                  More Sermons
                </div>
                {sermonCards.slice(1).map((s) => (
                  <button
                    key={s.num}
                    onClick={() => { setPage('sermons'); window.scrollTo(0, 0) }}
                    className="w-full flex items-center gap-4 text-left group"
                  >
                    <div className="w-12 h-12 flex-shrink-0" style={{ background: s.color, opacity: 0.8 }}>
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono font-bold" style={{ color: '#F7F5F1' }}>
                        {s.num}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-base font-600 group-hover:opacity-70 transition-opacity" style={{ color: '#F7F5F1' }}>{s.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{s.date} · {s.duration}</div>
                    </div>
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
              src="assets/images/youth/youth-02.jpg"
              alt="Congregation gathered together in worship at ACK Berea Church"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Life Together</div>
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-5" style={{ color: '#22201D', lineHeight: 1.1 }}>
              Growing Together<br />in Faith
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '50ch' }}>
              Our parish thrives on shared worship, fellowship, and service. From Sunday mornings to midweek studies, from children's laughter to seniors' wisdom — every person finds a place in this community.
            </p>
            <button
              onClick={() => { setPage('plan-visit'); window.scrollTo(0, 0) }}
              className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: '#1B4CE0', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>

      {/* Service Info Band */}
      <section className="py-16 md:py-20" style={{ background: '#F7F5F1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-px" style={{ background: '#B8B2A8' }}>
            {[
              { label: 'Sunday Services', val: '8:00 AM · 10:30 AM', sub: 'Main Sanctuary' },
              { label: 'Wednesday Study', val: '6:00 PM', sub: 'Parish Hall' },
              { label: 'Location', val: 'Tola Road, Berea', sub: 'Nairobi, Kenya' },
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
            Stay Connected
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-600 mb-4" style={{ color: '#F7F5F1', lineHeight: 1.1 }}>
            Join our parish community
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.65)', fontFamily: 'Inter, sans-serif' }}>
            Receive sermon notes, event announcements, and parish updates each week.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
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
              className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
              style={{ background: '#C9A24B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────

function AboutPage() {
  const chapters = [
    {
      num: '01',
      title: 'Our Story',
      body: 'ACK Berea Church, Tola Parish was established in 1987 as part of the Anglican Church of Kenya within the Diocese of Mount Kenya South. What began as a small fellowship of thirty families has grown into a thriving parish of over 800 members, rooted in Scripture, worship, and community.',
    },
    {
      num: '02',
      title: 'Our Mission',
      body: 'We exist to glorify God by making disciples of Jesus Christ through faithful preaching of the Word, sacramental worship, pastoral care, and compassionate service to our neighbours in Berea and beyond.',
    },
    {
      num: '03',
      title: 'What We Believe',
      body: 'We hold to the historic faith of the Church as expressed in the Apostles\' and Nicene Creeds, the Thirty-Nine Articles, and the Book of Common Prayer. We affirm the authority of Holy Scripture as the Word of God and the sufficiency of Christ\'s atoning work for salvation.',
    },
  ]

  const beliefs = [
    'The Holy Trinity — Father, Son, and Holy Spirit',
    'The full authority and sufficiency of Holy Scripture',
    'Salvation by grace alone, through faith alone, in Christ alone',
    'The bodily resurrection and second coming of Jesus Christ',
    'The Church as the body of Christ, one, holy, catholic, and apostolic',
    'Baptism and Holy Communion as means of grace',
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1' }}>
      {/* Hero */}
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Anglican Church of Kenya · Diocese of Mount Kenya South
            </div>
            <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#22201D', letterSpacing: '-0.02em' }}>
              Who We<br /><em>Are</em>
            </h1>
          </div>
          <div className="relative">
            <div className="glass-photo-frame" style={{ height: 280 }}>
              <img
                src="assets/images/general/congregation-01.jpg"
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
            Statement of Faith
          </div>
          <h2 className="font-display text-3xl font-600 mb-10" style={{ color: '#F7F5F1' }}>
            What We Hold
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
  const [filter, setFilter] = useState('All')
  const series = ['All', 'Gospel of John', 'Hebrews', 'Psalms', 'Romans']

  const sermons = [
    { title: 'The Bread of Life', series: 'Gospel of John', date: 'Jul 27, 2025', speaker: 'Rev. Samuel Mwangi', dur: '42 min', color: '#1B4CE0', img: 'photo-1507003211169-0a1dd7228f2d' },
    { title: 'Walking by Faith', series: 'Hebrews', date: 'Jul 20, 2025', speaker: 'Rev. Samuel Mwangi', dur: '38 min', color: '#0F5C42', img: 'photo-1464207687429-7505649dae38' },
    { title: 'The Good Shepherd', series: 'Gospel of John', date: 'Jul 13, 2025', speaker: 'Deacon Grace Wanjiku', dur: '45 min', color: '#6B1E2B', img: 'photo-1529070538774-1843cb3265df' },
    { title: 'A Psalm of Ascent', series: 'Psalms', date: 'Jul 6, 2025', speaker: 'Rev. Samuel Mwangi', dur: '36 min', color: '#E8A93B', img: 'photo-1478147427282-58a87a433b2d' },
    { title: 'Righteousness by Faith', series: 'Romans', date: 'Jun 29, 2025', speaker: 'Ven. Peter Kamau', dur: '48 min', color: '#C4432B', img: 'photo-1504052434569-70ad5836ab65' },
    { title: 'Light of the World', series: 'Gospel of John', date: 'Jun 22, 2025', speaker: 'Rev. Samuel Mwangi', dur: '40 min', color: '#1E3A6D', img: 'photo-1518005020951-eccb494ad742' },
  ]

  const filtered = filter === 'All' ? sermons : sermons.filter(s => s.series === filter)

  return (
    <div className="page-fade" style={{ background: '#22201D', minHeight: '100vh' }}>
      {/* Live Banner */}
      <div
        className="relative py-5 px-6 md:px-10 text-center overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #1B4CE0, #5B2DB8, #C4432B)' }}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full pulse-live" style={{ background: '#F7F5F1' }} />
          <span className="font-display italic text-lg" style={{ color: '#F7F5F1' }}>Watch Live — Sunday 8:00 AM & 10:30 AM</span>
          <button className="ml-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(247,245,241,0.2)', color: '#F7F5F1', border: '1px solid rgba(247,245,241,0.3)', fontFamily: 'Inter, sans-serif' }}>
            Join Stream
          </button>
        </div>
      </div>

      <div className="pt-24 pb-8 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
          Messages & Media
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-700 mb-10" style={{ color: '#F7F5F1', letterSpacing: '-0.02em' }}>
          Sermons
        </h1>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-12">
          {series.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all"
              style={{
                background: filter === s ? '#1B4CE0' : 'transparent',
                color: filter === s ? '#F7F5F1' : '#B8B2A8',
                border: `1px solid ${filter === s ? '#1B4CE0' : 'rgba(184,178,168,0.3)'}`,
                fontFamily: 'Inter, sans-serif',
                minHeight: 44,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sermon Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 9px), rgba(247,245,241,0.06)`,
                border: '1px solid rgba(247,245,241,0.1)',
              }}
            >
              <div className="relative aspect-video overflow-hidden" style={{ background: '#1A1814' }}>
                <img
                  src={`https://images.unsplash.com/${s.img}?w=500&h=280&fit=crop&auto=format`}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute top-3 left-3">
                  <SeriesTag label={s.series} color={s.color} />
                </div>
                <div className="absolute bottom-3 right-3 text-xs" style={{ color: 'rgba(247,245,241,0.6)', fontFamily: 'Inter, sans-serif' }}>
                  {s.dur}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(247,245,241,0.2)', backdropFilter: 'blur(8px)' }}>
                    <div className="w-0 h-0 ml-1" style={{ borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid #F7F5F1' }} />
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
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── PLAN VISIT PAGE ─────────────────────────────────────────────────────────

function PlanVisitPage({ setPage }: { setPage: (p: Page) => void }) {
  const steps = [
    { num: '01', title: 'Arrive & Park', body: 'Our car park is open from 7:30 AM. Ushers in blue lanyards will guide you to the best entrance. Boda-boda drop-off is on the Tola Road side.' },
    { num: '02', title: 'Connect at the Welcome Desk', body: 'Stop by our Welcome Desk in the foyer. Pick up a service programme, connect card, and a gift bag for first-time visitors.' },
    { num: '03', title: 'Settle In & Worship', body: 'Our services run 90–100 minutes and follow Anglican liturgy — a printed order of service is available. Expect rich congregational singing, a clear Bible message, and Holy Communion.' },
    { num: '04', title: 'Meet the Team', body: 'After the service, Rev. Mwangi and our Welcome Team host a brief reception in the garden. No pressure — just coffee, chai, and conversation.' },
  ]

  const faqs = [
    { q: "What should I wear?", a: "Smart casual is the norm — Sunday best is welcome but not required. Come as you are." },
    { q: "Is there a children's programme?", a: "Yes. Kids Church (ages 3–12) runs concurrently with both services. Teens (13–17) join the main service and have their own youth group on Friday evenings." },
    { q: "Are visitors welcome at Communion?", a: "All baptised Christians are welcome at the Lord's Table. If you're not baptised, you are warmly invited to come forward for a blessing." },
    { q: "Can I give a tithe or offering as a visitor?", a: "The offering basket is passed during the service — giving is entirely optional for guests." },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1' }}>
      {/* Hero */}
      <div
        className="relative pt-24 pb-20 px-6 md:px-10 overflow-hidden"
        style={{ background: '#22201D' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            We'd love to see you
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            Plan Your<br /><em>Visit</em>
          </h1>
          <button
            className="px-8 py-4 font-semibold uppercase tracking-wider text-sm transition-all"
            style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            I'm Coming Sunday →
          </button>
          <button
            onClick={() => { setPage('service-times'); window.scrollTo(0, 0) }}
            className="ml-3 px-6 py-4 font-semibold uppercase tracking-wider text-sm"
            style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Service Times
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
            src="assets/images/general/congregation-02.jpg"
            alt="Warm welcome at ACK Berea Church entrance"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Steps */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <SeriesTag label="What to Expect" color="#1B4CE0" />
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
            { label: 'Dress Code', icon: '✦', detail: 'Smart casual. Come as you are.' },
            { label: "Kids' Church", icon: '✦', detail: 'Ages 3–12. Trained facilitators. Safe & fun.' },
            { label: 'Parking', icon: '✦', detail: 'Free on-site parking. Gates open 7:30 AM.' },
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
        <SeriesTag label="First-Timer FAQ" color="#22201D" />
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
  const [amount, setAmount] = useState('500')
  const [recurring, setRecurring] = useState(false)
  const presets = ['200', '500', '1000', '2500', '5000']

  return (
    <div className="page-fade" style={{ minHeight: '100vh' }}>
      {/* Hero — Regency + chromatic gradient */}
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
          <RegencyDivider />
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: '#F7F5F1', letterSpacing: '-0.02em', lineHeight: 1.0 }}>
            Give Generously
          </h1>
          <p className="font-display text-xl italic font-300 max-w-lg mx-auto" style={{ color: 'rgba(247,245,241,0.75)' }}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <div className="text-xs mt-3 uppercase tracking-widest" style={{ color: 'rgba(201,162,75,0.8)', fontFamily: 'Inter, sans-serif' }}>
            2 Corinthians 9:7
          </div>
          <RegencyDivider />
        </div>
      </div>

      {/* Giving Form */}
      <div className="glass-light" style={{ background: '#F7F5F1' }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <h2 className="font-display text-3xl font-600 mb-8" style={{ color: '#22201D' }}>Make a Gift</h2>

            {/* Recurring toggle */}
            <div className="flex gap-3 mb-8">
              {['One-time', 'Monthly'].map((t) => (
                <button
                  key={t}
                  onClick={() => setRecurring(t === 'Monthly')}
                  className="px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all"
                  style={{
                    background: (t === 'Monthly') === recurring ? '#1E3A6D' : 'transparent',
                    color: (t === 'Monthly') === recurring ? '#F7F5F1' : '#22201D',
                    border: `1px solid ${(t === 'Monthly') === recurring ? '#1E3A6D' : '#B8B2A8'}`,
                    fontFamily: 'Inter, sans-serif',
                    minHeight: 44,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Amount presets */}
            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Select Amount (KES)</div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(p)}
                    className="py-3 text-sm font-semibold transition-all"
                    style={{
                      background: amount === p ? '#C9A24B' : 'transparent',
                      color: amount === p ? '#22201D' : '#22201D',
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

            {/* Payment fields */}
            <div className="space-y-3 mb-6">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'Jane Wanjiku' },
                { label: 'Email', type: 'email', placeholder: 'jane@example.com' },
                { label: 'Phone (M-Pesa)', type: 'tel', placeholder: '+254 700 000 000' },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{f.label}</div>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                  />
                </div>
              ))}
            </div>

            <button
              className="w-full py-4 font-semibold uppercase tracking-wider text-sm transition-all hover:opacity-90"
              style={{ background: '#0F5C42', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 54 }}
            >
              Give KES {parseInt(amount || '0').toLocaleString()} via M-Pesa →
            </button>

            <div className="mt-4 flex items-center gap-2">
              <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>🔒 Secure · Encrypted · Trusted by 800+ members</div>
            </div>
          </div>

          {/* Where it goes */}
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-2xl font-600 mb-6" style={{ color: '#22201D' }}>Where Gifts Go</h3>
            <div className="space-y-4">
              {[
                { label: 'Parish Ministry & Worship', pct: 45, color: '#1E3A6D' },
                { label: 'Community Outreach & Benevolence', pct: 25, color: '#0F5C42' },
                { label: 'Building & Maintenance', pct: 18, color: '#C9A24B' },
                { label: 'Diocese Support & Mission', pct: 12, color: '#6B1E2B' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
                    <span className="text-sm font-semibold" style={{ color: item.color, fontFamily: 'Inter, sans-serif' }}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5" style={{ background: '#E8E5E0' }}>
                    <div className="h-full transition-all" style={{ background: item.color, width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6" style={{ background: '#22201D' }}>
              <div className="font-display text-xl italic font-300 mb-3" style={{ color: '#F7F5F1' }}>
                "Honour the Lord with your wealth, with the firstfruits of all your crops."
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>Proverbs 3:9</div>
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
  const events = [
    { date: 'Aug 3', day: 'Sun', title: 'Holy Communion Service', time: '8:00 AM & 10:30 AM', tag: 'Worship', color: '#1B4CE0' },
    { date: 'Aug 6', day: 'Wed', title: 'Bible Study — Hebrews', time: '6:00 PM', tag: 'Study', color: '#0F5C42' },
    { date: 'Aug 9', day: 'Sat', title: "Mothers' Union Fundraiser", time: '10:00 AM', tag: 'Community', color: '#C4432B' },
    { date: 'Aug 10', day: 'Sun', title: "Youth Sunday", time: '10:30 AM', tag: 'Youth', color: '#E8A93B' },
    { date: 'Aug 15', day: 'Fri', title: "Men's Breakfast", time: '7:00 AM', tag: 'Men', color: '#1E3A6D' },
    { date: 'Aug 17', day: 'Sun', title: 'Confirmation Classes Begin', time: '12:00 PM', tag: 'Formation', color: '#6B1E2B' },
    { date: 'Aug 23', day: 'Sat', title: 'Community Outreach — Kibera', time: '9:00 AM', tag: 'Outreach', color: '#0F5C42' },
    { date: 'Aug 31', day: 'Sun', title: 'Parish AGM', time: '12:30 PM', tag: 'Parish', color: '#B8B2A8' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>August 2025</div>
            <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Events</h1>
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
                <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{e.day}</div>
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

function MinistriesPage({ setPage }: { setPage: (p: Page) => void }) {
  const ministries = [
    {
      title: 'Youth Ministry',
      subtitle: 'Ages 13–24 · Fridays & Sundays',
      lead: 'Dea. Grace Wanjiku',
      page: 'youth' as Page,
      img: 'assets/images/youth/youth-01.jpg',
      color: '#E8A93B',
      tag: 'Youth',
      desc: 'Friday fellowships, camps, mentorship, worship rehearsals, and service projects that help young people grow in faith and friendship.',
      featured: true,
    },
    {
      title: 'Kenya Anglican Men Association (KAMA)',
      subtitle: 'Men of all ages · Monthly',
      lead: 'Bro. Joseph Maina',
      page: 'kama' as Page,
      img: 'assets/images/kama.jpg',
      color: '#1E3A6D',
      tag: 'KAMA',
      desc: 'Men grounded in prayer, Bible study, accountability, and servant leadership within the family, church, and community.',
      featured: false,
    },
    {
      title: "Mothers' Union",
      subtitle: 'Women of all ages · Wednesdays',
      lead: 'Mrs. Ruth Njoroge',
      page: 'mothers-union' as Page,
      img: 'assets/images/mothers-union.jpg',
      color: '#6B1E2B',
      tag: 'Mothers',
      desc: 'A worldwide Anglican fellowship of women devoted to prayer, family life, outreach, and the well-being of mothers and children.',
      featured: false,
    },
    {
      title: 'Sunday School Ministry',
      subtitle: 'Ages 3–12 · Sunday mornings',
      lead: 'Sis. Anne Kamau',
      page: 'sunday-school' as Page,
      img: 'assets/images/general/congregation-02.jpg',
      color: '#1B4CE0',
      tag: 'Kids',
      desc: 'Safe, joyful, and Bible-centred learning for children every Sunday morning — songs, stories, crafts, and trained facilitators.',
      featured: false,
    },
    {
      title: 'Choir & Worship',
      subtitle: 'All ages · Rehearsals Sat 9 AM',
      lead: 'Mr. David Ochieng',
      page: 'ministries' as Page,
      img: 'assets/images/youth/youth-08.jpg',
      color: '#C4432B',
      tag: 'Worship',
      desc: 'Lead the congregation in worship each Sunday with voices, instruments, and a heart for excellence.',
      featured: false,
    },
    {
      title: 'Community Outreach',
      subtitle: 'All members · Monthly',
      lead: 'Rev. Samuel Mwangi',
      page: 'ministries' as Page,
      img: 'assets/images/youth/youth-05.jpg',
      color: '#0F5C42',
      tag: 'Service',
      desc: 'Kibera visits, food distribution, hospital ministry, and practical compassion to our neighbours in need.',
      featured: false,
    },
  ]

  const featured = ministries.find(m => m.featured)!
  const rest = ministries.filter(m => !m.featured)

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Find Your Community</div>
        <h1 className="font-display text-4xl md:text-6xl font-700 mb-10" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Ministries</h1>
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
              {featured.subtitle} · Led by {featured.lead}
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '52ch' }}>
              {featured.desc}
            </p>
            <button
              onClick={() => { setPage(featured.page); window.scrollTo(0, 0) }}
              className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
              style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
            >
              Explore Youth Ministry →
            </button>
          </div>
        </div>

        {/* Ministry grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {rest.map((m) => (
            <button
              key={m.title}
              onClick={() => { setPage(m.page); window.scrollTo(0, 0) }}
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
                <div className="text-xs mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{m.subtitle} · Led by {m.lead}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{m.desc}</p>
              </div>
            </button>
          ))}
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
        <h1 className="font-display mt-5 mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
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

function MinistryJoinCTA({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <div className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 chromatic-gradient" />
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-3" style={{ color: '#F7F5F1' }}>Join the Ministry</h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
          We'd love to walk with you. Reach out to the ministry lead or stop by after a Sunday service.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setPage('contact'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ background: '#F7F5F1', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Contact Us
          </button>
          <button
            onClick={() => { setPage('plan-visit'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ border: '1px solid rgba(247,245,241,0.4)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Plan Your Visit
          </button>
        </div>
      </div>
    </div>
  )
}

function YouthPage({ setPage }: { setPage: (p: Page) => void }) {
  const activities = [
    { img: 'assets/images/youth/youth-01.jpg', alt: 'Youth group gathered for a Saturday worship rehearsal' },
    { img: 'assets/images/youth/youth-03.jpg', alt: 'Young people singing together during fellowship' },
    { img: 'assets/images/youth/youth-05.jpg', alt: 'Youth ministry volunteers at a community service day' },
    { img: 'assets/images/youth/youth-07.jpg', alt: 'Youth enjoying a group activity and games' },
    { img: 'assets/images/youth/youth-09.jpg', alt: 'Teens studying scripture during Friday fellowship' },
    { img: 'assets/images/youth/youth-11.jpg', alt: 'Youth camp morning devotion outside' },
    { img: 'assets/images/youth/youth-13.jpg', alt: 'Youth ministry small group discussion' },
    { img: 'assets/images/youth/youth-15.jpg', alt: 'Youth celebrating after a service project' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag="Youth Ministry"
        title="Growing Young in Faith"
        subtitle="Friday fellowships, Sunday worship, camps, and service — a community where young people belong, grow, and lead."
        color="#E8A93B"
        image="assets/images/youth/youth-01.jpg"
        imageAlt="Youth ministry group during a Saturday worship rehearsal at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>About the Youth Ministry</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              The Youth Ministry at ACK Berea Church welcomes young people aged 13–24 into a vibrant, Christ-centred community. Through Friday fellowships, worship team participation, camps, mentorship, and service projects, our youth grow in their walk with God and in friendship with one another.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Our vision is to see every young person know Jesus, discover their gifts, and serve boldly in the church and community.
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>Meeting Times</h3>
            <MinistryInfoRow label="Friday Fellowship" value="6:00 PM – 8:00 PM · Parish Hall" />
            <MinistryInfoRow label="Sunday Worship" value="8:00 AM & 10:30 AM · Main Sanctuary" />
            <MinistryInfoRow label="Worship Rehearsal" value="Saturday · 9:00 AM · Choir Room" />
            <MinistryInfoRow label="Youth Group (13–17)" value="Friday Evenings · Youth Room" />
            <MinistryInfoRow label="Led By" value="Dea. Grace Wanjiku" />
            <MinistryInfoRow label="Next Camp" value="August 2025 · Lake Naivasha" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-photo-frame aspect-[4/3]">
            <img
              src="assets/images/kayo.jpg"
              alt="KAYO members of ACK Berea Church gathered together"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="regency-rule block mb-5" style={{ borderColor: '#E8A93B' }} />
            <h2 className="font-display text-3xl md:text-4xl font-600 mb-5" style={{ color: '#22201D' }}>KAYO: Kenya Anglican Youth Organisation</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              As part of the nationwide KAYO movement, our youth join diocesan and national rallies, leadership camps, and mission weeks alongside other young Anglicans from across Kenya.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Being a KAYO member means belonging to something bigger — learning from peer leaders, serving in mission, and carrying the Gospel into schools, campuses, and communities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-600" style={{ color: '#22201D' }}>In the Life of Youth Ministry</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {activities.map((a, i) => (
            <div key={i} className="glass-photo-frame aspect-square">
              <img src={a.img} alt={a.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <MinistryJoinCTA page="youth" setPage={setPage} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function KAMAPage({ setPage }: { setPage: (p: Page) => void }) {
  const pillars = [
    { num: '01', title: 'Prayer & Bible Study', body: 'Men gathered around the Word — monthly fellowship breakfasts and small accountability groups.' },
    { num: '02', title: 'Servant Leadership', body: 'Leading families, church, and community with integrity, gentleness, and strength.' },
    { num: '03', title: 'Fellowship & Support', body: 'Walking together through life — celebrating joys, carrying burdens, and mentoring younger men.' },
    { num: '04', title: 'Community Service', body: 'Serving the parish and neighbourhood through projects, security, and practical help.' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag="KAMA"
        title="Kenya Anglican Men Association"
        subtitle="Men of ACK Berea — rooted in Scripture, active in service, and committed to faithful leadership at home, church, and community."
        color="#1E3A6D"
        image="assets/images/kama.jpg"
        imageAlt="Men of the Kenya Anglican Men Association at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>Men Discipling Men</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              KAMA (Kenya Anglican Men Association) is the men's wing of the Anglican Church of Kenya. At Berea Parish, we meet regularly for prayer, Bible study, and fellowship — growing together as godly husbands, fathers, and servant leaders.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              Whether you are a long-time member or new to the parish, you are welcome to join the brotherhood.
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>Meeting Times</h3>
            <MinistryInfoRow label="Monthly Breakfast" value="First Saturday · 7:00 AM · Parish Hall" />
            <MinistryInfoRow label="Men's Fellowship" value="Monthly · Saturday · 10:00 AM" />
            <MinistryInfoRow label="Sunday Services" value="8:00 AM & 10:30 AM · Main Sanctuary" />
            <MinistryInfoRow label="Led By" value="Bro. Joseph Maina" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-10" style={{ color: '#22201D' }}>Our Four Pillars</h2>
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

      <MinistryJoinCTA page="kama" setPage={setPage} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function MothersUnionPage({ setPage }: { setPage: (p: Page) => void }) {
  const focuses = [
    { title: 'Prayer', body: 'A prayerful fellowship lifting up families, the church, and the nation.' },
    { title: 'Family Life', body: 'Nurturing Christian homes and supporting mothers and children.' },
    { title: 'Outreach', body: 'Serving widows, orphans, and vulnerable families in our community.' },
    { title: 'Community', body: 'A warm sisterhood of women walking together in every season of life.' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <MinistryHero
        tag="Mothers' Union"
        title="The Mothers' Union"
        subtitle="A worldwide Anglican fellowship of women devoted to prayer, family life, and care for mothers and children."
        color="#6B1E2B"
        image="assets/images/mothers-union.jpg"
        imageAlt="Mothers' Union members in worship at ACK Berea Church"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl font-600 mb-5" style={{ color: '#22201D' }}>Serving with Love</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              The Mothers' Union at ACK Berea Church is part of an international Christian fellowship that has supported family life for over a century. Our members gather in prayer, grow in faith, and serve families in the parish and beyond.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif', maxWidth: '56ch' }}>
              All women of the parish — mothers, grandmothers, and women at every stage of life — are warmly welcome.
            </p>
          </div>
          <div className="glass-light-subtle p-8">
            <h3 className="font-display text-xl font-600 mb-6" style={{ color: '#22201D' }}>Meeting Times</h3>
            <MinistryInfoRow label="MU Fellowship" value="Wednesday · 10:00 AM · Parish Hall" />
            <MinistryInfoRow label="Mothers' Prayer" value="Wednesday · 11:00 AM" />
            <MinistryInfoRow label="Fundraisers & Events" value="Monthly · Check Events Page" />
            <MinistryInfoRow label="Led By" value="Mrs. Ruth Njoroge" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <h2 className="font-display text-3xl md:text-4xl font-600 mb-10" style={{ color: '#22201D' }}>What We Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {focuses.map((f) => (
            <div key={f.title} className="glass-light-subtle p-8">
              <h3 className="font-display text-xl font-600 mb-3" style={{ color: '#22201D' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4744', fontFamily: 'Inter, sans-serif' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      <MinistryJoinCTA page="mothers-union" setPage={setPage} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

function SundaySchoolPage({ setPage }: { setPage: (p: Page) => void }) {
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
        image="assets/images/general/congregation-02.jpg"
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

      <MinistryJoinCTA page="sunday-school" setPage={setPage} />
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── SERVICE TIMES & LOCATION PAGE ───────────────────────────────────────────

function ServiceTimesPage() {
  const services = [
    { day: 'Sunday', time: '8:00 AM', type: 'Holy Communion', color: '#0F5C42' },
    { day: 'Sunday', time: '10:30 AM', type: 'Family Service', color: '#1E3A6D' },
    { day: 'Wednesday', time: '6:00 PM', type: 'Midweek Service & Bible Study', color: '#6B1E2B' },
    { day: 'Friday', time: '6:00 PM', type: 'Youth Fellowship', color: '#E8A93B' },
    { day: 'Saturday', time: '9:00 AM', type: 'Choir & Worship Rehearsal', color: '#1B4CE0' },
  ]

  const parking = [
    { icon: '⌂', title: 'On-Site Parking', body: 'Free parking inside the compound. Gates open at 7:30 AM on Sundays.' },
    { icon: '♿', title: 'Accessible Spaces', body: 'Reserved parking and ramp access near the main entrance.' },
    { icon: '✆', title: 'Boda-Boda & Drop-Off', body: 'Drop-off zone on the Tola Road side — easy for riders and drivers.' },
    { icon: '⏱', title: 'Peak Arrival', body: 'Arrive by 7:50 AM for the 8:00 AM service to find a spot comfortably.' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
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
                <div className="font-display text-3xl font-700" style={{ color: '#F7F5F1' }}>{s.time}</div>
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
            <h2 className="font-display text-3xl font-600 mt-4 mb-5" style={{ color: '#22201D' }}>Tola Road, Berea, Nairobi</h2>
            <div className="space-y-4">
              {[
                ['Directions', 'From Juja Road, turn onto Tola Road; the parish compound is 300m on the left.'],
                ['Public Transport', 'Matatus along the Juja Road route stop within walking distance of the gate.'],
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

function LeadershipPage({ setPage }: { setPage: (p: Page) => void }) {
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
            <img src="assets/images/events/rev-julis-lamp-lighting.jpg" alt="Rev. Julius lighting the Easter lamp at ACK Berea Church" loading="lazy" className="w-full h-full object-cover" />
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

      {/* Bishop + team */}
      <div className="py-10 px-6 md:px-10" style={{ background: '#22201D' }}>
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-600 mb-8" style={{ color: '#F7F5F1' }}>Shepherds & Servants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="glass-photo-frame aspect-square">
              <img src="assets/images/leadership/bishop.jpg" alt="The Bishop of the Diocese of Mount Kenya South" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:col-span-1 flex flex-col justify-center" style={{ background: 'rgba(247,245,241,0.06)', border: '1px solid rgba(247,245,241,0.1)', borderRadius: 12 }}>
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>Diocesan Overseer</div>
              <div className="font-display text-2xl font-600 mb-1" style={{ color: '#F7F5F1' }}>The Rt. Rev. Bishop</div>
              <div className="text-sm" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Diocese of Mount Kenya South · ACK</div>
            </div>
            <div className="glass-photo-frame aspect-square">
              <img src="assets/images/general/worship-01.jpg" alt="Worship service at ACK Berea Church" loading="lazy" className="w-full h-full object-cover" />
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
            onClick={() => { setPage('get-involved'); window.scrollTo(0, 0) }}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider"
            style={{ background: '#1E3A6D', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
          >
            Get Involved
          </button>
          <button
            onClick={() => { setPage('contact'); window.scrollTo(0, 0) }}
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

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden" style={{ background: '#22201D' }}>
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
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
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                {[
                  { label: 'Your Name', type: 'text', placeholder: 'Jane Wanjiku' },
                  { label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{f.label}</div>
                    <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                  </div>
                ))}
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Area of Service</div>
                  <select className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
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
                  <textarea rows={3} placeholder="e.g. Sunday mornings and Thursday evenings" className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <button type="submit" className="w-full py-4 font-semibold uppercase tracking-wider text-sm" style={{ background: '#E8A93B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 52 }}>
                  Sign Me Up
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

  return (
    <div className="page-fade relative overflow-hidden" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 chromatic-gradient-soft opacity-25" />
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="pt-6">
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
                <button onClick={() => setSent(false)} className="mt-8 px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ border: '1px solid #22201D', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Your Name (optional)</div>
                  <input type="text" placeholder="Jane Wanjiku" className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid rgba(184,178,168,0.5)', background: 'rgba(255,255,255,0.7)', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Prayer Request</div>
                  <textarea rows={6} placeholder="Share what you'd like us to pray about…" className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid rgba(184,178,168,0.5)', background: 'rgba(255,255,255,0.7)', color: '#22201D', fontFamily: 'Inter, sans-serif' }} />
                </div>
                <label className="flex items-start gap-3 cursor-pointer" style={{ minHeight: 44 }}>
                  <input type="checkbox" checked={private_} onChange={(e) => setPrivate(e.target.checked)} className="mt-1 w-4 h-4" style={{ accentColor: '#0F5C42' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>
                    Keep my request private (shared only with the clergy, not the prayer team)
                  </span>
                </label>
                <button type="submit" className="w-full py-4 font-semibold uppercase tracking-wider text-sm" style={{ background: '#0F5C42', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 52 }}>
                  Send Prayer Request
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
    { title: 'Baptism Sunday — A Day of New Beginnings', category: 'Sacraments', date: 'Jul 20, 2026', color: '#1E3A6D', img: 'assets/images/events/baptism.jpg', read: '4 min read', excerpt: 'Seven souls were welcomed into the household of faith as Rev. Julius administered the sacrament of baptism.' },
    { title: 'The Easter Vigil & Lamp Lighting', category: 'Seasonal', date: 'Apr 5, 2026', color: '#0F5C42', img: 'assets/images/events/easter-lamp-lighting.jpg', read: '3 min read', excerpt: 'Our candlelit Easter Vigil gathered the parish in darkness and watched the light of Christ rise once more.' },
    { title: 'Youth Camp 2026 — Photos & Reflections', category: 'Youth', date: 'Aug 1, 2026', color: '#E8A93B', img: 'assets/images/youth/youth-11.jpg', read: '5 min read', excerpt: 'Three days at Lake Naivasha — morning devotions, small groups, and a church family growing closer.' },
    { title: 'KAMA Monthly Breakfast Fellowship', category: 'KAMA', date: 'Jul 12, 2026', color: '#C4432B', img: 'assets/images/kama.jpg', read: '2 min read', excerpt: 'Men of the parish gathered for breakfast, the Word, and honest conversation around the table.' },
    { title: "Mothers' Union Service of Dedication", category: 'Mothers\u2019 Union', date: 'Jun 28, 2026', color: '#6B1E2B', img: 'assets/images/mothers-union.jpg', read: '3 min read', excerpt: 'A joyful service as new members were dedicated into the Mothers\u2019 Union of the parish.' },
    { title: 'Sunday School Fun Day', category: 'Children', date: 'Jun 14, 2026', color: '#6B35C8', img: 'assets/images/general/congregation-01.jpg', read: '2 min read', excerpt: 'Games, songs, and a big lunch — the youngest members of our church had a day to remember.' },
  ]

  const [featured, ...rest] = posts

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Stories from Tola Parish</div>
        <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>News</h1>
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
    { img: 'assets/images/general/worship-01.jpg', alt: 'Congregation singing during worship', cat: 'Worship' },
    { img: 'assets/images/events/baptism-rev-julius.jpg', alt: 'Rev. Julius baptising a new member', cat: 'Sacraments' },
    { img: 'assets/images/youth/youth-02.jpg', alt: 'Youth worship team in rehearsal', cat: 'Youth' },
    { img: 'assets/images/events/easter-lamp-lighting-2.jpg', alt: 'Easter vigil lamp lighting', cat: 'Seasonal' },
    { img: 'assets/images/youth/youth-04.jpg', alt: 'Youth at a group activity', cat: 'Youth' },
    { img: 'assets/images/general/congregation-02.jpg', alt: 'The congregation at Sunday service', cat: 'Worship' },
    { img: 'assets/images/youth/youth-06.jpg', alt: 'Youth camp group photo', cat: 'Youth' },
    { img: 'assets/images/events/rev-julis-lamp-lighting.jpg', alt: 'Rev. Julius lighting the lamp', cat: 'Seasonal' },
    { img: 'assets/images/kama.jpg', alt: 'KAMA members of ACK Berea Church', cat: 'Fellowships' },
    { img: 'assets/images/youth/youth-08.jpg', alt: 'Young people enjoying fellowship', cat: 'Youth' },
    { img: 'assets/images/mothers-union.jpg', alt: "Mothers' Union members gathered", cat: 'Fellowships' },
    { img: 'assets/images/youth/youth-10.jpg', alt: 'Youth ministry outing', cat: 'Youth' },
    { img: 'assets/images/youth/youth-12.jpg', alt: 'Youth group study time', cat: 'Youth' },
    { img: 'assets/images/events/baptism.jpg', alt: 'Baptism service at the font', cat: 'Sacraments' },
    { img: 'assets/images/general/congregation-01.jpg', alt: 'Worshippers at ACK Berea Church', cat: 'Worship' },
    { img: 'assets/images/youth/youth-16.jpg', alt: 'Youth celebrating together', cat: 'Youth' },
  ]

  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Moments from the parish</div>
        <h1 className="font-display text-4xl md:text-6xl font-700 mb-4" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Gallery</h1>
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

function FAQPage({ setPage }: { setPage: (p: Page) => void }) {
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
        <div className="max-w-screen-xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
            Good questions, honest answers
          </div>
          <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.0, color: '#F7F5F1', letterSpacing: '-0.02em' }}>
            FAQ
          </h1>
          <p className="text-base" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>
            Everything first-time visitors ask us most. Still curious? <button onClick={() => { setPage('contact'); window.scrollTo(0, 0) }} className="underline" style={{ color: '#E8A93B' }}>Contact us</button>.
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
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Find your people</div>
        <h1 className="font-display text-4xl md:text-6xl font-700 mb-6" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Small Groups</h1>

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

  return (
    <div className="page-fade" style={{ background: '#22201D', minHeight: '100vh' }}>
      {/* Header */}
      <div className="relative pt-24 pb-8 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
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
                    <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}>Sunday · 8:00 AM & 10:30 AM</div>
                  </div>
                </div>
              ) : (
                <>
                  <img src="assets/images/general/congregation-02.jpg" alt="Live stream poster — Sunday service at ACK Berea Church" className="w-full h-full object-cover" />
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
                <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Holy Communion · 8:00 AM · ACK Berea Church, Tola Parish</div>
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
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Say hello…"
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid rgba(184,178,168,0.3)', background: 'rgba(247,245,241,0.08)', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                />
                <button className="px-5 text-xs font-semibold uppercase tracking-wider" style={{ background: '#C4432B', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 44 }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { t: '8:00 AM', label: 'Holy Communion' },
            { t: '10:30 AM', label: 'Family Service' },
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
    { img: 'assets/images/youth/youth-09.jpg', name: 'Brenda W.', role: 'Youth Member', quote: 'Youth fellowship became my second family. I found mentors who prayed with me through school and helped me discover my gifts in the choir.', body: 'When I joined Friday fellowship three years ago, I was shy and unsure of myself. Today I lead worship, serve in media, and I know, without a doubt, that God met me here.' },
    { img: 'assets/images/general/congregation-01.jpg', name: 'Charles M.', role: 'KAMA Member', quote: 'The men of this parish walked with me when life was heavy. That is church.', body: 'After my business struggled and I pulled away from everything, a KAMA brother called me every single week. They prayed, they listened, and they showed up. It changed how I see fellowship.' },
    { img: 'assets/images/mothers-union.jpg', name: 'Mama Jane K.', role: 'Mothers\u2019 Union', quote: 'In the Mothers\u2019 Union I found sisters — and a place to serve my community.', body: 'From home visits to caring for widows in Berea, the union gave my hands something faithful to do after my children grew up. The joy I have found here is beyond words.' },
    { img: 'assets/images/general/congregation-02.jpg', name: 'Daniel & Ruth O.', role: 'Parents', quote: 'Our children run to Sunday School every week. That says everything.', body: 'As new parents in the parish, we wondered if our kids would settle. The Sunday School teachers love them so well that they ask to come early. We grew up too — through the new parents group.' },
  ]

  const [idx, setIdx] = useState(0)
  const s = stories[idx]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-12 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Stories of grace</div>
        <h1 className="font-display text-4xl md:text-6xl font-700" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Testimonies</h1>
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

function ContactPage({ setPage }: { setPage: (p: Page) => void }) {
  const staff = [
    { name: 'Rev. Samuel Mwangi', role: 'Vicar', initial: 'SM', color: '#1E3A6D' },
    { name: 'Ven. Peter Kamau', role: 'Archdeacon', initial: 'PK', color: '#0F5C42' },
    { name: 'Dea. Grace Wanjiku', role: 'Youth Deacon', initial: 'GW', color: '#C4432B' },
    { name: 'Bro. Joseph Maina', role: 'Parish Administrator', initial: 'JM', color: '#E8A93B' },
  ]

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      <div className="pt-24 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Get in Touch</div>
        <h1 className="font-display text-4xl md:text-6xl font-700 mb-10" style={{ color: '#22201D', letterSpacing: '-0.02em' }}>Contact</h1>
        <RegencyDivider />

        <div className="flex flex-wrap gap-3 mb-10">
          {([
            ['Submit a Prayer Request', 'prayer-requests'],
            ['Common Questions (FAQ)', 'faq'],
            ['Service Times & Location', 'service-times'],
          ] as [string, Page][]).map(([label, p]) => (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo(0, 0) }}
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
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              {[
                { label: 'Your Name', type: 'text', placeholder: 'Jane Wanjiku' },
                { label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                { label: 'Subject', type: 'text', placeholder: 'Prayer request, general inquiry…' },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{f.label}</div>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                  />
                </div>
              ))}
              <div>
                <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Message</div>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{ border: '1px solid #B8B2A8', background: '#fff', color: '#22201D', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-semibold uppercase tracking-wider text-sm"
                style={{ background: '#22201D', color: '#F7F5F1', fontFamily: 'Inter, sans-serif', minHeight: 52 }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bottom-nav-spacer" />
    </div>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ background: '#22201D', borderTop: '1px solid rgba(184,178,168,0.1)' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: '#F7F5F1' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3"
                  style={{ background: '#F7F5F1', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </div>
              <div>
                <div className="font-display text-base font-600" style={{ color: '#F7F5F1' }}>ACK Berea Church</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Tola Parish</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif', maxWidth: '36ch' }}>
              Part of the Anglican Church of Kenya, Diocese of Mount Kenya South. Rooted in Scripture, committed to community.
            </p>
            <div className="text-xs" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Tola Road, Berea, Nairobi, Kenya<br />+254 20 123 4567
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Navigate</div>
            <div className="space-y-3">
              {(['about', 'sermons', 'events', 'ministries', 'give', 'contact'] as Page[]).map((p) => (
                <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0) }}
                  className="block text-sm capitalize hover:opacity-60 transition-opacity text-left"
                  style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Ministries */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Ministries</div>
            <div className="space-y-3">
              {([['Youth', 'youth'], ['KAMA', 'kama'], ["Mothers' Union", 'mothers-union'], ['Sunday School', 'sunday-school']] as [string, Page][]).map(([label, p]) => (
                <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0) }}
                  className="block text-sm hover:opacity-60 transition-opacity text-left"
                  style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>Services</div>
            <div className="space-y-3 text-sm" style={{ color: '#F7F5F1', fontFamily: 'Inter, sans-serif' }}>
              <div>Sunday <span style={{ color: '#B8B2A8' }}>8:00 AM</span></div>
              <div>Sunday <span style={{ color: '#B8B2A8' }}>10:30 AM</span></div>
              <div>Wednesday <span style={{ color: '#B8B2A8' }}>6:00 PM</span></div>
            </div>
          </div>

          {/* More */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>More</div>
            <div className="space-y-3">
              {([
                ['Service Times', 'service-times'],
                ['Leadership', 'leadership'],
                ['Get Involved', 'get-involved'],
                ['Prayer Requests', 'prayer-requests'],
                ['News', 'news'],
                ['Gallery', 'gallery'],
                ['Small Groups', 'small-groups'],
                ['Live Stream', 'live'],
                ['Testimonies', 'testimonies'],
                ['FAQ', 'faq'],
              ] as [string, Page][]).map(([label, p]) => (
                <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0) }}
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
            © 2025 ACK Berea Church, Tola Parish. All rights reserved.
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

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Nav page={page} setPage={setPage} />
      <BottomNav page={page} setPage={setPage} onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} page={page} setPage={setPage} onClose={() => setMenuOpen(false)} />

      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'about' && <AboutPage />}
      {page === 'sermons' && <SermonsPage />}
      {page === 'plan-visit' && <PlanVisitPage setPage={setPage} />}
      {page === 'give' && <GivePage />}
      {page === 'events' && <EventsPage />}
      {page === 'ministries' && <MinistriesPage setPage={setPage} />}
      {page === 'kama' && <KAMAPage setPage={setPage} />}
      {page === 'mothers-union' && <MothersUnionPage setPage={setPage} />}
      {page === 'sunday-school' && <SundaySchoolPage setPage={setPage} />}
      {page === 'youth' && <YouthPage setPage={setPage} />}
      {page === 'contact' && <ContactPage setPage={setPage} />}
      {page === 'service-times' && <ServiceTimesPage />}
      {page === 'leadership' && <LeadershipPage setPage={setPage} />}
      {page === 'get-involved' && <GetInvolvedPage />}
      {page === 'prayer-requests' && <PrayerRequestsPage />}
      {page === 'news' && <NewsPage />}
      {page === 'gallery' && <GalleryPage />}
      {page === 'faq' && <FAQPage setPage={setPage} />}
      {page === 'small-groups' && <SmallGroupsFinderPage />}
      {page === 'live' && <LiveStreamPage />}
      {page === 'testimonies' && <TestimoniesPage />}

      {page !== 'sermons' && <Footer setPage={setPage} />}
    </div>
  )
}
