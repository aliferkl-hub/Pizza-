import React from 'react';
import { Film, MessageCircle, Share2, Lock, Instagram, Facebook, Shield } from 'lucide-react';
import { SiteConfig } from '../types/config';
import { buildWhatsAppUrl, formatPhoneNumber } from '../config/defaultConfig';

interface FooterProps {
  config: SiteConfig;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenPrivacy,
  onOpenTerms,
  onOpenShare,
  onOpenAdmin,
}) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    "Olá! Vim pelo site Pizza Cine e gostaria de falar com vocês."
  );

  return (
    <footer className="bg-[#09090F] border-t border-[#292536] text-[#A1A1AA] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#292536]">
          
          {/* Col 1 & 2: Brand & Institutional */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7928CA] to-[#9333EA] p-0.5 shadow-md shadow-purple-950/60">
                <div className="w-full h-full bg-[#11111B] rounded-[10px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-[#C084FC]" />
                </div>
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                PIZZA<span className="text-[#C084FC] ml-1 text-glow-lilac">CINE</span>
              </span>
            </div>

            <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed max-w-sm">
              Sua plataforma comercial de entretenimento. Apresentamos nossos planos de filmes, séries e canais de TV para quem busca momentos de lazer com qualidade e atendimento dedicado.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenShare}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#171722] hover:bg-[#11111B] text-[#A1A1AA] hover:text-white text-xs font-semibold border border-[#292536] hover:border-[#7928CA] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Compartilhar Site</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171722] border border-[#292536] hover:border-[#7928CA] text-[#C084FC] hover:text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navegação Rápida */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#inicio" className="hover:text-[#C084FC] transition-colors">Início</a>
              </li>
              <li>
                <a href="#filmes" className="hover:text-[#C084FC] transition-colors">Filmes</a>
              </li>
              <li>
                <a href="#series" className="hover:text-[#C084FC] transition-colors">Séries</a>
              </li>
              <li>
                <a href="#canais" className="hover:text-[#C084FC] transition-colors">Canais de TV</a>
              </li>
              <li>
                <a href="#generos" className="hover:text-[#C084FC] transition-colors">Gêneros</a>
              </li>
              <li>
                <a href="#planos" className="hover:text-[#C084FC] transition-colors">Planos de Assinatura</a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-[#C084FC] transition-colors">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#C084FC] transition-colors">Fale Conosco</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Informações e Jurídico */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Transparência
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#C084FC] transition-colors cursor-pointer text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-[#C084FC] transition-colors cursor-pointer text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <span className="text-[#A1A1AA]/70 text-xs">
                  Atendimento: {formatPhoneNumber(config.whatsappNumber)}
                </span>
              </li>
              <li>
                <span className="text-[#A1A1AA]/70 text-xs">
                  Moeda: Real Brasileiro (R$)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Redes e Acesso Administrativo */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Conexões
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A1A1AA] hover:text-[#C084FC] flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C084FC]" />
                <span>WhatsApp Oficial</span>
              </a>
              {config.socialLinks.instagram && (
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#A1A1AA] hover:text-[#C084FC] flex items-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#C084FC]" />
                  <span>Instagram</span>
                </a>
              )}
              {config.socialLinks.facebook && (
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#A1A1AA] hover:text-[#C084FC] flex items-center gap-2 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#C084FC]" />
                  <span>Facebook</span>
                </a>
              )}
              {config.socialLinks.tiktok && (
                <a
                  href={config.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#A1A1AA] hover:text-[#C084FC] flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-[#C084FC]" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.26a8.28 8.28 0 0 0 4.81 1.52v-3.45c-.37 0-.73-.08-1.04-.24z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              )}

              {/* Protected Admin Access Link */}
              <div className="pt-3 border-t border-[#292536]">
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA]/60 hover:text-[#C084FC] transition-colors cursor-pointer"
                  title="Área restrita para gerenciamento do site"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Painel Administrativo</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]/70">
          <p>
            &copy; {currentYear} Pizza Cine. Todos os direitos reservados.
          </p>
          <p className="text-center sm:text-right max-w-xl text-[11px] leading-relaxed">
            O Pizza Cine é uma marca independente de divulgação e comercialização de planos de entretenimento. Não possuímos vínculo, patrocínio ou afiliação oficial com outras marcas registradas de terceiros.
          </p>
        </div>

      </div>
    </footer>
  );
};
