# GoodBoy donation form

Next.js app for the GoodRequest frontend assignment: 3-step donation wizard, About metrics, and Contact.

## Constraints (from the assignment)

- Stack: Next.js, TypeScript, TanStack Query, a form library, client state management
- Call the provided public API directly (shelters, results, contribute)
- Validation rules: conditional shelter, amount > 0, name lengths, email, SK/CZ phone (+420/+421), consent
- First name optional on the frontend; Contact page; About raised total + donor count
- Nice-to-haves taken: i18next, styled-components, Zod, accessibility, responsive layout, SEO (`og:image`, per-step titles)

## Decisions

| Concern | Choice | Why |
|--------|--------|-----|
| Forms | react-hook-form | Recommended; field values stay in RHF |
| Client / UI state | Zustand | Wizard step, enter/exit direction, submit feedback stay out of RHF so navigation/animation does not fight field re-renders |
| Validation | Zod | Per-step `superRefine`; resolver swaps with the active step. Continue = active step only; final submit revalidates the full form |
| Styling | styled-components + tokens | Theme in `src/styles/tokens.ts` |
| i18n | i18next (SK default, EN) | UI strings only. No `/en` routes; language is `localStorage` + `document.documentElement.lang` |
| Primitives | Radix (Select, Checkbox, Toggle) | Figma palette is thinner than Mantine’s scales; Radix for a11y, tokens for look |
| API access | Browser → assignment API | No Next.js BFF; the assignment ships a public API |
| SEO | SK server metadata + `og:image` | EN is a client UI language. Crawlers and link previews always see Slovak |
| About results | Total € + donor count | What `GET …/results` returns; no donor name list in the payload |
| Multi-donor UI | Not built | Request body already uses `contributors[]` with one entry, so the shape can grow later without an API change |
| About refresh | 60s `refetchInterval` | Matches “regularly updated” without hammering the API |
| First name vs API | Optional in UI | If contribute still requires it, failures map through server field errors |

**API errors:** POST `messages` with `path` map to form fields (`mapContributeErrors`); the wizard jumps to the earliest errored step.

## Layout

```
src/
  api/          assignment API clients
  hooks/        TanStack Query wrappers
  store/        Zustand wizard state
  lib/          Zod, phone/email helpers, API error mapping, SEO
  components/   donation wizard, layout, UI primitives
  i18n/         locales
  styles/       tokens + theme typing
  config/       API base URL, presets, contact/home assets
```

| Path | Purpose |
|------|---------|
| `/` | Donation wizard |
| `/about` | Raised amount + contributor count |
| `/contact` | Organization contact details |
