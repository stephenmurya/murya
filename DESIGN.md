# Design system

## 1. Overview

The portfolio uses a dark editorial system: black space, zinc structure, white type, restrained motion, and deliberate image-led pacing. It should feel like a personal engineering journal with the finish of a considered product, not a dashboard and not a catalogue of decorative screens.

The visual language is intentionally spare. Content, typography, and project artefacts do most of the work; borders and spacing provide the frame.

## 2. Surfaces and color

- Canvas: `#000000`.
- Card and elevated content surface: `#09090b`.
- Structural border: `#27272a` (zinc, generally 1px).
- Primary text: white / near-white.
- Secondary text: zinc-muted values for metadata, descriptions, and supporting copy.

Use the black canvas as the dominant plane. Use `#09090b` sparingly for project panels and contained content. Borders should establish rhythm and separation rather than become decoration. Avoid adding bright accent colors or gradients unless a project artefact itself requires them.

## 3. Typography

- Display: Instrument Serif, used for editorial headlines and moments that need a more expressive, authored voice.
- Body and UI: Geist, used for navigation, metadata, descriptions, controls, and technical writing.

Typography should create the contrast between personal editorial voice and engineering clarity. Headings may be expressive, but supporting copy stays compact, readable, and specific. Avoid turning every label into a loud all-caps treatment.

## 4. Layout

- Primary content container: Tailwind-style `max-w-7xl`.
- Horizontal gutters: `px-4 sm:px-6 lg:px-8`.
- Layouts favor wide editorial compositions, strong left alignment, and generous negative space.
- Use 1px rules and column relationships to organize long pages instead of repeated rounded cards.
- Project detail pages should be able to expand into long-form case studies while preserving the same container and reading measure.

## 5. Components and treatments

- Header/navigation: minimal, semantic, high-contrast, and persistent where useful.
- Project cards and links: rectangular editorial blocks with image, title, metadata, and a clear hover/focus response.
- Chips: rectangular rather than pill-shaped; use them for concise project metadata or categories.
- Borders: 1px zinc rules for section starts, card edges, tab rails, and supporting dividers.
- Buttons and links: quiet by default, with clear focus and restrained transitions; avoid excessive rounded treatment.
- Images: large, intentional crops with consistent object-fit behavior; let the image carry visual weight and avoid unnecessary overlays.
- Hero: the WebGL hero is atmospheric and spatial, but content and navigation must remain readable and available without it.
- Logo marquee: a measured horizontal rhythm for selected client/brand marks; it should remain secondary to project content and respect reduced-motion preferences.

## 6. Motion

Lenis provides smooth scrolling, while transitions and reveal effects remain restrained. Motion should support pacing, hierarchy, and feedback, not add spectacle to every interaction. WebGL and marquee movement need reduced-motion fallbacks, and no animation should be required to discover core content.

## 7. Content and image behavior

Project pages should move from a concise framing to evidence: role, problem, system decisions, implementation, and outcome or current state. Use real project imagery, screenshots, diagrams, and code-adjacent artefacts where available. Caption images when context matters, and do not imply results that have not been verified.

## 8. Do's and don'ts

### Do

- Keep the black/zinc editorial register consistent across index and detail pages.
- Use Instrument Serif and Geist as a deliberate, repeatable pairing.
- Keep container widths, gutters, borders, and image behavior predictable.
- Let case studies become longer when the systems thinking warrants it.
- Explain AI-assisted work through concrete orchestration and human correction.

### Don't

- Don't turn every section into a rounded card grid or pill collection.
- Don't use generic AI language, invented outcomes, or unsupported client claims.
- Don't let WebGL, smooth scrolling, or marquee motion obscure content, impair performance, or break keyboard access.
- Don't sacrifice readable contrast or reduced-motion behavior for atmosphere.
