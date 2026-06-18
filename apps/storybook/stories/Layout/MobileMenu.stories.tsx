import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from '@react-shop/design-system';

const meta = {
  title: 'Layout/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
];

const MockLink = ({ href, children, className, onClick }: any) => (
  <a href={href} className={className} onClick={(e) => { e.preventDefault(); onClick?.(); }}>
    {children}
  </a>
);

export const LoggedOut: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Open Menu
        </button>
        <MobileMenu
          isOpen={isOpen}
          onToggle={() => setIsOpen((v) => !v)}
          onClose={() => setIsOpen(false)}
          user={null}
          navLinks={mockNavLinks}
          currentPath="/"
          onLogout={() => console.log('Logout')}
          LinkComponent={MockLink}
        />
      </>
    );
  },
};

export const LoggedIn: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Open Menu
        </button>
        <MobileMenu
          isOpen={isOpen}
          onToggle={() => setIsOpen((v) => !v)}
          onClose={() => setIsOpen(false)}
          user={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }}
          navLinks={mockNavLinks}
          currentPath="/products"
          onLogout={() => console.log('Logout')}
          LinkComponent={MockLink}
        />
      </>
    );
  },
};
