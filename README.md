### 🏥 Insurance Claim Management System — Frontend

This is the frontend application for the Insurance Claim Management System (ICMS).
It is built with React + TypeScript + TailwindCSS and provides role-based dashboards for Admin, Customer, Agents, Hospitals, Garages, TPAs, Surveyors, and more.

### 🚀 Features

* 🔑Authentication & Role-based Access (Admin, Customer, Agent, TPA, etc.)
* 📊 User Management (Add, Edit, Delete, Search Users)
* 📱 Responsive Layout with Sidebar & Topbar
* 🌐 API Integration with backend (Express + PostgreSQL)
* 🔒 Protected Routes using Context & Hooks
* 🎨 Modern UI (TailwindCSS + Lucide Icons)

### 🛠️ Tech Stack

* React 18 + TypeScript
* React Router (role-based routing)
* TailwindCSS (UI styling)
* Axios (API calls)
* Lucide-react (icons)
* Context API + Custom Hooks (Auth handling)

### 📂 Folder Structure
    frontend-insurance-claim-management-system/
    ├── public/                # Static assets
    ├── src/
    │   ├── api/
    │   │   ├── axiosInstance.ts   # Axios config
    │   │   └── userApi.ts         # User-related API calls
    │   │
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── AuthLayout.tsx # Auth page wrapper
    │   │   │   ├── Layout.tsx     # Main layout
    │   │   │   ├── PrivateRoute.tsx # Protected routes
    │   │   │   ├── Sidebar.tsx    # Sidebar menu
    │   │   │   └── Topbar.tsx     # Top navigation bar
    │   │
    │   ├── context/
    │   │   └── AuthContext.tsx    # Authentication context
    │   │
    │   ├── hooks/
    │   │   └── useAuth.ts         # Custom auth hook
    │   │
    │   ├── pages/
    │   │   └── user/
    │   │       └── Dashboard.tsx  # User management page
    │   │
    │   ├── routes/
    │   │   └── AppRoutes.tsx      # App routing (role-based)
    │   │
    │   ├── utils/
    │   ├── App.tsx                # Root component
    │   └── index.tsx              # Entry point
    │
    ├── .env                       # Environment variables
    ├── package.json
    ├── tsconfig.json
    └── README.md

️### ⚙️ Setup & Installation
    * 1️⃣ Clone the repo
        git clone https://github.com/your-username/frontend-insurance-claim-management-system.git
        cd frontend-insurance-claim-management-system

        * 2️⃣ Install dependencies
        npm install

        * 3️⃣ Configure environment variables
        Create a .env file in the root:
        VITE_API_BASE_URL=http://localhost:8001/api

        * 4️⃣ Start the development server
        npm run dev

### 📌 Available Pages & Roles

    * Admin → Manage Users, Claims, Approvals
    * Customer → View Policy, File Claim, Track Status
    * Agent → Assist customers with claims
    * Hospital / Garage → Process cashless claims
    * TPA / Surveyor / Insurer → Approvals & Reports
    * Helpdesk / Auditor / Nominee → Support & Review

### 🔐 Authentication Flow

    * Login via backend API
    * Store JWT/session in cookies (httpOnly)
    * Role-based route protection using PrivateRoute.tsx
    * Global auth state managed via AuthContext

🖼️ Screenshots

    * (Add screenshots from your /public or backend if available)

### 🧑‍💻 Development Scripts
       Command	        Description
    npm run dev	    Start development server
    npm run build	Build for production
    npm run lint	Run ESLint checks
    npm run preview	Preview production build

### 🤝 Contributing

    1. Fork the repo 🍴
    2. Create a new branch (feature/role-management)
    3. Commit your changes
    4. Push to branch & open PR ✅

📜 License
MIT License © 2025 By Hariom Verma

### Story Points

    Ah ✅ got it now — thanks for clarifying.
    You are thinking as Product Owner of your ICMS SaaS.

### Meaning:

        Many hospitals will subscribe/buy your platform.
        Each hospital should only see/manage its own patients, claims, bills, staff, not other hospitals.
        But Admin (you/insurer) can see all hospitals.
    That’s a multi-tenant SaaS problem → you need hospital-wise isolation.


### 🏥 Multi-Hospital Access Workflow

1. Admin (Global / SaaS Owner)
    * Can onboard new hospitals (create tenant entries).
    * Manages billing/subscription for hospitals.
    * Sees all hospitals, all claims, all users.

2. Hospital Role (Tenant-Level Admin)

    When a hospital signs up:
        They get their own Hospital Admin Dashboard.
        Hospital Admin can:

        * Add hospital staff (doctors, billing clerks, claim desk, etc.) → these staff users also belong to role = hospital but tagged with hospital_id.
        * View only claims assigned to their hospital.
        * Upload hospital bills, treatment docs.
        * Manage patient cases.

3. How Access is Restricted (Hospital-wise Isolation)

    * Every hospital user is tied to a hospital_id.
    * When they log in:

    * All API requests are filtered by their hospital_id.
    * Example:
        SELECT * FROM claims WHERE hospital_id = :user.hospital_id;
    * So Hospital A can never see Hospital B’s claims.

4. Workflow Example

    * Claim Case (Cashless in Hospital)
    * Customer initiates claim (via agent/customer portal).
    * Claim is linked to a hospital_id (selected during initiation).
    * Hospital staff (role = hospital, with hospital_id) logs in.
        They see only claims for their hospital.

    * Hospital uploads bills, discharge summary.
    * TPA verifies medical docs.
    * Insurer approves/rejects.
    * Payment is settled with that hospital only.

5. Scaling Multi-Hospital SaaS

    Two approaches:
       1. Single DB with Tenant Key (recommended for MVP)
            * One big database.
            * Every record has a hospital_id.
            * Access control filters data by hospital_id.
            * Simpler, cheaper, easy to manage.

        2. Separate DB per Hospital (enterprise level)

            * Each hospital gets its own schema/DB.
            * Very strong data isolation, but harder to maintain.
            * Needed when hospitals demand complete data separation.

### 📌 README.md Addition (Hospital Multi-Tenant Model)
    * 🏥 Multi-Hospital Access

        * The platform supports multi-tenant hospitals.
            * Each hospital has its own Hospital Admin, who manages staff, patients, and claims.
            * Hospital users are restricted to their own hospital’s data only (via hospital_id).
            * Claims, bills, and documents are tied to hospital_id, ensuring strict isolation.
            * Admin (SaaS Owner) has global access across all hospitals.

Example:

    * Hospital A can only see Patient Claims for Hospital A.
    * Hospital B cannot access Hospital A’s claims.
    * Admin sees all hospitals.

⚡ This way, your ICMS SaaS works like a marketplace: many hospitals onboarded, each fully isolated.

Would you like me to also extend this multi-tenant model to Garage, Surveyor, Service Provider (so they too are tenant-wise isolated, like hospitals)?