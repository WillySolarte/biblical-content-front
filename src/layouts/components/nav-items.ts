import { LayoutDashboard, Layers, PlusCircle, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { routes } from '@/common/constants/routes';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const appNavItems: NavItem[] = [
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

export const isNavItemActive = (item: NavItem, pathname: string) =>
  pathname === item.path ||
  (item.path === routes.app.projects && pathname.startsWith('/app/projects/'));
