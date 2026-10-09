import React, { useState } from 'react';
import { Film, Clapperboard, Tv, ChevronRight } from 'lucide-react';
import { SiteConfig, Category } from '../types/config';

interface PlatformSectionProps {
  config: SiteConfig;
}

export const PlatformSection: React.FC<PlatformSectionProps> = ({ config }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'filmes':
        return <Film className="w-5 h-5 text-[#C084FC]" />;
      case 'series':
        return <Clapperboard className="w-5 h-5 text-[#9333EA]" />;
      case 'canais':
        return <Tv className="w-5 h-5 text-[#C084FC]" />;
      default:
        return <Film className="w-5 h-5 text-[#C084FC]" />;
    }
  };

  return (
    <section id="plataforma" className="relative py-20 sm:py-28 bg-[#09090F] border-t border-[#292536] overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7928CA]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9333EA]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div id="conteudos" className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-5 uppercase"
          >
            ENTRETENIMENTO PARA TODOS OS MOMENTOS.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-normal">
            O Pizza Cine foi pensado para quem gosta de aproveitar o tempo livre com entretenimento. Conheça nossa proposta, confira as opções disponíveis e escolha o plano ideal para você.
          </p>
        </div>

        {/* 3 Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {config.categories.map((category: Category) => {
            const hasError = imageErrors[category.id];

            return (
              <div
                key={category.id}
                className="group relative rounded-2xl overflow-hidden bg-[#171722] border border-[#292536] hover:border-[#7928CA] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/40 flex flex-col"
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#11111B]">
                  {!hasError ? (
                    <img
                      src={category.image}
                      alt={`Categoria ${category.title} no Pizza Cine`}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(category.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                  ) : (
                    /* CSS Fallback Container with domain icon */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#171722] via-[#11111B] to-[#09090F] text-center">
                      <div className="p-4 rounded-full bg-[#11111B] mb-3 border border-[#292536]">
                        {getCategoryIcon(category.id)}
                      </div>
                      <span className="font-display font-bold text-white text-lg">{category.title}</span>
                    </div>
                  )}

                  {/* Gradient Overlay for bottom text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171722] via-[#171722]/40 to-transparent" />

                  {/* Category Pill / Header on top */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#09090F]/85 backdrop-blur-md border border-[#292536] text-xs font-semibold text-white">
                    {getCategoryIcon(category.id)}
                    <span>{category.title}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-[#171722]">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#C084FC] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#292536] flex items-center justify-between text-xs font-semibold text-[#C084FC] group-hover:text-white transition-colors">
                    <span>Opções disponíveis</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Banner Box */}
        <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-[#11111B] border border-[#292536] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C084FC] shrink-0 animate-pulse" />
            <p className="text-sm text-[#A1A1AA]">
              Imagens representativas das categorias de entretenimento disponíveis para os assinantes.
            </p>
          </div>
          <a
            href="#planos"
            className="shrink-0 text-xs font-semibold text-[#C084FC] hover:text-white underline underline-offset-4"
          >
            Ver opções de planos &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
