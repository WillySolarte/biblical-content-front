import { Drawer, Avatar, Button } from '@mantine/core';
import { BookOpen, LogOut } from 'lucide-react';
import type { TUserActive } from '@/features/user/types/user.types';
import AppNavLinks from './AppNavLinks';

interface AppMobileDrawerProps {
  opened: boolean;
  onClose: () => void;
  userData: TUserActive;
  onLogout: () => void;
}

export default function AppMobileDrawer({
  opened,
  onClose,
  userData,
  onLogout,
}: AppMobileDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="xs"
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-gold">
            <BookOpen size={16} />
          </div>
          <span className="font-editorial font-bold text-base text-charcoal">
            Biblia Studio
          </span>
        </div>
      }
      padding="md"
    >
      <div className="flex flex-col justify-between h-[calc(100vh-100px)]">
        <div className="space-y-4 pt-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted block">
            Navegación
          </span>
          <AppNavLinks onNavigate={onClose} />
        </div>

        <div className="pt-4 border-t border-border-warm space-y-3">
          <div className="flex items-center gap-3 px-3">
            <Avatar src={userData.photo} radius="xl" size="sm" color="forest">
              {userData.name.charAt(0)}
            </Avatar>
            <div className="text-xs">
              <span className="font-semibold block text-charcoal">{userData.name}</span>
              <span className="text-muted text-[11px] block">{userData.email}</span>
            </div>
          </div>

          <Button
            color="red"
            variant="light"
            fullWidth
            size="xs"
            leftSection={<LogOut size={14} />}
            onClick={onLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
