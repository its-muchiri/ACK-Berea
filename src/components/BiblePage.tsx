import { useState, useCallback } from 'react'
import { getPassage, getChapter, searchBible, BIBLE_BOOKS, TRANSLATIONS, type BibleBook } from '../lib/bible'

type View = 'books' | 'chapters' | 'reading'

export default function BiblePage() {
  // Browser state
  const [view, setView] = useState<View>('books')
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([])
  const [translation, setTranslation] = useState('kjv')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Search state
  const [searchMode, setSearchMode] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<{ reference: string; text: string }[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const translationLabel = TRANSLATIONS.find(t => t.id === translation)?.name || translation.toUpperCase()

  // ─── Book selection ──────────────────────────────────────────────────────────
  const handleBookSelect = useCallback((book: BibleBook) => {
    setSelectedBook(book)
    setSelectedChapter(null)
    setVerses([])
    setError(null)
    if (book.chapters === 1) {
      // Single-chapter book (Philemon, 2 John, 3 John, Jude, Obadiah)
      handleChapterSelect(book, 1)
    } else {
      setView('chapters')
    }
  }, [])

  // ─── Chapter selection ───────────────────────────────────────────────────────
  const handleChapterSelect = useCallback(async (book: BibleBook, chapter: number) => {
    setSelectedBook(book)
    setSelectedChapter(chapter)
    setLoading(true)
    setError(null)
    setVerses([])
    setView('reading')

    try {
      const result = await getChapter(book.name, chapter, translation)
      setVerses(result.verses)
    } catch (err: any) {
      setError(err.message || 'Failed to load chapter. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [translation])

  // ─── Previous / Next chapter ─────────────────────────────────────────────────
  const goToPrevChapter = useCallback(() => {
    if (!selectedBook || !selectedChapter) return
    if (selectedChapter > 1) {
      handleChapterSelect(selectedBook, selectedChapter - 1)
    } else {
      // Go to previous book's last chapter
      const idx = BIBLE_BOOKS.findIndex(b => b.name === selectedBook.name)
      if (idx > 0) {
        const prevBook = BIBLE_BOOKS[idx - 1]
        handleChapterSelect(prevBook, prevBook.chapters)
      }
    }
  }, [selectedBook, selectedChapter, handleChapterSelect])

  const goToNextChapter = useCallback(() => {
    if (!selectedBook || !selectedChapter) return
    if (selectedChapter < selectedBook.chapters) {
      handleChapterSelect(selectedBook, selectedChapter + 1)
    } else {
      // Go to next book's first chapter
      const idx = BIBLE_BOOKS.findIndex(b => b.name === selectedBook.name)
      if (idx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[idx + 1]
        handleChapterSelect(nextBook, 1)
      }
    }
  }, [selectedBook, selectedChapter, handleChapterSelect])

  // ─── Search ──────────────────────────────────────────────────────────────────
  const handleSearch = useCallback(async () => {
    if (!searchInput.trim()) return
    setSearchLoading(true)
    setError(null)

    try {
      // Try as reference first
      const passage = await getPassage(searchInput.trim(), translation)
      setSearchResults([{ reference: passage.reference, text: passage.text }])
    } catch {
      // Try as topic search
      try {
        const results = await searchBible(searchInput.trim(), translation)
        setSearchResults(results)
        if (results.length === 0) {
          setError(`No results for "${searchInput}". Try a common topic like "love", "faith", or "hope".`)
        }
      } catch {
        setError(`Could not find "${searchInput}". Try a book name (e.g. "John"), a reference (e.g. "John 3:16"), or a topic (e.g. "love").`)
      }
    } finally {
      setSearchLoading(false)
    }
  }, [searchInput, translation])

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  // ─── Copy ────────────────────────────────────────────────────────────────────
  const handleCopy = useCallback((text: string, ref: string) => {
    const full = `${ref}\n\n${text}\n\n— ${translationLabel} via ACK Berea Church`
    navigator.clipboard.writeText(full)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [translationLabel])

  const handleCopyChapter = useCallback(() => {
    if (!selectedBook || !selectedChapter || verses.length === 0) return
    const ref = `${selectedBook.name} ${selectedChapter}`
    const text = verses.map(v => `${v.verse}. ${v.text}`).join('\n\n')
    handleCopy(text, ref)
  }, [selectedBook, selectedChapter, verses, handleCopy])

  // ─── Back navigation ─────────────────────────────────────────────────────────
  const goBack = () => {
    setError(null)
    if (view === 'reading') {
      if (selectedBook && selectedBook.chapters === 1) {
        setView('books')
        setSelectedBook(null)
      } else {
        setView('chapters')
      }
    } else if (view === 'chapters') {
      setView('books')
      setSelectedBook(null)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'ot')
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'nt')

  return (
    <div className="page-fade" style={{ background: '#F7F5F1', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="relative pt-24 pb-16 px-6 md:px-10 overflow-hidden"
        style={{ background: '#22201D' }}
      >
        <div className="absolute inset-0 chromatic-gradient opacity-30" />
        <img
          src="assets/images/logo/ack-crest.png"
          alt=""
          aria-hidden="true"
          className="absolute right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 opacity-25 hidden sm:block"
        />
        <div className="relative max-w-screen-xl mx-auto text-center">
          <div
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}
          >
            Search the Scriptures
          </div>
          <h1
            className="font-display mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              color: '#F7F5F1',
              letterSpacing: '-0.02em',
            }}
          >
            Bible
          </h1>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: 'rgba(247,245,241,0.7)', fontFamily: 'Inter, sans-serif' }}
          >
            Browse all 66 books, read chapters, and search by reference or topic.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">
        {/* Translation selector + Search toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Translation:
            </label>
            <select
              value={translation}
              onChange={(e) => {
                setTranslation(e.target.value)
                // Reload current chapter if viewing
                if (selectedBook && selectedChapter) {
                  setLoading(true)
                  getChapter(selectedBook.name, selectedChapter, e.target.value)
                    .then(r => setVerses(r.verses))
                    .catch(() => {})
                    .finally(() => setLoading(false))
                }
              }}
              className="px-3 py-2 text-sm"
              style={{
                background: '#22201D',
                color: '#F7F5F1',
                border: '1px solid rgba(184,178,168,0.3)',
                fontFamily: 'Inter, sans-serif',
                minHeight: 40,
                borderRadius: 0,
              }}
            >
              {TRANSLATIONS.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => { setSearchMode(!searchMode); setSearchResults([]); setError(null) }}
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90"
            style={{
              background: searchMode ? '#1B4CE0' : 'transparent',
              color: searchMode ? '#F7F5F1' : '#22201D',
              border: `1px solid ${searchMode ? '#1B4CE0' : 'rgba(184,178,168,0.4)'}`,
              fontFamily: 'Inter, sans-serif',
              minHeight: 40,
            }}
          >
            {searchMode ? '← Browse Books' : 'Search'}
          </button>
        </div>

        {/* Search Mode */}
        {searchMode && (
          <div className="mb-8">
            <div className="glass-light-subtle p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder='e.g. "John 3:16", "love", "Genesis 1"'
                  className="flex-1 px-4 py-3 text-base"
                  style={{
                    background: '#FFFFFF',
                    color: '#22201D',
                    border: '1px solid rgba(184,178,168,0.3)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: 44,
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={searchLoading || !searchInput.trim()}
                  className="px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: '#C9A24B', color: '#22201D', fontFamily: 'Inter, sans-serif', minHeight: 44 }}
                >
                  {searchLoading ? 'Searching...' : 'Search'}
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-6 space-y-3">
                  {searchResults.map((r) => (
                    <div key={r.reference} className="p-4" style={{ background: 'rgba(247,245,241,0.5)', border: '1px solid rgba(184,178,168,0.2)' }}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold mb-1" style={{ color: '#1B4CE0', fontFamily: 'Inter, sans-serif' }}>
                            {r.reference}
                          </div>
                          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1rem', lineHeight: 1.7, color: '#22201D' }}>
                            {r.text}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopy(r.text, r.reference)}
                          className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0"
                          style={{
                            background: copied ? '#0F5C42' : '#1E3A6D',
                            color: '#F7F5F1',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchLoading && (
                <div className="mt-6 space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse" style={{ background: 'rgba(184,178,168,0.15)', height: 80, borderRadius: 8 }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="p-4 mb-8 text-sm"
            style={{ background: 'rgba(196,67,43,0.1)', border: '1px solid rgba(196,67,43,0.3)', color: '#C4432B', fontFamily: 'Inter, sans-serif' }}
          >
            {error}
          </div>
        )}

        {/* ── BOOKS VIEW ─────────────────────────────────────────────────── */}
        {!searchMode && view === 'books' && (
          <div>
            {/* Old Testament */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl font-600 mb-1" style={{ color: '#22201D' }}>Old Testament</h2>
              <div className="w-16 h-0.5 mb-5" style={{ background: '#C9A24B' }} />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {otBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => handleBookSelect(book)}
                    className="p-3 text-left transition-all hover:shadow-md"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(184,178,168,0.2)' }}
                  >
                    <div className="text-sm font-medium" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>
                      {book.name}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                      {book.chapters} {book.chapters === 1 ? 'ch.' : 'chs.'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* New Testament */}
            <div>
              <h2 className="font-display text-xl md:text-2xl font-600 mb-1" style={{ color: '#22201D' }}>New Testament</h2>
              <div className="w-16 h-0.5 mb-5" style={{ background: '#C9A24B' }} />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {ntBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => handleBookSelect(book)}
                    className="p-3 text-left transition-all hover:shadow-md"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(184,178,168,0.2)' }}
                  >
                    <div className="text-sm font-medium" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>
                      {book.name}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                      {book.chapters} {book.chapters === 1 ? 'ch.' : 'chs.'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHAPTERS VIEW ──────────────────────────────────────────────── */}
        {!searchMode && view === 'chapters' && selectedBook && (
          <div>
            <button
              onClick={goBack}
              className="flex items-center gap-2 mb-6 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#1B4CE0', fontFamily: 'Inter, sans-serif' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              All Books
            </button>

            <h2 className="font-display text-2xl md:text-3xl font-600 mb-1" style={{ color: '#22201D' }}>{selectedBook.name}</h2>
            <div className="w-16 h-0.5 mb-6" style={{ background: '#C9A24B' }} />
            <div className="text-sm mb-6" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
              Select a chapter to read
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleChapterSelect(selectedBook, ch)}
                  className="aspect-square flex items-center justify-center text-sm font-medium transition-all hover:shadow-md"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(184,178,168,0.2)', color: '#22201D', fontFamily: 'Inter, sans-serif' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── READING VIEW ───────────────────────────────────────────────── */}
        {!searchMode && view === 'reading' && selectedBook && selectedChapter && (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button onClick={goBack} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: '#1B4CE0', fontFamily: 'Inter, sans-serif' }}>
                {selectedBook.name}
              </button>
              <span className="text-sm" style={{ color: '#B8B2A8' }}>/</span>
              <span className="text-sm font-medium" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif' }}>
                Chapter {selectedChapter}
              </span>
            </div>

            {/* Chapter header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-600 mb-1" style={{ color: '#22201D' }}>
                  {selectedBook.name} {selectedChapter}
                </h2>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
                  {translationLabel}
                </div>
              </div>
              <button
                onClick={handleCopyChapter}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all hover:opacity-90 flex-shrink-0"
                style={{
                  background: copied ? '#0F5C42' : '#1E3A6D',
                  color: '#F7F5F1',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: 40,
                }}
              >
                {copied ? 'Copied!' : 'Copy Chapter'}
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="animate-pulse" style={{ background: 'rgba(184,178,168,0.15)', height: 60, borderRadius: 8 }} />
                ))}
              </div>
            )}

            {/* Verses */}
            {!loading && verses.length > 0 && (
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 2, color: '#22201D', maxWidth: '70ch' }}>
                {verses.map((v) => (
                  <p key={v.verse} className="mb-3">
                    <sup className="font-semibold mr-1" style={{ color: '#C9A24B', fontSize: '0.7em' }}>{v.verse}</sup>
                    {v.text}
                  </p>
                ))}
              </div>
            )}

            {/* Prev / Next navigation */}
            {!loading && (
              <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: '1px solid rgba(184,178,168,0.2)' }}>
                <button
                  onClick={goToPrevChapter}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(184,178,168,0.12)',
                    color: '#22201D',
                    fontFamily: 'Inter, sans-serif',
                    opacity: (selectedBook.name === 'Genesis' && selectedChapter === 1) ? 0.3 : 1,
                  }}
                  disabled={selectedBook.name === 'Genesis' && selectedChapter === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Previous
                </button>

                <button
                  onClick={() => { setView('chapters') }}
                  className="px-4 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{ color: '#1B4CE0', fontFamily: 'Inter, sans-serif' }}
                >
                  Chapters
                </button>

                <button
                  onClick={goToNextChapter}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{
                    background: 'rgba(184,178,168,0.12)',
                    color: '#22201D',
                    fontFamily: 'Inter, sans-serif',
                    opacity: (selectedBook.name === 'Revelation' && selectedChapter === 22) ? 0.3 : 1,
                  }}
                  disabled={selectedBook.name === 'Revelation' && selectedChapter === 22}
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Attribution Footer */}
      <div
        className="py-6 px-6 md:px-10 text-center mt-8"
        style={{ borderTop: '1px solid rgba(184,178,168,0.2)' }}
      >
        <div
          className="text-[10px] max-w-screen-xl mx-auto"
          style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}
        >
          Scripture quotations are from the King James Version (KJV), World English Bible (WEB),
          and American Standard Version (ASV), all in the public domain. Powered by{' '}
          <a href="https://bible-api.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">Bible API</a>
          {' '}&amp;{' '}
          <a href="https://bible.helloao.org" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">Free Use Bible API</a>.
        </div>
      </div>

      <div className="bottom-nav-spacer" />
    </div>
  )
}
