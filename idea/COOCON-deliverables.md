# CONXAI Project Deliverables Documentation

## Project Information

| Field | Details |
|-------|---------|
| **Project Title** | Development of AI-based Automatic Scraping Module Generation Technology (CONXAI) |
| **Project Duration** | June 2025 - December 2025 (7 months) |
| **Client** | COOCON Corporation (Business Registration: 107-86-85702) |
| **Developer** | AI Convergence Lab, Chungbuk National University |
| **Document Version** | 1.0 |
| **Last Updated** | 12th January 2026 |

---

## Table of Contents

1. [Analysis & Planning Phase](#1-analysis--planning-phase)
2. [Design Phase](#2-design-phase)
3. [Development Phase](#3-development-phase)
4. [Testing Phase](#4-testing-phase)
5. [Deployment Phase](#5-deployment-phase)
6. [Operations & Maintenance Phase](#6-operations--maintenance-phase)
7. [Project Closure Phase](#7-project-closure-phase)
8. [Deliverables Checklist](#8-deliverables-checklist)

---

## 1. Analysis & Planning Phase
### 1.1 Software Requirements Specification (SRS)

**Purpose**: A comprehensive document describing what COOCON wants and the system requirements for automating scraping module generation.

#### 1.1.1 Business Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-001 | Reduce scraping module development time from 1-3 days to 1-5 hours | High |
| BR-002 | Enable junior developers to handle complex banking modules | High |
| BR-003 | Standardize code output to follow iSAS templates | High |
| BR-004 | Support Korean financial institutions (banks, government portals) | High |
| BR-005 | Integrate with existing COOCON iSAS engine | High |

#### 1.1.2 Functional Requirements

| ID | Requirement | Component | Priority |
|----|-------------|-----------|----------|
| FR-001 | Capture HTTP/HTTPS network traffic from browser sessions | REQ_OBSERVER | High |
| FR-002 | Filter captured traffic using rule-based patterns | REQ_TRANSMITTER | High |
| FR-003 | Filter captured traffic using graph-based dependency analysis | REQ_TRANSMITTER | High |
| FR-004 | Filter captured traffic using LLM-based intelligent analysis | REQ_TRANSMITTER | Medium |
| FR-005 | Detect dynamic parameters by comparing multi-timestamp captures | LLM Engine | High |
| FR-006 | Generate JavaScript module templates following COOCON standards | LLM Engine | High |
| FR-007 | Create empty placeholder functions for dynamic parameters | LLM Engine | High |
| FR-008 | Recommend relevant iSAS functions using RAG system | LLM Engine | High |
| FR-009 | Analyze external JavaScript files for encryption logic | LLM Engine | Medium |
| FR-010 | Generate exception handling code using metadata mapping | LLM Engine | Medium |
| FR-011 | Send generated code to VS Code extension via WebSocket | VS Extension | Medium |
| FR-012 | Provide user authentication for the system | REQ_TRANSMITTER | High |

#### 1.1.3 Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| NFR-001 | API response time | Performance | < 5 seconds for filtering |
| NFR-002 | LLM generation time | Performance | < 18 minutes for module generation |
| NFR-003 | System availability | Reliability | 99% uptime |
| NFR-004 | Concurrent users | Scalability | Support 100+ simultaneous users |
| NFR-005 | Data encryption | Security | JWT authentication, HTTPS |
| NFR-006 | Password storage | Security | bcrypt hashing |
| NFR-007 | Code output format | Compatibility | iSAS-compatible JavaScript |

#### 1.1.4 Target Services

| Service Category | Target Website | Authentication Type |
|------------------|----------------|---------------------|
| Public Service | National Health Insurance (NHIS) | Certificate-based (PKI) |
| Public Service | Government 24 (MinWon24) | Certificate-based (PKI) |
| Banking | Nonghyup Bank (NH) | Certificate + OTP |
| Banking | KB Kookmin Bank (KBstar) | Certificate + OTP |

---

### 1.2 Functional Specification

**Purpose**: Detailed list of functions the system must perform.

#### 1.2.1 REQ_OBSERVER Functions

| Function ID | Function Name | Description | Input | Output |
|-------------|---------------|-------------|-------|--------|
| OBS-001 | startObserving() | Begin capturing network traffic for active tab | Tab ID | Capture session |
| OBS-002 | stopObserving() | End capturing and save collected data | Capture session | Network log JSON |
| OBS-003 | filterByTabId() | Filter traffic to specific browser tab | Tab ID | Filtered requests |
| OBS-004 | captureJSFiles() | Capture external JavaScript file contents | Request URL | JS source code |
| OBS-005 | sendToServer() | Transmit captured data to REQ_TRANSMITTER | Network log JSON | API response |
| OBS-006 | authenticateUser() | Login to system with credentials | Username, Password | JWT Token |

#### 1.2.2 REQ_TRANSMITTER API Functions

| Function ID | Endpoint | Method | Description |
|-------------|----------|--------|-------------|
| API-001 | `/api/v1/auth/register` | POST | Register new user account |
| API-002 | `/api/v1/auth/login` | POST | Authenticate user and return JWT |
| API-003 | `/api/v1/filter/rule` | POST | Apply rule-based filtering to network log |
| API-004 | `/api/v1/filter/graph` | POST | Apply graph-based filtering |
| API-005 | `/api/v1/filter/llm` | POST | Apply LLM-based filtering |
| API-006 | `/api/v1/filter/combined` | POST | Apply 3 Steps filtering |
| API-007 | `/api/v1/filter/filter/download/{document_id}` | GET | Download filtered network log |
| API-008 | `/api/v1/generate/module/template` | POST | Generate module template |
| API-009 | `/api/v1/generate/module/static_with_cross_reference` | POST | Generate static module with cross-reference |
| API-010 | `/api/v1/generate/module/dynamic_module/diff_timestamp/rag` | POST | Generate dynamic module with RAG |
| API-011 | `/api/v1/generate/module/download` | GET | Download generated JavaScript file |
| API-012 | `/api/v1/generate/module/download/zip` | GET | Download module with report as ZIP |

#### 1.2.3 LLM Engine Functions

| Function ID | Function Name | Description |
|-------------|---------------|-------------|
| LLM-001 | detectDynamicParameters() | Compare two timestamp captures to identify dynamic values |
| LLM-002 | generateEmptyFunctions() | Create placeholder functions for dynamic parameters |
| LLM-003 | analyzeEncryptedParameter() | Analyze encrypted parameter structure and format |
| LLM-004 | recommendISASFunctions() | Use RAG to suggest top 3 iSAS functions |
| LLM-005 | retrieveExternalJS() | Download and analyze external JavaScript libraries |
| LLM-006 | generateImplementationHints() | Create detailed comments for developer guidance |
| LLM-007 | generateExceptionHandling() | Create validation code from metadata mapping |

#### 1.2.4 VS Code Extension Functions (Integration Pause)

| Function ID | Command | Description |
|-------------|---------|-------------|
| VSC-001 | `coon:login` | Authenticate with REQ_TRANSMITTER server |
| VSC-002 | `coon:logout` | Disconnect and logout |
| VSC-003 | `connect to ws` | Establish WebSocket connection |
| VSC-004 | receiveGeneratedCode() | Receive and display generated module code |
| VSC-005 | saveToWorkspace() | Save received code to local file system |

---

### 1.3 Work Breakdown Structure (WBS)

**Purpose**: Hierarchical decomposition of the total scope of work.

```
CONXAI Project
│
├── 1.0 Project Management
│   ├── 1.1 Project Planning
│   ├── 1.2 Progress Monitoring
│   ├── 1.3 Risk Management
│
├── 2.0 Analysis & Requirements
│   ├── 2.1 Business Requirements Analysis
│   ├── 2.2 Technical Requirements Analysis
│   ├── 2.3 Target Website Analysis
│   │   ├── 2.3.1 NHIS Analysis
│   │   ├── 2.3.2 MinWon24 Analysis
│   │   ├── 2.3.3 Nonghyup Bank Analysis
│   │   └── 2.3.4 KBstar Analysis
│   └── 2.4 iSAS Engine Integration Analysis
│
├── 3.0 REQ_OBSERVER Development
│   ├── 3.1 Chrome Extension Setup
│   │   ├── 3.1.1 Manifest V3 Configuration
│   │   ├── 3.1.2 Background Script Development
│   │   └── 3.1.3 Chrome DevTools Protocol Integration
│   ├── 3.2 UI Pages Development
│   │   ├── 3.2.1 Login Page
│   │   ├── 3.2.2 Home Page
│   │   ├── 3.2.3 Observing Page
│   │   └── 3.2.4 Finish Page
│   ├── 3.3 Traffic Capture Implementation
│   │   ├── 3.3.1 Request Interception
│   │   ├── 3.3.2 Response Capture
│   │   ├── 3.3.3 JS File Capture
│   │   └── 3.3.4 Tab-based Filtering
│   └── 3.4 Server Communication
│       ├── 3.4.1 API Integration
│       └── 3.4.2 Authentication Flow
│
├── 4.0 REQ_TRANSMITTER Development
│   ├── 4.1 FastAPI Backend Setup
│   │   ├── 4.1.1 Project Structure
│   │   ├── 4.1.2 Database Configuration (MongoDB)
│   │   └── 4.1.3 Authentication System (JWT)
│   ├── 4.2 Filtering Pipeline
│   │   ├── 4.2.1 Rule-Based Filter
│   │   ├── 4.2.2 Graph-Based Filter
│   │   └── 4.2.3 LLM-Based Filter
│   ├── 4.3 Module Generation APIs
│   │   ├── 4.3.1 Template Generation
│   │   ├── 4.3.2 Static Module Generation
│   │   ├── 4.3.3 Dynamic Module Generation
│   │   └── 4.3.4 Download Endpoints
│   ├── 4.4 WebSocket Integration
│   └── 4.5 Docker Deployment
│
├── 5.0 LLM Engine Development
│   ├── 5.1 Multi-Timestamp Comparison
│   │   ├── 5.1.1 Parameter Extraction
│   │   ├── 5.1.2 Character-by-Character Comparison
│   │   └── 5.1.3 Dynamic/Static Classification
│   ├── 5.2 RAG System Implementation
│   │   ├── 5.2.1 iSAS Function Documentation
│   │   ├── 5.2.2 Vector Database Setup
│   │   ├── 5.2.3 HyDE Implementation
│   │   └── 5.2.4 Function Recommendation Logic
│   ├── 5.3 External JS Analysis
│   │   ├── 5.3.1 JS File Retrieval
│   │   ├── 5.3.2 Encryption Function Detection
│   │   └── 5.3.3 Implementation Suggestion Generation
│   ├── 5.4 Exception Handling Generation
│   │   ├── 5.4.1 Metadata Registry (CSV)
│   │   ├── 5.4.2 iSASTypes.js Integration
│   │   └── 5.4.3 Validation Code Injection
│   └── 5.5 Claude API Integration
│
├── 6.0 VS Code Extension Development (Paused)
│   ├── 6.1 Extension Setup
│   │   ├── 6.1.1 TypeScript Configuration
│   │   └── 6.1.2 VS Code API Integration
│   ├── 6.2 Authentication Module
│   ├── 6.3 WebSocket Client
│   ├── 6.4 File Management
│   └── 6.5 Command Registration
│
├── 7.0 Testing
│   ├── 7.1 Unit Testing
│   ├── 7.2 Integration Testing
│   ├── 7.3 End-to-End Testing
│   ├── 7.4 Target Website Testing
│   │   ├── 7.4.1 NHIS Module Testing
│   │   ├── 7.4.2 MinWon24 Module Testing
│   │   ├── 7.4.3 Nonghyup Module Testing
│   │   └── 7.4.4 KBstar Module Testing
│   └── 7.5 Performance Testing
│
├── 8.0 Documentation
│   ├── 8.1 Technical Documentation
│   ├── 8.2 API Documentation
│   └── 8.3 Training Materials
│
└── 9.0 Deployment & Handover
    ├── 9.1 Production Deployment
    ├── 9.2 Knowledge Transfer
    └── 9.3 Project Closure
```

---

### 1.4 Project Plan / Schedule

**Purpose**: Timeline with milestones, deadlines, and resource allocation.

#### 1.4.1 Project Timeline

| Phase | Start Date | End Date | Duration | Milestones |
|-------|------------|----------|----------|------------|
| Phase 1: Foundation | June 2025 | July 2025 | 2 months | REQ_OBSERVER POC, CBNU LMS scraping success |
| Phase 2: Real-World Testing | August 2025 | October 2025 | 3 months | Busan office training, KB Bank & HomeTax modules |
| Phase 3: Finishing | November 2025 | December 2025 | 2 months | 8-step flow complete, RAG system operational |

#### 1.4.2 Key Milestones

| Milestone ID | Milestone | Target Date | Status |
|--------------|-----------|-------------|--------|
| M-001 | First proof of concept (CBNU LMS) | July 2025 | ✅ Completed |
| M-002 | Busan office training complete | August 2025 | ✅ Completed |
| M-003 | Dynamic query detection working | October 2025 | ✅ Completed |
| M-004 | RAG system with iSAS functions | October 2025 | ✅ Completed |
| M-005 | API framework ready | November 2025 | ✅ Completed |
| M-006 | External JS analysis (95%) | December 2025 | ✅ Completed |
| M-007 | Final review and handover | December 2025 | ✅ Completed |

#### 1.4.3 Resource Allocation

| Resource | Role | Allocation |
|----------|------|------------|
| AI Convergence Lab Team | Development, Research | 100% |
| COOCON Technical Team | Requirements, Testing, Domain Expertise | 50% |
| COOCON Busan Office | Training, iSAS Knowledge Transfer | As needed |

---

### 1.5 Risk Assessment Document

**Purpose**: Identification of potential risks and mitigation strategies.

| Risk ID | Risk Description | Probability | Impact | Mitigation Strategy |
|---------|------------------|-------------|--------|---------------------|
| R-001 | High-security websites block traffic capture | High | High | Built deeper capture tools using Chrome DevTools Protocol |
| R-002 | LLM context window overflow with large data | Medium | High | Implemented 3-stage filtering funnel to reduce data |
| R-003 | Inconsistent AI code generation | Medium | Medium | Used RAG system to ground AI with iSAS documentation |
| R-004 | Complex encryption logic beyond AI capability | High | Medium | AI generates detailed guides for developer completion |
| R-005 | External JS libraries inaccessible | Medium | Medium | System provides placeholder comments for manual inspection |
| R-006 | Code obfuscation reduces analysis accuracy | Medium | Low | LLM uses pattern matching for common crypto operations |
| R-007 | Website structure changes break scrapers | High | High | Proposed X-Engine with self-healing capabilities (2026) |

---

### 1.6 Feasibility Study

**Purpose**: Technical, economic, and operational feasibility analysis.

#### 1.6.1 Technical Feasibility

| Aspect | Assessment | Evidence |
|--------|------------|----------|
| Chrome Extension Development | ✅ Feasible | Successfully built REQ_OBSERVER with Manifest V3 |
| Network Traffic Capture | ✅ Feasible | Chrome DevTools Protocol captures all traffic including hidden bank traffic |
| LLM-based Code Generation | ✅ Feasible | Claude API successfully generates iSAS-compatible code |
| RAG System Implementation | ✅ Feasible | Vector DB + HyDE provides accurate function recommendations |
| Multi-timestamp Comparison | ✅ Feasible | Successfully identifies dynamic vs static parameters |
| External JS Analysis | ⚠️ Partially Feasible | 95% completion, some native modules cannot be analyzed |

#### 1.6.2 Economic Feasibility

| Metric | Before CONXAI | After CONXAI | Improvement |
|--------|---------------|--------------|-------------|
| Module Development Time | 1-3 days | 1-5 hours | 80-90% reduction |
| Required Developer Expertise | Expert only | Intermediate+ | Lower barrier |
| Code Consistency | Variable | Standardized | Higher quality |
| Maintenance Speed | Slow manual | Fast AI-assisted | Significant improvement |

#### 1.6.3 Operational Feasibility

| Aspect | Assessment | Notes |
|--------|------------|-------|
| User Acceptance | ✅ High | Developers shift from coder to reviewer role |
| Training Requirements | ⚠️ Medium | Requires training on 8-step flow and tools |
| Integration with Existing Systems | ✅ Compatible | Works with existing iSAS engine |
| Scalability | ✅ Good | Docker deployment, async operations |

---

### 1.7 Stakeholder Analysis

**Purpose**: Identification of all stakeholders and their interests.

| Stakeholder | Role | Interest | Influence | Engagement Strategy |
|-------------|------|----------|-----------|---------------------|
| COOCON Corporation | Client | Faster module development, cost reduction | High | Regular progress reports, milestone reviews |
| COOCON Developers | End Users | Easier workflow, better tools | High | Training sessions, feedback collection |
| COOCON Busan Office | Domain Experts | Knowledge transfer, quality assurance | Medium | Collaborative sessions, validation testing |
| AI Convergence Lab | Developer | Research innovation, successful delivery | High | Technical leadership, implementation |
| Chungbuk National University | Academic Partner | Research output, industry collaboration | Low | Progress oversight |

---

## 2. Design Phase

### 2.1 System Architecture Document (SAD)

**Purpose**: High-level structure of the system, components, and their interactions.

#### 2.1.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CONXAI System Architecture                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐         ┌─────────────────────────────────────────┐    │
│  │   User Browser  │         │           REQ_TRANSMITTER               │    │
│  │                 │         │            (FastAPI Backend)            │    │
│  │  ┌───────────┐  │  HTTP   │  ┌─────────────────────────────────┐    │    │
│  │  │    REQ_   │  │ ──────► │  │         API Router              │    │    │
│  │  │ OBSERVER  │  │         │  │  /api/v1/auth/*                 │    │    │
│  │  │ (Chrome   │  │         │  │  /api/v1/filter/*               │    │    │
│  │  │Extension) │  │         │  │  /api/v1/generate/*             │    │    │
│  │  └───────────┘  │         │  └─────────────────────────────────┘    │    │
│  │                 │         │                  │                      │    │
│  └─────────────────┘         │                  ▼                      │    │
│                              │  ┌─────────────────────────────────┐    │    │
│                              │  │      Filtering Pipeline         │    │    │
│                              │  │  ┌─────────┐ ┌─────────┐ ┌─────┐│    │    │
│                              │  │  │ Rule-   │►│ Graph-  │►│ LLM ││    │    │
│                              │  │  │ Based   │ │ Based   │ │Based││    │    │
│                              │  │  └─────────┘ └─────────┘ └─────┘│    │    │
│                              │  └─────────────────────────────────┘    │    │
│                              │                  │                      │    │
│  ┌─────────────────┐         │                  ▼                      │    │
│  │   VS Code       │  WS     │  ┌─────────────────────────────────┐    │    │
│  │                 │ ◄────── │  │         LLM Engine              │    │    │
│  │  ┌───────────┐  │         │  │  • Exception Handling           │    │    │
│  │  │    VS     │  │         │  │  • RAG System (iSAS Functions)  │    │    │
│  │  │ Extension │  │         │  │  • External JS Analysis         │    │    │
│  │  │           │  │         │  │  • Multi-timestamp Comparison   │    │    │
│  │  └───────────┘  │         │  └─────────────────────────────────┘    │    │
│  │                 │         │                  │                      │    │
│  └─────────────────┘         │                  ▼                      │    │
│                              │  ┌─────────────────────────────────┐    │    │
│                              │  │        External Services        │    │    │
│                              │  │  ┌─────────┐ ┌─────────────────┐│    │    │
│                              │  │  │ MongoDB │ │ Claude API      ││    │    │
│                              │  │  │ (Motor) │ │ (Anthropic)     ││    │    │
│                              │  │  └─────────┘ └─────────────────┘│    │    │
│                              │  └─────────────────────────────────┘    │    │
│                              └─────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.1.2 Component Descriptions

| Component | Technology | Purpose | Port |
|-----------|------------|---------|------|
| REQ_OBSERVER | JavaScript, Chrome Extension API | Capture network traffic from browser | N/A |
| REQ_TRANSMITTER | Python, FastAPI | API backend, filtering, module generation | 9011 |
| LLM Engine | Python, LangChain, Claude API | AI-powered code generation and analysis | Internal |
| VS Extension | TypeScript, VS Code API | IDE integration for receiving generated code | N/A |
| MongoDB | MongoDB 7.x, Motor (async) | Data persistence | 9010 |
| Vector DB | FAISS/ChromaDB | Store iSAS function embeddings for RAG | Internal |
| UI Demo | ReactJS | UI Demonstration of API | 9017 |

#### 2.1.3 Data Flow

```
User browses website
        │
        ▼
┌───────────────────┐
│   REQ_OBSERVER    │ ──► Captures all HTTP requests/responses
└───────────────────┘
        │
        ▼ (Network Log JSON)
┌───────────────────┐
│  REQ_TRANSMITTER  │
│                   │
│  Stage 1: Rule    │ ──► Removes images, CSS, fonts, tracking
│  Stage 2: Graph   │ ──► Preserves auth-related dependencies
│  Stage 3: LLM     │ ──► Intelligent final filtering
└───────────────────┘
        │
        ▼ (Filtered Log)
┌───────────────────┐
│    LLM Engine     │
│                   │
│  1. Template      │ ──► Creates module skeleton
│  2. Exceptions    │ ──► Validation code injection
│  3. Detect Dyn    │ ──► Multi-timestamp comparison
│  4. Empty Funcs   │ ──► Placeholder functions
│  5. RAG Suggest   │ ──► iSAS function recommendations
│  6. External JS   │ ──► Analyze encryption libraries
└───────────────────┘
        │
        ▼ (Generated JS Module)
┌───────────────────┐
│   VS Extension    │ ──► Developer reviews and finalizes
└───────────────────┘
        │
        ▼
┌───────────────────┐
│   iSAS Engine     │ ──► Execute scraping module
└───────────────────┘
```

---

### 2.2 Database Design Document

**Purpose**: Entity-Relationship Diagrams, schema definitions, data models.

#### 2.2.1 MongoDB Collections

##### Users Collection
```javascript
{
  "_id": ObjectId,
  "username": String,           // Unique username
  "email": String,              // User email
  "hashed_password": String,    // bcrypt hashed password
  "created_at": DateTime,
  "updated_at": DateTime,
  "is_active": Boolean
}
```

##### NetworkLogs Collection
```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,          // Reference to Users
  "session_id": String,         // Capture session identifier
  "website_url": String,        // Target website
  "captured_at": DateTime,
  "raw_log": Object,            // Original captured data
  "filtered_log": Object,       // After filtering pipeline
  "status": String              // "raw", "filtered", "processed"
}
```

##### GeneratedModules Collection
```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "network_log_id": ObjectId,   // Reference to NetworkLogs
  "module_name": String,        // e.g., "NHIS_로그인"
  "module_type": String,        // "static", "dynamic"
  "generated_code": String,     // JavaScript code
  "dynamic_parameters": Array,  // List of detected dynamic params
  "isas_suggestions": Array,    // RAG-recommended functions
  "created_at": DateTime,
  "version": Number
}
```

##### FilterResults Collection
```javascript
{
  "_id": ObjectId,
  "network_log_id": ObjectId,
  "filter_type": String,        // "rule", "graph", "llm"
  "input_count": Number,        // Requests before filtering
  "output_count": Number,       // Requests after filtering
  "filtered_data": Object,
  "processing_time_ms": Number,
  "created_at": DateTime
}
```

#### 2.2.2 Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────────┐       ┌──────────────────┐
│   Users     │       │  NetworkLogs    │       │ GeneratedModules │
├─────────────┤       ├─────────────────┤       ├──────────────────┤
│ _id (PK)    │◄──────│ user_id (FK)    │◄──────│ user_id (FK)     │
│ username    │   1:N │ _id (PK)        │   1:N │ network_log_id   │
│ email       │       │ session_id      │       │ _id (PK)         │
│ password    │       │ website_url     │       │ module_name      │
│ created_at  │       │ raw_log         │       │ generated_code   │
└─────────────┘       │ filtered_log    │       └──────────────────┘
                      └─────────────────┘
                              │
                              │ 1:N
                              ▼
                      ┌─────────────────┐
                      │ FilterResults   │
                      ├─────────────────┤
                      │ _id (PK)        │
                      │ network_log_id  │
                      │ filter_type     │
                      │ filtered_data   │
                      └─────────────────┘
```

---

### 2.3 API Specification Document

**Purpose**: Detailed documentation of all API endpoints, request/response formats.

#### 2.3.1 Authentication APIs

##### POST /api/v1/auth/register

**Description**: Register a new user account.

**Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "string",
    "username": "string"
  }
}
```

##### POST /api/v1/auth/login

**Description**: Authenticate user and return JWT token.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "access_token": "string",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### 2.3.2 Filtering APIs

##### POST /api/v1/filter/rule

**Description**: Apply rule-based filtering to copy the network logs and replace in array part of request body.

**Request Body**:
```json
{
  "log_entries": [
    {
      "additionalProp1": {}
    }
  ]
}
```

**Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Rule base filter applied",
  "data": {
    "timestamp": "2026-01-13T10:31:22.801106+09:00",
    "result_id": "6965a06a4eebf05576b52dd7",
    "user_email": "heang01@gmail.com",
    "data": [
      {
        "type": "Network.requestWillBeSent",
        "timestamp": "2025-12-24T15:56:47.053Z",
        "data": {...}
      }
    ]
  }
}
```

##### POST /api/v1/filter/graph

**Description**: Apply graph-based filtering preserving auth dependencies.

**Request Body**:
```json
{
  "additionalProp1": {}
}
```

**Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Graph filter applied",
  "data": {
    "user_email": "heang01@gmail.com",
    "data": {
      "metadata": {
        "total_steps": 0,
        "original_steps": 19,
        "auth_type": "certificate_based",
        "uses_certificates": false,
        "uses_websocket": false,
        "security_modules": []
      },
      "execution_steps": [
        {
          "order": 1,
          "url": "https://plus.gov.kr/api/user/v1.0/anySignLite/anySignLiteEx",
          "method": "POST",
        },
        {...}
      ]
    }
  }
}
```

##### POST /api/v1/filter/llm

**Description**: Apply LLM-based intelligent filtering.

**Request Body**:
```json
{
  "additionalProp1": {}
}
```

**Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Complete analysis pipeline completed",
  "data": {
    "user_email": "heang01@gmail.com",
    "data": {
      "metadata": {
        "total_steps": 6,
        "original_steps": 0,
        "auth_type": "certificate_based",
        "uses_certificates": false,
        "uses_websocket": false,
        "security_modules": [],
        "optimization_applied": true
      },
      "execution_steps": [
        {
          "order": 1,
          "url": "https://plus.gov.kr/api/user/v1.0/anySignLite/anySignLiteEx",
          "method": "POST",
        },
        {...}
      ]
    }
  }
}
```

#### 2.3.3 Module Generation APIs

##### POST /api/v1/generate/module/template

**Description**: Generate basic module template.

**Request Body**:
```json

{
  "metadata": [
    {
      "institute": "minwon",
      "institute_id": "minwon",
      "class_name": "개인뱅킹",
      "job": "로그인",
      "url": "https://plus.gov.kr",
      "input": "{로그인방식:required;인증서:{이름:required;만료일자:optional;비밀번호:required}}",
      "output": "{ErrorCode:required, ErrorMessage:optional, Result:{Name:required, AccountNum: required}}"
    }
  ]
}

```

**Response (200 OK)**:
```json
{
  "message": "Template modules generated successfully from input.",
  "details": {
    "filename": "minwon_로그인_X.X.X.1.js",
    "institute": "minwon",
    "institute_id": "minwon",
    "class": "개인뱅킹",
    "job": "로그인",
    "version": "X.X.X.1"
  }
}
```

##### POST /api/v1/generate/module/dynamic_module/diff_timestamp/rag

**Description**: Generate dynamic module using multi-timestamp comparison and RAG.

**Request Body**:
```json
{
  "The older module file": "minwon_로그인_X.X.X.1.js",
  "The newer module file": "minwon_로그인_X.X.X.2.js,
  "network_logs_data": "Network logs JSON file"
}
```

**Response (200 OK)**:
```json
{
  "message": "Dynamic module analysis with LLM-powered function generation completed.",
  "status": "success",
  "files": {
    "new_module": "minwon_로그인_26.1.12.7_implemented.js",
    "report_file": "minwon_로그인_26.1.12.7"
  }
}
```

##### GET /api/v1/generate/module/download/zip

**Description**: Download module with report as ZIP file.

**Query Parameters**:
- `module_filename`: filename of the generated module
- `report_filename`: filename of the report

**Response**: `application/zip` file containing:
- `{module_name}.js` - Generated module
- `report.txt` - Human-readable analysis report

---

### 2.4 UI/UX Design Document

**Purpose**: Wireframes, mockups, user flow diagrams, style guides.

#### 2.4.1 REQ_OBSERVER UI Pages

##### Login Page (`pages/login.html`)
```
┌─────────────────────────────────────┐
│          CONXAI Login               │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────────────────────┐      │
│    │ Username                │      │
│    └─────────────────────────┘      │
│                                     │
│    ┌─────────────────────────┐      │
│    │ Password                │      │
│    └─────────────────────────┘      │
│                                     │
│    ┌─────────────────────────┐      │
│    │        LOGIN            │      │
│    └─────────────────────────┘      │
│                                     │
└─────────────────────────────────────┘
```

##### Home Page (`pages/home.html`)
```
┌─────────────────────────────────────┐
│          CONXAI Observer            │
├─────────────────────────────────────┤
│                                     │
│  Welcome, {username}                │
│                                     │
│  ┌─────────────────────────────┐    │
│  │   Start New Observation     │    │
│  └─────────────────────────────┘    │
│                                     │
│  Recent Sessions:                   │
│  ├─ NHIS_2025-12-01 [View]         │
│  ├─ KBstar_2025-11-28 [View]       │
│  └─ HomeTax_2025-11-25 [View]      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │         Logout              │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

##### Observing Page (`pages/observing.html`)
```
┌─────────────────────────────────────┐
│       🔴 Recording Active           │
├─────────────────────────────────────┤
│                                     │
│  Target: https://www.nhis.or.kr     │
│  Tab ID: 12345                      │
│  Duration: 00:02:35                 │
│                                     │
│  Captured Requests: 127             │
│  ├─ GET:  89                        │
│  ├─ POST: 38                        │
│  └─ JS Files: 26                    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │      Stop Recording         │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

##### Finish Page (`pages/finish.html`)
```
┌─────────────────────────────────────┐
│      ✅ Observation Complete        │
├─────────────────────────────────────┤
│                                     │
│  Session: NHIS_2025-12-01           │
│  Total Requests: 127                │
│  Duration: 00:03:45                 │
│                                     │
│  ┌─────────────────────────────┐    │
│  │    Preview Captured Data    │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │    Send to Server           │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │    Start New Session        │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

#### 2.4.2 User Flow Diagram

```
┌─────────┐     ┌─────────┐     ┌───────────┐     ┌─────────┐     ┌────────┐
│  Login  │ ──► │  Home   │ ──► │ Observing │ ──► │ Preview │ ──► │ Finish │
└─────────┘     └─────────┘     └───────────┘     └─────────┘     └────────┘
     │               │                │                │              │
     │               │                │                │              │
     ▼               ▼                ▼                ▼              ▼
  Validate       Start New        Stop When        Review          Send to
  Credentials    Session          Done             Data            Server
```

---

### 2.5 Security Design Document

**Purpose**: Authentication, authorization, encryption, and security protocols.

#### 2.5.1 Authentication

| Aspect | Implementation |
|--------|----------------|
| Method | JWT (JSON Web Token) |
| Token Expiry | 1 hour (configurable) |
| Refresh Token | Not implemented (future enhancement) |
| Password Storage | bcrypt with salt |

#### 2.5.2 Authorization

| Role | Permissions |
|------|-------------|
| User | Capture traffic, filter, generate modules, download |
| Admin | All user permissions + user management (future) |

#### 2.5.3 Data Protection

| Data Type | Protection Method |
|-----------|-------------------|
| Passwords | bcrypt hashing |
| API Communication | HTTPS |
| JWT Tokens | Signed with secret key |
| Sensitive Logs | Stored in MongoDB with access control |

#### 2.5.4 Security Best Practices

- Input validation on all API endpoints
- Rate limiting on authentication endpoints
- CORS configuration for allowed origins
- No sensitive data in error messages
- Logging of security events

---

## 3. Development Phase

*Actual code and technical documentation produced during implementation.*

### 3.1 Source Code Structure

**Purpose**: All application code, properly commented and version-controlled.

#### 3.1.1 Repository Structure

```
scraping-agent-coocon/
│
├── req_observer/                    # Chrome Extension
│   ├── manifest.json                # Extension configuration
│   ├── popup.html                   # Extension popup
│   ├── js/
│   │   ├── background.js            # Service worker, traffic capture
│   │   ├── popup.js                 # Popup logic
│   │   ├── common.js                # Shared utilities
│   │   └── pages/
│   │       ├── login.js
│   │       ├── home.js
│   │       ├── observing.js
│   │       ├── preview.js
│   │       └── finish.js
│   ├── css/
│   │   ├── styles.css
│   │   └── pages/
│   └── pages/
│       ├── login.html
│       ├── home.html
│       ├── observing.html
│       ├── preview.html
│       └── finish.html
│
├── req_transmitter/                 # FastAPI Backend
│   ├── main.py                      # Application entry point
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── app/
│   │   ├── api/
│   │   │   ├── router.py            # Main API router
│   │   │   └── endpoints/
│   │   │       ├── authentication.py
│   │   │       ├── user.py
│   │   │       ├── module_generation.py
│   │   │       ├── vscode_status.py
│   │   │       └── filtering/
│   │   │           ├── filter.py
│   │   │           ├── rule_filter.py
│   │   │           ├── graph_filter.py
│   │   │           └── llm_filter.py
│   │   ├── core/
│   │   │   ├── config.py            # Settings
│   │   │   ├── llm_config.py        # LLM configuration
│   │   │   ├── oAuth.py             # JWT handling
│   │   │   ├── vscode_utils.py
│   │   │   └── websocket_manager.py
│   │   ├── database/
│   │   │   └── db_config.py         # MongoDB connection
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── model.py
│   │   │   ├── filter_model.py
│   │   │   ├── graph_filter_model.py
│   │   │   └── auth_flow.py
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   ├── generation_schema.py
│   │   │   ├── global_response.py
│   │   │   └── user_schema/
│   │   ├── services/
│   │   │   ├── filter_service.py
│   │   │   ├── graph_filter_service.py
│   │   │   ├── llm_filter_service.py
│   │   │   └── isas/
│   │   │       ├── ai_service.py    # LLM integration
│   │   │       └── isas_testing_service.py
│   │   ├── prompts/                 # LLM prompt templates
│   │   │   └── ISAS_prompts/
│   │   └── templates/               # Code templates
│   │       └── ISAS_Login_template.js
│   └── code_generate/               # Generated code output
│
├── vs_extension/                    # VS Code Extension
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── extension.ts             # Main extension entry
│   │   ├── auth.ts                  # Authentication
│   │   ├── constants/
│   │   │   └── config.ts
│   │   ├── services/
│   │   │   ├── apiServices.ts
│   │   │   └── webSocket/
│   │   │       ├── webSocketClient.ts
│   │   │       └── onMessageCallBack.ts
│   │   └── utils/
│   │       ├── connectionWebSocket.ts
│   │       └── fileUtils.ts
│   └── dist/                        # Compiled output
│
├── proof_of_concept/                # Python utilities & testing
│   ├── src/
│   │   ├── 01_rule_based_filtering_v3.py
│   │   ├── 02_graph_based_filtering_v5.py
│   │   ├── 03_llm_based_filtering.py
│   │   ├── 04_framework_module_generator.py
│   │   └── module_generation_test/
│   └── resources/
│       ├── documents/               # iSAS documentation
│       └── sample_data/             # Test network logs
│
└── documentations/                  # Project documentation
    ├── flow.excalidraw
    └── CONXAI_Project_Deliverables.md
```

---

### 3.2 API Documentation

**Purpose**: Swagger/OpenAPI specs, endpoint descriptions, usage examples.

#### 3.2.1 OpenAPI Specification Location

```
req_transmitter/app/api/API_DOCUMENTATION.md
req_transmitter/app/api/API_DOCUMENTATION.txt
```

#### 3.2.2 Accessing Interactive Documentation

When the server is running, access:
- Swagger UI: `http://localhost:9011/docs`
- ReDoc: `http://localhost:9011/redoc`

---

### 3.3 Configuration Files

**Purpose**: Environment configs, deployment configs, CI/CD pipelines.

#### 3.3.1 Environment Variables

**File**: `req_transmitter/.env`

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000

# Database Configuration
MONGODB_URL=mongodb://mongo:27017
DATABASE_NAME=conxai_db

# Authentication
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# LLM Configuration
ANTHROPIC_API_KEY=your-api-key-here
LLM_MODEL=claude-3-sonnet-20240229

# WebSocket
WS_HOST=0.0.0.0
WS_PORT=8001
```

#### 3.3.2 Docker Configuration

**File**: `req_transmitter/docker-compose.yml`

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "9011:8000"
    environment:
      - MONGODB_URL=mongodb://mongo:27017
    depends_on:
      - mongo
    networks:
      - scraping-agent-coocon-network

  mongo:
    image: mongo:7
    ports:
      - "9010:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - scraping-agent-coocon-network

volumes:
  mongodb_data:

networks:
  scraping-agent-coocon-network:
    driver: bridge
```

---

### 3.4 Developer Guide

**Purpose**: Setup instructions, coding standards, contribution guidelines.

#### 3.4.1 Development Environment Setup

##### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose
- Google Chrome (for extension development)
- VS Code (for extension development)

##### Backend Setup (REQ_TRANSMITTER)

```bash
# Navigate to backend directory
cd req_transmitter

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB (using Docker)
docker-compose up -d mongo

# Run development server
python main.py
```

##### Chrome Extension Setup (REQ_OBSERVER)

```bash
# Navigate to extension directory
cd req_observer

# Load in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the req_observer folder
```

##### VS Code Extension Setup

```bash
# Navigate to extension directory
cd vs_extension

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in VS Code:
# 1. Open folder in VS Code
# 2. Press F5 to launch Extension Development Host
```

#### 3.4.2 Coding Standards

| Language | Standard | Tools |
|----------|----------|-------|
| Python | PEP 8 | flake8, black |
| JavaScript | ESLint (Airbnb) | eslint |
| TypeScript | ESLint + TypeScript rules | eslint, tsc |

---

## 4. Testing Phase

*Documents ensuring quality assurance and validation.*

### 4.1 Test Plan

**Purpose**: Overall testing strategy, scope, approach, and schedule.

#### 4.1.1 Testing Scope

| Component | Test Types | Priority |
|-----------|------------|----------|
| REQ_OBSERVER | Manual UI testing, Integration | High |
| REQ_TRANSMITTER | Unit, Integration, API | High |
| LLM Engine | Integration, Accuracy testing | High |
| VS Extension | Manual, Integration | Medium |
| End-to-End | Full pipeline testing | High |

#### 4.1.2 Testing Approach

| Test Level | Description | Tools |
|------------|-------------|-------|
| Unit Tests | Individual function testing | pytest |
| Integration Tests | Component interaction testing | pytest, httpx |
| API Tests | Endpoint validation | pytest, Postman |
| Manual Tests | UI/UX validation | Manual checklist |
| Accuracy Tests | LLM output validation | Manual comparison |

---

### 4.2 Test Cases Document

**Purpose**: Detailed test cases with inputs, expected outputs, and steps.

#### 4.2.1 REQ_OBSERVER Test Cases

| TC-ID | Test Case | Steps | Expected Result |
|-------|-----------|-------|-----------------|
| OBS-TC-001 | User login | 1. Enter credentials 2. Click Login | JWT token stored, redirect to Home |
| OBS-TC-002 | Start observation | 1. Click "Start" 2. Browse target site | Traffic capture begins |
| OBS-TC-003 | Stop observation | 1. Click "Stop" | Capture saved, redirect to Finish |
| OBS-TC-004 | Send to server | 1. Click "Send" | Data sent, confirmation displayed |
| OBS-TC-005 | Tab isolation | 1. Open multiple tabs 2. Observe one | Only target tab captured |

#### 4.2.2 REQ_TRANSMITTER Test Cases

| TC-ID | Test Case | Endpoint | Expected Result |
|-------|-----------|----------|-----------------|
| API-TC-001 | User registration | POST /auth/register | 201, user created |
| API-TC-002 | User login | POST /auth/login | 200, JWT returned |
| API-TC-003 | Invalid login | POST /auth/login | 401, error message |
| API-TC-004 | Rule-based filter | POST /filter/rule/file | Filtered log, count reduced |
| API-TC-005 | Graph-based filter | POST /filter/graph/json | Dependencies preserved |
| API-TC-006 | Template generation | POST /generate/module/template | Valid JS template |
| API-TC-007 | Dynamic module gen | POST /generate/module/dynamic_module/diff_timestamp/rag | Dynamic params detected |

#### 4.2.3 LLM Engine Test Cases

| TC-ID | Test Case | Input | Expected Result |
|-------|-----------|-------|-----------------|
| LLM-TC-001 | Dynamic param detection | Two timestamp logs | signedMsg, vidInfo identified |
| LLM-TC-002 | RAG function suggestion | signedMsg parameter | XecureWeb.signDataCMS in top 3 |
| LLM-TC-003 | External JS retrieval | NHIS network log | AnySign library identified |
| LLM-TC-004 | Exception handling | metadata.csv + iSASTypes.js | Validation code generated |

---

### 4.3 Module-Specific Evaluation Results

**Purpose**: Validation of generated modules against target websites.

#### 4.3.1 Dynamic Parameter Detection Accuracy

| Module | Total Params | COOCON DP | Our DP | Matched | Unmatched | Missed |
|--------|--------------|-----------|--------|---------|-----------|--------|
| Nonghyup | 30 | 7 | 10 | 6 | 3 | 1 |
| MinWon | 22 | 6 | 6 | 6 | 0 | 0 |
| KBstar | 86 | 2 | 5 | 1 | 4 | 1 |
| NHIS | 14 | 3 | 7 | 3 | 4 | 0 |

*DP = Dynamic Parameter*

#### 4.3.2 iSAS Function Recommendation Accuracy

| Module | Parameter | COOCON Function | AI Top 3 Suggestions | Match |
|--------|-----------|-----------------|----------------------|-------|
| KBstar | PKCS7 | certManager.SignData | certManager.PKCS7SignData, certManager.SignData, certManager.LoadCert | ✅ |
| KBstar | VID_RANDOM | certManager.getVidRandom | certManager.getVidRandom, certManager.getEncryptedVidRandom, SaltEncoder.GenRandomString | ✅ |
| NHIS | signedMsg | XecureWeb.signDataCMS | certManager.PKCS7SignData, certManager.SignDataWithYessign_hashcontent, XecureWeb.signDataCMS | ✅ |
| MinWon | signedVals | XecureWeb.signDataCMS | certManager.PKCS7SignData, certManager.SignDataWithYessign_hashcontent, XecureWeb.signDataCMS | ✅ |

---

### 4.4 Performance Test Report

**Purpose**: Load testing, stress testing, scalability analysis.

#### 4.4.1 API Response Time

| Endpoint | Average Response Time | Target | Status |
|----------|----------------------|--------|--------|
| POST /auth/login | 120ms | < 500ms | ✅ Pass |
| POST /filter/rule/file | 850ms | < 2000ms | ✅ Pass |
| POST /filter/graph/json | 1.2s | < 3000ms | ✅ Pass |
| POST /filter/llm/generate | 8.5s | < 15000ms | ✅ Pass |
| POST /generate/module/template | 2.1s | < 5000ms | ✅ Pass |
| POST /generate/module/dynamic_module/diff_timestamp/rag | 45s | < 60000ms | ✅ Pass |

#### 4.4.2 Filtering Pipeline Efficiency

| Website | Raw Requests | After Rule | After Graph | After LLM | Reduction |
|---------|--------------|------------|-------------|-----------|-----------|
| KBstar | 56 | 39 | 4 | 1 | 98.2% |
| NHIS | 127 | 85 | 12 | 5 | 96.1% |
| MinWon | 89 | 62 | 8 | 4 | 95.5% |

---

## 5. Deployment Phase

*Documents for releasing the system to production.*

### 5.1 Deployment Guide

**Purpose**: Step-by-step instructions for deploying to production.

#### 5.1.1 Server Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 2 cores | 4 cores |
| RAM | 4 GB | 8 GB |
| Storage | 20 GB | 50 GB |
| OS | Ubuntu 20.04+ | Ubuntu 22.04 |

#### 5.1.2 Deployment Steps

##### Step 1: Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add user to docker group
sudo usermod -aG docker $USER
```

##### Step 2: Clone Repository

```bash
git clone https://github.com/kvsovanreach/scraping-agent-coocon.git
cd scraping-agent-coocon
```

##### Step 3: Configure Environment

```bash
cd req_transmitter
cp .env.example .env
nano .env  # Edit configuration
```

##### Step 4: Deploy with Docker

```bash
# Build and start containers
docker-compose up -d --build

# Verify deployment
docker-compose ps
docker-compose logs -f api
```

##### Step 5: Verify Deployment

```bash
# Test API health
curl http://localhost:9011/health

# Test authentication
curl -X POST http://localhost:9011/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test"}'
```

---

### 5.2 Infrastructure Diagram

**Purpose**: Network topology, server architecture, cloud resources.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONXAI Infrastructure                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     Production Server                     │   │
│  │                    (Ubuntu 22.04 LTS)                     │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │                  Docker Network                      │ │   │
│  │  │           (scraping-agent-coocon-network)           │ │   │
│  │  │                                                      │ │   │
│  │  │   ┌─────────────────┐    ┌─────────────────┐        │ │   │
│  │  │   │                 │    │                 │        │ │   │
│  │  │   │  API Container  │◄──►│ MongoDB Container│       │ │   │
│  │  │   │  (FastAPI)      │    │ (MongoDB 7)     │        │ │   │
│  │  │   │                 │    │                 │        │ │   │
│  │  │   │  Port: 8000     │    │  Port: 27017    │        │ │   │
│  │  │   └─────────────────┘    └─────────────────┘        │ │   │
│  │  │           │                      │                   │ │   │
│  │  └───────────┼──────────────────────┼───────────────────┘ │   │
│  │              │                      │                     │   │
│  │  ┌───────────▼──────────────────────▼───────────────────┐ │   │
│  │  │              Port Mapping (Host)                     │ │   │
│  │  │         9011:8000 (API)    9010:27017 (DB)          │ │   │
│  │  └───────────────────────────────────────────────────────┘ │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ HTTPS                             │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    External Services                      │   │
│  │                                                           │   │
│  │   ┌─────────────────┐         ┌─────────────────┐        │   │
│  │   │  Claude API     │         │  Target Websites │        │   │
│  │   │  (Anthropic)    │         │  (NHIS, KBstar)  │        │   │
│  │   └─────────────────┘         └─────────────────┘        │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5.3 Release Notes

**Purpose**: Version history, new features, bug fixes, known issues.

#### Version 1.0.0 (December 2025)

##### New Features
- REQ_OBSERVER Chrome extension for traffic capture
- 3-stage filtering pipeline (Rule, Graph, LLM)
- Multi-timestamp dynamic parameter detection
- RAG system for iSAS function recommendations
- External JavaScript retrieval and analysis
- Metadata-driven exception handling generation
- VS Code extension for receiving generated code

##### Supported Target Websites
- NHIS (National Health Insurance)
- MinWon24 (Government 24)
- Nonghyup Bank
- KBstar

##### Known Issues
- External JS analysis limited to 95% coverage
- Some native modules (ActiveX) cannot be analyzed
- VS Code extension integration not fully complete

##### Breaking Changes
- N/A (Initial release)

---

## 6. Operations & Maintenance Phase

*Documents for ongoing support and future development.*

### 6.1 User Manual

**Purpose**: End-user documentation for operating the system.

#### 6.1.1 Getting Started

##### Step 1: Install REQ_OBSERVER

1. Download the extension from the provided package
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. Pin the extension to the toolbar

##### Step 2: Login

1. Click the extension icon
2. Enter your credentials
3. Click "Login"

##### Step 3: Capture Traffic

1. Navigate to the target website (e.g., NHIS)
2. Click "Start Observation" in the extension
3. Perform the login process on the target website
4. Click "Stop Observation" when complete

##### Step 4: Generate Module

1. Review captured data in the Preview page
2. Click "Send to Server"
3. Wait for processing to complete
4. Download the generated module

#### 6.1.2 Best Practices

- Capture traffic at two different times for accurate dynamic parameter detection
- Clear browser cache before capturing for cleaner data
- Ensure stable internet connection during capture
- Review generated code and AI suggestions before production use

---

### 6.2 Administrator Guide

**Purpose**: System administration, configuration, monitoring instructions.

#### 6.2.1 Server Administration

##### Monitoring Containers

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f api
docker-compose logs -f mongo

# Check resource usage
docker stats
```

##### Database Administration

```bash
# Access MongoDB shell
docker-compose exec mongo mongosh

# Backup database
docker-compose exec mongo mongodump --out /backup

# Restore database
docker-compose exec mongo mongorestore /backup
```

##### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart api

# Rebuild and restart
docker-compose up -d --build
```

#### 6.2.2 Configuration Management

| Configuration | Location | Description |
|---------------|----------|-------------|
| API Settings | `.env` | Environment variables |
| Docker Config | `docker-compose.yml` | Container orchestration |
| LLM Prompts | `app/prompts/` | AI prompt templates |
| Code Templates | `app/templates/` | Module generation templates |

---

### 6.3 Troubleshooting Guide

**Purpose**: Common issues and their solutions.

| Issue | Symptoms | Solution |
|-------|----------|----------|
| API not responding | 502/503 errors | Check Docker containers: `docker-compose ps` |
| MongoDB connection failed | Connection timeout | Verify MongoDB container: `docker-compose logs mongo` |
| LLM timeout | Generation takes > 60s | Check API key, reduce input size |
| Extension not capturing | Empty network log | Ensure correct tab selected, check permissions |
| Dynamic params not detected | All params static | Ensure two captures at different times |
| iSAS function not found | Empty suggestions | Verify RAG vector DB is populated |

---

### 6.4 2026 Roadmap

**Purpose**: Planned enhancements and future development.

| Quarter | Goal | Description |
|---------|------|-------------|
| Q1 2026 | VS Code Tool Launch | Complete Agentic Terminal integration |
| Q2 2026 | 100% JS Analysis | Full external JavaScript analysis coverage |
| Q3 2026 | Self-Correction Loop | AI-driven bug fixing with iSAS engine |
| Q4 2026 | Full Team Training | Roll out to all COOCON developers |

##### Future Recommendations

1. **COOCON Agentic Terminal (CAT)**
   - Terminal-based AI tool for VS Code
   - Commands: `coocon-agent capture`, `coocon-agent filter`, `coocon-agent build`, `coocon-agent secure`

2. **X-Engine (Next-Gen Execution Engine)**
   - AI-native design with built-in hooks
   - 1-click automated deployment
   - Real-time self-healing dashboard
   - Closed-loop automation

---

## 7. Project Closure Phase
### 7.1 Project Completion Report

**Purpose**: Summary of achievements, deliverables, outcomes.

#### 7.1.1 Executive Summary

The CONXAI project successfully delivered an AI-based automatic scraping module generation system over 7 months (June-December 2025). The system transforms manual scraping development (1-3 days) into AI-assisted workflow (1-5 hours), achieving the primary business objective.

#### 7.1.2 Deliverables Status

| Deliverable | Status | Notes |
|-------------|--------|-------|
| REQ_OBSERVER (Chrome Extension) | ✅ Complete | Captures all traffic including hidden bank traffic |
| REQ_TRANSMITTER (FastAPI Backend) | ✅ Complete | 3-stage filtering, module generation APIs |
| LLM Engine | ✅ Complete | Multi-timestamp, RAG, external JS analysis |
| VS Code Extension | ⚠️ 80% Complete | WebSocket integration needs refinement |
| Documentation | ✅ Complete | Technical report, API docs, user guides |

#### 7.1.3 Key Achievements

| Metric | Target | Achieved |
|--------|--------|----------|
| Module Development Time | < 5 hours | 1-5 hours ✅ |
| Target Websites Supported | 4 | 4 (NHIS, MinWon24, NH, KBstar) ✅ |
| Dynamic Parameter Detection | > 80% accuracy | 85% average ✅ |
| iSAS Function Recommendation | Top 3 contains correct | 100% ✅ |
| External JS Analysis | > 90% | 95% ✅ |

---

### 7.2 Lessons Learned Document

**Purpose**: What went well, what could be improved for future projects.

#### 7.2.1 What Went Well

| Area | Success Factor |
|------|----------------|
| Traffic Capture | Chrome DevTools Protocol enabled capture of hidden traffic |
| Filtering | 3-stage funnel effectively reduced data by 95%+ |
| RAG System | HyDE + vector DB provided accurate function recommendations |
| Collaboration | Busan office training provided critical domain knowledge |
| Multi-timestamp | Character-by-character comparison outperformed LLM inference |

#### 7.2.2 Areas for Improvement

| Area | Challenge | Recommendation |
|------|-----------|----------------|
| Native Modules | Cannot analyze ActiveX/NPAPI plugins | Develop workaround or documentation |
| Code Obfuscation | Reduces LLM accuracy | Implement deobfuscation preprocessing |
| VS Code Integration | Not fully complete | Prioritize in Q1 2026 |
| Testing Automation | Manual testing dominant | Implement automated E2E tests |

#### 7.2.3 Technical Insights

1. **Multi-timestamp comparison is more reliable than single-log LLM inference** for dynamic parameter detection
2. **RAG significantly improves LLM accuracy** by grounding with domain-specific knowledge
3. **3-stage filtering is essential** for managing LLM context window and API costs
4. **External JS analysis requires iterative refinement** for different security libraries

## 8. Deliverables Checklist

### Phase 1: Analysis & Planning

- [x] Software Requirements Specification
- [x] Functional Specification
- [x] Work Breakdown Structure
- [x] Project Plan / Schedule
- [x] Risk Assessment Document
- [x] Feasibility Study

### Phase 2: Design

- [x] System Architecture Document
- [x] Database Design Document
- [x] API Specification Document
- [x] UI/UX Design Document
- [x] Security Design Document

### Phase 3: Development

- [x] Source Code (REQ_OBSERVER)
- [x] Source Code (REQ_TRANSMITTER)
- [x] Source Code (LLM Engine)
- [x] Source Code (VS Extension)
- [x] API Documentation
- [x] Configuration Files

### Phase 4: Testing

- [x] Test Plan
- [x] Test Cases Document
- [x] Module-Specific Evaluation Results
- [x] Performance Test Report

### Phase 5: Deployment

- [x] Deployment Guide
- [x] Infrastructure Diagram
- [x] Release Notes
- [x] Docker Configuration

### Phase 7: Project Closure

- [x] Project Completion Report
- [x] 2026 Roadmap
- [x] Asset Inventory
