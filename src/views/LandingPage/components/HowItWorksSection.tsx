import { BookOpen, Sparkles, Layers, Image as ImageIcon, Film, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Selección Bíblica',
      description: 'Elige tu traducción predilecta (RVR1960, NVI, LBLA, NTV) e ingresa uno o más rangos de versículos consecutivos.',
      icon: BookOpen,
      accent: 'bg-[#EDF3F0] text-[#263B35]',
    },
    {
      step: '02',
      title: 'Análisis Exegético con IA',
      description: 'El motor teológico identifica el contexto histórico, el mensaje central y los términos clave en el idioma original.',
      icon: Sparkles,
      accent: 'bg-[#FAF6EE] text-[#B89655]',
    },
    {
      step: '03',
      title: 'Storyboard y Guión',
      description: 'La plataforma divide el relato en escenas cinematográficas con planos fotográficos, locución en off y tiempos exactos.',
      icon: Layers,
      accent: 'bg-[#EDF3F0] text-[#263B35]',
    },
    {
      step: '04',
      title: 'Arte Visual & Locución',
      description: 'Genera imágenes en estilos artísticos (óleo clásico, acuarela, fotorrealismo) y añade voces narrativas emotivas y música.',
      icon: ImageIcon,
      accent: 'bg-[#FAF6EE] text-[#B89655]',
    },
    {
      step: '05',
      title: 'Montaje & Exportación',
      description: 'Revisa la vista previa en el monitor, activa subtítulos editoriales y exporta en MP4 1080p o 4K para YouTube y redes.',
      icon: Film,
      accent: 'bg-[#EDF3F0] text-[#263B35]',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white border-y border-[#E7E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#B89655]">
            Proceso de Creación
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#252925] tracking-tight">
            Cómo funciona Biblia Studio
          </h2>
          <p className="text-sm sm:text-base text-[#555E57] leading-relaxed">
            Un flujo guiado y respetuoso del texto bíblico que une el rigor teológico con la potencia artística de la inteligencia artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7E3DB] flex flex-col justify-between hover:border-[#D6B77A] transition-all duration-200 group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-2xl font-bold text-[#263B35]/40 group-hover:text-[#263B35] transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${item.accent} flex items-center justify-center`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#252925] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#555E57] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E7E3DB]/70 flex items-center gap-1 text-[11px] font-semibold text-[#263B35] group-hover:text-[#B89655] transition-colors">
                  <span>Paso {idx + 1} del flujo</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

