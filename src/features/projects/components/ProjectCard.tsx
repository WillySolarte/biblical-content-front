import { Card, Image, Progress, Menu, ActionIcon, Button } from '@mantine/core';
import { 
  MoreVertical, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Clock, 
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project.types';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProductionStageBadge from './ProductionStageBadge';
import { getProjectDetailUrl } from '@/common/constants/routes';

interface ProjectCardProps {
  project: Project;
  onDeleteRequest: (project: Project) => void;
  onEditRequest?: (project: Project) => void;
}

export default function ProjectCard({ project, onDeleteRequest, onEditRequest }: ProjectCardProps) {
  const navigate = useNavigate();

  const passageSummary = project.passages.length > 0
    ? project.passages.map(p => `${p.book} ${p.chapter}:${p.verseStart}${p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}`).join(', ')
    : 'Sin pasaje asignado';

  const formattedDate = new Date(project.updatedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="lg" 
      withBorder 
      className="bg-white hover:shadow-md transition-all duration-200 border-border-warm flex flex-col justify-between group"
    >
      <div>
        {/* Cover Image or Editorial Header */}
        <div className="relative -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-lg bg-ivory h-40">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              h={160}
              fallbackSrc="https://placehold.co/600x400/263B35/D6B77A?text=Biblia+Studio"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-linear-to-br from-forest to-forest-dark text-white">
              <BookOpen className="w-8 h-8 text-gold mb-2 opacity-80" />
              <p className="font-editorial text-sm tracking-wide text-ivory text-center font-medium line-clamp-1">
                {project.bibleVersion} • {project.passages[0]?.book || 'Escrituras'}
              </p>
            </div>
          )}

          {/* Badges on top of cover */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <ProjectStatusBadge status={project.status} size="sm" />
          </div>

          <div className="absolute top-3 right-3">
            <Menu shadow="md" width={180} position="bottom-end">
              <Menu.Target>
                <ActionIcon 
                  variant="filled" 
                  color="dark" 
                  radius="xl"
                  size="md"
                  className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white"
                  aria-label="Opciones del proyecto"
                >
                  <MoreVertical size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item 
                  leftSection={<ExternalLink size={14} />}
                  onClick={() => navigate(getProjectDetailUrl(project.id))}
                >
                  Abrir estudio
                </Menu.Item>
                {onEditRequest && (
                  <Menu.Item 
                    leftSection={<Edit3 size={14} />}
                    onClick={() => onEditRequest(project)}
                  >
                    Editar datos
                  </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Item 
                  color="red" 
                  leftSection={<Trash2 size={14} />}
                  onClick={() => onDeleteRequest(project)}
                >
                  Eliminar proyecto
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-charcoal-muted font-medium">
            <span className="px-2 py-0.5 rounded bg-ivory-light border border-border-warm text-forest">
              {project.bibleVersion}
            </span>
            <span className="flex items-center gap-1 font-serif text-forest-light font-medium truncate max-w-[200px]">
              <BookOpen size={12} className="text-gold shrink-0" />
              {passageSummary}
            </span>
          </div>

          <h3 
            onClick={() => navigate(getProjectDetailUrl(project.id))}
            className="font-editorial text-lg font-semibold text-charcoal line-clamp-1 hover:text-forest cursor-pointer transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed min-h-[32px]">
            {project.description || 'Sin descripción adicional para este proyecto de contenido bíblico.'}
          </p>
        </div>
      </div>

      {/* Footer Info & Progress */}
      <div className="pt-4 mt-4 border-t border-border-warm/80 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-charcoal-muted">
            <Layers size={13} className="text-forest" />
            <ProductionStageBadge stage={project.stage} size="xs" />
          </div>
          <span className="font-semibold text-forest text-xs">{project.progress}%</span>
        </div>

        <Progress 
          value={project.progress} 
          size="sm" 
          color="forest" 
          radius="xl" 
          className="bg-forest-subtle"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted flex items-center gap-1">
            <Clock size={11} />
            {formattedDate}
          </span>

          <Button
            size="xs"
            variant="light"
            color="forest"
            rightSection={<ExternalLink size={12} />}
            onClick={() => navigate(getProjectDetailUrl(project.id))}
            className="hover:bg-forest hover:text-white transition-colors"
          >
            Abrir
          </Button>
        </div>
      </div>
    </Card>
  );
}
