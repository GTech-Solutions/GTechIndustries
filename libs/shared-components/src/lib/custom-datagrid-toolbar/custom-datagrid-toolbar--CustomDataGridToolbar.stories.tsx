import type { Meta, StoryObj } from '@storybook/react';
import { CustomDataGridToolbar, ICustomDataGridToolbarProps } from './custom-datagrid-toolbar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CustomDataGrid } from '../custom-datagrid/custom-data-grid';
import { GridSlotsComponent } from '@mui/x-data-grid';

const meta: Meta<typeof CustomDataGridToolbar> = {
    component: CustomDataGridToolbar,
    title: 'CustomDataGridToolbar',
};
export default meta;

export const Primary = (args: ICustomDataGridToolbarProps) => {
    return (
        <>
            <CustomDataGrid
                dataGridIdentifier={'storybook'}
                columns={[]}
                rows={[]}
                slots={{ toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'] }}
                slotProps={{ toolbar: args }}
            />
        </>
    );
};

export const Heading = (args: ICustomDataGridToolbarProps) => {
    return (
        <CustomDataGrid
            dataGridIdentifier={'storybook'}
            columns={[]}
            rows={[]}
            slots={{ toolbar: CustomDataGridToolbar as GridSlotsComponent['toolbar'] }}
            slotProps={{ toolbar: args }}
        />
    );
};
