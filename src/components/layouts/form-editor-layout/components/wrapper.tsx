import { Outlet } from 'react-router-dom';
import { Header } from './header';

export function Wrapper() {
  return (
    <>
      <Header />

      <div className="flex grow pt-(--header-height-mobile) lg:pt-(--header-height)">
        <main className="flex transition-all duration-300 grow" role="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
