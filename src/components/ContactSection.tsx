import React, { useState } from 'react';
import { MessageCircle, Phone, Copy, Check, Clock, Shield, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types/config';
import { buildWhatsAppUrl, formatPhoneNumber } from '../config/defaultConfig';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const formattedPhone = formatPhoneNumber(config.whatsappNumber);
  const waUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    "Olá! Vim pelo site Pizza Cine e gostaria de falar com o atendimento comercial."
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contato" className="py-20 sm:py-24 bg-[#09090F] border-t border-[#292536] relative overflow-hidden">
      {/* Ambient purple neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7928CA]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C084FC] mb-2 block">
            Canal Oficial
          </span>
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase"
          >
            FALE COM NOSSA EQUIPE
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base">
            O atendimento, esclarecimento de dúvidas e a contratação do Pizza Cine são realizados pelo nosso WhatsApp comercial.
          </p>
        </div>

        {/* Contact Card */}
        <div className="rounded-3xl bg-[#171722] border border-[#292536] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11111B] border border-[#7928CA]/40 text-[#C084FC] text-xs font-semibold mb-6 glow-purple-sm">
                <span className="w-2 h-2 rounded-full bg-[#C084FC] animate-pulse" />
                <span>Atendimento Comercial Ativo</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                WhatsApp Oficial
              </h3>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
                  {formattedPhone}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copiar número"
                  className="p-2 rounded-xl bg-[#11111B] hover:bg-[#292536] border border-[#292536] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-5 h-5 text-[#C084FC]" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-[#C084FC] font-medium mb-4 -mt-2">
                  ✓ Número copiado para a área de transferência!
                </p>
              )}

              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Clique no botão ao lado para abrir uma conversa direta sem precisar salvar o contato manualmente.
              </p>

              <div className="space-y-2.5 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C084FC] shrink-0" />
                  <span>Atendimento rápido todos os dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C084FC] shrink-0" />
                  <span>Canal seguro e oficial Pizza Cine</span>
                </div>
              </div>
            </div>

            {/* Action CTA Box */}
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#11111B] border border-[#292536] text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7928CA]/30 to-[#9333EA]/30 border border-[#7928CA]/40 flex items-center justify-center mb-6 text-[#C084FC] glow-purple-sm">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">
                Iniciar Conversa Imediata
              </h4>
              <p className="text-xs text-[#A1A1AA] mb-6 max-w-xs">
                Tire dúvidas sobre os planos, consulte condições promocionais e assine agora mesmo.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] hover:from-[#9333EA] hover:to-[#C084FC] shadow-xl shadow-purple-950/70 transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer glow-purple-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CHAMAR NO WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
