import type { StoryObj, Meta } from '@storybook/react';
import RecipeCard from './RecipeCard';

export default {
  title: 'Components/Cards/Recipe Card',
  component: RecipeCard,
  args: {
    location: '10 Calories',
    device: '20 Mins',
    name: 'Almond Milk',
    user: 'Dairy Alternatives',
    url: 'https://images.unsplash.com/photo-1723843038784-12e69916ac1e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      values: [{ name: 'Orange', value: '#f1a97f' }],
      default: 'Orange',
    },
  },
  argTypes: {},
} as Meta<typeof RecipeCard>;

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {};
