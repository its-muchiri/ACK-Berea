# ACK Berea Church — System Audit

> Auto-generated from source. Last updated: 2026-08-10

---

## 1. Site Map & Navigation Structure

### 1.1 Routes (26 pages)

All routing is **state-driven** via `useState<Page>` — there is no URL router. Every page renders via conditional `{page === '...' && <Component />}` blocks.

```
home
about
sermons
plan-visit
give
contact
events
ministries
kama
mothers-union
sunday-school
youth
service-times
leadership
get-involved
prayer-requests
news
gallery
faq
small-groups
live
testimonies
bible
outreach
choir
order-of-service
```

### 1.2 Desktop Navigation

**Top Nav Bar** (visible ≥ `md`)

| Label | Target | Notes |
|---|---|---|
| About | `about` | |
| Sermons | `sermons` | |
| Events | `events` | |
| Ministries | `ministries` | |
| Contact | `contact` | |
| Plan a Visit | `plan-visit` | Blue CTA button |

**"More" Dropdown** (visible ≥ `md`, 14 items)

| Label | Target |
|---|---|
| Service Times | `service-times` |
| Leadership | `leadership` |
| Get Involved | `get-involved` |
| Prayer Requests | `prayer-requests` |
| News | `news` |
| Gallery | `gallery` |
| Bible | `bible` |
| Order of Service | `order-of-service` |
| Community Outreach | `outreach` |
| Choir & Worship | `choir` |
| Small Groups | `small-groups` |
| Live Stream | `live` |
| Testimonies | `testimonies` |
| FAQ | `faq` |

### 1.3 Mobile Navigation

**Bottom Tab Bar** (visible < `md`, fixed bottom)

| Label | Icon | Target |
|---|---|---|
| Home | `⌂` | `home` |
| Visit | `✦` | `plan-visit` |
| Give | `❤` | `give` |
| Watch | `▶` | `sermons` |
| Menu | `≡` | Opens MobileMenu drawer |

**Mobile Menu Drawer** (full-screen overlay, 3 sections)

| Section | Links |
|---|---|
| Explore | Home, About, Service Times, Plan a Visit, Sermons, Live Stream |
| Community | Ministries, Youth, KAMA, Mothers Union, Sunday School, Small Groups |
| Connect | Get Involved, Leadership, News, Gallery, Testimonies, Prayer Requests, Outreach, Choir & Worship, Events, FAQ, Give, Contact |

### 1.4 Footer Navigation

Four link columns:

| Column | Links |
|---|---|
| Navigate | About, Sermons, Events, Ministries, Order of Service, Give, Contact |
| Ministries | Youth, KAMA, Mothers Union, Sunday School |
| More | Service Times, Leadership, Get Involved, Prayer Requests, News, Gallery, Small Groups, Live, Testimonies, FAQ |
| Services | Sunday 8:00–10:30 AM, Sunday 10:45 AM–12:30 PM, Saturday 2:00–5:00 AM |

Social links: Facebook, X/Twitter, YouTube (placeholder `#` URLs).

---

## 2. Feature Inventory

### 2.1 Core Pages

| Page | Key Features |
|---|---|
| **Home** | Hero grid (2-col desktop), sermon carousel (YouTube), Bible verse-of-the-day (random per day), 3D Bible model, quick-link cards, community section, newsletter signup, service info |
| **About** | Editorial story layout with alternating dense/sparse grid, beliefs section, call-to-action |
| **Sermons** | YouTube video library with series filter (All/New Believers/Marriage/Worship/Leadership), video modal player, category tags |
| **Plan a Visit** | 3-step process, map embed (Google Maps, Tola Road Berea Nairobi), what-to-expect cards, CTA |
| **Give** | M-Pesa STK push integration, account selector (Tithe/Offering/Missions/Building Fund), preset amounts, custom amount, phone input, loading/success/error states |
| **Contact** | Contact form (name, email, subject, message), location map, office hours, social links |

### 2.2 Ministry Pages

| Page | Content |
|---|---|
| **Ministries** | Grid of all ministry cards with icons |
| **Youth** | Youth ministry description, meeting info |
| **KAMA** | KAMA fellowship description |
| **Mothers Union** | Mothers Union description |
| **Sunday School** | Children's ministry description |
| **Small Groups** | Small groups finder with search, day filter, topic filter, group directory |
| **Outreach** | Community outreach programs |
| **Choir & Worship** | Choir and worship ministry |

### 2.3 Community Pages

| Page | Features |
|---|---|
| **Service Times** | Weekly schedule grid |
| **Leadership** | Pastor and elder profiles |
| **Get Involved** | Volunteer sign-up form (name, email, service area dropdown, availability), ministry categories |
| **Prayer Requests** | Prayer request form (name, text, privacy checkbox), confirmation |
| **News** | Announcements grid |
| **Gallery** | Masonry photo grid with lightbox, category filter (All/Fellowship/Outreach/Worship/Youth) |
| **Testimonies** | Testimony carousel with dot navigation, prev/next arrows |
| **FAQ** | Accordion Q&A |
| **Live** | Live stream player embed, live chat panel (non-functional), going-live status |

### 2.4 Bible Features

| Page | Features |
|---|---|
| **Bible** | Book/chapter/verse browser, translation selector (KJV, WEB, ASV), search, verse-of-the-day, 3D open Bible model (GLTF), favorites, reading history, chapter reader, daily verse sharing |
| **Order of Service** | Structured liturgy/order of service display |

---

## 3. User Roles & Permissions

This is a **public-facing website with no authentication system**. There are no user roles, login flows, or permission gates.

- All content is publicly readable
- Forms (give, prayer requests, volunteer sign-up) are client-side only — no server-side validation or user accounts
- The M-Pesa payment flow is the only external transaction; it uses a phone number + amount model with no user identity
- The admin side (if any) is not part of this codebase

**Implication**: Any feature requiring authentication (e.g., member profiles, donation history, admin content management) does not exist yet.

---

## 4. Interactive Elements & Controls

### 4.1 Forms

| Form | Fields | Submission |
|---|---|---|
| Newsletter signup (Home) | Email | `preventDefault()` — **no actual submission** |
| Give | Account select, amount (preset + custom), phone | M-Pesa STK push via `POST /api/mpesa/stkpush` — **functional** |
| Volunteer sign-up (Get Involved) | Name, email, service area select, availability textarea | Local state `sent=true` — **no API call** |
| Prayer Request | Name (optional), text textarea, privacy checkbox | Local state `sent=true` — **no API call** |
| Contact | Name, email, subject, message textarea | `preventDefault()` — **no actual submission** |
| Live Chat | Message text input | Send button has **no onClick handler** — non-functional |

### 4.2 Interactive Controls

| Control | Location | Behavior |
|---|---|---|
| Back/Forward buttons | Nav | `history.back()` / `history.forward()` |
| More dropdown | Nav | Toggle open/close with backdrop click-to-dismiss |
| Mobile menu drawer | Bottom nav | Full-screen overlay with close button |
| Sermon carousel sidebar | Home | Click thumbnail to switch featured video |
| Video modal | Sermons | Click play to open YouTube embed in modal, click ✕ or backdrop to close |
| FAQ accordion | FAQ, PlanVisit | Click header to toggle answer visibility |
| Gallery lightbox | Gallery | Click photo to open fullscreen, prev/next arrows, ✕ to close |
| Testimony carousel | Testimonies | Dot indicators, prev/next arrows |
| Day/Topic filters | Small Groups | Click to filter group cards |
| Bible book/chapter/verse | Bible | Three-panel selector with scroll navigation |
| Bible translation select | Bible | Switch between KJV, WEB, ASV |
| Bible search | Bible | Text input with search results |
| Scroll-to-top button | App root | Appears after scrolling, smooth scrolls to top |

### 4.3 Data-Driven UI State

| State | Component | Type |
|---|---|---|
| Current page | App | `useState<Page>('home')` |
| Navigation history | App | `useRef<string[]>` with index tracking |
| More dropdown open | Nav | `useState<boolean>` |
| Mobile menu open | MobileMenu | `useState<boolean>` |
| Playing sermon ID | Sermons | `useState<string \| null>` |
| Active sermon index | Home | `useState<number>` |
| Sermon filter | Sermons | `useState<string>` |
| FAQ open index | FAQ | `useState<number \| null>` |
| Gallery selected index | Gallery | `useState<number \| null>` |
| Testimony index | Testimonies | `useState<number>` |
| Small group filters | SmallGroups | `useState<string>` (day, topic, search) |
| Give account/amount/phone/status | Give | Multiple `useState` hooks |
| Bible book/chapter/verse/search | Bible | Multiple `useState` hooks |
| Volunteer form sent | GetInvolved | `useState<boolean>` |
| Prayer request sent | PrayerRequests | `useState<boolean>` |
| Live stream active | Live | `useState<boolean>` |

---

## 5. Responsive / Adaptability Behavior

### 5.1 Breakpoint Strategy

Tailwind CSS v4 breakpoints used throughout:

| Breakpoint | Min-width | Usage |
|---|---|---|
| Default (mobile) | 0px | Single-column stacked layouts |
| `sm` | 640px | Minor layout adjustments (inline buttons, input rows) |
| `md` | 768px | **Primary breakpoint** — desktop nav appears, bottom nav hides, grid layouts activate |
| `lg` | 1024px | Tertiary grids (3-col sermons, 4-col Get Involved, sidebar chat) |

### 5.2 Mobile-Only Components

| Component | Visibility | Description |
|---|---|---|
| `BottomNav` | `< md` | Fixed bottom tab bar, 5 items |
| `MobileMenu` | `< md` | Full-screen drawer overlay |
| Mobile CTA ("Visit") | `< md` | Blue button below nav, links to plan-visit |

### 5.3 Desktop-Only Components

| Component | Visibility | Description |
|---|---|---|
| Nav link bar | `≥ md` | Full horizontal navigation with More dropdown |
| Nav back/forward buttons | `≥ md` | Browser-style navigation |

### 5.4 Grid Layout Patterns

Most content sections follow a consistent responsive pattern:

| Pattern | Example |
|---|---|
| `grid md:grid-cols-2` | Hero, Bible section, About, Give, Prayer Requests, Leadership |
| `grid md:grid-cols-3` | Plan Visit info, Service Info, News |
| `grid md:grid-cols-2 lg:grid-cols-3` | Sermons, Small Groups |
| `grid md:grid-cols-4` | Quick Links, Ministry categories |
| `grid md:grid-cols-5` | Plan Visit steps, Service Times |
| `columns-2 md:columns-3 lg:columns-4` | Gallery masonry |
| `flex flex-col sm:flex-row` | Button groups, newsletter form |

On mobile, all grids collapse to **single-column stacked** layouts. Buttons within groups stack vertically on mobile and sit inline on desktop.

### 5.5 Typography & Spacing

- **Heading font**: Fraunces (serif, Google Fonts)
- **Body font**: Inter (sans-serif, Google Fonts)
- **Mobile padding**: `px-4 sm:px-6`
- **Section padding**: `py-16 md:py-24`
- **Hero padding**: `pt-28 md:pt-32 pb-16 md:pb-24`

---

## 6. Performance & Reliability Characteristics

### 6.1 Bundle & Build

| Aspect | Detail |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| TypeScript | 5.7, strict mode off |
| 3D | React Three Fiber + `@react-three/drei` + `three` |
| Animations | Framer Motion |
| Linting | oxfmt (formatting only) |
| Dev server | Running on port 8443 (Figma Make managed) |

### 6.2 Asset Loading

| Asset | Size | Loading Strategy |
|---|---|---|
| Bible GLTF model | ~4 MB | `useGLTF` with React Suspense, `fallback={null}` |
| YouTube thumbnails | ~20–50 KB | Direct `<img>` from `img.youtube.com`, `onError` fallback chain |
| Google Fonts | External | CSS `@import` in `index.css` — render-blocking |
| Logo images | SVG | Inline SVG components |
| Gallery images | Local files | Direct `<img>` tags (no lazy loading attributes) |

### 6.3 External API Dependencies

| Service | Purpose | Reliability Notes |
|---|---|---|
| `bible-api.com` | Bible text (primary) | Has Helloao fallback (`bible.helloao.org/api`) |
| `bible.helloao.org/api` | Bible text (fallback) | Catch-all fallback if primary fails |
| `img.youtube.com` | Sermon thumbnails | `onError` fallback chain: maxresdefault → hqdefault → hidden |
| YouTube embed | Video player | No loading/error state; iframe just loads or fails silently |
| Google Maps | Location embed | iframe embed; no fallback if blocked |
| M-Pesa API (`/api/mpesa/stkpush`) | Payments | Full try/catch with user-facing error messages; requires self-hosted backend on port 3001 |
| Google Fonts | Typography | External CSS import; no local fallback fonts |

### 6.4 Error Handling Summary

| Area | Status |
|---|---|
| M-Pesa payments | **Good** — full try/catch, loading state, success/error banners, validation |
| Bible API | **Good** — dual-API fallback, error state display in BiblePage |
| YouTube thumbnails | **Good** — `onError` fallback chain |
| YouTube video player | **None** — no loading spinner, no error state |
| 3D Bible model | **Minimal** — `<Suspense fallback={null}>` shows nothing while loading |
| Newsletter form | **None** — no submission logic |
| Contact form | **None** — no submission logic |
| Volunteer form | **None** — client-side only |
| Prayer request form | **None** — client-side only |
| Live Chat | **None** — Send button has no onClick handler |
| Gallery images | **None** — no `onError` or loading states |
| Google Maps embed | **None** — no fallback if blocked |

### 6.5 Known Gaps & Risks

1. **No URL routing** — all pages share a single URL; browser back/forward works via `history.pushState` manipulation, but deep-linking and page refresh lose state (always returns to `home`)
2. **No lazy loading** on gallery images — all load eagerly
3. **No service worker or offline support**
4. **No error boundary** wrapping the app — a render error in any component crashes the whole site
5. **3D Bible model** (~4 MB GLTF) loads on initial Home page render even if user never scrolls to it (deferred by Suspense but not by route)
6. **Google Fonts loaded via CSS `@import`** — render-blocking; no `font-display: swap` configured
7. **Social media links** are placeholder `#` URLs
8. **Five forms are non-functional** (newsletter, contact, volunteer, prayer request, live chat)
9. **No analytics or tracking** integrated
10. **No SEO metadata** beyond the HTML `<title>` — no Open Graph tags, no structured data

---

*End of audit.*
