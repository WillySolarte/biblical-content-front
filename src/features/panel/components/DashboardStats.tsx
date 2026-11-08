import { Card, SimpleGrid } from '@mantine/core';
import { Layers, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    inProgress: number;
    draft: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      label: 'Proyectos Activos',
      value: stats.active,
      description: 'En fases de guión, imagen y audio',
      icon: PlayCircle,
      accentColor: 'text-forest',
      bgAccent: 'bg-forest-subtle',
    },
    {
      label: 'En Proceso / Borrador',
      value: stats.inProgress,
      description: 'Alineación de pasajes y preproducción',
      icon: Clock,
      accentColor: 'text-amber-700',
      bgAccent: 'bg-amber-50',
    },
    {
      label: 'Proyectos Completados',
      value: stats.completed,
      description: 'Listos para exportar y publicar',
      icon: CheckCircle2,
      accentColor: 'text-emerald-700',
      bgAccent: 'bg-emerald-50',
    },
    {
      label: 'Total de Producciones',
      value: stats.total,
      description: 'Historias bíblicas creadas en tu estudio',
      icon: Layers,
      accentColor: 'text-gold-strong',
      bgAccent: 'bg-cream',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {statCards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card 
            key={idx} 
            radius="xl" 
            p="lg" 
            withBorder 
            className="bg-white border-border-warm shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-muted">
                {item.label}
              </span>
              <div className={`w-9 h-9 rounded-xl ${item.bgAccent} ${item.accentColor} flex items-center justify-center`}>
                <Icon size={18} />
              </div>
            </div>

            <div className="mt-4">
              <span className="font-editorial text-3xl font-bold text-charcoal">
                {item.value}
              </span>
              <p className="text-[11px] text-muted mt-1 line-clamp-1">
                {item.description}
              </p>
            </div>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
