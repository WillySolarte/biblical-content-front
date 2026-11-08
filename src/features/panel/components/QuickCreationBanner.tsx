import { Button, Card } from '@mantine/core';
import { Plus, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

interface QuickCreationBannerProps {
  userName?: string;
}

export default function QuickCreationBanner({ userName }: QuickCreationBannerProps) {
  const navigate = useNavigate();

  return (
    <Card 
      radius="2xl" 
      p={{ base: 'lg', sm: 'xl' }} 
      withBorder 
      className="bg-gradient-to-r from-[#263B35] via-[#2F4740] to-[#1F312B] text-white border-0 shadow-md relative overflow-hidden"
    >
      {/* Background aesthetic ornament */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
        <BookOpen className="w-80 h-80 text-[#D6B77A] transform translate-x-16" />
      </div>

      <div className="relative z-10 max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-[#D6B77A] font-medium">
          <Sparkles size={13} />
          <span>Estudio Creativo Audiovisual con Inteligencia Artificial</span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5F0E6] tracking-tight">
          ¡Bienvenido{userName ? `, ${userName}` : ''}!
        </h2>

        <p className="text-sm text-white/80 leading-relaxed font-sans">
          Transforma pasajes y enseñanzas de las Escrituras en producciones audiovisuales con guiones estructurados, storyboards cinematográficos, voces e imágenes creadas con IA.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            size="md"
            color="gold"
            leftSection={<Plus size={16} />}
            onClick={() => navigate(routes.app.createProject)}
            className="bg-[#D6B77A] text-[#1A2925] hover:bg-[#C59F58] font-semibold shadow-sm"
          >
            Crear nuevo proyecto
          </Button>

          <Button
            size="md"
            variant="outline"
            color="gray"
            onClick={() => navigate(routes.app.projects)}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Ver todos mis proyectos
          </Button>
        </div>
      </div>
    </Card>
  );
}

