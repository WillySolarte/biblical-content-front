import { useState } from 'react';
import { Card, Image, Button, Badge } from '@mantine/core';
import { Sparkles, RefreshCw, Image as ImageIcon, ArrowRight, Wand2 } from 'lucide-react';
import type { Project, StoryboardScene } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabImagesProps {
  project: Project;
  onUpdateScenes: (scenes: StoryboardScene[]) => void;
  onNextStage?: () => void;
}

export default function TabImages({ project, onUpdateScenes, onNextStage }: TabImagesProps) {
  const [generatingSceneId, setGeneratingSceneId] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Record<string, number>>({});

  const handleSimulateGenerate = (sceneId: string) => {
    setGeneratingSceneId(sceneId);

    setTimeout(() => {
      const fallbackImages = [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80',
      ];
      const randomImg = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

      const updated = project.scenes.map(s => {
        if (s.id === sceneId) {
          return {
            ...s,
            imageUrl: randomImg,
            status: 'completed' as const,
          };
        }
        return s;
      });

      onUpdateScenes(updated);
      setGeneratingSceneId(null);

      notifications.show({
        title: 'Imagen generada con éxito',
        message: 'La escena ha sido renderizada con el motor de IA artística.',
        color: 'forest',
      });
    }, 1500);
  };

  const handleGenerateAll = () => {
    setGeneratingSceneId('ALL');
    setTimeout(() => {
      const updated = project.scenes.map((s) => ({
        ...s,
        imageUrl: s.imageUrl || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80',
        status: 'completed' as const,
      }));
      onUpdateScenes(updated);
      setGeneratingSceneId(null);
      notifications.show({
        title: 'Generación completa',
        message: 'Todas las escenas del storyboard tienen ahora su imagen visual.',
        color: 'forest',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Batch Generation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E7E3DB] shadow-sm">
        <div>
          <h3 className="font-editorial text-lg font-semibold text-[#252925] flex items-center gap-2">
            <ImageIcon size={18} className="text-[#263B35]" />
            Galería de Imágenes Escénicas
          </h3>
          <p className="text-xs text-[#555E57]">
            Estilo activo: <strong className="text-[#263B35]">{project.visualStyle}</strong> • Proporción: <strong>{project.videoConfig.aspectRatio}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="light"
            color="forest"
            leftSection={<Wand2 size={14} className={generatingSceneId === 'ALL' ? 'animate-spin' : ''} />}
            onClick={handleGenerateAll}
            loading={generatingSceneId === 'ALL'}
          >
            Generar todas las escenas
          </Button>

          {onNextStage && (
            <Button
              size="sm"
              color="forest"
              rightSection={<ArrowRight size={14} />}
              onClick={onNextStage}
              className="bg-[#263B35] hover:bg-[#1A2925]"
            >
              Continuar al Audio
            </Button>
          )}
        </div>
      </div>

      {/* Grid of Scene Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.scenes.map((scene) => {
          const isGeneratingThis = generatingSceneId === scene.id || generatingSceneId === 'ALL';
          const currentVar = selectedVariation[scene.id] || 1;

          return (
            <Card 
              key={scene.id} 
              radius="xl" 
              p="md" 
              withBorder 
              className="bg-white border-[#E7E3DB] flex flex-col justify-between shadow-sm hover:border-[#D6B77A] transition-all"
            >
              <div>
                {/* Image Canvas */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#F5F0E6] mb-3 border border-[#E7E3DB]">
                  {isGeneratingThis ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#FAF8F5]">
                      <RefreshCw size={24} className="text-[#263B35] animate-spin mb-2" />
                      <span className="text-xs font-semibold text-[#263B35]">
                        Renderizando imagen con IA...
                      </span>
                      <span className="text-[10px] text-[#8C938E] mt-1">
                        Aplicando iluminación bíblica y estilo {project.visualStyle.split(' ')[0]}
                      </span>
                    </div>
                  ) : scene.imageUrl ? (
                    <>
                      <Image
                        src={scene.imageUrl}
                        alt={scene.title}
                        className="w-full h-full object-cover"
                        fallbackSrc="https://placehold.co/600x400/263B35/D6B77A?text=Escena+Bíblica"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge size="xs" color="forest" variant="filled">
                          {project.videoConfig.aspectRatio}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#8C938E]">
                      <ImageIcon size={32} className="mb-2 opacity-40 text-[#263B35]" />
                      <span className="text-xs font-medium text-[#555E57]">
                        Sin imagen generada aún
                      </span>
                      <span className="text-[10px] text-[#8C938E] mt-0.5">
                        Haz clic en generar para crear la imagen
                      </span>
                    </div>
                  )}
                </div>

                {/* Scene Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#263B35] uppercase tracking-wider">
                      Escena #{scene.sceneNumber}
                    </span>
                    <Badge size="xs" variant="outline" color="dark">
                      {scene.shotType.split(' ')[0]}
                    </Badge>
                  </div>

                  <h4 className="font-editorial text-base font-semibold text-[#252925] line-clamp-1">
                    {scene.title}
                  </h4>

                  <p className="text-xs text-[#555E57] italic line-clamp-2 leading-relaxed bg-[#FAF8F5] p-2 rounded border border-[#E7E3DB]">
                    "{scene.voiceover}"
                  </p>
                </div>
              </div>

              {/* Variations & Regeneration */}
              <div className="pt-3 mt-3 border-t border-[#E7E3DB] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8C938E]">Variaciones:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariation(prev => ({ ...prev, [scene.id]: v }))}
                        className={`w-5 h-5 text-[10px] rounded font-semibold transition-colors cursor-pointer ${
                          currentVar === v
                            ? 'bg-[#263B35] text-white'
                            : 'bg-[#FAF8F5] text-[#555E57] hover:bg-[#E7E3DB]'
                        }`}
                      >
                        v{v}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  size="xs"
                  variant={scene.imageUrl ? 'default' : 'filled'}
                  color="forest"
                  fullWidth
                  leftSection={<Sparkles size={13} className={isGeneratingThis ? 'animate-spin' : ''} />}
                  onClick={() => handleSimulateGenerate(scene.id)}
                  loading={isGeneratingThis}
                >
                  {scene.imageUrl ? 'Regenerar variación' : 'Generar imagen con IA'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
