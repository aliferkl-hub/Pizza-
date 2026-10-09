import React, { useState, useEffect } from 'react';
import { 
  X, Lock, LogOut, Save, RotateCcw, Eye, EyeOff, Plus, Trash2, 
  CheckCircle, AlertCircle, Phone, DollarSign, Layers, HelpCircle, 
  Megaphone, Image as ImageIcon, Share2, Sparkles, ExternalLink
} from 'lucide-react';
import { SiteConfig, Plan, FAQItem } from '../types/config';
import { DEFAULT_SITE_CONFIG, buildWhatsAppUrl, formatPhoneNumber } from '../config/defaultConfig';
import { loginAdmin, verifyAuthToken, getStoredAuthToken, setStoredAuthToken, saveSiteConfig } from '../services/configService';

interface AdminPanelProps {
  isOpen: boolean;
  currentConfig: SiteConfig;
  onClose: () => void;
  onConfigUpdated: (newConfig: SiteConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  currentConfig,
  onClose,
  onConfigUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'plans' | 'testAction' | 'share' | 'whatsapp' | 'announcement' | 'categories' | 'faq' | 'social'>('plans');

  // Working copy of config
  const [configDraft, setConfigDraft] = useState<SiteConfig>(currentConfig);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync draft when opened or updated
  useEffect(() => {
    setConfigDraft(JSON.parse(JSON.stringify(currentConfig)));
  }, [currentConfig, isOpen]);

  // Check existing session
  useEffect(() => {
    const token = getStoredAuthToken();
    if (token) {
      verifyAuthToken(token).then((valid) => {
        if (valid) {
          setIsAuthenticated(true);
          setAuthToken(token);
        } else {
          setStoredAuthToken(null);
          setIsAuthenticated(false);
          setAuthToken(null);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const res = await loginAdmin(username, password);
    setIsLoggingIn(false);

    if (res.success && res.token) {
      setIsAuthenticated(true);
      setAuthToken(res.token);
      setUsername('');
      setPassword('');
    } else {
      setLoginError(res.error || 'Credenciais inválidas. Verifique seu usuário e senha.');
    }
  };

  const handleLogout = () => {
    setStoredAuthToken(null);
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const res = await saveSiteConfig(configDraft, authToken || undefined);
    setIsSaving(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      onConfigUpdated(configDraft);
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza que deseja restaurar todas as configurações para o padrão inicial?')) {
      const reset = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
      setConfigDraft(reset);
      setStatusMessage({ type: 'success', text: 'Configurações resetadas no rascunho. Clique em Salvar para publicar.' });
    }
  };

  // Helper for Plan editing
  const updatePlan = (planId: string, updates: Partial<Plan>) => {
    setConfigDraft(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === planId ? { ...p, ...updates } : p)
    }));
  };

  const addBenefitToPlan = (planId: string) => {
    setConfigDraft(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          return { ...p, benefits: [...p.benefits, 'Novo benefício do plano'] };
        }
        return p;
      })
    }));
  };

  const updateBenefit = (planId: string, index: number, value: string) => {
    setConfigDraft(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const next = [...p.benefits];
          next[index] = value;
          return { ...p, benefits: next };
        }
        return p;
      })
    }));
  };

  const removeBenefit = (planId: string, index: number) => {
    setConfigDraft(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          return { ...p, benefits: p.benefits.filter((_, i) => i !== index) };
        }
        return p;
      })
    }));
  };

  // Helper for FAQ editing
  const addFaqItem = () => {
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: 'Nova pergunta frequente?',
      answer: 'Resposta explicativa clara e transparente para o cliente.'
    };
    setConfigDraft(prev => ({
      ...prev,
      faq: [...prev.faq, newItem]
    }));
  };

  const updateFaqItem = (id: string, updates: Partial<FAQItem>) => {
    setConfigDraft(prev => ({
      ...prev,
      faq: prev.faq.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const removeFaqItem = (id: string) => {
    setConfigDraft(prev => ({
      ...prev,
      faq: prev.faq.filter(item => item.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl bg-[#11111B] border border-[#292536] shadow-2xl flex flex-col text-white overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#09090F] border-b border-[#292536] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7928CA]/20 border border-[#7928CA]/40 flex items-center justify-center text-[#C084FC]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                Painel Administrativo — Pizza Cine
              </h2>
              <p className="text-xs text-[#A1A1AA]">
                Gerenciamento seguro de planos, preços, WhatsApp e conteúdos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-[#171722] hover:bg-[#292536] text-[#A1A1AA] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#292536]"
                title="Sair do painel administrativo"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desconectar</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#171722] transition-colors cursor-pointer"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#7928CA]/20 border border-[#7928CA]/40 text-[#C084FC] flex items-center justify-center mx-auto mb-6 glow-purple-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Acesso Restrito
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6">
              Informe as credenciais de administrador para acessar o painel de gerenciamento.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Usuário
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-sm text-white focus:outline-none focus:border-[#7928CA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-sm text-white focus:outline-none focus:border-[#7928CA]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] text-white text-sm font-bold shadow-lg shadow-purple-950/60 hover:from-[#9333EA] hover:to-[#C084FC] transition-all cursor-pointer disabled:opacity-50 mt-2 glow-purple-sm"
              >
                {isLoggingIn ? 'Autenticando...' : 'Acessar Painel'}
              </button>
            </form>

            <p className="text-[11px] text-[#A1A1AA] mt-6">
              Acesso protegido com autenticação e persistência de dados no servidor.
            </p>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-60 bg-[#09090F] p-3 border-r border-[#292536] flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('plans')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'plans' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Preços & Planos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('testAction')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'testAction' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Botão de Teste</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('share')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'share' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Compartilhamento</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'whatsapp' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Oficial</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('announcement')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'announcement' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>Avisos & Cabeçalho</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'categories' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Imagens & Catálogo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'faq' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Perguntas (FAQ)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('social')}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'social' ? 'bg-[#7928CA] text-white shadow-md shadow-purple-950/60 glow-purple-sm' : 'text-[#A1A1AA] hover:bg-[#171722] hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Redes Sociais</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
              
              {/* Notification Banner */}
              {statusMessage && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm ${
                  statusMessage.type === 'success' 
                    ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300' 
                    : 'bg-red-950/70 border border-red-800 text-red-300'
                }`}>
                  {statusMessage.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* TAB 1: PLANS & PRICING */}
              {activeTab === 'plans' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Gerenciamento de Planos e Preços
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Configure valores, textos promocionais, status ativo/inativo e mensagens de WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {configDraft.plans.map((plan) => (
                      <div 
                        key={plan.id}
                        className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#292536]">
                          <div className="flex items-center gap-3">
                            <span className="font-display font-bold text-white text-base">
                              {plan.name} ({plan.period})
                            </span>
                            {plan.id === 'mensal' && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-[#7928CA]/20 text-[#C084FC] border border-[#7928CA]/40 font-semibold">
                                Preço base fixado: R$ 39,99
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 text-xs text-[#A1A1AA] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={plan.active}
                                onChange={(e) => updatePlan(plan.id, { active: e.target.checked })}
                                className="rounded text-[#7928CA] focus:ring-[#7928CA]"
                              />
                              <span>Plano Ativo no Site</span>
                            </label>

                            <label className="flex items-center gap-2 text-xs text-[#A1A1AA] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={plan.featured}
                                onChange={(e) => updatePlan(plan.id, { featured: e.target.checked })}
                                className="rounded text-[#7928CA] focus:ring-[#7928CA]"
                              />
                              <span>Destaque Premium</span>
                            </label>
                          </div>
                        </div>

                        {/* Fields Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                              Valor Numérico (ex: 39,99 ou vazio)
                            </label>
                            <input
                              type="text"
                              value={plan.price}
                              onChange={(e) => updatePlan(plan.id, { price: e.target.value })}
                              placeholder={plan.id === 'mensal' ? '39,99' : 'Deixe vazio se for sob consulta'}
                              className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                              Texto de Exibição do Preço
                            </label>
                            <input
                              type="text"
                              value={plan.priceDisplay}
                              onChange={(e) => updatePlan(plan.id, { priceDisplay: e.target.value })}
                              placeholder="Ex: R$ 39,99 ou Consulte valor"
                              className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                              Selo / Badge Promocional
                            </label>
                            <input
                              type="text"
                              value={plan.badge || ''}
                              onChange={(e) => updatePlan(plan.id, { badge: e.target.value })}
                              placeholder="Ex: Consulte a condição promocional"
                              className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                            />
                          </div>
                        </div>

                        {/* WhatsApp Message for Plan */}
                        <div>
                          <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                            Mensagem Automática ao clicar no botão do WhatsApp
                          </label>
                          <textarea
                            rows={2}
                            value={plan.whatsappMessage}
                            onChange={(e) => updatePlan(plan.id, { whatsappMessage: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>

                        {/* Benefits list */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[#A1A1AA]">
                              Benefícios listados no cartão ({plan.benefits.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => addBenefitToPlan(plan.id)}
                              className="text-xs text-[#C084FC] hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" /> Adicionar benefício
                            </button>
                          </div>
                          <div className="space-y-2">
                            {plan.benefits.map((b, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={b}
                                  onChange={(e) => updateBenefit(plan.id, bIdx, e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeBenefit(plan.id, bIdx)}
                                  className="p-1.5 text-[#A1A1AA] hover:text-red-400 cursor-pointer"
                                  title="Remover benefício"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: TEST ACTION ("Para um teste conosco clique aqui") */}
              {activeTab === 'testAction' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#C084FC]" />
                      <span>Configuração do Botão de Teste</span>
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Configure a exibição, o texto e o destino do botão de solicitação de teste gratuito ou demonstração.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4 max-w-2xl">
                    <label className="flex items-center gap-2 text-sm text-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={configDraft.testAction?.enabled ?? true}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          testAction: { ...prev.testAction, enabled: e.target.checked }
                        }))}
                        className="rounded text-[#7928CA] focus:ring-[#7928CA]"
                      />
                      <span className="font-semibold text-white">Exibir botão de teste no topo e na página inicial</span>
                    </label>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Texto do Botão
                      </label>
                      <input
                        type="text"
                        value={configDraft.testAction?.buttonText || ''}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          testAction: { ...prev.testAction, buttonText: e.target.value }
                        }))}
                        placeholder="Para um teste conosco clique aqui"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-2">
                        Tipo de Destino ao Clicar
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setConfigDraft(prev => ({
                            ...prev,
                            testAction: { ...prev.testAction, destinationType: 'whatsapp' }
                          }))}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                            configDraft.testAction?.destinationType === 'whatsapp'
                              ? 'bg-[#11111B] border-[#7928CA] text-[#C084FC] shadow-sm'
                              : 'bg-[#09090F] border-[#292536] text-[#A1A1AA] hover:text-white'
                          }`}
                        >
                          <span className="block font-bold text-white mb-0.5">1. Conversa no WhatsApp</span>
                          <span>Abre conversa com mensagem personalizada no número comercial oficial.</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfigDraft(prev => ({
                            ...prev,
                            testAction: { ...prev.testAction, destinationType: 'url' }
                          }))}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                            configDraft.testAction?.destinationType === 'url'
                              ? 'bg-[#11111B] border-[#7928CA] text-[#C084FC] shadow-sm'
                              : 'bg-[#09090F] border-[#292536] text-[#A1A1AA] hover:text-white'
                          }`}
                        >
                          <span className="block font-bold text-white mb-0.5">2. Link / URL Externa</span>
                          <span>Redireciona para um formulário externo, site ou sistema personalizado.</span>
                        </button>
                      </div>
                    </div>

                    {configDraft.testAction?.destinationType === 'whatsapp' ? (
                      <div>
                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                          Mensagem Automática para Solicitar Teste
                        </label>
                        <textarea
                          rows={2}
                          value={configDraft.testAction?.whatsappMessage || ''}
                          onChange={(e) => setConfigDraft(prev => ({
                            ...prev,
                            testAction: { ...prev.testAction, whatsappMessage: e.target.value }
                          }))}
                          placeholder="Olá! Vim pelo site Pizza Cine e gostaria de solicitar um teste para conhecer o serviço."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                          URL de Destino Completa (com https://)
                        </label>
                        <input
                          type="url"
                          value={configDraft.testAction?.destinationUrl || ''}
                          onChange={(e) => setConfigDraft(prev => ({
                            ...prev,
                            testAction: { ...prev.testAction, destinationUrl: e.target.value }
                          }))}
                          placeholder="https://exemplo.com/solicitar-teste"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white font-mono focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#292536] flex items-center justify-between">
                      <span className="text-xs text-[#A1A1AA]">Verifique o funcionamento do destino:</span>
                      <a
                        href={
                          configDraft.testAction?.destinationType === 'url' && configDraft.testAction?.destinationUrl
                            ? configDraft.testAction.destinationUrl
                            : buildWhatsAppUrl(
                                configDraft.whatsappNumber,
                                configDraft.testAction?.whatsappMessage || 'Olá! Vim pelo site Pizza Cine e gostaria de solicitar um teste.'
                              )
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#09090F] hover:bg-[#11111B] text-[#C084FC] hover:text-white text-xs font-semibold border border-[#292536] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Testar Destino do Botão</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: COMPARTILHAMENTO & DIVULGAÇÃO */}
              {activeTab === 'share' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-[#C084FC]" />
                      <span>Configurações de Compartilhamento</span>
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Personalize os textos enviados ao compartilhar o Pizza Cine no WhatsApp, Facebook, Instagram e TikTok.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Título do Compartilhamento (Redes e Meta tags)
                      </label>
                      <input
                        type="text"
                        value={configDraft.shareConfig?.shareTitle || ''}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          shareConfig: { ...prev.shareConfig, shareTitle: e.target.value }
                        }))}
                        placeholder="Pizza Cine | Conheça nossos planos de entretenimento"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Mensagem Principal de Divulgação
                      </label>
                      <textarea
                        rows={3}
                        value={configDraft.shareConfig?.shareMessage || ''}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          shareConfig: { ...prev.shareConfig, shareMessage: e.target.value }
                        }))}
                        placeholder="Conheça o Pizza Cine e descubra uma nova maneira de aproveitar o entretenimento com filmes, séries e canais de TV!"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Texto Promocional Completo (para Stories e Legendas)
                      </label>
                      <textarea
                        rows={2}
                        value={configDraft.shareConfig?.promoText || ''}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          shareConfig: { ...prev.shareConfig, promoText: e.target.value }
                        }))}
                        placeholder="🔥 Acesse o Pizza Cine e aproveite o melhor do entretenimento. Planos a partir de R$ 39,99/mês. Fale conosco no WhatsApp!"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#11111B] border border-[#292536] text-xs text-[#A1A1AA] space-y-2">
                      <span className="font-bold text-[#C084FC] block">Comportamento dos Botões nas Redes:</span>
                      <p>• <strong>WhatsApp:</strong> Abre conversa com o texto e o link prontos para envio.</p>
                      <p>• <strong>Facebook:</strong> Abre o compartilhador oficial do Facebook.</p>
                      <p>• <strong>Instagram:</strong> Copia o texto com o link e abre o Instagram para publicar em Stories ou Bio.</p>
                      <p>• <strong>TikTok:</strong> Copia o texto com o link e abre o TikTok para colar na descrição do vídeo ou perfil.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WHATSAPP */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Configuração do WhatsApp Comercial
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Atualize o número oficial de atendimento utilizado em todos os links e botões do site.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Número Comercial (com DDD, somente dígitos)
                      </label>
                      <input
                        type="text"
                        value={configDraft.whatsappNumber}
                        onChange={(e) => setConfigDraft(prev => ({ ...prev, whatsappNumber: e.target.value.replace(/\D/g, '') }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-sm text-white font-mono focus:outline-none focus:border-[#7928CA]"
                        placeholder="11973479473"
                      />
                      <p className="text-xs text-[#A1A1AA] mt-1">
                        Formatação exibida: <span className="font-semibold text-white">{formatPhoneNumber(configDraft.whatsappNumber)}</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Saudação Padrão do Contato
                      </label>
                      <input
                        type="text"
                        value={configDraft.whatsappGreeting}
                        onChange={(e) => setConfigDraft(prev => ({ ...prev, whatsappGreeting: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div className="pt-2">
                      <span className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Pré-visualização do Link Oficial:
                      </span>
                      <a
                        href={buildWhatsAppUrl(configDraft.whatsappNumber, configDraft.whatsappGreeting)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-400 hover:underline break-all font-mono"
                      >
                        {buildWhatsAppUrl(configDraft.whatsappNumber, configDraft.whatsappGreeting)}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ANNOUNCEMENT & TEXTS */}
              {activeTab === 'announcement' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Avisos Comerciais e Cabeçalho
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Personalize a barra de aviso superior e os títulos principais.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4">
                    <label className="flex items-center gap-2 text-sm text-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={configDraft.announcement.enabled}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, enabled: e.target.checked }
                        }))}
                        className="rounded text-[#7928CA] focus:ring-[#7928CA]"
                      />
                      <span className="font-semibold text-white">Exibir faixa de aviso comercial no topo do site</span>
                    </label>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                        Texto da Faixa de Aviso
                      </label>
                      <input
                        type="text"
                        value={configDraft.announcement.text}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, text: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div className="pt-4 border-t border-[#292536] space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                          Título Principal da Página (Hero Tagline)
                        </label>
                        <input
                          type="text"
                          value={configDraft.tagline}
                          onChange={(e) => setConfigDraft(prev => ({ ...prev, tagline: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">
                          Subtítulo Principal da Página
                        </label>
                        <textarea
                          rows={2}
                          value={configDraft.subtitle}
                          onChange={(e) => setConfigDraft(prev => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CATEGORIES & IMAGES */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Imagens da Página e Catálogo
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Edite a imagem de fundo principal e as imagens dos 3 cartões do catálogo (Filmes, Séries, Canais).
                    </p>
                  </div>

                  {/* Hero Background Image */}
                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-3">
                    <span className="text-xs font-bold text-[#C084FC] uppercase tracking-wider block">
                      Imagem de Fundo do Banner Principal (Hero)
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">
                        Caminho ou URL da Imagem de Fundo
                      </label>
                      <input
                        type="text"
                        value={configDraft.heroImage || ''}
                        onChange={(e) => setConfigDraft(prev => ({ ...prev, heroImage: e.target.value }))}
                        placeholder="/src/assets/images/hero_cinema_dark_1791503011994.jpg"
                        className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white font-mono focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>
                    {configDraft.heroImage && (
                      <div className="pt-1">
                        <span className="text-[11px] text-[#A1A1AA]">Miniatura atual:</span>
                        <div className="mt-1.5 h-20 w-44 rounded-lg overflow-hidden border border-[#292536] bg-[#09090F]">
                          <img
                            src={configDraft.heroImage}
                            alt="Pré-visualização do Hero"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {configDraft.categories.map((cat, idx) => (
                      <div key={cat.id} className="p-4 rounded-xl bg-[#171722] border border-[#292536] space-y-3">
                        <span className="text-xs font-bold text-[#C084FC] uppercase tracking-wider block">
                          Cartão {idx + 1} — {cat.title}
                        </span>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">Título</label>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => {
                              const next = [...configDraft.categories];
                              next[idx] = { ...cat, title: e.target.value };
                              setConfigDraft(prev => ({ ...prev, categories: next }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">Descrição</label>
                          <textarea
                            rows={3}
                            value={cat.description}
                            onChange={(e) => {
                              const next = [...configDraft.categories];
                              next[idx] = { ...cat, description: e.target.value };
                              setConfigDraft(prev => ({ ...prev, categories: next }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">Caminho da Imagem</label>
                          <input
                            type="text"
                            value={cat.image}
                            onChange={(e) => {
                              const next = [...configDraft.categories];
                              next[idx] = { ...cat, image: e.target.value };
                              setConfigDraft(prev => ({ ...prev, categories: next }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white font-mono text-[11px] focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: FAQ */}
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        Perguntas Frequentes (FAQ)
                      </h3>
                      <p className="text-xs text-[#A1A1AA]">
                        Adicione, edite ou exclua dúvidas dos visitantes.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addFaqItem}
                      className="px-3.5 py-2 rounded-xl bg-[#7928CA] hover:bg-[#9333EA] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md glow-purple-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nova Pergunta</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {configDraft.faq.map((item, idx) => (
                      <div key={item.id} className="p-4 rounded-xl bg-[#171722] border border-[#292536] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#C084FC]">#{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeFaqItem(item.id)}
                            className="text-[#A1A1AA] hover:text-red-400 p-1 cursor-pointer transition-colors"
                            title="Excluir pergunta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">Pergunta</label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => updateFaqItem(item.id, { question: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#A1A1AA] mb-1">Resposta</label>
                          <textarea
                            rows={3}
                            value={item.answer}
                            onChange={(e) => updateFaqItem(item.id, { answer: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SOCIAL */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Links das Redes Sociais
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Atualize os links oficiais de divulgação.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#171722] border border-[#292536] space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">Instagram</label>
                      <input
                        type="url"
                        value={configDraft.socialLinks.instagram}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">Facebook</label>
                      <input
                        type="url"
                        value={configDraft.socialLinks.facebook}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] mb-1">TikTok</label>
                      <input
                        type="url"
                        value={configDraft.socialLinks.tiktok}
                        onChange={(e) => setConfigDraft(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, tiktok: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-[#292536] text-xs text-white focus:outline-none focus:border-[#7928CA]"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Bottom Footer Actions (when authenticated) */}
        {isAuthenticated && (
          <div className="p-4 sm:p-5 bg-[#09090F] border-t border-[#292536] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3.5 py-2 rounded-xl bg-[#171722] hover:bg-[#292536] text-[#A1A1AA] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#292536]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrões</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#171722] hover:bg-[#292536] text-xs font-semibold text-white transition-colors cursor-pointer border border-[#292536]"
              >
                Fechar Painel
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#C084FC] hover:from-[#9333EA] hover:to-[#C084FC] text-white text-xs font-bold shadow-lg shadow-purple-950/60 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 glow-purple-sm"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Salvando...' : 'Salvar e Publicar'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
