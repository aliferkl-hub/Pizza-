import React, { useState } from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#171722] border border-[#292536] shadow-2xl flex flex-col text-neutral-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#292536] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('privacy')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                tab === 'privacy'
                  ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/50 glow-purple-sm'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#11111B]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#C084FC]" />
                Política de Privacidade
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab('terms')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                tab === 'terms'
                  ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/50 glow-purple-sm'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#11111B]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#C084FC]" />
                Termos de Uso
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#11111B] transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
          {tab === 'privacy' ? (
            <>
              <div>
                <h3 id="legal-dialog-title" className="font-display font-bold text-base text-white mb-2">
                  1. Informações Gerais e Coleta de Dados
                </h3>
                <p>
                  Esta Política de Privacidade descreve como a plataforma comercial <strong>PIZZA CINE</strong> trata as informações de usuários que navegam por este site institucional de divulgação e vendas. Nós não coletamos automaticamente dados pessoais sensíveis durante sua simples navegação pelo site.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  2. Atendimento Comercial e WhatsApp
                </h3>
                <p>
                  Ao clicar em nossos links e botões de atendimento para iniciar uma conversa via WhatsApp, você é direcionado ao aplicativo oficial de mensagens. As interações comerciais, contratações e orientações de ativação ocorrem diretamente no canal de atendimento, respeitando a privacidade das conversas e os termos de serviço da plataforma de mensageria.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  3. Armazenamento Local e Cookies
                </h3>
                <p>
                  Podemos utilizar recursos de armazenamento local do seu navegador (como <em>localStorage</em>) unicamente para fins técnicos indispensáveis à experiência do usuário, como manter preferências de exibição de avisos e integridade das sessões administrativas autorizadas.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  4. Compartilhamento de Informações
                </h3>
                <p>
                  Não comercializamos, alugamos nem repassamos dados de contato ou cadastros de clientes a quaisquer terceiros para fins de marketing não autorizado.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  5. Contato sobre Privacidade
                </h3>
                <p>
                  Para quaisquer esclarecimentos relacionados ao tratamento de informações, entre em contato diretamente pelo nosso canal comercial oficial informado no rodapé deste site.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 id="legal-dialog-title" className="font-display font-bold text-base text-white mb-2">
                  1. Finalidade do Site
                </h3>
                <p>
                  O presente site tem por finalidade exclusiva a divulgação comercial dos planos de entretenimento digital disponibilizados pela marca <strong>PIZZA CINE</strong>. As contratações são efetivadas mediante contato direto pelo canal oficial de atendimento.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  2. Disponibilidade e Suporte
                </h3>
                <p>
                  As instruções detalhadas de configuração, ativação e orientações para utilização dos serviços contratados são fornecidas pela equipe de atendimento durante e após a confirmação da assinatura escolhida.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  3. Direitos e Marcas Registradas
                </h3>
                <p>
                  O Pizza Cine é uma iniciativa independente. Nomes de filmes, séries, atores, estúdios ou emissoras porventura citados neste site para fins meramente informativos e demonstrativos de catálogo são marcas registradas de seus respectivos proprietários legítimos, sem que isso configure patrocínio ou afiliação oficial.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  4. Modificações dos Termos
                </h3>
                <p>
                  Estes Termos de Uso poderão ser atualizados periodicamente para refletir aprimoramentos nos serviços e adequações comerciais. Recomendamos a consulta periódica desta página.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#292536] bg-[#11111B] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#7928CA] hover:bg-[#9333EA] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
