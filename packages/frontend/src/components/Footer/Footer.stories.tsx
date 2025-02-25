import type { StoryObj, Meta } from '@storybook/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Footer/Footer',
  component: Footer,
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
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
