# Icon Component

A comprehensive icon library following the Vercel design system with 35+ SVG icons.

## Features

- ✅ 35+ commonly used icons
- ✅ 5 sizes: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- ✅ Multiple color variants including Vercel workflow colors
- ✅ Consistent stroke width (2px)
- ✅ Fully accessible with proper viewBox
- ✅ TypeScript support
- ✅ Follows Vercel design system

## Usage

### Basic

```tsx
import { CheckIcon, SearchIcon, AlertIcon } from '@lucent-ui/components';

function App() {
  return (
    <div>
      <CheckIcon size="md" color="success" />
      <SearchIcon size="sm" color="gray" />
      <AlertIcon size="lg" color="danger" />
    </div>
  );
}
```

### With Button

```tsx
import { PlusIcon } from '@lucent-ui/components';

<button className="inline-flex items-center gap-2">
  <PlusIcon size="sm" color="current" />
  Add Item
</button>;
```

### With Input

```tsx
import { SearchIcon } from '@lucent-ui/components';

<div className="relative">
  <SearchIcon size="sm" color="gray" className="absolute left-3 top-1/2 -translate-y-1/2" />
  <input className="pl-9 ..." />
</div>;
```

### With Badge

```tsx
import { CheckIcon } from '@lucent-ui/components';

<span className="inline-flex items-center gap-1.5">
  <CheckIcon size="xs" color="current" />
  Verified
</span>;
```

## Props

| Prop        | Type                                   | Default     | Description            |
| ----------- | -------------------------------------- | ----------- | ---------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Icon size              |
| `color`     | `IconColor`                            | `'current'` | Icon color (see below) |
| `className` | `string`                               | -           | Additional CSS classes |

### Color Options

- `current` - Inherits parent text color
- `neutral` - Neutral dark (#171717)
- `gray` - Gray 600 (#4d4d4d)
- `primary` - Primary color (#3535F3)
- `success` - Success green (#1FBE5F)
- `danger` - Danger red (#f50031)
- `warning` - Warning yellow (#f59e0b)
- `premium` - Premium purple (#7e22ce)
- `workflow-ship` - Ship workflow color (#ff5b4f) - workflow context only
- `workflow-preview` - Preview workflow color (#de1d8d) - workflow context only
- `workflow-develop` - Develop workflow color (#0a72ef) - workflow context only

## Available Icons

### Navigation & Arrows

- `ChevronLeftIcon`, `ChevronRightIcon`, `ChevronUpIcon`, `ChevronDownIcon`
- `MenuIcon`, `HomeIcon`, `ExternalLinkIcon`

### Actions

- `CheckIcon`, `CloseIcon`, `PlusIcon`, `MinusIcon`
- `EditIcon`, `TrashIcon`, `CopyIcon`
- `DownloadIcon`, `UploadIcon`
- `SearchIcon`, `FilterIcon`

### Status & Feedback

- `InfoIcon`, `WarningIcon`, `AlertIcon`
- `LightningIcon`

### UI Elements

- `UserIcon`, `SettingsIcon`, `BellIcon`, `MailIcon`
- `HeartIcon`, `StarIcon`
- `EyeIcon`, `EyeOffIcon`
- `CalendarIcon`, `ClockIcon`

### Files & Code

- `DocumentIcon`, `FolderIcon`, `CodeIcon`

## Size Guide

| Size | Pixels | Use Case                             |
| ---- | ------ | ------------------------------------ |
| xs   | 12px   | Tiny badges, inline text icons       |
| sm   | 16px   | Buttons, form inputs, compact UI     |
| md   | 20px   | Default size, general UI             |
| lg   | 24px   | Large buttons, prominent UI elements |
| xl   | 32px   | Hero sections, feature highlights    |

## Examples

### Icon Button

```tsx
<button className="p-2 rounded-md hover:bg-gray-50 transition-colors">
  <SettingsIcon size="md" color="gray" />
</button>
```

### Alert with Icon

```tsx
<div className="flex gap-3 p-4 rounded-md bg-blue-50 shadow-border">
  <InfoIcon size="md" color="workflow-develop" className="flex-shrink-0" />
  <div>
    <p className="font-medium">Information</p>
    <p className="text-sm text-gray-600">This is an informational message.</p>
  </div>
</div>
```

### Workflow Pipeline

```tsx
<div className="flex items-center gap-4">
  <div className="flex items-center gap-2">
    <CodeIcon size="md" color="workflow-develop" />
    <span className="text-workflow-develop">Develop</span>
  </div>
  <ChevronRightIcon size="sm" color="gray" />
  <div className="flex items-center gap-2">
    <EyeIcon size="md" color="workflow-preview" />
    <span className="text-workflow-preview">Preview</span>
  </div>
  <ChevronRightIcon size="sm" color="gray" />
  <div className="flex items-center gap-2">
    <LightningIcon size="md" color="workflow-ship" />
    <span className="text-workflow-ship">Ship</span>
  </div>
</div>
```

## Design Principles

### Vercel Design System

- **Stroke width**: Consistent 2px for all icons
- **Rounded caps**: `strokeLinecap="round"`
- **Minimal style**: Clean, simple paths
- **Workflow colors**: Use sparingly for context-specific actions

### Accessibility

- Proper viewBox for scaling
- Inherit currentColor by default
- Semantic use of workflow colors
- Clear, recognizable shapes

## Customization

Icons can be customized with standard SVG props:

```tsx
<CheckIcon size="lg" color="success" className="animate-bounce" strokeWidth={3} />
```

## Best Practices

### Do

- Use `color="current"` to inherit parent text color
- Use workflow colors (`workflow-ship`, `workflow-preview`, `workflow-develop`) only in their workflow context
- Match icon size to surrounding text/elements
- Use semantic colors (success=green, danger=red, warning=yellow)

### Don't

- Don't use workflow colors decoratively
- Don't mix multiple colors in the same icon set
- Don't use oversized icons (xl) for inline text
- Don't use undersized icons (xs) for touch targets

## TypeScript

Full TypeScript support with type safety:

```tsx
import { IconComponent, IconProps, IconSize, IconColor } from '@lucent-ui/components';

const CustomIcon: IconComponent = ({ size, color, className }) => {
  // Your custom icon implementation
};
```

## Browser Support

All modern browsers with SVG support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
