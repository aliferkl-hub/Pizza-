import { SiteConfig } from '../types/config';
import { INITIAL_CATALOG } from './catalogData';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: "PIZZA CINE",
  tagline: "SEU PRÓXIMO UNIVERSO DE ENTRETENIMENTO COMEÇA AQUI.",
  subtitle: "Conheça o Pizza Cine e descubra uma nova maneira de aproveitar o entretenimento.",
  heroImage: "/src/assets/images/hero_cinema_dark_1791503011994.jpg",
  whatsappNumber: "11973479473",
  whatsappGreeting: "Olá! Vim pelo site Pizza Cine e gostaria de informações sobre assinaturas.",
  mediaCatalog: INITIAL_CATALOG,
  testAction: {
    enabled: true,
    buttonText: "Para um teste conosco clique aqui",
    destinationType: "whatsapp",
    destinationUrl: "https://wa.me/5511973479473",
    whatsappMessage: "Olá! Vim pelo site Pizza Cine e gostaria de solicitar um teste para conhecer o serviço."
  },
  shareConfig: {
    shareTitle: "Pizza Cine | Conheça nossos planos de entretenimento",
    shareMessage: "Conheça o Pizza Cine e descubra uma nova maneira de aproveitar o entretenimento com filmes, séries e canais de TV!",
    promoText: "🔥 Acesse o Pizza Cine e aproveite o melhor do entretenimento. Planos a partir de R$ 39,99/mês. Fale conosco no WhatsApp!"
  },
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/5511973479473"
  },
  announcement: {
    enabled: true,
    text: "Atendimento comercial direto pelo WhatsApp oficial com ativação orientada e suporte humano."
  },
  plans: [
    {
      id: "mensal",
      name: "Plano Mensal",
      period: "1 mês",
      price: "39,99",
      priceDisplay: "R$ 39,99",
      priceSubtext: "/mês",
      isFixedPrice: true,
      badge: "Mais Popular",
      active: true,
      featured: false,
      buttonText: "QUERO O MENSAL",
      benefits: [
        "Acesso por 30 dias",
        "Opções de filmes, séries e canais",
        "Suporte direto pelo WhatsApp",
        "Instruções passo a passo de contratação e uso"
      ],
      whatsappMessage: "Olá! Vim pelo site Pizza Cine e gostaria de informações para assinar o plano mensal de R$ 39,99."
    },
    {
      id: "trimestral",
      name: "Plano Trimestral",
      period: "3 meses",
      price: "",
      priceDisplay: "Consulte valor",
      priceSubtext: "condição promocional",
      isFixedPrice: false,
      badge: "Consulte a condição promocional",
      active: true,
      featured: false,
      buttonText: "QUERO O TRIMESTRAL",
      benefits: [
        "Acesso por 90 dias (3 meses)",
        "Condições promocionais exclusivas para o período",
        "Suporte direto pelo WhatsApp",
        "Acompanhamento da nossa equipe para configuração"
      ],
      whatsappMessage: "Olá! Vim pelo site Pizza Cine e gostaria de informações sobre a condição promocional do plano trimestral de 3 meses."
    },
    {
      id: "semestral",
      name: "Plano Semestral",
      period: "6 meses",
      price: "",
      priceDisplay: "Consulte valor",
      priceSubtext: "condição semestral",
      isFixedPrice: false,
      badge: "Semestral",
      active: true,
      featured: false,
      buttonText: "QUERO O SEMESTRAL",
      benefits: [
        "Acesso por 180 dias (6 meses)",
        "Benefícios e eventuais aplicativos adicionais sob consulta",
        "Atendimento contínuo pelo canal oficial",
        "Orientações completas de instalação e uso"
      ],
      whatsappMessage: "Olá! Vim pelo site Pizza Cine e gostaria de informações sobre benefícios e valores do plano semestral de 6 meses."
    },
    {
      id: "anual",
      name: "Plano Anual",
      period: "12 meses",
      price: "",
      priceDisplay: "Consulte valor",
      priceSubtext: "condição anual exclusiva",
      isFixedPrice: false,
      badge: "Experiência Premium",
      active: true,
      featured: true,
      buttonText: "QUERO O ANUAL",
      benefits: [
        "Acesso contínuo por 12 meses completos",
        "Condição anual diferenciada e opções de pagamento sob consulta",
        "Suporte prioritário via WhatsApp durante todo o período",
        "Tranquilidade sem renovações mensais"
      ],
      whatsappMessage: "Olá! Vim pelo site Pizza Cine e gostaria de informações sobre o preço anual e as condições de pagamento do plano de 12 meses."
    }
  ],
  categories: [
    {
      id: "filmes",
      title: "FILMES",
      description: "Descubra opções de filmes para diferentes gostos e momentos.",
      image: "/src/assets/images/feature_movies_1791503021628.jpg"
    },
    {
      id: "series",
      title: "SÉRIES",
      description: "Explore histórias, temporadas e diferentes gêneros de entretenimento.",
      image: "/src/assets/images/feature_series_1791503030820.jpg"
    },
    {
      id: "canais",
      title: "CANAIS DE TV",
      description: "Conheça as opções de canais e programação disponíveis na plataforma.",
      image: "/src/assets/images/feature_channels_1791503044186.jpg"
    }
  ],
  benefits: [
    {
      id: "simples",
      title: "EXPERIÊNCIA SIMPLES",
      description: "Encontre informações sobre o serviço e conheça as opções de assinatura.",
      icon: "Sparkles"
    },
    {
      id: "planos",
      title: "PLANOS PARA VOCÊ",
      description: "Compare as opções e escolha o plano que melhor atende às suas necessidades.",
      icon: "Layers"
    },
    {
      id: "atendimento",
      title: "ATENDIMENTO DIRETO",
      description: "Tire suas dúvidas e fale diretamente com nossa equipe pelo WhatsApp.",
      icon: "MessageSquare"
    },
    {
      id: "acesso",
      title: "ACESSO ORIENTADO",
      description: "Receba as informações necessárias para contratar e utilizar o serviço oferecido.",
      icon: "ShieldCheck"
    }
  ],
  faq: [
    {
      id: "faq-1",
      question: "O que é o Pizza Cine?",
      answer: "O Pizza Cine é uma plataforma de entretenimento pensada para quem valoriza momentos de lazer com qualidade. Reunimos opções diversificadas de filmes, séries e canais de TV em um ambiente prático e acessível."
    },
    {
      id: "faq-2",
      question: "Como faço para assinar?",
      answer: "Basta escolher o plano ideal nesta página e clicar no botão correspondente. Você será direcionado para o nosso WhatsApp oficial (11 97347-9473), onde nossa equipe passará todas as instruções para contratação e ativação."
    },
    {
      id: "faq-3",
      question: "Quais são os planos disponíveis?",
      answer: "Oferecemos 4 modalidades: Plano Mensal (R$ 39,99/mês), Plano Trimestral (3 meses), Plano Semestral (6 meses) e Plano Anual (12 meses). As condições promocionais dos planos trimestral, semestral e anual podem ser consultadas diretamente pelo WhatsApp."
    },
    {
      id: "faq-4",
      question: "Como funciona o pagamento?",
      answer: "As formas e condições de pagamento são combinadas diretamente durante o atendimento no WhatsApp, com confirmação rápida e segura via Pix e outras opções disponibilizadas pela equipe."
    },
    {
      id: "faq-5",
      question: "Como recebo as instruções de acesso?",
      answer: "Após a escolha do plano e confirmação do pagamento, você recebe imediatamente no seu WhatsApp um guia de instruções com o passo a passo completo para configurar e começar a utilizar o serviço."
    },
    {
      id: "faq-6",
      question: "Quais dispositivos são compatíveis?",
      answer: "O suporte pode variar conforme o seu equipamento (Smart TVs, computadores, celulares ou TV boxes). Por isso, orientamos que confirme a compatibilidade do seu dispositivo com nossa equipe antes ou durante a contratação."
    },
    {
      id: "faq-7",
      question: "Como entro em contato com o suporte?",
      answer: "Nosso canal oficial de atendimento e suporte é o WhatsApp (11) 97347-9473. Atendemos todos os dias para esclarecer dúvidas e auxiliar clientes."
    }
  ]
};

/**
 * Normalizes phone number and returns official WhatsApp link
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  // Prepend 55 (Brazil country code) if not already included
  const fullPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Resolves destination URL for the Test Button
 */
export function resolveTestActionUrl(
  testAction?: { destinationType: 'whatsapp' | 'url'; destinationUrl: string; whatsappMessage: string },
  whatsappNumber: string = "11973479473"
): string {
  if (!testAction) {
    return buildWhatsAppUrl(whatsappNumber, "Olá! Vim pelo site Pizza Cine e gostaria de solicitar um teste.");
  }
  if (testAction.destinationType === 'url' && testAction.destinationUrl) {
    return testAction.destinationUrl;
  }
  return buildWhatsAppUrl(
    whatsappNumber,
    testAction.whatsappMessage || "Olá! Vim pelo site Pizza Cine e gostaria de solicitar um teste."
  );
}

/**
 * Formats a Brazilian phone number nicely: (11) 97347-9473
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const clean = phoneNumber.replace(/\D/g, "");
  // Strip 55 if present for display formatting
  const local = clean.startsWith("55") && clean.length > 10 ? clean.slice(2) : clean;
  if (local.length === 11) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  if (local.length === 10) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return phoneNumber;
}
