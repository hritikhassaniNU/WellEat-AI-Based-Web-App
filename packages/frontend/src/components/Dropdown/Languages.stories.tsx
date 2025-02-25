import type { StoryObj, Meta } from '@storybook/react';
import LanguageDropdown from './LanguageDropdown';

export default {
  title: 'Components/Dropdowns/Language Dropdown',
  component: LanguageDropdown,
  args: {
    onClick: (value: string) => {
      console.log(value);
    },
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} as Meta<typeof LanguageDropdown>;

type Story = StoryObj<typeof LanguageDropdown>;

export const Default: Story = {};
