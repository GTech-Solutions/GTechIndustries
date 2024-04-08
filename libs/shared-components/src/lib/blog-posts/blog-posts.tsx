import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Markdown } from '../markdown/markdown';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBlogPostsProps {
    title: string;
    posts: string[];
}

const BlogPosts: React.FC<IBlogPostsProps> = (props) => {
    const { classes, cx } = useStyles(props);

    return (
        <Stack spacing={1} className={cx(classes.container)}>
            <Typography variant='h6' gutterBottom>
                {props.title}
            </Typography>
            <Divider />
            {props.posts.map((post) => (
                <Markdown className='markdown' key={post.substring(0, 40)}>
                    {post}
                </Markdown>
            ))}
        </Stack>
    );
};

const useStyles = makeStyles<IBlogPostsProps>()((theme, props) => ({
    container: {
        marginLeft: '-1.5rem',
        marginRight: '-1.5rem',
        overflow: 'hidden',
        '& .markdown': {
            py: 3,
        },
    },
}));

export { BlogPosts };
