//React

//Libraries
import { Pagination, Skeleton } from '@mantine/core';
import { Plus, Layers } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
//My resources
import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useDeleteProject } from '../hooks/useDeleteProject';
import ProjectCard from '../components/ProjectCard';
import ProjectTable from '../components/ProjectTable';
import ProjectFilterBar from '../components/ProjectFilterBar';
import DeleteProjectModal from '../components/DeleteProjectModal';
import type { projectDataDelete, ProjectFilters, TProject } from '../types/project.types';
import { routes } from '@/common/constants/routes';

import { queryKeys } from '@/common/constants/query-keys';
import { getProjects } from '../services/project.service';

export default function ProjectsListView() {

  
    
  

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState<TProject['status'] | ''>('');
  const [productionStage, setProductionStage] = useState<TProject['productionStage'] | ''>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [projectToDelete, setProjectToDelete] = useState<projectDataDelete | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const currentPage = Number(searchParams.get('page')) || 1;



  const { viewMode, setViewMode } = useProjects();
  const { mutate: removeProject, isPending: isDeleting } = useDeleteProject();

  const filters: ProjectFilters = {
    search: searchInput,
    status,
    productionStage,
    page: currentPage,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.projects.list(filters),
    queryFn: () => getProjects(filters),
    placeholderData: keepPreviousData,
    retry: 1,

  });

  function handlePage(newPage: number) {
    setSearchParams((prevParams) => {
      prevParams.set('page', newPage.toString());
      return prevParams;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (currentPage !== 1) handlePage(1);
  };

  const handleStatusChange = (value: TProject['status'] | '') => {
    setStatus(value);
    if (currentPage !== 1) handlePage(1);
  };

  const handleStageChange = (value: TProject['productionStage'] | '') => {
    setProductionStage(value);
    if (currentPage !== 1) handlePage(1);
  };

  const handleRequestDelete = (project: projectDataDelete) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (project: projectDataDelete) => {
    removeProject(project, {
      onSuccess: () => {
        if ((data?.projects.length ?? 0) === 1 && currentPage > 1) {
          handlePage(currentPage - 1);
        }
        setIsDeleteModalOpen(false);
      },
    });
  };

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
        search={searchInput}
        onSearchChange={handleSearchChange}
        statusFilter={status}
        onStatusFilterChange={handleStatusChange}
        stageFilter={productionStage}
        onStageFilterChange={handleStageChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={data?.totalProjects || 0}
        filteredCount={data?.projects.length || 0}
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
      ) : data?.projects.length === 0 ? (
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
            {(searchInput || status !== '' || productionStage !== '') && (
              <button onClick={() => { setSearchInput(''); setStatus(''); setProductionStage(''); handlePage(1) }}>
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
          {(data?.projects ?? []).map((project) => (
            
            <ProjectCard key={project.id} project={project} onRequestDelete={handleRequestDelete}/>
            
          ))}
          
        </div>
      ) : (
        <ProjectTable projects={data?.projects || []} onRequestDelete={handleRequestDelete} />
      )}
      {/* Paginación controlada y fuera del grid para que aplique a tabla y tarjetas */}
      {(data?.totalPages ?? 0) > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination value={currentPage} onChange={handlePage} total={data?.totalPages || 0} siblings={1} />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteProjectModal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onExitTransitionEnd={() => setProjectToDelete(null)}
        projectData={projectToDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}


