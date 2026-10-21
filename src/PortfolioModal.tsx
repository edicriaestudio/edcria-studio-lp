import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { X, Filter, Layers, Layout, Grid, Maximize2, ShoppingBag, ArrowUpRight } from 'lucide-react';
import SoundtrackBar from './components/SoundtrackBar';
import WebGLLiquidSurgeButton from './components/WebGLLiquidSurgeButton';
import ModalLoadingFallback from './components/ModalLoadingFallback';

const CheckoutModal = lazy(() => import('./CheckoutModal'));

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForSite?: (templateName?: string) => void;
}

export interface TemplateItem {
  id: string;
  num: string;
  title: string;
  category: 'hero' | 'web' | 'componentes';
  categoryLabel: string;
  tag: string;
  desc: string;
  rating: string;
  likes: number;
  previewUrl: string;
  videoPreview?: string;
  features: string[];
  price?: string;
}

// Lazy Media Renderer that mounts video/image smoothly when in viewport
function LazyTemplateMedia({
  item,
  onOpenPreview,
}: {
  item: TemplateItem;
  onOpenPreview: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '250px 0px 250px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [isVisible, item.videoPreview]);

  return (
    <div
      ref={containerRef}
      onClick={onOpenPreview}
      className="relative w-full h-[280px] sm:h-[320px] overflow-hidden bg-black border-b border-white/10 flex items-center justify-center cursor-pointer group/media"
    >
      {item.videoPreview && isVisible ? (
        <video
          ref={videoRef}
          src={item.videoPreview}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100 pointer-events-none"
        />
      ) : (
        <img
          src={item.previewUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-top filter brightness-[0.92] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        />
      )}

      {/* Hover Inspect Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 backdrop-blur-[2px]">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
          <Maximize2 size={12} className="text-cyan-400" />
          VER DETALHES DO TEMPLATE
        </span>
      </div>

      {/* Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b11] via-transparent to-black/30 pointer-events-none" />

      {/* Badge Tag Top Left */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050b11]/90 border border-cyan-500/40 backdrop-blur-md text-[10px] font-mono text-cyan-300 tracking-wider uppercase flex items-center gap-1.5 z-10">
        <span className="text-zinc-400">#{item.num}</span>
        <span>{item.categoryLabel}</span>
      </div>

      {/* Rating Badge Bottom Right */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#050b11]/90 border border-cyan-500/40 backdrop-blur-md text-[10px] font-mono text-cyan-300 z-10">
        {item.rating}
      </div>
    </div>
  );
}

// 100% Unique, Curated Professional Figma Templates
const templatesData: TemplateItem[] = [
  {
    id: "em-breve",
    num: "01",
    title: "Em Breve - Nova Biblioteca EdCria",
    category: "hero",
    categoryLabel: "CODED TEMPLATE",
    tag: "Studio",
    desc: "Nossos novos templates cinematogroficos e premium UI estuo sendo adicionados ao novo banco de dados. Volte em breve.",
    rating: "5.0 ?????",
    likes: 999,
    previewUrl: "",
    videoPreview: "",
    features: ["React", "Framer Motion", "Tailwind"],
  }
];

export default function PortfolioModal({ isOpen, onClose, onSelectProjectForSite }: PortfolioModalProps) {
  const [filter, setFilter] = useState<'all' | 'hero' | 'web' | 'componentes'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [checkoutTemplate, setCheckoutTemplate] = useState<TemplateItem | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !selectedTemplate && !checkoutTemplate) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, selectedTemplate, checkoutTemplate]);

  if (!isOpen) return null;

  const countHero = templatesData.filter((t) => t.category === 'hero').length;
  const countWeb = templatesData.filter((t) => t.category === 'web').length;
  const countComponentes = templatesData.filter((t) => t.category === 'componentes').length;

  const filteredTemplates = templatesData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050b11]/85 backdrop-blur-3xl transition-opacity duration-300 animate-fadeIn"
      />

      {/* Main Container - Translucent Cyan Frosted Glass matching frontpage */}
      <div className="relative w-full max-w-6xl rounded-3xl border border-cyan-400/40 bg-[#050b11]/95 p-5 sm:p-8 backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] z-10 text-white my-auto flex flex-col gap-6 max-h-[92vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 font-medium">
                EDICRIA STUDIO • {templatesData.length} TEMPLATES FIGMA PROFISSIONAIS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-[450] tracking-tight text-white">
              Biblioteca de Templates
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-3xl">
              Templates Figma profissionais e editáveis, desenvolvidos para criar websites de alto padrão, landing pages cinematográficas e interfaces comerciais de alto impacto.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <SoundtrackBar compact={true} />

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-cyan-200 hover:text-white bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900 transition-all"
              aria-label="Fechar biblioteca"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-cyan-950/30 p-2.5 rounded-2xl border border-cyan-500/30 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'all'
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Filter size={12} /> TODOS ({templatesData.length} TEMPLATES)
            </button>

            <button
              onClick={() => setFilter('hero')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'hero'
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers size={12} /> HERO SECTIONS ({countHero})
            </button>

            <button
              onClick={() => setFilter('web')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'web'
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layout size={12} /> WEBSITES & PÁGINAS ({countWeb})
            </button>

            <button
              onClick={() => setFilter('componentes')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'componentes'
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Grid size={12} /> COMPONENTES & UI KITS ({countComponentes})
            </button>
          </div>

          <span className="text-[11px] font-mono text-cyan-300/70 hidden lg:inline-block pr-2">
            ARQUIVOS .FIG + DESIGN SYSTEM MODULAR PRONTOS PARA USO
          </span>
        </div>

        {/* Optimized Lazy Media Grid - Translucent Cyan Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 py-2">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-cyan-400/30 bg-cyan-950/20 backdrop-blur-3xl hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
            >
              {/* LAZY OPTIMIZED MEDIA FRAME */}
              <LazyTemplateMedia
                item={item}
                onOpenPreview={() => setSelectedTemplate(item)}
              />

              {/* Card Content Body - Translucent Glass */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-transparent">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-cyan-300/80 uppercase tracking-widest block font-medium">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {item.likes} LIKES
                    </span>
                  </div>

                  <h4 className="text-xl font-medium text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {item.num}. {item.title}
                  </h4>

                  <p className="mt-2 text-xs text-zinc-300 font-light leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.features.map((f, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[9px] font-mono text-cyan-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* High-Conversion Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  {/* Primary Button */}
                  <button
                    onClick={() => setCheckoutTemplate(item)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-white text-black hover:from-cyan-300 hover:to-cyan-100 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
                  >
                    <ShoppingBag size={15} className="text-black" />
                    ADQUIRIR TEMPLATE
                  </button>

                  {/* Secondary Details Action */}
                  <button
                    onClick={() => setSelectedTemplate(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-200 hover:text-white text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 size={12} className="text-cyan-400" />
                    VER DETALHES DO TEMPLATE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High-Resolution Lightbox Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <div className="relative w-full max-w-4xl bg-cyan-950/25 border border-cyan-400/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_80px_rgba(6,182,212,0.3)] text-white my-auto max-h-[90vh] overflow-y-auto backdrop-blur-3xl">
              
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 text-white transition-colors z-20"
                aria-label="Fechar detalhes"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40">
                  TEMPLATE #{selectedTemplate.num} • {selectedTemplate.categoryLabel}
                </span>
                <span className="font-mono text-xs text-zinc-400">{selectedTemplate.rating}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                {selectedTemplate.num}. {selectedTemplate.title}
              </h3>

              {/* MEDIA CONTAINER */}
              <div className="rounded-2xl overflow-hidden border border-cyan-500/30 h-[380px] sm:h-[460px] bg-black relative flex items-center justify-center shadow-2xl">
                {selectedTemplate.videoPreview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      src={selectedTemplate.videoPreview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                ) : (
                  <img
                    src={selectedTemplate.previewUrl}
                    alt={selectedTemplate.title}
                    className="w-full h-full object-contain max-h-[460px]"
                  />
                )}
              </div>

              <p className="text-base text-zinc-200 leading-relaxed font-light">
                {selectedTemplate.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedTemplate.features.map((f, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
                    ✓ {f}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <WebGLLiquidSurgeButton
                  label="ADQUIRIR ESTE TEMPLATE"
                  onClick={() => {
                    const temp = selectedTemplate;
                    setSelectedTemplate(null);
                    setCheckoutTemplate(temp);
                  }}
                  width="w-full sm:w-[320px]"
                  height="h-[64px]"
                />

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const temp = selectedTemplate;
                      setSelectedTemplate(null);
                      onClose();
                      if (onSelectProjectForSite) onSelectProjectForSite(temp.title);
                    }}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-mono text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowUpRight size={14} className="text-cyan-300" />
                    QUERO UM SITE COM ESTE DESIGN
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Dedicated Modern Checkout Modal */}
      {checkoutTemplate && (
        <Suspense
          fallback={
            <ModalLoadingFallback
              message="CARREGANDO CHECKOUT SEGURO..."
              onClose={() => setCheckoutTemplate(null)}
            />
          }
        >
          <CheckoutModal
            isOpen={Boolean(checkoutTemplate)}
            onClose={() => setCheckoutTemplate(null)}
            productName={`Template #${checkoutTemplate.num} · ${checkoutTemplate.title}`}
            productPrice={66.90}
            templateId={checkoutTemplate.id}
          />
        </Suspense>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}

