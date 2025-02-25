import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AIButton from '../AIButton';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AIButton>Button Text</AIButton>);
    expect(getByText('Button Text')).toBeInTheDocument();
  });

  it('changes hover state on mouse events', async () => {
    const { getByRole } = render(<AIButton />);
    const button = getByRole('button');
    await userEvent.hover(button);
    await userEvent.unhover(button);
  });

  it('renders children correctly', () => {
    const { getByText } = render(<AIButton>Test</AIButton>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('applies the hue rotation style correctly', () => {
    const { getByRole } = render(<AIButton hueValue={90}>Test</AIButton>);
    const button = getByRole('button');
    expect(getComputedStyle(button).filter).toBe('hue-rotate(90deg)');
  });
});
