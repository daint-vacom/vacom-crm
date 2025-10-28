import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';

export function HeaderLogo() {
  return (
    <div className="flex items-center gap-2 px-5">
      {/* Brand */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/layout-12" className="flex items-center gap-2">
          <img
            src={toAbsoluteUrl('/media/app/mini-logo-gray.svg')}
            className="dark:hidden shrink-0 size-6"
            alt="image"
          />
          <img
            src={toAbsoluteUrl('/media/app/mini-logo-gray-dark.svg')}
            className="hidden dark:inline-block shrink-0 size-6"
            alt="image"
          />
          <span className="text-mono text-lg font-medium hidden lg:block">
            Form Editor
          </span>
        </Link>
      </div>
    </div>
  );
}
