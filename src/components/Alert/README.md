# Alert Component

A flexible alert component with automatic icon integration following the Vercel design system.

## Features

- ✅ 4 variants (info, success, warning, danger)
- ✅ Automatic default icons from Icon library
- ✅ Custom icon support
- ✅ Optional title and description
- ✅ Dismissible with close button
- ✅ Auto-dismiss functionality
- ✅ Smooth slide-in animation
- ✅ Shadow-as-border technique (Vercel design)
- ✅ Workflow color support

## Usage

### Basic

```tsx
import { Alert } from '@lucent-ui/components';

function App() {
  return (
    <Alert variant="info" title="Information">
      This is an informational message.
    </Alert>
  );
}
```

### All Variants

```tsx
// Info - Blue with InfoIcon
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

// Success - Green with CheckIcon
<Alert variant="success" title="Success">
  Your changes have been saved successfully!
</Alert>

// Warning - Yellow with WarningIcon
<Alert variant="warning" title="Warning">
  Please review your input before proceeding.
</Alert>

// Danger - Red with AlertIcon
<Alert variant="danger" title="Error">
  An error occurred while processing your request.
</Alert>
```

### Custom Icons

```tsx
import { Alert, LightningIcon, HeartIcon, CodeIcon } from '@lucent-ui/components';

// Custom icon from Icon library
<Alert
  variant="info"
  title="New Feature"
  icon={<LightningIcon size="md" color="workflow-develop" />}
>
  Check out our new feature!
</Alert>

// Using workflow colors
<Alert
  variant="success"
  title="Shipped to Production"
  icon={<LightningIcon size="md" color="workflow-ship" />}
>
  Your changes are live!
</Alert>
```

### Without Icon

```tsx
<Alert variant="info" title="Information" showIcon={false}>
  This alert has no icon.
</Alert>
```

### Dismissible

```tsx
const [show, setShow] = useState(true);

{
  show && (
    <Alert variant="info" title="Dismissible Alert" onClose={() => setShow(false)}>
      Click the X to close this alert.
    </Alert>
  );
}
```

### Auto-Dismiss

```tsx
<Alert
  variant="success"
  title="Auto-Dismissing Alert"
  onClose={() => console.log('Dismissed')}
  autoDismiss={5000}
>
  This alert will automatically dismiss after 5 seconds.
</Alert>
```

### Without Title (Compact)

```tsx
<Alert variant="info">Quick informational message without a title.</Alert>
```

## Props

| Prop          | Type                                           | Default  | Description                     |
| ------------- | ---------------------------------------------- | -------- | ------------------------------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Alert style variant             |
| `title`       | `string`                                       | -        | Optional alert title            |
| `children`    | `ReactNode`                                    | -        | Alert message content           |
| `icon`        | `ReactNode`                                    | -        | Custom icon (overrides default) |
| `showIcon`    | `boolean`                                      | `true`   | Show/hide icon                  |
| `onClose`     | `() => void`                                   | -        | Close button handler            |
| `animated`    | `boolean`                                      | `true`   | Enable slide-in animation       |
| `autoDismiss` | `number`                                       | -        | Auto-dismiss after milliseconds |
| `className`   | `string`                                       | -        | Additional CSS classes          |

## Default Icons

Each variant has a default icon from the Icon library:

| Variant   | Default Icon  | Color                        |
| --------- | ------------- | ---------------------------- |
| `info`    | `InfoIcon`    | `workflow-develop` (#0a72ef) |
| `success` | `CheckIcon`   | `success` (#1FBE5F)          |
| `warning` | `WarningIcon` | `warning` (#f59e0b)          |
| `danger`  | `AlertIcon`   | `danger` (#f50031)           |

## Styling

The component uses Vercel's shadow-as-border technique:

```tsx
// Info - Blue tinted background
'bg-blue-50 shadow-border';

// Success - Green tinted background
'bg-green-50 shadow-border';

// Warning - Yellow tinted background
'bg-yellow-50 shadow-border';

// Danger - Red tinted background with danger-colored shadow
'bg-red-50 shadow-[rgba(255,91,79,0.3)_0px_0px_0px_1px]';
```

## Examples

### Workflow Pipeline Alerts

```tsx
import { Alert, CodeIcon, LightningIcon } from '@lucent-ui/components';

<Alert
  variant="info"
  title="Development Update"
  icon={<CodeIcon size="md" color="workflow-develop" />}
>
  Code pushed to development branch.
</Alert>

<Alert
  variant="warning"
  title="Preview Deployment"
  icon={<LightningIcon size="md" color="workflow-preview" />}
>
  Preview is ready at preview-abc123.vercel.app
</Alert>

<Alert
  variant="success"
  title="Shipped to Production"
  icon={<LightningIcon size="md" color="workflow-ship" />}
>
  Your changes are live!
</Alert>
```

### Alert Stack with Animations

```tsx
const [alerts, setAlerts] = useState([]);

const addAlert = (variant, message) => {
  setAlerts((prev) => [...prev, { id: Date.now(), variant, message }]);
};

const removeAlert = (id) => {
  setAlerts((prev) => prev.filter((alert) => alert.id !== id));
};

<div className="space-y-2">
  {alerts.map((alert) => (
    <Alert key={alert.id} variant={alert.variant} onClose={() => removeAlert(alert.id)}>
      {alert.message}
    </Alert>
  ))}
</div>;
```

### Notification System

```tsx
import { Alert, BellIcon, MailIcon, HeartIcon } from '@lucent-ui/components';

<Alert
  variant="info"
  icon={<BellIcon size="md" color="gray" />}
>
  You have 3 unread notifications.
</Alert>

<Alert
  variant="info"
  icon={<MailIcon size="md" color="gray" />}
>
  You have 5 new messages.
</Alert>

<Alert
  variant="success"
  icon={<HeartIcon size="md" color="danger" />}
>
  This item has been added to your favorites.
</Alert>
```

## Accessibility

- ✅ Uses `role="alert"` for screen readers
- ✅ Proper button labeling for close action
- ✅ Keyboard accessible (close button)
- ✅ Color not sole indicator (icons + text)

## Animation

Alerts slide in from the left with opacity transition:

```css
/* Visible state */
opacity: 100
translateX: 0

/* Hidden state */
opacity: 0
translateX: -16px
```

Duration: 300ms with ease-in-out timing.

## Best Practices

### Do

- Use appropriate variants for context (info=blue, success=green, warning=yellow, danger=red)
- Use workflow colors (`workflow-develop`, `workflow-preview`, `workflow-ship`) for deployment pipeline alerts
- Keep messages concise and actionable
- Use custom icons when they add context
- Stack multiple alerts vertically with spacing

### Don't

- Don't use danger variant for non-critical information
- Don't use workflow colors outside of deployment context
- Don't nest alerts inside each other
- Don't use extremely long auto-dismiss times (> 10 seconds)
- Don't mix too many custom icons in a single view

## TypeScript

Full TypeScript support:

```tsx
import { Alert, AlertProps, AlertVariant } from '@lucent-ui/components';

const variant: AlertVariant = 'success';

<Alert variant={variant} title="Success">
  Message content
</Alert>;
```

## Vercel Design System

The Alert component follows Vercel's design principles:

- **Shadow-as-border**: No CSS borders, only box-shadow
- **Tinted backgrounds**: Subtle color backgrounds for context
- **Icon integration**: Automatic icons from centralized library
- **Workflow colors**: Contextual use of Ship/Preview/Develop colors
- **Minimal design**: Clean, focused presentation
- **Font weight 500**: Medium weight for UI elements
- **8px border radius**: Comfortable rounded corners

## Browser Support

Works in all modern browsers with CSS Grid and Flexbox support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
