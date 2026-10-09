import React from 'react';
import { Check, MessageCircle, Crown, Sparkles, AlertCircle } from 'lucide-react';
import { SiteConfig, Plan } from '../types/config';
import { buildWhatsAppUrl } from '../config/defaultConfig';

interface PlansSectionProps {
  config: SiteConfig;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ config }) => {
  // Only display active plans
  const activePlans = config.plans.filter(p => p.active);

  return (
    <section id="planos" className="py-20 sm:py-28 bg-[#09090F] border-t border-[#292536] relative overflow-hidden">
      {/* Background ambient purple neon lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#7928CA]/10 via-[#9333EA]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171722] border border-[#7928CA]/40 text-xs font-semibold text-[#C084FC] mb-4 glow-purple-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>Assinaturas Flexíveis</span>
          </div>
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase mb-4"
          >
            ESCOLHA SEU PLANO.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] font-normal">
            Confira as opções disponíveis e fale conosco para assinar.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activePlans.map((plan: Plan) => {
            const isAnnual = plan.id === 'anual' || plan.featured;
            const waUrl = buildWhatsAppUrl(
              config.whatsappNumber,
              plan.whatsappMessage || `Olá! Vim pelo site Pizza Cine e gostaria de informações para assinar o ${plan.name} (${plan.period}).`
            );

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  isAnnual
                    ? 'bg-gradient-to-b from-[#171722] via-[#11111B] to-[#171722] border-2 border-[#9333EA] shadow-2xl shadow-purple-950/60 glow-purple-md'
                    : 'bg-[#171722] border border-[#292536] hover:border-[#7928CA] shadow-xl hover:shadow-purple-950/30'
                }`}
              >
                {/* Premium Featured Crown / Badge */}
                {isAnnual && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#7928CA] to-[#9333EA] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg glow-purple-sm">
                      <Crown className="w-3.5 h-3.5 fill-current text-[#C084FC]" />
                      {plan.badge || 'Experiência Premium'}
                    </span>
                  </div>
                )}

                {/* Standard badge for non-annual if present */}
                {!isAnnual && plan.badge && (
                  <div className="absolute -top-3 left-6 z-20">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-[#11111B] border border-[#7928CA]/50 text-[#C084FC] text-xs font-semibold shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1">
                  {/* Plan Name & Period */}
                  <div className="pt-2 mb-6">
                    <h3 className="font-display font-extrabold text-xl text-white mb-1">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider">
                      Período: {plan.period}
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="mb-7 pb-6 border-b border-[#292536]">
                    {plan.isFixedPrice && plan.price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-[#A1A1AA]">R$</span>
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-xs font-medium text-[#C084FC]">
                          {plan.priceSubtext || '/mês'}
                        </span>
                      </div>
                    ) : plan.price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-[#A1A1AA]">R$</span>
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-xs font-medium text-[#C084FC]">
                          {plan.priceSubtext}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-display font-bold text-xl sm:text-2xl text-[#C084FC] tracking-tight block">
                          {plan.priceDisplay || 'Sob Consulta'}
                        </span>
                        <span className="text-xs text-[#A1A1AA] mt-1 block">
                          {plan.priceSubtext || 'Consulte via WhatsApp'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider block">
                      Condições do plano:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-snug">
                          <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#C084FC]" />
                          <span className="text-neutral-200">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 ${
                      isAnnual
                        ? 'bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] hover:from-[#9333EA] hover:to-[#C084FC] text-white shadow-purple-950/70 glow-purple-sm'
                        : 'bg-[#7928CA] hover:bg-[#9333EA] text-white shadow-purple-950/40'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{plan.buttonText}</span>
                  </a>
                  <p className="text-[11px] text-[#A1A1AA] text-center mt-2.5">
                    Abre conversa no WhatsApp oficial
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Commercial Clarification Box */}
        <div className="mt-12 p-5 rounded-2xl bg-[#11111B] border border-[#292536] max-w-3xl mx-auto flex items-start gap-3.5 text-[#A1A1AA] text-xs leading-relaxed shadow-lg">
          <AlertCircle className="w-5 h-5 text-[#C084FC] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white mb-1">
              Como funciona a contratação e o pagamento?
            </p>
            <p>
              Ao clicar no botão do plano desejado, você inicia um atendimento direto pelo WhatsApp oficial com nossa equipe. A confirmação do plano, as formas de pagamento disponíveis e as instruções de configuração são realizadas com segurança diretamente nessa conversa.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
