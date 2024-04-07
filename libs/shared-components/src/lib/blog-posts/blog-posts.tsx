import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Divider, Grid, Typography } from '@mui/material';
import { Markdown } from '../markdown/markdown';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBlogPostsProps {
    title: string;
    posts: string[];
}

const BlogPosts: React.FC<IBlogPostsProps> = (props) => {
    const { classes, cx } = useStyles(props);

    return (
        <Grid item xs={12} md={8} className={cx(classes.container)}>
            <Typography variant='h6' gutterBottom>
                {props.title}
            </Typography>
            <Divider />
            {props.posts.map((post) => (
                <Markdown className='markdown' key={post.substring(0, 40)}>
                    {post}
                </Markdown>
            ))}
        </Grid>
    );
};

const useStyles = makeStyles<IBlogPostsProps>()((theme, props) => ({
    container: {
        '& .markdown': {
            py: 3,
        },
    },
}));

export { BlogPosts };
