# STATUS: Smiz Portfolio

- Current Phase: PRD
- Last Updated: 18 May 2026

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
