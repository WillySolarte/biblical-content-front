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
    
  },
} as const;