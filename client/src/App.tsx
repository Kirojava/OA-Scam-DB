import { Switch, Route, Redirect } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { lazy } from 'react';

// Import pages
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import NewCase from '@/pages/new-case';
import Profile from '@/pages/profile';
import Settings from '@/pages/settings';
import AdminPanel from '@/pages/admin-panel';
import StaffManagement from '@/pages/staff-management';
import AdvancedAnalytics from '@/pages/advanced-analytics';
import AITools from '@/pages/ai-tools';
import ThreatIntel from '@/pages/threat-intel';
import AltDetection from '@/pages/alt-detection';
import ImpersonationHeatmap from '@/pages/impersonation-heatmap';
import Marketplace from '@/pages/marketplace';
import Vouches from '@/pages/vouches';
import CommunityEvents from '@/pages/community-events';
import ResourceHub from '@/pages/resource-hub';
import MemberVerification from '@/pages/member-verification';
import ReputationProfiles from '@/pages/reputation-profiles';
import ReputationInsurance from '@/pages/reputation-insurance';
import ProofOfOwnership from '@/pages/proof-of-ownership';
import CustomRoles from '@/pages/custom-roles';
import TribunalProceedings from '@/pages/tribunal-proceedings';
import StaffAssignments from '@/pages/staff-assignments';
import Disputes from '@/pages/disputes';
import ReportVault from '@/pages/report-vault';
import LiveActivityFeed from '@/pages/live-activity-feed';
import NotFound from '@/pages/not-found';

// Lazy load new pages
const ActionPlaybooks = lazy(() => import('./pages/action-playbooks'));
const AIModerationControls = lazy(() => import('./pages/ai-moderation-controls'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Enhanced token check with error handling
const hasToken = () => {
  try {
    const token = localStorage.getItem('auth_token');
    console.log('Router: Has token:', !!token);
    return !!token;
  } catch (error) {
    console.error('Error checking token:', error);
    return false;
  }
};

// Protected route wrapper component
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const isAuth = hasToken();
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Switch>
          {/* Login route - redirect to dashboard if already logged in */}
          <Route path="/login">
            {hasToken() ? <Redirect to="/dashboard" /> : <Login />}
          </Route>

          {/* Root route - redirect based on auth status */}
          <Route path="/">
            {hasToken() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>

          {/* Protected Routes */}
          <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
          <Route path="/new-case" component={() => <ProtectedRoute component={NewCase} />} />
          <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
          <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
          <Route path="/admin-panel" component={() => <ProtectedRoute component={AdminPanel} />} />
          <Route path="/staff-management" component={() => <ProtectedRoute component={StaffManagement} />} />
          <Route path="/advanced-analytics" component={() => <ProtectedRoute component={AdvancedAnalytics} />} />
          <Route path="/ai-tools" component={() => <ProtectedRoute component={AITools} />} />
          <Route path="/threat-intel" component={() => <ProtectedRoute component={ThreatIntel} />} />
          <Route path="/alt-detection" component={() => <ProtectedRoute component={AltDetection} />} />
          <Route path="/impersonation-heatmap" component={() => <ProtectedRoute component={ImpersonationHeatmap} />} />
          <Route path="/marketplace" component={() => <ProtectedRoute component={Marketplace} />} />
          <Route path="/vouches" component={() => <ProtectedRoute component={Vouches} />} />
          <Route path="/community-events" component={() => <ProtectedRoute component={CommunityEvents} />} />
          <Route path="/resource-hub" component={() => <ProtectedRoute component={ResourceHub} />} />
          <Route path="/member-verification" component={() => <ProtectedRoute component={MemberVerification} />} />
          <Route path="/reputation-profiles" component={() => <ProtectedRoute component={ReputationProfiles} />} />
          <Route path="/reputation-insurance" component={() => <ProtectedRoute component={ReputationInsurance} />} />
          <Route path="/proof-of-ownership" component={() => <ProtectedRoute component={ProofOfOwnership} />} />
          <Route path="/custom-roles" component={() => <ProtectedRoute component={CustomRoles} />} />
          <Route path="/tribunal-proceedings" component={() => <ProtectedRoute component={TribunalProceedings} />} />
          <Route path="/staff-assignments" component={() => <ProtectedRoute component={StaffAssignments} />} />
          <Route path="/disputes" component={() => <ProtectedRoute component={Disputes} />} />
          <Route path="/report-vault" component={() => <ProtectedRoute component={ReportVault} />} />
          <Route path="/live-activity-feed" component={() => <ProtectedRoute component={LiveActivityFeed} />} />
          
          {/* New feature pages */}
          <Route path="/action-playbooks" component={() => <ProtectedRoute component={ActionPlaybooks} />} />
          <Route path="/ai-moderation-controls" component={() => <ProtectedRoute component={AIModerationControls} />} />

          {/* 404 page */}
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;