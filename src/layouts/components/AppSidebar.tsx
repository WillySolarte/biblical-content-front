import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, Badge } from '@mantine/core';
import { BookOpen, LogOut, User, ExternalLink } from 'lucide-react';
import { routes } from '@/common/constants/routes';
import type { TUserActive } from '@/features/user/types/user.types';
import AppNavLinks from './AppNavLinks';

interface AppSidebarProps {
  userData: TUserActive;
  onLogout: () => void;
}

export default function AppSidebar({ userData, onLogout }: AppSidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border-warm shrink-0 sticky top-0 h-screen justify-between z-20">
      <div>
        {/* Logo Brand Header */}
        <div
          onClick={() => navigate(routes.app.panel)}
          className="p-5 flex items-center gap-3 border-b border-border-warm cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-gold shadow-sm">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-editorial text-lg font-bold text-charcoal tracking-tight block">
              Biblia Studio
            </span>
            <span className="text-[10px] text-muted tracking-wider uppercase font-semibold block">
              IA Creativa Bíblica
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-5">
          <span className="px-6 text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">
            Menú Principal
          </span>
          <AppNavLinks />
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
                <span className="text-[11px] text-muted block truncate">
                  {userData.email}
                </span>
              </div>
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <div className="px-3 py-2 border-b border-border-warm">
              <span className="text-xs font-bold text-charcoal block">{userData.name}</span>
              <span className="text-[11px] text-muted block truncate">{userData.email}</span>
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
              onClick={onLogout}
            >
              Cerrar sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </aside>
  );
}
