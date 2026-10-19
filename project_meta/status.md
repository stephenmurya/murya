# STATUS: Smiz Portfolio

- Current Phase: PRD
- Last Updated: 19 October 2026

## Cuelio integration operations

Production activation evidence is recorded in
[`cuelio-operations.md`](cuelio-operations.md). On 2026-10-19, Cuelio's
application and events Worker versions were activated at the documented
production versions, with the `MURYA_CONTROL_PLANE` binding targeting
`murya-control-plane`. Delivery and retention are enabled; two scheduled
events plus the activation smoke were validated with zero retries, dead
letters, quarantine, or duplicate groups, and public smokes returned 200.

Founder credential rotation completed through a one-time controlled process:
old sessions and revocable verification state were cleared while the sole
Owner, identity, credential, verified TOTP, and immutable claim were preserved.
The temporary rotation utility was not retained after security review.

## Phase History

| Phase | Status | Notes |
| --- | --- | --- |
| Brainstorm | Complete | Identified need for high-performance, dark-mode static portfolio. |
| Discovery | Complete | Extracted current architecture from codebase context dump. |
| PRD | Complete | Baseline PRD generated. Open architectural questions surfaced. |
| Prompt Generation | Pending | Blocked by open decisions regarding assets and deployment. |

## Open Decisions

- Asset Strategy: Local migration vs. External CDN vs. maintaining risky Framer links.
- Deployment Platform: Confirm Vercel or specify alternative (AWS/Cloudflare/Netlify).
- Content Management: Retain TS objects or migrate to MDX.
- SEO/Analytics: Define required telemetry and metadata plugins.

## Key Architectural Decisions Made

- Framework: Next.js 16.2 App Router.
- Rendering: Static Site Generation (SSG) for all routes.
- Styling: Tailwind CSS v4 with custom shadcn-compatible utility patterns.
- Visuals: Three.js for client-side WebGL interactions.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Link Rot (Framer Images) | High | High | Migrate remote images to the local /public directory or a controlled S3/CDN bucket before launch. |
| SEO Penalty | High | Medium | Implement metadata exports, sitemap.ts, and OpenGraph images across all static routes. |
| Unmanaged Tech Debt | Medium | Low | Clean up unused generic UI components (e.g., liquid-glass-button.tsx) to strictly match the portfolio's design system. |
