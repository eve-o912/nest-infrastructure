import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { ErrorBoundary } from '../components/shared/ErrorBoundary'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { OnboardingPage } from '../pages/auth/OnboardingPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'

const rootRoute = createRootRoute({
  component: () => {
    return (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    )
  },
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
})

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: OnboardingPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions',
  component: Transactions,
})

const branchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/branches',
  component: Branches,
})

const passportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/passport',
  component: Passport,
})

const manikkaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/manikka',
  component: Manikka,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  onboardingRoute,
  dashboardRoute,
  transactionsRoute,
  branchesRoute,
  passportRoute,
  manikkaRoute,
  settingsRoute,
])

export const router = createRouter({ routeTree })

// Placeholder components for routes not yet implemented
function Index() {
  return <div>Landing Page</div>
}

function Transactions() {
  return <div>Transactions Page - Coming Soon</div>
}

function Branches() {
  return <div>Branches Page - Coming Soon</div>
}

function Passport() {
  return <div>Passport Page - Coming Soon</div>
}

function Manikka() {
  return <div>Manikka Page - Coming Soon</div>
}

function Settings() {
  return <div>Settings Page - Coming Soon</div>
}
