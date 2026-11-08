import { Button, Card } from '@mantine/core';
import { BookOpen, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function DefaultError404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory-light flex items-center justify-center p-4">
      <Card radius="2xl" p="xl" withBorder className="bg-white border-border-warm max-w-md w-full text-center space-y-5 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-forest-subtle text-forest flex items-center justify-center mx-auto">
          <BookOpen size={28} className="text-gold" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
            Página no encontrada
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
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
            className="bg-forest"
          >
            Ir al inicio
          </Button>
        </div>
      </Card>
    </div>
  );
}
