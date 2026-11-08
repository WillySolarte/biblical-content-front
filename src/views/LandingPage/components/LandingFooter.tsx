import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function LandingFooter() {
  return (
    <footer className="bg-forest-dark text-ivory-light pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-gold border border-white/10">
                <BookOpen size={20} />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold text-white tracking-tight block">
                  Biblia Studio
                </span>
                <span className="text-[10px] text-gold tracking-wider uppercase font-semibold block">
                  IA Creativa Bíblica
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Plataforma SaaS moderna dedicada a transformar la enseñanza y difusión de las Sagradas Escrituras mediante la narración audiovisual con inteligencia artificial.
            </p>

            {/* Scripture Verse Citation */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gold font-serif italic max-w-sm">
              "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
              <span className="block text-[11px] font-sans font-normal text-white/60 not-italic mt-1">
                — Salmos 119:105
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
              Plataforma
            </span>
            <ul className="space-y-2 text-xs text-white/75">
              <li><a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a></li>
              <li><a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#flujo-creativo" className="hover:text-white transition-colors">Flujo de producción</a></li>
              <li><a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a></li>
              <li><Link to={routes.auth.login} className="hover:text-white transition-colors">Iniciar sesión</Link></li>
              <li><Link to={routes.auth.register} className="hover:text-white transition-colors">Registrarse gratis</Link></li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold block">
              Legal & Ética
            </span>
            <ul className="space-y-2 text-xs text-white/75">
              <li><a href="#" className="hover:text-white transition-colors">Términos del Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Uso Ético de la IA Bíblica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Derechos y Traducciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soporte y Contacto</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Biblia Studio. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con rigor exegético y excelencia técnica.
          </p>
        </div>
      </div>
    </footer>
  );
}
