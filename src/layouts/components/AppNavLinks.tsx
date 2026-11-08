import { NavLink, useLocation } from 'react-router-dom';
import { appNavItems, isNavItemActive } from './nav-items';

interface AppNavLinksProps {
  onNavigate?: () => void;
}

export default function AppNavLinks({ onNavigate }: AppNavLinksProps) {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-3">
      {appNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = isNavItemActive(item, location.pathname);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-#EDF3F0 text-#263B35 font-semibold shadow-2xs'
                : 'text-#555E57 hover:bg-#FAF8F5 hover:text-#252925'
            }`}
          >
            <Icon
              size={18}
              className={isActive ? 'text-#263B35' : 'text-#8C938E'}
            />
            <span className="flex-1">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
