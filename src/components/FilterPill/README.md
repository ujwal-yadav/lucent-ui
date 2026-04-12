# FilterPill Component

A compact pill-shaped filter component with dropdown options, search functionality, and checkbox selections.

## Features

- ✅ Compact pill-shaped button design
- ✅ Dropdown with checkboxes
- ✅ Optional search functionality
- ✅ **Virtualized list rendering** - handles 1000+ items efficiently
- ✅ Clear and Apply actions
- ✅ Click outside to close
- ✅ Keyboard navigation (ESC to close)
- ✅ Shows selected count badge
- ✅ Smooth animations

## Usage

### Basic

```tsx
import { FilterPill } from '@lucent-ui/components';

function App() {
  return (
    <FilterPill
      label="Segment"
      options={[
        { value: 'mens-casual', label: 'MENS CASUAL' },
        { value: 'womens-wear', label: 'WOMENS WEAR' },
      ]}
      searchable
    />
  );
}
```

### With Handlers

```tsx
<FilterPill
  label="Category"
  searchable
  searchPlaceholder="Search categories..."
  options={[
    { value: 'electronics', label: 'Electronics', checked: true },
    { value: 'clothing', label: 'Clothing' },
  ]}
  onApply={(selectedValues) => {
    console.log('Applied:', selectedValues);
  }}
  onClear={() => {
    console.log('Cleared');
  }}
/>
```

### With Icon

```tsx
<FilterPill label="Filter" icon={<FilterIcon />} searchable options={options} />
```

### Multiple Filters

```tsx
<div className="flex gap-3">
  <FilterPill label="Category" options={categoryOptions} searchable />
  <FilterPill label="Price Range" options={priceOptions} />
  <FilterPill label="Brand" options={brandOptions} searchable />
</div>
```

## Props

| Prop                | Type                                 | Default    | Description                           |
| ------------------- | ------------------------------------ | ---------- | ------------------------------------- |
| `label`             | `string`                             | -          | Label displayed on the pill button    |
| `options`           | `FilterOption[]`                     | -          | Array of filter options               |
| `onApply`           | `(selectedValues: string[]) => void` | -          | Callback when Apply is clicked        |
| `onClear`           | `() => void`                         | -          | Callback when Clear is clicked        |
| `searchable`        | `boolean`                            | `false`    | Whether to show search input          |
| `searchPlaceholder` | `string`                             | `'Search'` | Placeholder text for search input     |
| `icon`              | `ReactNode`                          | -          | Optional icon to display before label |
| `isOpen`            | `boolean`                            | -          | Controlled open state                 |
| `onOpenChange`      | `(isOpen: boolean) => void`          | -          | Callback when open state changes      |
| `className`         | `string`                             | -          | Additional CSS classes                |

## FilterOption Type

```ts
interface FilterOption {
  value: string; // Unique value
  label: string; // Display label
  checked?: boolean; // Whether option is checked
}
```

## Performance

The FilterPill component uses **virtualization** powered by `@tanstack/react-virtual` to efficiently render large lists:

- Only renders visible items in the DOM
- Handles 1000+ options without performance degradation
- Smooth scrolling with minimal memory footprint
- Automatic height calculation and positioning

```tsx
// Works efficiently even with 1000+ items
<FilterPill
  label="Cities"
  searchable
  options={Array.from({ length: 1000 }, (_, i) => ({
    value: `city-${i}`,
    label: `City ${i + 1}`,
  }))}
/>
```

## Styling

The component uses Tailwind CSS classes and can be customized via the `className` prop.

### Visual States

- **Default**: White background with gray border
- **Hover**: Lighter background with darker border
- **Active/Open**: Primary color border with tinted background
- **With Selection**: Shows count badge in primary color

## Accessibility

- ✅ Keyboard navigation (ESC to close)
- ✅ Click outside to close
- ✅ Proper focus management
- ✅ Semantic HTML with labels
- ✅ ARIA-compliant checkboxes
