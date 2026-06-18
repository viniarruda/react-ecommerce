import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@react-shop/design-system';

const MockLink = ({ href, children, className }: any) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

const mockLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
];

const meta = {
  title: 'Layout/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  args: {
    LinkComponent: MockLink,
    links: mockLinks,
    currentPath: '/',
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentPath: '/' },
};

export const ProductsActive: Story = {
  args: { currentPath: '/products' },
};

export const CategoriesActive: Story = {
  args: { currentPath: '/categories' },
};
