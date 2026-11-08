import { useNavigate } from 'react-router-dom';
import { Burger, Avatar, Menu, Button } from '@mantine/core';
import { Sparkles, PlusCircle, Settings, LogOut } from 'lucide-react';
import { routes } from '@/common/constants/routes';
import type { TUserActive } from '@/features/user/types/user.types';

interface AppHeaderProps {
  title: string;
  userData: TUserActive;
  onLogout: () => void;
  drawerOpened: boolean;
  onToggleDrawer: () => void;
}

export default function AppHeader({
  title,
  userData,
  onLogout,
  drawerOpened,
  onToggleDrawer,
}: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-border-warm px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger on mobile */}
        <div className="md:hidden">
          <Burger
            opened={drawerOpened}
            onClick={onToggleDrawer}
            size="sm"
            color="#263B35"
            aria-label="Abrir navegación móvil"
          />
        </div>

        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-charcoal font-editorial text-base sm:text-lg">
            {title}
          </span>
        </div>
      </div>

      {/* Right Header Utilities */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-subtle text-forest text-xs font-medium">
          <Sparkles size={13} className="text-gold" />
          <span>Motor IA Activo</span>
        </div>

        <Button
          size="xs"
          color="forest"
          leftSection={<PlusCircle size={14} />}
          onClick={() => navigate(routes.app.createProject)}
          className="bg-forest hover:bg-forest-dark hidden sm:flex"
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
              className="cursor-pointer border border-border-warm"
            >
              {userData.name.charAt(0)}
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <div className="px-3 py-2 border-b border-border-warm">
              <span className="text-xs font-bold text-charcoal block">{userData.name}</span>
              <span className="text-[11px] text-muted block truncate">{userData.email}</span>
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
              onClick={onLogout}
            >
              Cerrar sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}
