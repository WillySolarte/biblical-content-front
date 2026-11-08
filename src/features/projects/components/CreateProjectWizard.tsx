//React
import { useState } from 'react';

//Libraries
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper, Button, Group, TextInput, Textarea, Select, Card, ActionIcon, Badge} from '@mantine/core';
import { BookOpen, Sparkles, Plus, Trash2, CheckCircle, ArrowRight, ArrowLeft, Tv, Smartphone, Square} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

//My resources

import { CreateProjectSchema, type TCreateProjectInput, type TPassageRangeInput} from '../schemas/project.schema';
import { BIBLE_VERSIONS,  BIBLE_BOOKS,  VISUAL_STYLES, NARRATIVE_TONES,  SAMPLE_TEXTS_BY_BOOK } from '../data/mock-bible';
import { useProjects } from '../hooks/useProjects';
import { getProjectDetailUrl } from '@/common/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/common/constants/query-keys';
import { getApiBibleVersions } from '../services/project.service';

export default function CreateProjectWizard() {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const [activeStep, setActiveStep] = useState(0);

  const { data, isLoading, isError, error} = useQuery({
    queryKey: queryKeys.bible.version,
    queryFn: getApiBibleVersions,
    retry: 1
  });
  if(isError){
    console.error(error)
  }
  console.log(data)
  // Form setup with React Hook Form & Zod
  const { register, handleSubmit, control, watch, setValue, formState: { errors }} = useForm<TCreateProjectInput>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: '',
      description: '',
      bibleVersion: 'RVR1960',
      visualStyle: 'cinematic',
      tone: 'inspirational',
      aspectRatio: '16:9',
      passages: [
        {
          id: 'pass-default-1',
          book: 'Lucas',
          chapter: 15,
          verseStart: 11,
          verseEnd: 24,
          sampleText: SAMPLE_TEXTS_BY_BOOK['Lucas'],
        },
      ],
    },
  });

  const selectedPassages = watch('passages');
  const selectedVersion = watch('bibleVersion');
  const selectedTitle = watch('title');
  const selectedStyle = watch('visualStyle');
  const selectedTone = watch('tone');
  const selectedAspectRatio = watch('aspectRatio');

  // Local state for passage range builder
  const [builderBook, setBuilderBook] = useState<string>('Lucas');
  const [builderChapter, setBuilderChapter] = useState<number>(15);
  const [builderVerseStart, setBuilderVerseStart] = useState<number>(25);
  const [builderVerseEnd, setBuilderVerseEnd] = useState<number>(32);

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

    setValue('passages', [...selectedPassages, newPassage], { shouldValidate: true });

    // Suggest next verse
    setBuilderVerseStart(builderVerseEnd + 1);
    setBuilderVerseEnd(builderVerseEnd + 8);
  };

  // Remove passage range
  const handleRemovePassage = (id: string) => {
    const updated = selectedPassages.filter(p => p.id !== id);
    setValue('passages', updated, { shouldValidate: true });
  };

  const nextStep = () => {
    if (activeStep === 0) {
      if (!selectedTitle || selectedTitle.length < 3) {
        setValue('title', selectedTitle, { shouldValidate: true });
        return;
      }
    }
    if (activeStep === 1) {
      if (!selectedPassages || selectedPassages.length === 0) {
        return;
      }
    }
    setActiveStep((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

  const onSubmit = (data: TCreateProjectInput) => {
    const styleObj = VISUAL_STYLES.find(s => s.value === data.visualStyle);
    const toneObj = NARRATIVE_TONES.find(t => t.value === data.tone);

    const newProject = createProject({
      title: data.title,
      description: data.description || '',
      bibleVersion: data.bibleVersion,
      passages: data.passages,
      visualStyle: styleObj?.label || data.visualStyle,
      tone: toneObj?.label || data.tone,
      audioConfig: {
        voiceId: 'voice-mateo',
        voiceName: 'Mateo (Narrador Solemne & Cálido)',
        speechRate: 1.0,
        musicTrack: 'Cuerdas Celestiales y Laúd Antiguo',
        musicVolume: 35,
        soundEffectsEnabled: true,
      },
      videoConfig: {
        aspectRatio: data.aspectRatio,
        resolution: '1080p',
        fps: 30,
        transitionType: 'crossfade',
        subtitlesEnabled: true,
        subtitleFont: 'Lora Editorial',
      },
      coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    });

    // Navigate directly to the project detail view
    navigate(getProjectDetailUrl(newProject.id));
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm shadow-sm">
        <Stepper active={activeStep} onStepClick={setActiveStep} color="forest" className="mb-8">
          <Stepper.Step label="Identidad" description="Título, formato y estilo" icon={<Sparkles size={16} />}/>
          <Stepper.Step label="Pasajes Bíblicos" description="Versión y escrituras" icon={<BookOpen size={16} />}/>
          
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* STEP 1: IDENTIDAD Y FORMATO */}
          {activeStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-charcoal">
                  Define la identidad de tu proyecto
                </h2>
                <p className="text-sm text-charcoal-muted mt-1">
                  Establece el nombre, propósito y dirección artística de la producción.
                </p>
              </div>

              <div className="space-y-4">
                <TextInput label="Nombre del proyecto" description="Un título evocador para tu video o producción audiovisual" placeholder="Ej: El Hijo Pródigo: La Gracia Incondicional" required size="md"
                  {...register('title')}
                  error={errors.title?.message}
                />

                <Textarea label="Descripción u objetivo del proyecto (opcional)" placeholder="Describe brevemente la intención pedagógica o devocional de este contenido..." rows={3}
                  {...register('description')}
                  error={errors.description?.message}
                />

                {/* Formato / Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium text-charcoal block mb-2">
                    Formato de video principal
                  </label>
                  <Controller
                    name="aspectRatio"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div
                          onClick={() => field.onChange('16:9')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            field.value === '16:9'
                              ? 'border-forest bg-forest-subtle/60 text-forest'
                              : 'border-border-warm hover:border-gold text-charcoal-muted'
                          }`}
                        >
                          <Tv className="w-6 h-6 mb-2 text-forest" />
                          <span className="font-semibold text-sm">Horizontal (16:9)</span>
                          <span className="text-xs text-muted mt-0.5">YouTube, Web, Pantallas</span>
                        </div>

                        <div
                          onClick={() => field.onChange('9:16')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            field.value === '9:16'
                              ? 'border-forest bg-forest-subtle/60 text-forest'
                              : 'border-border-warm hover:border-gold text-charcoal-muted'
                          }`}
                        >
                          <Smartphone className="w-6 h-6 mb-2 text-forest" />
                          <span className="font-semibold text-sm">Vertical (9:16)</span>
                          <span className="text-xs text-muted mt-0.5">Shorts, Reels, TikTok</span>
                        </div>

                        <div
                          onClick={() => field.onChange('1:1')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            field.value === '1:1'
                              ? 'border-forest bg-forest-subtle/60 text-forest'
                              : 'border-border-warm hover:border-gold text-charcoal-muted'
                          }`}
                        >
                          <Square className="w-6 h-6 mb-2 text-forest" />
                          <span className="font-semibold text-sm">Cuadrado (1:1)</span>
                          <span className="text-xs text-muted mt-0.5">Feed redes sociales</span>
                        </div>
                      </div>
                    )}
                  />
                </div>

                
              </div>
            </div>
          )}

          {/* STEP 2: SELECCIÓN BÍBLICA */}
          {activeStep === 1 && (
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
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            field.value === ver.code
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
                  {errors.passages && (
                    <span className="text-xs text-red-600 font-medium">
                      {errors.passages.message}
                    </span>
                  )}
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
            </div>
          )}

          

          {/* Stepper Navigation Buttons */}
          <Group justify="space-between" mt="xl" className="pt-4 border-t border-border-warm">
            <Button
              variant="default"
              onClick={prevStep}
              disabled={activeStep === 0}
              leftSection={<ArrowLeft size={14} />}
            >
              Anterior
            </Button>

            {activeStep < 2 ? (
              <Button
                color="forest"
                onClick={nextStep}
                rightSection={<ArrowRight size={14} />}
              >
                Continuar
              </Button>
            ) : (
              <Button
                type="submit"
                color="forest"
                size="md"
                leftSection={<Sparkles size={16} />}
                className="bg-forest hover:bg-forest-dark"
              >
                Crear proyecto e iniciar estudio
              </Button>
            )}
          </Group>
        </form>
      </Card>
    </div>
  );
}
