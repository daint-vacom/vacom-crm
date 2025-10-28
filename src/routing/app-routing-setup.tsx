import { AuthRouting } from '@/features/auth/auth-routing';
import { RequireAuth } from '@/features/auth/require-auth';
import { ErrorRouting } from '@/features/errors/error-routing';
import { HomePage } from '@/features/home';
import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '@/components/layouts/main-layout';
import { ROUTE_PATHS } from './paths';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path={`${ROUTE_PATHS.ERROR}/*`} element={<ErrorRouting />} />
      <Route path={`${ROUTE_PATHS.AUTH}/*`} element={<AuthRouting />} />

      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTE_PATHS.ERROR_404} />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.AUTH} />} />
    </Routes>
  );
}
