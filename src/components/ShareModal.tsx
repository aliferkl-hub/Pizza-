import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, Facebook, Instagram, Video, ExternalLink } from 'lucide-react';
import { ShareConfig } from '../types/config';

interface ShareModalProps {
  isOpen: boolean;
  shareConfig?: ShareConfig;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, shareConfig, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://pizzacine.com.br';
  const shareTitle = shareConfig?.shareTitle || 'Pizza Cine | Conheça nossos planos de entretenimento';
  const shareMessage = shareConfig?.shareMessage || 'Conheça o Pizza Cine e descubra uma nova maneira de aproveitar o entretenimento com filmes, séries e canais de TV!';
  const promoText = shareConfig?.promoText || `${shareMessage} Acesse: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedType('link');
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = `${shareMessage}\n\n👉 Acesse agora: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareInstagram = () => {
    // Copy caption and link to clipboard, then open Instagram
    const igText = `${shareMessage}\n\nLink: ${shareUrl}`;
    navigator.clipboard.writeText(igText);
    setCopiedType('instagram');
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleShareTikTok = () => {
    // Copy caption and link to clipboard, then open TikTok
    const tiktokText = `${shareMessage} ${shareUrl}`;
    navigator.clipboard.writeText(tiktokText);
    setCopiedType('tiktok');
    setTimeout(() => {
      window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: shareUrl,
        });
      } catch {
        // User canceled share
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#171722] border border-[#292536] p-6 shadow-2xl text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-dialog-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#11111B] transition-colors cursor-pointer"
          aria-label="Fechar janela de compartilhamento"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#7928CA]/20 border border-[#7928CA]/40 flex items-center justify-center text-[#C084FC]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="share-dialog-title" className="font-display font-bold text-lg text-white">
              Compartilhar Pizza Cine
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Divulgue o site nas suas redes sociais e contatos
            </p>
          </div>
        </div>

        {/* Copy Link input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
            Link Direto
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#11111B] border border-[#292536]">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-white px-3 w-full outline-none select-all"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-lg bg-[#7928CA] hover:bg-[#9333EA] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              {copiedType === 'link' ? <Check className="w-4 h-4 text-[#C084FC]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedType === 'link' ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
          {copiedType === 'link' && (
            <p className="text-xs text-[#C084FC] font-medium mt-1.5">
              ✓ Link copiado para a área de transferência!
            </p>
          )}
        </div>

        {/* 4 Social Networks Specific Share Buttons */}
        <div className="space-y-2.5 mb-4">
          <span className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
            Compartilhar nas Redes Sociais:
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {/* 1. WhatsApp */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="p-3 rounded-xl bg-[#11111B] hover:bg-[#292536] border border-[#292536] hover:border-emerald-600/60 text-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#A1A1AA] opacity-60" />
            </button>

            {/* 2. Facebook */}
            <button
              type="button"
              onClick={handleShareFacebook}
              className="p-3 rounded-xl bg-[#11111B] hover:bg-[#292536] border border-[#292536] hover:border-blue-600/60 text-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#A1A1AA] opacity-60" />
            </button>

            {/* 3. Instagram */}
            <button
              type="button"
              onClick={handleShareInstagram}
              className="p-3 rounded-xl bg-[#11111B] hover:bg-[#292536] border border-[#292536] hover:border-pink-600/60 text-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#A1A1AA] opacity-60" />
            </button>

            {/* 4. TikTok */}
            <button
              type="button"
              onClick={handleShareTikTok}
              className="p-3 rounded-xl bg-[#11111B] hover:bg-[#292536] border border-[#292536] hover:border-[#7928CA] text-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#C084FC] group-hover:scale-110 transition-transform" />
                <span>TikTok</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#A1A1AA] opacity-60" />
            </button>
          </div>
        </div>

        {/* Feedback banners for Instagram and TikTok */}
        {copiedType === 'instagram' && (
          <div className="p-2.5 rounded-xl bg-[#11111B] border border-pink-800/80 text-pink-200 text-xs mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-pink-400" />
            <span>Texto e link copiados! Cole no seu Story ou na Bio do Instagram.</span>
          </div>
        )}

        {copiedType === 'tiktok' && (
          <div className="p-2.5 rounded-xl bg-[#11111B] border border-[#7928CA]/80 text-[#C084FC] text-xs mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-[#C084FC]" />
            <span>Texto e link copiados! Cole na legenda ou no perfil do TikTok.</span>
          </div>
        )}

        {/* Native share on mobile */}
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#9333EA] hover:from-[#9333EA] hover:to-[#C084FC] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar via Aplicativos do Aparelho</span>
          </button>
        )}

        <div className="mt-4 pt-3.5 border-t border-[#292536] text-center">
          <p className="text-[11px] text-[#A1A1AA]">
            Mensagem configurada: <span className="text-white italic">"{shareMessage.slice(0, 60)}..."</span>
          </p>
        </div>

      </div>
    </div>
  );
};
