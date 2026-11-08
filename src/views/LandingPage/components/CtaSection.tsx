import { Button } from '@mantine/core';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#263B35] via-[#2F4740] to-[#1A2925] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-xl">
          {/* Background Ambient Motif */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <BookOpen size={300} className="text-[#D6B77A]" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#D6B77A] font-semibold">
              <Sparkles size={14} />
              <span>Estudio Audiovisual Gratuito</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E6] tracking-tight leading-tight">
              Comienza a crear tu primer video bíblico hoy mismo
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-xl mx-auto">
              Únete a creadores y líderes de ministerios que ya están dando vida visual a los pasajes de la Biblia con la máxima fidelidad y calidad técnica.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                color="gold"
                rightSection={<ArrowRight size={18} />}
                onClick={() => navigate(routes.auth.register)}
                className="bg-[#D6B77A] text-[#1A2925] hover:bg-[#C59F58] font-bold shadow-md px-8 h-13 text-base"
              >
                Crear cuenta gratis
              </Button>

              <Button
                size="lg"
                variant="outline"
                color="gray"
                onClick={() => navigate(routes.auth.login)}
                className="border-white/30 text-white hover:bg-white/10 px-8 h-13 text-base"
              >
                Ya tengo cuenta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

