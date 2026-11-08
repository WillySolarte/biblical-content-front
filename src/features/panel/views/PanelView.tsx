import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { TUserActive } from '@/features/user/types/user.types';
import { useProjects } from '@/features/projects/hooks/useProjects';
import DashboardStats from '../components/DashboardStats';
import QuickCreationBanner from '../components/QuickCreationBanner';
import RecentProjectsSection from '../components/RecentProjectsSection';
import DeleteProjectModal from '@/features/projects/components/DeleteProjectModal';
import type { Project } from '@/features/projects/types/project.types';

export default function PanelView() {
  const userData = useOutletContext<TUserActive>();
  const { projects, stats, deleteProject } = useProjects();
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Welcome & Quick Action Hero */}
      <QuickCreationBanner userName={userData?.name} />

      {/* KPI Project Statistics */}
      <div className="space-y-3">
        <h3 className="font-editorial text-xl font-bold text-charcoal">
          Resumen de Actividad
        </h3>
        <DashboardStats stats={stats} />
      </div>

      {/* Recent Projects Section */}
      <RecentProjectsSection
        projects={projects}
      />

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
