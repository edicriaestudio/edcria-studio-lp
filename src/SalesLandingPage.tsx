import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Play,
  Sparkles,
  Zap,
  Clock,
  Terminal,
  ChevronRight,
  ClipboardList,
  Star
} from 'lucide-react';
import { EDMonogramIcon } from './components/BrandLogo';
import ScrollVideo from './ScrollVideo';

const SHOWCASE_ITEMS = [
  {
    id: 'dark-luxury',
    title: 'Noir Prestige & Alta Autoridade',
    category: 'Vendas de Luxo / Clínicas / Direito',
    tag: 'TICKET ALTO',
    desc: 'Paleta profunda, contrastes refinados e transições ultrassuaves projetadas para transmitir autoridade inquestionável.',
    image: '/figma/hero-dark-luxury-2.webp',
    video: '/figma/hero-dark-luxury.webm',
    metrics: '+340% valor percebido',
    rating: '5.0',
    reviews: '52 avaliações'
  },
  {
    id: 'smart-tech',
    title: 'Nexus Tech & Consultoria',
    category: 'SaaS / Tecnologia / Serviços Premium',
    tag: 'ALTA CONVERSÃO',
    desc: 'Linhas técnicas com estética neon sutil, tipografia mono e micro-interações que retêm o visitante em menos de 3 segundos.',
    image: '/figma/hero-smart-product-3d-1.webp',
    video: '/figma/hero-smart-product-3d.webm',
    metrics: '99/100 PageSpeed',
    rating: '4.9',
    reviews: '48 avaliações'
  },
  {
    id: 'organico-editorial',
    title: 'Aura Organic & Estética',
    category: 'Saúde / Estética / Bem-Estar',
    tag: 'EDITORIAL VIP',
    desc: 'Espaços negativos amplos, tipografia editorial dramática e atmosfera visual limpa, natural e acolhedora.',
    image: '/figma/hero-organico-editorial-1.webp',
    video: '/figma/hero-organico-editorial (1).webm',
    metrics: '4.2x mais leads no WPP',
    rating: '5.0',
    reviews: '61 avaliações'
  },
  {
    id: 'iris-vision',
    title: 'Iris Vision Future',
    category: 'Infoprodutos & Mentorias',
    tag: 'PERFORMANCE',
    desc: 'Arquitetura voltada à escaneabilidade rápida de polegar com botões na zona quente de toque no celular.',
    image: '/figma/hero-iris-vision-1.webp',
    video: '/figma/hero-iris-vision.webm',
    metrics: '100% Mobile-First',
    rating: '4.9',
    reviews: '39 avaliações'
  },
  {
    id: 'crystal-lotus',
    title: 'Crystal Lotus & Arquitetura',
    category: 'Arquitetura / Imobiliário / Design',
    tag: 'CINEMATOGRÁFICO',
    desc: 'Refrações de vidro, profundidade tridimensional e atmosfera fluida para empreendimentos de alto padrão.',
    image: '/figma/hero-crystal-lotus-1.webp',
    video: '/figma/hero-crystal-lotus.webm',
    metrics: 'Experiência 4K',
    rating: '5.0',
    reviews: '44 avaliações'
  },
  {
    id: 'aqua-glass',
    title: 'Aqua Glass Liquid & Inovação',
    category: 'Fintechs / Negócios Digitais / Startups',
    tag: 'FUTURISTA 60FPS',
    desc: 'Fluidos translúcidos, refrações de luz em tempo real e visual ultra-moderno que salta aos olhos na navegação móvel.',
    image: '/figma/hero-aqua-glass-1.webp',
    video: '/figma/hero-aqua-glass.webm',
    metrics: 'Shader WebGL',
    rating: '5.0',
    reviews: '57 avaliações'
  }
];

const SEGMENTS = [
  {
    id: 'clinicas',
    label: 'Clínicas & Médicos',
    badge: 'Elegância & Confiança Instantânea',
    title: 'Design asséptico, sofisticado e acolhedor.',
    desc: 'Ideal para cirurgiões plásticos, dermatologistas e clínicas que precisam justificar consultas particulares acima da média.',
    image: '/figma/hero-organico-editorial-1.webp'
  },
  {
    id: 'direito',
    label: 'Advocacia Premium',
    badge: 'Sobriedade & Imponência de Marca',
    title: 'Autoridade máxima para honorários de alto valor.',
    desc: 'Projetado para escritórios societários, tributários e de família que buscam autoridade e sofisticação.',
    image: '/figma/hero-dark-luxury-2.webp'
  },
  {
    id: 'consultoria',
    label: 'Consultoria / SaaS',
    badge: 'Alta Tecnologia & Dados Persuasivos',
    title: 'Visual técnico que valida competência em segundos.',
    desc: 'Estruturado para consultores de negócios e fundadores de software que precisam de clareza imediata.',
    image: '/figma/hero-smart-product-3d-1.webp'
  },
  {
    id: 'ecommerce',
    label: 'Produtos Autorais',
    badge: 'Experiência Imersiva de Desejo',
    title: 'Vitrine interativa que converte visitantes em clientes.',
    desc: 'Criado para marcas autorais e lançamentos que exigem uma atmosfera digital impecável.',
    image: '/figma/hero-iris-vision-1.webp'
  }
];

const TELEMETRY_LINES = [
  'EDCRIA.CORE: Telemetria de Conversão iniciada...',
  'AUDIT.SPEED: 99/100 Google PageSpeed Mobile verificado.',
  'ANALYTICS: 87.4% dos visitantes rolam até os modelos em vídeo.',
  'RETEN!ÒO: +42% de mensagens iniciadas no WhatsApp vs. páginas lentas.',
  'SPRINT.READY: 5 vagas disponíveis para publicação nesta semana.'
];

const FAQS = [
  {
    q: 'Por que investir em uma Landing Page personalizada em vez de usar um modelo pronto do Canva ou WordPress?',
    a: 'Modelos prontos têm três problemas crônicos: lentidão de carregamento (você perde até 53% dos cliques do tráfego pago), visual genérico que não transmite autoridade para cobrar caro, e falta de arquitetura persuasiva voltada para a navegação de polegar no celular.'
  },
  {
    q: 'Quanto tempo leva para a minha Landing Page ficar pronta?',
    a: 'Nosso processo foi desenhado para agilidade: após o preenchimento do briefing rápido de 5 minutos e escolha do modelo base, entregamos a primeira versão navegável em 5 a 7 dias úteis.'
  },
  {
    q: 'A página já vem integrada com meu WhatsApp e Pixel de Anúncios?',
    a: 'Sim, 100%! Já configuramos o botão do WhatsApp com mensagem personalizada para você saber de qual anúncio o cliente veio, além de instalar o Pixel da Meta e Google Analytics para mensurar seu ROI com precisão.'
  },
  {
    q: 'Como funciona o processo de atendimento e contratação?',
    a: 'Ao clicar no botão, você cai direto no WhatsApp comercial do EdCria Studio. Você preenche o briefing guiado de 5 minutos, definimos o modelo em vídeo como referência e iniciamos o desenvolvimento da sua página imediatamente.'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export default function SalesLandingPage() {
  const [activeSegmentIdx, setActiveSegmentIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Efeito de Digitação de Telemetria (Typewriter)
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const fullLine = TELEMETRY_LINES[currentLineIdx];
    if (currentCharIdx < fullLine.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullLine[currentCharIdx]);
        setCurrentCharIdx((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText('');
        setCurrentCharIdx(0);
        setCurrentLineIdx((prev) => (prev + 1) % TELEMETRY_LINES.length);
      }, 2600);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIdx, currentLineIdx]);

  // Transição Automática do Simulador de Segmentos (a cada 3.5 segundos)
  useEffect(() => {
    const segmentInterval = setInterval(() => {
      setActiveSegmentIdx((prev) => (prev + 1) % SEGMENTS.length);
    }, 3600);
    return () => clearInterval(segmentInterval);
  }, []);

  const currentSegment = SEGMENTS[activeSegmentIdx];

  // WhatsApp Oficial EdCria Studio: (21) 98714-7165
  const STUDIO_PHONE = '5521987147165';

  const whatsappGeneralUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
    'Olá, EdCria Studio! Vim pela página de Landing Pages e gostaria de solicitar um diagnóstico gratuito para a presença digital do meu negócio.'
  )}`;

  const whatsappConceptUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
    `Olá, EdCria Studio! Gostei do conceito visual para "${currentSegment.label}" no simulador e gostaria de um projeto exclusivo nesse estilo para minha empresa.`
  )}`;

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans relative overflow-x-hidden pb-12">
      
      {/* Scroll-Scrubbed Video Canvas de Fundo (Mesmo motor cinematográfico de fios fluídos do site oficial) */}
      <ScrollVideo />

      {/* Noise Overlay Global Suave */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Iluminação Ambiente Viva e Translúcida */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-cyan-400/22 blur-[150px] rounded-full transform-gpu" />
        <div className="absolute top-[40%] right-[0%] w-[600px] h-[550px] bg-teal-400/20 blur-[160px] rounded-full transform-gpu" />
        <div className="absolute bottom-[5%] left-[5%] w-[650px] h-[550px] bg-cyan-500/20 blur-[170px] rounded-full transform-gpu" />
      </div>

      {/* ======================================================== */}
      {/* A. NAVBAR  Pílula Fina, Delicada e Ultra-Translúcida */}
      {/* ======================================================== */}
      <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 sm:px-4">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-3xl px-3.5 sm:px-5 py-2 rounded-full bg-cyan-950/20 backdrop-blur-3xl border border-cyan-400/30 shadow-[0_8px_30px_rgba(6,182,212,0.15)] flex items-center justify-between"
        >
          {/* Logo Minimalista Slim */}
          <a href="#hero" className="flex items-center gap-2">
            <EDMonogramIcon size={18} glowing={true} />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs tracking-tight text-white">
                EdCria
              </span>
              <span className="text-[9px] font-mono text-cyan-300 px-1.5 py-0.2 rounded-full bg-cyan-950/40 border border-cyan-400/30">
                STUDIO
              </span>
            </div>
          </a>

          {/* Links de Desktop */}
          <div className="hidden md:flex items-center gap-5 text-[11px] font-mono text-zinc-200">
            <a href="#templates" className="hover:text-cyan-300 transition-colors">Modelos</a>
            <a href="#diferenciais" className="hover:text-cyan-300 transition-colors">Diferenciais</a>
            <a href="#planos" className="hover:text-cyan-300 transition-colors">Planos</a>
            <a href="#faq" className="hover:text-cyan-300 transition-colors">Dúvidas</a>
          </div>

          {/* Botão Refinado e Fino (Slim) */}
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle size={11} className="text-black" />
            <span>Diagnóstico</span>
          </a>
        </motion.nav>
      </header>

      {/* ======================================================== */}
      {/* B. HERO  100% EFEITO DE FIOS CINEMATOGRÁFICOS DO SITE OFICIAL */}
      {/* ======================================================== */}
      <section id="hero" className="relative min-h-[95dvh] pt-24 pb-14 flex flex-col justify-center px-4 sm:px-6 max-w-6xl mx-auto z-10 overflow-hidden">
        
        <div className="relative z-10">
          
          {/* BARRA DE TELEMETRIA AO VIVO (TIPO TERMINAL ULTRA TRANSLÚCIDO) */}
          <div className="mb-6 p-2.5 sm:p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/35 backdrop-blur-3xl max-w-xl shadow-[0_0_35px_rgba(6,182,212,0.18)]">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pb-1.5 border-b border-cyan-400/20">
              <div className="flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                <span className="tracking-widest uppercase font-semibold">TELEMETRIA LIVE • EDCRIA STUDIO</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
            </div>
            <div className="pt-2 flex items-center font-mono text-xs text-white min-h-[28px]">
              <span className="text-cyan-400 mr-2 font-bold">&gt;</span>
              <span>{typedText}</span>
              <span className="inline-block w-2 h-3.5 ml-1 bg-cyan-400 animate-pulse" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-[clamp(2.1rem,6vw,4.4rem)] font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-xl">
              Sua presença digital afasta ou atrai clientes de{' '}
              <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white underline decoration-cyan-400/60 decoration-2 underline-offset-8 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                alto valor?
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-zinc-100 font-light max-w-2xl leading-relaxed pt-1 drop-shadow-md">
              Criamos <strong className="text-white font-medium">Landing Pages Cinematográficas</strong> que parecem ferramentas de luxo. Sem templates genéricos, 100% responsivas para a navegação de polegar e programadas para transformar cliques de anúncios em vendas diretas no seu WhatsApp.
            </p>
          </motion.div>

          {/* Prova Técnica Rápida com Glassmorphism Translúcido */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 pb-7 max-w-3xl"
          >
            <div className="p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-2xl shadow-lg">
              <div className="text-cyan-300 font-mono text-base sm:text-lg font-bold">99/100</div>
              <div className="text-[10px] font-mono text-zinc-300 uppercase">Google PageSpeed</div>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-2xl shadow-lg">
              <div className="text-cyan-300 font-mono text-base sm:text-lg font-bold">&lt; 1.2s</div>
              <div className="text-[10px] font-mono text-zinc-300 uppercase">Carregamento Ultra</div>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-2xl shadow-lg">
              <div className="text-cyan-300 font-mono text-base sm:text-lg font-bold">7 Dias</div>
              <div className="text-[10px] font-mono text-zinc-300 uppercase">Entrega em Sprint</div>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-2xl shadow-lg">
              <div className="text-emerald-400 font-mono text-base sm:text-lg font-bold">100%</div>
              <div className="text-[10px] font-mono text-zinc-300 uppercase">Mobile-First Nativo</div>
            </div>
          </motion.div>

          {/* SIMULADOR INTERATIVO: Translúcido com Auto-Cycle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-4 sm:p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.22)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-400/20">
              <div>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  SIMULADOR DINMICO • AUTO-CYCLE 3.5s
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Veja a adaptação estética para cada segmento:
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {SEGMENTS.map((seg, sIdx) => (
                  <button
                    key={seg.id}
                    onClick={() => setActiveSegmentIdx(sIdx)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                      activeSegmentIdx === sIdx
                        ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                        : 'bg-cyan-950/30 text-zinc-300 hover:bg-cyan-900/50 hover:text-white border border-cyan-500/20'
                    }`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-4 items-center">
              <div className="lg:col-span-5 space-y-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSegment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2.5"
                  >
                    <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 uppercase">
                      {currentSegment.badge}
                    </div>

                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      {currentSegment.title}
                    </h4>

                    <p className="text-xs text-zinc-200 font-light leading-relaxed">
                      {currentSegment.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="pt-2">
                  <a
                    href={whatsappConceptUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
                  >
                    <MessageCircle size={14} className="text-black" />
                    <span>Quero um conceito exclusivo no WhatsApp</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Preview Automático */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-cyan-400/30 bg-black/50 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSegment.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    src={currentSegment.image}
                    alt={currentSegment.title}
                    className="w-full h-[280px] sm:h-[380px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <div className="flex items-center justify-between w-full text-[11px] font-mono">
                    <span className="text-zinc-200">{currentSegment.label} • 4K</span>
                    <span className="text-cyan-400 font-bold">100% Coded React</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* C. DIFERENCIAIS ULTRA TRANSLÚCIDOS */}
      {/* ======================================================== */}
      <section id="diferenciais" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-12 space-y-2"
        >
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
            // PADRÒO EDCRIA STUDIO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Por que nossas páginas convertem mais?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Não entregamos templates mortos. Criamos arquiteturas digitais vivas, desenhadas com foco obsessivo em autoridade e velocidade.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1 */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-3xl flex flex-col justify-between min-h-[300px] hover:border-cyan-400/60 transition-all hover:-translate-y-1 shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">
                Direção de Arte & Autoridade
              </h3>
              <p className="text-xs text-zinc-200 font-light leading-relaxed">
                Cada layout é concebido como uma peça de grife. Seus clientes percebem seu valor antes mesmo de lerem a primeira linha do orçamento.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-cyan-300">
              S Elimina o aspecto amador
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-3xl flex flex-col justify-between min-h-[300px] hover:border-cyan-400/60 transition-all hover:-translate-y-1 shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">
                Carregamento em &lt; 1.2 Segundos
              </h3>
              <p className="text-xs text-zinc-200 font-light leading-relaxed">
                Desenvolvemos em código limpo (React + Tailwind). A página abre instantaneamente no celular do lead, aproveitando cada centavo investido em anúncios.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-emerald-400">
              S PageSpeed 99/100 verificado
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-3xl flex flex-col justify-between min-h-[300px] hover:border-cyan-400/60 transition-all hover:-translate-y-1 shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Clock size={20} />
              </div>
              <h3 className="text-base font-semibold text-white">
                Sprint 7 Dias Sem Burocracia
              </h3>
              <p className="text-xs text-zinc-200 font-light leading-relaxed">
                Você não precisa esperar semanas para colocar sua campanha no ar. Alinhamos o briefing, montamos a página e publicamos em 1 semana.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-cyan-300">
              S Acompanhamento direto via WhatsApp
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* D. TEMPLATES EM VÍDEO VERTICAL (9:16)  AGORA COM 6 VÍDEOS */}
      {/* ======================================================== */}
      <section id="templates" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold block mb-1">
              // ESCOLHA O ESTILO DO SEU PROJETO
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Modelos de Alta Conversão em Vídeo
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-md">
            Assista aos vídeos demonstrativos e escolha a linha visual que melhor se conecta ao público da sua empresa.
          </p>
        </motion.div>

        {/* Grade de 6 Vídeos em Proporção Vertical (Mockup Celular) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SHOWCASE_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group rounded-3xl bg-cyan-950/15 border border-cyan-400/30 hover:border-cyan-400/70 backdrop-blur-3xl transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]"
            >
              {/* FRAME VERTICAL (9:16) ESTILO CELULAR / STORIES */}
              <div className="relative w-full aspect-[9/14] overflow-hidden bg-black/60 flex items-center justify-center">
                <video
                  src={item.video}
                  poster={item.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b11]/90 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 backdrop-blur-md uppercase tracking-wider">
                  {item.tag}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-[9px] font-mono text-emerald-400 backdrop-blur-md flex items-center gap-1">
                  <Play size={9} className="fill-emerald-400" />
                  <span>VÍDEO AO VIVO</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                  <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10 backdrop-blur-sm">
                    {item.metrics}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 border border-amber-400/30 backdrop-blur-sm text-amber-300">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{item.rating}</span>
                    <span className="text-[9px] text-zinc-400">({item.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Informações do Template */}
              <div className="p-5 space-y-2.5">
                <span className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-200 font-light leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-cyan-400/20">
                  <a
                    href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                      `Olá, EdCria Studio! Assisti ao vídeo do template "${item.title}" e gostaria de criar uma Landing Page com essa linha visual para o meu negócio.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                  >
                    <span>Quero Este Modelo no WhatsApp</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* E. COMO FUNCIONA O ATENDIMENTO NO WHATSAPP */}
      {/* ======================================================== */}
      <section className="py-20 px-4 sm:px-6 bg-cyan-950/15 border-y border-cyan-400/20 backdrop-blur-3xl relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center space-y-5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300 font-semibold">
            // FLUXO DO PRIMEIRO CLIQUE AO LAN!AMENTO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Como funciona o processo de atendimento?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 font-light max-w-2xl mx-auto leading-relaxed">
            Nada de formulários chatos ou semanas de espera. Nosso funil é 100% humanizado e direto com quem realmente executa o projeto:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 pt-5 text-left">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">01. CLIQUE</span>
              <h4 className="text-sm font-semibold text-white mb-1">WhatsApp Imediato</h4>
              <p className="text-xs text-zinc-300 font-light">Você envia a mensagem e nosso especialista já recebe seu contato.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">02. DIAGNSTICO</span>
              <h4 className="text-sm font-semibold text-white mb-1">Briefing Rápido</h4>
              <p className="text-xs text-zinc-300 font-light">Enviamos um questionário objetivo de 5 minutos para entender seu negócio.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">03. PRODU!ÒO</span>
              <h4 className="text-sm font-semibold text-white mb-1">Sprint de 7 Dias</h4>
              <p className="text-xs text-zinc-300 font-light">Construção da interface, copywriting e configuração de conversão.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">04. NO AR</span>
              <h4 className="text-sm font-semibold text-white mb-1">Página Pronta</h4>
              <p className="text-xs text-zinc-300 font-light">Publicação com Pixel ativo e botões integrados para receber clientes.</p>
            </div>
          </div>

          <div className="pt-3">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <MessageCircle size={15} />
              <span>Iniciar Diagnóstico no WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* F. PLANOS & INVESTIMENTO */}
      {/* ======================================================== */}
      <section id="planos" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-12 space-y-2"
        >
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
            // INVESTIMENTO & VALOR
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Planos Sob Medida para o Seu Momento
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            Sem custos escondidos. Escolha o formato ideal para acelerar os resultados da sua empresa.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Plano 1: Minisite Bio Premium */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-3xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                <span>PLANO ENTRADA</span>
                <span className="text-zinc-300">ÁGIL</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Minisite Bio Premium</h3>
              <p className="text-xs text-zinc-300 font-light mt-1 mb-5">
                Para quem quer substituir links genéricos por uma página autoral de alta elegância.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">Investimento</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 490</div>
                <span className="text-[11px] font-mono text-cyan-400">Entrega expressa em 3 dias</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Design exclusivo adaptado à sua marca</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Até 6 links e botões de contato direto</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Carregamento em &lt; 1 segundo no celular</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Domínio próprio ou subdomínio</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'Olá, EdCria Studio! Tenho interesse no Minisite Bio Premium (R$ 490). Gostaria de entender o prazo e como iniciar a personalização da minha bio.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 text-white text-xs font-mono uppercase tracking-wider text-center transition-all block"
            >
              Escolher Minisite
            </a>
          </motion.div>

          {/* Plano 2: Landing Page Cinematográfica (DESTAQUE) */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-gradient-to-b from-cyan-950/60 via-cyan-950/30 to-cyan-950/15 border-2 border-cyan-400 backdrop-blur-3xl flex flex-col justify-between shadow-[0_0_45px_rgba(6,182,212,0.35)] relative transform md:-translate-y-2">
            
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-cyan-400 text-black font-mono text-[9px] font-bold tracking-widest uppercase shadow-md">
              MAIS ESCOLHIDO • ALTO RETORNO
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2 pt-1">
                <span>OFERTA PRINCIPAL</span>
                <span className="font-bold">SPRINT 7 DIAS</span>
              </div>
              <h3 className="text-xl font-bold text-white">Landing Page Cinematográfica</h3>
              <p className="text-xs text-zinc-200 font-light mt-1 mb-5">
                Construção completa para tráfego pago, autoridade e conversão direta no WhatsApp.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">Investimento</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 1.250</div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">Em até 12x ou desconto à vista no Pix</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-100 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span className="font-medium text-white">Design Cinematográfico 100% Autoral</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Estrutura completa de vendas e copywriting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Integração com WhatsApp e Pixel Meta/Google</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Navegação de polegar mobile-first ultrarrápida</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Hospedagem de alta performance inclusa</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'Olá, EdCria Studio! Quero contratar o plano Landing Page Cinematográfica (R$ 1.250). Gostaria de iniciar o alinhamento da Sprint de 7 dias para minha empresa.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider text-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95 block"
            >
              Contratar Landing Page VIP
            </a>
          </motion.div>

          {/* Plano 3: Ecossistema Completo */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-cyan-950/15 border border-cyan-400/30 backdrop-blur-3xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                <span>INSTITUCIONAL 4K</span>
                <span className="text-zinc-300">ESCALA</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Ecossistema Completo</h3>
              <p className="text-xs text-zinc-300 font-light mt-1 mb-5">
                Para empresas consolidadas que necessitam de site institucional completo e multi-seções.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">A partir de</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 2.400</div>
                <span className="text-[11px] font-mono text-cyan-400">Entrega de 10 a 15 dias</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Site institucional com múltiplas páginas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Design System exclusivo e biblioteca UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Área de blog ou catálogo de serviços</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>SEO técnico otimizado para o Google</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'Olá, EdCria Studio! Gostaria de um orçamento personalizado para o Ecossistema Completo / Site Institucional da minha empresa.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 text-white text-xs font-mono uppercase tracking-wider text-center transition-all block"
            >
              Solicitar Orçamento
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* G. FAQ  Perguntas Frequentes */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-10 space-y-2"
        >
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
            // TIRE SUAS DaVIDAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-950/15 backdrop-blur-2xl overflow-hidden transition-colors shadow-md"
            >
              <button
                onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-white hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-cyan-400 font-mono text-base shrink-0">
                  {openFaq === fIdx ? '' : '+'}
                </span>
              </button>
              {openFaq === fIdx && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-zinc-200 font-light leading-relaxed border-t border-cyan-400/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* H. FOOTER */}
      {/* ======================================================== */}
      <footer className="pt-16 pb-24 px-4 sm:px-6 bg-cyan-950/10 rounded-t-[2.5rem] border-t border-cyan-400/30 backdrop-blur-3xl relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cyan-400/20">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <EDMonogramIcon size={22} glowing={true} />
              <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                EdCria Studio
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-light max-w-sm">
              Direção de arte digital e engenharia de interfaces para marcas que não aceitam o comum.
            </p>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-cyan-950/30 border border-cyan-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left font-mono text-[10px]">
              <span className="text-emerald-400 block font-semibold">ATENDIMENTO OPERACIONAL</span>
              <span className="text-zinc-300">WhatsApp Comercial Online</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-300">
          <span>© 2024 a 2027 EdCria Studio. Todos os direitos reservados.</span>
          <div className="flex items-center gap-5">
            <a href="https://edicria.com.br" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">Site Oficial</a>
            <a href={whatsappGeneralUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">Falar no WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* I. BARRA FLUTUANTE DE POLEGAR (Mobile Slim Sticky CTA) */}
      {/* ======================================================== */}
      <div className="fixed bottom-3 inset-x-3 sm:hidden z-50">
        <motion.a
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          href={whatsappGeneralUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 text-black font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(6,182,212,0.45)] border border-cyan-200/50 active:scale-95"
        >
          <MessageCircle size={15} className="text-black" />
          <span>Falar no WhatsApp</span>
          <ChevronRight size={14} className="text-black" />
        </motion.a>
      </div>

    </div>
  );
}
