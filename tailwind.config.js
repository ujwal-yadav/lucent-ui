/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        'hero': '-2.4px',      // 48px display
        'hero-xl': '-2.88px',  // Larger displays
        'heading': '-1.28px',  // 32px headings
        'subhead': '-0.96px',  // 24px subheadings
        'label': '-0.32px',    // 16px semibold labels
      },
      colors: {
        // Black & White System
        base: {
          black: '#171717',      // Primary text, not pure black
          white: '#ffffff',      // Pure white background
          'true-black': '#000000', // Console/code contexts only
        },
        // Workflow Accent Colors (use sparingly!)
        workflow: {
          ship: '#ff5b4f',       // Ship to production - coral red
          preview: '#de1d8d',    // Preview deployment - magenta pink
          develop: '#0a72ef',    // Development - bright blue
        },
        // Interactive Blues
        link: {
          DEFAULT: '#0072f5',    // Primary link color
          hover: '#0060d1',
        },
        focus: {
          DEFAULT: 'hsla(212, 100%, 48%, 1)', // Focus ring
          ring: 'rgba(147, 197, 253, 0.5)',   // Tailwind ring
        },
        // Neutral Gray Scale
        gray: {
          50: '#fafafa',   // Subtle surface tint
          100: '#ebebeb', // Borders, dividers
          400: '#808080', // Placeholder, disabled
          500: '#666666', // Tertiary text
          600: '#4d4d4d', // Secondary text, descriptions
          900: '#171717', // Primary text, headings
        },
        // Badge Colors
        badge: {
          blue: {
            bg: '#ebf5ff',
            text: '#0068d6',
          },
        },
        // Primary Brand Color - Vibrant Blue
        primary: {
          DEFAULT: '#3535F3',    // Vibrant brand blue
          50: '#ebebfe',
          100: '#d6d6fd',
          200: '#adadfb',
          300: '#8585f9',
          400: '#5c5cf6',
          500: '#3535F3',
          600: '#2a2ac2',
          700: '#1f1f91',
          800: '#151561',
          900: '#0a0a30',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Semantic Colors - Brand Specific
        success: {
          DEFAULT: '#1FBE5F',    // Vibrant success green
          50: '#edfdf4',
          100: '#d1fae3',
          200: '#a7f3c9',
          300: '#6ee7a7',
          400: '#34d17f',
          500: '#1FBE5F',
          600: '#16a34e',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        danger: {
          DEFAULT: '#f50031',    // Vibrant error red
          50: '#fef2f4',
          100: '#fee2e7',
          200: '#fecad5',
          300: '#fca5b8',
          400: '#f87191',
          500: '#f50031',
          600: '#dc0028',
          700: '#b9001f',
          800: '#99001c',
          900: '#7f0018',
        },
        warning: {
          DEFAULT: '#f59e0b',    // Clear caution signal
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        info: {
          DEFAULT: '#3535F3',    // Informational blue (same as primary)
          50: '#ebebfe',
          100: '#d6d6fd',
          200: '#adadfb',
          300: '#8585f9',
          400: '#5c5cf6',
          500: '#3535F3',
          600: '#2a2ac2',
          700: '#1f1f91',
          800: '#151561',
          900: '#0a0a30',
        },
        // Keep compatibility for secondary and accent
        secondary: {
          DEFAULT: '#8b5cf6',
          500: '#8b5cf6',
        },
        accent: {
          DEFAULT: '#06b6d4',
          500: '#06b6d4',
        },
        // Premium Color Scale
        premium: {
          DEFAULT: '#7e22ce',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764',
        },
      },
      borderRadius: {
        'micro': '2px',   // Inline code
        'subtle': '4px',  // Small containers
        'sm': '6px',      // Buttons, functional elements (Vercel standard)
        'md': '8px',      // Cards, list items
        'lg': '12px',     // Image cards (top-rounded)
        'xl': '64px',     // Tab navigation pills
        '2xl': '100px',   // Large nav links
        'pill': '9999px', // Badges, status pills (NOT primary buttons!)
      },
      boxShadow: {
        // Shadow-as-Border System
        'border': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        'border-light': 'rgb(235, 235, 235) 0px 0px 0px 1px',
        'card': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px',
        'card-hover': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px, rgba(0, 0, 0, 0.04) 0px 4px 4px',
        // Full multi-layer card shadow stack
        'card-full': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px, rgba(0, 0, 0, 0.04) 0px 8px 8px -8px, #fafafa 0px 0px 0px 1px inset',
        // Focus
        'focus': '0 0 0 2px hsla(212, 100%, 48%, 1)',
        'none': 'none',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
