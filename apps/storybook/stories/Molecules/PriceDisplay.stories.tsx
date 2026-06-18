import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from '@react-shop/design-system';

const meta = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  args: {
    currency: 'USD',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'BRL'],
    },
  },
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 99.99,
  },
};

export const WithOriginalPrice: Story = {
  args: {
    price: 79.99,
    originalPrice: 99.99,
  },
};

export const WithDiscountBadge: Story = {
  args: {
    price: 49.99,
    originalPrice: 99.99,
    showDiscount: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay price={99.99} currency="USD" size="sm" />
      <PriceDisplay price={99.99} currency="USD" size="md" />
      <PriceDisplay price={99.99} currency="USD" size="lg" />
      <PriceDisplay price={99.99} currency="USD" size="xl" />
    </div>
  ),
};

export const WithDiscount: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay price={49.99} originalPrice={99.99} currency="USD" size="lg" showDiscount />
      <PriceDisplay price={79.99} originalPrice={129.99} currency="USD" size="lg" showDiscount />
    </div>
  ),
};

export const Currencies: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay price={99.99} currency="USD" />
      <PriceDisplay price={99.99} currency="EUR" />
      <PriceDisplay price={99.99} currency="GBP" />
      <PriceDisplay price={99.99} currency="BRL" />
    </div>
  ),
};
