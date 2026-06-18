import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from '@react-shop/design-system';

const MockLink = ({ href, className, onClick, children }: any) => (
  <a href={href} className={className} onClick={(e) => { e.preventDefault(); onClick?.(); }}>{children}</a>
);

function UserMenuWrapper(props: Omit<React.ComponentProps<typeof UserMenu>, 'isOpen' | 'onToggle' | 'onClose' | 'menuRef' | 'LinkComponent'>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <UserMenu
      {...props}
      LinkComponent={MockLink}
      isOpen={isOpen}
      onToggle={() => setIsOpen((v) => !v)}
      onClose={() => setIsOpen(false)}
      menuRef={ref}
    />
  );
}

const meta = {
  title: 'Layout/UserMenu',
  component: UserMenuWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof UserMenuWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null,
    onLogout: () => console.log('Logout clicked'),
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    onLogout: () => console.log('Logout clicked'),
  },
};

export const WithShortName: Story = {
  args: {
    user: {
      firstName: 'Jo',
      lastName: 'Do',
      email: 'jo@example.com',
    },
    onLogout: () => console.log('Logout clicked'),
  },
};
