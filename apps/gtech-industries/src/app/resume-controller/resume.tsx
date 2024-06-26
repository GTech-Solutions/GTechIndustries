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
                        description: '',
                        content: `I enjoy working alongside and guiding individuals through various aspects of software engineering, with a special interest in front-end development and CICD pipelines. With more than 10 years of experience across different roles in technology, from support to principal software architect, I've cultivated the skill to quickly comprehend and effectively communicate complex ideas to individuals of varying proficiencies. Drawing from my background as an automotive technician, I bring a wealth of problem-solving expertise and a knack for thinking outside the box, qualities that I am eager to share with others.`,
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
                                    '* Lead the delivery of cloud and software architecture services for our FinOps SaaS platform, fostering cross-functional collaboration and ensuring delivery excellence. \n' +
                                    '* Offered direct guidance, mentorship, and training to development teams, bolstering their technical skills and instilling a culture of continuous learning. \n' +
                                    '* Collaborated with stakeholders across departments to ensure alignment of architectural decisions with organizational goals, driving product evolution and enhancing customer satisfaction. \n' +
                                    '* Spearheaded the migration of our legacy monolithic application to a modern, cloud-native microservices architecture, leveraging various AWS services and enabling improved scalability, reliability, and performance.',
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2023.8 - 2024.4',
                                descriptionTags: ['Terraform', 'CDK', 'CFT', 'AWS', 'Azure'],
                            },
                            {
                                title: 'Engineering Team Lead',
                                company: 'Vega',
                                description:
                                    '* Implemented NX Monorepo methodology, optimizing code organization and facilitating seamless code sharing across multiple projects, resulting in enhanced collaboration, code reusability, and significant reduction in development time.\n' +
                                    '* Led the adoption of ReactQuery and Recoil, improving data fetching and state management, and enhancing the overall performance and user experience of our applications.\n' +
                                    '* Helped lead the development of a new cloud-native, serverless platform for our FinOps SaaS product, leveraging AWS CDK, AppRunner, S3, Lambda and Api Gateway, and enabling rapid deployment and scalability of new features. \n' +
                                    "* Actively participated in the recruitment and hiring process for engineering roles, conducting technical interviews and assessing candidates' proficiency in React and Material-UI.\n" +
                                    '* Provided ongoing technical guidance and mentorship to junior developers, fostering their growth and development within the organization.',
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2022.10 - 2023.8',
                                descriptionTags: ['NX', 'ReactQuery', 'Recoil', 'Axios', 'TSS', 'Actions'],
                            },
                            {
                                title: 'Senior Software Engineer',
                                company: 'Vega',
                                description:
                                    '* Developed and maintained applications for FinOps SaaS platform, utilizing .NET Core, React, Material-UI, and TypeScript to deliver intuitive user interfaces and seamless experiences. \n' +
                                    '* Created a custom theme provider for Material-UI, enabling dynamic theming and customization of our applications to align with customer branding requirements. \n' +
                                    '* Collaborated with UX designers to create wireframes and mockups for new features, ensuring alignment with user requirements. \n' +
                                    '* Implemented a custom CDK construct library for AWS and custom CICD pipelines using AWS CodePipeline and CodeBuild, resulting in improved code quality and faster time-to-market.',
                                companyWebSite: 'https://www.vegacloud.io',
                                companyMeta: '',
                                datesBetween: '2019.10 - 2022.10',
                                descriptionTags: ['Typescript', 'React', 'MUI', '.NET Core', 'CDK', 'CICD'],
                            },
                            {
                                title: 'Software Engineer',
                                company: 'RiskLens',
                                description:
                                    '* Played a pivotal role in the creation of the GEN 3 application from inception, leveraging expertise in Typescript, .NET Core, React, and GraphQL to enable businesses to quantify risk by running FAIR ontology-based simulations, thereby providing calculations of potential magnitude and frequency of loss. \n' +
                                    '* Helped to develop a custom D3 charting library tailored specifically for the GEN 3 application, advancing data visualization capabilities and enabling stakeholders to effectively analyze risk data and scenarios. \n' +
                                    '* Engineered a custom Apollo client to seamlessly handle GraphQL queries and mutations within the GEN 3 application, ensuring efficient data fetching and manipulation to support complex risk assessment workflows. \n' +
                                    '* Helped design and implement a custom .NET Core middleware solution to manage user authentication and authorization processes for the GEN 3 application, enhancing security measures and ensuring access control for sensitive risk-related data and functionalities. \n',
                                companyWebSite: 'https://www.risklens.com',
                                companyMeta: '',
                                datesBetween: '2019.5 - 2019.9',
                                descriptionTags: ['Typescript', '.NET Core', 'Apollo', 'GraphQL', 'D3'],
                            },
                            {
                                title: 'Junior Software Engineer',
                                company: 'RiskLens',
                                description:
                                    '* Developed and maintained the RiskLens application, a web-based platform that enables organizations to quantify and manage cybersecurity risk using the FAIR ontology. \n' +
                                    '* Collaborated with a cross-functional team of developers, product managers, and UX designers to deliver new features and enhancements, ensuring alignment with customer requirements and business objectives. \n' +
                                    '* Conducted code reviews and provided feedback to peers on best practices, code quality, and performance optimization, fostering a culture of continuous improvement and knowledge sharing within the engineering team. \n' +
                                    '* Participated in Agile ceremonies, including sprint planning, daily stand-ups, and retrospectives, to ensure timely delivery of high-quality software and alignment with project timelines and milestones. \n',
                                companyWebSite: 'https://www.risklens.com',
                                companyMeta: '',
                                datesBetween: '2018.2 - 2019.5',
                                descriptionTags: ['Typescript', 'React', 'MUI', 'Jest', 'Enzyme', '.NET Core'],
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
                                description: 'Concentration in Software Engineering',
                                authorityWebSite: 'https://www.ewu.edu/',
                                rightSide: '2014 - 2018',
                            },
                            {
                                title: 'Automotive Technology (Associate)',
                                authority: 'Lewis Clark State College',
                                description: 'ASE Certified',
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
                                description: '',
                                authorityWebSite: 'https://reinvent.awsevents.com/',
                            },
                            {
                                title: 'FinOps Certified Practitioner',
                                authority: 'Linux Foundation',
                                description: '',
                                authorityWebSite: 'https://www.credly.com/badges/a07f13b0-3f69-4243-93c3-b47a2ba770e4/linked_in_profile',
                            },
                        ],
                    },
                    {
                        type: 'tag-list',
                        title: 'Hobbies & Interests',
                        description: '',
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
        backgroundColor: theme.palette.background.default,
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
        '& .EIrz6a_tag:not(body)': {
            borderRadius: 99,
            background: theme.palette.secondary.main,
        },
        '& .SPgITW_sectionIcon': {
            background: theme.palette.primary.main,
        },
    },
}));

export { Resume };
