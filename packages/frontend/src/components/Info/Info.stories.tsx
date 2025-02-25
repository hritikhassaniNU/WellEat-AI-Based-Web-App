import type { StoryObj, Meta } from '@storybook/react';
import Info from './Info';

export default {
  title: 'Components/Info/Info',
  component: Info,
  args: {},
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
} as Meta<typeof Info>;

type Story = StoryObj<typeof Info>;

export const Default: Story = {};
