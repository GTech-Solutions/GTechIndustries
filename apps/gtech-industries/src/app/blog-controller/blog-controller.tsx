import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { BlogHeader, BlogPosts } from '@gtech/shared-components';
import muiDatagridPost from './mui-datagrid-blog-post.md';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBlogControllerProps {}

const BlogController: React.FC<IBlogControllerProps> = (props) => {
    const { classes, cx } = useStyles(props);

    console.log(muiDatagridPost);
    return (
        <>
            <BlogHeader title={'Blog'} />
            <BlogPosts title={'MUI DataGid custom toolbar.'} posts={[muiDatagridPost]} />
        </>
    );
};

const useStyles = makeStyles<IBlogControllerProps>()((theme, props) => ({}));

export { BlogController };
