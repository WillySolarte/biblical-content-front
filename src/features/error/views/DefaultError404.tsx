import { Button, Card } from '@mantine/core';
import { BookOpen, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function DefaultError404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <Card radius="2xl" p="xl" withBorder className="bg-white border-[#E7E3DB] max-w-md w-full text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#EDF3F0] text-[#263B35] flex items-center justify-center mx-auto">
          <BookOpen size={28} className="text-[#D6B77A]" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-[#D6B77A] uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#252925]">
            Página no encontrada
          </h1>
          <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
            El pasaje o la sección que buscas no existe o ha sido movida de lugar.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="sm"
            leftSection={<ArrowLeft size={14} />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
          <Button
            color="forest"
            size="sm"
            leftSection={<Home size={14} />}
            onClick={() => navigate(routes.public.home)}
            className="bg-[#263B35]"
          >
            Ir al inicio
          </Button>
        </div>
      </Card>
    </div>
  );
}
