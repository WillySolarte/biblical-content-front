import { useState } from 'react';
import { Card, Image, Button, Badge, Select, Switch } from '@mantine/core';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Film, 
  ArrowRight
} from 'lucide-react';
import type { Project, VideoConfig } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabVideoProps {
  project: Project;
  onUpdateVideo: (videoConfig: VideoConfig) => void;
  onNextStage?: () => void;
}

export default function TabVideo({ project, onUpdateVideo, onNextStage }: TabVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [config, setConfig] = useState<VideoConfig>(project.videoConfig);

  const currentScene = project.scenes[activeSceneIndex] || project.scenes[0] || {
    title: 'Escena de muestra',
    voiceover: 'No muchos días después, juntándolo todo el hijo menor, se fue lejos a una provincia apartada...',
    imageUrl: project.coverImage || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 8,
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSaveConfig = () => {
    onUpdateVideo(config);
    notifications.show({
      title: 'Configuración de video actualizada',
      message: 'Los parámetros de montaje y subtítulos se han guardado.',
      color: 'forest',
    });
  };

  return (
    <div className="space-y-6">
      {/* Video Monitor Player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Monitor Display */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-charcoal flex items-center justify-center group">
            <Image
              src={currentScene.imageUrl || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80'}
              alt={currentScene.title}
              className="w-full h-full object-cover transition-transform duration-700"
            />

            {/* Subtitles Overlay */}
            {config.subtitlesEnabled && (
              <div className="absolute bottom-12 inset-x-8 text-center pointer-events-none">
                <span className="inline-block px-4 py-1.5 rounded-lg bg-black/75 backdrop-blur-sm text-white font-serif text-sm sm:text-base leading-relaxed max-w-xl shadow-md border border-white/10">
                  {currentScene.voiceover}
                </span>
              </div>
            )}

            {/* Play/Pause Center Overlay Button */}
            <button
              onClick={handleTogglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              <div className="w-16 h-16 rounded-full bg-forest/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </div>
            </button>

            {/* Top metadata tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge color="dark" variant="filled" className="bg-black/60 text-white backdrop-blur-sm">
                Escena {activeSceneIndex + 1} de {project.scenes.length || 1}
              </Badge>
              <Badge color="forest" variant="filled">
                {config.aspectRatio} • {config.resolution}
              </Badge>
            </div>
          </div>

          {/* Timeline & Playback Bar */}
          <div className="bg-white p-4 rounded-xl border border-border-warm shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-dark cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button
                  onClick={() => setActiveSceneIndex(0)}
                  className="text-charcoal-muted hover:text-forest cursor-pointer"
                  title="Reiniciar"
                >
                  <RotateCcw size={16} />
                </button>
                <span className="text-xs font-mono text-charcoal font-semibold">
                  00:08 / {project.scenes.reduce((acc, s) => acc + s.durationSeconds, 0)}s
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="light" color="forest" size="xs">
                  Transición: {config.transitionType}
                </Badge>
              </div>
            </div>

            {/* Scene Track Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
              {project.scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`relative shrink-0 w-24 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    activeSceneIndex === idx
                      ? 'border-forest ring-2 ring-forest/20 scale-102'
                      : 'border-border-warm opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={scene.imageUrl || 'https://placehold.co/120x80/263B35/D6B77A?text=Escena'}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 left-1 text-[9px] bg-black/70 text-white px-1 rounded font-mono">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Settings Panel */}
        <div className="space-y-4">
          <Card radius="xl" p="lg" withBorder className="bg-white border-border-warm space-y-4 shadow-sm">
            <h4 className="font-editorial text-base font-semibold text-charcoal flex items-center gap-2 pb-2 border-b border-border-warm">
              <Film size={16} className="text-forest" />
              Ajustes de Renderizado y Montaje
            </h4>

            <Select
              label="Efecto de transición entre escenas"
              data={[
                { value: 'crossfade', label: 'Disolvencia Cruzada (Crossfade suave)' },
                { value: 'smooth_cut', label: 'Corte Limpio (Directo cinematográfico)' },
                { value: 'cinematic_blur', label: 'Desenfoque Óptico y Luz (Bokeh)' },
              ]}
              value={config.transitionType}
              onChange={(val) => val && setConfig(prev => ({ ...prev, transitionType: val as any }))}
              size="sm"
            />

            <Select
              label="Resolución de salida"
              data={[
                { value: '1080p', label: 'Full HD 1080p (Recomendado para web y redes)' },
                { value: '4K', label: 'Ultra HD 4K (Máxima fidelidad)' },
                { value: '720p', label: 'HD 720p (Rápido y liviano)' },
              ]}
              value={config.resolution}
              onChange={(val) => val && setConfig(prev => ({ ...prev, resolution: val as any }))}
              size="sm"
            />

            <div className="pt-2 border-t border-border-warm space-y-3">
              <Switch
                label="Incrustar subtítulos automáticos"
                description="Subtítulos sincronizados con la locución bíblica"
                checked={config.subtitlesEnabled}
                color="forest"
                onChange={(e) => setConfig(prev => ({ ...prev, subtitlesEnabled: e.currentTarget.checked }))}
              />

              {config.subtitlesEnabled && (
                <Select
                  label="Tipografía de subtítulos"
                  data={[
                    { value: 'Lora Editorial', label: 'Lora Editorial (Estilo literario bíblico)' },
                    { value: 'Inter Modern', label: 'Inter Sans (Minimalista y moderno)' },
                  ]}
                  value={config.subtitleFont}
                  onChange={(val) => val && setConfig(prev => ({ ...prev, subtitleFont: val || 'Lora Editorial' }))}
                  size="xs"
                />
              )}
            </div>

            <Button
              fullWidth
              variant="default"
              size="sm"
              onClick={handleSaveConfig}
            >
              Guardar ajustes
            </Button>
          </Card>

          {onNextStage && (
            <Button
              fullWidth
              size="md"
              color="forest"
              rightSection={<ArrowRight size={16} />}
              onClick={onNextStage}
              className="bg-forest hover:bg-forest-dark"
            >
              Ir a Exportar Video
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
