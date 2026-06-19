# Nest Frontend Architecture

Complete frontend blueprint for the authenticated Nest application. Six layers, all connected.

---

## Section 1 — Screen Hierarchy

### Marketing Site (Separate Product)
- `/` - Landing page (index.html)
- `/pricing` - Pricing page
- `/about` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post

### Authenticated App

#### Authentication Flow
- `/signup` - Sign up form
- `/login` - Login form
- `/onboarding` - Multi-step onboarding wizard
  - Step 1: Business profile setup
  - Step 2: Connect M-Pesa Paybill
  - Step 3: Connect bank accounts
  - Step 4: Invite team members (optional)
- `/verify-email` - Email verification
- `/forgot-password` - Password reset
- `/reset-password` - Set new password

#### Main Application (5 Nav Tabs)

**Tab 1: Dashboard**
- `/dashboard` - Main dashboard (default)
  - Cash position overview
  - Quick actions
  - Recent transactions
  - Manikka alerts
  - KPI summary
- `/dashboard/cash-position` - Detailed cash position
- `/dashboard/forecast` - Cash flow forecast view
- `/dashboard/alerts` - All alerts and notifications

**Tab 2: Transactions**
- `/transactions` - Transaction list (default)
  - Filters: date range, account, category, branch
  - Search functionality
  - Bulk actions (reconcile, categorize)
- `/transactions/[id]` - Transaction detail view
- `/transactions/reconcile` - Reconciliation queue
- `/transactions/categories` - Category management
- `/transactions/import` - Import transactions (CSV/manual)

**Tab 3: Branches**
- `/branches` - Branch list (default)
  - Branch cards with KPIs
  - Add new branch
- `/branches/[id]` - Branch detail
  - Branch overview
  - Staff management
  - Branch P&L
  - Branch transactions
- `/branches/[id]/staff` - Staff management
- `/branches/[id]/settings` - Branch settings
- `/branches/compare` - Branch comparison view

**Tab 4: Passport**
- `/passport` - Financial Passport overview (default)
  - Score overview
  - Pillar breakdown
  - Improvement suggestions
- `/passport/lenders` - Matched lenders
- `/passport/settings` - Passport consent settings
- `/passport/reports` - Downloadable reports
  - P&L report
  - Cash flow statement
  - Balance sheet
  - Tax summary

**Tab 5: Manikka**
- `/manikka` - AI chat interface (default)
  - Chat history
  - Suggested prompts
  - Quick actions
- `/manikka/scenarios` - Scenario planning
- `/manikka/alerts` - Alert configuration
- `/manikka/settings` - AI preferences

#### Settings
- `/settings` - Main settings
  - Business profile
  - Account connections
  - Team management
  - Billing/subscription
  - Notifications
- `/settings/team` - Team members
- `/settings/billing` - Subscription and payment methods
- `/settings/integrations` - Third-party integrations

---

## Section 2 — Feature Components

### Shared Components
```
src/components/shared/
├── Button.tsx
├── Input.tsx
├── Select.tsx
├── Modal.tsx
├── Dropdown.tsx
├── Tooltip.tsx
├── Badge.tsx
├── Avatar.tsx
├── Card.tsx
├── LoadingSpinner.tsx
├── EmptyState.tsx
├── ErrorBoundary.tsx
└── Layout/
    ├── Sidebar.tsx
    ├── TopNav.tsx
    └── MobileNav.tsx
```

### Dashboard Components
```
src/components/dashboard/
├── CashPositionCard.tsx
├── QuickActions.tsx
├── RecentTransactions.tsx
├── ManikkaAlertBanner.tsx
├── KPISummary.tsx
├── CashFlowChart.tsx
└── ForecastWidget.tsx
```

### Transactions Components
```
src/components/transactions/
├── TransactionList.tsx
├── TransactionRow.tsx
├── TransactionDetail.tsx
├── TransactionFilters.tsx
├── CategoryBadge.tsx
├── ReconciliationQueue.tsx
├── CategoryManager.tsx
└── ImportWizard.tsx
```

### Branches Components
```
src/components/branches/
├── BranchList.tsx
├── BranchCard.tsx
├── BranchDetail.tsx
├── BranchKPIS.tsx
├── StaffList.tsx
├── StaffRow.tsx
├── BranchComparison.tsx
└── BranchSettings.tsx
```

### Passport Components
```
src/components/passport/
├── PassportOverview.tsx
├── ScoreBadge.tsx
├── PillarGrid.tsx
├── PillarCard.tsx
├── ScoreTrack.tsx
├── LenderList.tsx
├── LenderCard.tsx
├── ConsentSettings.tsx
└── ReportGenerator.tsx
```

### Manikka Components
```
src/components/manikka/
├── ChatInterface.tsx
├── MessageBubble.tsx
├── ChatInput.tsx
├── SuggestedPrompts.tsx
├── ScenarioPlanner.tsx
├── AlertConfig.tsx
└── ActionChips.tsx
```

### Settings Components
```
src/components/settings/
├── BusinessProfileForm.tsx
├── AccountConnections.tsx
├── TeamMemberList.tsx
├── TeamInviteForm.tsx
├── BillingSummary.tsx
├── PaymentMethodForm.tsx
├── NotificationSettings.tsx
└── IntegrationCard.tsx
```

---

## Section 3 — State Management (Zustand)

### Global Stores

```typescript
// src/stores/authStore.ts
interface AuthState {
  user: User | null;
  business: Business | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// src/stores/cashStore.ts
interface CashState {
  cashPosition: CashPosition;
  accounts: Account[];
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  fetchCashPosition: () => Promise<void>;
  fetchAccounts: () => Promise<void>;
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
  reconcileTransaction: (id: string) => Promise<void>;
}

// src/stores/passportStore.ts
interface PassportState {
  passport: FinancialPassport;
  score: number;
  pillars: Pillar[];
  lenders: Lender[];
  isLoading: boolean;
  fetchPassport: () => Promise<void>;
  fetchLenders: () => Promise<void>;
  updateConsent: (lenderId: string, granted: boolean) => Promise<void>;
}

// src/stores/branchStore.ts
interface BranchState {
  branches: Branch[];
  selectedBranch: Branch | null;
  staff: Staff[];
  isLoading: boolean;
  fetchBranches: () => Promise<void>;
  selectBranch: (id: string) => void;
  fetchStaff: (branchId: string) => Promise<void>;
}

// src/stores/manikkaStore.ts
interface ManikkaState {
  messages: Message[];
  alerts: Alert[];
  scenarios: Scenario[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  fetchAlerts: () => Promise<void>;
  dismissAlert: (id: string) => void;
}

// src/stores/uiStore.ts
interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  modalOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}
```

### Local Component State
- Form inputs (controlled components)
- Modal open/close states
- Dropdown open/close states
- Filter selections
- Pagination states
- Tab selections within components

---

## Section 4 — API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify-email/:token
```

### Business & User
```
GET    /api/business/profile
PUT    /api/business/profile
GET    /api/user/me
PUT    /api/user/me
```

### Cash Position & Accounts
```
GET    /api/cash/position
GET    /api/accounts
POST   /api/accounts
PUT    /api/accounts/:id
DELETE /api/accounts/:id
GET    /api/accounts/:id/balance
```

### Transactions
```
GET    /api/transactions
GET    /api/transactions/:id
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
POST   /api/transactions/reconcile
POST   /api/transactions/import
GET    /api/transactions/categories
POST   /api/transactions/categories
PUT    /api/transactions/categories/:id
```

### Branches
```
GET    /api/branches
POST   /api/branches
GET    /api/branches/:id
PUT    /api/branches/:id
DELETE /api/branches/:id
GET    /api/branches/:id/staff
POST   /api/branches/:id/staff
PUT    /api/branches/:id/staff/:id
DELETE /api/branches/:id/staff/:id
GET    /api/branches/compare
```

### Financial Passport
```
GET    /api/passport
GET    /api/passport/score
GET    /api/passport/pillars
GET    /api/passport/lenders
POST   /api/passport/consent
GET    /api/passport/reports/:type
```

### Manikka AI
```
POST   /api/manikka/chat
GET    /api/manikka/messages
GET    /api/manikka/alerts
POST   /api/manikka/alerts/:id/dismiss
GET    /api/manikka/scenarios
POST   /api/manikka/scenarios
```

### Real-time (WebSocket)
```
WS     /realtime/cash          - Live cash position updates
WS     /realtime/transactions  - New transaction notifications
WS     /realtime/alerts        - Manikka alert push
```

### Settings & Billing
```
GET    /api/settings
PUT    /api/settings
GET    /api/team
POST   /api/team/invite
DELETE /api/team/:id
GET    /api/billing/subscription
PUT    /api/billing/subscription
POST   /api/billing/payment-method
GET    /api/integrations
POST   /api/integrations
```

---

## Section 5 — Tech Stack

### Core
- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Router**: TanStack Router
- **State**: Zustand
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Real-time**: WebSocket API

### UI & Styling
- **CSS Framework**: Tailwind CSS
- **Components**: Headless UI (for accessible primitives)
- **Icons**: Tabler Icons
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Date Handling**: date-fns

### Backend Integration
- **BaaS**: Supabase
  - Authentication
  - Database (PostgreSQL)
  - Storage
  - Edge Functions (for Manikka AI proxy)
- **AI**: Google Gemini (via Supabase Edge Function)

### Deployment
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Environment**: dotenv

### Development Tools
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Testing**: Vitest + React Testing Library
- **Git Hooks**: Husky + lint-staged

---

## Section 6 — Build Priority

### Phase 1: Cash Clarity Core (Month 1-2)
**Goal**: Ship the minimum viable product that delivers the core value proposition.

**Features**:
- Authentication (signup, login, email verification)
- Business profile setup
- Connect M-Pesa Paybill
- Connect 1 bank account
- Dashboard with cash position overview
- Transaction list with basic filters
- Manual transaction entry
- Basic reconciliation
- Cash position card (M-Pesa + Bank)
- Simple KPI summary

**Components**:
- Auth flow
- Onboarding wizard
- Dashboard layout
- CashPositionCard
- TransactionList
- TransactionRow
- AccountConnections

**Stores**:
- authStore
- cashStore
- uiStore

**API Endpoints**:
- All auth endpoints
- Business profile
- Cash position
- Accounts
- Transactions (CRUD)

**Value**: KES 2,500/month to retailers who need real-time cash visibility.

---

### Phase 2: Multi-Branch & Team (Month 2-3)
**Goal**: Enable multi-location businesses and team collaboration.

**Features**:
- Branch management (create, edit, delete)
- Branch selection in dashboard
- Branch-level cash position
- Branch comparison view
- Team member invitations
- Role-based access (admin, viewer, staff)
- Staff-level sales tracking
- Branch P&L view

**Components**:
- BranchList
- BranchCard
- BranchDetail
- BranchComparison
- StaffList
- TeamMemberList
- TeamInviteForm

**Stores**:
- branchStore (extend existing)

**API Endpoints**:
- All branch endpoints
- Team management
- Staff tracking

**Value**: KES 5,500/month to growing businesses with multiple locations.

---

### Phase 3: Manikka AI & Forecasting (Month 3-4)
**Goal**: Add AI-powered insights and predictive capabilities.

**Features**:
- Manikka chat interface
- AI-powered cash flow forecasting (30, 60, 90 days)
- Proactive alerts (low cash, payment due, stock shortage)
- Scenario planning (what-if analysis)
- KRA tax liability estimation
- Suggested prompts and quick actions

**Components**:
- ChatInterface
- MessageBubble
- ChatInput
- SuggestedPrompts
- ScenarioPlanner
- AlertConfig
- ForecastWidget
- ManikkaAlertBanner

**Stores**:
- manikkaStore

**API Endpoints**:
- Manikka chat (via Supabase Edge Function)
- Alerts
- Scenarios
- Forecasting

**Value**: KES 5,500/month (included in Growth plan) - AI CFO capability.

---

### Phase 4: Financial Passport & Credit (Month 4-5)
**Goal**: Unlock credit access through verified business profiles.

**Features**:
- Financial Passport score calculation
- 6-pillar health assessment
- Pillar breakdown with improvement suggestions
- Lender matching algorithm
- Consent-based data sharing
- Downloadable reports (P&L, cash flow, balance sheet)
- Tax compliance tracking
- Blockchain verification (Celo integration)

**Components**:
- PassportOverview
- ScoreBadge
- PillarGrid
- PillarCard
- ScoreTrack
- LenderList
- LenderCard
- ConsentSettings
- ReportGenerator

**Stores**:
- passportStore

**API Endpoints**:
- Passport score and pillars
- Lender matching
- Consent management
- Report generation

**Value**: KES 5,500/month (Growth) to KES 12,000/month (Scale) - credit unlocking.

---

### Phase 5: Advanced Features (Month 5-6)
**Goal**: Enterprise features for large distributors and complex operations.

**Features**:
- Unlimited branches and locations
- Group consolidated reporting
- Multi-entity / multi-director access
- Custom PDF board reports
- API access for POS integration
- Dedicated success manager
- Custom onboarding session
- Premium lender pipeline
- Early access to new features
- eTIMS / KRA e-invoicing compliance

**Components**:
- ConsolidatedReports
- BoardReportGenerator
- APIKeyManager
- IntegrationCard (extended)
- EInvoicingCompliance

**API Endpoints**:
- Consolidated reporting
- API key management
- Advanced integrations
- eTIMS integration

**Value**: KES 12,000/month (Scale plan) - enterprise-grade features.

---

## File Structure

```
nest-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── shared/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── branches/
│   │   ├── passport/
│   │   ├── manikka/
│   │   └── settings/
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── cashStore.ts
│   │   ├── passportStore.ts
│   │   ├── branchStore.ts
│   │   ├── manikkaStore.ts
│   │   └── uiStore.ts
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── branches/
│   │   ├── passport/
│   │   ├── manikka/
│   │   └── settings/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCashPosition.ts
│   │   ├── useWebSocket.ts
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── websocket.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── cash.ts
│   │   ├── passport.ts
│   │   ├── branch.ts
│   │   └── manikka.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── .env.example
```

---

## Next Steps

1. Initialize Vite + React + TypeScript project
2. Install dependencies (Tailwind, TanStack Router, Zustand, Recharts, etc.)
3. Set up Supabase client and authentication
4. Create shared component library
5. Build authentication flow
6. Implement Phase 1 features (Cash Clarity Core)
7. Deploy to Vercel
8. Iterate through remaining phases

