# Personal Portfolio Specification

## Goal

Create a one-page personal Portfolio that helps recruiters evaluate Owen Zou for Java Developer roles. It presents backend-focused delivery work, Vue 3 capability, and clear routes to contact or verify professional work.

## Audience

Primary: recruiters evaluating Java Developer candidates.

Secondary: engineering managers and technical interviewers.

## Scope

- One responsive page.
- English is the default language, with a visible control that switches all user-facing content to Chinese.
- No résumé download or embedded résumé.
- No public age, phone number, or location.
- No headshot or generated hero image.
- No contact form.

## Content

### Minimal masthead

- Name: Owen Zou.
- Role: Java Developer.
- Supporting capability: backend-focused, with Vue 3 frontend-delivery capability.
- Actions: email, LinkedIn, and GitHub profile.
- Do not use a promotional hero headline or hero visual.

### Selected work

Present three concise case studies. Each includes the business context, Owen's contribution, a measurable outcome when available, and the technology stack.

1. **CHI Billing Generation & Management System** for CHI Cargo, Germany.
   - Owned approximately 80% of features by modules and issues.
   - Automated billing workflows with DIAMANT and DOCUWARE integration.
   - Reduced batch billing processing from one hour to five minutes.
   - Reduced a key API response time from seven seconds to twenty milliseconds.
   - Stack: Spring Boot, Spring Security, MySQL, Redis, RabbitMQ, MinIO, XXL-JOB.

2. **Load Forecasting & Pre-Load Weight & Balance System**.
   - Owned backend delivery and Vue 3 frontend adjustments.
   - Delivered 10+ functional modules for aircraft weight and balance calculation.
   - Replaced an approximately 300-second blocking computation with asynchronous processing and SSE result delivery.
   - Stack: Spring Boot, Spring Security, PostgreSQL, Redis, MyBatis-Plus, MapStruct, Spring Retry, Vue 3.

3. **Tanzania Booking & Settlement System** for Air Tanzania.
   - Owned approximately 70% of features by modules and issues and ran 12 Sprints end-to-end.
   - Built ordered Kafka processing for flight manifest messages.
   - Designed multi-currency FX conversion with historical version traceability and data-isolated global roles.
   - Stack: Spring Boot, Spring Security, MySQL, Redis, Kafka, Elasticsearch, XXL-JOB.

### Experience

- iTran Systems, Backend Developer, 2025.08-2026.08.
- Concise evidence of international customer communication, independent production delivery, and Scrum ownership.

### Technical skills

Group skills around Java backend, data and messaging, deployment, and AI-assisted delivery. Avoid exhaustive résumé-style lists.

### Contact

- Primary: public email from the résumé.
- Secondary: LinkedIn, `https://www.linkedin.com/in/owen-zou/`.
- Supporting verification: overall GitHub profile, `https://github.com/Lilb1tty`.

## Implementation

- React with Vite and TypeScript.
- shadcn/ui as the component foundation, customized rather than used in its default visual state.
- Tailwind CSS for styling.
- Use an accessible motion library for interaction and scroll-driven animation.
- Keep motion in isolated client-side components and honor `prefers-reduced-motion`.

## Design Rules

Use the supplied Anthropic-inspired reference as concrete rules, not a loose mood reference.

- Primary palette: `#faf9f5` background and `#141413` text, borders, and dark surfaces.
- Support both light and dark themes, with a manual toggle and system preference as the initial setting.
- Use one visual system: soft 8, 16, and 24 px radii and extremely soft shadows.
- Use a compact sans display treatment with a monospace treatment for technical metadata.
- Do not use AI-purple gradients, generic three-equal-card layouts, decorative status dots, or fake product screenshots.
- Use a minimal masthead instead of a conventional sales-style hero.
- Maintain visible keyboard focus and at least 44 by 44 px touch targets.

## Motion

Motion intensity is high but purposeful.

- Masthead: staged reveal on initial load.
- Selected work: scroll-driven transitions that reveal or transform each case study.
- Contact actions: magnetic pointer interaction and tactile press feedback.
- Standard interaction timing: 100 ms for micro-feedback, 200 ms for standard transitions, and up to 800 ms for major reveals, using `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced-motion mode removes scroll-driven and magnetic effects while preserving content order and interaction access.
- Do not use raw scroll event listeners or continuous React state updates for animation.

## Acceptance Criteria

- Recruiters can identify Owen, the target role, and a contact route without scrolling far.
- The English and Chinese experiences contain the same information and can be switched without a page reload.
- Each case study communicates a concrete contribution, at least one outcome where available, and its stack.
- No résumé is displayed or downloadable, and no age, phone number, or location is public.
- LinkedIn and GitHub point to the specified profiles; email opens the approved résumé email address.
- The page works at mobile and desktop widths, with explicit single-column mobile layouts.
- Light and dark themes maintain readable contrast and a consistent visual identity.
- Keyboard navigation, focus visibility, touch target sizing, and reduced-motion behavior are verified.
- All visible copy is reviewed for factual accuracy against the résumé.
