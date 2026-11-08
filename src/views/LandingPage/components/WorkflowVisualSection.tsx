import { useState } from 'react';
import { Badge, Button } from '@mantine/core';
import { BookOpen, Layers, Image as ImageIcon, Film, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function WorkflowVisualSection() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const navigate = useNavigate();

  const workflowSteps = [
    {
      id: 'passages',
      title: '1. Pasajes Bíblicos',
      label: 'Escrituras',
      icon: BookOpen,
      headline: 'Selección rigurosa y lectura versículo por versículo',
      description: 'Elige el libro y los rangos de versículos. La plataforma carga el texto bíblico original con referencias cruzadas y notas léxicas.',
      previewContent: (
        <div className="bg-white p-6 rounded-2xl border border-border-warm space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <span className="font-editorial text-lg font-bold text-forest">
              Lucas 15:11-24 (RVR1960)
            </span>
            <Badge color="forest" size="sm">2 Pasajes agregados</Badge>
          </div>
          <div className="font-serif text-sm text-charcoal space-y-2 border-l-2 border-gold pl-3">
            <p><strong>11</strong> También dijo: Un hombre tenía dos hijos;</p>
            <p><strong>12</strong> y el menor de ellos dijo a su padre: Padre, dame la parte de los bienes que me corresponde...</p>
            <p><strong>20</strong> Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y le besó.</p>
          </div>
          <div className="p-3 bg-ivory-light rounded-lg text-xs text-charcoal-muted flex items-center justify-between">
            <span>Término clave: σπλαγχνίζομαι (Compasión entrañable)</span>
            <span className="text-forest font-semibold">Listo para análisis</span>
          </div>
        </div>
      ),
    },
    {
      id: 'storyboard',
      title: '2. Análisis & Guión',
      label: 'Storyboard',
      icon: Layers,
      headline: 'Propuesta teológica y desglose escénico con IA',
      description: 'La inteligencia artificial genera una propuesta de guion estructurado en escenas secuenciales, especificando ángulos de cámara y locución.',
      previewContent: (
        <div className="bg-white p-6 rounded-2xl border border-border-warm space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <span className="font-editorial text-base font-bold text-charcoal">
              Estructura Escénica Generada (6 Escenas)
            </span>
            <Badge color="violet" size="sm">IA Asistida</Badge>
          </div>
          <div className="space-y-2.5">
            <div className="p-3 bg-forest-subtle rounded-xl border border-forest/20 text-xs">
              <span className="font-bold text-forest block mb-1">Escena 1: La petición impaciente (08s)</span>
              <p className="text-charcoal-muted italic font-serif">"En las colinas de Galilea, un joven inquieto exigió lo que aún no le correspondía..."</p>
              <span className="text-[10px] text-muted mt-1 block">Plano medio • Luz cálida de atardecer</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-border-warm text-xs">
              <span className="font-bold text-charcoal block mb-1">Escena 5: El abrazo restaurador (11s)</span>
              <p className="text-charcoal-muted italic font-serif">"Y cuando aún estaba lejos, lo vio su padre y corrió a su encuentro..."</p>
              <span className="text-[10px] text-muted mt-1 block">Primer plano dramático • Viento y llanto</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'visuals',
      title: '3. Producción Visual',
      label: 'Arte IA',
      icon: ImageIcon,
      headline: 'Generación de escenas con coherencia estilística',
      description: 'Cada escena se renderiza en base a la descripción visual manteniendo paletas de color bíblicas, vestuarios de época y ambientaciones históricas.',
      previewContent: (
        <div className="bg-white p-6 rounded-2xl border border-border-warm space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <span className="font-editorial text-base font-bold text-charcoal">
              Galería de Escenas Artísticas
            </span>
            <Badge color="forest" size="sm">Estilo Rembrandt</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden aspect-video bg-ivory-light relative group">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
                alt="Escena 1"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-2 text-[10px] bg-black/75 text-white px-1.5 py-0.5 rounded font-mono">
                Escena #1
              </span>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video bg-ivory-light relative group">
              <img
                src="https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=600&auto=format&fit=crop&q=80"
                alt="Escena 5"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-2 text-[10px] bg-black/75 text-white px-1.5 py-0.5 rounded font-mono">
                Escena #5
              </span>
            </div>
          </div>
          <p className="text-xs text-charcoal-muted italic text-center">
            Prompts optimizados para fidelidad cultural y solemnidad bíblica.
          </p>
        </div>
      ),
    },
    {
      id: 'video',
      title: '4. Video & Exportación',
      label: 'Entrega',
      icon: Film,
      headline: 'Montaje cinematográfico con subtítulos y audio',
      description: 'Previsualiza el video con locución en off sincronizada, música ambiental de fondo y subtítulos incrustados listos para descargar.',
      previewContent: (
        <div className="bg-forest-dark p-6 rounded-2xl border border-forest space-y-4 text-white text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="font-editorial font-bold text-white text-sm">
              Render Final • 1080p MP4
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[11px]">
              00:47 / 00:47
            </span>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden relative shadow-md bg-black">
            <img
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80"
              alt="Video export"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 inset-x-4 text-center">
              <span className="inline-block px-3 py-1 rounded bg-black/80 text-white font-serif text-xs">
                "Porque este mi hijo muerto era, y ha revivido..."
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs text-white/70">
            <span>Audio: Voz Mateo + Laúd Antiguo</span>
            <Badge color="forest" size="xs">Listo para Descargar</Badge>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = workflowSteps[activeWorkflowStep];

  return (
    <section id="flujo-creativo" className="py-24 bg-white border-b border-border-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-strong">
            Experiencia de Estudio
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            El flujo creativo interactivo
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Descubre cómo cada etapa de producción se integra de manera orgánica en Biblia Studio.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeWorkflowStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-forest text-white shadow-md'
                    : 'bg-ivory-light text-charcoal-muted hover:bg-forest-subtle hover:text-forest border border-border-warm'
                }`}
              >
                <Icon size={16} className={isSelected ? 'text-gold' : 'text-muted'} />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Showcase */}
        <div className="bg-ivory-light p-6 sm:p-10 rounded-3xl border border-border-warm max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="px-3 py-1 rounded-full bg-forest-subtle text-forest font-semibold text-xs inline-block">
              Etapa {activeWorkflowStep + 1} de {workflowSteps.length}
            </span>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
              {currentStep.headline}
            </h3>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              {currentStep.description}
            </p>

            <div className="pt-2">
              <Button
                color="forest"
                size="sm"
                rightSection={<ArrowRight size={14} />}
                onClick={() => navigate(routes.auth.register)}
                className="bg-forest hover:bg-forest-dark"
              >
                Probar esta etapa en el estudio
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            {currentStep.previewContent}
          </div>
        </div>
      </div>
    </section>
  );
}
