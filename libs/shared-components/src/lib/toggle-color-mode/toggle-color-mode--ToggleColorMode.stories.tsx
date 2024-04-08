import type { Meta, StoryObj } from '@storybook/react';
import { ToggleColorMode } from './toggle-color-mode';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ToggleColorMode> = {
    component: ToggleColorMode,
    title: 'ToggleColorMode',
};
export default meta;
type Story = StoryObj<typeof ToggleColorMode>;

export const Primary = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to ToggleColorMode!/gi)).toBeTruthy();
    },
};
