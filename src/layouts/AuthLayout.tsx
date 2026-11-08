import { Outlet, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { routes } from '@/common/constants/routes';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-ivory-light flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
      {/* Top Bar with Return Link */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <Link
          to={routes.public.home}
          className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-muted hover:text-forest transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-forest flex items-center justify-center text-gold">
            <BookOpen size={14} />
          </div>
          <span className="font-editorial font-bold text-sm text-charcoal">
            Biblia Studio
          </span>
        </div>
      </div>

      {/* Centered Main Content Card */}
      <div className="w-full max-w-md mx-auto my-8">
        <Outlet />
      </div>

      {/* Bottom Legal / Editorial Footer */}
      <div className="w-full max-w-md mx-auto text-center space-y-2 text-xs text-muted">
        <div className="flex justify-center gap-4 text-charcoal-muted">
          <a href="#" className="hover:underline">Términos del Servicio</a>
          <span>•</span>
          <a href="#" className="hover:underline">Política de Privacidad</a>
          <span>•</span>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
        <p>© {new Date().getFullYear()} Biblia Studio. Creación audiovisual bíblica con IA.</p>
      </div>
    </div>
  );
}
