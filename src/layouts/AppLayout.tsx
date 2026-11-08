//React

//Libraries

//My resources
import { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Burger, Drawer, Avatar, Menu, Button, Badge} from '@mantine/core';
import { LayoutDashboard, Layers, PlusCircle, Settings, LogOut, BookOpen, Sparkles, User, ExternalLink} from 'lucide-react';
import { routes } from '@/common/constants/routes';
import useLogout from '@/features/auth/hooks/useLogout';
import type { TUserActive } from '@/features/user/types/user.types';

export default function AppLayout() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const userData = useOutletContext<TUserActive>() || {
    id: 'usr-1',
    name: 'David Morales',
    email: 'david.morales@bibliastudio.com',
    role: 'CREATOR',
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: routes.app.panel,
      icon: LayoutDashboard,
    },
    {
      label: 'Mis proyectos',
      path: routes.app.projects,
      icon: Layers,
    },
    {
      label: 'Crear proyecto',
      path: routes.app.createProject,
      icon: PlusCircle,
    },
    {
      label: 'Ajustes',
      path: routes.app.settings,
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const currentNavItem = navItems.find(item => 
    item.path === location.pathname || 
    (item.path === routes.app.projects && location.pathname.startsWith('/app/projects/'))
  );

  const renderNavLinks = () => (
    <nav className="space-y-1 px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = 
          location.pathname === item.path ||
          (item.path === routes.app.projects && location.pathname.startsWith('/app/projects/'));

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setDrawerOpened(false)}
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E7E3DB] shrink-0 sticky top-0 h-screen justify-between z-20">
        <div>
          {/* Logo Brand Header */}
          <div 
            onClick={() => navigate(routes.app.panel)}
            className="p-5 flex items-center gap-3 border-b border-[#E7E3DB] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-[#263B35] flex items-center justify-center text-[#D6B77A] shadow-sm">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="font-editorial text-lg font-bold text-[#252925] tracking-tight block">
                Biblia Studio
              </span>
              <span className="text-[10px] text-[#8C938E] tracking-wider uppercase font-semibold block">
                IA Creativa Bíblica
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-5">
            <span className="px-6 text-[11px] font-semibold uppercase tracking-wider text-[#8C938E] block mb-2">
              Menú Principal
            </span>
            {renderNavLinks()}
          </div>
        </div>

        {/* User Profile Footer in Sidebar */}
        <div className="p-4 border-t border-#E7E3DB bg-#FAF8F5/60">
          <Menu position="top-start" shadow="md" width={220}>
            <Menu.Target>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-#E7E3DB">
                <Avatar 
                  src={userData.photo} 
                  alt={userData.name} 
                  radius="xl" 
                  size="md"
                  color="forest"
                >
                  {userData.name.charAt(0)}
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-xs font-semibold text-#252925 block truncate">
                    {userData.name}
                  </span>
                  <span className="text-[11px] text-[#8C938E] block truncate">
                    {userData.email}
                  </span>
                </div>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <div className="px-3 py-2 border-b border-[#E7E3DB]">
                <span className="text-xs font-bold text-[#252925] block">{userData.name}</span>
                <span className="text-[11px] text-[#8C938E] block truncate">{userData.email}</span>
                <Badge size="xs" color="forest" variant="light" mt={4}>
                  Plan Creador IA
                </Badge>
              </div>

              <Menu.Item 
                leftSection={<User size={14} />}
                onClick={() => navigate(routes.app.settings)}
              >
                Perfil y Preferencias
              </Menu.Item>

              <Menu.Item 
                leftSection={<ExternalLink size={14} />}
                onClick={() => navigate(routes.public.home)}
              >
                Ver Landing Page
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item 
                color="red" 
                leftSection={<LogOut size={14} />}
                onClick={handleLogout}
              >
                Cerrar sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        size="xs"
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#263B35] flex items-center justify-center text-[#D6B77A]">
              <BookOpen size={16} />
            </div>
            <span className="font-editorial font-bold text-base text-[#252925]">
              Biblia Studio
            </span>
          </div>
        }
        padding="md"
      >
        <div className="flex flex-col justify-between h-[calc(100vh-100px)]">
          <div className="space-y-4 pt-2">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8C938E] block">
              Navegación
            </span>
            {renderNavLinks()}
          </div>

          <div className="pt-4 border-t border-[#E7E3DB] space-y-3">
            <div className="flex items-center gap-3 px-3">
              <Avatar src={userData.photo} radius="xl" size="sm" color="forest">
                {userData.name.charAt(0)}
              </Avatar>
              <div className="text-xs">
                <span className="font-semibold block text-[#252925]">{userData.name}</span>
                <span className="text-[#8C938E] text-[11px] block">{userData.email}</span>
              </div>
            </div>

            <Button
              color="red"
              variant="light"
              fullWidth
              size="xs"
              leftSection={<LogOut size={14} />}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </Drawer>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-[#E7E3DB] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger on mobile */}
            <div className="md:hidden">
              <Burger
                opened={drawerOpened}
                onClick={() => setDrawerOpened(!drawerOpened)}
                size="sm"
                color="#263B35"
                aria-label="Abrir navegación móvil"
              />
            </div>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-[#252925] font-editorial text-base sm:text-lg">
                {currentNavItem?.label || 'Estudio'}
              </span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3F0] text-[#263B35] text-xs font-medium">
              <Sparkles size={13} className="text-[#D6B77A]" />
              <span>Motor IA Activo</span>
            </div>

            <Button
              size="xs"
              color="forest"
              leftSection={<PlusCircle size={14} />}
              onClick={() => navigate(routes.app.createProject)}
              className="bg-[#263B35] hover:bg-[#1A2925] hidden sm:flex"
            >
              Nuevo proyecto
            </Button>

            {/* User Avatar Menu in Header */}
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <Avatar
                  src={userData.photo}
                  alt={userData.name}
                  radius="xl"
                  size="sm"
                  color="forest"
                  className="cursor-pointer border border-[#E7E3DB]"
                >
                  {userData.name.charAt(0)}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <div className="px-3 py-2 border-b border-[#E7E3DB]">
                  <span className="text-xs font-bold text-[#252925] block">{userData.name}</span>
                  <span className="text-[11px] text-[#8C938E] block truncate">{userData.email}</span>
                </div>

                <Menu.Item 
                  leftSection={<Settings size={14} />}
                  onClick={() => navigate(routes.app.settings)}
                >
                  Ajustes
                </Menu.Item>

                <Menu.Item 
                  color="red" 
                  leftSection={<LogOut size={14} />}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </header>

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet context={userData} />
        </main>
      </div>
    </div>
  );
}
