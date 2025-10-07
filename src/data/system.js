const UI = "UI"
const APPLICATION = "Application"
const API = "API"
const INFRASTRUCTURE = "Infrastructure"

/**
 * @type {import(".").Subject}
 */
const subject = {
  name: "System",
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlcnZlci1pY29uIGx1Y2lkZS1zZXJ2ZXIiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiB4PSIyIiB5PSIyIiByeD0iMiIgcnk9IjIiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iOCIgeD0iMiIgeT0iMTQiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSI2IiB4Mj0iNi4wMSIgeTE9IjYiIHkyPSI2Ii8+PGxpbmUgeDE9IjYiIHgyPSI2LjAxIiB5MT0iMTgiIHkyPSIxOCIvPjwvc3ZnPg==",
  questions: [
    {
      question: "Which of the following are present in this system are present? Select all that apply.",
      attributes: [
        { name: "User Interface (UI)", value: UI },
        { name: "Application", value: APPLICATION },
        { name: "Callable API (HTTP or SDK)", value: API },
        { name: "Infrastructure", value: INFRASTRUCTURE },
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
            purpose: "Describe this system in one or two sentences in tagline format.",
            instructions: "REPLACE ME with a tagline describing this system",
            document: "SYSTEM",
            section: "System Name",
          },
        },
        {
          name: "Background",
          detail: {
            purpose: "Describe the background of this system, how and why it came to be, etc.",
            instructions: "REPLACE ME with the background of this system, including how and why it came to be, important information to know about the context of its genesis, etc.",
            document: "SYSTEM",
            section: "System Name#Overview",
          },
        },
        {
          name: "Purpose/Goals",
          detail: {
            purpose: "Describe the system's purpose within the organization and the high-level goals it was created to achieve.",
            instructions: "REPLACE ME with description of the system's purpose and the high-level goals it was created to achieve.",
            document: "SYSTEM",
            section: "System Name#Scope",
          },
        },
        {
          name: "Scope",
          detail: {
            purpose: "Describe the scope of the system, including what is and what is not included.",
            instructions: "REPLACE ME with a description of the scope of this system. Make sure to include both what is and what is not in scope and why those decisions were made. Link to other system(s) that border this system in terms of scope if applicable.",
            document: "SYSTEM",
            section: "System Name#Scope",
          },
        },
        {
          name: "Owner(s)",
          detail: {
            purpose: "List the system owners",
            instructions: "REPLACE ME with a list of the system's owners, including what role they play and/or what responsibility they have",
            document: "SYSTEM",
            section: "System Name#Ownership",
          },
        },
        {
          name: "Stakeholder(s)",
          detail: {
            purpose: "List the stakeholders for the system",
            instructions: "REPLACE ME with a list of the system's stakeholders, including what role they play or responsibility they have.",
            document: "SYSTEM",
            section: "System Name#Ownership",
          },
        },
        {
          name: "Lifecycle Status",
          detail: {
            purpose: "State the current status of this system within the organizations system development lifecycle.",
            instructions: "REPLACE ME with the current status of this system within the organizations system development lifecycle.",
            document: "SYSTEM",
            section: "System Name#Status",
          },
        },
        {
          name: "Links and References",
          items: [
            {
              name: "Links and References",
              detail: {
                purpose: "List relevant and applicable links and references.",
                instructions: "REPLACE ME with a list of applicable links and references.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Team",
              detail: {
                purpose: "Link to the owning team's documentation.",
                instructions: "REPLACE ME with a link to the owning team's documentation.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Tickets",
              detail: {
                purpose: "Link to project management system where tickets for this system are stored.",
                instructions: "REPLACE ME with a link to project management system where tickets for this system are stored",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Repositories",
              detail: {
                purpose: "Link to the repository or repositories that contain this system's source code and configuration.",
                instructions: "REPLACE ME with link(s) to the repository or repositories that contain this system's source code and configuration.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Specs",
              detail: {
                purpose: "Link to the specification documents related to this system.",
                instructions: "REPLACE ME with link(s) to the specification documents related to this system.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Decisions",
              detail: {
                purpose: "Link to the architectural or product decision logs related to this system.",
                instructions: "REPLACE ME with link(s) to the architectural or product decision logs related to this system.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
            {
              name: "Sub-Systems",
              detail: {
                purpose: "Link to the sub-system(s) contained within this system.",
                instructions: "REPLACE ME with link(s) to the sub-system(s) contained within this system.",
                document: "SYSTEM",
                section: "System Name#References",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Functional Requirements",
      items: [
        {
          name: "Business Rules and Logic",
          detail: {
            purpose: "Detail the business rules and logic required of the system.",
            instructions: "REPLACE ME with a detailed specification of the business rules and logic implemented by this system.",
            document: "SYSTEM",
            section: "System Name#Functional Requirements",
          },
        },
        {
          name: "User Management",
          items: [
            {
              name: "User Management",
              detail: {
                purpose: "Describe how users are managed within the system.",
                instructions: "REPLACE ME with a high-level overview of how users are managed within the system.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Registration",
              detail: {
                purpose: "Describe how users are added to the system.",
                instructions: "REPLACE ME with a description of how users are registered or added to the system. This could be a link to another system.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Log In",
              detail: {
                purpose: "Describe how users log in to the system.",
                instructions: "REPLACE ME with a description of how users log in to the system. Provide a link to the login system if applicable.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Authentication",
              detail: {
                purpose: "Describe how users authenticate to this system.",
                instructions: "REPLACE ME with a description of how users authenticate to the system. If this system directly provides authentication, detail how authentication happens. If not, describe how authentication happens and link to the system that provides it.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Authorization",
              detail: {
                purpose: "Describe how users are authorized to take certain actions in this system.",
                instructions: "REPLACE ME with a description of how actions in this system are authorized. If applicable include a list of the actions users can take and the authorization needed to take that action. Include links to any external systems used to obtain or validate authorization.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Password Reset",
              detail: {
                purpose: "Describe how users reset their password.",
                instructions: "REPLACE ME with a description of how users reset their password.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
            {
              name: "Profile Management",
              detail: {
                purpose: "Describe how users manage their profile, including authentication, authorization, and other data associated with their profile.",
                instructions: "REPLACE ME with a description of how users manage their profile, including authentication, authorization, and other data associated with their profile. If applicable, include details about what data is associated with a user along with what it is used for and any requirements about how it is defaulted, set, and validated.",
                document: "SYSTEM",
                section: "System Name#User Management",
              },
            },
          ],
        },
        {
          name: "Data Management",
          items: [
            {
              name: "Data Management",
              detail: {
                purpose: "Describe how data is managed within the system.",
                instructions: "REPLACE ME with a summary or high-level description of what data exists and how data is managed in the system.",
                document: "SYSTEM",
                section: "System Name#Data Management",
              },
            },
            {
              name: "Data",
              detail: {
                purpose: "List the data contained in and processed by this system.",
                instructions: "REPLACE ME with a list of all of the data processed and/or stored by this system. For each piece of data describe what it is, what it contains, how it is processed, and how it is stored (if applicable).",
                document: "SYSTEM",
                section: "System Name#Data Management",
              },
            },
            {
              name: "Data Entry",
              detail: {
                purpose: "Describe how data enters the system.",
                instructions: "REPLACE ME with a description of how data enters the system. Also include a list of what pieces of data enter where.",
                document: "SYSTEM",
                section: "System Name#Data Management#Entry",
              },
            },
            {
              name: "Data Validation",
              detail: {
                purpose: "Describe how data entering, being processed by, or existing the system is validated.",
                instructions: "REPLACE ME with a description of how data entering, being processed by, or existing the system is validated.",
                document: "SYSTEM",
                section: "System Name#Data Management#Validation",
              },
            },
            {
              name: "Data Storage",
              detail: {
                purpose: "Describe how data is stored in the system.",
                instructions: "REPLACE ME with a description of how data is stored in the system. Include the location and schema of the data being stored along with any encryption or processing that occurs.",
                document: "SYSTEM",
                section: "System Name#Data Management#Storage",
              },
            },
            {
              name: "Data Retrieval",
              detail: {
                purpose: "Describe how data is retrieved in the system.",
                instructions: "REPLACE ME with a description of how data is retrieved in the system. Include details about what processes and/or systems are able to retrieve data, including any manual or emergency processes.",
                document: "SYSTEM",
                section: "System Name#Data Management#Retrieval",
              },
            },
            {
              name: "Data Archiving",
              detail: {
                purpose: "Describe how data is archived in the system.",
                instructions: "REPLACE ME with a description of how data is archived in the system (if applicable). Include details about how and where data is archived from and to, including the processes and systems involved (including manual or emergency processes).",
                document: "SYSTEM",
                section: "System Name#Data Management#Archiving",
              },
            },
            {
              name: "Data Backup",
              detail: {
                purpose: "Describe how data is backed up by the system.",
                instructions: "REPLACE ME with a description of how data is backed up by the system (if applicable). Include details about how and where data is backed up from and to, including the processes and systems involved (including manual or emergency processes).",
                document: "SYSTEM",
                section: "System Name#Data Management#Backup",
              },
            },
            {
              name: "Data Erasure",
              detail: {
                purpose: "Describe how data is permanently erased from the system.",
                instructions: "REPLACE ME with a description of how data is permanently erased from the system (if applicable). Include details about the processes and systems involved (including manual or emergency processes).",
                document: "SYSTEM",
                section: "System Name#Data Management#Backup",
              },
            },
            {
              name: "Data Restoration",
              detail: {
                purpose: "Describe how data is restored to the system.",
                instructions: "REPLACE ME with a description of how data is restored to the system (if applicable). Include details about the processes and systems involved (including manual or emergency processes).",
                document: "SYSTEM",
                section: "System Name#Data Management#Restoration",
              },
            },
          ],
        },
        {
          name: "Error Handling",
          detail: {
            purpose: "Define how errors will be handled by the system and surfaced to users.",
            instructions: "REPLACE ME with instructions about how to handle errors, what to log, and how/what to surface to users.",
            document: "SYSTEM",
            section: "System Name#Error Handling",
          },
        },
        {
          name: "Recovery Plan",
          detail: {
            purpose: "Define how system recovery will be handled in the case of a major outage or incident.",
            instructions: "REPLACE ME with a detailed description about how system recovery will be handled in the case of a major outage or incident.",
            document: "SYSTEM",
            section: "System Name#Recovery Plan",
          },
        },
      ],
    },
    {
      name: "Non-Functional Requirements",
      items: [
        {
          name: "Performance",
          detail: {
            purpose: "Define the performance requirements for the system.",
            instructions: "REPLACE ME with a definition of the required performance characteristics for the system. Address items such as response time, latency, throughput, capacity, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Performance",
          },
        },
        {
          name: "Security",
          detail: {
            purpose: "Define the security requirements for the system.",
            instructions: "REPLACE ME with a definition of the required security requirements for the system. Address items such as authentication, authorization, data protection, compliance, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Security",
          },
        },
        {
          name: "Scalability",
          detail: {
            purpose: "Define the scalability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required scalability requirements for the system. Address items such as scale out vs scale up, costs, minimums and maximums, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Scalability",
          },
        },
        {
          name: "Availability",
          detail: {
            purpose: "Define the availability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required availability requirements for the system. Address items such as up-time, outage windows, calculations, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Availability",
          },
        },
        {
          name: "Recoverability",
          detail: {
            purpose: "Define the recoverability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required recoverability requirements for the system. Address items such as recovery time objective, recovery point objective, maximum tolerable downtime, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Recoverability",
          },
        },
        {
          name: "Maintainability",
          detail: {
            purpose: "Define the maintainability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required maintainability requirements for the system. Address items such as testability, modifiability, supportability, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Maintainability",
          },
        },
        {
          name: "Usability",
          detail: {
            purpose: "Define the usability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required usability requirements for the system. Address items such as learnability, efficiency, accessibility, aesthetics, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Usability",
            attributes: [UI],
          },
        },
        {
          name: "Compatibility",
          detail: {
            purpose: "Define the compatibility requirements for the system.",
            instructions: "REPLACE ME with a definition of the required compatibility requirements for the system. Address items such as backwards compatibility, platform compatibility, interoperability, supported protocols, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Compatibility",
          },
        },
        {
          name: "Regulatory",
          detail: {
            purpose: "Define the regulatory requirements for the system.",
            instructions: "REPLACE ME with a definition of the required regulatory requirements for the system. Address items such as GDPR, CCPA, HIPPA, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Regulatory",
          },
        },
        {
          name: "Affordability",
          detail: {
            purpose: "Define the affordability requirements for the system.",
            instructions: "REPLACE ME with a definition of the required affordability requirements for the system. Address items such as baseline costs, maximum costs, expected usage costs, etc.",
            document: "SYSTEM",
            section: "System Name#Non-Functional Requirements#Affordability",
          },
        },
      ],
    },
    {
      name: "Architecture",
      items: [
        {
          name: "Summary",
          detail: {
            purpose: "Describe the architecture of this system in 1-2 sentences.",
            instructions: "REPLACE ME with a 1-2 sentence description of the architecture for this system.",
            document: "ARCHITECTURE",
            section: "Architecture",
          },
        },
        {
          name: "Birds-eye View",
          detail: {
            purpose: "Describe the architecture of this system at a high level.",
            instructions: "REPLACE ME with a high level description of the architecture for this system. The level of detail should be high-level enough to get a sense for the entire system, and granular enough to cover all major system components and main data flows.",
            document: "ARCHITECTURE",
            section: "Architecture#Birds Eye View",
          },
        },
        {
          name: "Dependencies",
          detail: {
            purpose: "Describe the dependencies of this system.",
            instructions: "REPLACE ME with a list if dependencies, including adjacent systems, software, processes, data sets, etc.",
            document: "ARCHITECTURE",
            section: "Architecture#Dependencies",
          },
        },
        {
          name: "Technologies",
          detail: {
            purpose: "List the technologies used in and by this system.",
            instructions: "REPLACE ME with a list of technologies used in and by this system, including languages, frameworks, platforms, tooling, etc.",
            document: "ARCHITECTURE",
            section: "Architecture#Technologies",
          },
        },
        {
          name: "Constraints and Invariants",
          detail: {
            purpose: "List the constraints and invariants that this system must abide by.",
            instructions: "REPLACE ME with a list of the constraints and invariants that this system must abide by.",
            document: "ARCHITECTURE",
            section: "Architecture#Constraints and Invariants",
          },
        },
        {
          name: "Core Principles",
          detail: {
            purpose: "List the core principles used to guide the development and maintenance of this system.",
            instructions: "REPLACE ME with a list of the core principles used to guide the development and maintenance of this system.",
            document: "ARCHITECTURE",
            section: "Architecture#Core Principles",
          },
        },
        {
          name: "Components and Connections",
          detail: {
            purpose: "Detail the components of the system and the connections between them.",
            instructions: "REPLACE ME with a description of the components of the system and the connections between them. Make sure to recurse into any non-trivial components and provide additional component and connection details.",
            document: "ARCHITECTURE",
            section: "Architecture#Components and Connections",
          },
        },
        {
          name: "Data Flow",
          detail: {
            purpose: "Detail how data flows through the components and connections of the system.",
            instructions: "REPLACE ME with a description of how data flows through the components and connections of the system. Make sure to include how data enters and exists the system, as well as where data is in memory or at rest.",
            document: "ARCHITECTURE",
            section: "Architecture#Data Flow",
          },
        },
        {
          name: "Data at Rest",
          detail: {
            purpose: "Detail how data is stored at rest.",
            instructions: "REPLACE ME with a description of how data is stored at rest. Make sure to address the data format or schema, encryption, and data access/backup/recovery",
            document: "ARCHITECTURE",
            section: "Architecture#Data at Rest",
          },
        },
        {
          name: "Component Details",
          detail: {
            purpose: "Provide additional details about each component.",
            instructions: "REPLACE ME with a set of sections containing important and pertinent details about each system component. Include and address items such as specifications, interfaces, apis, dependencies, interfaces, etc.",
            document: "ARCHITECTURE",
            section: "Architecture#Component Details",
          },
        },
        {
          name: "Decision Records",
          detail: {
            purpose: "List and link to all architectural decision records for this system.",
            instructions: "REPLACE ME with a list or links to all architectural decision records for this system.",
            document: "ARCHITECTURE",
            section: "Architecture#Decision Records",
          },
        },
      ],
    },
    {
      name: "Operation and Maintenance",
      items: [
        {
          name: "Deployment",
          detail: {
            purpose: "Describe the deployment process for this system.",
            instructions: "REPLACE ME with a description of the deployment process for this system, including a set of instructions or link to a runbook detailing how to deploy the system.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Deployment",
          },
        },
        {
          name: "Configuration",
          detail: {
            purpose: "Describe how the configuration for this system is managed.",
            instructions: "REPLACE ME with a description of how the configuration of this system is managed. Include details of what is configurable, how to update the configuration (via code, deployment, manually, etc.), default configuration values, etc.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Configuration",
          },
        },
        {
          name: "Troubleshooting",
          detail: {
            purpose: "Describe how the troubleshoot this system.",
            instructions: "REPLACE ME with a description of how to troubleshoot this system, including instructions for common items or issues. Include links to troubleshooting guides, runtime systems, monitoring, alerting, incident management documentation, etc.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Troubleshooting",
          },
        },
        {
          name: "Runbooks",
          detail: {
            purpose: "List the available runbooks for the system.",
            instructions: "REPLACE ME with a list of available runbooks for this system.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Runbooks",
          },
        },
        {
          name: "Monitoring",
          detail: {
            purpose: "Describe how the system is monitored and provide links to the relevant monitoring systems.",
            instructions: "REPLACE ME with a description of how this system is monitored. Include links or references to monitoring systems or other instrumentation.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Monitoring",
          },
        },
        {
          name: "Alerting",
          detail: {
            purpose: "Describe how alerting is managed and what alerts are configured.",
            instructions: "REPLACE ME with a description of how alerts are managed and what alerts are configured. Include a list (or link to a list) of configured alerts, link(s) to on call assignments, link(s) to incident management software, etc.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Alerting",
          },
        },
        {
          name: "Backup",
          detail: {
            purpose: "Describe how automatic and manual backup works.",
            instructions: "REPLACE ME with a description of how automatic backups are configured, how to perform manual backups, and links to relevant runbooks.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Backup",
          },
        },
        {
          name: "Recovery",
          detail: {
            purpose: "Describe how recovery works.",
            instructions: "REPLACE ME with a description of how recovery works. Include link(s) to relevant runbooks or process documentation.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Recovery",
          },
        },
        {
          name: "Maintenance",
          detail: {
            purpose: "Describe required system maintenance.",
            instructions: "REPLACE ME with a description of any maintenance that must be performed on the system. Include a list of the maintenance required, the cadence of the maintenance, and link(s) to relevant runbooks or process documentation.",
            document: "OPERATION_AND_MAINTENANCE",
            section: "Operation and Maintenance#Maintenance",
          },
        },
      ],
    },
    {
      name: "Security",
      items: [
        {
          name: "Roles and Responsibilities",
          detail: {
            purpose: "Detail the security roles and responsibilities for this system.",
            instructions: "REPLACE ME with a list of roles and responsibilities for this system, including any links to organization security documentation.",
            document: "SECURITY",
            section: "Security#Roles and Responsibilities",
          },
        },
        {
          name: "Non-Functional Requirements",
          detail: {
            purpose: "Detail the non-functional security requirements for this system.",
            instructions: "REPLACE ME with a list of non-functional security requirements for this system, including performance, availability, resilience, etc.",
            document: "SECURITY",
            section: "Security#Non-Functional Requirements",
          },
        },
        {
          name: "System Boundaries and Integrations",
          detail: {
            purpose: "Detail the boundaries this system and list the points at which this system integrates with other systems.",
            instructions: "REPLACE ME with a description of the system boundaries and a list of integration points between this system and other systems. Include a description of the function and data exchanged at each integration point, along with details about how each integration is secured.",
            document: "SECURITY",
            section: "Security#System Boundaries and Integrations",
          },
        },
        {
          name: "Security Features",
          detail: {
            purpose: "Detail the security features present in this system.",
            instructions: "REPLACE ME with a description and details about the security features present in this system. Include information about authentication, encryption (at rest and in transit), firewalls, authorization, virus scanning, vulnerability management, etc.",
            document: "SECURITY",
            section: "Security#Security Features",
          },
        },
        {
          name: "Data",
          items: [
            {
              name: "Classification",
              detail: {
                purpose: "Describe (or reference) the available data classification levels and classify each piece of data processed and/or stored by the system.",
                instructions: "REPLACE ME with a description (or reference to) the available data classification levels and classify each piece of data processed and/or stored by the system.",
                document: "SECURITY",
                section: "Security#Data#Classification",
              },
            },
            {
              name: "Roles and Responsibilities",
              detail: {
                purpose: "Describe the roles and responsibilities for each piece of data processed and/or stored by the system.",
                instructions: "REPLACE ME with a description of the roles and responsibilities for each piece of data processed and/or stored by the system.",
                document: "SECURITY",
                section: "Security#Data#Roles and Responsibilities",
              },
            },
            {
              name: "Handling",
              detail: {
                purpose: "Describe (or reference) the available data handling procedures and describe how they are user and/or implemented within this system.",
                instructions: "REPLACE ME with a description (or reference to) the available data handling procedures and describe how they are user and/or implemented within this system.",
                document: "SECURITY",
                section: "Security#Data#Handling",
              },
            },
            {
              name: "Access Controls",
              detail: {
                purpose: "Describe (or reference) the access controls implemented by this system.",
                instructions: "REPLACE ME with a description (or reference to) the access controls implemented by this system.",
                document: "SECURITY",
                section: "Security#Data#Access Controls",
              },
            },
          ]
        },
        {
          name: "Controls",
          detail: {
            purpose: "Detail the security controls present in this system.",
            instructions: "REPLACE ME with a description and details about the security controls present in this system.",
            document: "SECURITY",
            section: "Security#Security Controls",
          },
        },
        {
          name: "Threat Model",
          detail: {
            purpose: "Detail or link to the threat model used when performing risk assessments and security reviews.",
            instructions: "REPLACE ME with a description or link to the threat model used when performing risk assessments and security reviews.",
            document: "SECURITY",
            section: "Security#Threat Model",
          },
        },
        {
          name: "Risk Assessment",
          detail: {
            purpose: "Include or link to the risk assessment(s) performed on this system.",
            instructions: "REPLACE ME with links to or the actual risk assessment(s) performed on this system.",
            document: "SECURITY",
            section: "Security#Risk Assessment",
          },
        },
        {
          name: "Incident Response",
          detail: {
            purpose: "Include or link to the incident response plan that includes this system.",
            instructions: "REPLACE ME with links to or the actual incident response plan used for this system.",
            document: "SECURITY",
            section: "Security#Incident Response",
          },
        },
        {
          name: "Vulnerability Management",
          detail: {
            purpose: "Include or link to the vulnerability management plan and process used by this system.",
            instructions: "REPLACE ME with links to or the actual vulnerability management plan and process used by this system.",
            document: "SECURITY",
            section: "Security#Vulnerability Management",
          },
        },
      ],
    },
    {
      name: "Change Log",
      items: [
        {
          name: "Change Log",
          detail: {
            purpose: "Describe significant changes that have occurred in this system over time.",
            instructions: "REPLACE ME with a list of significant changes that have occurred in this system over time.",
            document: "SYSTEM",
            section: "System Name#Change Log",
          }
        }
      ]
    },
  ]
};

export default subject;