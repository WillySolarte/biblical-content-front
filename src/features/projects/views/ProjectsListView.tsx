import { useState } from 'react';
import { Button, Skeleton } from '@mantine/core';
import { Plus, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import ProjectTable from '../components/ProjectTable';
import ProjectFilterBar from '../components/ProjectFilterBar';
import DeleteProjectModal from '../components/DeleteProjectModal';
import type { Project } from '../types/project.types';
import { routes } from '@/common/constants/routes';

export default function ProjectsListView() {
  const navigate = useNavigate();
  const {
    projects,
    filteredProjects,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    stageFilter,
    setStageFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    deleteProject,
  } = useProjects();

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#252925] tracking-tight">
            Mis Proyectos
          </h1>
          <p className="text-sm text-[#555E57] mt-1">
            Administra, edita y supervisa el flujo de producción audiovisual de tus contenidos bíblicos.
          </p>
        </div>

        <Button
          color="forest"
          size="md"
          leftSection={<Plus size={16} />}
          onClick={() => navigate(routes.app.createProject)}
          className="bg-[#263B35] hover:bg-[#1A2925] shadow-sm self-start sm:self-auto"
        >
          Crear proyecto
        </Button>
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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E7E3DB] space-y-4">
              <Skeleton height={140} radius="lg" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={14} />
              <Skeleton height={14} width="80%" />
              <Skeleton height={8} radius="xl" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E3DB] p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] text-[#263B35] flex items-center justify-center mx-auto border border-[#E7E3DB]">
            <Layers size={26} className="text-[#D6B77A]" />
          </div>

          <h3 className="font-editorial text-xl font-bold text-[#252925]">
            No se encontraron proyectos
          </h3>

          <p className="text-xs text-[#555E57] leading-relaxed">
            No hay proyectos que coincidan con los criterios de búsqueda o filtros seleccionados.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            {(search || statusFilter !== 'ALL' || stageFilter !== 'ALL') && (
              <Button
                variant="default"
                size="xs"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('ALL');
                  setStageFilter('ALL');
                }}
              >
                Limpiar filtros
              </Button>
            )}

            <Button
              color="forest"
              size="xs"
              leftSection={<Plus size={14} />}
              onClick={() => navigate(routes.app.createProject)}
            >
              Crear nuevo proyecto
            </Button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDeleteRequest={(proj) => setProjectToDelete(proj)}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={filteredProjects}
          onDeleteRequest={(proj) => setProjectToDelete(proj)}
        />
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
