import type { StoryObj, Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  args: {
    text: 'Button',
    onClick: () => console.log('Button'),
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
