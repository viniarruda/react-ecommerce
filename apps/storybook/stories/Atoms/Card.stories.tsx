import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter } from '@react-shop/design-system';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-gray-500">Card subtitle</p>
      </CardHeader>
      <CardContent>
        <p>This is the card content. It can contain any elements you want.</p>
      </CardContent>
      <CardFooter>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outline" className="max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">Outlined Card</h3>
        <p className="text-sm text-gray-500">With border</p>
      </CardHeader>
      <CardContent>
        <p>This card has an outlined variant with a visible border.</p>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardContent>
        <p className="text-center py-4">Simple card with just content</p>
      </CardContent>
    </Card>
  ),
};

