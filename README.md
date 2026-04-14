# Lucent UI Components

A modern React component library built with TypeScript, Tailwind CSS, and Inter font family.

## 🎨 Theme

The design system features a minimal, achromatic color palette with **#3535F3** (vibrant blue) as the primary interactive accent.

### Color Palette

#### Semantic Colors

- **Primary**: Vibrant Blue (`#3535F3`) - Interactive elements, form controls, focus states, primary actions
- **Success**: Vibrant Green (`#1FBE5F`) - Success states, confirmations, positive feedback
- **Danger**: Vibrant Red (`#f50031`) - Error states, destructive actions, validation errors
- **Warning**: Caution Yellow (`#f59e0b`) - Warning states, important notices

#### Core Colors

- **Primary Black**: `#171717` - Primary text, headings (not pure black for warmth)
- **Pure White**: `#ffffff` - Backgrounds, surfaces
- **Neutral Grays**: `#fafafa` to `#171717` - Text hierarchy and surfaces

#### Workflow Colors (Context-Specific Only)

- **Develop**: `#0a72ef` - Development workflow step
- **Preview**: `#de1d8d` - Preview deployment step
- **Ship**: `#ff5b4f` - Production deployment step

> **Note**: Workflow colors are for workflow pipeline context only. Use semantic colors (Success/Danger) for UI states.

📖 **[View Full Design System Documentation](./docs/design.md)**

### Typography

Lucent UI uses **Inter** - A versatile typeface optimized for user interfaces.

- **Font Family**: Inter (primary), system fonts (fallback)
- **Weights**: Flexible weight system
  - 400 (Regular) - Body text, reading content
  - 500 (Medium) - UI elements, interactive components
  - 600 (Semibold) - Headings, titles, emphasis
  - 700 (Bold) - Strong emphasis, headers
- **Features**:
  - Optimized for screen readability
  - Extensive language support
  - Clean, modern aesthetic
  - Excellent legibility at small sizes

📖 **[View Typography System Documentation](./docs/design.md#typography-rules)**

## 📦 Components

### Button

A versatile button component with modern minimal design using shadow-as-border technique.

**Variants**:

- `primary` - Vibrant Blue (#3535F3) - Primary interactive actions
- `secondary` - White with shadow-border - Secondary actions
- `outline` - Stronger border variant
- `ghost` - Minimal transparent style
- `success` - Vibrant Green (#1FBE5F) - Success confirmations
- `danger` - Vibrant Red (#f50031) - Destructive actions
- `warning` - Caution Yellow (#f59e0b) - Warning actions

**Sizes**: `sm` | `md` | `lg`

**Features**:

- Shadow-as-border technique (no CSS borders)
- 8px radius (standard)
- Font weight 500 (medium) for UI elements
- Primary Blue (#3535F3) focus ring (2px)
- Icon support (left and right)
- Full width option
- Loading states with spinner

### Form Components

All form controls follow modern minimal design with consistent styling.

**Available Components**: `Input`, `Checkbox`, `Radio`, `Switch`, `Select`

**Key Features**:

- Primary Blue (#3535F3) for checked/selected states
- Danger Red (#f50031) for error states
- Success Green (#1FBE5F) for success validation
- Shadow-border technique (8px radius)
- Consistent focus ring (2px Primary Blue)
- Native `accentColor` support for form controls

### Alert

Notification component with semantic color variants.

**Variants**: `info` | `success` | `warning` | `danger`

**Features**:

- Automatic variant icons
- Shadow-border styling
- Tinted backgrounds
- Closeable with animation
- Auto-dismiss support

### Other Components

- **Card**: Shadow-border cards with multi-layer depth system
- **Badge**: Pill badges with tinted backgrounds
- **Modal**: Shadow-card modals with backdrop
- **FilterPill**: Advanced filter with virtualization
- **Accordion**: Collapsible sections
- **Icon Library**: 35+ SVG icons with consistent 2px stroke

## ♿ Accessibility

Lucent UI is built with accessibility as a core principle. **All components are WCAG 2.1 Level AA compliant.**

### Features

- ✅ Full keyboard navigation support
- ✅ Screen reader compatible with proper ARIA attributes
- ✅ Focus-visible indicators for keyboard users
- ✅ Color contrast meets WCAG AA standards (4.5:1 for text)
- ✅ Semantic HTML and proper landmark regions
- ✅ Loading states announced to assistive technologies
- ✅ Disabled states properly communicated

### Testing

All components tested with:

- NVDA, JAWS, and VoiceOver screen readers
- Keyboard-only navigation
- axe DevTools accessibility auditing
- WAVE accessibility evaluation

📖 **[View Full Accessibility Guide](./ACCESSIBILITY.md)**

📖 **[View Accessibility Demos in Storybook](http://localhost:6006/?path=/story/design-system-accessibility--overview)**

## 🚀 Development

```bash
# Start Storybook
npm run dev

# Build the library
npm run build

# Build Storybook
npm run build-storybook
```

## 📚 Documentation

### For Developers

- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - How to contribute to this project
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture and design decisions
- **[TESTING.md](./docs/TESTING.md)** - Testing guidelines and best practices
- **[CLAUDE.md](./docs/CLAUDE.md)** - Context for AI assistants working on this project

### Component Documentation

View the full component documentation in Storybook:

```bash
npm run dev
```

Then visit [http://localhost:6006](http://localhost:6006)

### Quick Links

- 🎨 [Design System](http://localhost:6006/?path=/docs/introduction-welcome--docs)
- 🧩 [All Components](http://localhost:6006/?path=/docs/components-button--docs)
- ♿ [Accessibility Guide](./docs/TESTING.md#accessibility-testing)
