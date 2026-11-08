import { Card, Button } from '@mantine/core';
import { BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '@/common/constants/routes';
import { useState } from 'react';

export default function LoginView() {

  const [isRedirecting, setIsRedirecting] = useState(false);

  function handleGithubLogin() {
    setIsRedirecting(true);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  function handleGoogleLogin() {
    setIsRedirecting(true);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };



  return (
    <Card radius="2xl" p={{ base: 'xl', sm: 36 }} withBorder className="bg-white border-#E7E3DB shadow-sm space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-#263B35 text-#D6B77A flex items-center justify-center mx-auto shadow-sm">
          <BookOpen size={24} />
        </div>

        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-#252925 tracking-tight">
          Inicia sesión en tu estudio
        </h1>

        <p className="text-xs sm:text-sm text-#555E57 max-w-xs mx-auto leading-relaxed">
          Accede a tus proyectos audiovisuales y continúa dando vida visual a las Escrituras.
        </p>
      </div>

      {/* OAuth Buttons (No email/password as instructed) */}
      <div className="space-y-3 pt-2">
        {/* Google OAuth Button */}
        <Button fullWidth size="md" variant="default" radius="md" disabled={isRedirecting} onClick={handleGoogleLogin} className="border-#E7E3DB hover:bg-#FAF8F5 text-#252925 font-medium h-12 transition-all shadow-2xs"
          leftSection={
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          }
        >
          Continuar con Google
        </Button>

        {/* GitHub OAuth Button */}
        <Button fullWidth size="md" variant="default" radius="md" disabled={isRedirecting} onClick={handleGithubLogin} className="border-#E7E3DB]hover:bg-#FAF8F5 text-#252925 font-medium h-12 transition-all shadow-2xs"
          leftSection={
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          }
        >
          Continuar con GitHub
        </Button>
      </div>

      {/* Demo helper banner */}
      <div className="p-3 bg-#EDF3F0 rounded-xl border border-#263B35/20 text-[11px] text-#263B35 leading-relaxed flex items-start gap-2">
        <Sparkles size={14} className="shrink-0 mt-0.5 text-#D6B77A" />
        <span>
          <strong>Acceso directo de demostración:</strong> Al hacer clic en Google o GitHub ingresarás inmediatamente al estudio creativo con proyectos y datos mock de ejemplo.
        </span>
      </div>

      {/* Switch to Register */}
      <div className="pt-2 border-t border-#E7E3DB text-center text-xs text-#555E57">
        ¿Aún no tienes una cuenta en Biblia Studio?{' '}
        <Link
          to={routes.auth.register}
          className="font-semibold text-#263B35 hover:text-#1A2925 hover:underline"
        >
          Regístrate aquí
        </Link>
      </div>
    </Card>
  );
}
