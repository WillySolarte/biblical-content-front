import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Button, TextInput, Select, Badge, ActionIcon, Group } from '@mantine/core';
import { BookOpen, Plus, Trash2, Sparkles } from 'lucide-react';
import type { Project } from '../../types/project.types';
import { BIBLE_VERSIONS, BIBLE_BOOKS, SAMPLE_TEXTS_BY_BOOK } from '../../data/mock-bible';
import type { TPassageRangeInput } from '../../schemas/project.schema';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/common/constants/query-keys';
import { getApiBibleVersions } from '../../services/project.service';

interface PassagesModalProps {
  opened: boolean;
  onClose: () => void;
  project: Project;
  onSave: (data: { bibleVersion: string; passages: TPassageRangeInput[] }) => void;
}

interface PassagesFormValues {
  bibleVersion: string;
  passages: TPassageRangeInput[];
}

export default function PassagesModal({ opened, onClose, project, onSave }: PassagesModalProps) {
  const { control, watch, setValue, getValues, reset } = useForm<PassagesFormValues>({
    defaultValues: {
      bibleVersion: project.bibleVersion,
      passages: project.passages,
    },
  });

  const { data, isError, error } = useQuery({
    queryKey: queryKeys.bible.version,
    queryFn: getApiBibleVersions,
    retry: 1
  });
  if (isError) {
    console.error(error)
  }
  console.log(data)

  const selectedPassages = watch('passages');

  // Local state for passage range builder
  const [builderBook, setBuilderBook] = useState<string>('Lucas');
  const [builderChapter, setBuilderChapter] = useState<number>(15);
  const [builderVerseStart, setBuilderVerseStart] = useState<number>(25);
  const [builderVerseEnd, setBuilderVerseEnd] = useState<number>(32);

  useEffect(() => {
    if (opened) {
      reset({
        bibleVersion: project.bibleVersion,
        passages: project.passages,
      });
    }
  }, [opened, project, reset]);

  // Find book details
  const activeBookObj = BIBLE_BOOKS.find(b => b.name === builderBook) || BIBLE_BOOKS[0];
  const maxChapters = activeBookObj.chaptersCount;

  // Add passage range handler
  const handleAddPassageRange = () => {
    if (builderVerseEnd < builderVerseStart) {
      return;
    }

    const newPassage: TPassageRangeInput = {
      id: `pass-${Date.now()}`,
      book: builderBook,
      chapter: builderChapter,
      verseStart: builderVerseStart,
      verseEnd: builderVerseEnd,
      sampleText: SAMPLE_TEXTS_BY_BOOK[builderBook] || 'Texto del pasaje seleccionado preparado para análisis teológico.',
    };

    setValue('passages', [...selectedPassages, newPassage]);

    // Suggest next verse
    setBuilderVerseStart(builderVerseEnd + 1);
    setBuilderVerseEnd(builderVerseEnd + 8);
  };

  // Remove passage range
  const handleRemovePassage = (id: string) => {
    const updated = selectedPassages.filter(p => p.id !== id);
    setValue('passages', updated);
  };

  const handleSave = () => {
    const { bibleVersion, passages } = getValues();
    onSave({ bibleVersion, passages });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      title={
        <div className="flex items-center gap-2 font-editorial font-semibold text-forest">
          <BookOpen size={20} />
          <span>Selección de pasajes bíblicos</span>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <h2 className="font-editorial text-2xl font-semibold text-charcoal">
            Selección de pasajes bíblicos
          </h2>
          <p className="text-sm text-charcoal-muted mt-1">
            Elige la traducción de las Escrituras y agrega uno o varios rangos de versículos consecutivos.
          </p>
        </div>

        {/* Versión Bíblica */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-charcoal block">
            Versión de la Biblia
          </label>
          <Controller
            name="bibleVersion"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {BIBLE_VERSIONS.map((ver) => (
                  <div
                    key={ver.id}
                    onClick={() => field.onChange(ver.code)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${field.value === ver.code
                        ? 'border-forest bg-forest-subtle ring-1 ring-forest'
                        : 'border-border-warm hover:border-gold bg-white'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-forest">{ver.code}</span>
                      <Badge size="xs" variant="light" color="forest">Español</Badge>
                    </div>
                    <p className="font-semibold text-xs text-charcoal mt-1">{ver.name}</p>
                    <p className="text-[11px] text-charcoal-muted mt-1 line-clamp-2 leading-tight">
                      {ver.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        {/* Pasajes seleccionados list */}
        <div className="bg-ivory-light p-5 rounded-xl border border-border-warm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-base font-semibold text-forest flex items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              Pasajes seleccionados ({selectedPassages.length})
            </h3>
          </div>

          {selectedPassages.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-border-warm rounded-lg text-sm text-muted">
              No has agregado ningún pasaje. Utiliza el selector inferior para añadir versículos.
            </div>
          ) : (
            <div className="space-y-2">
              {selectedPassages.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-border-warm shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-forest-subtle text-forest text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-serif font-semibold text-sm text-charcoal">
                        {p.book} {p.chapter}:{p.verseStart}{p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}
                      </span>
                      {p.sampleText && (
                        <p className="text-xs text-charcoal-muted italic line-clamp-1 mt-0.5">
                          "{p.sampleText}"
                        </p>
                      )}
                    </div>
                  </div>

                  <ActionIcon
                    color="red"
                    variant="subtle"
                    size="sm"
                    onClick={() => handleRemovePassage(p.id)}
                    aria-label="Eliminar pasaje"
                  >
                    <Trash2 size={15} />
                  </ActionIcon>
                </div>
              ))}
            </div>
          )}

          {/* Range Builder Form */}
          <div className="pt-3 border-t border-border-warm space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted block">
              Añadir nuevo rango de versículos
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <Select
                label="Libro"
                data={BIBLE_BOOKS.map(b => ({ value: b.name, label: b.name }))}
                value={builderBook}
                onChange={(val) => {
                  if (val) {
                    setBuilderBook(val);
                    setBuilderChapter(1);
                  }
                }}
                size="sm"
              />

              <TextInput
                type="number"
                label={`Capítulo (1-${maxChapters})`}
                value={builderChapter}
                min={1}
                max={maxChapters}
                onChange={(e) => setBuilderChapter(Number(e.currentTarget.value) || 1)}
                size="sm"
              />

              <TextInput
                type="number"
                label="Versículo Inicial"
                value={builderVerseStart}
                min={1}
                onChange={(e) => setBuilderVerseStart(Number(e.currentTarget.value) || 1)}
                size="sm"
              />

              <TextInput
                type="number"
                label="Versículo Final"
                value={builderVerseEnd}
                min={builderVerseStart}
                onChange={(e) => setBuilderVerseEnd(Number(e.currentTarget.value) || builderVerseStart)}
                size="sm"
              />
            </div>

            <Button
              variant="light"
              color="forest"
              size="sm"
              leftSection={<Plus size={14} />}
              onClick={handleAddPassageRange}
              className="w-full sm:w-auto"
            >
              Agregar este rango al proyecto
            </Button>
          </div>
        </div>

        <Group justify="flex-end" mt="xl" className="pt-4 border-t border-border-warm">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            color="forest"
            leftSection={<Sparkles size={16} />}
            onClick={handleSave}
            className="bg-forest hover:bg-forest-dark"
          >
            Guardar pasajes
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
