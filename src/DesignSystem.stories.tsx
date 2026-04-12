import type { Meta, StoryObj } from '@storybook/react';

/**
 * # Design System Overview
 *
 * Complete visual reference for the Lucent UI design system.
 */
const DesignSystemOverview = () => {
  return (
    <div
      style={{
        fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#171717' }}>
        Design System
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '3rem' }}>
        Visual reference for Lucent UI minimal design system.
      </p>

      {/* Colors */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#111827' }}>
          Color Palette
        </h2>

        <p
          style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: '#fffbeb',
            borderRadius: '0.5rem',
            border: '1px solid #fde68a',
          }}
        >
          <strong>Note:</strong> Workflow colors (Develop, Preview, Ship) are for workflow context
          only. Use semantic colors (Success, Danger) for UI states.
        </p>

        {[
          {
            name: 'Primary',
            color: 'primary',
            hex: '#3535F3',
            description: 'Interactive elements, form controls, focus states',
          },
          {
            name: 'Success',
            color: 'success',
            hex: '#1FBE5F',
            description: 'Success states, confirmations, positive feedback',
          },
          {
            name: 'Danger',
            color: 'danger',
            hex: '#f50031',
            description: 'Error states, destructive actions, validation errors',
          },
          {
            name: 'Warning',
            color: 'warning',
            hex: '#f59e0b',
            description: 'Warning states, important notices',
          },
          {
            name: 'Develop',
            color: 'develop',
            hex: '#0a72ef',
            description: 'Development workflow step',
          },
          {
            name: 'Preview',
            color: 'preview',
            hex: '#de1d8d',
            description: 'Preview deployment step',
          },
          {
            name: 'Ship',
            color: 'ship',
            hex: '#ff5b4f',
            description: 'Production deployment step',
          },
        ].map(({ name, color, hex, description }) => (
          <div key={name} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>{name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {description} • {hex}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => {
                const colors: Record<string, Record<number, string>> = {
                  primary: {
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
                    950: '#05051a',
                  },
                  success: {
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
                    950: '#0a2e19',
                  },
                  danger: {
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
                    950: '#450008',
                  },
                  warning: {
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
                    950: '#451a03',
                  },
                  develop: {
                    50: '#eff8ff',
                    100: '#dbeefe',
                    200: '#bee3fd',
                    300: '#91d3fc',
                    400: '#5db9f8',
                    500: '#0a72ef',
                    600: '#0865d8',
                    700: '#0651af',
                    800: '#094590',
                    900: '#0e3a77',
                    950: '#09244f',
                  },
                  preview: {
                    50: '#fdf4fb',
                    100: '#fbe8f8',
                    200: '#f9d0f2',
                    300: '#f5a9e6',
                    400: '#ee75d3',
                    500: '#de1d8d',
                    600: '#c7187c',
                    700: '#a51466',
                    800: '#881454',
                    900: '#711747',
                    950: '#470728',
                  },
                  ship: {
                    50: '#fff4f2',
                    100: '#ffe6e2',
                    200: '#ffd1ca',
                    300: '#ffafa4',
                    400: '#ff7f6e',
                    500: '#ff5b4f',
                    600: '#ed3621',
                    700: '#c82a18',
                    800: '#a52618',
                    900: '#89271c',
                    950: '#4b1009',
                  },
                };

                const bgColor = colors[color]?.[shade];
                const textColor = shade >= 500 ? '#ffffff' : '#000000';

                return (
                  <div
                    key={shade}
                    style={{
                      background: bgColor,
                      color: textColor,
                      padding: '1rem',
                      borderRadius: '0.375rem',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {shade}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Core Colors */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>
            Core Colors
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Primary Black (#171717) for text, Pure White (#ffffff) for surfaces, Neutral Grays for
            hierarchy
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {[
              { shade: 50, hex: '#fafafa' },
              { shade: 100, hex: '#ebebeb' },
              { shade: 200, hex: '#d4d4d4' },
              { shade: 300, hex: '#a3a3a3' },
              { shade: 400, hex: '#808080' },
              { shade: 500, hex: '#666666' },
              { shade: 600, hex: '#4d4d4d' },
              { shade: 700, hex: '#333333' },
              { shade: 800, hex: '#262626' },
              { shade: 900, hex: '#171717' },
              { shade: 950, hex: '#0a0a0a' },
            ].map(({ shade, hex }) => {
              const textColor = shade >= 500 ? '#ffffff' : '#000000';
              return (
                <div
                  key={shade}
                  style={{
                    background: hex,
                    color: textColor,
                    padding: '1rem',
                    borderRadius: '0.375rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {shade}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#171717' }}>
          Typography
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Using <strong>Geist</strong> - A modern typeface designed for developer interfaces.
          Features aggressive negative letter-spacing at display sizes (-2.4px to -2.88px at 48px)
          and three-weight system (400/500/600).
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>
            Font Sizes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'text-xs', size: '0.75rem', px: '12px' },
              { name: 'text-sm', size: '0.875rem', px: '14px' },
              { name: 'text-base', size: '1rem', px: '16px' },
              { name: 'text-lg', size: '1.125rem', px: '18px' },
              { name: 'text-xl', size: '1.25rem', px: '20px' },
              { name: 'text-2xl', size: '1.5rem', px: '24px' },
              { name: 'text-3xl', size: '1.875rem', px: '30px' },
              { name: 'text-4xl', size: '2.25rem', px: '36px' },
            ].map(({ name, size, px }) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                }}
              >
                <code
                  style={{
                    fontSize: '0.875rem',
                    color: '#3535f3',
                    fontFamily: 'monospace',
                    minWidth: '100px',
                  }}
                >
                  {name}
                </code>
                <span style={{ color: '#6b7280', fontSize: '0.875rem', minWidth: '80px' }}>
                  {size} ({px})
                </span>
                <span style={{ fontSize: size }}>The quick brown fox jumps over the lazy dog</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>
            Font Weights (Geist Three-Weight System)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'font-normal (400)', weight: 400, usage: 'Body text, reading content' },
              {
                name: 'font-medium (500)',
                weight: 500,
                usage: 'UI elements, interactive components',
              },
              { name: 'font-semibold (600)', weight: 600, usage: 'Headings, titles, emphasis' },
            ].map(({ name, weight, usage }) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <code
                    style={{
                      fontSize: '0.875rem',
                      color: '#3535f3',
                      fontFamily: 'monospace',
                      minWidth: '150px',
                    }}
                  >
                    {name}
                  </code>
                  <span style={{ fontWeight: weight, fontSize: '1.125rem' }}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.5rem' }}>
                  {usage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#111827' }}>
          Spacing Scale
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Consistent spacing using Tailwind's default scale.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { name: '0', value: '0px', rem: '0rem' },
            { name: '1', value: '4px', rem: '0.25rem' },
            { name: '2', value: '8px', rem: '0.5rem' },
            { name: '3', value: '12px', rem: '0.75rem' },
            { name: '4', value: '16px', rem: '1rem' },
            { name: '6', value: '24px', rem: '1.5rem' },
            { name: '8', value: '32px', rem: '2rem' },
            { name: '12', value: '48px', rem: '3rem' },
            { name: '16', value: '64px', rem: '4rem' },
          ].map(({ name, value, rem }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '0.5rem',
              }}
            >
              <code
                style={{
                  fontSize: '0.875rem',
                  color: '#3535f3',
                  fontFamily: 'monospace',
                  minWidth: '60px',
                }}
              >
                {name}
              </code>
              <span style={{ color: '#6b7280', fontSize: '0.875rem', minWidth: '100px' }}>
                {value} ({rem})
              </span>
              <div
                style={{
                  width: value,
                  height: '24px',
                  background: '#3535f3',
                  borderRadius: '0.25rem',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#111827' }}>
          Border Radius
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            { name: 'rounded-sm', value: '0.25rem' },
            { name: 'rounded-md', value: '0.375rem' },
            { name: 'rounded-lg', value: '0.5rem' },
            { name: 'rounded-xl', value: '0.75rem' },
            { name: 'rounded-2xl', value: '1rem' },
          ].map(({ name, value }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '100px',
                  background: '#3535f3',
                  borderRadius: value,
                  marginBottom: '0.75rem',
                }}
              />
              <code style={{ fontSize: '0.75rem', color: '#3535f3' }}>{name}</code>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#171717' }}>
          Shadow System
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Using <strong>shadow-as-border</strong> technique instead of CSS borders. Shadows create
          subtle depth with multi-layer stacks.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>
            Shadow-as-Border Technique
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                name: 'shadow-border',
                shadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                desc: 'Border shadow (Level 1)',
              },
              {
                name: 'shadow-border-light',
                shadow: 'rgb(235, 235, 235) 0px 0px 0px 1px',
                desc: 'Light border (Level 1b)',
              },
              {
                name: 'shadow-card',
                shadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px',
                desc: 'Standard card (Level 2)',
              },
            ].map(({ name, shadow, desc }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    background: 'white',
                    boxShadow: shadow,
                    borderRadius: '0.375rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  }}
                >
                  Card
                </div>
                <code style={{ fontSize: '0.75rem', color: '#3535f3' }}>{name}</code>
                <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#374151' }}>
            Semantic Shadows
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { name: 'Error', shadow: 'rgba(245, 0, 49, 0.3) 0px 0px 0px 1px', color: '#f50031' },
              {
                name: 'Success',
                shadow: 'rgba(31, 190, 95, 0.3) 0px 0px 0px 1px',
                color: '#1FBE5F',
              },
              { name: 'Focus', shadow: '0 0 0 2px #3535F3', color: '#3535F3' },
            ].map(({ name, shadow, color }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    background: 'white',
                    boxShadow: shadow,
                    borderRadius: '0.375rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {name}
                </div>
                <code style={{ fontSize: '0.75rem', color: color }}>{name.toLowerCase()}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section>
        <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', color: '#171717' }}>
          Design Principles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              title: 'Shadow-as-border',
              desc: 'Use box-shadow: 0px 0px 0px 1px instead of CSS borders for subtle depth',
            },
            {
              title: 'Minimal color usage',
              desc: 'Primary Blue (#3535F3) for interactions, semantic colors for states only',
            },
            {
              title: 'Workflow colors',
              desc: 'Reserved for workflow context (Develop/Preview/Ship), not UI states',
            },
            {
              title: 'Achromatic base',
              desc: 'Primary Black (#171717) for text, not pure black (#000000)',
            },
            { title: '6px border radius', desc: 'Standard radius for buttons and inputs' },
            {
              title: 'Font weight 500',
              desc: 'Medium weight for all UI elements and interactive components',
            },
            {
              title: 'Primary Blue focus',
              desc: 'Consistent 2px solid #3535F3 focus ring on all interactive elements',
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              style={{
                padding: '1rem',
                background: '#fafafa',
                borderRadius: '0.5rem',
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              }}
            >
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#171717',
                  marginBottom: '0.25rem',
                }}
              >
                {title}
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof DesignSystemOverview> = {
  title: 'Design System/Overview',
  component: DesignSystemOverview,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DesignSystemOverview>;

export const Default: Story = {};
