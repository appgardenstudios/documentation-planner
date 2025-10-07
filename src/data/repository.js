const INTERNAL = "Internal"
const EXTERNAL = "External"
const LIBRARY = "Library"
const APPLICATION = "Application"
const API = "API"
const INFRASTRUCTURE = "Infrastructure"
const INSTALLED = "Installed"
const DEPLOYED = "Deployed"
const CALLED = "Called"

/**
 * @type {import(".").Subject}
 */
const subject = {
  name: "Repository",
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1naXQyLWljb24gbHVjaWRlLWZvbGRlci1naXQtMiI+PHBhdGggZD0iTTkgMjBINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgzLjlhMiAyIDAgMCAxIDEuNjkuOWwuODEgMS4yYTIgMiAwIDAgMCAxLjY3LjlIMjBhMiAyIDAgMCAxIDIgMnY1Ii8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMiIgcj0iMiIvPjxwYXRoIGQ9Ik0xOCAxOWMtMi44IDAtNS0yLjItNS01djgiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE5IiByPSIyIi8+PC9zdmc+",
  questions: [
    {
      question: "What is the visibility of this repository? Select all that apply.",
      attributes: [
        { name: "Internal", value: INTERNAL },
        { name: "External (public facing)", value: EXTERNAL },
      ],
    },
    {
      question: "What type(s) of software does this repository contain? Select all that apply.",
      attributes: [
        { name: "Library", value: LIBRARY },
        { name: "Application", value: APPLICATION },
        { name: "Callable API (HTTP or SDK)", value: API },
        { name: "Infrastructure as Code", value: INFRASTRUCTURE },
      ],
    },
    {
      question: "How is the software in this repository used? Select all that apply.",
      attributes: [
        { name: "Installed", value: INSTALLED },
        { name: "Deployed", value: DEPLOYED },
        { name: "Called", value: CALLED },
      ],
    },
  ],
  items: [
    {
      name: "Core",
      items: [
        {
          name: "One Liner",
          detail: {
            purpose: "Describe the purpose of this repository in on or two sentences in a tagline format.",
            instructions: "REPLACE ME with the tagline",
            document: "README",
            section: "Repo Name",
          }
        },
        {
          name: "Description",
          detail: {
            purpose: "A longer description of the contents of this repository.",
            instructions: "REPLACE ME with a description of this software",
            document: "README",
            section: "Repo Name",
          },
        },
        {
          name: "Background",
          detail: {
            purpose: "Background information useful for understanding why the repository was created or needed.",
            instructions: "REPLACE ME with the background information about why this repository was created and the story behind it",
            document: "README",
            section: "Repo Name",
          },
        },
      ],
    },
    {
      name: "Marketing",
      items: [
        {
          name: "Status Badges",
          items: [
            {
              name: "Test Status",
              detail: {
                purpose: "Show if the software is currently passing or failing so that people can see that automated tests are being run and passing.",
                instructions: "REPLACE ME with a badge showing the current test status",
                document: "README",
                attributes: [EXTERNAL],
              },
            },
            {
              name: "Test Coverage",
              detail: {
                purpose: "Show the current percentage of test coverage so people can feel confident using this software.",
                instructions: "REPLACE ME with a badge showing the current test coverage percentage",
                document: "README",
                attributes: [EXTERNAL],
              },
            },
          ],
        },
        {
          name: "Benefits",
          detail: {
            purpose: "List the benefits the software in this repository has so that people can understand how the software can help them.",
            instructions: "REPLACE ME with a summary and/or list of benefits that this software provides",
            document: "README",
            section: "Repo Name",
          },
        },
        {
          name: "Features",
          detail: {
            purpose: "List the features the software in this repository has so that people can understand what the software does.",
            instructions: "REPLACE ME with a list of the most important features",
            document: "README",
            section: "Repo Name",
          },
        },
        {
          name: "Demo Screenshot/Video",
          detail: {
            purpose: "Show the software in action so that people can understand what the software does.",
            instructions: "REPLACE ME with one or more GIFs or still screenshots of the software in action",
            document: "README",
            attributes: [EXTERNAL],
            section: "Repo Name",
          },
        },
        {
          name: "Demo Link",
          detail: {
            purpose: "Link to a demo of the software in action so that people can see and try the software.",
            instructions: "REPLACE ME with a link to a live demo",
            document: "README",
            attributes: [EXTERNAL, APPLICATION],
            section: "Repo Name",
          },
        },
        {
          name: "Usage Example",
          detail: {
            purpose: "Show people what using this library looks like.",
            instructions: "REPLACE ME with a code block showing a simple example of how to use this library.",
            document: "README",
            attributes: [EXTERNAL, LIBRARY],
            section: "Repo Name",
          },
        },
        {
          name: "Change Log",
          detail: {
            purpose: "Show people information about current and past releases.",
            instructions: "REPLACE ME with a link to the changelog.",
            document: "README",
            section: "Repo Name",
          },
        },
        {
          name: "License",
          detail: {
            purpose: "Show people the license that this software is licensed under",
            instructions: "REPLACE ME with a link to the license.",
            document: "README",
            section: "License",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Roadmap",
          detail: {
            purpose: "Describe the future plans and direction for this software.",
            instructions: "REPLACE ME with a list of future features and/or a link to the roadmap.",
            document: "README",
            section: "Repo Name",
            attributes: [EXTERNAL],
          },
        },
      ],
    },
    {
      name: "Using",
      items: [
        {
          name: "Usage Examples",
          detail: {
            purpose: "Show how to use the various features of this library.",
            instructions: "REPLACE ME with one or more code blocks showing how to use the main APIs this library provides",
            document: "README",
            section: "Repo Name#Using",
            attributes: [LIBRARY],
          },
        },
        {
          name: "Download Instructions",
          detail: {
            purpose: "Let the person know how to download this software.",
            instructions: "REPLACE ME with a description of how to download this software, along with a link.",
            document: "README",
            section: "Repo Name#Using",
            attributes: [INSTALLED],
          },
        },
        {
          name: "Installation Instructions",
          detail: {
            purpose: "Let the person know how to install this software.",
            instructions: "REPLACE ME with a description of how to install this software.",
            document: "README",
            section: "Repo Name#Using",
            attributes: [INSTALLED],
          },
        },
        {
          name: "Deployment Instructions",
          detail: {
            purpose: "Let the person know how to deploy this software.",
            instructions: "REPLACE ME with a list of instructions on how to deploy this software (or provide a link).",
            document: "README",
            section: "Repo Name#Using",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Support Information",
          detail: {
            purpose: "Let the person know how they can get support.",
            instructions: "REPLACE ME with a description of how to get support or file a ticket. Also provide one or more links.",
            usage: "For open source repositories this will probably be a link to the repository issues along with some basic instructions. For commercial software this will probably be a link to customer support/success.",
            document: "README",
            section: "Repo Name#Using",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "API Documentation",
          detail: {
            purpose: "Document the API interfaces of this application.",
            instructions: "REPLACE ME with a detailed set of documentation covering the API.",
            document: "README",
            section: "Repo Name#Using",
            attributes: [API],
          },
        },
        {
          name: "API Documentation Link",
          detail: {
            purpose: "Link to the API documentation for this application.",
            instructions: "REPLACE ME with a link to the API documentation.",
            document: "README",
            section: "Repo Name#Using",
            attributes: [API],
          },
        },
        {
          name: "Change Log",
          detail: {
            purpose: "Provide a list of changes for each release.",
            instructions: "REPLACE ME with a list of changes for each release.",
            document: "CHANGELOG",
            section: "Repo Name#Using",
          },
        },
        {
          name: "License",
          detail: {
            purpose: "Detail the license that this software is provided under.",
            instructions: "REPLACE ME with a standard license.",
            document: "LICENSE",
          },
        },
      ],
    },
    {
      name: "Developing",
      items: [
        {
          name: "Architecture",
          items: [
            {
              name: "Architecture",
              detail: {
                purpose: "Describe the high level architecture of the software in this repository.",
                instructions: "REPLACE ME with a high level summary of the architecture of the software, focusing on the 1-3 key items a developer should be aware of.",
                document: "ARCHITECTURE",
              },
            },
            {
              name: "Birds-Eye View",
              detail: {
                purpose: "Provide a high level overview of the repository and how it is laid out.",
                instructions: "REPLACE ME with a high level description of how the code is laid out.",
                document: "ARCHITECTURE",
                section: "Overview",
              },
            },
            {
              name: "Code-Map",
              detail: {
                purpose: "List key code files and/or entry points and document their use and purpose.",
                instructions: "REPLACE ME with a list of the key code files and or entry points. For each one describe their use, purpose, and any other details that are essential to understand.",
                document: "ARCHITECTURE",
                section: "Code Map",
              },
            },
            {
              name: "Cross-Cutting Concerns",
              items: [
                {
                  name: "Cross-Cutting Concerns",
                  detail: {
                    purpose: "Describe how cross-cutting concerns, such as logging and telemetry, are handled.",
                    instructions: "REPLACE ME with a high-level description of how cross-cutting concerns are handled (i.e. shared lib, injection, auto-instrumentation, etc).",
                    document: "ARCHITECTURE",
                    section: "Cross Cutting Concerns",
                  },
                },
                {
                  name: "Logging",
                  detail: {
                    purpose: "Describe how logging is handled.",
                    instructions: "REPLACE ME with a description of how logging is to be handled, including setting/using appropriate logging levels, what to log, how to avoid logging sensitive information, etc. Also describe how logs are collected (if applicable).",
                    document: "ARCHITECTURE",
                    section: "Cross Cutting Concerns#Logging",
                  },
                },
                {
                  name: "Error Handling",
                  detail: {
                    purpose: "Describe how errors are handled.",
                    instructions: "REPLACE ME with a description of how errors are handled internally and surfaced externally. Provide a summary of the philosophy behind the logging methodology, as well as examples where appropriate. Also describe how errors are collected and monitored (if applicable).",
                    document: "ARCHITECTURE",
                    section: "Cross Cutting Concerns#Error Handling",
                  },
                },
              ],
            },
            {
              name: "Design Decisions",
              detail: {
                purpose: "List any design decisions or invariants that a developer must be aware of when developing the software.",
                instructions: "REPLACE ME with a list of important design decisions or invariants that are to be kept in mind when developing.",
                document: "ARCHITECTURE",
                section: "Design Decisions",
              },
            },
            {
              name: "Scope",
              detail: {
                purpose: "Define the scope and system boundaries of the software, specifying what it should and should not do.",
                instructions: "REPLACE ME with a list of what is and is not in scope of the software, including any boundaries in the case of a deployed system.",
                document: "ARCHITECTURE",
                section: "Scope",
              },
            },
            {
              name: "Secrets",
              detail: {
                purpose: "Define how secrets are treated and handled when developing and/or using the software.",
                instructions: "REPLACE ME with a summary of how secrets are handled, including how they are passed in on startup, handled internally, and/or output.",
                document: "ARCHITECTURE",
                section: "Secrets",
              },
            },
          ],
        },
        {
          name: "Running",
          items: [
            {
              name: "One Liner",
              detail: {
                purpose: "Information on how to run the software when developing.",
                instructions: "REPLACE ME with a one-liner describing where the software is run when developing it",
                document: "README",
                section: "Repo Name#Developing",
              },
            },
            {
              name: "Prerequisites",
              detail: {
                purpose: "List any prerequisites required to run or develop the software locally.",
                instructions: "REPLACE ME with a list of the prerequisites that I need to satisfy before running this software while developing it. Include secrets, permissions, software required, etc...",
                document: "README",
                section: "Repo Name#Developing#Prerequisites",
              },
            },
            {
              name: "Installation",
              detail: {
                purpose: "List how to install the software and any dependencies required to run and develop locally.",
                instructions: "REPLACE ME with a set of steps to install the software so it can be run for development.",
                document: "README",
                section: "Repo Name#Developing#Installation",
              },
            },
            {
              name: "Running",
              detail: {
                purpose: "Describe how to run the software locally, or how to run the software when developing or debugging.",
                instructions: "REPLACE ME with a set of steps to run the software for development.",
                document: "README",
                section: "Repo Name#Developing#Running",
              },
            },
            {
              name: "Debugging",
              detail: {
                purpose: "Describe how to run the software in debug mode and/or attach a debugger to the software for local development.",
                instructions: "REPLACE ME with a description and steps of how to run in debug mode or attach a debugger to the software for development.",
                document: "README",
                section: "Repo Name#Developing#Debugging",
              },
            },
          ],
        },
        {
          name: "Testing",
          items: [
            {
              name: "Testing",
              detail: {
                purpose: "Provide the information needed to understand how to create and run tests.",
                instructions: "REPLACE ME with a one-liner describing how testing works.",
                examples: [
                  {
                    example: "Unit and e2e tests are run on each PR, and a full manual regression is done on each RC prior to deployment",
                  }
                ],
                document: "README",
                section: "Repo Name#Testing",
              },
            },
            {
              name: "Overview",
              detail: {
                purpose: "Describe the testing philosophy, what types of tests exist, and how to manage tests.",
                instructions: "REPLACE ME with a description on the overall testing philosophy, including what types of tests exist, what they intent to test, and how to manage tests",
                document: "README",
                section: "Repo Name#Testing",
              },
            },
            {
              name: "Prerequisites",
              detail: {
                purpose: "List out the prerequisites that are needed to run the tests.",
                instructions: "REPLACE ME with a list of the prerequisites that I need to run the tests, including permissions, test data, configuration, etc...",
                document: "README",
                section: "Repo Name#Testing#Prerequisites",
              },
            },
            {
              name: "Running",
              detail: {
                purpose: "Describe how to run tests against the software.",
                instructions: "REPLACE ME with a list of steps showing how to run the various tests available.",
                document: "README",
                section: "Repo Name#Testing#Running",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Operating",
      items: [
        {
          name: "Releasing",
          items: [
            {
              name: "Releasing",
              detail: {
                purpose: "Describe the release process.",
                instructions: "REPLACE ME with a high-level description of the release process.",
                document: "README",
                section: "Repo Name#Releasing",
              },
            },
            {
              name: "Instructions",
              detail: {
                purpose: "List out the steps followed to release the software, including both automated and manual steps.",
                instructions: "REPLACE ME with a list of steps needed to follow to release the software.",
                document: "README",
                section: "Repo Name#Releasing#Instructions",
              },
            },
            {
              name: "Versioning",
              detail: {
                purpose: "Describe the versioning methodology used.",
                instructions: "REPLACE ME with a description of how versions are calculated and/or assigned.",
                document: "README",
                section: "Repo Name#Releasing#Versioning",
              },
            },
            {
              name: "Release Notes",
              detail: {
                purpose: "Describe how release notes are collected and published.",
                instructions: "REPLACE ME with a description of how release notes are collected and published. Also include a link to the release notes.",
                document: "README",
                section: "Repo Name#Releasing#Release Notes",
              },
            },
            {
              name: "Change Log",
              detail: {
                purpose: "Describe how a changelog is produced.",
                instructions: "REPLACE ME with a description of how the changelog is produced.",
                document: "README",
                section: "Repo Name#Releasing#Change Log",
              },
            },
          ],
        },
        {
          name: "Deploying",
          items: [
            {
              name: "Deploying",
              detail: {
                purpose: "Describe the deployment process",
                instructions: "REPLACE ME with a one-liner or high-level description of the deployment process.",
                document: "README",
                section: "Repo Name#Deploying",
                attributes: [DEPLOYED],
              },
            },
            {
              name: "Targets/Environments",
              detail: {
                purpose: "Describe the various deployment targets and/or environments.",
                instructions: "REPLACE ME with a list if the deployment targets and/or environments. For each one list its identifier, purpose, and include a link to the software running in that environment (if applicable)",
                document: "README",
                section: "Repo Name#Deploying#Targets",
                attributes: [DEPLOYED],
              },
            },
            {
              name: "Instructions",
              detail: {
                purpose: "List out the steps (manual and automated) to deploy to a specific environment.",
                instructions: "REPLACE ME with a list of steps to deploy to a target environment",
                document: "README",
                section: "Repo Name#Deploying#Instructions",
                attributes: [DEPLOYED],
              },
            },
          ],
        },
        {
          name: "Monitoring",
          detail: {
            purpose: "Describe how this software is monitored.",
            instructions: "REPLACE ME with a description of how this software is monitored. Include a link to the monitoring software if possible.",
            document: "README",
            section: "Repo Name#Monitoring",
            attributes: [INTERNAL, DEPLOYED],
          },
        },
      ],
    },
    {
      name: "Contributing",
      items: [
        {
          name: "Owner",
          detail: {
            purpose: "List the owner(s)/maintainer(s) of this repository.",
            instructions: "REPLACE ME with a list or link to the owner(s)/maintainer(s) of this repository.",
            document: "README",
            section: "Repo Name#Owner",
            attributes: [INTERNAL],
          },
        },
        {
          name: "Contributing",
          detail: {
            purpose: "Provide a high-level invitation to contribute.",
            instructions: "REPLACE ME with a high-level invitation to contribute.",
            document: "CONTRIBUTING",
          },
        },
        {
          name: "Who Can Contribute",
          detail: {
            purpose: "Provide a list of requirements that must be met to contribute.",
            instructions: "REPLACE ME with a list of requirements that must be met to contribute.",
            document: "CONTRIBUTING",
            section: "Contributing",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "How to Contribute",
          detail: {
            purpose: "Describe how a person can contribute.",
            instructions: "REPLACE ME with a description on how to contribute.",
            document: "CONTRIBUTING",
            section: "Contributing",
          },
        },
        {
          name: "Licensing",
          detail: {
            purpose: "Describe how contributions will be licensed",
            instructions: "REPLACE ME with a description of how contributions will be licensed, including any instructions or restrictions on contributing content (including AI generated content)",
            document: "CONTRIBUTING",
            section: "Contributing#Licensing",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Code Style",
          detail: {
            purpose: "Describe or provide a link to the code style(s) that contributors should abide by.",
            instructions: "REPLACE ME with a link or list of code styles that contributors should abide by.",
            document: "CONTRIBUTING",
            section: "Contributing#Code Style",
          },
        },
        {
          name: "Issues",
          detail: {
            purpose: "Describe the process for creating, assigning, and resolving issues.",
            instructions: "REPLACE ME with instructions for creating, assigning, and resolving issues. Include a description of the overall workflow and a link to where issues should be created.",
            document: "CONTRIBUTING",
            section: "Contributing#Issues",
          },
        },
        {
          name: "Commits",
          detail: {
            purpose: "Describe the requirements around commits and commit messages",
            instructions: "REPLACE ME with instructions on how to format and use commits, including specific commit message formatting and/or commit sizes.",
            document: "CONTRIBUTING",
            section: "Contributing#Commits",
          },
        },
        {
          name: "Pull Requests",
          detail: {
            purpose: "Describe how to create pull requests, including contents, assignees, and overall workflow.",
            instructions: "REPLACE ME with a description of how this project uses pull requests. Include instructions for creating/submitting pull requests, what should/should not be included, and the process for approving and merging. Also include a link to the pull request template if applicable.",
            document: "CONTRIBUTING",
            section: "Contributing#Pull Requests",
          },
        },
        {
          name: "Contributing Link",
          detail: {
            purpose: "Provide a link to the contributing document in the README",
            instructions: "REPLACE ME with an invitation to contribute and a link to the CONTRIBUTING document",
            document: "README",
            section: "Repo Name#Contributing",
          },
        },
        {
          name: "Authors",
          detail: {
            purpose: "List the authors and/or notable contributors of the software in this repository",
            instructions: "REPLACE ME with a list of notable authors and/or contributors. List the role for each individual or entity.",
            document: "README",
            section: "Repo Name#Contributors",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Acknowledgements",
          detail: {
            purpose: "List any acknowledgements needed.",
            instructions: "REPLACE ME with a list of acknowledgements for major contributions, inspiration, original work, etc.",
            document: "README",
            section: "Repo Name#Acknowledgements",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Code of Conduct",
          detail: {
            purpose: "Lay out a code of conduct that contributors should abide by.",
            instructions: "REPLACE ME with a code of conduct that contributors should abide by.",
            document: "CODE_OF_CONDUCT",
            attributes: [EXTERNAL],
          },
        },
        {
          name: "Reporting Security Issues",
          detail: {
            purpose: "Describe how to report security issues.",
            instructions: "REPLACE ME with instructions on how to submit security issues, including a link or email address if applicable.",
            document: "README",
            section: "Repo Name#Security Issues",
            attributes: [EXTERNAL],
          },
        },
      ],
    },
  ],
};

export default subject;