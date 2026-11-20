# MLForge AI: An Agentic AI-Based Autonomous AutoML Platform

MLForge AI is an intelligent, agentic AI-powered AutoML platform designed to automate the machine learning development lifecycle. Users can upload tabular datasets and describe their machine learning objectives using natural language. The system orchestrates specialized AI agents to analyze datasets, formulate execution strategies, preprocess features, generate Python ML code, execute models, debug runtime errors, evaluate performance, and generate comprehensive reports.

---

## 🛠️ Strict Technology Stack

- **Frontend:** React.js, React Router DOM, HTML5, Standard CSS3 (Custom Design System with CSS variables), Lucide React.
  - *No Next.js, No Streamlit, No Vue, No Angular, No Tailwind CSS.*
- **Backend:** Python FastAPI, Uvicorn, Pydantic, SQLAlchemy, PyJWT, bcrypt.

---

## 📊 Phase 4: Dataset Upload & ML Configuration Interface (`/dashboard/create-project`)

An interactive 6-step wizard enabling users to upload tabular datasets, inspect schema profiles, configure machine learning problem definitions, specify natural language objectives, and select the prediction target column before launching autonomous AI agent swarms.

### Workflow Steps:
1. **Dataset Upload (`Step 01`):** Drag-and-drop or file browser zone with strict `.csv` file validation, file size limit enforcement (up to 50 MB), and selected file metadata chip with Replace/Remove controls.
2. **Dataset Preview & Profiling (`Step 02`):** Zero-dependency browser-memory CSV parsing (`csvParser.js`), reporting row count, column count, memory size, duplicate rows, scrollable data table (first 10 rows), column-by-column inferred types (`Numerical`, `Categorical`, `Boolean`, `Datetime`, `Text`), and missing value bars.
3. **ML Task Configuration (`Step 03`):** Selectable, mutually-exclusive cards for **Classification** (discrete labels, ROC-AUC, F1-Score) and **Regression** (continuous quantities, RMSE, R² Score) with no pre-selection by default.
4. **Requirement Description (`Step 04`):** Multi-line natural-language objective input with character counter (0 / 1000), minimum length validation, and one-click quick prompt suggestions.
5. **Target Column Selection (`Step 05`):** Dynamically populated dropdown containing parsed CSV headers, providing the ground-truth variable ($Y$) with selected data type and missingness profile.
6. **Configuration Review & Verification (`Step 06`):** Structured summary cards with direct "Edit" shortcuts back to individual steps and a *"Continue to Agent Workflow"* CTA with frontend-only milestone feedback banner.

---

## 🗄️ Database & API Integration Readiness (Zero Demo Data)

All demo records, hardcoded mock datasets, fake model benchmarks, and sample activity logs have been removed. The frontend architecture is organized for direct database and API connection.

### 1. Centralized API Endpoint Mapping (`src/config/api.js`)
Configured to consume `VITE_API_URL` (defaulting to `http://localhost:8000`):
- **Authentication:** `/api/auth/*`
- **Dashboard Metrics:** `/api/dashboard/stats`, `/api/dashboard/quota`, `/api/dashboard/activity`, `/api/dashboard/notifications`
- **Projects:** `/api/projects`
- **Datasets:** `/api/datasets`
- **Model Results:** `/api/results`
- **Reports:** `/api/reports`

### 2. Service Layer (`src/services/dashboardService.js`)
- All UI components fetch data asynchronously via `dashboardService` methods (`getStats()`, `getProjects()`, `getDatasets()`, `getResults()`, `getReports()`, `getRecentActivity()`).
- Currently returns clean empty arrays `[]` or `"—"` placeholders.
- When backend database endpoints are deployed, connecting real data requires updating only the service layer—no UI rewrites.

### 3. Clean Empty States Across All Views
- **Projects View (`/dashboard/projects` & `/dashboard`):** *"No projects yet. Create your first project to get started."* with direct CTA button.
- **Datasets View (`/dashboard/datasets`):** *"No datasets uploaded yet."* with *"Upload Dataset"* CTA button.
- **Model Results (`/dashboard/results`):** *"No model results available."*
- **Reports (`/dashboard/reports`):** *"No reports generated yet."*
- **Recent Activity:** *"No recent activity."*
- **Statistics Cards:** Displays `" — "` until real counts are returned from the database.
- **Notifications Panel:** *"No new notifications."*

---

## 🔐 Authentication Module

- `POST /api/auth/register` – Creates new account with bcrypt password hashing; returns JWT and sets secure HTTP-only cookie.
- `POST /api/auth/login` – Authenticates credentials; supports 7-day "Remember Me" session and sets secure HTTP-only cookie.
- `POST /api/auth/logout` – Revokes session and clears the HTTP-only cookie.
- `GET /api/auth/me` – Retrieves current authenticated user profile.
- `POST /api/auth/forgot-password` & `POST /api/auth/reset-password` – Secure password reset workflow.
- Routes: `/login`, `/register`, `/forgot-password`, `/reset-password`.

---

## 📁 Project Directory Structure

```
Final Year Project/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── config/
│   │   │   ├── api.js                   # Centralized API endpoint URLs & base config
│   │   │   ├── navigation.js            # Centralized sidebar & breadcrumb routing config
│   │   │   ├── dashboardConfig.js       # Centralized table columns, statuses & empty state meta
│   │   │   └── datasetConfig.js         # CSV constraints, task types & 6-step definitions
│   │   ├── data/
│   │   │   └── mockDashboardData.js     # Clean initial empty structures (no fake data)
│   │   ├── services/
│   │   │   ├── authService.js           # REST API client for auth
│   │   │   ├── dashboardService.js      # Data access layer for dashboard stats, projects, logs
│   │   │   ├── csvParser.js             # Client-side quote-aware CSV parser & schema profiler
│   │   │   └── datasetService.js        # Draft session storage & FastAPI payload serializer
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx      # Fixed sidebar, sticky topbar & outlet shell
│   │   ├── components/
│   │   │   ├── dataset/                 # Phase 4 Dataset & Configuration Components
│   │   │   │   ├── ConfigurationStepper.jsx  # 6-step progress stepper
│   │   │   │   ├── DatasetUploader.jsx       # Drag-and-drop CSV file dropzone
│   │   │   │   ├── DatasetSummary.jsx        # 4-metric overview tiles
│   │   │   │   ├── DatasetPreview.jsx        # Scrollable first 10-row preview table
│   │   │   │   ├── ColumnInformation.jsx     # Column schemas & missingness indicators
│   │   │   │   ├── TaskTypeSelector.jsx      # Classification vs Regression cards
│   │   │   │   ├── RequirementInput.jsx      # Natural language prompt textarea
│   │   │   │   ├── TargetColumnSelector.jsx  # Dynamic target variable dropdown
│   │   │   │   └── ConfigurationSummary.jsx  # Final configuration review & milestone CTA
│   │   │   ├── dashboard/
│   │   │   │   ├── Sidebar.jsx          # Config-driven navigation drawer
│   │   │   │   ├── Topbar.jsx           # Topbar with dynamic breadcrumb, search & notifications
│   │   │   │   ├── StatCard.jsx         # KPI metric cards displaying "—" until DB connected
│   │   │   │   ├── ProjectTable.jsx     # Reusable table with empty state handling
│   │   │   │   ├── StatusBadge.jsx      # Config-driven status pill component
│   │   │   │   ├── EmptyState.jsx       # Reusable empty state component
│   │   │   │   ├── QuickActions.jsx     # 3 quick-action cards driven by config
│   │   │   │   ├── ActivityTimeline.jsx # Vertical timeline with empty state
│   │   │   │   └── UsageCard.jsx        # Resource quota overview & quick start guide
│   │   │   ├── auth/                    # Split-screen auth layout & controls
│   │   │   ├── Navbar.jsx               # Landing page navigation bar
│   │   │   ├── Hero.jsx                 # Landing page hero section
│   │   │   ├── About.jsx                # Architecture comparison section
│   │   │   ├── Features.jsx             # 6 feature cards
│   │   │   ├── Workflow.jsx             # 8-stage agentic pipeline inspector
│   │   │   ├── InfoCards.jsx            # Architectural deep-dive cards
│   │   │   ├── Team.jsx                 # 5 team member profiles
│   │   │   └── Footer.jsx               # Footer with tech stack badges
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Public landing page
│   │   │   ├── Login.jsx                # User login screen
│   │   │   ├── Register.jsx             # User registration screen
│   │   │   ├── ForgotPassword.jsx       # Password reset request screen
│   │   │   ├── ResetPassword.jsx        # Password reset screen
│   │   │   └── dashboard/
│   │   │       ├── Dashboard.jsx        # Main dashboard overview
│   │   │       ├── Projects.jsx         # Full projects table view
│   │   │       ├── CreateProject.jsx    # Project creation wizard preview
│   │   │       ├── Datasets.jsx         # Dataset library table with empty state
│   │   │       ├── Results.jsx          # Model results & leaderboards with empty state
│   │   │       ├── Reports.jsx          # Executive report downloads with empty state
│   │   │       └── Settings.jsx         # User profile & API key settings
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Session state provider
│   │   ├── styles/
│   │   │   ├── global.css               # Design tokens & color variables
│   │   │   ├── components.css           # Landing page component styles
│   │   │   ├── auth.css                 # Auth split-screen & form styles
│   │   │   ├── dashboard.css            # Dashboard layout, sidebar & topbar styles
│   │   │   ├── dashboard-components.css # Stat cards, tables, timeline & modals
│   │   │   ├── dataset.css              # Dataset wizard & stepper layout styles
│   │   │   └── dataset-components.css   # Uploader, preview table, task cards & target selector
│   │   ├── App.jsx                      # Route hierarchy with DashboardLayout
│   │   └── main.jsx                     # React entrypoint
│   └── dist/                            # Production build artifacts
│
└── backend/
    ├── main.py                          # FastAPI application entrypoint
    ├── requirements.txt                 # Dependencies
    ├── mlforge_auth.db                  # Persistent SQLite database
    └── auth/                            # Database, models, schemas, security, routes
```

---

## 🚀 Running the Project

### 1. Frontend (React.js)
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser:
- Public Landing Page: [http://localhost:3000/](http://localhost:3000/)
- Sign In / Register: [http://localhost:3000/login](http://localhost:3000/login)
- Main Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### 2. Backend (FastAPI)
```bash
cd backend
python main.py
```
API runs on [http://localhost:8000](http://localhost:8000) with interactive Swagger documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 👥 Project Team

- **Puskar Paul** – Lead Architect & ML Lead
- **Mrinal Chandra Dey** – Agent Systems Engineer
- **Rohit Kumar Mondal** – AutoML & Pipelines Engineer
- **Rohan Jana** – Backend & Systems Engineer
- **Madhuparna Adhikary** – Frontend & UI/UX Engineer

---

## 📄 License & Copyright

© 2026 MLForge AI. All Rights Reserved.
