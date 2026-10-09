import React from 'react';
import { Sparkles, Layers, MessageSquare, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types/config';

interface BenefitsSectionProps {
  config: SiteConfig;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ config }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C084FC]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#9333EA]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#C084FC]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#C084FC]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C084FC]" />;
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#09090F] border-t border-[#292536]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase"
          >
            POR QUE CONHECER O PIZZA CINE?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7928CA] to-[#C084FC] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.benefits.map((benefit, index) => (
            <div
              key={benefit.id || index}
              className="group relative p-7 rounded-2xl bg-[#171722] border border-[#292536] hover:border-[#7928CA] hover:bg-[#171722]/90 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-[#11111B] border border-[#292536] group-hover:border-[#7928CA] flex items-center justify-center mb-6 group-hover:scale-105 transition-all">
                  {getIcon(benefit.icon)}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-white mb-3 tracking-wide group-hover:text-[#C084FC] transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>

              {/* Number indicator */}
              <div className="mt-6 pt-4 border-t border-[#292536] flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>0{index + 1}</span>
                <span className="w-4 h-[1px] bg-[#292536] group-hover:w-8 group-hover:bg-[#C084FC] transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
