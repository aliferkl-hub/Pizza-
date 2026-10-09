/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteConfig } from './types/config';
import { DEFAULT_SITE_CONFIG } from './config/defaultConfig';
import { fetchSiteConfig } from './services/configService';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlatformSection } from './components/PlatformSection';
import { CatalogSection } from './components/CatalogSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PlansSection } from './components/PlansSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ShareModal } from './components/ShareModal';
import { LegalModal } from './components/LegalModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; tab: 'privacy' | 'terms' }>({
    isOpen: false,
    tab: 'privacy',
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load configuration on mount (from API or persistent cache)
  useEffect(() => {
    fetchSiteConfig().then((data) => {
      if (data) {
        setConfig(data);
      }
    });
  }, []);

  const handleConfigUpdated = (newConfig: SiteConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-[#09090F] text-[#FFFFFF] flex flex-col selection:bg-[#7928CA]/30 selection:text-[#C084FC]">
      
      {/* Navigation */}
      <Navbar
        config={config}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection config={config} />

        {/* 2. Platform Section (Filmes, Séries, Canais) */}
        <PlatformSection config={config} />

        {/* 3. Catalog Section (Catálogo Completo em Destaque, Filtros, Busca, Séries & Canais) */}
        <CatalogSection 
          catalog={config.mediaCatalog} 
          whatsappNumber={config.whatsappNumber} 
        />

        {/* 4. Benefits Section (Por que conhecer o Pizza Cine) */}
        <BenefitsSection config={config} />

        {/* 5. Plans Section (Assinaturas: Mensal, Trimestral, Semestral, Anual) */}
        <PlansSection config={config} />

        {/* 6. FAQ Section (Perguntas Frequentes) */}
        <FaqSection config={config} />

        {/* 7. Contact Section (Atendimento WhatsApp) */}
        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenPrivacy={() => setLegalModal({ isOpen: true, tab: 'privacy' })}
        onOpenTerms={() => setLegalModal({ isOpen: true, tab: 'terms' })}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloatingButton whatsappNumber={config.whatsappNumber} />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        shareConfig={config.shareConfig}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Legal Modals (Privacy & Terms) */}
      <LegalModal
        isOpen={legalModal.isOpen}
        initialTab={legalModal.tab}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        currentConfig={config}
        onClose={() => setIsAdminOpen(false)}
        onConfigUpdated={handleConfigUpdated}
      />

    </div>
  );
}
