/**
 * Bible API Service Layer
 *
 * API: bible-api.com (primary) — free, no key required, rate-limited to 15 req/30s per IP.
 * Fallback: bible.helloao.org (Free Use Bible API) — no rate limits, no API key.
 *
 * All translations used are public domain:
 * - KJV (King James Version) — public domain
 * - WEB (World English Bible) — public domain
 * - ASV (American Standard Version 1901) — public domain
 * - BBE (Bible in Basic English) — public domain
 * - Darby — public domain
 *
 * To add more translations later: check the license before adding.
 * Translations with "Open" or "Public Domain" in their license are safe.
 * Translations like NIV, ESV, NLT require licensing agreements.
 *
 * To swap to a different Bible API:
 * 1. Change the BASE_URL constant below
 * 2. Update the response parsing in fetchPassage()
 * 3. The VerseOfTheDay component only needs getVerseOfTheDay() — no changes needed there
 */

const BIBLE_API_BASE = 'https://bible-api.com'
const HELLOAO_API_BASE = 'https://bible.helloao.org/api'

// Cache duration: 24 hours for verses (scripture doesn't change)
const CACHE_DURATION = 86400 * 1000

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface BibleVerse {
  reference: string
  text: string
  translation: string
  translationName: string
}

interface BibleChapter {
  reference: string
  verses: { verse: number; text: string }[]
  translation: string
  translationName: string
}

interface Translation {
  id: string
  name: string
  language: string
}

// ─── All 66 Bible Books with chapter counts ───────────────────────────────────
export interface BibleBook {
  name: string
  chapters: number
  testament: 'ot' | 'nt'
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { name: 'Genesis', chapters: 50, testament: 'ot' },
  { name: 'Exodus', chapters: 40, testament: 'ot' },
  { name: 'Leviticus', chapters: 27, testament: 'ot' },
  { name: 'Numbers', chapters: 36, testament: 'ot' },
  { name: 'Deuteronomy', chapters: 34, testament: 'ot' },
  { name: 'Joshua', chapters: 24, testament: 'ot' },
  { name: 'Judges', chapters: 21, testament: 'ot' },
  { name: 'Ruth', chapters: 4, testament: 'ot' },
  { name: '1 Samuel', chapters: 31, testament: 'ot' },
  { name: '2 Samuel', chapters: 24, testament: 'ot' },
  { name: '1 Kings', chapters: 22, testament: 'ot' },
  { name: '2 Kings', chapters: 25, testament: 'ot' },
  { name: '1 Chronicles', chapters: 29, testament: 'ot' },
  { name: '2 Chronicles', chapters: 36, testament: 'ot' },
  { name: 'Ezra', chapters: 10, testament: 'ot' },
  { name: 'Nehemiah', chapters: 13, testament: 'ot' },
  { name: 'Esther', chapters: 10, testament: 'ot' },
  { name: 'Job', chapters: 42, testament: 'ot' },
  { name: 'Psalms', chapters: 150, testament: 'ot' },
  { name: 'Proverbs', chapters: 31, testament: 'ot' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'ot' },
  { name: 'Song of Solomon', chapters: 8, testament: 'ot' },
  { name: 'Isaiah', chapters: 66, testament: 'ot' },
  { name: 'Jeremiah', chapters: 52, testament: 'ot' },
  { name: 'Lamentations', chapters: 5, testament: 'ot' },
  { name: 'Ezekiel', chapters: 48, testament: 'ot' },
  { name: 'Daniel', chapters: 12, testament: 'ot' },
  { name: 'Hosea', chapters: 14, testament: 'ot' },
  { name: 'Joel', chapters: 3, testament: 'ot' },
  { name: 'Amos', chapters: 9, testament: 'ot' },
  { name: 'Obadiah', chapters: 1, testament: 'ot' },
  { name: 'Jonah', chapters: 4, testament: 'ot' },
  { name: 'Micah', chapters: 7, testament: 'ot' },
  { name: 'Nahum', chapters: 3, testament: 'ot' },
  { name: 'Habakkuk', chapters: 3, testament: 'ot' },
  { name: 'Zephaniah', chapters: 3, testament: 'ot' },
  { name: 'Haggai', chapters: 2, testament: 'ot' },
  { name: 'Zechariah', chapters: 14, testament: 'ot' },
  { name: 'Malachi', chapters: 4, testament: 'ot' },
  // New Testament
  { name: 'Matthew', chapters: 28, testament: 'nt' },
  { name: 'Mark', chapters: 16, testament: 'nt' },
  { name: 'Luke', chapters: 24, testament: 'nt' },
  { name: 'John', chapters: 21, testament: 'nt' },
  { name: 'Acts', chapters: 28, testament: 'nt' },
  { name: 'Romans', chapters: 16, testament: 'nt' },
  { name: '1 Corinthians', chapters: 16, testament: 'nt' },
  { name: '2 Corinthians', chapters: 13, testament: 'nt' },
  { name: 'Galatians', chapters: 6, testament: 'nt' },
  { name: 'Ephesians', chapters: 6, testament: 'nt' },
  { name: 'Philippians', chapters: 4, testament: 'nt' },
  { name: 'Colossians', chapters: 4, testament: 'nt' },
  { name: '1 Thessalonians', chapters: 5, testament: 'nt' },
  { name: '2 Thessalonians', chapters: 3, testament: 'nt' },
  { name: '1 Timothy', chapters: 6, testament: 'nt' },
  { name: '2 Timothy', chapters: 4, testament: 'nt' },
  { name: 'Titus', chapters: 3, testament: 'nt' },
  { name: 'Philemon', chapters: 1, testament: 'nt' },
  { name: 'Hebrews', chapters: 13, testament: 'nt' },
  { name: 'James', chapters: 5, testament: 'nt' },
  { name: '1 Peter', chapters: 5, testament: 'nt' },
  { name: '2 Peter', chapters: 3, testament: 'nt' },
  { name: '1 John', chapters: 5, testament: 'nt' },
  { name: '2 John', chapters: 1, testament: 'nt' },
  { name: '3 John', chapters: 1, testament: 'nt' },
  { name: 'Jude', chapters: 1, testament: 'nt' },
  { name: 'Revelation', chapters: 22, testament: 'nt' },
]

// ─── Available public-domain translations ─────────────────────────────────────
export const TRANSLATIONS: Translation[] = [
  { id: 'kjv', name: 'King James Version', language: 'English' },
  { id: 'web', name: 'World English Bible', language: 'English' },
  { id: 'asv', name: 'American Standard Version', language: 'English' },
  { id: 'bbe', name: 'Bible in Basic English', language: 'English' },
  { id: 'darby', name: 'Darby Bible', language: 'English' },
]

// ─── Curated Verse of the Day list (~100 encouraging verses) ──────────────────
// Deterministically selected by day-of-year so all visitors see the same verse
const VERSE_OF_THE_DAY_LIST: { ref: string; text: string }[] = [
  { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
  { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' },
  { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
  { ref: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
  { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
  { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
  { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.' },
  { ref: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.' },
  { ref: '2 Timothy 1:7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.' },
  { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.' },
  { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
  { ref: '1 Corinthians 13:4-7', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; rejoiceth not in iniquity, but rejoiceth in the truth; beareth all things, believeth all things, hopeth all things, endureth all things.' },
  { ref: 'Matthew 28:19-20', text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world.' },
  { ref: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.' },
  { ref: 'Psalm 46:10', text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
  { ref: 'Micah 6:8', text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?' },
  { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.' },
  { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast.' },
  { ref: 'Psalm 139:14', text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.' },
  { ref: 'Romans 15:13', text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.' },
  { ref: 'Colossians 3:15', text: 'And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.' },
  { ref: '1 Thessalonians 5:16-18', text: 'Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.' },
  { ref: 'Psalm 37:4', text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.' },
  { ref: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { ref: 'Proverbs 22:6', text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.' },
  { ref: 'Matthew 5:16', text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.' },
  { ref: 'John 14:6', text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.' },
  { ref: 'John 10:10', text: 'The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.' },
  { ref: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.' },
  { ref: 'Psalm 91:1', text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.' },
  { ref: '2 Corinthians 5:17', text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.' },
  { ref: 'Philippians 4:6-7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
  { ref: 'Psalm 34:8', text: 'O taste and see that the LORD is good: blessed is the man that trusteth in him.' },
  { ref: 'Isaiah 53:5', text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.' },
  { ref: 'John 15:5', text: 'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.' },
  { ref: 'Romans 8:38-39', text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' },
  { ref: 'Ephesians 6:10', text: 'Finally, my brethren, be strong in the Lord, and in the power of his might.' },
  { ref: 'Psalm 56:3', text: 'What time I am afraid, I will trust in thee.' },
  { ref: 'Matthew 11:30', text: 'For my yoke is easy, and my burden is light.' },
  { ref: 'John 3:16-17', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life. For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
  { ref: 'Acts 1:8', text: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.' },
  { ref: 'James 1:5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.' },
  { ref: '1 Peter 5:7', text: 'Casting all your care upon him; for he careth for you.' },
  { ref: 'Psalm 27:1', text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?' },
  { ref: 'Proverbs 16:3', text: 'Commit thy works unto the LORD, and thy thoughts shall be established.' },
  { ref: 'Isaiah 54:10', text: 'For the mountains shall depart, and the hills be removed; but my kindness shall not depart from thee, neither shall the covenant of my peace be removed, saith the LORD that hath mercy on thee.' },
  { ref: 'Jeremiah 33:3', text: 'Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.' },
  { ref: 'Lamentations 3:22-23', text: 'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.' },
  { ref: 'Habakkuk 2:4', text: 'Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith.' },
  { ref: 'Matthew 9:37-38', text: 'Then saith he unto his disciples, The harvest truly is plenteous, but the labourers are few; pray ye therefore the Lord of the harvest, that he will send forth labourers into his harvest.' },
  { ref: 'Mark 10:27', text: 'And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible.' },
  { ref: 'Luke 1:37', text: 'For with God nothing shall be impossible.' },
  { ref: 'John 14:27', text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.' },
  { ref: 'John 16:33', text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.' },
  { ref: 'Acts 2:38', text: 'Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.' },
  { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.' },
  { ref: 'Romans 10:9', text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.' },
  { ref: '1 Corinthians 10:13', text: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.' },
  { ref: '2 Corinthians 4:16-18', text: 'For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day. For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory; while we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.' },
  { ref: 'Galatians 2:20', text: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.' },
  { ref: 'Ephesians 3:20', text: 'Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us.' },
  { ref: 'Philippians 2:3-4', text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others.' },
  { ref: 'Colossians 3:23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.' },
  { ref: '2 Timothy 2:15', text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.' },
  { ref: 'Hebrews 4:12', text: 'For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.' },
  { ref: 'Hebrews 13:8', text: 'Jesus Christ the same yesterday, and to day, and for ever.' },
  { ref: 'James 1:2-4', text: 'My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.' },
  { ref: 'James 4:7-8', text: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you. Draw nigh to God, and he will draw nigh to you. Cleanse your hands, ye sinners; and purify your hearts, ye double minded.' },
  { ref: '1 Peter 2:9', text: 'But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.' },
  { ref: '2 Peter 1:3', text: 'According as his divine power hath given unto us all things that pertain unto life and godliness, through the knowledge of him that hath called us to glory and virtue.' },
  { ref: '1 John 1:9', text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.' },
  { ref: '1 John 4:19', text: 'We love him, because he first loved us.' },
  { ref: 'Revelation 3:20', text: 'Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.' },
]

// ─── Simple in-memory + localStorage cache ────────────────────────────────────
function getCacheKey(url: string): string {
  return `bible_cache_${url}`
}

function getCached<T>(url: string): T | null {
  try {
    const raw = localStorage.getItem(getCacheKey(url))
    if (!raw) return null
    const entry: CacheEntry<T> = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      localStorage.removeItem(getCacheKey(url))
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

function setCache<T>(url: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() }
    localStorage.setItem(getCacheKey(url), JSON.stringify(entry))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

// ─── API fetch helpers ────────────────────────────────────────────────────────

async function apiFetch<T>(url: string): Promise<T> {
  const cached = getCached<T>(url)
  if (cached) return cached

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Bible API error: ${response.status}`)
  }
  const data = await response.json()
  setCache(url, data)
  return data
}

/**
 * Parse a reference like "John 3:16" or "Romans 8:28-30" into a URL-friendly format.
 * bible-api.com uses format: "John+3:16" or "Romans+8:28-30"
 */
function normalizeReference(ref: string): string {
  return ref.trim().replace(/\s+/g, '+')
}

/**
 * Fetch a Bible passage by reference.
 * Example: getPassage('John 3:16', 'kjv')
 */
export async function getPassage(
  reference: string,
  translation: string = 'kjv'
): Promise<BibleVerse> {
  const normalized = normalizeReference(reference)
  const url = `${BIBLE_API_BASE}/${normalized}?translation=${translation}`

  try {
    const data = await apiFetch<any>(url)

    if (data.error) {
      throw new Error(data.error)
    }

    // bible-api.com returns { reference, text, translation_name }
    return {
      reference: data.reference || reference,
      text: (data.text || '').trim(),
      translation: translation.toUpperCase(),
      translationName: data.translation_name || translation.toUpperCase(),
    }
  } catch (error) {
    // Try helloao API as fallback
    try {
      return await getPassageHelloAO(reference, translation)
    } catch {
      throw new Error(`Could not find "${reference}". Please check the reference and try again.`)
    }
  }
}

/**
 * Fallback: Fetch from helloao.org API
 */
async function getPassageHelloAO(
  reference: string,
  translation: string
): Promise<BibleVerse> {
  // helloao uses uppercase translation IDs like "KJV"
  const translationId = translation.toUpperCase()
  // Parse "John 3:16" into book "JHN" and chapter "3"
  const match = reference.match(/^(\d?\s*\w+)\s+(\d+):?(\d+)?-?(\d+)?$/i)
  if (!match) throw new Error('Invalid reference format')

  const bookName = match[1].trim()
  const chapter = match[2]

  // Map common book names to helloao IDs
  const bookMap: Record<string, string> = {
    'genesis': 'GEN', 'exodus': 'EXO', 'leviticus': 'LEV', 'numbers': 'NUM',
    'deuteronomy': 'DEU', 'joshua': 'JOS', 'judges': 'JDG', 'ruth': 'RUT',
    '1 samuel': '1SA', '2 samuel': '2SA', '1 kings': '1KI', '2 kings': '2KI',
    '1 chronicles': '1CH', '2 chronicles': '2CH', 'ezra': 'EZR', 'nehemiah': 'NEH',
    'esther': 'EST', 'job': 'JOB', 'psalm': 'PSA', 'psalms': 'PSA',
    'proverbs': 'PRO', 'ecclesiastes': 'ECC', 'song of solomon': 'SNG',
    'isaiah': 'ISA', 'jeremiah': 'JER', 'lamentations': 'LAM', 'ezekiel': 'EZK',
    'daniel': 'DAN', 'hosea': 'HOS', 'joel': 'JOL', 'amos': 'AMO',
    'obadiah': 'OBA', 'jonah': 'JON', 'micah': 'MIC', 'nahum': 'NAM',
    'habakkuk': 'HAB', 'zephaniah': 'ZEP', 'haggai': 'HAG', 'zechariah': 'ZEC',
    'malachi': 'MAL', 'matthew': 'MAT', 'mark': 'MRK', 'luke': 'LUK',
    'john': 'JHN', 'acts': 'ACT', 'romans': 'ROM', '1 corinthians': '1CO',
    '2 corinthians': '2CO', 'galatians': 'GAL', 'ephesians': 'EPH',
    'philippians': 'PHP', 'colossians': 'COL', '1 thessalonians': '1TH',
    '2 thessalonians': '2TH', '1 timothy': '1TI', '2 timothy': '2TI',
    'titus': 'TIT', 'philemon': 'PHM', 'hebrews': 'HEB', 'james': 'JAS',
    '1 peter': '1PE', '2 peter': '2PE', '1 john': '1JN', '2 john': '2JN',
    '3 john': '3JN', 'jude': 'JUD', 'revelation': 'REV',
  }

  const bookLower = bookName.toLowerCase()
  const bookId = bookMap[bookLower]
  if (!bookId) throw new Error(`Unknown book: ${bookName}`)

  const url = `${HELLOAO_API_BASE}/${translationId}/${bookId}/${chapter}.json`
  const data = await apiFetch<any>(url)

  if (!data || !data.chapter || !data.chapter.content) {
    throw new Error('Chapter not found')
  }

  // Extract verse text
  const verseNum = match[3] ? parseInt(match[3]) : 1
  const endVerse = match[4] ? parseInt(match[4]) : verseNum

  let text = ''
  for (const item of data.chapter.content) {
    if (item.verse >= verseNum && item.verse <= endVerse) {
      text += item.content.join(' ') + ' '
    }
  }

  return {
    reference,
    text: text.trim(),
    translation: translationId,
    translationName: translationId,
  }
}

/**
 * Fetch a full chapter as individual verses.
 * Returns an array of { verse: number; text: string } objects.
 */
export async function getChapter(
  bookName: string,
  chapter: number,
  translation: string = 'kjv'
): Promise<{ reference: string; verses: { verse: number; text: string }[] }> {
  const ref = `${bookName} ${chapter}`
  const normalized = normalizeReference(ref)
  const url = `${BIBLE_API_BASE}/${normalized}?translation=${translation}`

  try {
    const data = await apiFetch<any>(url)

    if (data.error) {
      throw new Error(data.error)
    }

    // bible-api.com returns the whole chapter text as one block
    // We need to split it into verses. The API also returns verses array.
    const verses: { verse: number; text: string }[] = []

    if (data.verses && Array.isArray(data.verses)) {
      // API provides structured verses
      for (const v of data.verses) {
        verses.push({ verse: v.verse, text: (v.text || '').trim() })
      }
    } else {
      // Fallback: split the text block by verse numbers
      const fullText = (data.text || '').trim()
      // Try to split by superscript-style verse numbers
      const parts = fullText.split(/\n(?=\d+\s)/)
      if (parts.length > 1) {
        parts.forEach((part: string, i: number) => {
          const cleaned = part.replace(/^\d+\s*/, '').trim()
          if (cleaned) verses.push({ verse: i + 1, text: cleaned })
        })
      } else {
        verses.push({ verse: 1, text: fullText })
      }
    }

    return { reference: ref, verses }
  } catch (error) {
    // Fallback to helloao
    try {
      return await getChapterHelloAO(bookName, chapter, translation)
    } catch {
      throw new Error(`Could not load ${bookName} chapter ${chapter}. Please try again.`)
    }
  }
}

/**
 * Fallback: Fetch a full chapter from helloao.org
 */
async function getChapterHelloAO(
  bookName: string,
  chapter: number,
  translation: string
): Promise<{ reference: string; verses: { verse: number; text: string }[] }> {
  const translationId = translation.toUpperCase()

  const bookMap: Record<string, string> = {
    'genesis': 'GEN', 'exodus': 'EXO', 'leviticus': 'LEV', 'numbers': 'NUM',
    'deuteronomy': 'DEU', 'joshua': 'JOS', 'judges': 'JDG', 'ruth': 'RUT',
    '1 samuel': '1SA', '2 samuel': '2SA', '1 kings': '1KI', '2 kings': '2KI',
    '1 chronicles': '1CH', '2 chronicles': '2CH', 'ezra': 'EZR', 'nehemiah': 'NEH',
    'esther': 'EST', 'job': 'JOB', 'psalms': 'PSA', 'psalm': 'PSA',
    'proverbs': 'PRO', 'ecclesiastes': 'ECC', 'song of solomon': 'SNG',
    'isaiah': 'ISA', 'jeremiah': 'JER', 'lamentations': 'LAM', 'ezekiel': 'EZK',
    'daniel': 'DAN', 'hosea': 'HOS', 'joel': 'JOL', 'amos': 'AMO',
    'obadiah': 'OBA', 'jonah': 'JON', 'micah': 'MIC', 'nahum': 'NAM',
    'habakkuk': 'HAB', 'zephaniah': 'ZEP', 'haggai': 'HAG', 'zechariah': 'ZEC',
    'malachi': 'MAL', 'matthew': 'MAT', 'mark': 'MRK', 'luke': 'LUK',
    'john': 'JHN', 'acts': 'ACT', 'romans': 'ROM', '1 corinthians': '1CO',
    '2 corinthians': '2CO', 'galatians': 'GAL', 'ephesians': 'EPH',
    'philippians': 'PHP', 'colossians': 'COL', '1 thessalonians': '1TH',
    '2 thessalonians': '2TH', '1 timothy': '1TI', '2 timothy': '2TI',
    'titus': 'TIT', 'philemon': 'PHM', 'hebrews': 'HEB', 'james': 'JAS',
    '1 peter': '1PE', '2 peter': '2PE', '1 john': '1JN', '2 john': '2JN',
    '3 john': '3JN', 'jude': 'JUD', 'revelation': 'REV',
  }

  const bookId = bookMap[bookName.toLowerCase()]
  if (!bookId) throw new Error(`Unknown book: ${bookName}`)

  const url = `${HELLOAO_API_BASE}/${translationId}/${bookId}/${chapter}.json`
  const data = await apiFetch<any>(url)

  if (!data || !data.chapter || !data.chapter.content) {
    throw new Error('Chapter not found')
  }

  const verses = data.chapter.content.map((item: any) => ({
    verse: item.verse,
    text: (item.content || []).join(' ').trim(),
  }))

  return { reference: `${bookName} ${chapter}`, verses }
}

/**
 * Get the Verse of the Day — deterministically selected by date.
 * Uses a curated list so it works offline and is consistent for all visitors.
 */
export function getVerseOfTheDay(): { reference: string; text: string } {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  const index = dayOfYear % VERSE_OF_THE_DAY_LIST.length

  const verse = VERSE_OF_THE_DAY_LIST[index]
  return { reference: verse.ref, text: verse.text }
}

/**
 * Search for verses containing a keyword.
 * bible-api.com doesn't have a search endpoint, so we return a helpful message.
 * For full search, users can use the reference lookup with specific book/chapter.
 */
export async function searchBible(
  query: string,
  _translation: string = 'kjv'
): Promise<{ reference: string; text: string }[]> {
  // bible-api.com doesn't support keyword search
  // Return helpful suggestions for common searches
  const suggestions: Record<string, string[]> = {
    'love': ['1 Corinthians 13:4-7', 'John 3:16', '1 John 4:19', 'Romans 5:8'],
    'faith': ['Hebrews 11:1', 'Ephesians 2:8-9', 'Romans 10:17', 'James 2:17'],
    'hope': ['Jeremiah 29:11', 'Romans 15:13', 'Psalm 42:11', 'Isaiah 40:31'],
    'peace': ['John 14:27', 'Philippians 4:6-7', 'Isaiah 26:3', 'Colossians 3:15'],
    'strength': ['Isaiah 40:31', 'Philippians 4:13', '2 Corinthians 12:9', 'Psalm 46:1'],
    'fear': ['2 Timothy 1:7', 'Psalm 56:3', 'Isaiah 41:10', '1 John 4:18'],
    'joy': ['Nehemiah 8:10', 'Psalm 16:11', 'John 15:11', 'Galatians 5:22-23'],
    'prayer': ['Philippians 4:6-7', '1 Thessalonians 5:17', 'Jeremiah 33:3', 'Matthew 7:7'],
    'salvation': ['Romans 6:23', 'Ephesians 2:8-9', 'John 14:6', 'Acts 4:12'],
    'grace': ['Ephesians 2:8-9', '2 Corinthians 12:9', 'Romans 5:8', 'Titus 2:11'],
  }

  const lowerQuery = query.toLowerCase().trim()
  const refs = suggestions[lowerQuery] || []

  if (refs.length === 0) {
    return []
  }

  // Fetch the actual verse texts
  const results = []
  for (const ref of refs.slice(0, 4)) {
    try {
      const passage = await getPassage(ref)
      results.push({ reference: passage.reference, text: passage.text })
    } catch {
      results.push({ reference: ref, text: '(Verse text unavailable)' })
    }
  }

  return results
}
