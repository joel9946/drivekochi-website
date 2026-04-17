# ABSOLUTE FINAL PROMPT — DriveKochi: Pre-Owned Car Selling & Exchange Platform

> **ROLE**: You are an elite frontend developer, UI/UX designer, motion designer, and technical SEO/AEO specialist. Build a COMPLETE, production-ready, single-page React application for **DriveKochi** — a premium pre-owned car selling and exchanging business based in Kochi, India.
>
> **DESIGN INTELLIGENCE**: Apply cinematic dark luxury automotive aesthetics inspired by SublimeCars.nl (dark showroom + marquee UX), LuxCars Webflow (trust-first architecture), and Wheels ThemeForest (animation choreography). The site must function as an aggressive lead-generation machine while feeling like a luxury car commercial.
>
> **CRITICAL**: Every section must be FULLY implemented. No placeholder "TODO" comments. No skeleton components. Every animation, every hover state, every form must work. The output must be a single `.jsx` artifact that renders a complete, scroll-worthy website.

---

## 1. TECH STACK

```
React 18 (functional components + hooks only)
Lucide React (icons)
Google Fonts: "Syne" (display/headings, weight 600-800) + "Outfit" (body, weight 300-600)
CSS-in-JS via inline styles + a single <style> block for keyframes/pseudo-elements
IntersectionObserver (scroll-triggered animations — NO external animation library)
CSS keyframes (particles, floating, marquee, reveals)
CSS 3D transforms (perspective, rotateY, translateZ for carousel)
HTML5 <video> element for hero background
```

**NO external dependencies** beyond React and Lucide. All animations are pure CSS + IntersectionObserver hooks. Single-file output.

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

```javascript
const COLORS = {
  bg:          "#06060C",         // Primary — near-black with blue undertone
  surface:     "#0C0C16",         // Elevated surfaces
  glass:       "rgba(255,255,255,0.04)",   // Glassmorphism fill
  glassBorder: "rgba(255,255,255,0.08)",   // Glass border
  cardHover:   "rgba(255,255,255,0.05)",   // Hover state
  cyan:        "#00E5FF",         // Primary accent
  cyanGlow:    "rgba(0,229,255,0.25)",     // Neon glow shadows
  cyanSoft:    "rgba(0,229,255,0.08)",     // Tinted backgrounds
  orange:      "#FF6B35",         // CTA-only accent (conversion buttons)
  orangeGlow:  "rgba(255,107,53,0.3)",
  gold:        "#D4A843",         // Featured/premium highlights
  text:        "#EEEEF2",         // Primary text
  textMuted:   "#6E6E82",         // Secondary text
  textDim:     "#3A3A50",         // Tertiary text
  green:       "#22C55E",         // Success / "Recently Added"
  red:         "#EF4444",         // Urgency / "Limited Stock"
};
```

### 2.2 Design Rules

1. **Glassmorphism**: `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 16-24px`
2. **Neon glow**: `box-shadow: 0 0 20px rgba(0,229,255,0.25)` on hover/focus
3. **Corners**: minimum `border-radius: 12px` cards, `10px` buttons, `20-30px` pills
4. **Spacing**: `100-120px` vertical section padding desktop, `60px` mobile
5. **Image overlays**: `linear-gradient(to top, rgba(6,6,12,0.9), transparent)` on all card images
6. **Interactive states**: Every element gets hover (transform+glow), focus ring (cyan), active (scale 0.98)
7. **Color hierarchy**: Cyan = primary interactive, Orange = CTA conversions ONLY, Gold = premium highlights

### 2.3 Typography

```
Display/Headings: 'Syne', sans-serif — weights 600/700/800, letter-spacing -1px to -2px
Body/UI: 'Outfit', sans-serif — weights 300/400/500/600/700

Hero title:       64px desktop / 32px mobile
Section headings: 42px desktop / 28px mobile
Card titles:      16-18px
Body text:        14-15px
Labels/badges:    11-13px
```

### 2.4 Button Classes

```
btn-primary:   gradient(135deg, #00E5FF, #00b8d4), dark text, rounded 10px
               hover → translateY(-2px) + box-shadow cyanGlow

btn-secondary: transparent bg, cyan text, 1px cyan/30% border, backdrop-blur
               hover → fill rgba(0,229,255,0.08) + solid border

btn-orange:    gradient(135deg, #FF6B35, #e85d2a), white text
               hover → translateY(-2px) + box-shadow orangeGlow
               USE ONLY for: "Get Best Resale Value", "Exchange Now", "Get Offers"

filter-pill:   transparent, 1px glassBorder, rounded 20px
               active → cyan bg 12%, cyan border, cyan text
```

---

## 3. CORE HOOKS & UTILITIES (MUST IMPLEMENT)

### `useInView` — IntersectionObserver scroll trigger
```
Returns [ref, isInView]. Options: { once: true, threshold: 0.1, rootMargin: "-60px" }
Animate elements ONCE on scroll-in, then unobserve.
```

### `useCounter` — Animated number counter
```
Counts 0 → target over duration (2000ms default). Starts when isActive=true.
Uses setInterval at 16ms (60fps). Returns current count.
```

### `<Reveal>` — Reusable scroll-animation wrapper
```
Props: delay (s), direction ("up"|"down"|"left"|"right"|"scale"), className
Uses useInView internally. CSS transition: 0.8s cubic-bezier(0.16,1,0.3,1).
Start: opacity 0 + translate 50px. End: opacity 1 + transform none.
```

---

## 4. REQUIRED CSS KEYFRAMES

```css
@keyframes float          — translateY(0→-12px→0), 4s ease infinite
@keyframes floatSlow      — translateY(0→-8px→0) + rotate(0→1deg→0), 3s
@keyframes pulse          — opacity(0.6→1→0.6), 2s
@keyframes glow           — box-shadow 20px↔40px cyan glow, 2s
@keyframes marquee        — translateX(0→-50%), linear 40s infinite
@keyframes particle1/2/3  — translate upward 500-700px, fade+scale down, 6-10s
@keyframes revealLine     — width 0→80px, 0.8s ease
@keyframes bounceIn       — scale(0.3→1.05→0.95→1), 0.6s
@keyframes slideUp        — translateY(100%→0) + opacity(0→1), 0.4-0.8s
@keyframes heroFadeIn     — opacity(0→1), 1.5s ease (video background)
@keyframes textReveal     — translateY(40px)→0 + opacity 0→1, 0.8s ease-out
@keyframes glowPulse      — box-shadow cyan glow 20px↔50px, 3s infinite (CTA section)
```

---

## 5. SECTION-BY-SECTION SPECIFICATION

---

### SECTION 1 — NAVIGATION BAR (Sticky + Morphing)

**Fixed, z-index 1000, height 70px.**

| State | Background | Backdrop | Border |
|---|---|---|---|
| Default (scrollY < 60) | transparent | none | none |
| Scrolled (scrollY ≥ 60) | rgba(6,6,12,0.85) | blur(20px) | 1px glassBorder bottom |

**Transition**: all 400ms ease.

**Layout**:
- Left: `Car` icon (cyan) + "DRIVE" (white) + "KOCHI" (cyan) — Syne 800, 22px
- Center (desktop): `Cars | Sell Your Car | Exchange | How It Works | Reviews | Contact` — 14px textMuted, hover → white + cyan underline
- Right (desktop): "Call Now" secondary btn + "Browse Cars →" primary btn

**Mobile (≤768px)**: Hamburger toggle → fullscreen overlay, links staggered `slideUp` at 0.08s intervals.

---

### SECTION 2 — HERO (Cinematic Video Background) ★ KEY SECTION

> This section is the MAKE-OR-BREAK moment. It must feel like a luxury car commercial opening. The uploaded video plays as the fullscreen background.

**Background Layer Stack (bottom to top, all position: absolute, inset: 0):**

**Layer 1 — Video Background (z-index: 0):**
```html
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/hero-poster.jpg"    <!-- First frame of video as poster -->
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    opacity: 0,
    animation: "heroFadeIn 1.5s ease 0.3s forwards"
  }}
>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```
- Video specs: 8 seconds, 1280×720, 24fps, 2.7MB MP4 — orange sports car in cinematic dark environment with rain and dramatic lighting
- `autoPlay muted loop playsInline` for cross-browser compatibility
- `object-fit: cover` to fill the hero area regardless of viewport
- Fades in over 1.5s after 0.3s delay (avoids loading flash)
- For the artifact/demo: use a placeholder dark gradient if the video file isn't available, with a comment marking where the video element goes

**Layer 2 — Dark Gradient Overlay (z-index: 1):**
```css
background: linear-gradient(
  to bottom,
  rgba(6, 6, 12, 0.35) 0%,      /* Slight darken at top for navbar readability */
  rgba(6, 6, 12, 0.55) 40%,     /* Middle — let video show but ensure text contrast */
  rgba(6, 6, 12, 0.80) 75%,     /* Heavier towards bottom */
  #06060C 100%                   /* Fully solid at bottom — seamless blend into next section */
);
```
This gradient is CRITICAL — it ensures text remains readable over any frame of the video while creating a smooth visual transition to the marquee section below. The bottom fades to the exact page background color.

**Layer 3 — Floating CSS Particles (z-index: 2):**
- 25-30 small circles (2-3px), colors: cyan (30% opacity), gold (20% opacity), white (10% opacity)
- Positioned with `left: (i*37+13)%100 + '%'`, `bottom: (i*23+7)%30 + '%'`
- Each uses one of `particle1/2/3` keyframes with varied durations (6-12s) and staggered delays
- Apply parallax: `translateY(scrollY * 0.2)` for depth
- These particles float OVER the video, creating a dreamy bokeh-like atmosphere

**Layer 4 — Ambient Glow Orbs (z-index: 2):**
- Top-right: 500px circle, `radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)`, parallax at 0.3x
- Bottom-left: 400px circle, `radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)`
- These add subtle colored atmosphere that enhances the video without competing

**Content (z-index: 10, centered flex, max-width 800px):**

**Reveal Sequence** (staggered CSS `slideUp` / `textReveal` with animation-delay):

| Delay | Element | Animation |
|---|---|---|
| 0.2s | Pre-headline badge | Glass pill: green pulse dot + "Kochi's #1 Pre-Owned Car Platform" |
| 0.5s | Headline | `"Find Your Perfect Ride in Kochi"` — Syne 800, 64px, text-gradient (white→cyan→gold at 135deg, background-clip: text) |
| 0.8s | Subheadline | `"Verified Used Cars · Best Prices · Hassle-Free Delivery"` — Outfit 400, 18px, textMuted |
| 1.1s | CTA buttons | Three buttons row: "Browse Cars →" (primary) + "Sell Your Car" (secondary) + "Exchange Car ↔" (secondary) |
| 1.4s | Floating stats | Three glass pills: "500+ Cars Sold" (BadgeCheck) · "100% Verified" (Shield) · "Free Test Drive" (Car) — each on `float` keyframe with 0.5s offset |

**Parallax**: Content at `-0.15x` scroll, particles at `0.2x`, orbs at `0.3x`.
**Scroll indicator**: Bottom-center, "SCROLL TO EXPLORE" uppercase 11px + bouncing ChevronDown.

**Mobile Video Handling**:
- On mobile (≤768px), the video still plays but with a heavier overlay gradient (0.65 opacity mid-zone instead of 0.55) to ensure text readability on smaller screens
- `playsInline` attribute is essential for iOS autoplay
- If the video fails to load (slow connection), the hero-gradient CSS fallback background remains visible underneath — user sees the gradient + particles + content without any blank space

---

### SECTION 3 — MARQUEE USP STRIP (SublimeCars.nl Inspired)

Full-width ticker between 1px glassBorder lines. Subtle cyan tint background.

8 USPs, each preceded by a 5px cyan dot: `"Specialized in Quality Pre-Owned Cars"` | `"200+ Point Inspection"` | `"Free RC Transfer"` | `"Home Delivery Available"` | `"Best Price Guarantee"` | `"Trusted by 1200+ Customers"` | `"Car Exchange Available"` | `"Instant Finance Options"`

Duplicate array 2× for seamless loop. Animation: `marquee 40s linear infinite`. Typography: 13px Outfit 500, textMuted.

---

### SECTION 4 — CAR LISTINGS (Smart Filterable Grid)

**Heading**: "Our Collection" label (12px cyan uppercase) + "Explore Verified Cars" (42px Syne, "Verified Cars" in text-gradient) + animated underline.

**Filter Bar** (glass container):
- Search input with Search icon, placeholder: "Search by car name..."
- Budget range slider: ₹2L–₹25L, live value label "₹{n}L" in cyan
- Body pills: `All | SUV | Sedan | Hatchback | MUV`
- Fuel pills: `All | Petrol | Diesel | Electric | CNG`
- Transmission pills: `All | Manual | Automatic`
- All filters combine with AND logic, use `useMemo` for performance.

**Grid**: 3-col desktop, 2 tablet, 1 mobile. Gap 20px. Show first 6, "View All {n} Cars →" reveals rest.

**Each Card** (glass, rounded 16px, overflow hidden):
- Image (200px height, lazy load, bottom gradient overlay)
- Badges: "Recently Added" (green) or "Limited Stock" (red + pulse) top-left; fuel type top-right
- Info: name (Syne 600, 16px), price (Syne 700, 22px, cyan), meta row (Calendar+year, Gauge+km, Settings2+transmission), location (MapPin + area)
- **5 simultaneous hover effects** (400ms cubic-bezier): translateY(-10px) scale(1.02), box-shadow expand + cyanGlow, border → cyan/30%, image scale(1.08), "View Details" button slides up from translateY(100%)→0

**Dummy Data**: 12 Indian market cars (Maruti Swift, Hyundai Creta, Honda City, Kia Seltos, Toyota Innova, Mahindra XUV700, Tata Nexon EV, Maruti Baleno, Hyundai Venue, Honda Amaze, Kia Sonet, MG Hector), ₹2.5-18L, Kochi sub-locations, Unsplash car images.

---

### SECTION 5 — 3D FEATURED SLIDER (Perspective Carousel)

**Heading**: "Handpicked" (gold uppercase) + "Featured Cars" (gold text-gradient)

**Carousel**: max-width 1000px, height 380px, `perspective: 1200px`.
- Active: `scale(1) rotateY(0deg) opacity(1) z-index(10)`
- Adjacent: `scale(0.82) rotateY(∓12deg) translateX(∓260px) translateZ(-120px) opacity(0.45)`
- Far: `opacity(0)`
- Transition: `0.7s cubic-bezier(0.25,0.46,0.45,0.94)`
- Auto-advance: 5s. Nav: arrow buttons + dot indicators (active = 28px gold pill).

---

### SECTION 6 — CAR EXCHANGE (★ Revenue Feature)

**Background**: subtle gradient shift `linear-gradient(180deg, bg, surface/50%, bg)`

**Heading**: "Upgrade" (gold uppercase) + "Exchange Your Car" (gold gradient) + subtitle about trade-in.

**3-Step Exchange Flow** (horizontal desktop, vertical mobile):
1. "Your Current Car" — glass card + car-arrow-out icon
2. "We Evaluate" — glass card + clipboard-check icon  
3. "Drive Away Happy" — glass card + car-sparkle icon
- Animated dashed connector lines between steps (dashDraw animation on scroll)

**Exchange Calculator** (glass card):
- Fields: Your car brand (select), model (text), year (select 2015-2025), KM driven (number), Car you want (select from CARS data)
- CTA: "Get Exchange Value →" (btn-orange)
- On submit → estimated summary: "Your car: ₹X.X Lakh" / "Selected car: ₹Y.Y Lakh" / "You pay: ₹Z.Z Lakh" (cyan highlight)
- Trust line: "Zero hidden charges • Free doorstep evaluation • Same-day processing"

---

### SECTION 7 — WHY CHOOSE US (Trust Pillars)

4-column grid. Cards: Shield → "200+ Quality Checks", Zap → "Best Price Guarantee", FileText → "Free RC Transfer", Truck → "Home Delivery". Each has 56px icon container (cyanSoft bg), hover lifts with glow.

---

### SECTION 8 — HOW IT WORKS (Animated Timeline)

4-step horizontal flow. Steps: Search → "Browse Cars", Calendar → "Book Test Drive", CheckCircle2 → "Finalize Deal", Truck → "Get Delivered". 84px circles with cyan glow on scroll-in. Connecting line animates width 0→100% with transition 1.5s. Steps stagger at 0.2s intervals.

---

### SECTION 9 — SELL YOUR CAR (Marketplace)

Split layout: Left (copy + trust bullets + testimonial quote, enters from left) | Right (glass form card, enters from right).

Form: Name, Phone (+91), Car Brand (select), Model (text), Year (select), KM Driven (number), Expected Price (₹). CTA: "Get Best Resale Value →" (btn-orange). Submit → success state with bounceIn CheckCircle2 + "We'll call within 30 minutes!"

---

### SECTION 10 — TESTIMONIALS (Auto-Playing Carousel)

Single glass card (rounded 24px), decorative quote mark, star rating (gold), review text (italic 17px), name + location + car purchased. 6 testimonials with Kerala names. Auto-advance 4.5s, dot navigation. Include at least 1 exchange testimonial.

---

### SECTION 11 — LOCAL TRUST (Kochi Map)

Location badges on `floatSlow` keyframes: Kakkanad, Edappally, Aluva, Fort Kochi, Vyttila, Tripunithura. SVG map with animated pulsing circle markers. Counter: "1200+" (Syne 800, 48px, cyan) using `useCounter`.

---

### SECTION 12 — LEAD CAPTURE CTA

Background glow (cyanGlow radial, 500px, blur 60px). Glass card with `glowPulse` animation. Form: Name + Phone + Budget dropdown (Under ₹3L, ₹3-5L, ₹5-8L, ₹8-12L, ₹12L+, "Looking to Exchange") + "Get Offers →" primary btn. Submit → success state.

---

### SECTION 13 — FOOTER

4-column grid (2fr 1fr 1fr 1.5fr). Brand + tagline + socials | Quick Links (including Exchange) | Locations | Contact (phone click-to-call, email, WhatsApp, address). Bottom bar: copyright + Privacy/Terms.

---

## 6. PERSISTENT ELEMENTS

### WhatsApp Button (Fixed bottom-right, z-index 1000)
56px green circle (#25D366), MessageCircle icon. Shadow: `0 4px 20px rgba(37,211,102,0.35)`. Entry: bounceIn 2s delay. Hover tooltip: "Chat with us on WhatsApp". Link: `https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20buying%20a%20car%20from%20DriveKochi`. Hide on mobile when bottom bar visible.

### Mobile Bottom Bar (≤768px only)
Fixed bottom, glass bg + top border. Two buttons: "📞 Call Now" (glass bg, click-to-call) + "💬 WhatsApp" (green bg). Entry: slideUp 1.5s delay.

### Scroll-to-Top (appears scrollY > 600)
44px circle, surface bg, ArrowUp icon. Entry: bounceIn 0.4s.

---

## 7. VIDEO FILE REFERENCE

```
Filename:    hero-video.mp4 (rename from uploaded file)
Duration:    8 seconds (seamless loop)
Resolution:  1280 × 720 (720p)
Frame rate:  24fps
File size:   2.7 MB
Codec:       H.264 / AVC
Source:      Google Veo AI-generated

Content description (for poster frame / fallback):
- Seconds 0-2: Orange sports car, 3/4 studio angle, dark background with warm amber floor glow
- Seconds 3-5: Front-on driving shot through rain, headlight lens flares, wet road reflections
- Seconds 6-8: Rear view, glowing red taillights, tire mist, road reflections
- Overall tone: Dark, cinematic, premium — perfectly matches the #06060C design system
```

**For the demo artifact**: Since the actual video file can't be embedded in the `.jsx`, implement the hero with:
1. The full `<video>` element code (commented or with a placeholder `src`)
2. A rich CSS gradient fallback that mimics the video's dark-warm aesthetic:
   ```css
   background: linear-gradient(135deg, #06060C 0%, #1a0a08 30%, #0d0818 60%, #06060C 100%);
   ```
   This warm-dark gradient with amber and purple undertones approximates the video's mood
3. The particle system, glow orbs, and all content animations work regardless of whether the video loads

---

## 8. DUMMY DATA

### Cars (12 entries)
```typescript
interface Car {
  id: string; name: string; brand: string; year: number;
  price: number; // Lakhs
  fuelType: "Petrol" | "Diesel" | "Electric" | "CNG";
  transmission: "Manual" | "Automatic";
  kmDriven: number; bodyType: "SUV"|"Sedan"|"Hatchback"|"MUV";
  location: string; // Kochi sub-area
  badge?: "Recently Added" | "Limited Stock";
  features: string[];
  img: string; // Unsplash car image URL
  exchangeEligible?: boolean;
}
```
Brands: Maruti Suzuki, Hyundai, Honda, Toyota, Kia, Mahindra, Tata, MG. Prices ₹2.5-18L. Mix of sub-locations.

### Testimonials (6 entries)
Kerala names, Kochi areas, Indian car models, 4-5 star ratings. Include 1 exchange testimonial, 1 selling testimonial.

---

## 9. RESPONSIVE RULES

```css
@media (max-width: 768px) {
  hero-title: 32px; section headings: 28px;
  All grids → 1 column (trust grid → 2-col);
  Hide: nav center links, nav right buttons → show hamburger;
  Show: mobile bottom bar;
  Section padding: 60px 16px;
  Video overlay: increase mid-zone opacity to 0.65 for text readability;
  3D slider: stack cards, disable perspective transforms;
  Disable: CSS particle system (battery performance);
  Filter pills: horizontal scroll wrapper;
}
@media (max-width: 480px) {
  Trust grid: 1 column; Footer grid: 1 column;
  Hero title: 28px;
}
```

---

## 10. ANIMATION RULES

1. Scroll triggers: IntersectionObserver, `threshold: 0.1`, `rootMargin: "-60px"`, fire ONCE
2. Stagger: `0.08s` cards, `0.1s` trust items, `0.2s` major sections
3. Entry easing: `cubic-bezier(0.16, 1, 0.3, 1)`
4. Duration: 0.8s reveals, 0.3-0.4s hovers, 1.0-1.5s hero entrance
5. Parallax: bg 0.2x, content -0.15x, particles 0.2x, orbs 0.3x
6. Video: fades in 1.5s with 0.3s delay, loops seamlessly
7. No particles/heavy effects on mobile ≤768px

---

## 11. SEO & AEO

1. **h1**: "Pre-Owned Cars in Kochi — Buy, Sell & Exchange Verified Used Cars"
2. **Meta title**: "DriveKochi | Buy, Sell & Exchange Verified Pre-Owned Cars in Kochi, Kerala"
3. **Meta description**: "Explore 500+ quality-checked used cars in Kochi. Buy, sell, or exchange your car hassle-free. Best prices, free RC transfer, home delivery."
4. Semantic heading hierarchy, descriptive `alt` text, `aria-labels`, keyboard navigable
5. FAQ Schema + LocalBusiness Schema (JSON-LD)
6. Open Graph + Twitter Card meta tags

---

## 12. OUTPUT FORMAT

- **Single `.jsx` file** — complete, self-contained React component
- Default export function
- All sub-components in the same file
- All data constants at top
- All keyframes in one `<style>` tag
- Google Fonts via `<link>` inside component
- **Video element with placeholder src** + CSS gradient fallback for demo rendering
- EVERY section fully built, EVERY hover effect working, EVERY form functional

---

## 13. QUALITY CHECKLIST (22 PASS/FAIL)

- [ ] Hero video `<video>` element present with correct attributes (autoPlay, muted, loop, playsInline)
- [ ] Hero gradient overlay renders text readable over any video frame
- [ ] Hero particles float over the video layer
- [ ] Hero content reveal sequence staggers correctly (0.2s→1.4s)
- [ ] Navbar morphs from transparent to glass on scroll
- [ ] Marquee strip scrolls infinitely without jump
- [ ] All 12 car cards render with images, prices, badges
- [ ] All filter pills toggle + grid updates in real-time
- [ ] Budget slider filters by max price
- [ ] Search filters by name/brand
- [ ] Car card hover: lift + glow + image zoom + "View Details" slide-up (all 5 effects)
- [ ] 3D slider perspective transforms + auto-advance + dots
- [ ] Exchange calculator shows estimated values on submit
- [ ] "Sell Your Car" form → success state on submit
- [ ] Testimonials auto-play + dot navigation
- [ ] Kochi map markers pulse with stagger
- [ ] Counter animates 0→1200 on scroll
- [ ] Lead capture form → success state
- [ ] WhatsApp button floats with tooltip
- [ ] Mobile bottom bar appears ≤768px
- [ ] Scroll-to-top appears after 600px
- [ ] No horizontal overflow at any viewport width
