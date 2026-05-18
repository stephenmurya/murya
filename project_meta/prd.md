# PRD: Smiz Portfolio

- Version: 0.1 â€” 18 May 2026
- Status: Draft

## 1. Problem Statement

Stephen Murya (Smiz) requires a high-performance, visually distinct digital portfolio to present selected software, game, and product design work. The system must reflect a premium, dark, editorial aesthetic while delivering immediate load times. Without a robust, centralized portfolio, the ability to showcase technical depth and design philosophy to prospective clients or employers is severely fragmented.

## 2. Goals

- Functional: Provide a filterable index of works across Software, Games, and Product Design.
- Functional: Serve rich, statically generated case-study detail pages for individual projects.
- Quality (Performance): Achieve near-instant page loads via Next.js Static Site Generation (SSG).
- Quality (Aesthetic): Maintain strict visual constraints: pure dark palette, 1px borders, editorial typography, and an interactive WebGL background.
- Quality (SEO): Ensure all works are fully indexable with rich OpenGraph metadata.

## 3. Non-Goals

- A dynamic, database-backed Content Management System (CMS) or Admin UI.
- User authentication or personalized content.
- Dynamic backend APIs or server-side rendering (SSR) for standard pages.
- Native mobile application wrappers.

## 4. Assumptions

- The application will be deployed to a standard edge/serverless platform optimized for Next.js (assumed Vercel).
- Content updates (new projects) will be handled via code commits (Git) rather than a dynamic dashboard.
- The user is comfortable maintaining .ts or .mdx files for content.

## 5. User Roles

### Visitor

- Description: General public, prospective clients, or technical recruiters.
- Capabilities: Can view the homepage, filter works, read case studies, and interact with mailto/social links.
- Restrictions: Cannot modify content or access any restricted routes.

### System Owner (Developer)

- Description: Smiz.
- Capabilities: Modifies the repository, commits new static assets, and triggers CI/CD builds.

## 6. Core User Journeys

- Discovery: Visitor lands on the homepage, experiences the WebGL introduction, and reads the design philosophy and technical stack summary.
- Exploration: Visitor navigates the project grid, toggling filters (e.g., "Game Development") to instantly re-render the viewable cards via client-side state.
- Deep Dive: Visitor clicks a project card, navigating to /works/[slug]. They read a sequentially ordered, media-rich case study and can return to the index.
- Outreach: Visitor clicks the email link in the footer, opening their native mail client with a pre-configured destination.

## 7. Functional Requirements

- The system must statically generate all routes under /works/[slug] at build time using generateStaticParams.
- The index view must support client-side filtering by predefined categories without triggering a page reload.
- Projects with missing imagery must safely fallback to an "Image Pending" placeholder component.
- The site must render a responsive WebGL shader background on the homepage without blocking the main thread or violating Core Web Vitals.
- All navigation must utilize standard Next.js <Link> components to ensure route prefetching.

## 8. Non-Functional Requirements

- Performance: Core Web Vitals must pass in the 90th percentile (LCP < 2.5s).
- Accessibility: All images must have descriptive alt attributes. Focus states must be visible. Semantic HTML must be used for case study structures.
- Security: No secrets or sensitive environment variables exposed to the browser.

## 9. Authorization Matrix

Note: This is a static, public site. No sensitive domain entities exist.

| Role | Resource | Create | Read | Update | Delete | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Visitor | All Pages | No | Yes | No | No | Public SSG Routes |
| Visitor | Static Assets | No | Yes | No | No | Images, Fonts |

## 10. Data Model (Conceptual)

- Project: slug (PK), title, category, client (optional), year, status, summary, stack (array).
- ProjectSection: heading, paragraphs (array of text).
- ProjectImage: src, alt, type (local | remote | placeholder).

## 11. Integration Requirements

- Framer User Content (Current): Remote image fetching from framerusercontent.com. Note: High risk of link rot. Must be mitigated.
- Google Fonts: Next.js native integration (next/font/google) for Geist, Geist Mono, Instrument Serif. No external network calls at runtime.

## 12. Workflow State Machines

N/A â€” Projects are static compile-time records. No dynamic state transitions exist.

## 13. Compliance and Privacy Surface

- No PII is collected, stored, or processed.
- No cookies are currently set, bypassing the need for a GDPR consent banner unless third-party analytics are introduced in the future.

## 14. Open Questions

- Deployment Target: Confirm Vercel is the intended deployment target so CI/CD and deployment configuration files can be generated.
- Asset Hosting: Will we migrate the framerusercontent.com images to the local public directory, or wire up a dedicated CDN/S3 bucket?
- Content Strategy: Shall we keep src/lib/projects.ts as the source of truth, or refactor to Markdown/MDX for better editorial ergonomics?
- Analytics/Observability: Do you require Vercel Analytics, PostHog, or basic error monitoring (Sentry)?

## 15. Out of Scope (Explicit)

- Backend API development.
- Database provisioning.
- Interactive comment sections on case studies.
- Dynamic view counters.
