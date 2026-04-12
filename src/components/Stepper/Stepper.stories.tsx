import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { useState } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Add profile details' },
  { label: 'Verification', description: 'Verify your email' },
  { label: 'Complete', description: 'Setup complete' },
];

export const Horizontal: Story = {
  args: {
    steps,
    currentStep: 1,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    steps,
    currentStep: 1,
    orientation: 'vertical',
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <div className="space-y-6">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="flex gap-2">
          <Button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          >
            Previous
          </Button>
          <Button
            disabled={currentStep === steps.length - 1}
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            variant="primary"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  },
};
