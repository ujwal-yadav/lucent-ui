# Lucent UI Architecture

This document outlines the technical architecture, design decisions, and patterns used in Lucent UI.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Design Principles](#design-principles)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Styling System](#styling-system)
- [Testing Strategy](#testing-strategy)
- [Build & Bundle](#build--bundle)
- [Performance Optimizations](#performance-optimizations)
- [Accessibility Architecture](#accessibility-architecture)

## Overview

Lucent UI is a modern, enterprise-grade React component library designed for:

- **Production Use** - Battle-tested patterns and comprehensive testing
- **Developer Experience** - Full TypeScript support, excellent IntelliSense
- **Accessibility** - WCAG 2.1 AA compliant out of the box
- **Performance** - Optimized for large-scale applications
- **Minimal Design** - Clean, modern aesthetic following design systems best practices

## Technology Stack

### Core Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.4.2"
}
```

### Build Tools

- **Vite** - Fast build tool and dev server
- **tsup** - TypeScript library bundler (outputs CJS, ESM, and type definitions)
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Development Tools

- **Storybook** - Component development and documentation
- **Vitest** - Unit testing framework
- **Testing Library** - Component testing utilities
- **jest-axe** - Accessibility testing
- **ESLint + Prettier** - Code quality and formatting

### Runtime Dependencies

```json
{
  "@tanstack/react-virtual": "^3.13.23", // Virtual scrolling
  "clsx": "^2.1.0" // Classname utility
}
```

**Why so minimal?**

- Smaller bundle size
- Fewer breaking changes
- Less dependency maintenance
- Users can choose their own complementary libraries

## Design Principles

### 1. Composition Over Configuration

Components are composable building blocks.

### 2. Controlled & Uncontrolled

All stateful components support both modes using \`useControllableState\` hook.

### 3. Minimal API Surface

- Few required props
- Sensible defaults
- Progressive disclosure (simple by default, complex when needed)

### 4. TypeScript First

- All components fully typed
- Exported type definitions
- IntelliSense support
- Strict mode enabled

### 5. Accessibility by Default

- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## Component Architecture

### Component Structure Pattern

Every component follows this pattern:

1. forwardRef wrapper
2. Props destructuring with defaults
3. Style variant/size mappings
4. className merging with cn() utility
5. Spread remaining props

### Type Definitions Pattern

- Define variant/size types
- Extend HTML attributes
- Export for external use

### File Organization

```
Component/
├── Component.tsx          # Implementation
├── Component.types.ts     # Type definitions
├── Component.stories.tsx  # Storybook stories
├── Component.test.tsx     # Tests
├── README.md             # Documentation (optional)
└── index.ts              # Exports
```

## State Management

### Hook-Based State

Uses React hooks for internal state (useState, useEffect, etc.)

### Controllable State Pattern

\`useControllableState\` hook for controlled/uncontrolled components.

**Benefits:**

- Single implementation for both modes
- Automatic mode detection
- No mode-switching bugs

### No Global State

- No Redux, Zustand, or other global state
- Each component manages its own state
- Users integrate with their preferred state solution

## Styling System

### Shadow-as-Border Technique

Instead of CSS borders, use box-shadow for subtle borders.

**Why?**

- More flexible (inset shadows, multiple shadows)
- Better for subtle borders
- Follows modern design trends
- No border-box issues

### Tailwind Configuration

Semantic color scales defined in tailwind.config.js.

### ClassName Merging

Uses \`cn()\` utility (powered by \`clsx\`).

## Testing Strategy

### Test Pyramid

- **Unit Tests** (Props, rendering, a11y)
- **Integration Tests** (User interactions)
- **E2E** (Manual in Storybook)

### Test Coverage Requirements

Enforced thresholds:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

### Accessibility Testing

Every component tested with jest-axe for WCAG 2.1 AA compliance.

See [TESTING.md](./TESTING.md) for comprehensive guidelines.

## Build & Bundle

### Build Output

- CommonJS bundle
- ESM bundle (tree-shakeable)
- TypeScript definitions

### Bundle Strategy

- Tree-shakeable exports
- No side effects
- Small bundle size

## Performance Optimizations

### 1. Virtual Scrolling

Select component uses @tanstack/react-virtual for large lists.

### 2. Memoization

Strategic use of React.memo, useMemo, useCallback.

### 3. Code Splitting

Users can lazy-load components.

### 4. Event Handler Optimization

Stable references for event handlers in lists.

## Accessibility Architecture

### ARIA Implementation

Proper ARIA attributes on all interactive components.

### Keyboard Navigation

Standard keyboard patterns:

- **Tab** - Navigate
- **Enter/Space** - Activate
- **Escape** - Close
- **Arrows** - Navigate lists
- **Home/End** - Jump

### Focus Management

Proper focus management in modals, dropdowns, etc.

### Screen Reader Support

- Semantic HTML
- ARIA live regions
- Hidden accessibility text

## Design Tokens

### Color System

Semantic colors defined in tailwind.config.js:

- primary, success, danger, warning, premium, neutral

### Spacing Scale

Tailwind default (4px base unit).

### Typography

- Font: Geist with system fallbacks
- Weights: 400, 500, 600

## Architectural Decisions

### Why No CSS-in-JS?

Using Tailwind for now. CSS-in-JS option planned for future.

### Why Tailwind?

- Utility-first approach
- Excellent DX
- Small production bundle
- Consistent design system

### Why Vitest over Jest?

- Faster
- Better ESM support
- Compatible with Testing Library

### Why No Monorepo?

- Single library focus
- Simpler CI/CD
- Easier for contributors

---

This architecture balances **developer experience**, **performance**, **accessibility**, and **maintainability** for a production-grade component library.
