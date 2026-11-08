import { Badge } from '@mantine/core';
import type { ProductionStage } from '../types/project.types';

interface ProductionStageBadgeProps {
  stage: ProductionStage;
  size?: 'xs' | 'sm' | 'md';
}

export const STAGE_CONFIG: Record<ProductionStage, { label: string; shortLabel: string; color: string; step: number }> = {
  BIBLE_SELECTION: {
    label: 'Selección Bíblica',
    shortLabel: '1. Pasajes',
    color: 'gray',
    step: 1,
  },
  CONTENT_GENERATION: {
    label: 'Generación IA',
    shortLabel: '2. Análisis IA',
    color: 'indigo',
    step: 2,
  },
  CONTENT_REVIEW: {
    label: 'Guión & Storyboard',
    shortLabel: '3. Storyboard',
    color: 'violet',
    step: 3,
  },
  IMAGE_PRODUCTION: {
    label: 'Producción Visual',
    shortLabel: '4. Escenas IA',
    color: 'gold',
    step: 4,
  },
  AUDIO_PRODUCTION: {
    label: 'Audio & Locución',
    shortLabel: '5. Audio',
    color: 'cyan',
    step: 5,
  },
  VIDEO_PRODUCTION: {
    label: 'Montaje de Video',
    shortLabel: '6. Video',
    color: 'orange',
    step: 6,
  },
  FINAL_REVIEW: {
    label: 'Revisión Final',
    shortLabel: '7. Revisión',
    color: 'lime',
    step: 7,
  },
  EXPORT: {
    label: 'Exportación',
    shortLabel: '8. Exportar',
    color: 'teal',
    step: 8,
  },
  DONE: {
    label: 'Finalizado',
    shortLabel: 'Listo',
    color: 'forest',
    step: 9,
  },
};

export default function ProductionStageBadge({ stage, size = 'sm' }: ProductionStageBadgeProps) {
  const config = STAGE_CONFIG[stage] || { label: stage, color: 'gray' };

  return (
    <Badge
      color={config.color}
      variant="light"
      size={size}
      radius="sm"
      className="font-medium"
    >
      {config.label}
    </Badge>
  );
}

