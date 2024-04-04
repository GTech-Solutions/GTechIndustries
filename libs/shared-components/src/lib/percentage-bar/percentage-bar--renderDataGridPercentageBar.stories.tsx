import type { Meta, StoryObj } from '@storybook/react';
import { renderDataGridPercentageBar } from './percentage-bar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof renderDataGridPercentageBar> = {
    component: renderDataGridPercentageBar,
    title: 'renderDataGridPercentageBar',
};
export default meta;
type Story = StoryObj<typeof renderDataGridPercentageBar>;

export const Primary = {
    args: {
        value: 0,
    },
};

export const Heading: Story = {
    args: {
        value: 0,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to renderDataGridPercentageBar!/gi)).toBeTruthy();
    },
};
