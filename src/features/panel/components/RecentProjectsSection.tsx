import { Button, Card, Progress, Badge } from '@mantine/core';
import { ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../projects/types/project.types';
import ProjectStatusBadge from '../../projects/components/ProjectStatusBadge';
import ProductionStageBadge from '../../projects/components/ProductionStageBadge';
import { routes, getProjectDetailUrl } from '@/common/constants/routes';

interface RecentProjectsSectionProps {
  projects: Project[];
}

export default function RecentProjectsSection({ projects }: RecentProjectsSectionProps) {
  const navigate = useNavigate();

  const recent = projects.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#252925]">
            Proyectos Recientes
          </h3>
          <p className="text-xs text-[#555E57]">
            Tus producciones más recientes en curso
          </p>
        </div>

        <Button
          variant="subtle"
          color="forest"
          size="sm"
          rightSection={<ArrowRight size={14} />}
          onClick={() => navigate(routes.app.projects)}
        >
          Ver todos ({projects.length})
        </Button>
      </div>

      <div className="space-y-3">
        {recent.map((project) => {
          const passageSummary = project.passages.map(p => 
            `${p.book} ${p.chapter}:${p.verseStart}${p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}`
          ).join(', ');

          const formattedDate = new Date(project.updatedAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          return (
            <Card
              key={project.id}
              radius="xl"
              p="lg"
              withBorder
              className="bg-white border-[#E7E3DB] hover:border-[#D6B77A] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <ProjectStatusBadge status={project.status} size="xs" />
                    <ProductionStageBadge stage={project.stage} size="xs" />
                    <Badge variant="outline" color="forest" size="xs">
                      {project.bibleVersion}
                    </Badge>
                    <span className="font-serif text-xs text-[#263B35] font-medium flex items-center gap-1 bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E3DB]">
                      <BookOpen size={11} className="text-[#D6B77A]" />
                      {passageSummary || 'Sin pasaje'}
                    </span>
                  </div>

                  <h4
                    onClick={() => navigate(getProjectDetailUrl(project.id))}
                    className="font-editorial text-base sm:text-lg font-bold text-[#252925] hover:text-[#263B35] cursor-pointer truncate transition-colors"
                  >
                    {project.title}
                  </h4>

                  <p className="text-xs text-[#555E57] line-clamp-1 leading-relaxed">
                    {project.description || 'Sin descripción adicional para este proyecto.'}
                  </p>
                </div>

                {/* Right Progress & Action */}
                <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#E7E3DB]">
                  <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#555E57]">
                      <span>Progreso</span>
                      <span className="font-bold text-[#263B35]">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} color="forest" size="xs" radius="xl" />
                    <span className="text-[10px] text-[#8C938E] block text-right">
                      {formattedDate}
                    </span>
                  </div>

                  <Button
                    size="xs"
                    color="forest"
                    variant="light"
                    rightSection={<ExternalLink size={12} />}
                    onClick={() => navigate(getProjectDetailUrl(project.id))}
                    className="hover:bg-[#263B35] hover:text-white transition-colors"
                  >
                    Abrir
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
