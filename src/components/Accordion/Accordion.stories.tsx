import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="item-1" title="What is Lucent UI?">
        Lucent UI is a modern React component library built with TypeScript and Tailwind CSS.
      </AccordionItem>
      <AccordionItem value="item-2" title="How do I install it?">
        You can install it using npm: npm install @lucent-ui/components
      </AccordionItem>
      <AccordionItem value="item-3" title="Is it accessible?">
        Yes! All components are WCAG 2.1 AA compliant with full keyboard support.
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion multiple>
      <AccordionItem value="item-1" title="Section 1">
        This accordion allows multiple items to be open at once.
      </AccordionItem>
      <AccordionItem value="item-2" title="Section 2">
        Try opening multiple sections simultaneously!
      </AccordionItem>
      <AccordionItem value="item-3" title="Section 3">
        All sections can be open or closed independently.
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultExpanded: Story = {
  render: () => (
    <Accordion defaultValue="item-2">
      <AccordionItem value="item-1" title="Closed by default">
        This item is closed by default.
      </AccordionItem>
      <AccordionItem value="item-2" title="Open by default">
        This item is open by default!
      </AccordionItem>
      <AccordionItem value="item-3" title="Also closed">
        This item is also closed by default.
      </AccordionItem>
    </Accordion>
  ),
};
