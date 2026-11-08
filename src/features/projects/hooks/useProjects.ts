import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Project } from '../types/project.types';
import { getStoredProjects, saveProjects } from '../data/mock-projects';
import { notifications } from '@mantine/notifications';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'progress'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    // Simulate brief load for realistic skeleton testing
    const timer = setTimeout(() => {
      setProjects(getStoredProjects());
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const createProject = useCallback((newProjectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'status' | 'stage' | 'scenes'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj-${Date.now()}`,
      status: 'DRAFT',
      stage: 'BIBLE_SELECTION',
      progress: 10,
      scenes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => {
      const updated = [newProject, ...prev];
      saveProjects(updated);
      return updated;
    });

    notifications.show({
      title: '¡Proyecto creado con éxito!',
      message: `"${newProject.title}" está listo para comenzar la producción.`,
      color: 'forest',
    });

    return newProject;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      saveProjects(updated);
      return updated;
    });

    notifications.show({
      title: 'Proyecto actualizado',
      message: 'Los cambios se han guardado exitosamente.',
      color: 'forest',
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const projectToDelete = prev.find(p => p.id === id);
      const updated = prev.filter(p => p.id !== id);
      saveProjects(updated);

      notifications.show({
        title: 'Proyecto eliminado',
        message: projectToDelete ? `Se ha eliminado "${projectToDelete.title}".` : 'Proyecto eliminado.',
        color: 'red',
      });

      return updated;
    });
  }, []);

  const getProject = useCallback((id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search query
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.passages.some(pass => `${pass.book} ${pass.chapter}`.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Stage filter
    if (stageFilter !== 'ALL') {
      result = result.filter(p => p.stage === stageFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      return 0;
    });

    return result;
  }, [projects, search, statusFilter, stageFilter, sortBy]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === 'ACTIVE').length;
    const completed = projects.filter(p => p.status === 'COMPLETED').length;
    const inProgress = projects.filter(p => p.status === 'ACTIVE' || p.status === 'DRAFT').length;
    const draft = projects.filter(p => p.status === 'DRAFT').length;

    return {
      total,
      active,
      completed,
      inProgress,
      draft,
    };
  }, [projects]);

  return {
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
    createProject,
    updateProject,
    deleteProject,
    getProject,
    stats,
  };
}
