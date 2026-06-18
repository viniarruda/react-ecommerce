import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CartIcon } from '@react-shop/design-system';

const MockLink = ({ href, className, children }: any) => (
  <a href={href} className={className}>{children}</a>
);

const meta = {
  title: 'Layout/CartIcon',
  component: CartIcon,
  tags: ['autodocs'],
  args: {
    LinkComponent: MockLink,
  },
} satisfies Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { itemCount: 0 },
};

export const WithItems: Story = {
  args: { itemCount: 3 },
};

export const ManyItems: Story = {
  args: { itemCount: 99 },
};

export const OverLimit: Story = {
  args: { itemCount: 999 },
};
