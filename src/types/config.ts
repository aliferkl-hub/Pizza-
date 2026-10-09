export interface Plan {
  id: string;
  name: string;
  period: string;
  price: string;
  priceDisplay: string;
  priceSubtext: string;
  isFixedPrice: boolean;
  badge?: string;
  active: boolean;
  featured: boolean;
  buttonText: string;
  benefits: string[];
  whatsappMessage: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  type: 'movie' | 'series' | 'channel';
  genres: string[];
  year: number;
  rating?: string;
  durationOrSeasons?: string;
  synopsis: string;
  posterUrl: string;
  bannerUrl?: string;
  featured?: boolean;
  isPopular?: boolean;
  isRelease?: boolean;
  isNational?: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
}

export interface TestAction {
  enabled: boolean;
  buttonText: string;
  destinationType: 'whatsapp' | 'url';
  destinationUrl: string;
  whatsappMessage: string;
}

export interface ShareConfig {
  shareTitle: string;
  shareMessage: string;
  promoText: string;
}

export interface Announcement {
  enabled: boolean;
  text: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  subtitle: string;
  heroImage: string;
  whatsappNumber: string;
  whatsappGreeting: string;
  testAction: TestAction;
  shareConfig: ShareConfig;
  socialLinks: SocialLinks;
  announcement: Announcement;
  plans: Plan[];
  categories: Category[];
  benefits: Benefit[];
  faq: FAQItem[];
  mediaCatalog?: MediaItem[];
}

export interface AuthSession {
  token: string;
  username: string;
  authenticatedAt: string;
}
