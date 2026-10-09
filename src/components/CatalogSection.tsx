import React, { useState, useMemo } from 'react';
import { 
  Film, Tv, Search, Filter, Play, Info, Sparkles, Star, 
  Calendar, Clock, ShieldAlert, Check, X, ChevronRight, Layers
} from 'lucide-react';
import { MediaItem } from '../types/config';
import { INITIAL_CATALOG, ALL_GENRES } from '../config/catalogData';

interface CatalogSectionProps {
  catalog?: MediaItem[];
  whatsappNumber: string;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ 
  catalog = INITIAL_CATALOG,
  whatsappNumber 
}) => {
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series' | 'channel'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Error fallback handler
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return catalog.filter(item => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Genre filter
      if (selectedGenre !== 'Todos' && !item.genres.includes(selectedGenre)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesOrig = item.originalTitle?.toLowerCase().includes(query) ?? false;
        const matchesGenre = item.genres.some(g => g.toLowerCase().includes(query));
        if (!matchesTitle && !matchesOrig && !matchesGenre) {
          return false;
        }
      }
      return true;
    });
  }, [catalog, selectedType, selectedGenre, searchQuery]);

  // Featured and Releases rows
  const featuredMovies = useMemo(() => catalog.filter(m => m.type === 'movie' && (m.featured || m.isPopular)), [catalog]);
  const popularSeries = useMemo(() => catalog.filter(m => m.type === 'series' && m.isPopular), [catalog]);
  const tvChannels = useMemo(() => catalog.filter(m => m.type === 'channel'), [catalog]);

  const handleOpenMedia = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  return (
    <section id="filmes" className="py-20 sm:py-28 bg-[#09090F] border-t border-[#292536] relative overflow-hidden">
      {/* Ambient Neon Purple Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#7928CA]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-[#9333EA]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171722] border border-[#7928CA]/40 text-xs font-semibold text-[#C084FC] mb-4 glow-purple-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>Universo Cinematográfico Pizza Cine</span>
          </div>
          <h2 
            style={{ textWrap: 'balance' }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase"
          >
            CATÁLOGO EM DESTAQUE
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
            Consulte opções de filmes renomados, séries aclamadas e canais de televisão disponíveis para os assinantes da plataforma.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div id="generos" className="mb-12 p-4 sm:p-6 rounded-2xl bg-[#11111B] border border-[#292536] shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título ou gênero..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171722] border border-[#292536] text-xs sm:text-sm text-white placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#7928CA] focus:ring-1 focus:ring-[#7928CA] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#171722] rounded-xl border border-[#292536] w-full md:w-auto overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/40'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('movie')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'movie'
                    ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/40'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Filmes
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('series')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'series'
                    ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/40'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Séries
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('channel')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === 'channel'
                    ? 'bg-[#7928CA] text-white shadow-md shadow-purple-900/40'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Canais de TV
              </button>
            </div>
          </div>

          {/* Genre Chips Carousel */}
          <div className="mt-4 pt-4 border-t border-[#292536] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#C084FC]" />
              Gêneros:
            </span>
            {ALL_GENRES.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedGenre === genre
                    ? 'bg-[#9333EA]/20 border-[#C084FC] text-[#C084FC]'
                    : 'bg-[#171722] border-[#292536] text-[#A1A1AA] hover:text-white hover:border-[#7928CA]/50'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Search / Filtered Results Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
              <span>
                {selectedGenre !== 'Todos' ? `Gênero: ${selectedGenre}` : selectedType === 'movie' ? 'Filmes' : selectedType === 'series' ? 'Séries' : selectedType === 'channel' ? 'Canais' : 'Títulos e Canais'}
              </span>
              <span className="text-xs font-normal text-[#A1A1AA]">
                ({filteredItems.length} {filteredItems.length === 1 ? 'encontrado' : 'encontrados'})
              </span>
            </h3>
          </div>

          {filteredItems.length === 0 ? (
            /* Elegant Empty State */
            <div className="p-12 rounded-2xl bg-[#171722] border border-[#292536] text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-xl bg-[#292536] flex items-center justify-center mx-auto mb-4 text-[#C084FC]">
                <Film className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-white text-base mb-1">
                Nenhum título encontrado
              </h4>
              <p className="text-xs text-[#A1A1AA] mb-4">
                Não localizamos itens para a combinação de busca e filtros selecionada.
              </p>
              <button
                type="button"
                onClick={() => { setSelectedType('all'); setSelectedGenre('Todos'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-[#7928CA] text-white text-xs font-semibold hover:bg-[#9333EA] transition-colors cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            /* Cards Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredItems.map((item) => {
                const hasError = imageErrors[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenMedia(item)}
                    className="group relative rounded-xl bg-[#171722] border border-[#292536] hover:border-[#7928CA] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#7928CA]/20 flex flex-col"
                  >
                    {/* Media Poster Container */}
                    <div className="relative aspect-[2/3] w-full bg-[#11111B] overflow-hidden">
                      {!hasError ? (
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(item.id)}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Elegant Placeholder */
                        <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#171722] to-[#11111B]">
                          <Film className="w-8 h-8 text-[#C084FC]/60 mb-2" />
                          <span className="text-[11px] font-bold text-white line-clamp-2">{item.title}</span>
                          <span className="text-[10px] text-[#A1A1AA] mt-1">{item.year}</span>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {item.type === 'channel' ? (
                          <span className="px-1.5 py-0.5 rounded bg-[#7928CA] text-[10px] font-bold text-white uppercase tracking-wider border border-[#C084FC]/30">
                            AO VIVO
                          </span>
                        ) : item.isRelease ? (
                          <span className="px-1.5 py-0.5 rounded bg-[#9333EA] text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                            LANÇAMENTO
                          </span>
                        ) : null}
                      </div>

                      {/* Rating Badge */}
                      {item.rating && (
                        <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#292536] text-[10px] font-bold text-neutral-300">
                          {item.rating}
                        </div>
                      )}

                      {/* Hover Overlay with Quick Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-[#09090F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <span className="text-[11px] text-[#C084FC] font-semibold mb-1 flex items-center gap-1">
                          <Info className="w-3 h-3" /> Ver detalhes
                        </span>
                        <p className="text-[10px] text-neutral-300 line-clamp-3 leading-snug">
                          {item.synopsis}
                        </p>
                      </div>
                    </div>

                    {/* Meta info below poster */}
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-[#C084FC] transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#A1A1AA]">
                          <span>{item.year}</span>
                          <span>•</span>
                          <span className="line-clamp-1">{item.genres[0] || 'Geral'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Highlights Row: Séries Populares */}
        {selectedType === 'all' && (
          <div id="series" className="mb-14 pt-8 border-t border-[#292536]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                  <Tv className="w-5 h-5 text-[#C084FC]" />
                  <span>Séries em Evidência</span>
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Temporadas completas e episódios aclamados disponíveis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedType('series')}
                className="text-xs font-semibold text-[#C084FC] hover:underline flex items-center gap-1"
              >
                Ver todas <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {popularSeries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenMedia(item)}
                  className="rounded-xl bg-[#171722] border border-[#292536] hover:border-[#7928CA] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/40"
                >
                  <div className="aspect-[2/3] w-full bg-[#11111B] overflow-hidden relative">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#7928CA] text-[10px] font-bold text-white uppercase">
                      {item.durationOrSeasons}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1">{item.title}</h4>
                    <span className="text-[11px] text-[#A1A1AA] mt-0.5 block">{item.year} • {item.genres[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights Row: Canais de Televisão */}
        {selectedType === 'all' && (
          <div id="canais" className="pt-8 border-t border-[#292536]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#C084FC]" />
                  <span>Programação de Canais de TV</span>
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Transmissões ao vivo, esportes, variedades e cinema direto na sua tela.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedType('channel')}
                className="text-xs font-semibold text-[#C084FC] hover:underline flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {tvChannels.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenMedia(item)}
                  className="rounded-xl bg-[#171722] border border-[#292536] hover:border-[#7928CA] p-4 cursor-pointer transition-all hover:-translate-y-1 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#11111B] border border-[#292536] flex items-center justify-center shrink-0">
                    <Tv className="w-7 h-7 text-[#C084FC]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{item.title}</h4>
                    <span className="text-[11px] text-[#A1A1AA] block">{item.genres.join(' • ')}</span>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-800/40">
                      AO VIVO
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Content Details Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#171722] border border-[#292536] shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
            
            {/* Modal Header with Close button */}
            <button
              type="button"
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero / Backdrop */}
            <div className="relative h-56 sm:h-64 w-full bg-[#11111B] overflow-hidden shrink-0">
              <img
                src={selectedMedia.bannerUrl || selectedMedia.posterUrl}
                alt={selectedMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171722] via-[#171722]/50 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#7928CA] text-white uppercase tracking-wider mb-2 inline-block">
                  {selectedMedia.type === 'movie' ? 'Filme' : selectedMedia.type === 'series' ? 'Série' : 'Canal de TV'}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white drop-shadow">
                  {selectedMedia.title}
                </h3>
                {selectedMedia.originalTitle && selectedMedia.originalTitle !== selectedMedia.title && (
                  <p className="text-xs text-[#A1A1AA] italic">Título original: {selectedMedia.originalTitle}</p>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Metadata tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#A1A1AA]">
                <span className="flex items-center gap-1 font-medium text-white">
                  <Calendar className="w-3.5 h-3.5 text-[#C084FC]" /> {selectedMedia.year}
                </span>
                {selectedMedia.durationOrSeasons && (
                  <span className="flex items-center gap-1 font-medium text-white">
                    <Clock className="w-3.5 h-3.5 text-[#C084FC]" /> {selectedMedia.durationOrSeasons}
                  </span>
                )}
                {selectedMedia.rating && (
                  <span className="px-2 py-0.5 rounded bg-[#292536] text-white font-bold">
                    Classificação: {selectedMedia.rating}
                  </span>
                )}
              </div>

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-1.5">
                {selectedMedia.genres.map((g, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#11111B] border border-[#292536] text-[11px] text-[#C084FC]">
                    {g}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] mb-1.5">Sinopse</h4>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {selectedMedia.synopsis}
                </p>
              </div>

              {/* Commercial Notice */}
              <div className="p-3.5 rounded-xl bg-[#11111B] border border-[#292536] text-xs text-[#A1A1AA] leading-relaxed">
                <span className="text-[#C084FC] font-semibold block mb-0.5">Disponibilidade no Pizza Cine:</span>
                O Pizza Cine apresenta opções de entretenimento digital. A ativação do plano e a orientação de configuração são realizadas diretamente pelo nosso WhatsApp comercial oficial.
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-5 border-t border-[#292536] bg-[#11111B] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-[#A1A1AA] text-center sm:text-left">
                Gostou deste título? Fale conosco para assinar.
              </span>
              <a
                href="#planos"
                onClick={() => setSelectedMedia(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#9333EA] hover:from-[#9333EA] hover:to-[#C084FC] text-white text-xs font-bold transition-all shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VER PLANOS DISPONÍVEIS</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
