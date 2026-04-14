import type { Meta, StoryObj } from '@storybook/react';
import LogoSvg from './assets/logo.svg?url';

/**
 * # Welcome to Lucent UI
 *
 * A modern React component library built with TypeScript, Tailwind CSS, Inter typography, and accessibility in mind.
 *
 * ## Design System
 *
 * Lucent UI features a minimal, achromatic color palette with purposeful accents:
 *
 * ### Semantic Colors
 * - **Primary** (#3535F3) - Interactive elements, form controls, focus states
 * - **Success** (#1FBE5F) - Success states, confirmations, positive feedback
 * - **Danger** (#f50031) - Error states, destructive actions, validation errors
 * - **Warning** (#f59e0b) - Warning states, important notices
 * - **Premium** (#7e22ce) - Premium features, special highlights, pro badges
 *
 * ### Core Colors
 * - **Primary Black** (#171717) - Primary text (not pure black)
 * - **Pure White** (#ffffff) - Backgrounds, surfaces
 *
 * ### Workflow Colors (Context-Specific)
 * - **Develop** (#0a72ef) - Development workflow step
 * - **Preview** (#de1d8d) - Preview deployment step
 * - **Ship** (#ff5b4f) - Production deployment step
 *
 * ## Features
 *
 * - **Accessible** - WCAG 2.1 AA compliant
 * - **Performant** - Optimized rendering
 * - **Beautiful** - Modern minimal design
 * - **TypeScript** - Full type safety
 * - **Tested** - Comprehensive coverage
 * - **Documented** - Clear examples
 *
 * ## Getting Started
 *
 * ```tsx
 * import { Select } from '@lucent-ui/components';
 *
 * const options = [
 *   { value: 'react', label: 'React' },
 *   { value: 'vue', label: 'Vue' },
 * ];
 *
 * function App() {
 *   return <Select options={options} />;
 * }
 * ```
 */
const Welcome = () => {
  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <img
          src={LogoSvg}
          alt="Lucent UI"
          style={{
            height: '72px',
            display: 'inline-block',
            marginBottom: '1.5rem',
          }}
        />
        <h1
          style={{
            margin: '0 0 1rem 0',
            fontSize: '3rem',
            fontWeight: 600,
            color: '#171717',
            lineHeight: '1.1',
          }}
        >
          Enterprise Grade Design System
        </h1>
        <p
          style={{
            margin: '0 auto 2rem',
            fontSize: '1.25rem',
            color: '#6b7280',
            fontWeight: 400,
            maxWidth: '700px',
            lineHeight: '1.6',
          }}
        >
          A production ready design system built with TypeScript, Tailwind CSS, and accessibility
          first design. Trusted for building modern web applications.
        </p>
        <div
          style={{
            display: 'inline-flex',
            gap: '1rem',
            flexWrap: 'wrap' as const,
            justifyContent: 'center',
          }}
        >
          <a
            href="/?path=/docs/components-button--docs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: '#3535F3',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
            }}
          >
            Browse Components →
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            marginTop: '4rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px',
          }}
        >
          {[
            { value: '30+', label: 'Components' },
            { value: '80%+', label: 'Test Coverage' },
            { value: '100%', label: 'TypeScript' },
            { value: 'WCAG AA', label: 'Accessible' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: '#3535F3',
                  marginBottom: '0.5rem',
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2
            style={{ color: '#171717', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}
          >
            Semantic Color Palette
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            {[
              { color: '#3535F3', name: 'Primary', hex: '#3535F3', desc: 'Interactive elements' },
              { color: '#1FBE5F', name: 'Success', hex: '#1FBE5F', desc: 'Success states' },
              { color: '#f50031', name: 'Danger', hex: '#f50031', desc: 'Error states' },
              { color: '#f59e0b', name: 'Warning', hex: '#f59e0b', desc: 'Warning states' },
              { color: '#7e22ce', name: 'Premium', hex: '#7e22ce', desc: 'Premium features' },
            ].map(({ color, name, hex, desc }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    background: color,
                    borderRadius: '8px',
                    marginBottom: '0.75rem',
                    boxShadow:
                      'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px',
                  }}
                />
                <strong style={{ fontSize: '0.875rem', fontWeight: 500, color: '#171717' }}>
                  {name}
                </strong>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {hex}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#808080', marginTop: '0.25rem' }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {[
            {
              title: 'Accessible',
              color: '#3535F3',
              description:
                'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.',
            },
            {
              title: 'Performant',
              color: '#3535F3',
              description: 'Optimized with memoization. Handles 1000+ items smoothly.',
            },
            {
              title: 'Beautiful',
              color: '#1FBE5F',
              description:
                'Modern minimal design with shadow-as-border technique and Inter typography.',
            },
            {
              title: 'TypeScript',
              color: '#0a72ef',
              description: 'Full type safety with excellent IntelliSense support.',
            },
            {
              title: 'Tested',
              color: '#1FBE5F',
              description: 'Comprehensive test coverage with unit and integration tests.',
            },
            {
              title: 'Documented',
              color: '#3535F3',
              description: 'Clear documentation with examples and best practices.',
            },
          ].map(({ title, color, description }) => (
            <div
              key={title}
              style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                transition: 'all 0.2s',
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color, fontSize: '1.25rem', fontWeight: 500 }}>
                {title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  fontWeight: 400,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#6b7280',
            fontWeight: 400,
          }}
        >
          Built with ❤️ by{' '}
          <a
            href="https://ujwal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#3535F3',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Ujwal Yadav
          </a>
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof Welcome> = {
  title: 'Introduction/Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => <Welcome />,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
