import type { Meta, StoryObj } from '@storybook/react';
import { LayoutRoute } from './layout-route';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LayoutRoute> = {
    component: LayoutRoute,
    title: 'LayoutRoute',
};
export default meta;
type Story = StoryObj<typeof LayoutRoute>;

export const Primary = {
    args: { layoutComponent: 'div' as React.ElementType },
};

export const Heading: Story = {
    args: { layoutComponent: 'div' as React.ElementType },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to LayoutRoute!/gi)).toBeTruthy();
    },
};
