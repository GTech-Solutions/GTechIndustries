import React, { forwardRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import CV from 'react-cv';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResumeProps {}

const Resume = React.forwardRef<HTMLDivElement>((props: IResumeProps, ref) => {
    const { classes, cx } = useStyles(props);

    return (
        <div ref={ref} className={cx(classes.resume)}>
            <CV
                personalData={{
                    name: 'Michael Gilge',
                    title: 'Senior Software Engineer',
                    image: '/assets/mgilge.jpg',
                    contacts: [
                        { type: 'email', value: 'mgilge@gmail.com' },
                        { type: 'phone', value: '+1 (208) 777 5276' },
                        { type: 'location', value: ' Idaho' },
                        { type: 'website', value: 'mui.gtechdirect.com' },
                        { type: 'github', value: 'github.com/mike-gilge' },
                    ],
                }}
                sections={[
                    {
                        type: 'text',
                        title: 'Career Profile',
                        content: `When I was a child, I always wanted to be a developer..then this hapened **You can use markdown here**`,
                        icon: 'usertie',
                    },
                    {
                        type: 'text',
                        title: 'Career Profile',
                        content: `When I was a child, I always wanted to be a developer..then this hapened **You can use markdown here**`,
                        icon: 'usertie',
                    },
                    {
                        type: 'text',
                        title: 'Career Profile',
                        content: `When I was a child, I always wanted to be a developer..then this hapened **You can use markdown here**`,
                        icon: 'usertie',
                    },
                    {
                        type: 'text',
                        title: 'Career Profile',
                        content: `When I was a child, I always wanted to be a developer..then this hapened **You can use markdown here**`,
                        icon: 'usertie',
                    },
                ]}
                branding={false} // or false to hide it.
            />
        </div>
    );
});

const useStyles = makeStyles<IResumeProps>()((theme, props) => ({
    resume: {
        overflow: 'scroll',
        '& .EIrz6a_hero.EIrz6a_is-primary': {
            backgroundColor: theme.palette.primary.main,
        },
        '& .EIrz6a_container': { maxHeight: 'calc(100vh - 14rem)' },
        '&. .SPgITW_appContainer': {
            paddingTop: 0,
        },
        '& .EIrz6a_section': {
            padding: 0,
        },
        '& .EIrz6a_box strong': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        },
        '& .EIrz6a_box': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        },
        '& .EIrz6a_title': {
            color: theme.palette.text.primary,
        },
    },
}));

export { Resume };
