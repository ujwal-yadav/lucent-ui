# Select Component

A production-ready, fully accessible select/dropdown component with advanced features.

## Features

- ✅ **WCAG 2.1 AA Compliant** - Full accessibility support
- ✅ **Single & Multi-Select** - Flexible selection modes
- ✅ **Searchable** - Built-in filtering with type-ahead
- ✅ **Keyboard Navigation** - Complete keyboard support
- ✅ **Screen Reader Friendly** - Proper ARIA attributes
- ✅ **Async Loading** - Loading states for remote data
- ✅ **Grouped Options** - Organize options into categories
- ✅ **Custom Rendering** - Full control over appearance
- ✅ **High Performance** - Optimized with memoization
- ✅ **TypeScript** - Full type safety
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Theme Integration** - Uses Lucent UI design tokens

## Installation

```bash
npm install @lucent-ui/components
```

## Basic Usage

```tsx
import { Select } from '@lucent-ui/components';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

function App() {
  const [value, setValue] = useState('react');

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a framework..."
    />
  );
}
```

## API Reference

### Props

| Prop               | Type                                 | Default                 | Description                  |
| ------------------ | ------------------------------------ | ----------------------- | ---------------------------- |
| `value`            | `T \| T[]`                           | -                       | Controlled value             |
| `defaultValue`     | `T \| T[]`                           | -                       | Default value (uncontrolled) |
| `onChange`         | `(value: T \| T[] \| null) => void`  | -                       | Change handler               |
| `options`          | `SelectOption<T>[]`                  | **required**            | Array of options             |
| `placeholder`      | `string`                             | `"Select an option..."` | Placeholder text             |
| `disabled`         | `boolean`                            | `false`                 | Disable the select           |
| `error`            | `boolean`                            | `false`                 | Error state                  |
| `multiple`         | `boolean`                            | `false`                 | Enable multi-select          |
| `searchable`       | `boolean`                            | `false`                 | Enable search                |
| `clearable`        | `boolean`                            | `false`                 | Show clear button            |
| `loading`          | `boolean`                            | `false`                 | Loading state                |
| `size`             | `'sm' \| 'md' \| 'lg'`               | `'md'`                  | Size variant                 |
| `variant`          | `'default' \| 'outline' \| 'filled'` | `'default'`             | Visual variant               |
| `maxHeight`        | `number`                             | `300`                   | Max dropdown height (px)     |
| `renderValue`      | `(value, options) => ReactNode`      | -                       | Custom value renderer        |
| `renderOption`     | `(option, selected) => ReactNode`    | -                       | Custom option renderer       |
| `emptyMessage`     | `string`                             | `"No options found"`    | Empty state message          |
| `loadingMessage`   | `string`                             | `"Loading..."`          | Loading message              |
| `position`         | `'bottom' \| 'top' \| 'auto'`        | `'auto'`                | Dropdown position            |
| `className`        | `string`                             | -                       | Additional CSS class         |
| `name`             | `string`                             | -                       | Form field name              |
| `required`         | `boolean`                            | `false`                 | Required field               |
| `id`               | `string`                             | -                       | Element ID                   |
| `aria-label`       | `string`                             | -                       | ARIA label                   |
| `aria-labelledby`  | `string`                             | -                       | ARIA labelledby              |
| `aria-describedby` | `string`                             | -                       | ARIA describedby             |

### SelectOption

```tsx
interface SelectOption<T = string> {
  value: T; // Unique value
  label: string; // Display label
  disabled?: boolean; // Disable this option
  description?: string; // Optional description
  icon?: ReactNode; // Optional icon
  group?: string; // Optional group name
}
```

## Examples

### Multi-Select

```tsx
<Select
  options={options}
  multiple
  value={['react', 'vue']}
  onChange={(values) => console.log(values)}
  placeholder="Select frameworks..."
/>
```

### Searchable

```tsx
<Select options={countries} searchable placeholder="Search countries..." />
```

### With Descriptions

```tsx
const options = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  // ...
];

<Select options={options} />;
```

### Grouped Options

```tsx
const options = [
  { value: 'react', label: 'React', group: 'Libraries' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
  // ...
];

<Select options={options} />;
```

### With Icons

```tsx
const options = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  // ...
];

<Select options={options} />;
```

### Async Loading

```tsx
function AsyncSelect() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async () => {
    setLoading(true);
    const data = await fetchOptions();
    setOptions(data);
    setLoading(false);
  };

  return (
    <Select
      options={options}
      loading={loading}
      onOpen={loadOptions}
      placeholder="Load options..."
    />
  );
}
```

### Custom Rendering

```tsx
<Select
  options={options}
  renderValue={(value, options) => {
    const selected = options.find((opt) => opt.value === value);
    return <strong>{selected?.label}</strong>;
  }}
  renderOption={(option, selected) => (
    <div className="custom-option">
      {option.label}
      {selected && <CheckIcon />}
    </div>
  )}
/>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Select name="framework" options={options} required aria-label="Select framework" />
  <button type="submit">Submit</button>
</form>
```

## Accessibility

### Keyboard Navigation

| Key               | Action                                  |
| ----------------- | --------------------------------------- |
| `Space` / `Enter` | Open dropdown or select option          |
| `Arrow Down`      | Next option                             |
| `Arrow Up`        | Previous option                         |
| `Home`            | First option                            |
| `End`             | Last option                             |
| `Escape`          | Close dropdown                          |
| `Tab`             | Close and move to next element          |
| `Type`            | Type-ahead search (when not searchable) |

### ARIA Attributes

The Select component implements proper ARIA semantics:

- `role="combobox"` on trigger
- `role="listbox"` on options container
- `role="option"` on each option
- `aria-expanded` to indicate open/closed state
- `aria-selected` on selected options
- `aria-disabled` on disabled options
- `aria-label` / `aria-labelledby` for labels
- `aria-describedby` for hints/errors

### Screen Readers

- Selected value announced when opened
- Options announced as user navigates
- Multi-select count announced
- Loading states communicated
- Disabled states properly indicated
- Empty states announced

### Focus Management

- Visible focus indicators (ring style)
- Focus returns to trigger on close
- Search input auto-focused when opened
- Proper focus trap within dropdown

## Performance Optimization

The component is optimized for performance:

1. **Memoization** - Component wrapped in `memo()` to prevent unnecessary re-renders
2. **useCallback** - All event handlers memoized
3. **useMemo** - Expensive computations cached (filtering, grouping)
4. **Virtualization** - Support for large lists (1000+ items)
5. **Debouncing** - Search input can be debounced (custom implementation)
6. **Lazy Loading** - Options loaded on demand

### Large Lists

For lists with 100+ items, enable search:

```tsx
<Select options={largeList} searchable maxHeight={400} />
```

## Styling

The component uses Tailwind CSS and inherits Lucent UI design tokens:

- **Primary color** (#3535F3) - Used for focus, selection, highlights
- **Neutral grays** - Borders, backgrounds, text
- **Success/Danger/Warning** - Error states
- **Inter font** - Typography
- **Consistent spacing** - Padding, margins, gaps
- **Smooth transitions** - All interactive states

### Custom Styling

Add custom classes via the `className` prop:

```tsx
<Select className="custom-select" options={options} />
```

## Best Practices

### Do's ✅

- Use `aria-label` or `aria-labelledby` for accessibility
- Provide meaningful placeholder text
- Use `aria-describedby` for hints and errors
- Enable `searchable` for lists with 10+ items
- Use `clearable` to allow deselection
- Group related options
- Provide descriptions for complex options
- Use proper form integration with `name` attribute

### Don'ts ❌

- Don't use generic placeholders like "Select..."
- Don't forget to handle loading states
- Don't disable without explanation
- Don't use for < 5 options (use radio buttons instead)
- Don't nest selects inside selects
- Don't override focus styles without alternatives
- Don't use without proper labels

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## License

MIT

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.
