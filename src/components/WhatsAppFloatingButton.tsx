import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/defaultConfig';

interface WhatsAppFloatingButtonProps {
  whatsappNumber: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const waUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Olá! Estou navegando no site Pizza Cine e gostaria de atendimento."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      
      {/* Floating greeting bubble in dark neon theme */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-2xl bg-[#171722]/95 border border-[#292536] text-white text-xs shadow-2xl backdrop-blur-md pointer-events-auto animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-[#C084FC] shrink-0 animate-pulse" />
          <span>Fale conosco pelo WhatsApp!</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-[#A1A1AA] hover:text-white p-0.5 ml-1 cursor-pointer"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main floating button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp oficial do Pizza Cine"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-purple-950/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#9333EA]/40"
      >
        <MessageCircle className="w-7 h-7 fill-current transition-transform group-hover:scale-105" />
      </a>
    </div>
  );
};
