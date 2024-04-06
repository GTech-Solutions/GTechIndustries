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
                        content: `I enjoy working with and mentoring people on all aspects of software engineering especially front end and CICD pipelines. Bringing a history of more than 10 years' involvement in technology -- from support to principal software architect -- I've learned how to absorb information quickly and how to convey that information to audiences at various skill levels.  My former background as an automotive technician gives me a lot of experience with problem solving and thinking outside the box that I enjoy being able to share with others.`,
                        icon: 'usertie',
                    },
                    {
                        type: 'experiences-list',
                        title: 'Experience',
                        icon: 'archive',
                        items: [
                            {
                                title: 'Principle Architect',
                                company: 'Vega',
                                description:
                                    'Support cross-functional teams by delivering cloud and software architecture services with an emphasis on delivery of our FinOps Saas platform. Provide guidance, mentorship, training, documentation, and cloud expertise on an as-needed basis. Collaborate with stakeholders in all departments to ensure our platform delivers on their needs.',
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2023.8 - Present',
                                descriptionTags: ['Terraform', 'CDK', 'CFT', 'AWS', 'Azure'],
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
                            {
                                title: 'Software Engineer',
                                company: 'RiskLens',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2019.5 - 2019.9',
                                descriptionTags: ['Javascript', 'React', 'MUI', 'AWS'],
                            },
                            {
                                title: 'Junior Software Engineer',
                                company: 'RiskLens',
                                description: "I'm working as a lead developer yeeeey!But wooo",
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2018.2 - 2019.5',
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
                                title: 'Computer Science (Bachelor)',
                                authority: 'Eastern Washington University',
                                authorityWebSite: 'https://www.ewu.edu/',
                                rightSide: '2014 - 2018',
                            },
                            {
                                title: 'Automotive Technology (Associate)',
                                authority: 'Lewis Clark State College',
                                authorityWebSite: 'https://lcsc.edu',
                                rightSide: '2004 - 2006',
                            },
                        ],
                    },
                    {
                        type: 'common-list',
                        title: 'Conferences & Certificates',
                        description: '',
                        icon: 'comments',
                        items: [
                            {
                                title: 're:Invent 2019',
                                authority: 'AWS',
                                authorityWebSite: 'https://reinvent.awsevents.com/',
                            },
                            {
                                title: 'FinOps Certified Practitioner',
                                authorityMeta: 'https://www.credly.com/badges/a07f13b0-3f69-4243-93c3-b47a2ba770e4/linked_in_profile',
                            },
                        ],
                    },
                    {
                        type: 'tag-list',
                        title: 'Hobbies & Interests',
                        icon: 'cubes',
                        items: ['Photography', 'Jeeps', 'Camping', 'Hiking', 'Fishing'],
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
