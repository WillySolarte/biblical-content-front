//React

//Libraries

//My resources
import { useState } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import useLogout from '@/features/auth/hooks/useLogout';
import type { TUserActive } from '@/features/user/types/user.types';
import AppSidebar from './components/AppSidebar';
import AppMobileDrawer from './components/AppMobileDrawer';
import AppHeader from './components/AppHeader';
import { appNavItems, isNavItemActive } from './components/nav-items';

const defaultUser: TUserActive = {
  id: 'usr-1',
  name: 'David Morales',
  email: 'david.morales@bibliastudio.com',
  role: 'CREATOR',
};

export default function AppLayout() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const location = useLocation();
  const logoutMutation = useLogout();
  const userData = useOutletContext<TUserActive>() || defaultUser;

  const currentNavItem = appNavItems.find((item) =>
    isNavItemActive(item, location.pathname),
  );

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-ivory-light flex flex-col md:flex-row">
      <AppSidebar userData={userData} onLogout={handleLogout} />

      <AppMobileDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        userData={userData}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title={currentNavItem?.label || 'Estudio'}
          userData={userData}
          onLogout={handleLogout}
          drawerOpened={drawerOpened}
          onToggleDrawer={() => setDrawerOpened((opened) => !opened)}
        />

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet context={userData} />
        </main>
      </div>
    </div>
  );
}
