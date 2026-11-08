import { Users, Tv, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

export default function BenefitsSection() {
  const audiences = [
    {
      title: 'Canales y Creadores de Contenido',
      role: 'YouTube, TikTok & Redes Sociales',
      icon: Tv,
      points: [
        'Producción regular de relatos bíblicos en formatos 16:9 y 9:16.',
        'Reducción del tiempo de producción de semanas a minutos.',
        'Guiones optimizados con ganchos narrativos respetuosos del texto.',
      ],
    },
    {
      title: 'Iglesias y Ministerios de Medios',
      role: 'Predicaciones y Aperturas Visuales',
      icon: Users,
      points: [
        'Videos introductorios para sermones y series temáticas.',
        'Fondos visuales en 4K con subtítulos legibles para congregaciones.',
        'Contenido audiovisual para pantallas gigantes y transmisiones en vivo.',
      ],
    },
    {
      title: 'Educadores Bíblicos y Academias',
      role: 'Seminarios y Escuela Dominical',
      icon: GraduationCap,
      points: [
        'Material pedagógico visual para niños, jóvenes y adultos.',
        'Exégesis y términos originales integrados en la narrativa.',
        'Facilita la retención y comprensión de las Escrituras.',
      ],
    },
    {
      title: 'Devocionales y Familias',
      role: 'Meditación y Discipulado en Casa',
      icon: Heart,
      points: [
        'Lecturas bíblicas con ambientación contemplativa y pacífica.',
        'Música instrumental suave adecuada para momentos de oración.',
        'Acceso libre a historias bíblicas para compartir en grupos pequeños.',
      ],
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-ivory-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-strong">
            Impacto y Beneficios
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Diseñado para quienes comunican la verdad de las Escrituras
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Elimina las barreras de diseño técnico, presupuesto de animación o falta de tiempo, y concéntrate en transmitir el mensaje eterno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-border-warm hover:border-gold shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-subtle text-forest flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                      {aud.role}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-charcoal mt-1">
                      {aud.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-border-warm">
                    {aud.points.map((point, i) => (
                      <li key={i} className="text-xs text-charcoal-muted flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 size={14} className="text-forest shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
