import type { ProjectFilters } from "@/features/projects/types/project.types";

export const queryKeys = {
    auth: ['userAuth'] as const,
    projects: {
        all: ['projects'] as const,
        list: (filters: ProjectFilters) => ['projects', 'list', filters] as const,
        project: (projectId: string) =>
            ['projects', projectId] as const,
       
        
    },
    bible: {
        all: ['bible'] as const,
        version: ['bible', 'versions'] as const
    }
    
};
