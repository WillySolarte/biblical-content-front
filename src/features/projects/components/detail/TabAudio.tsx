import { useState } from 'react';
import { Card, Slider, Select, Switch, Button, Badge } from '@mantine/core';
import { Mic, Music, Play, Pause, ArrowRight } from 'lucide-react';
import type { Project, AudioConfig } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabAudioProps {
  project: Project;
  onUpdateAudio: (audioConfig: AudioConfig) => void;
  onNextStage?: () => void;
}

const AI_VOICES = [
  { value: 'voice-mateo', label: 'Mateo — Solemne, Cálido y Reverente (Español Neutro)' },
  { value: 'voice-elena', label: 'Elena — Serena, Contemplativa y Clara (Español Neutro)' },
  { value: 'voice-gabriel', label: 'Gabriel — Joven, Dinámico y Cercano (Español Neutro)' },
  { value: 'voice-sara', label: 'Sara — Dulce y Melódica, Ideal para Niños y Devocionales' },
];

const MUSIC_TRACKS = [
  { value: 'Cuerdas Celestiales y Laúd Antiguo', label: 'Cuerdas Celestiales y Laúd Antiguo (Devocional)' },
  { value: 'Sinfonía Suave del Alba', label: 'Sinfonía Suave del Alba (Reflexivo)' },
  { value: 'Himno Majestuoso del Génesis', label: 'Himno Majestuoso del Génesis (Épico)' },
  { value: 'Brisa de Galilea', label: 'Brisa de Galilea (Acústico Suave)' },
  { value: 'Silencio / Sin música de fondo', label: 'Sin música (Solo voz narrada)' },
];

export default function TabAudio({ project, onUpdateAudio, onNextStage }: TabAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [config, setConfig] = useState<AudioConfig>(project.audioConfig);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    onUpdateAudio(config);
    notifications.show({
      title: 'Configuración de audio guardada',
      message: 'Los ajustes de voz, música y efectos se han sincronizado.',
      color: 'forest',
    });
  };

  return (
    <div className="space-y-6">
      {/* Audio Player Preview Bar */}
      <Card radius="xl" p="xl" withBorder className="bg-ivory-light border-border-warm shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-dark transition-all shadow-md cursor-pointer shrink-0"
              aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg font-bold text-charcoal">
                  Vista previa de la mezcla sonora
                </span>
                <Badge color={isPlaying ? 'teal' : 'gray'} variant="light" size="xs">
                  {isPlaying ? 'Reproduciendo...' : 'En pausa'}
                </Badge>
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Voz: <strong>{config.voiceName}</strong> • Música: <strong>{config.musicTrack}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Button
              size="sm"
              variant="default"
              onClick={handleSave}
            >
              Guardar mezcla
            </Button>

            {onNextStage && (
              <Button
                size="sm"
                color="forest"
                rightSection={<ArrowRight size={14} />}
                onClick={onNextStage}
                className="bg-forest hover:bg-forest-dark"
              >
                Continuar al Montaje de Video
              </Button>
            )}
          </div>
        </div>

        {/* Audio Waveform Simulation */}
        <div className="mt-6 pt-5 border-t border-border-warm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>00:14</span>
            <span className="font-mono text-forest">
              Duración total: {project.scenes.reduce((acc, s) => acc + s.durationSeconds, 0)}s
            </span>
          </div>

          {/* Visual Waveform bars */}
          <div className="h-12 bg-white rounded-lg border border-border-warm flex items-center px-4 gap-1 overflow-hidden">
            {Array.from({ length: 48 }).map((_, i) => {
              const height = [40, 60, 85, 30, 95, 70, 50, 30, 65, 80, 45, 90, 75, 40, 60, 85][i % 16];
              const isPast = i < 14;
              return (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`w-full rounded-full transition-all duration-300 ${
                    isPast
                      ? 'bg-forest'
                      : 'bg-border-warm'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </Card>

      {/* Audio Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: AI Voice Settings */}
        <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
            <Mic size={18} className="text-forest" />
            <h4 className="font-editorial text-base font-semibold text-charcoal">
              Narrador de Inteligencia Artificial
            </h4>
          </div>

          <div className="space-y-4">
            <Select
              label="Seleccionar voz bíblica"
              description="Perfiles entrenados para lecturas solemnes y devocionales"
              data={AI_VOICES}
              value={config.voiceId}
              onChange={(val) => {
                const found = AI_VOICES.find(v => v.value === val);
                if (found) {
                  setConfig(prev => ({
                    ...prev,
                    voiceId: found.value,
                    voiceName: found.label.split(' — ')[0],
                  }));
                }
              }}
              size="sm"
            />

            <div>
              <div className="flex justify-between text-xs font-medium text-charcoal mb-2">
                <span>Velocidad de locución</span>
                <span className="text-forest font-bold">{config.speechRate}x</span>
              </div>
              <Slider
                value={config.speechRate}
                min={0.8}
                max={1.3}
                step={0.05}
                color="forest"
                marks={[
                  { value: 0.8, label: '0.8x' },
                  { value: 1.0, label: '1.0x (Normal)' },
                  { value: 1.2, label: '1.2x' },
                ]}
                onChange={(val) => setConfig(prev => ({ ...prev, speechRate: val }))}
              />
            </div>
          </div>
        </Card>

        {/* Right: Music & Sound FX */}
        <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
            <Music size={18} className="text-forest" />
            <h4 className="font-editorial text-base font-semibold text-charcoal">
              Banda Sonora & Efectos
            </h4>
          </div>

          <div className="space-y-4">
            <Select
              label="Pista musical de acompañamiento"
              description="Composiciones instrumentales libres de derechos"
              data={MUSIC_TRACKS}
              value={config.musicTrack}
              onChange={(val) => val && setConfig(prev => ({ ...prev, musicTrack: val }))}
              size="sm"
            />

            <div>
              <div className="flex justify-between text-xs font-medium text-charcoal mb-2">
                <span>Volumen de la música</span>
                <span className="text-forest font-bold">{config.musicVolume}%</span>
              </div>
              <Slider
                value={config.musicVolume}
                min={0}
                max={100}
                step={5}
                color="forest"
                marks={[
                  { value: 0, label: 'Silencio' },
                  { value: 35, label: 'Recomendado (35%)' },
                  { value: 100, label: '100%' },
                ]}
                onChange={(val) => setConfig(prev => ({ ...prev, musicVolume: val }))}
              />
            </div>

            <div className="pt-2">
              <Switch
                label="Efectos ambientales inmersivos (Foley bíblico)"
                description="Sonidos sutiles de viento, agua, pasos en arena y murmullos acordes a cada escena"
                checked={config.soundEffectsEnabled}
                color="forest"
                onChange={(e) => setConfig(prev => ({ ...prev, soundEffectsEnabled: e.currentTarget.checked }))}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
