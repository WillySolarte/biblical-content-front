import { useState } from 'react';
import { Skeleton } from '@mantine/core';
import { Plus, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import ProjectTable from '../components/ProjectTable';
import ProjectFilterBar from '../components/ProjectFilterBar';
import DeleteProjectModal from '../components/DeleteProjectModal';
import type { Project } from '../types/project.types';
import { routes } from '@/common/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/common/constants/query-keys';
import { getProjects } from '../services/project.service';

export default function ProjectsListView() {
  const navigate = useNavigate();
  const { projects, filteredProjects, search, setSearch, statusFilter, setStatusFilter, stageFilter, setStageFilter, sortBy, setSortBy, viewMode, setViewMode,
    deleteProject,
  } = useProjects();

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: getProjects,
    retry: 1,

  });
  if (isError) console.error(error)
    
  

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Mis Proyectos
          </h1>
          <p className="text-sm text-charcoal-muted mt-1">
            Administra, edita y supervisa el flujo de producción audiovisual de tus contenidos bíblicos.
          </p>
        </div>

        <button color="forest" onClick={() => navigate(routes.app.createProject)} className="flex justify-evenly items-center w-45 h-8 rounded-md cursor-pointer text-white bg-forest hover:bg-forest-dark shadow-sm self-start sm:self-auto">
          <Plus size={16} /> Crear proyecto
        </button>
      </div>

      {/* Filter and Search Bar */}
      <ProjectFilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        stageFilter={stageFilter}
        onStageFilterChange={setStageFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={projects.length}
        filteredCount={filteredProjects.length}
      />

      {/* Projects Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-border-warm space-y-4">
              <Skeleton height={140} radius="lg" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={14} />
              <Skeleton height={14} width="80%" />
              <Skeleton height={8} radius="xl" />
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border-warm p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-ivory-light text-forest flex items-center justify-center mx-auto border border-border-warm">
            <Layers size={26} className="text-gold" />
          </div>

          <h3 className="font-editorial text-xl font-bold text-charcoal">
            No se encontraron proyectos
          </h3>

          <p className="text-xs text-charcoal-muted leading-relaxed">
            No hay proyectos que coincidan con los criterios de búsqueda o filtros seleccionados.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center text-xs">
            {(search || statusFilter !== 'ALL' || stageFilter !== 'ALL') && (
              <button onClick={() => { setSearch(''); setStatusFilter('ALL'); setStageFilter('ALL')}}>
                Limpiar filtros
              </button>
            )}

            <button color="forest" className='flex justify-evenly items-center h-8 w-45 rounded-md cursor-pointer text-white bg-forest hover:bg-forest-dark shadow-sm self-start sm:self-auto' onClick={() => navigate(routes.app.createProject)}>
              <Plus size={14} /> Crear nuevo proyecto
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data ?? []).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={data || []} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteProjectModal
        opened={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        project={projectToDelete}
        onConfirm={() => {
          if (projectToDelete) {
            deleteProject(projectToDelete.id);
          }
        }}
      />
    </div>
  );
}
