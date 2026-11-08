import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Stepper, 
  Button, 
  Group, 
  TextInput, 
  Textarea, 
  Select, 
  Card, 
  ActionIcon, 
  Badge,
} from '@mantine/core';
import { 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Tv,
  Smartphone,
  Square
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  CreateProjectSchema, 
  type TCreateProjectInput, 
  type TPassageRangeInput 
} from '../schemas/project.schema';
import { 
  BIBLE_VERSIONS, 
  BIBLE_BOOKS, 
  VISUAL_STYLES, 
  NARRATIVE_TONES, 
  SAMPLE_TEXTS_BY_BOOK 
} from '../data/mock-bible';
import { useProjects } from '../hooks/useProjects';
import { getProjectDetailUrl } from '@/common/constants/routes';

export default function CreateProjectWizard() {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const [activeStep, setActiveStep] = useState(0);

  // Form setup with React Hook Form & Zod
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TCreateProjectInput>({
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
      <Card radius="xl" p="xl" withBorder className="bg-white border-[#E7E3DB] shadow-sm">
        <Stepper 
          active={activeStep} 
          onStepClick={setActiveStep} 
          color="forest"
          className="mb-8"
        >
          <Stepper.Step 
            label="Identidad" 
            description="Título, formato y estilo" 
            icon={<Sparkles size={16} />}
          />
          <Stepper.Step 
            label="Pasajes Bíblicos" 
            description="Versión y escrituras" 
            icon={<BookOpen size={16} />}
          />
          <Stepper.Step 
            label="Revisión" 
            description="Confirmación y creación" 
            icon={<CheckCircle size={16} />}
          />
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* STEP 1: IDENTIDAD Y FORMATO */}
          {activeStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-[#252925]">
                  Define la identidad de tu proyecto
                </h2>
                <p className="text-sm text-[#555E57] mt-1">
                  Establece el nombre, propósito y dirección artística de la producción.
                </p>
              </div>

              <div className="space-y-4">
                <TextInput
                  label="Nombre del proyecto"
                  description="Un título evocador para tu video o producción audiovisual"
                  placeholder="Ej: El Hijo Pródigo: La Gracia Incondicional"
                  required
                  size="md"
                  {...register('title')}
                  error={errors.title?.message}
                />

                <Textarea
                  label="Descripción u objetivo del proyecto (opcional)"
                  placeholder="Describe brevemente la intención pedagógica o devocional de este contenido..."
                  rows={3}
                  {...register('description')}
                  error={errors.description?.message}
                />

                {/* Formato / Aspect Ratio */}
                <div>
                  <label className="text-sm font-medium text-[#252925] block mb-2">
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
                              ? 'border-[#263B35] bg-[#EDF3F0]/60 text-[#263B35]'
                              : 'border-[#E7E3DB] hover:border-[#D6B77A] text-[#555E57]'
                          }`}
                        >
                          <Tv className="w-6 h-6 mb-2 text-[#263B35]" />
                          <span className="font-semibold text-sm">Horizontal (16:9)</span>
                          <span className="text-xs text-[#8C938E] mt-0.5">YouTube, Web, Pantallas</span>
                        </div>

                        <div
                          onClick={() => field.onChange('9:16')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            field.value === '9:16'
                              ? 'border-[#263B35] bg-[#EDF3F0]/60 text-[#263B35]'
                              : 'border-[#E7E3DB] hover:border-[#D6B77A] text-[#555E57]'
                          }`}
                        >
                          <Smartphone className="w-6 h-6 mb-2 text-[#263B35]" />
                          <span className="font-semibold text-sm">Vertical (9:16)</span>
                          <span className="text-xs text-[#8C938E] mt-0.5">Shorts, Reels, TikTok</span>
                        </div>

                        <div
                          onClick={() => field.onChange('1:1')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            field.value === '1:1'
                              ? 'border-[#263B35] bg-[#EDF3F0]/60 text-[#263B35]'
                              : 'border-[#E7E3DB] hover:border-[#D6B77A] text-[#555E57]'
                          }`}
                        >
                          <Square className="w-6 h-6 mb-2 text-[#263B35]" />
                          <span className="font-semibold text-sm">Cuadrado (1:1)</span>
                          <span className="text-xs text-[#8C938E] mt-0.5">Feed redes sociales</span>
                        </div>
                      </div>
                    )}
                  />
                </div>

                {/* Estilo visual & Tono narrativo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="visualStyle"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Estilo visual de imágenes"
                        data={VISUAL_STYLES}
                        value={field.value}
                        onChange={(val) => field.onChange(val || 'cinematic')}
                        size="sm"
                      />
                    )}
                  />

                  <Controller
                    name="tone"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Tono narrativo & musical"
                        data={NARRATIVE_TONES}
                        value={field.value}
                        onChange={(val) => field.onChange(val || 'inspirational')}
                        size="sm"
                      />
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
                <h2 className="font-editorial text-2xl font-semibold text-[#252925]">
                  Selección de pasajes bíblicos
                </h2>
                <p className="text-sm text-[#555E57] mt-1">
                  Elige la traducción de las Escrituras y agrega uno o varios rangos de versículos consecutivos.
                </p>
              </div>

              {/* Versión Bíblica */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#252925] block">
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
                              ? 'border-[#263B35] bg-[#EDF3F0] ring-1 ring-[#263B35]'
                              : 'border-[#E7E3DB] hover:border-[#D6B77A] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-[#263B35]">{ver.code}</span>
                            <Badge size="xs" variant="light" color="forest">{ver.language}</Badge>
                          </div>
                          <p className="font-semibold text-xs text-[#252925] mt-1">{ver.name}</p>
                          <p className="text-[11px] text-[#555E57] mt-1 line-clamp-2 leading-tight">
                            {ver.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Pasajes seleccionados list */}
              <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E7E3DB] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-base font-semibold text-[#263B35] flex items-center gap-2">
                    <BookOpen size={16} className="text-[#D6B77A]" />
                    Pasajes seleccionados ({selectedPassages.length})
                  </h3>
                  {errors.passages && (
                    <span className="text-xs text-red-600 font-medium">
                      {errors.passages.message}
                    </span>
                  )}
                </div>

                {selectedPassages.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-[#E7E3DB] rounded-lg text-sm text-[#8C938E]">
                    No has agregado ningún pasaje. Utiliza el selector inferior para añadir versículos.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedPassages.map((p, idx) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#E7E3DB] shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#EDF3F0] text-[#263B35] text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-serif font-semibold text-sm text-[#252925]">
                              {p.book} {p.chapter}:{p.verseStart}{p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}
                            </span>
                            {p.sampleText && (
                              <p className="text-xs text-[#555E57] italic line-clamp-1 mt-0.5">
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
                <div className="pt-3 border-t border-[#E7E3DB] space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#555E57] block">
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

          {/* STEP 3: REVISIÓN Y CONFIRMACIÓN */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-[#252925]">
                  Confirmación del nuevo proyecto
                </h2>
                <p className="text-sm text-[#555E57] mt-1">
                  Revisa los parámetros antes de inicializar el espacio de trabajo con IA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E3DB] space-y-3">
                  <span className="text-xs font-semibold text-[#8C938E] uppercase tracking-wider">
                    Detalles del proyecto
                  </span>
                  <div>
                    <h3 className="font-editorial text-lg font-semibold text-[#252925]">
                      {selectedTitle || 'Sin título'}
                    </h3>
                    <p className="text-xs text-[#555E57] mt-1">
                      {watch('description') || 'Sin descripción adicional.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E7E3DB] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#555E57]">Formato:</span>
                      <strong className="text-[#263B35]">{selectedAspectRatio}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#555E57]">Estilo visual:</span>
                      <strong className="text-[#263B35]">
                        {VISUAL_STYLES.find(s => s.value === selectedStyle)?.label || selectedStyle}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#555E57]">Tono:</span>
                      <strong className="text-[#263B35]">
                        {NARRATIVE_TONES.find(t => t.value === selectedTone)?.label || selectedTone}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E7E3DB] space-y-3">
                  <span className="text-xs font-semibold text-[#8C938E] uppercase tracking-wider">
                    Fundamento bíblico
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge color="forest" size="md">{selectedVersion}</Badge>
                    <span className="text-xs text-[#555E57]">
                      {BIBLE_VERSIONS.find(v => v.code === selectedVersion)?.name}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#E7E3DB]">
                    <span className="text-xs font-medium text-[#252925] block">
                      Pasajes incluidos:
                    </span>
                    {selectedPassages.map((p, idx) => (
                      <div key={p.id} className="text-xs text-[#263B35] font-serif bg-white p-2 rounded border border-[#E7E3DB]">
                        {idx + 1}. {p.book} {p.chapter}:{p.verseStart}{p.verseEnd > p.verseStart ? `-${p.verseEnd}` : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What happens next banner */}
              <div className="p-4 rounded-xl bg-[#EDF3F0] border border-[#263B35]/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#263B35] shrink-0 mt-0.5" />
                <div className="text-xs text-[#263B35] space-y-1">
                  <strong className="font-semibold block text-sm">¿Qué sucederá a continuación?</strong>
                  <p>
                    Al crear el proyecto, entrarás al estudio creativo de Biblia Studio. Podrás activar el análisis teológico asistido por IA, revisar la propuesta de guión escénico y generar el storyboard audiovisual paso a paso.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <Group justify="space-between" mt="xl" className="pt-4 border-t border-[#E7E3DB]">
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
                className="bg-[#263B35] hover:bg-[#1A2925]"
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
