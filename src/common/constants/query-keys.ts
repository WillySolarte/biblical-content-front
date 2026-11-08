
export const queryKeys = {
    auth: ['userAuth'] as const,
    projects: {
        all: ['projects'] as const,
        list: (page: number, search: string) =>
            ['projects', 'list', page, search] as const,
        project: (projectId: string) =>
            ['projects', projectId] as const,
       
        
    },
    bible: {
        all: ['bible'] as const,
        version: ['bible', 'versions'] as const
    }
    
};
