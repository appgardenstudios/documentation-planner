const ATTR_EXTERNAL = "External";
const ATTR_LIBRARY = "Library";
const ATTR_APPLICATION = "Application";
const ATTR_API = "API";
const ATTR_INFRASTRUCTURE = "Infrastructure";
const ATTR_INSTALLED = "Installed";
const ATTR_DEPLOYED = "Deployed";

const DOC_README = "README";
const DOC_ARCHITECTURE = "ARCHITECTURE";
const DOC_CHANGELOG = "CHANGELOG";
const DOC_ROADMAP = "ROADMAP";
const DOC_CONTRIBUTING = "CONTRIBUTING";
const DOC_CODE_OF_CONDUCT = "CODE_OF_CONDUCT";
const DOC_LICENSE = "LICENSE";

/**
 * @type {import(".").Subject}
 */
const subject = {
  name: "Repository",
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1naXQyLWljb24gbHVjaWRlLWZvbGRlci1naXQtMiI+PHBhdGggZD0iTTkgMjBINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgzLjlhMiAyIDAgMCAxIDEuNjkuOWwuODEgMS4yYTIgMiAwIDAgMCAxLjY3LjlIMjBhMiAyIDAgMCAxIDIgMnY1Ii8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMiIgcj0iMiIvPjxwYXRoIGQ9Ik0xOCAxOWMtMi44IDAtNS0yLjItNS01djgiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE5IiByPSIyIi8+PC9zdmc+",
  questions: [
    {
      question: "Who can see this repository? Select all that apply.",
      attributes: [
        { name: "People outside the company (public facing, open source, etc)", value: ATTR_EXTERNAL },
      ],
    },
    {
      question: "What type(s) of software does this repository contain? Select all that apply.",
      attributes: [
        { name: "Library", value: ATTR_LIBRARY },
        { name: "Application", value: ATTR_APPLICATION },
        { name: "Callable API (HTTP, SDK, CLI)", value: ATTR_API },
        { name: "Infrastructure as Code", value: ATTR_INFRASTRUCTURE },
      ],
    },
    {
      question: "How is the software in this repository used? Select all that apply.",
      attributes: [
        { name: "Installed", value: ATTR_INSTALLED },
        { name: "Deployed", value: ATTR_DEPLOYED },
      ],
    },
  ],
  documents: [
    { name: DOC_README },
    { name: DOC_ARCHITECTURE },
    { name: DOC_CHANGELOG },
    { name: DOC_ROADMAP },
    { name: DOC_CONTRIBUTING },
    { name: DOC_CODE_OF_CONDUCT },
    { name: DOC_LICENSE },
  ],
  items: [
    {
      name: "Core",
      items: [
        {
          name: "One Liner",
          detail: {
            purpose: "Provide a concise, compelling, and informative explanation of that this software is, who it is for, and what value it provides.",
            instructions: "REPLACE ME with a 1-2 sentence description of what the software is or does, who it is for, and what value it provides.",
            guidance: `
The one liner is more likely to be read than any other sentence in a README or project, so it has a lot of work to do. It needs to convey who this project is for, what it does, and why they should care. It has to be short enough to be read in a few seconds, but contain enough information to answer the questions being asked by the reader.

There are several ways to craft a good one liner, and here are some formulas you can use.

**StoryBrand formula**: Create 1-2 sentences that describes the problem the user has, states that this software is a solution to that problem, and paints a picture of what their experience will be after using this software. *User has problem, software solves problem, user experiences result*.

**What it is + What it does**: A very simple statement describing what it is and what it does. *Software is a(n) X that Y*.

**Purpose + Problem**: A simple description of the purpose this software combined with the problem it solves. *Software is a(n) X for user to solve Y*.

**Description + Result**: A description of the software combined with one or more resulting benefits. *Software, a(n) X, provides Y*.

Whatever formula or process you follow, try and follow these key principles. The one liner should:
- Answer the questions of who it is for, what it does, and why they should care. Everything else can come later.
- Be clear and simple. Avoid excessive jargon or flowery language. Get right to the point and stay there.
- Be memorable and distinct. Focus on what sets this software apart from all others. Say it in a way that will resonate.
            `,
            examples: [
              {
                example: "esbuild: An extremely fast bundler for the web.",
                reference: { text: "https://github.com/evanw/esbuild", link: "https://github.com/evanw/esbuild", retrieved: "2025-10-13", },
              },
              {
                example: "Godot Engine is a feature-packed, cross-platform game engine to create 2D and 3D games from a unified interface.",
                reference: { text: "https://github.com/godotengine/godot", link: "https://github.com/godotengine/godot", retrieved: "2025-10-13", },
              },
              {
                example: "Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.",
                reference: { text: "https://github.com/prettier/prettier", link: "https://github.com/prettier/prettier", retrieved: "2025-10-13", },
              },
            ],
            references: [
              { text: "1", link: "https://skerritt.blog/make-popular-open-source-projects/#slogan-description-of-your-project-in-1-simple-line", retrieved: "2025-10-13", },
              { text: "2", link: "https://storybrand.com/", retrieved: "2025-10-13", },
              { text: "2", link: "https://www.creativeo.co/post/storybrand-one-liner-examples", retrieved: "2025-10-13", },
            ],
            document: DOC_README,
            section: "Repo Name",
          }
        },
        {
          name: "Description",
          detail: {
            purpose: "A longer description of the contents of this repository.",
            instructions: "REPLACE ME with a lengthier description of this software.",
            document: DOC_README,
            section: "Repo Name",
          },
        },
        {
          name: "Background",
          detail: {
            purpose: "Background information useful for understanding why the repository was created or needed.",
            instructions: "REPLACE ME with the background information about why this repository was created and the story behind it.",
            document: DOC_README,
            section: "Repo Name",
          },
        },
        {
          name: "License",
          detail: {
            purpose: "Describe the license under which this software is distributed.",
            instructions: "REPLACE ME with the license under which this software is distributed.",
            document: DOC_LICENSE,
          },
        },
        {
          name: "Change Log",
          detail: {
            purpose: "Provide a list of changes for each release.",
            instructions: "REPLACE ME with a list of changes for each release.",
            document: DOC_CHANGELOG,
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
                document: DOC_README,
                attributes: [ATTR_EXTERNAL],
              },
            },
            {
              name: "Test Coverage",
              detail: {
                purpose: "Show the current percentage of test coverage so people can feel confident using this software.",
                instructions: "REPLACE ME with a badge showing the current test coverage percentage.",
                document: DOC_README,
                attributes: [ATTR_EXTERNAL],
              },
            },
            {
              name: "Repository Health",
              detail: {
                purpose: "Show the current repository health or grade so people can feel confident using this software.",
                instructions: "REPLACE ME with a badge showing the current repository health or grade.",
                document: DOC_README,
                attributes: [ATTR_EXTERNAL],
              },
            },
            {
              name: "Documentation",
              detail: {
                purpose: "Show a badge linking to the current documentation.",
                instructions: "REPLACE ME with a badge linking to the current documentation.",
                document: DOC_README,
                attributes: [ATTR_EXTERNAL, ATTR_LIBRARY],
              },
            },
          ],
        },
        {
          name: "Logo",
          detail: {
            purpose: "Provide a visual icon to remember the project by.",
            instructions: "REPLACE ME with a logo for the software in the project.",
            document: DOC_README,
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Benefits",
          detail: {
            purpose: "List the benefits the software in this repository has so that people can understand how the software can help them.",
            instructions: "REPLACE ME with a summary and/or list of benefits that this software provides.",
            document: DOC_README,
            section: "Repo Name",
          },
        },
        {
          name: "Features",
          detail: {
            purpose: "List the features the software in this repository has so that people can understand what the software does.",
            instructions: "REPLACE ME with a list of the most important features.",
            document: DOC_README,
            section: "Repo Name",
          },
        },
        {
          name: "Demo Screenshot/Video",
          detail: {
            purpose: "Show the software in action so that people can understand what the software does.",
            instructions: "REPLACE ME with one or more GIFs or still screenshots of the software in action",
            document: DOC_README,
            attributes: [ATTR_EXTERNAL],
            section: "Repo Name",
          },
        },
        {
          name: "Demo Link",
          detail: {
            purpose: "Link to a demo of the software in action so that people can see and try the software.",
            instructions: "REPLACE ME with a link to a live demo.",
            document: DOC_README,
            attributes: [ATTR_EXTERNAL, ATTR_APPLICATION],
            section: "Repo Name",
          },
        },
        {
          name: "Usage Example",
          detail: {
            purpose: "Show people what using this library looks like.",
            instructions: "REPLACE ME with a code block showing a simple example of how to use this library.",
            document: DOC_README,
            attributes: [ATTR_EXTERNAL, ATTR_LIBRARY],
            section: "Repo Name",
          },
        },
        {
          name: "Change Log Link",
          detail: {
            purpose: "Show people information about current and past releases.",
            instructions: "REPLACE ME with a link to the changelog.",
            document: DOC_README,
            section: "Repo Name",
          },
        },
        {
          name: "License Link",
          detail: {
            purpose: "Show people the license that this software is licensed under.",
            instructions: "REPLACE ME with a link to the license so that people can see early on what license the software uses.",
            document: DOC_README,
            section: "Repo Name",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Roadmap",
          detail: {
            purpose: "Describe the direction this software will be developed in.",
            instructions: "REPLACE ME with a roadmap showing what is coming (or provide a link).",
            document: DOC_ROADMAP,
            attributes: [ATTR_EXTERNAL],
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
            instructions: "REPLACE ME with one or more code blocks showing how to use the main APIs this library provides.",
            document: DOC_README,
            section: "Repo Name#Using",
            attributes: [ATTR_LIBRARY],
          },
        },
        {
          name: "Installation Instructions",
          detail: {
            purpose: "Let the person know how to download and install this software.",
            instructions: "REPLACE ME with instructions of how to download and install this software.",
            document: DOC_README,
            section: "Repo Name#Using",
            attributes: [ATTR_INSTALLED],
          },
        },
        {
          name: "Deployment Instructions",
          detail: {
            purpose: "Let the person know how to deploy this software.",
            instructions: "REPLACE ME with a list of instructions on how to deploy this software (or provide a link).",
            document: DOC_README,
            section: "Repo Name#Using",
            attributes: [ATTR_EXTERNAL, ATTR_DEPLOYED],
          },
        },
        {
          name: "API Documentation",
          detail: {
            purpose: "Document or link to the API interfaces of this application.",
            instructions: "REPLACE ME with a detailed set of documentation covering the API or a link to the same.",
            document: DOC_README,
            section: "Repo Name#Using",
            attributes: [ATTR_API],
          },
        },
        {
          name: "Support Information",
          detail: {
            purpose: "Let the person know how they can get support.",
            instructions: "REPLACE ME with a description of how to get support or file a ticket. Also provide one or more links.",
            // guidance: "For open source repositories this will probably be a link to the repository issues along with some basic instructions. For commercial software this will probably be a link to customer support/success.",
            document: DOC_README,
            section: "Repo Name#Using",
            attributes: [ATTR_EXTERNAL],
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
                document: DOC_ARCHITECTURE,
                section: "Architecture",
              },
            },
            {
              name: "Birds-Eye View",
              detail: {
                purpose: "Provide a high level overview of the repository and how it is laid out.",
                instructions: "REPLACE ME with a high level description of how the code is laid out.",
                document: DOC_ARCHITECTURE,
                section: "Architecture#Overview",
              },
            },
            {
              name: "Code Map",
              detail: {
                purpose: "List key code files and/or entry points and document their use and purpose.",
                instructions: "REPLACE ME with a list of the key code files and or entry points. For each one describe their use, purpose, and any other details that are essential to understand.",
                document: DOC_ARCHITECTURE,
                section: "Architecture#Code Map",
              },
            },
            {
              name: "Scope",
              detail: {
                purpose: "Define the scope and system boundaries of the software, specifying what it should and should not do.",
                instructions: "REPLACE ME with a list of what is and is not in scope of the software, including any boundaries in the case of a deployed system.",
                document: DOC_ARCHITECTURE,
                section: "Architecture#Scope",
              },
            },
            {
              name: "Cross Cutting Concerns",
              items: [
                {
                  name: "Overview",
                  detail: {
                    purpose: "Describe how cross-cutting concerns, such as logging and telemetry, are handled.",
                    instructions: "REPLACE ME with a high-level description of how cross-cutting concerns are handled (i.e. shared lib, injection, auto-instrumentation, etc).",
                    document: DOC_ARCHITECTURE,
                    section: "Architecture#Cross Cutting Concerns",
                  },
                },
                {
                  name: "Logging",
                  detail: {
                    purpose: "Describe how logging is handled.",
                    instructions: "REPLACE ME with a description of how logging is to be handled, including setting/using appropriate logging levels, what to log, how to avoid logging sensitive information, etc. Also describe how logs are collected (if applicable).",
                    document: DOC_ARCHITECTURE,
                    section: "Architecture#Cross Cutting Concerns#Logging",
                  },
                },
                {
                  name: "Error Handling",
                  detail: {
                    purpose: "Describe how errors are handled.",
                    instructions: "REPLACE ME with a description of how errors are handled internally and surfaced externally. Provide a summary of the philosophy behind the logging methodology, as well as examples where appropriate. Also describe how errors are collected and monitored (if applicable).",
                    document: DOC_ARCHITECTURE,
                    section: "Architecture#Cross Cutting Concerns#Error Handling",
                  },
                },
              ],
            },
            {
              name: "Design Decisions",
              detail: {
                purpose: "List any design decisions or invariants that a developer must be aware of when developing the software.",
                instructions: "REPLACE ME with a list of important design decisions or invariants that are to be kept in mind when developing.",
                document: DOC_ARCHITECTURE,
                section: "Architecture#Design Decisions",
              },
            },
            {
              name: "Secrets",
              detail: {
                purpose: "Define how secrets are treated and handled when developing and/or using the software.",
                instructions: "REPLACE ME with a summary of how secrets are handled, including how they are passed in on startup, handled internally, and/or output.",
                document: DOC_ARCHITECTURE,
                section: "Architecture#Secrets",
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
                instructions: "REPLACE ME with a one liner describing where the software is run when developing it.",
                document: DOC_README,
                section: "Repo Name#Developing",
                attributes: [ATTR_API],
              },
            },
            {
              name: "Prerequisites",
              detail: {
                purpose: "List any prerequisites required to run or develop the software.",
                instructions: "REPLACE ME with a list of the prerequisites that I need to satisfy before running this software while developing it. Include secrets, permissions, software required, etc...",
                document: DOC_README,
                section: "Repo Name#Developing#Prerequisites",
              },
            },
            {
              name: "Setup",
              detail: {
                purpose: "List how to set up the software and any dependencies required to run and develop.",
                instructions: "REPLACE ME with a set of steps to set up the software so it can be run for development.",
                document: DOC_README,
                section: "Repo Name#Developing#Setup",
              },
            },
            {
              name: "Running",
              detail: {
                purpose: "Describe how to run the software locally, or how to run the software when developing or debugging.",
                instructions: "REPLACE ME with a set of steps to run the software for development.",
                document: DOC_README,
                section: "Repo Name#Developing#Running",
              },
            },
            {
              name: "Debugging",
              detail: {
                purpose: "Describe how to run the software in debug mode and/or attach a debugger to the software for local development.",
                instructions: "REPLACE ME with a description and steps of how to run in debug mode or attach a debugger to the software for development.",
                document: DOC_README,
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
                // examples: [
                //   {
                //     example: "Unit and e2e tests are run on each PR, and a full manual regression is done on each RC prior to deployment",
                //   }
                // ],
                document: DOC_README,
                section: "Repo Name#Testing",
              },
            },
            {
              name: "Overview",
              detail: {
                purpose: "Describe the testing philosophy, what types of tests exist, and how to manage tests.",
                instructions: "REPLACE ME with a description on the overall testing philosophy, including what types of tests exist, what they intend to test, and how to manage tests",
                document: DOC_README,
                section: "Repo Name#Testing",
              },
            },
            {
              name: "Prerequisites",
              detail: {
                purpose: "List out the prerequisites that are needed to run the tests.",
                instructions: "REPLACE ME with a list of the prerequisites that I need to run the tests, including permissions, test data, configuration, etc...",
                document: DOC_README,
                section: "Repo Name#Testing#Prerequisites",
              },
            },
            {
              name: "Running",
              detail: {
                purpose: "Describe how to run tests against the software.",
                instructions: "REPLACE ME with a list of steps showing how to run the various tests available.",
                document: DOC_README,
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
                document: DOC_README,
                section: "Repo Name#Releasing",
              },
            },
            {
              name: "Instructions",
              detail: {
                purpose: "List out the steps followed to release the software, including both automated and manual steps.",
                instructions: "REPLACE ME with a list of steps needed to follow to release the software.",
                document: DOC_README,
                section: "Repo Name#Releasing#Instructions",
              },
            },
            {
              name: "Versioning",
              detail: {
                purpose: "Describe the versioning methodology used.",
                instructions: "REPLACE ME with a description of how versions are calculated and/or assigned.",
                document: DOC_README,
                section: "Repo Name#Releasing#Versioning",
              },
            },
            {
              name: "Release Notes",
              detail: {
                purpose: "Describe how release notes are collected and published.",
                instructions: "REPLACE ME with a description of how release notes are collected and published. Also include a link to the release notes.",
                document: DOC_README,
                section: "Repo Name#Releasing#Release Notes",
              },
            },
            {
              name: "Change Log",
              detail: {
                purpose: "Describe how a changelog is produced.",
                instructions: "REPLACE ME with a description of how the changelog is produced.",
                document: DOC_README,
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
                document: DOC_README,
                section: "Repo Name#Deploying",
                attributes: [ATTR_DEPLOYED],
              },
            },
            {
              name: "Environments",
              detail: {
                purpose: "Describe the various deployment targets and/or environments.",
                instructions: "REPLACE ME with a list if the deployment targets and/or environments. For each one list its identifier, purpose, and include a link to the software running in that environment (if applicable).",
                document: DOC_README,
                section: "Repo Name#Deploying#Environments",
                attributes: [ATTR_DEPLOYED],
              },
            },
            {
              name: "Instructions",
              detail: {
                purpose: "List out the steps (manual and automated) to deploy to a specific environment.",
                instructions: "REPLACE ME with a list of steps to deploy to a target environment.",
                document: DOC_README,
                section: "Repo Name#Deploying#Instructions",
                attributes: [ATTR_DEPLOYED],
              },
            },
          ],
        },
        {
          name: "Monitoring",
          detail: {
            purpose: "Describe how this software is monitored.",
            instructions: "REPLACE ME with a description of how this software is monitored. Include a link to the monitoring software if possible.",
            document: DOC_README,
            section: "Repo Name#Monitoring",
            attributes: [ATTR_DEPLOYED],
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
            document: DOC_README,
            section: "Repo Name#Owner",
            attributes: [],
          },
        },
        {
          name: "Contributing",
          detail: {
            purpose: "Provide a high-level invitation to contribute.",
            instructions: "REPLACE ME with a high-level invitation to contribute.",
            document: DOC_CONTRIBUTING,
            section: "Contributing",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Who Can Contribute",
          detail: {
            purpose: "Provide a list of requirements that must be met to contribute.",
            instructions: "REPLACE ME with a list of requirements that must be met to contribute. Include a link to the code of conduct if applicable.",
            document: DOC_CONTRIBUTING,
            section: "Contributing",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "How to Contribute",
          detail: {
            purpose: "Describe how a person can contribute.",
            instructions: "REPLACE ME with a description on how to contribute.",
            document: DOC_CONTRIBUTING,
            section: "Contributing",
          },
        },
        {
          name: "Licensing",
          detail: {
            purpose: "Describe how contributions will be licensed",
            instructions: "REPLACE ME with a description of how contributions will be licensed, including any instructions or restrictions on contributing content (including AI generated content)",
            document: DOC_CONTRIBUTING,
            section: "Contributing#Licensing",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Code Style",
          detail: {
            purpose: "Describe or provide a link to the code style(s) that contributors should abide by.",
            instructions: "REPLACE ME with a link or list of code styles that contributors should abide by.",
            document: DOC_CONTRIBUTING,
            section: "Contributing#Code Style",
          },
        },
        {
          name: "Issues",
          detail: {
            purpose: "Describe the process for creating, assigning, and resolving issues.",
            instructions: "REPLACE ME with instructions for creating, assigning, and resolving issues. Include a description of the overall workflow and a link to where issues should be created.",
            document: DOC_CONTRIBUTING,
            section: "Contributing#Issues",
          },
        },
        {
          name: "Commits",
          detail: {
            purpose: "Describe the requirements around commits and commit messages",
            instructions: "REPLACE ME with instructions on how to format and use commits, including specific commit message formatting and/or commit sizes.",
            document: DOC_CONTRIBUTING,
            section: "Contributing#Commits",
          },
        },
        {
          name: "Pull Requests",
          detail: {
            purpose: "Describe how to create pull requests, including contents, assignees, and overall workflow.",
            instructions: "REPLACE ME with a description of how this project uses pull requests. Include instructions for creating/submitting pull requests, what should/should not be included, and the process for approving and merging. Also include a link to the pull request template if applicable.",
            document: DOC_CONTRIBUTING,
            section: "Contributing#Pull Requests",
          },
        },
        {
          name: "Contributing Link",
          detail: {
            purpose: "Provide a link to the contributing document in the README",
            instructions: "REPLACE ME with an invitation to contribute and a link to the CONTRIBUTING document",
            document: DOC_README,
            section: "Repo Name#Contributing",
          },
        },
        {
          name: "Authors",
          detail: {
            purpose: "List the authors and/or notable contributors of the software in this repository",
            instructions: "REPLACE ME with a list of notable authors and/or contributors. List the role for each individual or entity.",
            document: DOC_README,
            section: "Repo Name#Contributing",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Acknowledgements",
          detail: {
            purpose: "List any acknowledgements needed.",
            instructions: "REPLACE ME with a list of acknowledgements for major contributions, inspiration, original work, etc.",
            document: DOC_README,
            section: "Repo Name#Acknowledgements",
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Code of Conduct",
          detail: {
            purpose: "Lay out a code of conduct that contributors should abide by.",
            instructions: "REPLACE ME with a code of conduct that contributors should abide by.",
            document: DOC_CODE_OF_CONDUCT,
            attributes: [ATTR_EXTERNAL],
          },
        },
        {
          name: "Reporting Security Issues",
          detail: {
            purpose: "Describe how to report security issues.",
            instructions: "REPLACE ME with instructions on how to submit security issues, including a link or email address if applicable.",
            document: DOC_README,
            section: "Repo Name#Security Issues",
            attributes: [ATTR_EXTERNAL],
          },
        },
      ],
    },
  ],
};

export default subject;