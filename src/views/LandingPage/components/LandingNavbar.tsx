import { useState } from 'react';
import { Button, Burger, Drawer } from '@mantine/core';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';

export default function LandingNavbar() {
  const [mobileOpened, setMobileOpened] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Flujo Creativo', href: '#flujo-creativo' },
    { label: 'Beneficios', href: '#beneficios' },
  ];

  const scrollToSection = (id: string) => {
    setMobileOpened(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory-light/90 backdrop-blur-md border-b border-border-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={routes.public.home} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-gold shadow-xs group-hover:scale-105 transition-transform">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-editorial text-xl font-bold text-charcoal tracking-tight block">
              Biblia Studio
            </span>
            <span className="text-[10px] text-muted tracking-wider uppercase font-semibold block">
              IA Creativa Bíblica
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-charcoal-muted hover:text-forest transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="subtle"
            color="forest"
            size="sm"
            onClick={() => navigate(routes.auth.login)}
            className="text-charcoal hover:text-forest"
          >
            Iniciar Sesión
          </Button>

          <Button
            color="forest"
            size="sm"
            onClick={() => navigate(routes.auth.register)}
            rightSection={<ArrowRight size={14} />}
            className="bg-forest hover:bg-forest-dark shadow-xs"
          >
            Comenzar Gratis
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            size="xs"
            color="forest"
            onClick={() => navigate(routes.auth.login)}
            className="bg-forest text-xs"
          >
            Entrar
          </Button>
          <Burger
            opened={mobileOpened}
            onClick={() => setMobileOpened(!mobileOpened)}
            size="sm"
            color="#263B35"
            aria-label="Abrir menú"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={mobileOpened}
        onClose={() => setMobileOpened(false)}
        size="xs"
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-gold">
              <BookOpen size={16} />
            </div>
            <span className="font-editorial font-bold text-base text-charcoal">
              Biblia Studio
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-4 pt-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-left py-2 text-base font-medium text-charcoal-muted hover:text-forest border-b border-border-warm/60"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-6 space-y-3">
            <Button
              fullWidth
              variant="default"
              size="md"
              onClick={() => {
                setMobileOpened(false);
                navigate(routes.auth.login);
              }}
            >
              Iniciar Sesión
            </Button>

            <Button
              fullWidth
              color="forest"
              size="md"
              onClick={() => {
                setMobileOpened(false);
                navigate(routes.auth.register);
              }}
              className="bg-forest"
            >
              Registrarse Gratis
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
