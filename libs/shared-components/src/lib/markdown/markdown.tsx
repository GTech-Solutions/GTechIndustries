import { Box, Link, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { makeStyles } from 'tss-react/mui';
import ReactMarkdown from 'markdown-to-jsx';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMarkdownProps {
    children: string;
    className?: string;
}

function MarkdownListItem(props: any) {
    return <Box component='li' sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

function MarkdownTyographyULItem(props: any) {
    return (
        <Typography
            sx={{ marginTop: ' 1rem', marginBottom: '1rem', listStyle: 'none', '& strong': { color: 'text.primary' } }}
            component={'div'}
            {...props}
        />
    );
}

const Markdown: React.FC<IMarkdownProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const theme = useTheme();

    const options = {
        overrides: {
            h1: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: 'h4',
                    component: 'h1',
                },
            },
            h2: {
                component: Typography,
                props: { gutterBottom: true, variant: 'h6', component: 'h2' },
            },
            h3: {
                component: Typography,
                props: { gutterBottom: true, variant: 'subtitle1' },
            },
            h4: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: 'caption',
                    paragraph: true,
                },
            },
            p: {
                component: Typography,
                props: { paragraph: true },
            },
            a: { component: Link },
            li: {
                component: MarkdownListItem,
            },
            ul: {
                component: MarkdownTyographyULItem,
            },
        },
    };

    return (
        <ReactMarkdown
            style={{ backgroundColor: theme.palette.background.default, paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
            options={options}
            {...props}
        />
    );
};

const useStyles = makeStyles<IMarkdownProps>()((theme, props) => ({}));

export { Markdown };
