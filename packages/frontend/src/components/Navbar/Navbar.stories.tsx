import type { StoryObj, Meta } from '@storybook/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Navbar/Navbar',
  component: Navbar,
  args: {},
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {},
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
