//React


//Libraries
import { Table, Progress, ActionIcon, Menu, Button } from '@mantine/core';
import { MoreVertical, ExternalLink, Trash2, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
//My resources
import type { projectDataDelete, TProject } from '../types/project.types';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProductionStageBadge from './ProductionStageBadge';
import { getProjectDetailUrl } from '@/common/constants/routes';
import { calculateProjectProgress } from '@/common/functions/projectProgressData';
import { formatDateLong } from '@/common/functions/dateFunctions';

interface ProjectTableProps {
  projects: TProject[];
  onRequestDelete: (projectData: projectDataDelete) => void;
}

export default function ProjectTable({ projects, onRequestDelete }: ProjectTableProps) {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-border-warm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
          <Table.Thead className="bg-ivory-light border-b border-border-warm">
            <Table.Tr>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Proyecto</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Versión & Pasaje</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Estado</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Etapa de Producción</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Progreso</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Actualizado</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold text-right">Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {projects.map((project) => {
              const passageSummary = project.passages.length > 0
                ? project.passages.map(p => `${p.bookName} ${p.startChapter}:${p.startVerse}${p.endVerse > p.startVerse ? `-${p.endVerse}` : ''}`).join(', ')
                : '—';

              return (
                <Table.Tr key={project.id} className="hover:bg-ivory-light/80 transition-colors">
                  <Table.Td>
                    <div className="max-w-65">
                      <span 
                        onClick={() => navigate(getProjectDetailUrl(project.id))}
                        className="font-editorial text-sm font-semibold text-charcoal hover:text-forest cursor-pointer block truncate"
                      >
                        {project.name}
                      </span>
                      <span className="text-xs text-slate-muted line-clamp-1">
                        {project.description || 'Sin descripción'}
                      </span>
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-forest">
                        {project.bibleVersionName || 'No definido'}
                      </span>
                      <span className="text-xs text-charcoal-muted font-serif flex items-center gap-1">
                        <BookOpen size={11} className="text-gold" />
                        {passageSummary}
                      </span>
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <ProjectStatusBadge status={project.status} size="sm" />
                  </Table.Td>

                  <Table.Td>
                    <ProductionStageBadge stage={project.productionStage} size="xs" />
                  </Table.Td>

                  <Table.Td>
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px] text-charcoal-muted">
                        <span>{calculateProjectProgress(project.productionStage)}%</span>
                      </div>
                      <Progress value={calculateProjectProgress(project.productionStage)} size="xs" color="forest" radius="xl" />
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <span className="text-xs text-slate-muted flex items-center gap-1">
                      <Clock size={11} />
                      {formatDateLong(project.createdAt)}
                    </span>
                  </Table.Td>

                  <Table.Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="xs" variant="subtle" color="forest" rightSection={<ExternalLink size={12} />} onClick={() => navigate(getProjectDetailUrl(project.id))}>
                        Abrir
                      </Button>

                      <Menu shadow="md" width={160} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray" size="sm" aria-label="Más opciones">
                            <MoreVertical size={15} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          
                          
                          <Menu.Item onClick={() => onRequestDelete({ id: project.id, name: project.name })} color="red" leftSection={<Trash2 size={14} />}>
                            Eliminar
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
