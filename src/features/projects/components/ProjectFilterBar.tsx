import { TextInput, Select, ActionIcon, Tooltip } from '@mantine/core';
import { Search, LayoutGrid, List, X } from 'lucide-react';

interface ProjectFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  stageFilter: string;
  onStageFilterChange: (value: string) => void;
  sortBy: 'recent' | 'name' | 'progress';
  onSortByChange: (value: 'recent' | 'name' | 'progress') => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (value: 'grid' | 'table') => void;
  totalCount: number;
  filteredCount: number;
}

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Todos los estados' },
  { value: 'ACTIVE', label: 'Activos' },
  { value: 'DRAFT', label: 'Borradores' },
  { value: 'COMPLETED', label: 'Completados' },
  { value: 'PAUSED', label: 'En pausa' },
  { value: 'PUBLISHED', label: 'Publicados' },
  { value: 'ARCHIVED', label: 'Archivados' },
];

const STAGE_OPTIONS = [
  { value: 'ALL', label: 'Todas las etapas' },
  { value: 'BIBLE_SELECTION', label: '1. Selección Bíblica' },
  { value: 'CONTENT_GENERATION', label: '2. Análisis & IA' },
  { value: 'CONTENT_REVIEW', label: '3. Guión & Storyboard' },
  { value: 'IMAGE_PRODUCTION', label: '4. Producción Visual' },
  { value: 'AUDIO_PRODUCTION', label: '5. Audio & Locución' },
  { value: 'VIDEO_PRODUCTION', label: '6. Montaje Video' },
  { value: 'FINAL_REVIEW', label: '7. Revisión Final' },
  { value: 'EXPORT', label: '8. Exportación' },
  { value: 'DONE', label: 'Listo / Completado' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'name', label: 'Nombre (A-Z)' },
  { value: 'progress', label: 'Mayor progreso' },
];

export default function ProjectFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  stageFilter,
  onStageFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}: ProjectFilterBarProps) {
  const hasActiveFilters = search !== '' || statusFilter !== 'ALL' || stageFilter !== 'ALL';

  const clearFilters = () => {
    onSearchChange('');
    onStatusFilterChange('ALL');
    onStageFilterChange('ALL');
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-[#E7E3DB] shadow-sm space-y-3">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search */}
        <div className="flex-1 min-w-[240px]">
          <TextInput
            placeholder="Buscar por nombre, libro o pasaje..."
            leftSection={<Search size={16} className="text-[#8C938E]" />}
            value={search}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
            rightSection={
              search ? (
                <ActionIcon size="xs" variant="subtle" color="gray" onClick={() => onSearchChange('')}>
                  <X size={12} />
                </ActionIcon>
              ) : null
            }
          />
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Select
            placeholder="Estado"
            data={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(val) => onStatusFilterChange(val || 'ALL')}
            className="w-40"
            size="sm"
          />

          <Select
            placeholder="Etapa"
            data={STAGE_OPTIONS}
            value={stageFilter}
            onChange={(val) => onStageFilterChange(val || 'ALL')}
            className="w-48"
            size="sm"
          />

          <Select
            placeholder="Ordenar"
            data={SORT_OPTIONS}
            value={sortBy}
            onChange={(val) => onSortByChange((val as 'recent' | 'name' | 'progress') || 'recent')}
            className="w-36"
            size="sm"
          />

          {/* View Toggle */}
          <div className="border-l border-[#E7E3DB] pl-2 flex items-center gap-1">
            <Tooltip label="Vista en tarjetas">
              <ActionIcon
                variant={viewMode === 'grid' ? 'filled' : 'subtle'}
                color={viewMode === 'grid' ? 'forest' : 'gray'}
                onClick={() => onViewModeChange('grid')}
                size="md"
              >
                <LayoutGrid size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Vista en tabla">
              <ActionIcon
                variant={viewMode === 'table' ? 'filled' : 'subtle'}
                color={viewMode === 'table' ? 'forest' : 'gray'}
                onClick={() => onViewModeChange('table')}
                size="md"
              >
                <List size={16} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Filter summary */}
      <div className="flex items-center justify-between text-xs text-[#555E57] pt-1">
        <span>
          Mostrando <strong className="text-[#263B35]">{filteredCount}</strong> de {totalCount} proyectos
        </span>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[#263B35] hover:text-[#1A2925] font-medium flex items-center gap-1 hover:underline cursor-pointer"
          >
            <X size={12} />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
