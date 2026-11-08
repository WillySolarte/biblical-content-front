import { Button } from '@mantine/core';
import { Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D6B77A]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDF3F0] border border-[#263B35]/20 text-xs text-[#263B35] font-semibold">
          <Sparkles size={14} className="text-[#D6B77A]" />
          <span>Plataforma SaaS para Creación Audiovisual Bíblica</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#252925] tracking-tight leading-[1.15]">
            Da vida visual a las Escrituras con{' '}
            <span className="text-[#263B35] italic font-serif">inteligencia artificial</span>
          </h1>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#555E57] max-w-2xl mx-auto leading-relaxed">
            Transforma pasajes bíblicos en narrativas audiovisuales de alto impacto. Desde el análisis teológico y el storyboard escénico hasta la generación de imágenes, voces y video final.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            size="lg"
            color="forest"
            rightSection={<ArrowRight size={18} />}
            onClick={() => navigate(routes.auth.register)}
            className="bg-[#263B35] hover:bg-[#1A2925] shadow-md px-8 h-13 text-base"
          >
            Comenzar gratis ahora
          </Button>

          <Button
            size="lg"
            variant="outline"
            color="gray"
            leftSection={<Play size={16} className="text-[#263B35]" />}
            onClick={() => navigate(routes.auth.login)}
            className="border-[#E7E3DB] hover:bg-[#FAF8F5] text-[#252925] px-6 h-13 text-base"
          >
            Ver demostración del estudio
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-[#555E57]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#263B35]" />
            <span>Sin tarjeta de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#263B35]" />
            <span>RVR1960, NVI, LBLA y NTV</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#263B35]" />
            <span>Formatos 16:9 y 9:16 (Shorts/Reels)</span>
          </div>
        </div>

        {/* Studio Workspace Mockup Visual */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="rounded-2xl p-2 sm:p-3 bg-white border border-[#E7E3DB] shadow-2xl relative">
            <div className="rounded-xl overflow-hidden border border-[#E7E3DB] bg-[#1A2925]">
              {/* Studio Mockup Interface Header */}
              <div className="h-10 bg-[#263B35] px-4 flex items-center justify-between text-xs text-[#FAF8F5]/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="font-editorial text-white font-semibold ml-2">
                    Biblia Studio — El Hijo Pródigo (Lucas 15:11-32)
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-[#D6B77A]">RVR 1960</span>
                  <span>1080p Full HD</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300">
                    IA Conectada
                  </span>
                </div>
              </div>

              {/* Mockup Workspace Screen */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[380px] bg-[#FAF8F5]">
                {/* Left Scenes Sidebar Mock */}
                <div className="md:col-span-4 p-4 border-r border-[#E7E3DB] space-y-3 text-left">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C938E] block">
                    Storyboard Escénico (6 Escenas)
                  </span>

                  <div className="p-3 bg-[#EDF3F0] rounded-xl border border-[#263B35]/20 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#263B35]">Escena 1: La petición</span>
                      <span className="text-[10px] text-[#8C938E]">08s</span>
                    </div>
                    <p className="text-[11px] text-[#555E57] italic line-clamp-2 font-serif">
                      "Un hombre tenía dos hijos; y el menor dijo a su padre: dame los bienes..."
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E7E3DB] space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#252925]">Escena 2: Provincia lejana</span>
                      <span className="text-[10px] text-[#8C938E]">10s</span>
                    </div>
                    <p className="text-[11px] text-[#555E57] italic line-clamp-1 font-serif">
                      "Desperdició sus bienes viviendo perdidamente..."
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E7E3DB] space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#252925]">Escena 5: El abrazo paternal</span>
                      <span className="text-[10px] text-[#8C938E]">11s</span>
                    </div>
                    <p className="text-[11px] text-[#555E57] italic line-clamp-1 font-serif">
                      "Y corrió, y se echó sobre su cuello, y le besó..."
                    </p>
                  </div>
                </div>

                {/* Center / Right Visual Canvas Preview Mock */}
                <div className="md:col-span-8 p-6 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden relative shadow-md bg-black">
                      <img
                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                        alt="Escena del hijo pródigo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 inset-x-6 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm text-white font-serif text-xs sm:text-sm">
                          "Padre, he pecado contra el cielo y contra ti..."
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#555E57]">
                      <span className="font-medium">
                        Estilo: <strong className="text-[#263B35]">Cinematográfico Rembrandt</strong>
                      </span>
                      <span className="font-medium">
                        Locutor IA: <strong className="text-[#263B35]">Mateo (Voz Solemne)</strong>
                      </span>
                    </div>
                  </div>

                  {/* Audio waveform mockup */}
                  <div className="pt-4 border-t border-[#E7E3DB] flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#263B35] text-white flex items-center justify-center shrink-0">
                      <Play size={12} className="ml-0.5" />
                    </div>
                    <div className="flex-1 h-3 bg-[#EDF3F0] rounded-full overflow-hidden flex items-center px-1">
                      <div className="h-1.5 bg-[#263B35] rounded-full w-2/3" />
                    </div>
                    <span className="text-xs font-mono text-[#263B35]">00:24 / 00:47</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
