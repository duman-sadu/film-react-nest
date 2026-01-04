import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'UI/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
  args: {},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Контент внутри Layout', // Укажите хотя бы строку
    isLocked: false,
  },
};
