import { Table, Progress, ActionIcon, Menu, Button } from '@mantine/core';
import { MoreVertical, ExternalLink, Trash2, Edit3, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project.types';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProductionStageBadge from './ProductionStageBadge';
import { getProjectDetailUrl } from '@/common/constants/routes';

interface ProjectTableProps {
  projects: Project[];
  onDeleteRequest: (project: Project) => void;
  onEditRequest?: (project: Project) => void;
}

export default function ProjectTable({ projects, onDeleteRequest, onEditRequest }: ProjectTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E7E3DB] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
          <Table.Thead className="bg-[#FAF8F5] border-b border-[#E7E3DB]">
            <Table.Tr>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Proyecto</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Versión & Pasaje</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Estado</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Etapa de Producción</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Progreso</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold">Actualizado</Table.Th>
              <Table.Th className="text-xs uppercase tracking-wider text-[#555E57] font-semibold text-right">Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {projects.map((project) => {
              const passageSummary = project.passages.length > 0
                ? project.passages.map(p => `${p.book} ${p.chapter}:${p.verseStart}${p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}`).join(', ')
                : '—';

              const formattedDate = new Date(project.updatedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <Table.Tr key={project.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <Table.Td>
                    <div className="max-w-[260px]">
                      <span 
                        onClick={() => navigate(getProjectDetailUrl(project.id))}
                        className="font-editorial text-sm font-semibold text-[#252925] hover:text-[#263B35] cursor-pointer block truncate"
                      >
                        {project.title}
                      </span>
                      <span className="text-xs text-[#6B7280] line-clamp-1">
                        {project.description || 'Sin descripción'}
                      </span>
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-[#263B35]">
                        {project.bibleVersion}
                      </span>
                      <span className="text-xs text-[#555E57] font-serif flex items-center gap-1">
                        <BookOpen size={11} className="text-[#D6B77A]" />
                        {passageSummary}
                      </span>
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <ProjectStatusBadge status={project.status} size="sm" />
                  </Table.Td>

                  <Table.Td>
                    <ProductionStageBadge stage={project.stage} size="xs" />
                  </Table.Td>

                  <Table.Td>
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px] text-[#555E57]">
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} size="xs" color="forest" radius="xl" />
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <span className="text-xs text-[#6B7280] flex items-center gap-1">
                      <Clock size={11} />
                      {formattedDate}
                    </span>
                  </Table.Td>

                  <Table.Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="xs"
                        variant="subtle"
                        color="forest"
                        rightSection={<ExternalLink size={12} />}
                        onClick={() => navigate(getProjectDetailUrl(project.id))}
                      >
                        Abrir
                      </Button>

                      <Menu shadow="md" width={160} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray" size="sm" aria-label="Más opciones">
                            <MoreVertical size={15} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {onEditRequest && (
                            <Menu.Item 
                              leftSection={<Edit3 size={14} />}
                              onClick={() => onEditRequest(project)}
                            >
                              Editar
                            </Menu.Item>
                          )}
                          <Menu.Item 
                            color="red" 
                            leftSection={<Trash2 size={14} />}
                            onClick={() => onDeleteRequest(project)}
                          >
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
