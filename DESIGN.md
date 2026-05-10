# SmartCloset — Design System

> Your AI-powered digital wardrobe

---

## Color Tokens

All colors are defined as CSS custom properties in `src/styles/globals.css`.
**Zero hardcoded color values anywhere in the codebase.**

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#FF6B9D` | Buttons, active chips, icons, borders |
| `--color-primary-light` | `#FFE4F0` | Chip/button backgrounds, icon circles |
| `--color-primary-hover` | `#ff5592` | Hover state for primary elements |
| `--color-accent` | `#7C5CBF` | Field labels, secondary actions, tags |
| `--color-accent-light` | `#F5F0FF` | Quick action backgrounds, AI notes |
| `--color-accent-dark` | `#6b4dab` | Hover on accent elements |
| `--color-background` | `#FAFAFA` | App background |
| `--color-card` | `#FFFFFF` | Card surfaces, nav background |
| `--color-text-primary` | `#1A1A2E` | Headings, body text |
| `--color-text-secondary` | `#888888` | Captions, placeholders, muted |
| `--color-border` | `#F0E0F5` | Card borders, dividers, nav top |
| `--color-success` | `#4CAF50` | Confirmation states |
| `--color-error` | `#FF4444` | Validation errors |
| `--color-warm-light` | `#FFF8E7` | Weather widget gradient start |

---

## Typography

| Variable | Value | Usage |
|---|---|---|
| `--font-heading` | `Georgia, serif` | Page titles, section titles, outfit names |
| `--font-body` | `Inter, sans-serif` | All body copy, labels, buttons |

### Scale

| Role | Size | Weight |
|---|---|---|
| Page title | 24px | 700 |
| Section title | 18–20px | 600 |
| Card title | 15px | 600 |
| Body | 14px | 400 |
| Caption / Tag | 10–12px | 500 |

---

## Border Radius

| Variable | Value | Usage |
|---|---|---|
| `--radius-card` | `16px` | Cards, modals, action tiles |
| `--radius-button` | `24px` | Pill buttons, search bar |
| `--radius-chip` | `20px` | Filter chips, tags, badges |
| `--radius-input` | `12px` | Text inputs, dropdowns, meta boxes |

---

## Spacing

| Variable | Value |
|---|---|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `32px` |

---

## Shadows

| Variable | Value | Usage |
|---|---|---|
| `--shadow-card` | `0 2px 12px rgba(255,107,157,0.08)` | Default card shadow |
| `--shadow-hover` | `0 6px 24px rgba(255,107,157,0.16)` | Hover lift |
| `--shadow-btn` | `0 4px 16px rgba(255,107,157,0.35)` | Primary button shadow |

---

## Animation

| Property | Value |
|---|---|
| `--transition` | `all 0.2s ease` |
| Page enter | `fadeSlideUp 0.35s ease` |
| Skeleton shimmer | `shimmer 1.4s ease-in-out infinite` |
| Heart pop | `heartPop 0.35s ease` |
| Float (icons) | `float 3s ease-in-out infinite` |

---

## Icons

**All icons use [Lucide React](https://lucide.dev). Zero emojis anywhere in the codebase.**

| Context | Icon | Lucide name |
|---|---|---|
| Home nav | Home | `Home` |
| Closet nav | Shirt | `Shirt` |
| Saved nav | Heart | `Heart` |
| Shop/Outfits nav | Sparkles | `Sparkles` |
| Weather | Sun | `Sun` |
| Refresh | Refresh CW | `RefreshCw` |
| Search | Search | `Search` |
| Add | Plus | `Plus` |
| Clear | X | `X` |
| Camera | Camera | `Camera` |
| Color | Palette | `Palette` |
| Back | Chevron Left | `ChevronLeft` |
| Work event | Briefcase | `Briefcase` |
| Party event | Sparkles | `Sparkles` |
| Wedding event | Crown | `Crown` |
| Sport event | Dumbbell | `Dumbbell` |
| Category: Tops / Bottoms | Shirt | `Shirt` |
| Category: Shoes | Footprints | `Footprints` |
| Category: Outer | Layers | `Layers` |
| Category: Accessories | Gem | `Gem` |

---

## Layout

- **Max width:** 430px, centered on desktop
- **Base:** Mobile-first at 375px
- **Page padding:** 16px horizontal
- **Bottom clear:** `calc(72px nav + 24px)` for nav bar

---

## Components

### BottomNavBar
Fixed bottom, 72px height. 4 tabs: Home `/dashboard`, Closet `/closet`, Saved `/saved`, Shop `/outfits`.
Active state: pink icon (`--color-primary`) + 4px pink dot below label.

### PrimaryButton
- `primary` variant: pink background, white text, `--shadow-btn`, pill shape
- `ghost` variant: transparent, accent border & color

### HeartButton
38×38px circle, `--color-primary-light` background. Empty = stroke only; Saved = filled pink (CSS path fill override).

### FilterChips
Horizontal scrollable row. Active = `--color-primary` background, white text. Inactive = bordered, muted.

### ClothingItemCard
White card, border `--color-border`, 64px icon circle in `--color-primary-light`. Category tag in accent purple.

### OutfitCard
Two 44px icon circles + outfit name (Georgia) + gray tags + HeartButton. Icon colors shift to accent on hover.

### WeatherWidget
Soft gradient `--color-warm-light` → `--color-primary-light`. Dark text. Sun icon in primary pink.

---

## Target User

**Michaela, 27, Tel Aviv** — busy professional who wants to save time choosing outfits every morning.
Vibe: playful, bright, fashion-forward. Feels premium, not student-project.
