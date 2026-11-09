import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Button, Skeleton } from '@mantine/core';
import { 
  BookOpen, 
  Layers, 
  Image as ImageIcon, 
  Mic, 
  Film, 
  Download, 
  ArrowLeft,
  AlertCircle 
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import type { StoryboardScene, AudioConfig, VideoConfig, ProjectStatus } from '../types/project.types';
import ProjectOverviewHeader from '../components/detail/ProjectOverviewHeader';
import TabPassages from '../components/detail/TabPassages';
import TabContentStoryboard from '../components/detail/TabContentStoryboard';
import TabImages from '../components/detail/TabImages';
import TabAudio from '../components/detail/TabAudio';
import TabVideo from '../components/detail/TabVideo';
import TabExport from '../components/detail/TabExport';
import PassagesModal from '../components/detail/PassagesModal';
import { routes } from '@/common/constants/routes';

export default function ProjectDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading, updateProject } = useProjects();
  const [activeTab, setActiveTab] = useState<string | null>('passages');
  const [passagesModalOpened, setPassagesModalOpened] = useState(false);

  const currentProject = projects.find(p => p.id === id);

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto py-4">
        <Skeleton height={140} radius="xl" />
        <Skeleton height={50} radius="md" />
        <Skeleton height={380} radius="xl" />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        <h2 className="font-editorial text-2xl font-bold text-charcoal">
          Proyecto no encontrado
        </h2>
        <p className="text-sm text-charcoal-muted">
          El proyecto solicitado no existe o ha sido eliminado.
        </p>
        <Button
          color="forest"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate(routes.app.projects)}
        >
          Volver a Mis Proyectos
        </Button>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus: ProjectStatus) => {
    updateProject(currentProject.id, { status: newStatus });
  };

  const handleUpdateScenes = (newScenes: StoryboardScene[]) => {
    updateProject(currentProject.id, { scenes: newScenes });
  };

  const handleUpdateAudio = (newAudio: AudioConfig) => {
    updateProject(currentProject.id, { audioConfig: newAudio });
  };

  const handleUpdateVideo = (newVideo: VideoConfig) => {
    updateProject(currentProject.id, { videoConfig: newVideo });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Overview Header */}
      <ProjectOverviewHeader
        project={currentProject}
        onUpdateStatus={handleUpdateStatus}
        onGoToExport={() => setActiveTab('export')}
      />

      {/* Passages Modal Trigger */}
      <div className="flex justify-end">
        <Button
          color="forest"
          size="sm"
          leftSection={<BookOpen size={16} />}
          onClick={() => setPassagesModalOpened(true)}
          className="bg-forest hover:bg-forest-dark"
        >
          Gestionar pasajes bíblicos
        </Button>
      </div>

      {/* Production Stages Tabs */}
      <Tabs 
        value={activeTab} 
        onChange={setActiveTab} 
        color="forest"
        className="bg-transparent"
      >
        <Tabs.List className="bg-white p-1 rounded-xl border border-border-warm flex-wrap sm:flex-nowrap mb-6 shadow-2xs">
          <Tabs.Tab 
            value="passages" 
            leftSection={<BookOpen size={16} className="text-gold" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            1. Pasajes bíblicos
          </Tabs.Tab>

          <Tabs.Tab 
            value="storyboard" 
            leftSection={<Layers size={16} className="text-forest" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            2. Contenido & Storyboard
          </Tabs.Tab>

          <Tabs.Tab 
            value="images" 
            leftSection={<ImageIcon size={16} className="text-gold" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            3. Imágenes IA ({currentProject.scenes.filter(s => s.status === 'completed').length}/{currentProject.scenes.length})
          </Tabs.Tab>

          <Tabs.Tab 
            value="audio" 
            leftSection={<Mic size={16} className="text-forest" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            4. Audio & Locución
          </Tabs.Tab>

          <Tabs.Tab 
            value="video" 
            leftSection={<Film size={16} className="text-gold" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            5. Montaje de Video
          </Tabs.Tab>

          <Tabs.Tab 
            value="export" 
            leftSection={<Download size={16} className="text-forest" />}
            className="font-medium text-xs sm:text-sm py-2.5 px-3 sm:px-4"
          >
            6. Exportación
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab 1: Pasajes Bíblicos */}
        <Tabs.Panel value="passages">
          <TabPassages
            project={currentProject}
            onNextStage={() => setActiveTab('storyboard')}
          />
        </Tabs.Panel>

        {/* Tab 2: Storyboard */}
        <Tabs.Panel value="storyboard">
          <TabContentStoryboard
            project={currentProject}
            onUpdateScenes={handleUpdateScenes}
            onNextStage={() => setActiveTab('images')}
          />
        </Tabs.Panel>

        {/* Tab 3: Imágenes */}
        <Tabs.Panel value="images">
          <TabImages
            project={currentProject}
            onUpdateScenes={handleUpdateScenes}
            onNextStage={() => setActiveTab('audio')}
          />
        </Tabs.Panel>

        {/* Tab 4: Audio */}
        <Tabs.Panel value="audio">
          <TabAudio
            project={currentProject}
            onUpdateAudio={handleUpdateAudio}
            onNextStage={() => setActiveTab('video')}
          />
        </Tabs.Panel>

        {/* Tab 5: Video */}
        <Tabs.Panel value="video">
          <TabVideo
            project={currentProject}
            onUpdateVideo={handleUpdateVideo}
            onNextStage={() => setActiveTab('export')}
          />
        </Tabs.Panel>

        {/* Tab 6: Export */}
        <Tabs.Panel value="export">
          <TabExport project={currentProject} />
        </Tabs.Panel>
      </Tabs>

      <PassagesModal
        opened={passagesModalOpened}
        onClose={() => setPassagesModalOpened(false)}
        project={currentProject}
        onSave={(data) => updateProject(currentProject.id, data)}
      />
    </div>
  );
}
