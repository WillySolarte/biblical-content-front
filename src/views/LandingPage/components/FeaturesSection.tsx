import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  Image as ImageIcon, 
  Mic, 
  Download, 
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Selección Precisa de Pasajes Bíblicos',
      description: 'Navega por el Antiguo y Nuevo Testamento con las principales versiones en español: RVR1960, NVI, LBLA y NTV. Agrega rangos consecutivos y organiza múltiples pasajes con total fidelidad.',
      icon: BookOpen,
      tag: 'Escrituras',
    },
    {
      title: 'Análisis y Generación Asistida por IA',
      description: 'El motor especializado extrae el contexto histórico, el mensaje teológico central y los términos en hebreo o griego para proponer un arco narrativo fiel y conmovedor.',
      icon: Sparkles,
      tag: 'Inteligencia Artificial',
    },
    {
      title: 'Creación Dinámica de Storyboards',
      description: 'Desglosa la historia en escenas planificadas al milímetro: planos fotográficos (panorámico, primer plano, cenital), tiempos exactos de duración y guión para voz en off.',
      icon: Layers,
      tag: 'Dirección Escénica',
    },
    {
      title: 'Producción de Imágenes en Alta Fidelidad',
      description: 'Convierte las descripciones de cada escena en obras visuales mediante modelos de difusión artística: óleo clásico neoclásico, acuarela bíblica o realismo cinematográfico.',
      icon: ImageIcon,
      tag: 'Arte Visual',
    },
    {
      title: 'Locución Narrativa & Bandas Sonoras',
      description: 'Incorpora narradores con timbres solemnes y cálidos diseñados para relatos devocionales, combinados con fondos instrumentales y efectos inmersivos de ambiente.',
      icon: Mic,
      tag: 'Diseño Sonoro',
    },
    {
      title: 'Exportación Multiformato de Video',
      description: 'Produce archivos listos para proyectar en pantallas de iglesia (16:9 Full HD o 4K) o formatos verticales optimizados para YouTube Shorts, Reels y TikTok (9:16) con subtítulos integrados.',
      icon: Download,
      tag: 'Distribución',
    },
  ];

  return (
    <section id="funcionalidades" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#B89655]">
            Capacidades del Sistema
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#252925] tracking-tight">
            Herramientas diseñadas para el narrador bíblico
          </h2>
          <p className="text-sm sm:text-base text-[#555E57] leading-relaxed">
            Cada módulo de Biblia Studio resuelve un desafío técnico en la creación de video, permitiéndote concentrarte en el mensaje que deseas comunicar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#E7E3DB] hover:border-[#D6B77A] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#EDF3F0] text-[#263B35] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E3DB] text-[11px] font-semibold text-[#8C938E] uppercase tracking-wide">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#252925] leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555E57] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E3DB]/80 flex items-center text-xs font-semibold text-[#263B35]">
                  <span>Optimizado para producción bíblica</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
