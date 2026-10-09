import React, { useState } from 'react';
import { Menu, X, Film, MessageCircle, ArrowRight, Sparkles, Tv, Layers } from 'lucide-react';
import { SiteConfig } from '../types/config';
import { buildWhatsAppUrl, resolveTestActionUrl } from '../config/defaultConfig';

interface NavbarProps {
  config: SiteConfig;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenShare, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Filmes', href: '#filmes' },
    { label: 'Séries', href: '#series' },
    { label: 'Canais', href: '#canais' },
    { label: 'Gêneros', href: '#generos' },
    { label: 'Planos', href: '#planos' },
    { label: 'Dúvidas', href: '#duvidas' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    config.whatsappGreeting
  );

  const testActionUrl = resolveTestActionUrl(config.testAction, config.whatsappNumber);

  return (
    <>
      {/* Top Announcement Bar in Purple Neon Theme */}
      {config.announcement.enabled && (
        <aside 
          aria-label="Aviso comercial"
          className="bg-gradient-to-r from-[#09090F] via-[#171722] to-[#09090F] border-b border-[#292536] text-xs py-2 px-4 text-center text-[#A1A1AA] flex items-center justify-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-pulse"></span>
          <span className="font-medium text-[#C084FC]">{config.announcement.text}</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[#C084FC] hover:text-white font-semibold underline underline-offset-2 ml-2 transition-colors"
          >
            Fale conosco <ArrowRight className="w-3 h-3" />
          </a>
        </aside>
      )}

      {/* Main Header / Top Bar */}
      <header className="sticky top-0 z-40 bg-[#09090F]/90 backdrop-blur-md border-b border-[#292536] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Zone 1: Modern Purple Neon Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7928CA] via-[#9333EA] to-[#C084FC] p-0.5 shadow-lg shadow-purple-950/60 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#11111B] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-[#C084FC] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white flex items-center">
                PIZZA<span className="text-[#C084FC] ml-1 text-glow-lilac">CINE</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav 
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[#A1A1AA]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap hover:text-[#C084FC] transition-colors duration-150 py-1 border-b-2 border-transparent hover:border-[#C084FC]/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Test Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {config.testAction?.enabled && (
              <a
                href={testActionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-bold text-[#C084FC] hover:text-white bg-[#171722] hover:bg-[#7928CA]/25 border border-[#7928CA]/40 hover:border-[#C084FC] rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm"
                title="Solicitar teste ou demonstração"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>{config.testAction.buttonText || 'Para um teste conosco clique aqui'}</span>
              </a>
            )}

            <a
              href="#planos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#planos');
              }}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] hover:from-[#9333EA] hover:to-[#C084FC] rounded-xl shadow-lg shadow-purple-950/60 hover:shadow-purple-900/80 transition-all duration-200 whitespace-nowrap active:scale-95 cursor-pointer glow-purple-sm"
            >
              Assinar Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#planos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#planos');
              }}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#7928CA] rounded-lg whitespace-nowrap"
            >
              Planos
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#A1A1AA] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7928CA]"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#09090F] border-b border-[#292536] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#A1A1AA] hover:bg-[#171722] hover:text-[#C084FC] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#292536] flex flex-col gap-2.5">
              {config.testAction?.enabled && (
                <a
                  href={testActionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#C084FC] bg-[#171722] border border-[#7928CA]/40 rounded-xl hover:bg-[#7928CA]/20 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#C084FC]" />
                  <span>{config.testAction.buttonText || 'Para um teste conosco clique aqui'}</span>
                </a>
              )}

              <a
                href="#planos"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#planos');
                }}
                className="w-full text-center py-3 text-sm font-bold text-white bg-gradient-to-r from-[#7928CA] to-[#9333EA] rounded-xl shadow-md glow-purple-sm"
              >
                VER PLANOS E ASSINAR
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#171722] border border-[#292536] hover:border-[#7928CA] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C084FC]" />
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
