/**
 * @type {import(".").Subject}
 */

const subject = {
  name: "Team",
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLWljb24gbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxwYXRoIGQ9Ik0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NCIvPjxwYXRoIGQ9Ik0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48L3N2Zz4=",
  questions: [],
  items: [
    {
      name: "Core",
      items: [
        {
          name: "One Liner",
          detail: {
            purpose: "Describe this team in one or two sentences in tagline format.",
            instructions: "REPLACE ME with a tagline describing this team.",
            document: "TEAM",
            section: "Team Name",
          },
        },
        {
          name: "Capabilities",
          detail: {
            purpose: "Describe the capabilities of this team.",
            instructions: "REPLACE ME with a description of the capabilities of this team. Include information as to the available skill sets, languages, specialties, etc.",
            document: "TEAM",
            section: "Team Name#Capabilities",
          },
        },
        {
          name: "Responsibilities",
          detail: {
            purpose: "List the responsibilities of this team.",
            instructions: "REPLACE ME with a list if the responsibilities of this team. List and link to applicable systems, products, teams, etc.",
            document: "TEAM",
            section: "Team Name#Responsibilities",
          },
        },
        {
          name: "Leadership",
          detail: {
            purpose: "List the team's leadership.",
            instructions: "REPLACE ME with a list if the team's leadership. Include position, title, name, timezone, contact information, etc.",
            document: "TEAM",
            section: "Team Name#Leadership",
          },
        },
        {
          name: "Membership",
          detail: {
            purpose: "List the team's membership.",
            instructions: "REPLACE ME with a list if the team's membership. Include position, title, name, timezone, contact information, etc.",
            document: "TEAM",
            section: "Team Name#Membership",
          },
        },
        {
          name: "Stakeholders",
          detail: {
            purpose: "List the team's stakeholders.",
            instructions: "REPLACE ME with a list if the team's stakeholders. Include position, title, name, timezone, contact information, reason they are a stakeholder, focus, etc.",
            document: "TEAM",
            section: "Team Name#Membership",
          },
        },
        {
          name: "Projects",
          detail: {
            purpose: "List the projects assigned to this team.",
            instructions: "REPLACE ME with a list if the projects assigned to this team, including any schedules and updates.",
            document: "TEAM",
            section: "Team Name#Projects",
          },
        },
        {
          name: "Links",
          detail: {
            purpose: "List relevant team links.",
            instructions: "REPLACE ME with a list of links applicable to the team. Include links to team systems, products, repositories, project management software, specifications, decisions, meeting notes, calendar(s), etc.",
            document: "TEAM",
            section: "Team Name#Membership",
          },
        },
      ],
    },
    {
      name: "Team",
      items: [
        {
          name: "Roles",
          detail: {
            purpose: "List the roles available on this team.",
            instructions: "REPLACE ME with a list if the roles available on this team.",
            document: "INTERNALS",
            section: "Team Name#Roles",
          },
        },
        {
          name: "Responsibilities",
          detail: {
            purpose: "List the responsibilities available on this team.",
            instructions: "REPLACE ME with a list if the responsibilities available on this team, including what role(s) fill those responsibilities.",
            document: "INTERNALS",
            section: "Team Name#Responsibilities",
          },
        },
        {
          name: "Meeting Notes",
          detail: {
            purpose: "List the links to meeting notes.",
            instructions: "REPLACE ME with a list of links to meeting notes.",
            document: "INTERNALS",
            section: "Team Name#Meeting Notes",
          },
        },
        {
          name: "Retrospective Highlights",
          detail: {
            purpose: "List the links to retrospective highlights.",
            instructions: "REPLACE ME with a list of links to retrospective highlights.",
            document: "INTERNALS",
            section: "Team Name#Retrospective Highlights",
          },
        },
        {
          name: "Communication Plans",
          items: [
            {
              name: "Stakeholders",
              detail: {
                purpose: "Describe the plan to communicate with stakeholders.",
                instructions: "REPLACE ME with a description of the plan to communicate with stakeholders. Include information such as the frequency, format, type of information shared, rules, restrictions, authorized communicators and communication channels, etc.",
                document: "INTERNALS",
                section: "Team Name#Communication Plan#Stakeholders",
              },
            },
            {
              name: "Leadership",
              detail: {
                purpose: "Describe the plan to communicate with leadership.",
                instructions: "REPLACE ME with a description of the plan to communicate with leadership. Include information such as the frequency, format, type of information shared, rules, restrictions, authorized communicators and communication channels, etc.",
                document: "INTERNALS",
                section: "Team Name#Communication Plan#Leadership",
              },
            },
            {
              name: "Customers",
              detail: {
                purpose: "Describe the plan to communicate with customers.",
                instructions: "REPLACE ME with a description of the plan to communicate with customers. Include information such as the frequency, format, type of information shared, rules, restrictions, authorized communicators and communication channels, etc.",
                document: "INTERNALS",
                section: "Team Name#Communication Plan#Customers",
              },
            },
            {
              name: "Support",
              detail: {
                purpose: "Describe the plan to communicate with support.",
                instructions: "REPLACE ME with a description of the plan to communicate with support. Include information such as the frequency, format, type of information shared, rules, restrictions, authorized communicators and communication channels, etc.",
                document: "INTERNALS",
                section: "Team Name#Communication Plan#Support",
              },
            },
            {
              name: "Marketing",
              detail: {
                purpose: "Describe the plan to communicate with marketing.",
                instructions: "REPLACE ME with a description of the plan to communicate with marketing. Include information such as the frequency, format, type of information shared, rules, restrictions, authorized communicators and communication channels, etc.",
                document: "INTERNALS",
                section: "Team Name#Communication Plan#Marketing",
              },
            },
          ]
        },
      ],
    },
    {
      name: "Software Development",
      items: [
        {
          name: "Process",
          detail: {
            purpose: "Describe the software development process.",
            instructions: "REPLACE ME with a description of the software development process that this team uses. Include information about how software is developed, tickets created, controls implemented, etc.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Process",
          },
        },
        {
          name: "Project Management",
          detail: {
            purpose: "Describe and link to the project management software that is used.",
            instructions: "REPLACE ME with a description of and link to the project management software used in the software development process.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Project Management",
          },
        },
        {
          name: "Investigation Ticket Requirements",
          detail: {
            purpose: "List and describe investigation implementation ticket requirements.",
            instructions: "REPLACE ME with a list and description of any investigation ticket (e.g. spikes) requirements. This can include process, scope, documentation, or other requirements.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Investigation Ticket Requirements",
          },
        },
        {
          name: "Bug Fix Ticket Requirements",
          detail: {
            purpose: "List and describe bug fix ticket requirements.",
            instructions: "REPLACE ME with a list and description of any bug fix ticket requirements. This can include items that must be addressed prior to a ticket being ready, reproduction steps, standing requirements, etc.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Bug Fix Ticket Requirements",
          },
        },
        {
          name: "Implementation Ticket Requirements",
          detail: {
            purpose: "List and describe implementation ticket requirements.",
            instructions: "REPLACE ME with a list and description of any implementation ticket (e.g. story) requirements. This can include items that must be addressed prior to a ticket being ready, standing requirements, etc.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Implementation Ticket Requirements",
          },
        },
        {
          name: "Definition of Ready",
          detail: {
            purpose: "Define when a ticket is ready to be worked.",
            instructions: "REPLACE ME with a definition of when a ticket is ready to be worked. This can include elements like describing information or fields that must be present, processes that must be followed, reviews that must be complete, etc.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Definition of Ready",
          },
        },
        {
          name: "Definition of Done",
          detail: {
            purpose: "Define when a ticket is considered complete.",
            instructions: "REPLACE ME with a definition of when a ticket is considered complete. This can include elements like describing processes that must have occurred, verification or validation that must be completed, communications that must be sent, etc.",
            document: "SOFTWARE_DEVELOPMENT",
            section: "Team Name#Definition of Done",
          },
        },
      ],
    },
    {
      name: "Engineering",
      items: [
        {
          name: "Code Style Guide",
          detail: {
            purpose: "Describe the code style that this team adheres to.",
            instructions: "REPLACE ME with a description of the code style(s) that this team adheres to.",
            document: "ENGINEERING",
            section: "Team Name#Code Style Guide",
          },
        },
        {
          name: "Code Standards",
          detail: {
            purpose: "Describe the code standards that this team adheres to.",
            instructions: "REPLACE ME with a description of the code standard(s) that this team adheres to.",
            document: "ENGINEERING",
            section: "Team Name#Code Standards",
          },
        },
        {
          name: "Planning Agreement",
          detail: {
            purpose: "Describe the planning agreement that this team adheres to.",
            instructions: "REPLACE ME with a description of the planning agreement that this team adheres to. Include items such as required issue fields, what technical decisions require review (and by whom) prior to implementation, what and how to document a spike or investigation ticket, etc.",
            document: "ENGINEERING",
            section: "Team Name#Planning Agreement",
          },
        },
        {
          name: "Pull Request Agreement",
          detail: {
            purpose: "Describe the pull request agreement that this team adheres to.",
            instructions: "REPLACE ME with a description of the pull request agreement that this team adheres to. Include items such as required pull request description fields, pre-review expectations, testing expectations, review turn around timelines, etc.",
            document: "ENGINEERING",
            section: "Team Name#Pull Request Agreement",
          },
        },
      ],
    },
    {
      name: "Testing",
      items: [
        {
          name: "Strategy",
          detail: {
            purpose: "Describe the testing strategy that this team adheres to.",
            instructions: "REPLACE ME with a description of or link to the testing strategy that this team adheres to.",
            document: "TESTING",
            section: "Team Name#Strategy",
          },
        },
        {
          name: "Plan(s)",
          detail: {
            purpose: "Describe the testing plan(s) that this team uses.",
            instructions: "REPLACE ME with a description of or link to the testing plan(s) that this team uses.",
            document: "TESTING",
            section: "Team Name#Plan",
          },
        },
        {
          name: "Test Cases",
          detail: {
            purpose: "List or link to the test cases managed by this team.",
            instructions: "REPLACE ME with a list or link to the test cases managed by this team.",
            document: "TESTING",
            section: "Team Name#Plan",
          },
        },
      ],
    },
    {
      name: "Releasing and Deployment",
      items: [
        {
          name: "Release Calendar",
          detail: {
            purpose: "List the previous and upcoming releases.",
            instructions: "REPLACE ME with a list of previous and upcoming releases, preferably in a calendar format.",
            document: "RELEASING_AND_DEPLOYMENT",
            section: "Team Name#Calendar",
          },
        },
        {
          name: "Release Checklist",
          detail: {
            purpose: "List the steps to follow to release.",
            instructions: "REPLACE ME with a list of steps needed to release. Provide links to product and/or system release documentation.",
            document: "RELEASING_AND_DEPLOYMENT",
            section: "Team Name#Release",
          },
        },
        {
          name: "Deployment Checklist",
          detail: {
            purpose: "List the steps to follow to deploy.",
            instructions: "REPLACE ME with a list of steps needed to deploy. Provide links to product and/or system deployment documentation.",
            document: "RELEASING_AND_DEPLOYMENT",
            section: "Team Name#Deploy",
          },
        },
        {
          name: "Rollback Checklist",
          detail: {
            purpose: "List the steps to follow to roll back.",
            instructions: "REPLACE ME with a list of steps needed to roll back. Provide links to product and/or system roll back documentation.",
            document: "RELEASING_AND_DEPLOYMENT",
            section: "Team Name#Rollback",
          },
        },
      ],
    },
    {
      name: "Operations",
      items: [
        {
          name: "On Call",
          detail: {
            purpose: "List or link to the on-call information and schedule.",
            instructions: "REPLACE ME with a list or link to the on-call information and schedule.",
            document: "OPERATIONS",
            section: "Team Name#On Call",
          },
        },
        {
          name: "Incident Response",
          items: [
            {
              name: "Incident Response Plan",
              detail: {
                purpose: "Link to or detail the incident response plan.",
                instructions: "REPLACE ME with a link to or detail the incident response plan.",
                document: "OPERATIONS",
                section: "Team Name#Incident Response Plan",
              },
            },
            {
              name: "Incident Response Checklist",
              detail: {
                purpose: "List the steps to follow in case of an incident.",
                instructions: "REPLACE ME with a list of steps to follow in case of an incident.",
                document: "OPERATIONS",
                section: "Team Name#Incident Response Checklist",
              },
            },
          ],
        },
        {
          name: "Bugs and Issues",
          detail: {
            purpose: "Describe the process for submitting and handling bugs or other issues.",
            instructions: "REPLACE ME with a description of the process for submitting and handling bugs or other issues.",
            document: "OPERATIONS",
            section: "Team Name#Bugs and Issues",
          },
        },
        {
          name: "Runbooks",
          detail: {
            purpose: "List out and link to runbooks used by this team.",
            instructions: "REPLACE ME with a list of runbooks and the links to each of them.",
            document: "OPERATIONS",
            section: "Team Name#Runbooks",
          },
        },
        {
          name: "Monitoring",
          detail: {
            purpose: "List out and link to monitoring systems used by the team.",
            instructions: "REPLACE ME with a list of monitoring systems and the links to each of them. This should end up pointing to the system monitoring information for the systems that this team is in charge of.",
            document: "OPERATIONS",
            section: "Team Name#Monitoring",
          },
        },
        {
          name: "Alerting",
          detail: {
            purpose: "List out and link to alerting systems used by the team.",
            instructions: "REPLACE ME with a list of alerting systems and the links to each of them. This should end up pointing to the system alerting information for the systems that this team is in charge of.",
            document: "OPERATIONS",
            section: "Team Name#Alerting",
          },
        },
        {
          name: "System Access",
          detail: {
            purpose: "Describe or link to the process for accessing systems managed by this team.",
            instructions: "REPLACE ME with a description or link to the process for accessing systems managed by this team.",
            document: "OPERATIONS",
            section: "Team Name#System Access",
          },
        },
        {
          name: "Feature Flags",
          detail: {
            purpose: "Describe the process for managing feature flags.",
            instructions: "REPLACE ME with a description of the process for managing feature flags. Include information on and the process for how to create them, enable/disable them, etc. Also include a link to the feature flag system.",
            document: "OPERATIONS",
            section: "Team Name#Feature Flags",
          },
        },
        {
          name: "Disaster Recovery",
          detail: {
            purpose: "Describe or link to the process for handling disaster recovery.",
            instructions: "REPLACE ME with a description of or link to the process for handling disaster recovery.",
            document: "OPERATIONS",
            section: "Team Name#Disaster Recovery",
          },
        },
        {
          name: "Maintenance",
          detail: {
            purpose: "Describe or link to the maintenance procedures for systems and/or products managed by this team.",
            instructions: "REPLACE ME with a description of or link to the maintenance procedures for systems and/or products managed by this team.",
            document: "OPERATIONS",
            section: "Team Name#Maintenance",
          },
        },
      ],
    },
    {
      name: "Onboarding and Offboarding",
      items: [
        {
          name: "Onboarding",
          items: [
            {
              name: "Checklist",
              detail: {
                purpose: "List tasks that must be completed prior to, when, and after adding a new person to the team.",
                instructions: "REPLACE ME with a list of tasks that must be completed prior to, when, and after adding a new person to the team.",
                document: "ONBOARDING",
                section: "Team Name#Checklist",
              },
            },
            {
              name: "Local Env Setup",
              detail: {
                purpose: "Describe how to setup the local environment for a team member.",
                instructions: "REPLACE ME with a description of how to setup the local environment for a team member.",
                document: "ONBOARDING",
                section: "Team Name#Local Env Setup",
              },
            },
            {
              name: "Tools",
              detail: {
                purpose: "Describe how to get access to and setup the tools used by the team.",
                instructions: "REPLACE ME with a description of how to get access to and setup the tools used by the team.",
                document: "ONBOARDING",
                section: "Team Name#Tools",
              },
            },
            {
              name: "Products",
              detail: {
                purpose: "Describe how to get access to the products used by the team.",
                instructions: "REPLACE ME with a description of how to get access to the products used by the team.",
                document: "ONBOARDING",
                section: "Team Name#Products",
              },
            },
            {
              name: "Systems",
              detail: {
                purpose: "Describe how to get access to the systems used by the team.",
                instructions: "REPLACE ME with a description of how to get access to the systems used by the team.",
                document: "ONBOARDING",
                section: "Team Name#Systems",
              },
            },
          ],
        },
        {
          name: "Offboarding",
          items: [
            {
              name: "Checklist",
              detail: {
                purpose: "List tasks that must be completed prior to, when, and after removing a new person to the team.",
                instructions: "REPLACE ME with a list of tasks that must be completed prior to, when, and after removing a new person to the team.",
                document: "OFFBOARDING",
                section: "Team Name#Checklist",
              },
            },
          ],
        }
      ],
    },
  ],
};

export default subject;