import type { Meta, StoryObj } from '@storybook/react';
import { CustomDataGrid } from './custom-data-grid';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CustomDataGrid> = {
    component: CustomDataGrid,
    title: 'CustomDataGrid',
};
export default meta;
type Story = StoryObj<typeof CustomDataGrid>;

export const Primary = {
    args: {
        columns: [],
        rows: [],
    },
};

export const Heading: Story = {
    args: {
        columns: [],
        rows: [],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to CustomDataGrid!/gi)).toBeTruthy();
    },
};
