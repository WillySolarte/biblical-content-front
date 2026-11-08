import { Button, Progress, Badge, Menu } from '@mantine/core';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Download, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project, ProjectStatus } from '../../types/project.types';
import ProjectStatusBadge from '../ProjectStatusBadge';
import ProductionStageBadge from '../ProductionStageBadge';
import { routes } from '@/common/constants/routes';

interface ProjectOverviewHeaderProps {
  project: Project;
  onUpdateStatus: (newStatus: ProjectStatus) => void;
  onGoToExport: () => void;
}

export default function ProjectOverviewHeader({
  project,
  onUpdateStatus,
  onGoToExport,
}: ProjectOverviewHeaderProps) {
  const navigate = useNavigate();

  const passageSummary = project.passages.map(p => 
    `${p.book} ${p.chapter}:${p.verseStart}${p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}`
  ).join(', ');

  return (
    <div className="bg-white rounded-2xl border border-[#E7E3DB] p-6 shadow-sm space-y-5">
      {/* Top breadcrumb & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="subtle"
            color="gray"
            size="sm"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => navigate(routes.app.projects)}
            className="text-[#555E57] hover:text-[#263B35]"
          >
            Mis proyectos
          </Button>
          <span className="text-[#D8D4CC]">|</span>
          <div className="flex items-center gap-2">
            <ProjectStatusBadge status={project.status} size="md" />
            <ProductionStageBadge stage={project.stage} size="sm" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Menu shadow="md" width={180}>
            <Menu.Target>
              <Button variant="default" size="sm">
                Cambiar estado
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => onUpdateStatus('ACTIVE')}>Activo</Menu.Item>
              <Menu.Item onClick={() => onUpdateStatus('PAUSED')}>En pausa</Menu.Item>
              <Menu.Item onClick={() => onUpdateStatus('COMPLETED')}>Completado</Menu.Item>
              <Menu.Item onClick={() => onUpdateStatus('DRAFT')}>Borrador</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Button
            color="forest"
            size="sm"
            leftSection={<Download size={14} />}
            onClick={onGoToExport}
            className="bg-[#263B35] hover:bg-[#1A2925]"
          >
            Exportar video
          </Button>
        </div>
      </div>

      {/* Main Title & Scripture metadata */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="forest" variant="light" size="md">
            {project.bibleVersion}
          </Badge>
          <span className="font-serif text-sm font-semibold text-[#263B35] flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E7E3DB]">
            <BookOpen size={14} className="text-[#D6B77A]" />
            {passageSummary || 'Sin pasaje'}
          </span>
          <span className="text-xs text-[#8C938E]">
            Formato: <strong>{project.videoConfig.aspectRatio}</strong> • {project.visualStyle}
          </span>
        </div>

        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#252925] tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm text-[#555E57] max-w-3xl leading-relaxed">
          {project.description || 'Proyecto de creación de contenido audiovisual basado en pasajes bíblicos mediante inteligencia artificial.'}
        </p>
      </div>

      {/* Production Progress Bar */}
      <div className="pt-3 border-t border-[#E7E3DB] space-y-1.5">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-[#555E57] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#D6B77A]" />
            Progreso general de producción audiovisual
          </span>
          <span className="text-[#263B35] font-bold">{project.progress}%</span>
        </div>
        <Progress 
          value={project.progress} 
          size="md" 
          color="forest" 
          radius="xl"
          className="bg-[#EDF3F0]"
        />
      </div>
    </div>
  );
}
