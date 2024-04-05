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
                        type: 'experiences-list',
                        title: 'Vega Cloud',
                        icon: 'archive',
                        items: [
                            {
                                title: 'Principle Architect',
                                company: 'Vega',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2023.8 - Present',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                            {
                                title: 'Engineering Team Lead',
                                company: 'Vega',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2022.10 - 2023.8',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                            {
                                title: 'Senior Software Engineer',
                                company: 'Vega',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2019.10 - 2022.10',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                        ],
                    },
                    {
                        type: 'experiences-list',
                        title: 'RiskLens',
                        icon: 'archive',
                        items: [
                            {
                                title: 'Software Engineer',
                                company: 'RiskLens',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '22019.5 - 2019.9',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                            {
                                title: 'Junior Software Engineer',
                                company: 'RiskLens',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2018.5 - 2019.5',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                            {
                                title: 'Intern',
                                company: 'RiskLens',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2018.2 - 2018.5',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                        ],
                    },
                    {
                        type: 'common-list',
                        title: 'Education',
                        icon: 'graduation',
                        items: [
                            {
                                title: 'Computer Engineering (Bachelor)',
                                authority: 'Eastern Washington University',
                                authorityWebSite: 'https://www.ewu.edu/',
                                rightSide: '2014 - 2018',
                            },
                            {
                                title: 'Some Department (PHD)',
                                authority: 'Another University',
                                authorityWebSite: 'https://sample.edu',
                                rightSide: '2017 - Present',
                            },
                        ],
                    },
                ]}
                branding={false} // or false to hide it.
            />
        </div>
    );
});

const useStyles = makeStyles<IResumeProps>()((theme, props) => ({
    resume: {
        minWidth: '100vw',
        overflow: 'scroll',
        '& .EIrz6a_hero.EIrz6a_is-primary': {
            backgroundColor: theme.palette.primary.main,
        },

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
