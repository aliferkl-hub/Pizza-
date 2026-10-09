import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { SiteConfig } from '../types/config';
import { buildWhatsAppUrl } from '../config/defaultConfig';

interface FaqSectionProps {
  config: SiteConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first open by default
  });

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    "Olá! Gostaria de tirar uma dúvida sobre a plataforma Pizza Cine."
  );

  return (
    <section id="duvidas" className="py-20 sm:py-28 bg-[#11111B] border-t border-[#292536] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171722] border border-[#7928CA]/40 text-xs font-semibold text-[#C084FC] mb-4 glow-purple-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>Tire suas dúvidas</span>
          </div>
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase"
          >
            PERGUNTAS FREQUENTES
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base">
            Esclareça suas principais dúvidas sobre o funcionamento e contratação do Pizza Cine.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {config.faq.map((item) => {
            const isOpen = !!openIds[item.id];

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all ${
                  isOpen ? 'border-[#7928CA]/60 bg-[#171722] shadow-lg shadow-purple-950/20' : 'border-[#292536] bg-[#171722]/80 hover:border-[#7928CA]/40'
                } overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-[#11111B]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7928CA] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-white">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-lg bg-[#11111B] border border-[#292536] text-[#A1A1AA] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#C084FC] border-[#7928CA]/40' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#A1A1AA] leading-relaxed border-t border-[#292536]/60">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout if still having questions */}
        <div className="mt-12 p-6 rounded-2xl bg-[#171722] border border-[#292536] text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left">
            <h4 className="font-display font-bold text-white text-base">Ainda tem alguma pergunta?</h4>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">Nossa equipe está disponível para tirar todas as dúvidas diretamente no WhatsApp.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7928CA] to-[#9333EA] hover:from-[#9333EA] hover:to-[#C084FC] transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-purple-950/50 glow-purple-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>FALAR NO WHATSAPP</span>
          </a>
        </div>

      </div>
    </section>
  );
};
