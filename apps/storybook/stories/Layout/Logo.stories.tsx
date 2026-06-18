import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@react-shop/design-system';

const MockLink: React.ComponentType<{ href: string; className?: string; children?: React.ReactNode }> = ({
  href,
  className,
  children,
}) => <a href={href} className={className}>{children}</a>;

const meta = {
  title: 'Layout/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    LinkComponent: MockLink,
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomName: Story = {
  args: {
    name: 'Berzerk',
    abbrev: 'BK',
  },
};

export const LongName: Story = {
  args: {
    name: 'My Awesome Store',
    abbrev: 'MA',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm text-gray-500 mb-2">Default</p>
        <Logo LinkComponent={MockLink} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Custom name</p>
        <Logo LinkComponent={MockLink} name="Berzerk" abbrev="BK" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Single char abbrev</p>
        <Logo LinkComponent={MockLink} name="My Store" abbrev="M" />
      </div>
    </div>
  ),
};
