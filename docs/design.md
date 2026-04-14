# Lucent UI Design System

## 1. Visual Theme & Atmosphere

Lucent UI is a minimal, enterprise-grade React component library where every element earns its space. The system uses an achromatic foundation — predominantly white (`#ffffff`) with near-black (`#171717`) text — accented by Primary Blue (`#3535F3`) for all interactive elements. This isn't minimalism as decoration; it's minimalism as engineering principle, where accessibility, performance, and type safety are non-negotiable.

The Inter font family provides typographic precision and exceptional readability. Inter uses tight letter-spacing at display sizes, creating headlines that feel clean and professional. At body sizes, the font maintains optical clarity and geometric consistency. Inter's design is optimized for screen rendering with features like taller x-height, wide apertures, and excellent hinting. The font family enables OpenType features like contextual alternates and ligatures for refined typography.

Lucent UI's signature is the shadow-as-border technique. Instead of traditional CSS borders, components use `box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px` — a zero-offset, zero-blur, 1px-spread shadow that creates border-like lines without box model implications. This enables smoother transitions, clean rounded corners, and subtler visual weight. The depth system uses layered shadow stacks where each layer serves a specific purpose: border definition, subtle elevation, and ambient depth.

**Key Characteristics:**

- Standard 6px border radius (`rounded-sm` in Tailwind) across all components for consistency
- Inter font family with tight letter-spacing at display sizes for clean, professional typography
- Shadow-as-border technique: `box-shadow rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Multi-layer shadow stacks for nuanced depth (border + elevation + ambient)
- Primary Blue (`#3535F3`) for all interactive states, form controls, and focus rings
- Semantic color system: Success (`#1FBE5F`), Danger (`#f50031`), Warning (`#f59e0b`), Premium (`#7e22ce`)
- Font weight 500 (medium) for all UI elements, creating subtle hierarchy
- WCAG 2.1 AA compliance mandatory — all components tested with jest-axe

## 2. Color Palette & Roles

### Primary Brand Color

- **Primary Blue** (`#3535F3`): Primary brand color, used for interactive elements, form controls (checkboxes, radios, switches), focus states, primary action buttons, selected states, and count badges. This vibrant blue serves as the main accent throughout the interface.

### Semantic Colors

- **Success Green** (`#1FBE5F`): Vibrant success green used for success states, confirmations, positive alerts, and success indicators across all components.
- **Danger Red** (`#f50031`): Vibrant danger/error red used for error states, destructive actions, validation errors, danger alerts, and delete buttons.
- **Warning Yellow** (`#f59e0b`): Clear caution signal used for warning states and important notices.
- **Premium Purple** (`#7e22ce`): Premium features, special highlights, and exclusive content.

### Core Colors

- **Neutral 900** (`#171717`): Primary text, headings, dark surface backgrounds. Not pure black — the slight warmth prevents harshness.
- **Pure White** (`#ffffff`): Page background, card surfaces, button text on dark backgrounds.

### Workflow Accent Colors (Context-Specific Only)

- **Ship Red** (`#ff5b4f`): Production deployment workflow step. Use only in workflow pipeline context, not for semantic error states.
- **Preview Pink** (`#de1d8d`): Preview deployment workflow step. Use only in workflow pipeline context.
- **Develop Blue** (`#0a72ef`): Development workflow step. Use only in workflow pipeline context.

> **Important**: Workflow colors are for workflow-specific UI only. Use semantic colors (Success/Danger/Warning) for all other states.

### Interactive

- **Primary Blue** (`#3535F3`): Primary interactive color for buttons, form controls, focus rings, and selected states.
- **Success Green** (`#1FBE5F`): Success states and confirmations.
- **Danger Red** (`#f50031`): Error states and destructive actions.
- **Warning Yellow** (`#f59e0b`): Warning states and cautions.
- **Link Blue** (`#0072f5`): Link color with underline decoration.
- **Focus Ring** (`#3535F3`): Consistent focus ring on all interactive elements (replaces the original `hsla(212, 100%, 48%, 1)`).

### Neutral Scale

- **Gray 900** (`#171717`): Primary text, headings, nav text.
- **Gray 600** (`#4d4d4d`): Secondary text, description copy.
- **Gray 500** (`#666666`): Tertiary text, muted links.
- **Gray 400** (`#808080`): Placeholder text, disabled states.
- **Gray 100** (`#ebebeb`): Borders, card outlines, dividers.
- **Gray 50** (`#fafafa`): Subtle surface tint, inner shadow highlight.

### Surface & Overlay

- **Overlay Backdrop** (`hsla(0, 0%, 98%, 1)`): `--ds-overlay-backdrop-color`, modal/dialog backdrop.
- **Selection Text** (`hsla(0, 0%, 95%, 1)`): `--ds-selection-text-color`, text selection highlight.
- **Badge Blue Bg** (`#ebf5ff`): Pill badge background, tinted blue surface.
- **Badge Blue Text** (`#0068d6`): Pill badge text, darker blue for readability.

### Shadows & Depth

- **Border Shadow** (`rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`): The signature — replaces traditional borders.
- **Subtle Elevation** (`rgba(0, 0, 0, 0.04) 0px 2px 2px`): Minimal lift for cards.
- **Card Stack** (`rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px, #fafafa 0px 0px 0px 1px`): Full multi-layer card shadow.
- **Ring Border** (`rgb(235, 235, 235) 0px 0px 0px 1px`): Light gray ring-border for tabs and images.

## 3. Typography Rules

### Font Family

- **Primary**: `Inter`, with fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- **Monospace**: `'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
- **OpenType Features**: Contextual alternates (`calt`), ligatures (`liga`), and tabular figures (`tnum`) enabled where appropriate for optimal readability.

### Hierarchy

| Role              | Font           | Size           | Weight  | Line Height       | Letter Spacing | Notes                                         |
| ----------------- | -------------- | -------------- | ------- | ----------------- | -------------- | --------------------------------------------- |
| Display Hero      | Inter          | 48px (3.00rem) | 700     | 1.00–1.17 (tight) | -0.02em        | Maximum impact, tight tracking                |
| Section Heading   | Inter          | 40px (2.50rem) | 700     | 1.20 (tight)      | -0.01em        | Feature section titles                        |
| Sub-heading Large | Inter          | 32px (2.00rem) | 600     | 1.25 (tight)      | -0.01em        | Card headings, sub-sections                   |
| Sub-heading       | Inter          | 32px (2.00rem) | 400     | 1.50              | normal         | Lighter sub-headings                          |
| Card Title        | Inter          | 24px (1.50rem) | 600     | 1.33              | -0.01em        | Feature cards                                 |
| Card Title Light  | Inter          | 24px (1.50rem) | 500     | 1.33              | normal         | Secondary card headings                       |
| Body Large        | Inter          | 20px (1.25rem) | 400     | 1.80 (relaxed)    | normal         | Introductions, feature descriptions           |
| Body              | Inter          | 18px (1.13rem) | 400     | 1.56              | normal         | Standard reading text                         |
| Body Small        | Inter          | 16px (1.00rem) | 400     | 1.50              | normal         | Standard UI text                              |
| Body Medium       | Inter          | 16px (1.00rem) | 500     | 1.50              | normal         | Navigation, emphasized text                   |
| Body Semibold     | Inter          | 16px (1.00rem) | 600     | 1.50              | normal         | Strong labels, active states                  |
| Button / Link     | Inter          | 14px (0.88rem) | 500     | 1.43              | normal         | Buttons, links, captions                      |
| Button Small      | Inter          | 14px (0.88rem) | 400     | 1.00 (tight)      | normal         | Compact buttons                               |
| Caption           | Inter          | 12px (0.75rem) | 400–500 | 1.33              | normal         | Metadata, tags                                |
| Mono Body         | JetBrains Mono | 16px (1.00rem) | 400     | 1.50              | normal         | Code blocks                                   |
| Mono Caption      | JetBrains Mono | 13px (0.81rem) | 500     | 1.54              | normal         | Code labels                                   |
| Mono Small        | JetBrains Mono | 12px (0.75rem) | 500     | 1.00 (tight)      | normal         | `text-transform: uppercase`, technical labels |
| Micro Badge       | Inter          | 10px (0.63rem) | 600     | 1.00 (tight)      | 0.05em         | `text-transform: uppercase`, tiny badges      |

### Principles

- **Clarity first**: Inter is optimized for screen readability with tall x-height, wide apertures, and excellent hinting. At display sizes, subtle negative letter-spacing (-0.02em to -0.01em) creates tight, professional headlines. Body text uses normal tracking for maximum legibility.
- **Optical precision**: Inter uses optical sizing to ensure optimal rendering at all sizes. Display weights (700) for large headings, regular weights (400) for body text, and medium weights (500) for UI elements.
- **Purposeful hierarchy**: Weight system creates clear hierarchy — 400 (body/reading), 500 (UI/interactive), 600 (strong emphasis), 700 (display headings). Each weight serves a specific purpose in the information architecture.
- **Code readability**: JetBrains Mono for code and technical content with ligature support for programming symbols, ensuring excellent readability in technical contexts.

## 4. Component Stylings

### Buttons

**Primary Blue (Interactive)**

- Background: `#3535F3`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px (subtly rounded)
- Hover: `#2a2ac2` (darker blue)
- Focus: `2px solid #3535F3` ring
- Use: Primary interactive buttons, Apply buttons, form submissions

**Primary White (Shadow-bordered)**

- Background: `#ffffff`
- Text: `#171717`
- Padding: 0px 6px (minimal — content-driven width)
- Radius: 6px (subtly rounded)
- Shadow: `rgb(235, 235, 235) 0px 0px 0px 1px` (ring-border)
- Hover: background shifts to `var(--ds-gray-1000)` (dark)
- Focus: `2px solid #3535F3` outline
- Use: Standard secondary button

**Secondary Button (Outline)**

- Background: transparent
- Text: `#171717`
- Border: via shadow — `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- Padding: 8px 16px
- Radius: 6px
- Hover: slight background tint
- Focus: `2px solid #3535F3` ring
- Use: Secondary actions, alternative CTAs

**Ghost Button**

- Background: transparent
- Text: `#171717`
- Padding: 8px 16px
- Radius: 6px
- Hover: subtle background
- Focus: `2px solid #3535F3` ring
- Use: Tertiary actions, minimal emphasis

**Success Button**

- Background: `#1FBE5F`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Hover: `#16a34e` (darker green)
- Focus: `2px solid #3535F3` ring
- Use: Success actions, confirmations

**Danger Button**

- Background: `#f50031`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Hover: `#dc0028` (darker red)
- Focus: `2px solid #3535F3` ring
- Use: Destructive actions, delete buttons, critical operations

**Warning Button**

- Background: `#f59e0b`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Hover: `#d97706` (darker yellow)
- Focus: `2px solid #3535F3` ring
- Use: Warning actions, caution-required operations

**Premium Button** (Optional)

- Background: `#7e22ce`
- Text: `#ffffff`
- Padding: 8px 16px
- Radius: 6px
- Hover: `#6b21a8` (darker purple)
- Focus: `2px solid #3535F3` ring
- Use: Premium features, upgrade CTAs

**Pill Badge**

- Background: `#ebf5ff` (tinted blue) or variant-specific tinted backgrounds
- Text: `#0068d6` or variant-specific text color
- Padding: 0px 10px
- Radius: 9999px (full pill)
- Font: 12px weight 500
- Use: Status badges, tags, count indicators

### Cards & Containers

- Background: `#ffffff`
- Border: via shadow — `rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`
- Radius: 8px (standard), 12px (featured/image cards)
- Shadow stack: `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px`
- Image cards: `1px solid #ebebeb` with 12px top radius
- Hover: subtle shadow intensification

### Inputs & Forms

- Checkboxes: Gray border (`#808080`) unchecked, Primary Blue (`#3535F3`) background when checked, Danger Red (`#f50031`) for error states
- Radio: Gray border (`#808080`) unchecked, Primary Blue (`#3535F3`) filled dot when checked
- Switch: Gray background (`#808080`) when off, Primary Blue (`#3535F3`) when on
- Input fields: Shadow-border, Danger Red (`rgba(245,0,49,0.3)`) shadow for errors, Success Green (`rgba(31,190,95,0.3)`) shadow for success
- Focus ring: `2px solid #3535F3` — consistent primary blue focus ring on all form controls
- Border: via shadow technique, not traditional border
- Accent color: `#3535F3` for all native form control rendering (or `#f50031` for error states)

### Navigation

- Clean horizontal nav on white background
- Links: Inter 14px weight 500, `#171717` text
- Active: weight 600 or subtle underline
- Primary CTA: Primary Blue (`#3535F3`) button
- Mobile: responsive hamburger menu collapse
- Consistent shadow-border separation

### Image Treatment

- Images with `1px solid #ebebeb` border for definition
- Top-rounded images: `12px 12px 0px 0px` radius
- Consistent 6px radius for standard images
- Maintain shadow-border treatment on image containers

### Distinctive Components

**Alert Components**

- Info: Blue background (`#ebebfe`), shadow-border, Info icon in workflow-develop blue
- Success: Green background (`#edfdf4`), shadow-border, Check icon in success green (`#1FBE5F`)
- Warning: Amber background (`#fffbeb`), shadow-border, Warning icon in warning yellow (`#f59e0b`)
- Danger: Red background (`#fef2f4`), danger shadow (`rgba(245,0,49,0.3)`), Alert icon in danger red (`#f50031`)

**Workflow Pipeline** (Optional)

- Three-step horizontal pipeline: Develop → Preview → Ship
- Each step has its own accent color: Develop Blue → Preview Pink → Ship Red
- Connected with visual flow indicators
- Note: Workflow colors are context-specific — use Success/Danger/Warning for all other UI states

## 5. Layout Principles

### Spacing System

- Base unit: 8px
- Scale: 1px, 2px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 14px, 16px, 32px, 36px, 40px
- Notable gap: jumps from 16px to 32px — no 20px or 24px in primary scale

### Grid & Container

- Max content width: approximately 1200px
- Hero: centered single-column with generous top padding
- Feature sections: 2–3 column grids for cards
- Full-width dividers using `border-bottom: 1px solid #171717`
- Code/dashboard screenshots as full-width or contained with border

### Whitespace Philosophy

- **Generous spacing**: Substantial vertical padding between sections (80px–120px+). White space creates breathing room and visual hierarchy.
- **Compressed text, expanded space**: Aggressive negative letter-spacing on headlines is balanced by generous surrounding whitespace. Text is dense; space around it is vast.
- **Minimal color variation**: Achromatic foundation means separation comes from shadow-borders and spacing, not background colors.

### Border Radius Scale

- Micro (2px): Inline code snippets, small spans
- Subtle (4px): Small containers
- Standard (6px): Buttons, links, functional elements
- Comfortable (8px): Cards, list items
- Image (12px): Featured cards, image containers (top-rounded)
- Large (64px): Tab navigation pills
- XL (100px): Large navigation links
- Full Pill (9999px): Badges, status pills, tags
- Circle (50%): Menu toggle, avatar containers

## 6. Depth & Elevation

| Level                 | Treatment                                                                  | Use                                        |
| --------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Flat (Level 0)        | No shadow                                                                  | Page background, text blocks               |
| Ring (Level 1)        | `rgba(0,0,0,0.08) 0px 0px 0px 1px`                                         | Shadow-as-border for most elements         |
| Light Ring (Level 1b) | `rgb(235,235,235) 0px 0px 0px 1px`                                         | Lighter ring for tabs, images              |
| Subtle Card (Level 2) | Ring + `rgba(0,0,0,0.04) 0px 2px 2px`                                      | Standard cards with minimal lift           |
| Full Card (Level 3)   | Ring + Subtle + `rgba(0,0,0,0.04) 0px 8px 8px -8px` + inner `#fafafa` ring | Featured cards, highlighted panels         |
| Focus (Accessibility) | `0 0 0 2px #3535F3` shadow                                                 | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Lucent UI uses multi-value shadow stacks where each layer has a distinct architectural purpose. Rather than elevation in the traditional Material Design sense, shadows create structural definition: one layer creates the "border" (0px spread, 1px), another adds ambient softness (2px blur), another handles depth at distance (8px blur with negative spread), and an inner ring (`#fafafa`) creates subtle interior highlight. This layered approach makes components feel built, not floating.

### Decorative Depth

- Hero gradient: soft, pastel multi-color gradient wash behind hero content (barely visible, atmospheric)
- Section borders: `1px solid #171717` (full dark line) between major sections
- No background color variation — depth comes entirely from shadow layering and border contrast

## 7. Do's and Don'ts

### Do

- Use Primary Blue (`#3535F3`) for all interactive states, form controls, and focus rings
- Use Success Green (`#1FBE5F`) for success states, confirmations, and positive feedback
- Use Danger Red (`#f50031`) for error states, destructive actions, and validation errors
- Use Warning Yellow (`#f59e0b`) for warning states and important notices
- Use Premium Purple (`#7e22ce`) for premium features and special highlights
- Use standard 6px border radius (`rounded-sm`) for consistency across all components
- Use shadow-as-border (`rgba(0,0,0,0.08) 0px 0px 0px 1px`) instead of traditional CSS borders
- Use font weight 500 (medium) for all UI elements and interactive components
- Use the weight system: 400 (body/reading), 500 (UI/interactive), 600 (strong emphasis), 700 (display headings)
- Enable OpenType features (ligatures, contextual alternates) for refined typography
- Test all components with jest-axe for WCAG 2.1 AA compliance
- Use forwardRef for all components that render DOM elements
- Support both controlled and uncontrolled patterns with useControllableState
- Use `#171717` instead of `#000000` for primary text — micro-warmth prevents harshness
- Set `accentColor: #3535F3` on form controls (`#f50031` for error states)
- Apply workflow colors only in workflow-specific context, never for semantic states

### Don't

- Don't use workflow colors (Ship Red, Preview Pink, Develop Blue) for semantic states — use Success/Danger/Warning instead
- Don't use traditional CSS `border` on components — always use shadow-border technique
- Don't use any border radius other than 6px (`rounded-sm`) except for pills (9999px) and circles (50%)
- Don't skip accessibility tests — jest-axe is mandatory for all components
- Don't use `any` types in TypeScript — always define proper interfaces
- Don't use weight 700 (bold) for UI elements — use 700 only for display headings
- Don't use excessive letter-spacing — Inter is designed with optimal spacing built-in
- Don't use font weight other than 500 for UI elements — consistency is critical
- Don't use heavy shadows (> 0.1 opacity) — the shadow system is subtle
- Don't use pill radius (9999px) on primary buttons — pills are for badges only
- Don't skip the inner `#fafafa` ring in card shadows — it creates the subtle glow
- Don't create components without forwardRef — ref forwarding is essential
- Don't skip testing — 80% coverage minimum is enforced

## 8. Responsive Behavior

### Breakpoints

| Name          | Width       | Key Changes                          |
| ------------- | ----------- | ------------------------------------ |
| Mobile Small  | <400px      | Tight single column, minimal padding |
| Mobile        | 400–600px   | Standard mobile, stacked layout      |
| Tablet Small  | 600–768px   | 2-column grids begin                 |
| Tablet        | 768–1024px  | Full card grids, expanded padding    |
| Desktop Small | 1024–1200px | Standard desktop layout              |
| Desktop       | 1200–1400px | Full layout, maximum content width   |
| Large Desktop | >1400px     | Centered, generous margins           |

### Touch Targets

- Buttons use comfortable padding (8px–16px vertical)
- Navigation links at 14px with adequate spacing
- Pill badges have 10px horizontal padding for tap targets
- Mobile menu toggle uses 50% radius circular button

### Collapsing Strategy

- Hero: display 48px → scales down, maintains negative tracking proportionally
- Navigation: horizontal links + CTAs → hamburger menu
- Feature cards: 3-column → 2-column → single column stacked
- Code screenshots: maintain aspect ratio, may horizontally scroll
- Trust bar logos: grid → horizontal scroll
- Footer: multi-column → stacked single column
- Section spacing: 80px+ → 48px on mobile

### Image Behavior

- Dashboard screenshots maintain border treatment at all sizes
- Hero gradient softens/simplifies on mobile
- Product screenshots use responsive images with consistent border radius
- Full-width sections maintain edge-to-edge treatment

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary Interactive: Primary Blue (`#3535F3`)
- Success: Success Green (`#1FBE5F`)
- Danger/Error: Danger Red (`#f50031`)
- Warning: Warning Yellow (`#f59e0b`)
- Premium: Premium Purple (`#7e22ce`)
- Background: Pure White (`#ffffff`)
- Heading text: Neutral 900 (`#171717`)
- Body text: Gray 600 (`#4d4d4d`)
- Border (shadow): `rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`
- Focus ring: Primary Blue (`#3535F3`)
- Border radius: 6px (`rounded-sm` in Tailwind) for consistency
- Interactive/Selected states: Primary Blue (`#3535F3`)

### Example Component Prompts

- "Create a Button component: Primary variant with #3535F3 background, white text, 6px radius, 8px 16px padding, Inter font weight 500. Hover darkens to #2a2ac2. Focus ring: 2px solid #3535F3. Support icon left/right and loading state."
- "Design a Card: white background, no CSS border. Shadow stack: rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px. 6px radius. Title at 24px Inter weight 600. Body at 16px weight 400, #4d4d4d."
- "Build a Badge: Primary variant with #3535F3 background, white text, 9999px radius (pill), padding 0px 10px, 12px Inter weight 500. Support dot indicator and icon props."
- "Create an Input: white background, shadow-border rgba(0,0,0,0.08) 0px 0px 0px 1px, 6px radius. Inter 14px weight 400. Focus: Primary Blue ring. Error state: Danger Red shadow rgba(245,0,49,0.3). Success state: Success Green shadow."
- "Design a Checkbox: gray border (#808080) unchecked, Primary Blue (#3535F3) background with white checkmark when checked. Error state: Danger Red (#f50031) border. Focus ring: 2px #3535F3. Inter weight 500 for label."
- "Create an Alert: Info variant uses blue-50 background with shadow-border. Success uses emerald-50 with Success Green (#1FBE5F) icon. Danger uses red-50 with Danger Red (#f50031) icon. Warning uses amber-50 with Warning Yellow icon. Support closeable and auto-dismiss."
- "Design a Select component: shadow-border input, 6px radius. Dropdown with white background, shadow elevation. Virtual scrolling for 1000+ items. Primary Blue (#3535F3) for selected state. Keyboard navigation support."

### Iteration Guide

1. Primary Blue (`#3535F3`) is the interactive accent — use it for all form controls, focus states, selected states, and primary buttons
2. Success Green (`#1FBE5F`) for success states — confirmations, positive feedback, success alerts
3. Danger Red (`#f50031`) for error states — validation errors, destructive actions, danger alerts
4. Warning Yellow (`#f59e0b`) for warning states — cautions, important notices
5. Premium Purple (`#7e22ce`) for premium features — exclusive content, special highlights
6. Standard 6px border radius (`rounded-sm`) on all components except badges (9999px) and avatars (50%)
7. Font weight 500 (medium) for all UI elements — buttons, navigation, interactive components
8. Always use shadow-as-border instead of CSS border — `rgba(0,0,0,0.08) 0px 0px 0px 1px`
9. Inter font family for all UI and content — JetBrains Mono for code and technical labels
10. Letter-spacing: subtle negative tracking (-0.02em to -0.01em) at display sizes, normal for body text
11. Weight hierarchy: 400 (body/reading), 500 (UI/interactive), 600 (strong emphasis), 700 (display headings)
12. Color is functional, never decorative — workflow colors mark pipeline stages only, not semantic states
13. The inner `#fafafa` ring in card shadows creates the subtle interior glow
14. All components must use forwardRef and pass accessibility tests with jest-axe
15. Set `accentColor: #3535F3` on native form controls; use `#f50031` for error states
