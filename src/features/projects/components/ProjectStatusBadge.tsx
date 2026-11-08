import { Badge } from '@mantine/core';
import type { ProjectStatus } from '../types/project.types';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; variant: 'light' | 'filled' | 'outline' }> = {
  DRAFT: {
    label: 'Borrador',
    color: 'gray',
    variant: 'light',
  },
  ACTIVE: {
    label: 'Activo',
    color: 'forest',
    variant: 'filled',
  },
  PAUSED: {
    label: 'En pausa',
    color: 'yellow',
    variant: 'light',
  },
  COMPLETED: {
    label: 'Completado',
    color: 'teal',
    variant: 'filled',
  },
  PUBLISHED: {
    label: 'Publicado',
    color: 'blue',
    variant: 'filled',
  },
  ARCHIVED: {
    label: 'Archivado',
    color: 'dark',
    variant: 'light',
  },
};

export default function ProjectStatusBadge({ status, size = 'sm' }: ProjectStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || { label: status, color: 'gray', variant: 'light' };

  return (
    <Badge
      color={config.color}
      variant={config.variant}
      size={size}
      radius="sm"
      className="font-medium tracking-wide uppercase text-[11px]"
    >
      {config.label}
    </Badge>
  );
}

