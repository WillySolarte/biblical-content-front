import { useState } from 'react';
import { 
  Card, 
  Badge, 
  Button, 
  ActionIcon, 
  Modal, 
  TextInput, 
  Textarea, 
  Group, 
  Tooltip 
} from '@mantine/core';
import { 
  Sparkles, 
  Edit3, 
  Plus, 
  Trash2, 
  Clock, 
  Camera, 
  Mic, 
  RefreshCw, 
  Layers,
  ArrowRight
} from 'lucide-react';
import type { Project, StoryboardScene } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabContentStoryboardProps {
  project: Project;
  onUpdateScenes: (scenes: StoryboardScene[]) => void;
  onNextStage?: () => void;
}

export default function TabContentStoryboard({ project, onUpdateScenes, onNextStage }: TabContentStoryboardProps) {
  const [editingScene, setEditingScene] = useState<StoryboardScene | null>(null);
  const [isAiRegenerating, setIsAiRegenerating] = useState(false);

  // Edit form state
  const [formTitle, setFormTitle] = useState('');
  const [formVoiceover, setFormVoiceover] = useState('');
  const [formVisualPrompt, setFormVisualPrompt] = useState('');
  const [formShotType, setFormShotType] = useState('');
  const [formDuration, setFormDuration] = useState(8);

  const openEditModal = (scene: StoryboardScene) => {
    setEditingScene(scene);
    setFormTitle(scene.title);
    setFormVoiceover(scene.voiceover);
    setFormVisualPrompt(scene.visualPrompt);
    setFormShotType(scene.shotType);
    setFormDuration(scene.durationSeconds);
  };

  const handleSaveScene = () => {
    if (!editingScene) return;

    const updated = project.scenes.map(s => {
      if (s.id === editingScene.id) {
        return {
          ...s,
          title: formTitle,
          voiceover: formVoiceover,
          visualPrompt: formVisualPrompt,
          shotType: formShotType,
          durationSeconds: formDuration,
        };
      }
      return s;
    });

    onUpdateScenes(updated);
    setEditingScene(null);
    notifications.show({
      title: 'Escena actualizada',
      message: `La escena "${formTitle}" ha sido guardada.`,
      color: 'forest',
    });
  };

  const handleAddScene = () => {
    const newSceneNumber = project.scenes.length + 1;
    const newScene: StoryboardScene = {
      id: `sc-custom-${Date.now()}`,
      sceneNumber: newSceneNumber,
      title: `Escena ${newSceneNumber}: Nueva transición`,
      voiceover: 'Texto de la locución que acompañará esta escena bíblica...',
      visualPrompt: 'Detailed atmospheric biblical setting, dramatic lighting, cinematic composition.',
      shotType: 'Plano medio (Medium Shot)',
      durationSeconds: 8,
      status: 'pending',
    };

    onUpdateScenes([...project.scenes, newScene]);
    notifications.show({
      title: 'Nueva escena añadida',
      message: `Escena ${newSceneNumber} lista para configurar.`,
      color: 'forest',
    });
  };

  const handleDeleteScene = (id: string) => {
    const updated = project.scenes
      .filter(s => s.id !== id)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));

    onUpdateScenes(updated);
  };

  const handleSimulateAiRegeneration = () => {
    setIsAiRegenerating(true);
    setTimeout(() => {
      setIsAiRegenerating(false);
      notifications.show({
        title: 'Análisis de IA actualizado',
        message: 'Se han optimizado los arcos dramáticos y las descripciones visuales.',
        color: 'forest',
      });
    }, 1200);
  };

  const context = project.biblicalContext || {
    author: 'Lucas el evangelista',
    historicalPeriod: 'Siglo I d.C.',
    coreTheologicalMessage: 'La infinita misericordia del Padre hacia el ser humano reconciliado.',
    keyThemes: ['Gracia', 'Reconciliación', 'Perdón'],
    audience: 'Multitud de oyentes galileos y discípulos.',
  };

  return (
    <div className="space-y-6">
      {/* AI Context Proposal Card */}
      <Card radius="xl" p="xl" withBorder className="bg-gradient-to-br from-[#263B35] to-[#1A2925] text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#D6B77A]" />
              <span className="text-xs uppercase tracking-wider text-[#D6B77A] font-bold">
                Análisis Teológico & Narrativo por IA
              </span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#F5F0E6]">
              Propuesta Editorial del Guión
            </h3>
          </div>

          <Button
            size="xs"
            variant="light"
            color="gold"
            leftSection={<RefreshCw size={14} className={isAiRegenerating ? 'animate-spin' : ''} />}
            onClick={handleSimulateAiRegeneration}
            loading={isAiRegenerating}
            className="bg-[#D6B77A]/20 text-[#D6B77A] hover:bg-[#D6B77A]/30 border border-[#D6B77A]/30"
          >
            Reanalizar con IA
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-[#D6B77A] font-semibold block uppercase">Mensaje Central</span>
            <p className="text-white/90 text-xs leading-relaxed font-serif">
              "{context.coreTheologicalMessage}"
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#D6B77A] font-semibold block uppercase">Contexto Histórico & Autor</span>
            <p className="text-white/80 text-xs leading-relaxed">
              {context.author} • {context.historicalPeriod}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#D6B77A] font-semibold block uppercase">Ejes Temáticos</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {context.keyThemes.map((theme, i) => (
                <Badge key={i} size="xs" variant="filled" color="dark" className="bg-white/15 text-white">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Storyboard Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E7E3DB]">
        <div>
          <h3 className="font-editorial text-lg font-semibold text-[#252925] flex items-center gap-2">
            <Layers size={18} className="text-[#263B35]" />
            Storyboard & Guión Audiovisual ({project.scenes.length} escenas)
          </h3>
          <p className="text-xs text-[#555E57]">
            Duración estimada total:{' '}
            <strong className="text-[#263B35]">
              {project.scenes.reduce((acc, s) => acc + s.durationSeconds, 0)} segundos
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="default"
            leftSection={<Plus size={14} />}
            onClick={handleAddScene}
          >
            Añadir escena
          </Button>

          {onNextStage && (
            <Button
              size="xs"
              color="forest"
              rightSection={<ArrowRight size={14} />}
              onClick={onNextStage}
            >
              Ir a Generar Imágenes
            </Button>
          )}
        </div>
      </div>

      {/* Storyboard Scenes List */}
      <div className="space-y-4">
        {project.scenes.map((scene) => (
          <Card 
            key={scene.id} 
            radius="xl" 
            p="lg" 
            withBorder 
            className="bg-white border-[#E7E3DB] hover:border-[#D6B77A] transition-all shadow-sm"
          >
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              {/* Scene Number & Badge */}
              <div className="flex lg:flex-col items-center justify-between w-full lg:w-28 shrink-0 pb-3 lg:pb-0 lg:border-r border-[#E7E3DB] pr-4">
                <div className="flex items-center lg:flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF3F0] text-[#263B35] font-bold text-base flex items-center justify-center font-editorial">
                    #{scene.sceneNumber}
                  </div>
                  <Badge 
                    size="xs" 
                    color={scene.status === 'completed' ? 'teal' : scene.status === 'generating' ? 'yellow' : 'gray'}
                    variant="light"
                  >
                    {scene.status === 'completed' ? 'Lista' : scene.status === 'generating' ? 'Generando' : 'Pendiente'}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#555E57] lg:mt-3">
                  <Clock size={12} />
                  <span>{scene.durationSeconds}s</span>
                </div>
              </div>

              {/* Scene Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-editorial text-lg font-semibold text-[#252925]">
                    {scene.title}
                  </h4>

                  <div className="flex items-center gap-1">
                    <Tooltip label="Editar escena">
                      <ActionIcon 
                        variant="subtle" 
                        color="gray" 
                        size="sm"
                        onClick={() => openEditModal(scene)}
                      >
                        <Edit3 size={15} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Eliminar escena">
                      <ActionIcon 
                        variant="subtle" 
                        color="red" 
                        size="sm"
                        onClick={() => handleDeleteScene(scene.id)}
                      >
                        <Trash2 size={15} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                </div>

                {/* Voiceover Script */}
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E7E3DB] space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#263B35] flex items-center gap-1.5">
                    <Mic size={13} className="text-[#D6B77A]" />
                    Guión / Locución en Off
                  </span>
                  <p className="font-serif text-sm text-[#252925] italic leading-relaxed">
                    "{scene.voiceover}"
                  </p>
                </div>

                {/* Visual Prompt for IA */}
                <div className="p-3 bg-white rounded-lg border border-[#E7E3DB] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#555E57] flex items-center gap-1">
                      <Camera size={13} className="text-[#263B35]" />
                      Prompt Visual para Imagen IA:
                    </span>
                    <Badge size="xs" variant="outline" color="dark">{scene.shotType}</Badge>
                  </div>
                  <p className="text-[#555E57] font-mono text-[11px] leading-relaxed bg-[#FAF8F5] p-2 rounded">
                    {scene.visualPrompt}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Scene Modal */}
      <Modal
        opened={!!editingScene}
        onClose={() => setEditingScene(null)}
        title={
          <span className="font-editorial text-lg font-bold text-[#252925]">
            Editar Escena #{editingScene?.sceneNumber}
          </span>
        }
        size="lg"
        radius="lg"
      >
        <div className="space-y-4">
          <TextInput
            label="Título de la escena"
            value={formTitle}
            onChange={(e) => setFormTitle(e.currentTarget.value)}
          />

          <Textarea
            label="Texto del guión / narración"
            description="Lo que pronunciará la voz en off de esta escena"
            value={formVoiceover}
            rows={3}
            onChange={(e) => setFormVoiceover(e.currentTarget.value)}
          />

          <Textarea
            label="Prompt visual (instrucción para la IA)"
            description="Detalles de ambientación, vestuario, iluminación y composición"
            value={formVisualPrompt}
            rows={3}
            onChange={(e) => setFormVisualPrompt(e.currentTarget.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Tipo de plano fotográfico"
              value={formShotType}
              onChange={(e) => setFormShotType(e.currentTarget.value)}
            />
            <TextInput
              type="number"
              label="Duración (segundos)"
              value={formDuration}
              min={3}
              max={60}
              onChange={(e) => setFormDuration(Number(e.currentTarget.value) || 5)}
            />
          </div>

          <Group justify="flex-end" mt="lg">
            <Button variant="default" onClick={() => setEditingScene(null)}>
              Cancelar
            </Button>
            <Button color="forest" onClick={handleSaveScene}>
              Guardar cambios
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
}
