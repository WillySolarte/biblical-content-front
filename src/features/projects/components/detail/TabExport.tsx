import { useState } from 'react';
import { Card, Button, Progress, Modal } from '@mantine/core';
import { Download, CheckCircle2, Film, Sparkles, Share2, Check } from 'lucide-react';
import type { Project } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabExportProps {
  project: Project;
}

export default function TabExport({ project }: TabExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStageText, setExportStageText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleStartExport = () => {
    setIsExporting(true);
    setIsDone(false);
    setExportProgress(10);
    setExportStageText('Compilando imágenes en alta resolución...');

    setTimeout(() => {
      setExportProgress(35);
      setExportStageText('Sincronizando pista de locución y banda sonora...');
    }, 800);

    setTimeout(() => {
      setExportProgress(70);
      setExportStageText('Aplicando transiciones visuales y subtítulos en Lora...');
    }, 1600);

    setTimeout(() => {
      setExportProgress(95);
      setExportStageText('Codificando contenedor MP4 (H.264)...');
    }, 2400);

    setTimeout(() => {
      setExportProgress(100);
      setExportStageText('¡Video exportado con éxito!');
      setIsExporting(false);
      setIsDone(true);

      notifications.show({
        title: 'Video exportado',
        message: `El video de "${project.title}" está listo para descargar.`,
        color: 'forest',
      });
    }, 3200);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://bibliastudio.app/v/${project.id}`);
    setCopiedLink(true);
    notifications.show({
      title: 'Enlace copiado',
      message: 'Enlace de visualización pública copiado al portapapeles.',
      color: 'forest',
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    notifications.show({
      title: 'Descarga iniciada',
      message: 'Descargando archivo biblia_studio_video.mp4...',
      color: 'teal',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card radius="xl" p="xl" withBorder className="bg-white border-[#E7E3DB] shadow-sm space-y-6">
        <div>
          <h3 className="font-editorial text-2xl font-semibold text-[#252925] flex items-center gap-2">
            <Download size={22} className="text-[#263B35]" />
            Exportación y Entrega Final
          </h3>
          <p className="text-sm text-[#555E57] mt-1">
            Configura los parámetros de codificación para generar el archivo audiovisual final.
          </p>
        </div>

        {/* Project Summary Box */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E3DB] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#8C938E] block uppercase">Escenas</span>
            <strong className="text-sm text-[#263B35]">{project.scenes.length} escenas</strong>
          </div>
          <div>
            <span className="text-[#8C938E] block uppercase">Duración</span>
            <strong className="text-sm text-[#263B35]">
              {project.scenes.reduce((acc, s) => acc + s.durationSeconds, 0)} segundos
            </strong>
          </div>
          <div>
            <span className="text-[#8C938E] block uppercase">Formato</span>
            <strong className="text-sm text-[#263B35]">{project.videoConfig.aspectRatio}</strong>
          </div>
          <div>
            <span className="text-[#8C938E] block uppercase">Resolución</span>
            <strong className="text-sm text-[#263B35]">{project.videoConfig.resolution}</strong>
          </div>
        </div>

        {/* Export Settings */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#252925] block">
            Formato de codificación
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border-2 border-[#263B35] bg-[#EDF3F0] text-[#263B35] cursor-pointer">
              <span className="font-bold text-sm block">MP4 (H.264)</span>
              <span className="text-xs text-[#555E57]">Máxima compatibilidad web, móvil y televisores</span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E7E3DB] text-[#555E57] opacity-60">
              <span className="font-bold text-sm block">ProRes 422</span>
              <span className="text-xs text-[#8C938E]">Para edición posterior (Próximamente)</span>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E7E3DB] text-[#555E57] opacity-60">
              <span className="font-bold text-sm block">Solo Audio (MP3/WAV)</span>
              <span className="text-xs text-[#8C938E]">Para podcasts devocionales</span>
            </div>
          </div>
        </div>

        {/* Action Button or Success State */}
        {isDone ? (
          <div className="p-6 rounded-2xl bg-[#EDF3F0] border border-[#263B35]/30 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#263B35] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h4 className="font-editorial text-xl font-bold text-[#263B35]">
                ¡Video renderizado y listo!
              </h4>
              <p className="text-xs text-[#555E57] mt-1">
                El archivo MP4 en resolución {project.videoConfig.resolution} ({project.videoConfig.aspectRatio}) está preparado.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                color="forest"
                size="md"
                leftSection={<Download size={16} />}
                onClick={handleDownload}
                className="bg-[#263B35] hover:bg-[#1A2925]"
              >
                Descargar video final (MP4)
              </Button>

              <Button
                variant="default"
                size="md"
                leftSection={copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                onClick={handleCopyShareLink}
              >
                {copiedLink ? 'Enlace copiado' : 'Compartir enlace público'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              color="forest"
              size="lg"
              fullWidth
              leftSection={<Film size={18} />}
              onClick={handleStartExport}
              loading={isExporting}
              className="bg-[#263B35] hover:bg-[#1A2925]"
            >
              Iniciar exportación de video
            </Button>
          </div>
        )}
      </Card>

      {/* Export Progress Modal */}
      <Modal
        opened={isExporting}
        onClose={() => {}}
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
        radius="lg"
      >
        <div className="p-4 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EDF3F0] text-[#263B35] flex items-center justify-center mx-auto animate-pulse">
            <Sparkles size={24} />
          </div>

          <div>
            <h4 className="font-editorial text-lg font-bold text-[#252925]">
              Renderizando proyecto audiovisual
            </h4>
            <p className="text-xs text-[#555E57] mt-1 font-mono">
              {exportStageText}
            </p>
          </div>

          <Progress value={exportProgress} color="forest" size="md" radius="xl" striped animated />

          <span className="text-xs text-[#8C938E] block">
            {exportProgress}% completado
          </span>
        </div>
      </Modal>
    </div>
  );
}
