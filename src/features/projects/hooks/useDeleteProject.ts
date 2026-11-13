import { useMutation, useQueryClient } from '@tanstack/react-query';
import flashy from '@pablotheblink/flashyjs';
import { queryKeys } from '@/common/constants/query-keys';
import { deleteProject } from '../services/project.service';
import type { projectDataDelete } from '../types/project.types';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: projectDataDelete) => deleteProject(project.id),
    onError: (error) => {
      flashy.error(error.message, { position: 'top-center', animation: 'bounce' });
    },
    onSuccess: (data, project) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
      flashy.success(
        data.message || `Se ha eliminado "${project.name}".`,
        { animation: 'bounce', position: 'top-center' },
      );
    },
  });
}
