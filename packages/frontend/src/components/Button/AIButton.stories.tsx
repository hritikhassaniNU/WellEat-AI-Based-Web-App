import type { StoryObj, Meta } from '@storybook/react';
import AIButton from './AIButton';

export default {
  title: 'Components/Buttons/AI Button',
  component: AIButton,
} as Meta<typeof AIButton>;

type Story = StoryObj<typeof AIButton>;

export const Default: Story = {
  args: {
    children: '',
    hueValue: 0,
  },
};

export const Text: Story = {
  args: {
    children: 'Click Me',
    hueValue: 0,
  },
};
