# ACHARYA-AI-PITCH — DESIGN REVAMP IMPLEMENTATION PLAN

> Derived from a four-cluster audit (taste / impeccable / Emil design-eng rubrics) covering every page and component.
> **Executor instructions:** Complete phases in order (A → F). Within a phase, complete tasks in order. After EVERY phase, run `npm run build` — it must pass with zero TypeScript errors before starting the next phase. Do not make any change not listed here. Do not refactor beyond what a task specifies. When a task says "replace X with Y", make exactly that substitution.

**Do-not-touch list** (audited clean, no changes allowed):
`src/audio/NarrationContext.tsx`, `src/main.tsx`, `src/components/ui/BackgroundVideo.tsx`, `src/components/ui/blur-fade.tsx`, `src/lib/utils.ts`, `src/constants/slides-test-revert.tsx`

---

## PHASE A — FOUNDATION: SHARED MOTION TOKENS & SYSTEM FIXES

### A1. Create `src/theme/motion.ts` (new file)
```ts
// Single source of truth for motion physics.
// Components must import from here instead of declaring local easing arrays / spring configs.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const SPRINGS = {
  /** Magnetic pull, cursor-follow interactions */
  responsive: { stiffness: 200, damping: 18, mass: 0.6 },
  /** 3D tilt, card hover */
  smooth: { stiffness: 160, damping: 22 },
  /** Small fast followers (cursor dot) */
  light: { stiffness: 350, damping: 28, mass: 0.4 },
  /** Slide/page entrances */
  entrance: { stiffness: 260, damping: 20 },
  /** Slow ambient parallax */
  gentle: { stiffness: 60, damping: 24 },
} as const;

/** Standard stagger step between siblings, in seconds */
export const STAGGER_STEP = 0.08;
```

### A2. `src/theme/branding.ts` — add gold + easing tokens
Add inside the `colors` object (after `secondaryText`):
```ts
gold: '#e8c789',
```
Add a new top-level key after `fonts`:
```ts
easing: {
  outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snap: 'cubic-bezier(0.22, 1.2, 0.36, 1)',
},
```

### A3. `src/index.css` — remove render-blocking font import
Delete line 1 entirely (the `@import url('https://fonts.googleapis.com/css2?...')` line). Fonts are already loaded via `<link>` in `index.html`.

### A4. `index.html` — meta + font weights
1. Add after the viewport meta tag: `<meta name="theme-color" content="#020C1B" />`
2. In the Google Fonts `<link>` URL, change the Playfair Display segment from `wght@0,700;1,700` to `ital,wght@0,400;0,700;1,400;1,700` (the site uses `font-normal` italic Playfair which is currently not loaded).
3. If the `og:image` meta is a relative path (`/og-image.png`), change it to the absolute URL `https://acharya-ai-pitch.vercel.app/og-image.png`.

### A5. `src/index.css` — extend reduced-motion coverage
Inside the existing `@media (prefers-reduced-motion: reduce)` block (around line 243), add to the existing animation-disabling rule list:
```css
  .animate-ripple,
  .animate-shimmer-slide,
  .animate-spin-around,
  .animate-grid {
    animation: none !important;
  }
```

### A6. `src/index.css` — fix `.stagger` to use shared step and extend to 8 children
Replace the `.stagger > *:nth-child(...)` block with:
```css
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 80ms; }
.stagger > *:nth-child(3) { animation-delay: 160ms; }
.stagger > *:nth-child(4) { animation-delay: 240ms; }
.stagger > *:nth-child(5) { animation-delay: 320ms; }
.stagger > *:nth-child(6) { animation-delay: 400ms; }
.stagger > *:nth-child(7) { animation-delay: 480ms; }
.stagger > *:nth-child(8) { animation-delay: 560ms; }
```

### A7. Delete dead component
Delete the file `src/components/ui/neon-gradient-card.tsx` (zero imports anywhere in src/). Do NOT delete `AnimatedBorder.tsx` — it gets used in Phase E.

**Verify:** `npm run build` passes.

---

## PHASE B — CRITICAL ACCESSIBILITY & CORRECTNESS

### B1. `src/components/ui/MagneticButton.tsx` — keyboard focus support
On BOTH `motion.a` (line ~71) and `motion.button` (line ~75), add these props:
```tsx
onFocus={() => setHovered(true)}
onBlur={() => setHovered(false)}
```
(The scale-on-hover animation will then also fire on keyboard focus.)

### B2. `src/components/ui/CursorSpotlight.tsx` — reduced motion + touch + class fix
1. Add to imports: `useReducedMotion` from `'framer-motion'`.
2. At the top of the component body add:
```tsx
const reduceMotion = useReducedMotion();
```
3. Immediately before the `return`, add:
```tsx
if (reduceMotion) return null;
```
   (Note: the existing `useEffect`/hooks must stay ABOVE this early return — hooks order must not change conditionally. Place the early return AFTER all hook calls.)
4. On the spring-dot `motion.div`, change `className="pointer-events-none fixed z-[41] rounded-full"` to `className="cursor-dot pointer-events-none fixed z-[41] rounded-full"` — this makes the existing `@media (pointer: coarse) { .cursor-dot { display:none } }` rule in index.css actually apply.

### B3. `src/components/ui/flickering-grid.tsx` — reduced motion guard
1. Import `useReducedMotion` from `'framer-motion'`.
2. Get `const reduceMotion = useReducedMotion();` in the component.
3. In the `useEffect` that starts the rAF animation loop, add as the first line: `if (reduceMotion) return;` and add `reduceMotion` to that effect's dependency array. (A static first frame may render; that is fine.)

### B4. `src/components/landing/CTA.tsx` — remove duplicate MagneticButton
1. Delete the entire local `MagneticButton` component definition (lines ~14–65).
2. Add import: `import { MagneticButton } from '../ui/MagneticButton';`
3. Update usages: the local version used a `to` prop for router links. The shared component supports `href` only — for any usage with `to="/pricing"`-style internal routes, replace with the shared `MagneticButton` using `onClick={() => navigate('/pricing')}` and add `import { useNavigate } from 'react-router-dom';` + `const navigate = useNavigate();`, OR if the usage is a mailto/anchor, pass it as `href`.
4. Remove now-unused imports (`useRef`, `useMotionValue`, `useSpring` — keep only what's still used).
5. Add `press-scale` to the className of the primary CTA MagneticButton (consistency with Hero).

### B5. `src/components/Notes.tsx` — accessible dialog
1. On the modal root `motion.div`, add: `role="dialog"` `aria-modal="true"` `aria-labelledby="notes-title"`.
2. Add a visually hidden title as the first child of the modal: `<h2 id="notes-title" className="sr-only">Speaker Notes</h2>`. If no `sr-only` utility exists, Tailwind provides it by default.
3. On the close (X) button add `aria-label="Close speaker notes"`.
4. Remove the `italic` class from the notes body text (keep `text-xl leading-relaxed`).
5. Under the notes body add: `<span className="block text-xs text-[#A7DADB]/50 mt-4">Press <kbd>N</kbd> or <kbd>Esc</kbd> to close</span>`.

### B6. `src/components/Navigation.tsx` — labels, touch targets, feedback
1. Prev button: add `aria-label="Previous slide"`; Next button: add `aria-label="Next slide"`.
2. Change `p-3` to `p-3 min-h-11 min-w-11 flex items-center justify-center` on both chevron buttons (guarantees ≥44px).
3. Add `press-scale` class to both chevron buttons.
4. Any other icon-only button in this file (notes toggle, presenter launch): add a descriptive `aria-label` (e.g. `aria-label="Toggle speaker notes"`, `aria-label="Open presenter view"`).

### B7. `src/components/PresenterLayout.tsx` — labels, touch targets, dynamic substep
1. Both nav buttons (lines ~212–229): change `p-3` to `p-4 min-h-11 min-w-11`, add `press-scale`, add `aria-label="Previous slide"` / `aria-label="Next slide"`, and add `aria-disabled={...}` mirroring the existing `disabled` condition.
2. Scrollbar contrast: in the notes panel's scrollbar styling, change thumb color `rgba(167, 218, 219, 0.2)` to `rgba(167, 218, 219, 0.4)`.
3. Substep indicator (line ~104): replace the hardcoded `currentSlide === 2` condition so the STEP indicator shows for ANY slide present in the substep config — use the same config object/lookup PitchDeck uses (import or duplicate the `slideConfig` mapping) : `slideConfig[currentSlide] !== undefined`.

### B8. `src/pages/PitchDeck.tsx` — keyboard safety + labels + progress
1. In the keydown handler, add as the first statement:
```ts
if (document.activeElement?.closest('[role="dialog"]')) return;
```
2. Home/back button (line ~186): add `aria-label="Return to homepage"`.
3. Fullscreen progress: where the progress bar is hidden in present mode (`!isPresentMode && ...`, line ~172), add a minimal fallback rendered when `isPresentMode` is true:
```tsx
{isPresentMode && (
  <div className="fixed top-4 right-6 z-50 font-mono text-[11px] tracking-[0.2em] text-[#A7DADB]/60 tabular-nums" aria-live="polite">
    {currentSlide + 1} / {slidesData.length}
  </div>
)}
```
(Adjust variable names to match the file's actual state names.)

### B9. `src/pages/PricingPage.tsx` — viewport + menu accessibility
1. Line ~97: change `h-screen` to `min-h-[100dvh]`.
2. Mobile menu button (line ~113): add `aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}` and `aria-expanded={mobileMenuOpen}`; change `p-2` to `h-10 w-10 flex items-center justify-center`.
3. Phase selector buttons (line ~136): add `aria-pressed={selectedPhase === phase.id}` (adjust to actual state/prop names in file).
4. Remove the unused `useReducedMotion` import OR (preferred) use it: `const reduceMotion = useReducedMotion();` and pass `initial={reduceMotion ? false : { opacity: 0, y: 16 }}` on the page's section-level motion.div entrances.

### B10. `src/audio/PlayNarrationButton.tsx` — slider aria-valuetext
On the slider element (line ~94), add:
```tsx
aria-valuetext={`${formatTime(scrubPct !== null ? (scrubPct / 100) * duration : currentTime)} of ${formatTime(duration)}`}
```
(Use the file's existing `formatTime` helper and state names exactly.)

### B11. `src/pages/TermsPage.tsx` — proper routing + scroll restoration
1. Replace the `window.history.pushState()` + `popstate` logo navigation (lines ~109–115) with React Router: add `import { useNavigate } from 'react-router-dom';`, `const navigate = useNavigate();`, and `onClick={() => navigate('/')}`.
2. Add at the top of the component: `useEffect(() => { window.scrollTo(0, 0); }, []);` (import `useEffect` if missing).
3. Footer links with dead `href="#"` (lines ~375–377): convert the Privacy/Governance/Compliance anchors to plain `<span>` elements with the same classes minus hover styles (no fake links).
4. Add `aria-hidden="true"` to every `<ChevronRight>` used decoratively (lines ~195, 204, 225, 233).

### B12. `src/App.tsx` — 404, scroll restoration, page titles
1. Add a `ScrollToTop` component inside App.tsx:
```tsx
import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
```
Render `<ScrollToTop />` just inside the Router, above `<Routes>`.
2. Add a catch-all route as the LAST route: `<Route path="*" element={<Navigate to="/" replace />} />`.
3. Add a `usePageTitle` effect in the same file:
```tsx
const TITLES: Record<string, string> = {
  '/': 'Smartslate × AIT — The AI-Native Campus',
  '/pitch-deck': 'Pitch Deck — Smartslate × AIT',
  '/pricing': 'Investment — Smartslate × AIT',
  '/terms': 'Terms — Smartslate × AIT',
  '/transcript': 'Narration Transcript — Smartslate × AIT',
};
```
Inside `ScrollToTop`'s effect (it already watches pathname) add: `document.title = TITLES[pathname] ?? TITLES['/'];`

**Verify:** `npm run build` passes.

---

## PHASE C — LAYOUT-SHIFT ANIMATION FIXES (CLS)

Rule for all tasks in this phase: bars must keep a STATIC track element for layout, with the animated fill using `scaleX`/`scaleY` + `transformOrigin`, never `width`/`height` animation.

### C1. `src/components/landing/Outcomes.tsx` (~line 414) — ComparativeBar/ConsoleBar
Replace the `motion.span`/`motion.div` that animates `width: '0%' → '${value}%'` with:
```tsx
<motion.span
  className="absolute inset-y-0 left-0 w-full ..."   // keep existing visual classes
  style={{ transformOrigin: 'left' }}
  initial={{ scaleX: 0 }}
  animate={{ scaleX: value / 100 }}
  transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
/>
```
The parent track must be `relative overflow-hidden` with a fixed width. Import `EASE_OUT_EXPO` from `../../theme/motion`. Apply the same pattern to EVERY width-animated bar in this file (there are multiple: console bars ~414, comparative bars ~609). Unify all bar durations to `0.8`.

### C2. `src/components/landing/ProblemMatrix.tsx` (~lines 571–587) — height bars
Same pattern vertically: animated child uses `style={{ transformOrigin: 'bottom' }}`, `initial={{ scaleY: 0 }}`, `whileInView={{ scaleY: 1 }}`, with the bar's final height set statically via `height: bar.h` on the element (not animated). Keep existing duration/delay values but the property must be `scaleY`.

### C3. `src/constants/slides.tsx` (~lines 228, 303) — progress bars
Each `whileInView={{ width: "20%" }}` (or any percentage) becomes:
- Set static `className="w-full"` (or `w-[20%]`-equivalent static width on a wrapper), and animate `initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}` with `style={{ transformOrigin: 'left' }}` on the fill, where the wrapper has the target width statically.
- Add `viewport={{ once: true }}` if not present.
Search the whole file for `width:` inside `animate`/`whileInView` objects and convert every occurrence with this pattern.

**Verify:** `npm run build` passes. Bars must look identical at rest.

---

## PHASE D — MOTION SYSTEM UNIFICATION

### D1. Replace local easing arrays with shared import
In each of these files, delete the local `const easeOut = [0.16, 1, 0.3, 1] ...` declaration and replace all its usages with `EASE_OUT_EXPO` imported from `src/theme/motion`:
- `src/components/landing/Hero.tsx`
- `src/components/landing/ProblemMatrix.tsx`
- `src/components/landing/SolutionPillars.tsx`
- `src/components/landing/Outcomes.tsx`
- `src/components/landing/CTA.tsx`
- `src/pages/LandingPage.tsx` (if it declares one)
Import path from `components/landing/*` is `'../../theme/motion'`.

### D2. Spring presets
1. `src/components/ui/MagneticButton.tsx`: replace `{ stiffness: 200, damping: 18, mass: 0.6 }` with `SPRINGS.responsive` (import from `'../../theme/motion'`).
2. `src/components/ui/TiltCard.tsx`: replace its spring config with `SPRINGS.smooth`.
3. `src/components/ui/CursorSpotlight.tsx`: replace `{ stiffness: 350, damping: 28, mass: 0.4 }` with `SPRINGS.light`.
4. `src/components/Slide.tsx`: replace `{ stiffness: 260, damping: 20 }` with `SPRINGS.entrance`.
5. `src/components/landing/Hero.tsx`: replace parallax `{ stiffness: 60, damping: 24 }` with `SPRINGS.gentle`.
Do NOT change spring values inside `slides.tsx` (too many; visual risk outweighs gain).

### D3. TiltCard settle fix
`src/components/ui/TiltCard.tsx` and the tilt logic in `ProblemMatrix.tsx` (~line 102): if a spring config includes `restDelta: 0.001`, change it to `restDelta: 0.3` (kills the 1–2s post-hover shimmer).

### D4. Timing calibration (single-value changes)
1. `Hero.tsx` (~line 221): bottom HUD line `duration: 1.6` → `duration: 1.2`.
2. `Outcomes.tsx` (~line 477): scenario caption transition `duration: 0.45` → `duration: 0.65`.

### D5. `src/components/ui/SpringCounter.tsx` — viewport margin consistency
Change `margin: '-20px'` to `margin: '-50px'` in the `useInView` options.

**Verify:** `npm run build` passes.

---

## PHASE E — TASTE & POLISH

### E1. Typography fixes
1. `Hero.tsx` subcopy (~line 108): `max-w-[58ch]` → `max-w-[62ch]`.
2. `Outcomes.tsx` "Tune the dial" h3 (~line 461): add `text-balance` class.
3. `Outcomes.tsx` pull quote (~line 798): add `text-balance` class to the quote element.
4. `TermsPage.tsx` (~line 125): `max-w-5xl` → `max-w-3xl` on the `<main>` content column.
5. `TranscriptPage.tsx` (~line 79): `leading-[1.7]` → `leading-[1.6]` on script body text.
6. `TranscriptPage.tsx` (~line 65): chapter overline `text-[10px]` → `text-[11px]`.
7. `src/components/Slide.tsx` (~line 119): metadata stamp `text-[10px]` → `text-xs` and `tracking-[0.3em]` → `tracking-[0.25em]`.

### E2. Hover physics consistency
1. `SolutionPillars.tsx` pillar cards (~line 216): add `hover-lift` class to the card container (the utility exists in index.css).
2. `PricingPage.tsx` phase cards (~line 144): add `hover-lift` class.
3. `PricingPage.tsx` CTA button (~line 228): add `press-scale` class.
4. Card hover border standardization: in `ProblemMatrix.tsx` (~lines 408, 514) and `SolutionPillars.tsx` (~line 216), set all interactive card hover borders to `hover:border-[#A7DADB]/25`.

### E3. AnimatedBorder usage (justifies the component; one spot only)
`PricingPage.tsx`: wrap ONLY the middle/featured phase card ("The Vanguard") in `BorderCard` from `'../components/ui/AnimatedBorder'` (the static gradient-border variant — NOT the rotating one), preserving the card's existing inner classes. If the import or composition produces any visual regression, skip this task and note it.

### E4. slides.tsx targeted fixes (exact, enumerated — nothing else)
1. (~line 614) Remove duplicated `text-center text-center text-center` → single `text-center`.
2. (~line 437) Number "01" `text-[#A7DADB]/20` → `text-[#A7DADB]/40`.
3. (~line 64) Remove `whitespace-nowrap` from the slide-1 subtitle; add `max-w-4xl text-balance` in its place.
4. (~line 142) FlipCard images: `alt=""` → `alt={item.label}` (use the actual mapped variable name).
5. (~line 1215) Final-slide gradient headline: change `from-white via-[#A7DADB] to-white/60` to `from-white via-[#A7DADB] to-white` (removes the low-contrast tail while keeping the gradient).
6. Icon strokeWidth: leave as-is (consistent at 2 already).

### E5. `src/components/FlipCard.tsx`
1. Height: `h-[650px]` → `h-[clamp(420px,80vh,650px)]`.
2. Reduced motion: import `useReducedMotion` from framer-motion; flip transition duration becomes `reduceMotion ? 0 : <existing>`.
3. Affordance: add below/inside the card front: `<p className="text-xs text-[#A7DADB]/50 mt-4 text-center" aria-hidden="true">Click to reveal</p>` (only if a similar hint doesn't already exist).

### E6. `src/components/ScalingContainer.tsx` — resize debounce
Wrap the resize handler:
```ts
let t: ReturnType<typeof setTimeout>;
const debounced = () => { clearTimeout(t); t = setTimeout(handleResize, 150); };
window.addEventListener('resize', debounced);
```
(And clean up both the timeout and listener in the effect's return.)

### E7. `src/components/ui/AnimatedBorder.tsx` — reduced motion on rotating variant
In `AnimatedBorderCard`, import `useReducedMotion`; when true, render the static gradient (no `animate={{ rotate: 360 }}`).

### E8. `src/components/ui/ripple.tsx` — undefined CSS var
Replace `var(--foreground)` with `rgba(167, 218, 219, 0.4)` for the ripple border color.

**Verify:** `npm run build` passes.

---

## PHASE F — FINAL VERIFICATION & SHIP

1. `npm run build` — zero TS errors.
2. Manual grep checks (each must return ZERO results):
   - `grep -rn "animate={{ width" src/` and `grep -rn 'whileInView={{ width' src/`
   - `grep -rn "history.pushState" src/pages/`
   - `grep -rn "text-center text-center" src/`
   - `grep -rn "neon-gradient" src/`
   - `grep -rn "const easeOut = \[0.16" src/components/landing/`
3. Commit all changes in ONE commit on `main` with message:
   `polish: design-eng revamp — a11y (focus, aria, touch targets), CLS-safe bar animations, unified motion tokens, taste fixes across all pages`
4. Push to `main` with `git push -u origin main` (or MCP push_files), retrying per backoff policy on network failure.

## EXPLICITLY OUT OF SCOPE (do not do)
- No typographic scale refactor of slides.tsx headlines (160px/140px/120px stay).
- No replacement of inline hex colors with Tailwind theme tokens in slides.tsx.
- No consolidation of NumberTicker into SpringCounter (both stay).
- No touch-tilt support in TiltCard (desktop-only is accepted).
- No copy rewrites (the "AI" repetition note is deferred).
- No backdrop-blur hierarchy standardization in slides.tsx.
- No changes to BroadcastChannel presenter sync.