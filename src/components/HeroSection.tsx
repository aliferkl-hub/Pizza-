import React from 'react';
import { Play, Sparkles, ChevronDown, Film, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types/config';
import { resolveTestActionUrl } from '../config/defaultConfig';

interface HeroSectionProps {
  config: SiteConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testActionUrl = resolveTestActionUrl(config.testAction, config.whatsappNumber);

  // Use the top featured title from media catalog if available for the cinematic showcase badge
  const featuredTitle = config.mediaCatalog && config.mediaCatalog.length > 0
    ? config.mediaCatalog.find(m => m.featured && m.bannerUrl) || config.mediaCatalog[0]
    : null;

  return (
    <section 
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#09090F]"
    >
      {/* Background Image with Dark Contrast Scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.heroImage || "/src/assets/images/hero_cinema_dark_1791503011994.jpg"}
          alt="Ambiente cinematográfico premium Pizza Cine"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.15] scale-105"
        />
        {/* Layered dark gradients for guaranteed WCAG AA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-[#09090F]/80 to-[#09090F]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090F] via-transparent to-[#09090F]" />
        
        {/* Subtle cinematic purple neon ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#7928CA]/15 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[280px] bg-[#9333EA]/15 blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Cinematic Highlight Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171722]/90 border border-[#7928CA]/40 backdrop-blur-md text-xs font-semibold text-[#C084FC] mb-6 glow-purple-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
          <span>PIZZA CINE 2.0 • UNIVERSO DE ENTRETENIMENTO</span>
        </div>

        {/* Headline */}
        <h1 
          style={{ textWrap: 'balance' }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-lg"
        >
          {config.tagline || 'SEU PRÓXIMO UNIVERSO DE ENTRETENIMENTO COMEÇA AQUI.'}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#A1A1AA] font-normal leading-relaxed mb-8 drop-shadow">
          {config.subtitle || 'Conheça o Pizza Cine e descubra uma nova maneira de aproveitar o entretenimento.'}
        </p>

        {/* Featured Content Pill with Real Metadata */}
        {featuredTitle && (
          <div className="mb-10 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-[#171722]/85 border border-[#292536] backdrop-blur-md flex flex-col sm:flex-row items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#11111B] border border-[#7928CA]/40 flex items-center justify-center shrink-0 text-[#C084FC]">
              <Film className="w-6 h-6" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-white">{featuredTitle.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7928CA] text-white font-bold">EM DESTAQUE</span>
                {featuredTitle.rating && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#292536] text-[#A1A1AA] font-semibold">{featuredTitle.rating} anos</span>
                )}
                <span className="text-[11px] text-[#A1A1AA]">{featuredTitle.year}</span>
              </div>
              <p className="text-xs text-[#A1A1AA] line-clamp-1">
                {featuredTitle.synopsis}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollTo('filmes')}
              className="px-3 py-1.5 rounded-lg bg-[#7928CA]/30 hover:bg-[#7928CA]/60 text-xs font-semibold text-[#C084FC] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              Explorar Catálogo
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          {/* Button 1: Conhecer a Plataforma */}
          <button
            type="button"
            onClick={() => scrollTo('plataforma')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#171722] hover:bg-[#11111B] border border-[#292536] hover:border-[#7928CA] shadow-lg transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C084FC]" />
            <span>CONHECER A PLATAFORMA</span>
          </button>

          {/* Button 2: Ver Filmes & Catálogo */}
          <button
            type="button"
            onClick={() => scrollTo('filmes')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#7928CA] hover:bg-[#9333EA] border border-[#7928CA]/60 shadow-lg shadow-purple-950/60 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 glow-purple-sm"
          >
            <Play className="w-4 h-4 text-white fill-current" />
            <span>VER CATÁLOGO</span>
          </button>

          {/* Button 3: Assinar Agora */}
          <button
            type="button"
            onClick={() => scrollTo('planos')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] hover:from-[#9333EA] hover:to-[#C084FC] shadow-xl shadow-purple-950/80 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 glow-purple-md"
          >
            <span>ASSINAR AGORA</span>
          </button>

        </div>

        {/* Featured Test Action Banner */}
        {config.testAction?.enabled && (
          <div className="mt-8">
            <a
              href={testActionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#C084FC] hover:text-white bg-[#171722] hover:bg-[#7928CA]/30 border border-[#7928CA]/50 hover:border-[#C084FC] shadow-lg shadow-purple-950/60 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#C084FC]" />
              <span>{config.testAction.buttonText || "Para um teste conosco clique aqui"}</span>
            </a>
          </div>
        )}

        {/* Scroll down indicator */}
        <div 
          className="mt-12 sm:mt-14 text-[#A1A1AA] flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 hover:text-[#C084FC] transition-all" 
          onClick={() => scrollTo('plataforma')}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Rolar para explorar</span>
          <ChevronDown className="w-4 h-4 text-[#C084FC]" />
        </div>

      </div>
    </section>
  );
};
