export const routes = {
  public: {
    home: '/',
  },

  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },

  app: {
    panel: '/app/panel',
    projects: '/app/projects',
    createProject: '/app/projects/create',
    projectDetail: '/app/projects/:id',
    settings: '/app/settings',
  },
} as const;

export const getProjectDetailUrl = (projectId: string) => `/app/projects/${projectId}`;
