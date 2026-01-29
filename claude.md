# Claude Utilization Framework - Repository Guide

**Version**: 3.0.0 (Project-Agnostic)
**Last Updated**: 2026-01-27
**Language**: English

## Table of Contents

1. [Repository Overview](#1-repository-overview)
2. [Directory Structure Reference](#2-directory-structure-reference)
3. [The 9 Specialized Agents](#3-the-9-specialized-agents)
4. [Agent Dependency Flow](#4-agent-dependency-flow)
5. [Setup and Deployment](#5-setup-and-deployment)
6. [Customization Guide](#6-customization-guide)
7. [Development Workflow](#7-development-workflow)
8. [Agent vs Command vs Skill](#8-agent-vs-command-vs-skill)
9. [Extension Points](#9-extension-points)
10. [Important Reference Documents](#10-important-reference-documents)
11. [Key Concepts](#11-key-concepts)
12. [Common Usage Patterns](#12-common-usage-patterns)
13. [Tips for Working with This Repository](#13-tips-for-working-with-this-repository)

---

## 1. Repository Overview

### What is This Repository?

This is the **Claude Utilization Framework** - a comprehensive template system for configuring Claude Code to work optimally with any software development project. It transforms Claude Code from a general-purpose coding assistant into a project-specific expert development team.

### Key Value Proposition

- **Universal Templates**: Single set of templates works for ANY project type (web apps, mobile apps, backend services, etc.)
- **Placeholder Pattern**: Projects customize by filling in marked sections, not starting from scratch
- **Professional Specialization**: 9 role-based agents covering design, implementation, testing, and operations
- **Reduced Setup Time**: From 116 hours of custom agent creation → 8 hours of customization
- **Consistent Quality**: All agents include quality checklists and dependency documentation

### Current Version

**v3.0.0** (Released 2026-01-27)

This version represents a complete generalization from project-specific templates to universal templates. All agents are now project-agnostic and require customization with project-specific information before use.

**Previous Versions:**
- **v2.0.0** (2026-01-26): Added tool specifications, quality checklists, devops-engineer agent
- **v1.0.0**: Initial StudyMate-specific implementation

### Core Philosophy

1. **Universality over Specificity**: Templates that work for all projects
2. **Customization over Creation**: Fill in blanks rather than write from scratch
3. **Role Clarity**: Each agent has a specific, well-defined responsibility
4. **Dependency Transparency**: Explicit upstream/downstream relationships
5. **Quality First**: Every agent includes verification checklists
6. **Progressive Enhancement**: Core agents required, extensions optional

### Target Users

- Software development teams using Claude Code
- Solo developers managing complex projects
- Teams wanting consistent AI-assisted development patterns
- Anyone needing structured Claude Code workflows

---

## 2. Directory Structure Reference

```
claude_utilization/
├── agents/              # 9 specialized role-based agents (Task tool)
│   ├── tech-lead.md
│   ├── ui-ux-designer.md
│   ├── data-modeler.md
│   ├── project-manager.md
│   ├── backend-dev.md
│   ├── frontend-dev.md
│   ├── qa-tester.md
│   ├── doc-writer.md
│   └── devops-engineer.md
│
├── commands/            # Slash commands for quick invocation
│   ├── customize_agents.md
│   └── README.md
│
├── skills/              # Repeatable workflow definitions
│   └── README.md
│
├── rules/               # Always-active project guidelines
│   └── README.md
│
├── hooks/               # Event-triggered automation
│   └── README.md
│
├── mcp-configs/         # Model Context Protocol integrations
│   └── README.md
│
├── plugins/             # Claude Code extensions
│   └── README.md
│
├── examples/            # Reference implementations and usage patterns
│   ├── agent-usage-examples.md
│   └── README.md
│
├── setup.sh             # Deployment script to copy to .claude/
├── verify.sh            # Validation script for structure
├── README.md            # Primary documentation (Japanese)
├── QUICKSTART.md        # 5-minute onboarding guide
├── AGENTS.md            # Quick reference for all agents
├── OPTIMIZATION.md      # v2.0.0 changes documentation
└── GENERALIZATION_COMPLETE.md  # v3.0.0 transition notes
```

### Directory Purposes

| Directory | Purpose | Claude Code Feature |
|-----------|---------|---------------------|
| `/agents/` | Professional role-based sub-agents | Task tool with subagent_type |
| `/commands/` | Quick-invoke shortcuts with parameters | Slash commands (`/command-name`) |
| `/skills/` | Concrete repeatable operational tasks | Skill tool |
| `/rules/` | Project-wide guidelines (always active) | Auto-included in context |
| `/hooks/` | Event-triggered prompts/scripts | Hook system |
| `/mcp-configs/` | External system integrations | MCP server configs |
| `/plugins/` | Claude Code feature extensions | Plugin system |
| `/examples/` | Usage patterns and templates | Reference material |

---

## 3. The 9 Specialized Agents

All agents are **v3.0.0** (project-agnostic templates). They require customization with project-specific information before use.

### Phase 0: Design Preparation

#### 3.1 tech-lead

**Role**: Technical Architecture & System Design

**Responsibilities**:
- Technology stack selection (frameworks, languages, databases)
- System architecture design (monolith/microservices, offline-first, etc.)
- API specification (REST/GraphQL, endpoints, authentication)
- Security requirements definition (OWASP compliance, data protection)
- Non-functional requirements (performance, scalability, reliability)

**Model**: `opus` (requires complex decision-making)

**Permission Mode**: `acceptEdits` (can modify files without asking)

**Key Deliverables**:
- `tech-stack-decision.md` - Technology choices with justification
- `system-architecture.md` - Architecture diagrams and patterns
- `api-specification.md` - API design (OpenAPI/Swagger format)
- `security-requirements.md` - Security controls and compliance

**Dependencies**:
- **Upstream**: None (starting point)
- **Downstream**: ui-ux-designer, data-modeler, project-manager, all implementation agents

**Customization Requirements**:
- Project Overview (name, description, target, platform, MVP features)
- Reference Documents (paths to requirements, product concept docs)
- Non-Functional Requirements (performance targets, scalability needs)
- Technical Constraints & Priorities (must-use technologies, limitations)
- Product Philosophy (user experience > features, performance > visuals, etc.)

**Usage Example**:
```
Use the tech-lead agent to decide on the technology stack for a mobile-first budgeting app
Have the tech-lead agent design the API specification for user authentication and data sync
```

**Quality Checklist**:
- Technology choices documented with pros/cons
- Architecture addresses all non-functional requirements
- API specification is complete and versioned
- Security requirements mapped to OWASP Top 10

---

#### 3.2 ui-ux-designer

**Role**: UI/UX Design & User Experience

**Responsibilities**:
- Wireframe creation for all screens
- Screen transition flow design
- Detailed screen specifications (layouts, components, interactions)
- Design system definition (colors, typography, spacing, components)
- Accessibility and usability validation (WCAG compliance)

**Model**: `sonnet`

**Key Deliverables**:
- `wireframes.md` - Low-fidelity screen mockups
- `screen-transition-flow.md` - User journey diagrams
- `screen-specifications/*.md` - Detailed specs per screen
- `design-system.md` - Design tokens and component library

**Dependencies**:
- **Upstream**: tech-lead (platform decisions inform design)
- **Downstream**: frontend-dev (implements designs), doc-writer (documents UI)

**Customization Requirements**:
- Project Overview
- Reference Documents (design guidelines, brand guidelines)
- Design Principles (minimalism, accessibility-first, mobile-first, etc.)
- Required Screens (list of all screens to design)

**Usage Example**:
```
Use the ui-ux-designer agent to create wireframes for the dashboard, transaction list, and budget creation screens
Have the ui-ux-designer agent define the design system with color palette and typography
```

**Quality Checklist**:
- All required screens have wireframes
- Navigation flow is clear and intuitive
- Design system is comprehensive and reusable
- Accessibility guidelines addressed

---

#### 3.3 data-modeler

**Role**: Database & Data Modeling

**Responsibilities**:
- Entity detailed definition (attributes, types, constraints)
- Relationship design (one-to-many, many-to-many)
- Index design for query optimization
- Migration planning (versioning, rollback strategies)
- Data validation rules and business logic

**Model**: `sonnet`

**Key Deliverables**:
- `data-model-detailed.md` - Complete entity specifications
- `entity-relationship-diagram.md` - ER diagrams (Mermaid format)
- `migration-plan.md` - Database evolution strategy

**Dependencies**:
- **Upstream**: tech-lead (database technology selection)
- **Downstream**: backend-dev (implements schema), qa-tester (tests data integrity)

**Customization Requirements**:
- Project Overview
- Reference Documents (data requirements, business rules)
- Key Entities & Attributes (core data structures for your domain)

**Usage Example**:
```
Use the data-modeler agent to design the database schema for User, Transaction, Budget, and Category entities
Have the data-modeler agent create a migration plan for adding recurring transaction support
```

**Quality Checklist**:
- All entities have complete attribute definitions
- Relationships are properly normalized
- Indexes support expected query patterns
- Migration strategy handles edge cases

---

#### 3.4 project-manager

**Role**: Development Planning & Project Management

**Responsibilities**:
- Development phase detailed planning (sprints, iterations)
- Task decomposition (breaking features into implementable units)
- Milestone definition and timeline estimation
- Dependency identification and management
- Risk assessment and mitigation planning

**Model**: `sonnet`

**Key Deliverables**:
- `mvp-development-plan.md` - Phased development strategy
- `task-list.md` - Prioritized backlog
- `milestones.md` - Key delivery targets
- `risk-management.md` - Risk register with mitigations

**Dependencies**:
- **Upstream**: tech-lead, ui-ux-designer, data-modeler (need their outputs to plan)
- **Downstream**: backend-dev, frontend-dev, qa-tester (execute the plan)

**Customization Requirements**:
- Project Overview
- Reference Documents (project charter, stakeholder requirements)
- Development Phases (timeline structure: MVP, Beta, v1.0, etc.)

**Usage Example**:
```
Use the project-manager agent to create a 3-month MVP development plan
Have the project-manager agent break down the authentication feature into tasks
```

**Quality Checklist**:
- Tasks are properly sized (1-3 days each)
- Dependencies clearly documented
- Milestones are measurable and time-bound
- Risks have mitigation strategies

---

### Phase 1: Implementation

#### 3.5 backend-dev

**Role**: Backend Development & API Implementation

**Responsibilities**:
- Authentication system implementation (OAuth, JWT, session management)
- API endpoint development (CRUD operations, business logic)
- Database integration and ORM configuration
- Cloud sync logic implementation
- Security controls (input validation, SQL injection prevention, rate limiting)

**Model**: `sonnet`

**Key Deliverables**:
- Backend source code (API routes, controllers, services, models)
- `api-implementation.md` - Endpoint documentation
- `authentication-flow.md` - Auth sequence diagrams
- Database migrations and seeders

**Dependencies**:
- **Upstream**: tech-lead (technology stack), data-modeler (schema), project-manager (task priorities)
- **Downstream**: frontend-dev (consumes APIs), qa-tester (tests APIs), doc-writer (documents APIs)

**Customization Requirements**:
- Project Overview
- Key API Endpoints (list of APIs to implement: auth, user profile, transactions, etc.)
- Performance Targets (response time goals: <200ms p95, etc.)

**Usage Example**:
```
Use the backend-dev agent to implement the user authentication endpoints (register, login, refresh token)
Have the backend-dev agent create the transaction CRUD API with filtering and pagination
```

**Quality Checklist**:
- All endpoints follow REST conventions
- Authentication and authorization implemented
- Input validation on all endpoints
- Error handling returns proper HTTP status codes
- Performance targets met

---

#### 3.6 frontend-dev

**Role**: Frontend/Mobile Development

**Responsibilities**:
- Project setup (React Native, Flutter, React, Vue, etc.)
- Screen component implementation based on UI/UX specs
- State management (Redux, Zustand, Provider, etc.)
- Core feature implementation (forms, navigation, data display)
- Offline support (local storage, sync queue)
- API integration (HTTP clients, error handling)

**Model**: `sonnet`

**Key Deliverables**:
- Frontend/mobile source code (components, screens, state management)
- `component-design.md` - Component hierarchy
- `state-management-design.md` - State architecture
- Navigation configuration

**Dependencies**:
- **Upstream**: ui-ux-designer (designs), backend-dev (APIs), project-manager (priorities)
- **Downstream**: qa-tester (UI testing), doc-writer (user guides)

**Customization Requirements**:
- Project Overview
- Screen List & Features (all screens to implement with their key features)
- Core Features (most important functionality: offline support, real-time updates, etc.)
- Performance Targets (startup time, animation FPS, memory usage)

**Usage Example**:
```
Use the frontend-dev agent to implement the dashboard screen with transaction list and budget summary
Have the frontend-dev agent create the offline sync mechanism for transaction data
```

**Quality Checklist**:
- All screens match UI/UX specifications
- State management is consistent
- API integration handles errors gracefully
- Performance targets met (load time, responsiveness)
- Offline functionality works correctly

---

#### 3.7 qa-tester

**Role**: Quality Assurance & Testing

**Responsibilities**:
- Test strategy definition (unit, integration, E2E coverage)
- Unit test creation (Jest, Pytest, JUnit, etc.)
- Integration test creation (API testing, database testing)
- End-to-end test creation (Cypress, Selenium, Detox)
- Performance testing (load time, response time, resource usage)
- Security testing (OWASP Top 10 checks)

**Model**: `sonnet`

**Key Deliverables**:
- Test code (unit, integration, E2E test suites)
- `test-strategy.md` - Testing approach and coverage goals
- `test-coverage-report.md` - Coverage metrics
- `performance-test-results.md` - Performance benchmarks

**Dependencies**:
- **Upstream**: backend-dev, frontend-dev (implementation to test)
- **Downstream**: doc-writer (testing documentation)

**Customization Requirements**:
- Project Overview
- Reference Documents (test requirements, acceptance criteria)
- Critical Test Scenarios (most important user flows to test)

**Usage Example**:
```
Use the qa-tester agent to write E2E tests for the user registration and login flow
Have the qa-tester agent create unit tests for the transaction calculation logic
```

**Quality Checklist**:
- Test coverage meets targets (80%+ for critical paths)
- All critical user flows have E2E tests
- Performance tests validate requirements
- Security tests cover OWASP Top 10

---

#### 3.8 doc-writer

**Role**: Documentation & Technical Writing

**Responsibilities**:
- README creation (project overview, features, tech stack)
- Development environment setup guide
- API documentation (OpenAPI/Swagger, endpoint descriptions)
- User guide creation (how to use the application)
- Contribution guidelines
- Privacy policy and terms of service drafts

**Model**: `sonnet`

**Key Deliverables**:
- `README.md` - Project overview
- `development-environment-setup.md` - Setup instructions
- `api-documentation.md` - API reference
- `user-guide.md` - End-user documentation
- `CONTRIBUTING.md` - Developer guidelines

**Dependencies**:
- **Upstream**: All agents (documents their outputs)
- **Downstream**: None (final documentation phase)

**Customization Requirements**:
- Project Overview (used in all documentation)

**Usage Example**:
```
Use the doc-writer agent to create a comprehensive README with setup instructions
Have the doc-writer agent generate API documentation from the OpenAPI specification
```

**Quality Checklist**:
- README covers all essential information
- Setup guide is step-by-step and tested
- API documentation is complete and accurate
- User guide covers all major features

---

### Phase 2: Operations (Optional)

#### 3.9 devops-engineer

**Role**: Infrastructure & Deployment

**Responsibilities**:
- CI/CD pipeline setup (GitHub Actions, GitLab CI, Jenkins)
- Containerization (Docker, docker-compose)
- Cloud deployment (AWS, GCP, Azure configuration)
- Monitoring and logging setup (Prometheus, Grafana, ELK stack)
- Performance optimization (CDN, caching, load balancing)

**Model**: `sonnet`

**Key Deliverables**:
- CI/CD configuration files (`.github/workflows/`, `.gitlab-ci.yml`)
- `Dockerfile` and `docker-compose.yml`
- Infrastructure as Code (Terraform, CloudFormation)
- Monitoring dashboards and alert rules

**Dependencies**:
- **Upstream**: tech-lead (infrastructure decisions), backend-dev, frontend-dev (applications to deploy)
- **Downstream**: None (operations phase)

**Customization Requirements**:
- Project Overview (deployment requirements)

**Usage Example**:
```
Use the devops-engineer agent to create a CI/CD pipeline for automated testing and deployment
Have the devops-engineer agent set up Docker containerization for the backend API
```

**Quality Checklist**:
- CI/CD pipeline runs all tests before deployment
- Deployment is reproducible and automated
- Monitoring covers key metrics (uptime, response time, errors)
- Rollback procedures documented and tested

---

## 4. Agent Dependency Flow

### Visual Representation

```
                           tech-lead (Phase 0: Architecture)
                                 |
                    +------------+------------+
                    |            |            |
            ui-ux-designer  data-modeler  project-manager
                 |              |              |
                 |              +------+-------+
                 |                     |
                 +----------+----------+
                            |
              +-------------+-------------+
              |                           |
        backend-dev                 frontend-dev (Phase 1: Implementation)
              |                           |
              +-------------+-------------+
                            |
                        qa-tester (Phase 1: Testing)
                            |
              +-------------+-------------+
              |                           |
         doc-writer                devops-engineer (Phase 1-2: Documentation & Ops)
```

### Dependency Details

| Agent | Depends On | Depended On By |
|-------|-----------|----------------|
| tech-lead | None | All others |
| ui-ux-designer | tech-lead | frontend-dev, doc-writer |
| data-modeler | tech-lead | backend-dev, doc-writer |
| project-manager | tech-lead, ui-ux-designer, data-modeler | backend-dev, frontend-dev |
| backend-dev | tech-lead, data-modeler, project-manager | frontend-dev, qa-tester, doc-writer |
| frontend-dev | tech-lead, ui-ux-designer, project-manager | qa-tester, doc-writer |
| qa-tester | backend-dev, frontend-dev | doc-writer |
| doc-writer | All previous agents | None |
| devops-engineer | tech-lead, backend-dev, frontend-dev | None |

### Sequential Workflow

**Recommended Order**:
1. **tech-lead** - Make foundational technology decisions
2. **ui-ux-designer**, **data-modeler**, **project-manager** (can run in parallel)
3. **backend-dev**, **frontend-dev** (can run in parallel after their dependencies are met)
4. **qa-tester** - Test implementations
5. **doc-writer**, **devops-engineer** (can run in parallel)

---

## 5. Setup and Deployment

### Initial Setup

#### Step 1: Clone or Download Framework

This repository contains the template framework. To use it in a project:

```bash
# If this is the claude_utilization repository location
cd ~/workspace/claude_utilization

# Verify files are present
ls agents/ commands/ skills/
```

#### Step 2: Run Setup Script

From your **target project's root directory** (where you want to use the framework):

```bash
# Navigate to your project
cd /path/to/your/project

# Run the setup script from claude_utilization
bash ~/workspace/claude_utilization/setup.sh
```

**What the script does**:
1. Creates `.claude/` directory in your project if it doesn't exist
2. Copies all framework components:
   - `agents/` → `.claude/agents/`
   - `commands/` → `.claude/commands/`
   - `skills/` → `.claude/skills/`
   - `rules/` → `.claude/rules/`
   - `hooks/` → `.claude/hooks/`
   - `mcp-configs/` → `.claude/mcp-configs/`
   - `plugins/` → `.claude/plugins/`
   - `examples/` → `.claude/examples/`
3. Provides colored console output confirming each step

#### Step 3: Verify Installation

```bash
# Run verification script
bash ~/workspace/claude_utilization/verify.sh

# Expected output:
# ✓ .claude/ directory exists
# ✓ All 9 agent files found
# ✓ Commands directory exists
# ✓ Skills directory exists
# ...
```

### What Gets Copied

| Source | Destination | Contains |
|--------|-------------|----------|
| `agents/*.md` | `.claude/agents/*.md` | 9 agent templates |
| `commands/*.md` | `.claude/commands/*.md` | Slash command definitions |
| `skills/*.md` | `.claude/skills/*.md` | Workflow definitions |
| `rules/*.md` | `.claude/rules/*.md` | Project-wide guidelines |
| `hooks/*.md` | `.claude/hooks/*.md` | Event triggers |
| `mcp-configs/*.json` | `.claude/mcp-configs/*.json` | MCP server configs |
| `plugins/*.json` | `.claude/plugins/*.json` | Plugin definitions |
| `examples/*.md` | `.claude/examples/*.md` | Usage examples |

### Important Notes

- The setup script **copies** files (doesn't link), so changes to the source won't auto-propagate
- Run setup script again after updating `claude_utilization/` to refresh `.claude/`
- You can selectively copy only needed components (e.g., just agents) by using `cp -r` directly

---

## 6. Customization Guide

All agents are **project-agnostic templates**. You MUST customize them with project-specific information before use.

### Two Customization Approaches

#### Approach 1: Automated (Recommended)

Use the `/customize_agents` slash command for interactive, guided customization.

**How to use**:
1. Start Claude Code in your project directory: `claude`
2. Run: `/customize_agents`
3. Answer 11 categories of questions (one at a time)
4. The command automatically updates all agent files

**Information Collected**:
1. **Project Overview** (all agents): Name, description, target users, platform, MVP features
2. **Reference Documents** (7 agents): Paths to requirements, specs, design docs
3. **Technical Constraints** (tech-lead): Performance targets, scalability, compliance
4. **Technical Priorities** (tech-lead): Must-use technologies, architectural preferences
5. **Product Philosophy** (tech-lead): Core principles (e.g., UX > features)
6. **API Endpoints** (backend-dev): List of APIs to implement
7. **Performance Targets** (backend-dev, frontend-dev): Response times, load times
8. **Screens & Features** (frontend-dev): List of screens and their functionality
9. **Core Entities** (data-modeler): Key data structures and attributes
10. **Development Phases** (project-manager): Timeline structure (MVP, Beta, v1.0)
11. **Test Scenarios** (qa-tester): Critical user flows to test
12. **Design Principles** (ui-ux-designer): Design philosophy and guidelines

**Example Session**:
```
You: /customize_agents

Claude: I'll help you customize all agent files for your project. Let me ask you some questions.

Question 1/11: Project Overview
Please provide:
- Project name
- Brief description (2-3 sentences)
- Target users
- Platform (web, mobile iOS/Android, desktop, etc.)
- MVP features (key functionality for first release)

You: Project name: BudgetBuddy
Description: A personal finance app that helps users track expenses, create budgets, and achieve savings goals with smart insights.
Target: Young professionals (25-35) who want better financial control
Platform: Mobile (iOS and Android)
MVP features: Transaction tracking, budget creation, category-based spending analysis, savings goals

Claude: Great! Question 2/11: Reference Documents
...
```

**What Gets Updated**:
- All 9 agent files have their `<!-- ✏️ EDIT THIS SECTION -->` areas populated
- Information is formatted according to each agent's template structure
- Examples in HTML comments are preserved for reference

---

#### Approach 2: Manual Editing

Edit each agent file (`.claude/agents/*.md`) manually by finding `<!-- ✏️ EDIT THIS SECTION -->` markers.

**Steps**:
1. Open agent file: `.claude/agents/tech-lead.md`
2. Find sections marked with `<!-- ✏️ EDIT THIS SECTION -->`
3. Add project-specific information below the marker
4. Follow the example format in HTML comments
5. Repeat for all agents

**Example (tech-lead.md)**:
```markdown
### Project Overview
<!-- ✏️ EDIT THIS SECTION -->
<!-- Add your project information below:
- **Project Name**: StudyMate
- **Description**: A study planning and progress tracking app for students...
- **Target Users**: High school and university students
- **Platform**: Mobile (iOS and Android)
- **MVP Features**: Study session tracking, goal setting, statistics dashboard, notifications
-->

- **Project Name**: BudgetBuddy
- **Description**: A personal finance app that helps users track expenses, create budgets, and achieve savings goals with smart insights.
- **Target Users**: Young professionals (25-35) who want better financial control
- **Platform**: Mobile (iOS and Android)
- **MVP Features**: Transaction tracking, budget creation, category-based spending analysis, savings goals
```

### Mandatory Customization

**All Agents Require**:
- **Project Overview**: Name, description, target users, platform, MVP features

### Optional but Recommended Customization

| Agent | Additional Customization |
|-------|-------------------------|
| tech-lead | Reference docs, technical constraints, priorities, product philosophy |
| ui-ux-designer | Reference docs, design principles, required screens |
| data-modeler | Reference docs, key entities and attributes |
| project-manager | Reference docs, development phases |
| backend-dev | Key API endpoints, performance targets |
| frontend-dev | Screen list & features, core features, performance targets |
| qa-tester | Reference docs, critical test scenarios |
| devops-engineer | None (Project Overview sufficient) |
| doc-writer | None (Project Overview sufficient) |

### Customization Examples

#### Reference Documents
```markdown
### Reference Documents
- **Requirements**: `./docs/requirements.md`
- **Product Concept**: `./docs/product-concept.md`
- **API Specification**: `./docs/api-spec.md`
- **Design Guidelines**: `./docs/design-system.md`
```

#### Technical Constraints
```markdown
### Technical Constraints
- **API response time**: <200ms (p95)
- **App startup time**: <2 seconds (cold start)
- **Offline support**: All core features must work offline
- **Data sync**: Conflict resolution required for multi-device usage
- **Compliance**: GDPR, CCPA data privacy regulations
```

#### Product Philosophy
```markdown
### Product Philosophy
1. **User experience > Feature richness**: Better to have 5 great features than 20 mediocre ones
2. **Performance > Visual complexity**: Smooth animations and fast load times over heavy graphics
3. **Privacy > Convenience**: Never compromise user data for ease of implementation
4. **Accessibility first**: WCAG 2.1 AA compliance from the start
```

#### API Endpoints
```markdown
### Key API Endpoints
- **Authentication**: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- **User Profile**: `/users/me`, `/users/me/settings`
- **Transactions**: `/transactions` (CRUD with filtering, pagination, search)
- **Budgets**: `/budgets` (CRUD with category associations)
- **Categories**: `/categories` (predefined + custom)
- **Analytics**: `/analytics/spending`, `/analytics/trends`
```

### Verification

After customization, verify that:
1. All `<!-- ✏️ EDIT THIS SECTION -->` markers have content below them
2. Project Overview is consistent across all agent files
3. Agent-specific sections are filled in for agents you plan to use
4. Reference document paths are valid and files exist

---

## 7. Development Workflow

### Phase 0: Design Preparation

**Goal**: Establish foundational decisions before writing code

#### Step 1: Technology & Architecture (tech-lead)
```
Use the tech-lead agent to decide on the technology stack for BudgetBuddy
Have the tech-lead agent design the system architecture with offline-first approach
Use the tech-lead agent to create the API specification for all endpoints
```

**Outputs**: `tech-stack-decision.md`, `system-architecture.md`, `api-specification.md`

**Review Checklist**:
- Technology choices justified and documented
- Architecture supports MVP requirements
- API spec is complete with authentication flow

#### Step 2: UI/UX Design (ui-ux-designer)
```
Use the ui-ux-designer agent to create wireframes for all BudgetBuddy screens
Have the ui-ux-designer agent design the screen transition flow
Use the ui-ux-designer agent to define the design system (colors, typography, components)
```

**Outputs**: `wireframes.md`, `screen-transition-flow.md`, `design-system.md`

**Review Checklist**:
- All required screens have wireframes
- Navigation is intuitive
- Design system is comprehensive

#### Step 3: Database Design (data-modeler)
```
Use the data-modeler agent to design the database schema for User, Transaction, Budget, Category entities
Have the data-modeler agent create an ER diagram showing all relationships
```

**Outputs**: `data-model-detailed.md`, `entity-relationship-diagram.md`

**Review Checklist**:
- All entities have complete definitions
- Relationships are properly normalized
- Indexes support expected queries

#### Step 4: Project Planning (project-manager)
```
Use the project-manager agent to create a 3-month MVP development plan
Have the project-manager agent break down features into implementable tasks
Use the project-manager agent to define milestones and identify risks
```

**Outputs**: `mvp-development-plan.md`, `task-list.md`, `milestones.md`

**Review Checklist**:
- Tasks are properly sized (1-3 days)
- Dependencies are clear
- Milestones are measurable

---

### Phase 1: Implementation

#### Step 5: Backend Development (backend-dev)
```
Use the backend-dev agent to implement user authentication (register, login, refresh token)
Have the backend-dev agent create the transaction CRUD API with filtering and pagination
Use the backend-dev agent to implement the budget management endpoints
```

**Outputs**: Backend source code, `api-implementation.md`, `authentication-flow.md`

**Review Checklist**:
- All endpoints follow REST conventions
- Authentication is secure (JWT, bcrypt, etc.)
- Input validation on all endpoints
- Error handling returns proper HTTP codes

#### Step 6: Frontend Development (frontend-dev)
```
Use the frontend-dev agent to implement the dashboard screen with transaction list
Have the frontend-dev agent create the budget creation and editing screens
Use the frontend-dev agent to implement offline support with local storage and sync
```

**Outputs**: Frontend source code, `component-design.md`, `state-management-design.md`

**Review Checklist**:
- Screens match UI/UX specifications
- State management is consistent
- Offline functionality works
- API integration handles errors

#### Step 7: Testing (qa-tester)
```
Use the qa-tester agent to create E2E tests for user registration and login flow
Have the qa-tester agent write unit tests for transaction calculation logic
Use the qa-tester agent to perform performance testing (app startup, API response times)
```

**Outputs**: Test code, `test-strategy.md`, `test-coverage-report.md`

**Review Checklist**:
- Test coverage meets targets (80%+)
- All critical flows have E2E tests
- Performance tests validate requirements
- Security tests cover OWASP Top 10

#### Step 8: Documentation (doc-writer)
```
Use the doc-writer agent to create a comprehensive README
Have the doc-writer agent write the development environment setup guide
Use the doc-writer agent to generate API documentation from OpenAPI spec
```

**Outputs**: `README.md`, `development-environment-setup.md`, `api-documentation.md`, `user-guide.md`

**Review Checklist**:
- README covers all essential info
- Setup guide is step-by-step
- API documentation is complete
- User guide covers major features

---

### Phase 2: Operations (Optional)

#### Step 9: DevOps Setup (devops-engineer)
```
Use the devops-engineer agent to create a CI/CD pipeline for automated testing and deployment
Have the devops-engineer agent set up Docker containerization for the backend
Use the devops-engineer agent to configure monitoring with Prometheus and Grafana
```

**Outputs**: CI/CD configs, `Dockerfile`, `docker-compose.yml`, monitoring dashboards

**Review Checklist**:
- CI/CD runs all tests before deploy
- Deployment is reproducible
- Monitoring covers key metrics
- Rollback procedure documented

---

### Parallel Workflows

Some steps can be done in parallel to speed up development:

**Parallel Group 1** (after tech-lead):
- ui-ux-designer (UI design)
- data-modeler (database design)
- project-manager (planning)

**Parallel Group 2** (after their dependencies are met):
- backend-dev (API implementation)
- frontend-dev (UI implementation)

**Final Group** (after implementation):
- doc-writer (documentation)
- devops-engineer (infrastructure)

---

## 8. Agent vs Command vs Skill

Understanding the differences helps you choose the right tool for your task.

### Agents

**Purpose**: Complex, role-based decision-making and implementation

**Characteristics**:
- Long-form prompts (300-1000 lines)
- Specialized expertise (tech-lead, ui-ux-designer, etc.)
- Context-aware (loads project-specific information)
- Multi-step workflows
- Invoked via Task tool: `Use the tech-lead agent to...`

**When to use**:
- Designing system architecture
- Creating comprehensive test strategies
- Implementing complex features
- Making technology decisions

**Example**:
```
Use the tech-lead agent to design the authentication system with OAuth2 and JWT
```

---

### Commands

**Purpose**: Quick shortcuts for common tasks

**Characteristics**:
- Short prompts (10-100 lines)
- Parameter substitution (`{param}` → value)
- Fast invocation (slash syntax)
- Single-purpose operations
- Invoked via: `/command-name param1 param2`

**When to use**:
- Reviewing code or PRs
- Generating commit messages
- Running common workflows
- Quick documentation tasks

**Example**:
```
/customize_agents
/review-pr 123
/write-tests src/auth/login.ts
```

**Creating Custom Commands**:
Create `.claude/commands/your-command.md`:
```markdown
---
description: Review code for security issues
---

Review the file at {filepath} for security vulnerabilities:
- SQL injection
- XSS attacks
- Authentication bypasses
- Exposed secrets

Provide a summary of findings and suggested fixes.
```

Usage: `/security-review src/api/auth.ts`

---

### Skills

**Purpose**: Concrete, repeatable operational tasks

**Characteristics**:
- Task-specific (deploy, run tests, backup database)
- Step-by-step procedures
- Often includes bash commands or tool usage
- Domain knowledge encoded
- Invoked via Skill tool (if configured)

**When to use**:
- Deployment procedures
- Database operations (migrations, backups)
- Testing workflows (E2E test suite)
- Code quality checks (lint, format, security scan)

**Example**:
```
Use the deploy-to-staging skill to deploy the current branch
```

**Creating Custom Skills**:
Create `.claude/skills/deploy-staging.md`:
```markdown
---
name: deploy-to-staging
description: Deploy application to staging environment
---

# Deploy to Staging

## Prerequisites
- Tests passing
- Branch pushed to remote
- Staging environment configured

## Steps

1. Run test suite:
   ```bash
   npm test
   ```

2. Build production bundle:
   ```bash
   npm run build
   ```

3. Deploy to staging:
   ```bash
   ./scripts/deploy-staging.sh
   ```

4. Verify deployment:
   - Check health endpoint: https://staging.app.com/health
   - Run smoke tests: `npm run smoke-test:staging`

5. Notify team in Slack #deployments channel
```

---

### Comparison Table

| Feature | Agents | Commands | Skills |
|---------|--------|----------|--------|
| **Complexity** | High (multi-step, context-rich) | Low (single task) | Medium (structured workflow) |
| **Invocation** | `Use the X agent to...` | `/command-name` | `Use the X skill` |
| **Length** | 300-1000 lines | 10-100 lines | 50-200 lines |
| **Customization** | Project-specific context | Parameter substitution | Domain-specific procedures |
| **Use Case** | Design, architecture, complex implementation | Code review, quick tasks | Deployments, testing, operations |
| **Examples** | tech-lead, backend-dev | `/review-pr`, `/commit` | deploy-to-staging, run-e2e-tests |

---

## 9. Extension Points

The framework is designed to be extended with project-specific additions.

### Adding Custom Commands

**Location**: `.claude/commands/your-command.md`

**Structure**:
```markdown
---
description: One-line description of what the command does
---

Command prompt here. Use {param} for parameters that users can pass.

Example: Review {filepath} for {issue_type} and provide suggestions.
```

**Usage**: `/your-command value1 value2`

**Recommended Commands**:
- `/review` - Code review for specific file or PR
- `/commit` - Generate commit message from staged changes
- `/test-plan` - Create test plan for a feature
- `/doc-function` - Document a specific function
- `/refactor` - Suggest refactoring for a file
- `/fix-lint` - Fix linting errors
- `/optimize` - Optimize code for performance

---

### Adding Custom Skills

**Location**: `.claude/skills/your-skill.md`

**Structure**:
```markdown
---
name: your-skill-name
description: What this skill accomplishes
---

# Skill Name

## Purpose
What problem this skill solves

## Prerequisites
- Requirement 1
- Requirement 2

## Steps

### Step 1: Description
```bash
command to run
```

### Step 2: Description
Explanation and commands

## Verification
How to verify the skill executed successfully

## Troubleshooting
Common issues and solutions
```

**Recommended Skills**:
- **Deployment**: `deploy-to-staging`, `deploy-to-production`, `rollback`
- **Database**: `run-migration`, `seed-database`, `backup-database`
- **Testing**: `run-e2e-tests`, `performance-test`, `security-audit`
- **Code Quality**: `code-review`, `refactor-legacy`, `update-dependencies`
- **Documentation**: `generate-api-docs`, `update-changelog`

---

### Adding Custom Rules

**Location**: `.claude/rules/your-rule.md`

**Structure**:
```markdown
# Rule: Rule Name

## When This Applies
Always / When working on X / During Y phase

## Guidelines

1. Guideline 1 with explanation
2. Guideline 2 with rationale
3. Guideline 3 with examples

## Examples

### Good
```code
// Good example
```

### Bad
```code
// Bad example
```

## Exceptions
When it's okay to break this rule
```

**Recommended Rules**:
- `coding-standards.md` - Language-specific conventions (naming, formatting, idioms)
- `git-conventions.md` - Commit messages, branch naming, PR templates
- `security-rules.md` - Secret management, authentication patterns, OWASP guidelines
- `testing-rules.md` - Test coverage requirements, AAA pattern, fixture management
- `performance-rules.md` - App startup targets, animation FPS, API response times
- `core-principles.md` - Product philosophy, architectural decisions, trade-off guidelines

---

### Adding Custom Hooks

**Location**: `.claude/hooks/your-hook.md`

**Structure**:
```markdown
---
event: user-prompt-submit | tool-use-pre | tool-use-post | session-start | session-end
---

Prompt or script to execute when the event occurs.

Can reference variables like {tool_name}, {user_prompt}, etc.
```

**Available Events**:
- `user-prompt-submit` - After user sends a message
- `tool-use-pre` - Before a tool is executed
- `tool-use-post` - After a tool completes
- `session-start` - When Claude Code starts
- `session-end` - When Claude Code exits

**Recommended Hooks**:
- **Pre-commit checks**: Run tests, linting, security scans before commits
- **Performance reminders**: Remind to check response times after API changes
- **Documentation prompts**: Suggest updating docs after feature implementation
- **Consistency checks**: Validate naming conventions, file structure

**Example (pre-commit-checks.md)**:
```markdown
---
event: tool-use-pre
---

{if tool_name == "Bash" and "git commit" in command}
Before committing, ensure:
1. All tests pass: `npm test`
2. No linting errors: `npm run lint`
3. No TypeScript errors: `npm run type-check`
4. No security issues: `npm audit`

Confirm these checks passed or run them now.
{endif}
```

---

### Adding MCP Configurations

**Location**: `.claude/mcp-configs/your-server.json`

**Structure**:
```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

**Common MCP Servers**:
- **Database**: PostgreSQL, MySQL, MongoDB access
- **APIs**: GitHub, Slack, Jira integration
- **Search**: Brave Search, local file indexing
- **File System**: Enhanced file operations

---

### Adding Plugins

**Location**: `.claude/plugins/your-plugin.json`

**Structure**:
```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "What the plugin does",
  "features": ["feature1", "feature2"],
  "commands": {
    "command-name": "command implementation"
  },
  "hooks": {
    "hook-event": "hook implementation"
  }
}
```

**Plugin Use Cases**:
- Language/framework-specific helpers (React Native, Flutter)
- IDE integration (VS Code, IntelliJ commands)
- Workflow automation (CI/CD triggers, deployment helpers)
- Tool integration (ESLint, Prettier, Jest configuration)

---

## 10. Important Reference Documents

### Core Documentation

#### README.md
- **Purpose**: Primary documentation (Japanese)
- **Contents**: Framework overview, directory structure, setup instructions
- **When to read**: First time learning about the framework

#### QUICKSTART.md
- **Purpose**: 5-minute onboarding guide
- **Contents**: Minimal steps to get started, common pitfalls, troubleshooting
- **When to read**: When setting up the framework in a new project

#### AGENTS.md
- **Purpose**: Quick reference for all 9 agents
- **Contents**: Agent roles, dependencies (mermaid graph), task→agent mapping
- **When to read**: When deciding which agent to use for a task

---

### Version History

#### OPTIMIZATION.md
- **Purpose**: Documents v2.0.0 changes
- **Contents**: Tool additions, quality checklists, dependency docs, devops-engineer agent
- **When to read**: Understanding the evolution from v1.0.0 to v2.0.0

#### GENERALIZATION_COMPLETE.md
- **Purpose**: Documents v3.0.0 transition
- **Contents**: How StudyMate-specific content was removed, edit marker addition
- **When to read**: Understanding why agents are now project-agnostic

#### GENERALIZATION_PROPOSAL.md
- **Purpose**: Design philosophy for v3.0.0
- **Contents**: Rationale for placeholder pattern, time savings (116hr → 8hr)
- **When to read**: Understanding the framework's design decisions

---

### Detailed References

#### agents/README.md
- **Purpose**: Comprehensive agent documentation
- **Contents**: Detailed descriptions, YAML frontmatter structure, quality checklists
- **When to read**: Before customizing or creating new agents

#### commands/README.md
- **Purpose**: Slash command documentation
- **Contents**: How to create commands, parameter substitution, examples
- **When to read**: When creating custom commands

#### commands/customize_agents.md
- **Purpose**: Customization command details
- **Contents**: Complete questionnaire, how it updates files, what gets customized
- **When to read**: Understanding how `/customize_agents` works

---

### Examples

#### examples/agent-usage-examples.md
- **Purpose**: Real-world agent invocation patterns
- **Contents**: Example prompts for each agent with context
- **When to read**: When unsure how to phrase agent invocations

---

## 11. Key Concepts

### Edit Markers Pattern

**Concept**: All agent files have designated customization zones marked with `<!-- ✏️ EDIT THIS SECTION -->`

**Purpose**:
- Clear separation between template content and project-specific content
- Makes it obvious what needs customization
- Preserves template structure while allowing flexibility

**Example**:
```markdown
### Project Overview
<!-- ✏️ EDIT THIS SECTION -->
<!-- Example:
- **Project Name**: StudyMate
- **Description**: A study planning app...
-->

[Your project information goes here]
```

**Best Practices**:
- Never delete the edit marker itself
- Add content **below** the marker
- Preserve the example in HTML comments for reference
- Keep formatting consistent with examples

---

### Version Management

**Concept**: All agents track their version and changelog in YAML frontmatter

**Structure**:
```yaml
---
name: tech-lead
description: Technical Architecture & System Design
version: 3.0.0
last_updated: 2026-01-27
changelog:
  3.0.0: Generalized to project-agnostic template with edit markers
  2.0.0: Added tool specifications, quality checklist, and dependencies
  1.0.0: Initial StudyMate-specific implementation
---
```

**Why it matters**:
- Track agent evolution over time
- Understand what changed between versions
- Coordinate updates across projects using the framework
- Debug issues by checking version compatibility

**Best Practice**: When modifying an agent significantly, increment the version and add a changelog entry.

---

### Permission Modes

**Concept**: Agents can specify how Claude Code should handle file edits

**Modes**:
- `permissionMode: ask` (default) - Ask user before every edit
- `permissionMode: acceptEdits` - Automatically apply edits without asking

**Current Usage**:
- **tech-lead**: Uses `acceptEdits` because architecture decisions often involve creating multiple files (tech stack doc, API spec, etc.)
- **All other agents**: Use default `ask` mode for safety

**When to use `acceptEdits`**:
- Agent creates many files in one session
- User trusts the agent's outputs
- Fast iteration is more important than review

**When to use `ask`** (default):
- Agent modifies existing critical code
- Changes could break functionality
- User wants to review every change

---

### Model Selection

**Concept**: Different agents use different Claude models based on complexity

**Model Types**:
- **opus**: Most capable, best for complex reasoning (currently Claude Opus 4.5)
- **sonnet**: Balanced performance and cost (currently Claude Sonnet 4.5)
- **haiku**: Fast and economical for simple tasks (currently Claude Haiku 3.5)

**Current Assignments**:
- **tech-lead**: `opus` - Complex architectural decisions, technology trade-offs
- **All others**: `sonnet` - Implementation, design, testing, documentation

**Rationale**:
- tech-lead makes foundational decisions that affect the entire project → needs highest reasoning capability
- Implementation agents follow established patterns → sonnet is sufficient and more cost-effective

**Customization**: You can change an agent's model by editing the YAML frontmatter:
```yaml
---
model: haiku  # Change from sonnet to haiku for faster, cheaper responses
---
```

---

### Quality Checklists

**Concept**: Every agent includes a checklist to verify their outputs meet standards

**Location**: At the end of each agent file

**Example (tech-lead)**:
```markdown
## Quality Checklist

Before considering this phase complete, verify:
- [ ] Technology choices documented with pros/cons analysis
- [ ] Architecture diagram addresses all MVP features
- [ ] API specification is complete with authentication flow
- [ ] Security requirements mapped to OWASP Top 10
- [ ] Non-functional requirements (performance, scalability) addressed
- [ ] All design decisions have clear rationale documented
```

**How to use**:
1. Agent completes their task
2. Review the output against the checklist
3. If any items are unchecked, request the agent to address them
4. Only proceed when all items are verified

**Why it matters**:
- Ensures consistent quality across agents
- Prevents incomplete outputs
- Makes expectations explicit
- Reduces iteration cycles (catch issues early)

---

### Dependency Documentation

**Concept**: Each agent explicitly documents what they depend on and who depends on them

**Structure**:
```markdown
## Dependencies

### Upstream (This agent depends on)
- **tech-lead**: Technology stack decisions inform implementation
- **data-modeler**: Database schema needed for API design

### Downstream (These agents depend on this agent)
- **qa-tester**: Needs implementation to write tests
- **doc-writer**: Needs code to document
```

**Why it matters**:
- Plan the correct execution order
- Understand what inputs an agent needs
- Know what outputs will be consumed by others
- Avoid running agents out of sequence

**Best Practice**: Always run upstream agents before downstream agents. If an agent's upstream dependencies aren't met, it will lack necessary context.

---

## 12. Common Usage Patterns

### Starting a New Project

**Scenario**: You're beginning a greenfield project and want to use the framework.

**Workflow**:
```bash
# 1. Setup framework
cd /path/to/new-project
bash ~/workspace/claude_utilization/setup.sh

# 2. Start Claude Code
claude

# 3. Customize agents
/customize_agents
# Answer questions about your project

# 4. Start with architecture
Use the tech-lead agent to design the system architecture for [your project]

# 5. Design UI
Have the ui-ux-designer agent create wireframes for [key screens]

# 6. Design data model
Use the data-modeler agent to design the database schema for [entities]

# 7. Plan development
Have the project-manager agent create a development plan for MVP
```

---

### Adding a New Feature

**Scenario**: Project is established, you want to add a new feature.

**Workflow**:
```bash
# 1. Start with planning
Use the project-manager agent to break down the [feature name] feature into implementable tasks

# 2. Update architecture if needed
Have the tech-lead agent review the current architecture and suggest changes for [feature]

# 3. Design UI (if feature has UI)
Use the ui-ux-designer agent to design screens for [feature]

# 4. Implement backend
Use the backend-dev agent to implement the [feature] API endpoints

# 5. Implement frontend
Have the frontend-dev agent implement the [feature] UI components

# 6. Test
Use the qa-tester agent to create tests for the [feature]

# 7. Document
Have the doc-writer agent update documentation for the new [feature]
```

---

### Refactoring Existing Code

**Scenario**: Code quality is degrading, need to refactor.

**Workflow**:
```bash
# 1. Analyze current state
Use the tech-lead agent to analyze [component/module] and suggest refactoring approaches

# 2. Plan refactoring
Have the project-manager agent create a refactoring plan with risk mitigation

# 3. Implement refactor (backend)
Use the backend-dev agent to refactor [backend code] according to the plan

# 4. Implement refactor (frontend)
Have the frontend-dev agent refactor [frontend code] according to the plan

# 5. Ensure test coverage
Use the qa-tester agent to verify test coverage before and after refactoring

# 6. Update documentation
Have the doc-writer agent update architecture docs to reflect new structure
```

---

### Troubleshooting a Bug

**Scenario**: Production bug needs investigation and fixing.

**Workflow**:
```bash
# 1. Investigate (use relevant agent)
# For API bugs:
Use the backend-dev agent to investigate the bug in [endpoint/service]

# For UI bugs:
Use the frontend-dev agent to investigate the bug in [screen/component]

# 2. Design fix
Have the [relevant agent] propose a fix with test coverage

# 3. Implement fix
Use the [relevant agent] to implement the fix

# 4. Test thoroughly
Have the qa-tester agent create regression tests for the bug and verify the fix

# 5. Document
Use the doc-writer agent to document the bug, root cause, and fix in changelog
```

---

### Preparing for Deployment

**Scenario**: Ready to deploy to staging or production.

**Workflow**:
```bash
# 1. Verify quality
Use the qa-tester agent to run the full test suite and report results

# 2. Setup infrastructure
Have the devops-engineer agent prepare the deployment pipeline

# 3. Create release documentation
Use the doc-writer agent to create release notes and update changelog

# 4. Review security
Have the tech-lead agent perform a security review of the changes

# 5. Deploy
Use the devops-engineer agent to execute the deployment

# 6. Monitor
Have the devops-engineer agent set up monitoring for the new deployment
```

---

### Code Review

**Scenario**: Reviewing code changes before merging.

**Workflow**:
```bash
# Option 1: Use slash command (fast)
/review-pr 123

# Option 2: Use agent (comprehensive)
Use the tech-lead agent to review the code changes in [PR/file] for:
- Architecture consistency
- Security issues
- Performance implications
- Code quality and best practices
```

---

### Onboarding New Developers

**Scenario**: New team member needs to understand the project.

**Workflow**:
```bash
# 1. Project overview
Use the doc-writer agent to create an onboarding guide covering:
- Project architecture
- Development workflow
- Key technologies
- Coding standards

# 2. Environment setup
Have the doc-writer agent verify and update the development environment setup guide

# 3. Codebase tour
Use the tech-lead agent to explain the codebase structure and key components

# 4. First task assignment
Have the project-manager agent suggest a good "first task" for the new developer
```

---

## 13. Tips for Working with This Repository

### Before First Use

1. **Read QUICKSTART.md** - 5-minute overview of setup and customization
2. **Run setup script** - Copy framework to your project's `.claude/` directory
3. **Customize immediately** - Run `/customize_agents` or manually edit before first agent use
4. **Verify customization** - Check that all `<!-- ✏️ EDIT THIS SECTION -->` markers have content

### When Using Agents

1. **Follow dependency flow** - Run upstream agents (tech-lead) before downstream (backend-dev)
2. **Use quality checklists** - Verify agent outputs meet all checklist criteria
3. **Be specific in prompts** - "Use the backend-dev agent to implement user authentication with JWT and bcrypt" is better than "implement auth"
4. **Reference agent outputs** - "Based on the API spec from tech-lead, implement..." helps agents maintain consistency

### When Extending the Framework

1. **Update version numbers** - If you significantly modify an agent, increment version and add changelog
2. **Test setup script** - After changing structure, run `verify.sh` to ensure everything is valid
3. **Document custom additions** - Add README files to explain custom commands, skills, or rules
4. **Keep templates universal** - If adding new agents, make them project-agnostic with edit markers

### When Things Go Wrong

1. **Check customization** - Many issues stem from missing project-specific information
2. **Verify dependencies** - Ensure upstream agents ran successfully before downstream ones
3. **Review reference docs** - Check AGENTS.md, agents/README.md for agent-specific details
4. **Run verify script** - `bash ~/workspace/claude_utilization/verify.sh` to check structure
5. **Re-run setup** - If `.claude/` is corrupted, delete it and run setup script again

### Performance Optimization

1. **Use appropriate models** - Keep most agents on `sonnet`, only use `opus` for complex reasoning
2. **Run agents in parallel when possible** - ui-ux-designer, data-modeler, and project-manager can run simultaneously
3. **Use commands for quick tasks** - `/review` is faster than full agent invocation for code review
4. **Cache common outputs** - Save tech-lead decisions for reference instead of re-running

### Maintaining Quality

1. **Always use checklists** - Don't skip quality verification steps
2. **Review before merging** - Have tech-lead agent review significant changes
3. **Keep documentation updated** - Use doc-writer agent whenever implementation changes
4. **Test after agent changes** - Run qa-tester after backend-dev or frontend-dev makes changes

### Collaboration

1. **Commit customized agents** - Check `.claude/agents/*.md` into git so team uses same context
2. **Share reference documents** - Ensure all team members have access to docs referenced in agents
3. **Standardize workflows** - Document team's preferred agent usage order
4. **Review agent outputs together** - Pair on architecture decisions from tech-lead

### Continuous Improvement

1. **Track what works** - Note which agent prompts produce best results
2. **Evolve customization** - Update project info in agents as project evolves
3. **Add custom commands** - Create shortcuts for frequently repeated tasks
4. **Contribute back** - If you create useful agents/commands, consider sharing them

---

## Conclusion

This **Claude Utilization Framework** transforms Claude Code from a general assistant into a specialized development team. By customizing the 9 agents with your project's specific context, you enable Claude to provide expert-level guidance on architecture, design, implementation, testing, and operations.

**Key Takeaways**:
1. Always customize agents before first use (`/customize_agents`)
2. Follow the dependency flow (tech-lead → design agents → implementation agents → qa-tester → doc-writer)
3. Use quality checklists to verify outputs
4. Extend with custom commands, skills, and rules as needed
5. Keep agents updated as your project evolves

**Next Steps**:
1. Run `setup.sh` to install framework
2. Run `/customize_agents` to add project context
3. Start with `tech-lead` for architecture decisions
4. Follow the development workflow (Phase 0 → Phase 1 → Phase 2)

For detailed guidance, see:
- **QUICKSTART.md** - Fast setup guide
- **AGENTS.md** - Agent quick reference
- **agents/README.md** - Comprehensive agent documentation

Happy building with Claude Code!
