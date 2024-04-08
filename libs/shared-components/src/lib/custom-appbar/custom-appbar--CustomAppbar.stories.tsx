import type { Meta, StoryObj } from '@storybook/react';
import { CustomAppbar } from './custom-appbar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { MenuBook } from '@mui/icons-material';

const meta: Meta<typeof CustomAppbar> = {
    component: CustomAppbar,
    title: 'CustomAppbar',
};
export default meta;
type Story = StoryObj<typeof CustomAppbar>;

export const Primary = {
    args: {
        logo: MenuBook,
    },
};

export const Heading: Story = {
    args: {
        logo: MenuBook,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        expect(canvas.getByText(/Welcome to CustomAppbar!/gi)).toBeTruthy();
    },
};
