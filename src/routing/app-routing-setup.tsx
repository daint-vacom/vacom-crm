import { HomePage } from '@/features/home';
import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '@/components/layouts/main-layout';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
