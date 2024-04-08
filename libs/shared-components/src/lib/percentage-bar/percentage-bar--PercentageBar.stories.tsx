import type { Meta, StoryObj } from '@storybook/react';
import { PercentageBar } from './percentage-bar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PercentageBar> = {
    component: PercentageBar,
    title: 'PercentageBar',
};
export default meta;
type Story = StoryObj<typeof PercentageBar>;

export const Primary = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to PercentageBar!/gi)).toBeTruthy();
    },
};
