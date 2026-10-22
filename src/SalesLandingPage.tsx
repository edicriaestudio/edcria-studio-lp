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
    category: 'Vendas de Luxo / ClÃ­nicas / Direito',
    tag: 'TICKET ALTO',
    desc: 'Paleta profunda, contrastes refinados e transiÃ§Ãµes ultrassuaves projetadas para transmitir autoridade inquestionÃ¡vel.',
    image: '/figma/hero-dark-luxury-2.webp',
    video: '/figma/hero-dark-luxury.webm',
    metrics: '+340% valor percebido',
    rating: '5.0',
    reviews: '52 avaliaÃ§Ãµes'
  },
  {
    id: 'smart-tech',
    title: 'Nexus Tech & Consultoria',
    category: 'SaaS / Tecnologia / ServiÃ§os Premium',
    tag: 'ALTA CONVERSÃƒO',
    desc: 'Linhas tÃ©cnicas com estÃ©tica neon sutil, tipografia mono e micro-interaÃ§Ãµes que retÃªm o visitante em menos de 3 segundos.',
    image: '/figma/hero-smart-product-3d-1.webp',
    video: '/figma/hero-smart-product-3d.webm',
    metrics: '99/100 PageSpeed',
    rating: '4.9',
    reviews: '48 avaliaÃ§Ãµes'
  },
  {
    id: 'organico-editorial',
    title: 'Aura Organic & EstÃ©tica',
    category: 'SaÃºde / EstÃ©tica / Bem-Estar',
    tag: 'EDITORIAL VIP',
    desc: 'EspaÃ§os negativos amplos, tipografia editorial dramÃ¡tica e atmosfera visual limpa, natural e acolhedora.',
    image: '/figma/hero-organico-editorial-1.webp',
    video: '/figma/hero-organico-editorial (1).webm',
    metrics: '4.2x mais leads no WPP',
    rating: '5.0',
    reviews: '61 avaliaÃ§Ãµes'
  },
  {
    id: 'iris-vision',
    title: 'Iris Vision Future',
    category: 'Infoprodutos & Mentorias',
    tag: 'PERFORMANCE',
    desc: 'Arquitetura voltada Ã  escaneabilidade rÃ¡pida de polegar com botÃµes na zona quente de toque no celular.',
    image: '/figma/hero-iris-vision-1.webp',
    video: '/figma/hero-iris-vision.webm',
    metrics: '100% Mobile-First',
    rating: '4.9',
    reviews: '39 avaliaÃ§Ãµes'
  },
  {
    id: 'crystal-lotus',
    title: 'Crystal Lotus & Arquitetura',
    category: 'Arquitetura / ImobiliÃ¡rio / Design',
    tag: 'CINEMATOGRÃFICO',
    desc: 'RefraÃ§Ãµes de vidro, profundidade tridimensional e atmosfera fluida para empreendimentos de alto padrÃ£o.',
    image: '/figma/hero-crystal-lotus-1.webp',
    video: '/figma/hero-crystal-lotus.webm',
    metrics: 'ExperiÃªncia 4K',
    rating: '5.0',
    reviews: '44 avaliaÃ§Ãµes'
  },
  {
    id: 'aqua-glass',
    title: 'Aqua Glass Liquid & InovaÃ§Ã£o',
    category: 'Fintechs / NegÃ³cios Digitais / Startups',
    tag: 'FUTURISTA 60FPS',
    desc: 'Fluidos translÃºcidos, refraÃ§Ãµes de luz em tempo real e visual ultra-moderno que salta aos olhos na navegaÃ§Ã£o mÃ³vel.',
    image: '/figma/hero-aqua-glass-1.webp',
    video: '/figma/hero-aqua-glass.webm',
    metrics: 'Shader WebGL',
    rating: '5.0',
    reviews: '57 avaliaÃ§Ãµes'
  }
];

const SEGMENTS = [
  {
    id: 'clinicas',
    label: 'ClÃ­nicas & MÃ©dicos',
    badge: 'ElegÃ¢ncia & ConfianÃ§a InstantÃ¢nea',
    title: 'Design assÃ©ptico, sofisticado e acolhedor.',
    desc: 'Ideal para cirurgiÃµes plÃ¡sticos, dermatologistas e clÃ­nicas que precisam justificar consultas particulares acima da mÃ©dia.',
    image: '/figma/hero-organico-editorial-1.webp'
  },
  {
    id: 'direito',
    label: 'Advocacia Premium',
    badge: 'Sobriedade & ImponÃªncia de Marca',
    title: 'Autoridade mÃ¡xima para honorÃ¡rios de alto valor.',
    desc: 'Projetado para escritÃ³rios societÃ¡rios, tributÃ¡rios e de famÃ­lia que buscam autoridade e sofisticaÃ§Ã£o.',
    image: '/figma/hero-dark-luxury-2.webp'
  },
  {
    id: 'consultoria',
    label: 'Consultoria / SaaS',
    badge: 'Alta Tecnologia & Dados Persuasivos',
    title: 'Visual tÃ©cnico que valida competÃªncia em segundos.',
    desc: 'Estruturado para consultores de negÃ³cios e fundadores de software que precisam de clareza imediata.',
    image: '/figma/hero-smart-product-3d-1.webp'
  },
  {
    id: 'ecommerce',
    label: 'Produtos Autorais',
    badge: 'ExperiÃªncia Imersiva de Desejo',
    title: 'Vitrine interativa que converte visitantes em clientes.',
    desc: 'Criado para marcas autorais e lanÃ§amentos que exigem uma atmosfera digital impecÃ¡vel.',
    image: '/figma/hero-iris-vision-1.webp'
  }
];

const TELEMETRY_LINES = [
  'EDCRIA.CORE: Telemetria de ConversÃ£o iniciada...',
  'AUDIT.SPEED: 99/100 Google PageSpeed Mobile verificado.',
  'ANALYTICS: 87.4% dos visitantes rolam atÃ© os modelos em vÃ­deo.',
  'RETENÃ‡ÃƒO: +42% de mensagens iniciadas no WhatsApp vs. pÃ¡ginas lentas.',
  'SPRINT.READY: 5 vagas disponÃ­veis para publicaÃ§Ã£o nesta semana.'
];

const FAQS = [
  {
    q: 'Por que investir em uma Landing Page personalizada em vez de usar um modelo pronto do Canva ou WordPress?',
    a: 'Modelos prontos tÃªm trÃªs problemas crÃ´nicos: lentidÃ£o de carregamento (vocÃª perde atÃ© 53% dos cliques do trÃ¡fego pago), visual genÃ©rico que nÃ£o transmite autoridade para cobrar caro, e falta de arquitetura persuasiva voltada para a navegaÃ§Ã£o de polegar no celular.'
  },
  {
    q: 'Quanto tempo leva para a minha Landing Page ficar pronta?',
    a: 'Nosso processo foi desenhado para agilidade: apÃ³s o preenchimento do briefing rÃ¡pido de 5 minutos e escolha do modelo base, entregamos a primeira versÃ£o navegÃ¡vel em 5 a 7 dias Ãºteis.'
  },
  {
    q: 'A pÃ¡gina jÃ¡ vem integrada com meu WhatsApp e Pixel de AnÃºncios?',
    a: 'Sim, 100%! JÃ¡ configuramos o botÃ£o do WhatsApp com mensagem personalizada para vocÃª saber de qual anÃºncio o cliente veio, alÃ©m de instalar o Pixel da Meta e Google Analytics para mensurar seu ROI com precisÃ£o.'
  },
  {
    q: 'Como funciona o processo de atendimento e contrataÃ§Ã£o?',
    a: 'Ao clicar no botÃ£o, vocÃª cai direto no WhatsApp comercial do EdCria Studio. VocÃª preenche o briefing guiado de 5 minutos, definimos o modelo em vÃ­deo como referÃªncia e iniciamos o desenvolvimento da sua pÃ¡gina imediatamente.'
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

  // Efeito de DigitaÃ§Ã£o de Telemetria (Typewriter)
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

  // TransiÃ§Ã£o AutomÃ¡tica do Simulador de Segmentos (a cada 3.5 segundos)
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
    'OlÃ¡, EdCria Studio! Vim pela pÃ¡gina de Landing Pages e gostaria de solicitar um diagnÃ³stico gratuito para a presenÃ§a digital do meu negÃ³cio.'
  )}`;

  const whatsappConceptUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
    `OlÃ¡, EdCria Studio! Gostei do conceito visual para "${currentSegment.label}" no simulador e gostaria de um projeto exclusivo nesse estilo para minha empresa.`
  )}`;

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans relative overflow-x-hidden pb-12">
      
      {/* Scroll-Scrubbed Video Canvas de Fundo (Mesmo motor cinematogrÃ¡fico de fios fluÃ­dos do site oficial) */}
      <ScrollVideo />

      {/* Noise Overlay Global Suave */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* IluminaÃ§Ã£o Ambiente Viva e TranslÃºcida */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-cyan-400/22 blur-[150px] rounded-full transform-gpu" />
        <div className="absolute top-[40%] right-[0%] w-[600px] h-[550px] bg-teal-400/20 blur-[160px] rounded-full transform-gpu" />
        <div className="absolute bottom-[5%] left-[5%] w-[650px] h-[550px] bg-cyan-500/20 blur-[170px] rounded-full transform-gpu" />
      </div>

      {/* ======================================================== */}
      {/* A. NAVBAR â€” PÃ­lula Fina, Delicada e Ultra-TranslÃºcida */}
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
            <a href="#faq" className="hover:text-cyan-300 transition-colors">DÃºvidas</a>
          </div>

          {/* BotÃ£o Refinado e Fino (Slim) */}
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle size={11} className="text-black" />
            <span>DiagnÃ³stico</span>
          </a>
        </motion.nav>
      </header>

      {/* ======================================================== */}
      {/* B. HERO â€” 100% EFEITO DE FIOS CINEMATOGRÃFICOS DO SITE OFICIAL */}
      {/* ======================================================== */}
      <section id="hero" className="relative min-h-[95dvh] pt-24 pb-14 flex flex-col justify-center px-4 sm:px-6 max-w-6xl mx-auto z-10 overflow-hidden">
        
        <div className="relative z-10">
          
          {/* BARRA DE TELEMETRIA AO VIVO (TIPO TERMINAL ULTRA TRANSLÃšCIDO) */}
          <div className="mb-6 p-2.5 sm:p-3 rounded-2xl bg-cyan-950/15 border border-cyan-400/35 backdrop-blur-3xl max-w-xl shadow-[0_0_35px_rgba(6,182,212,0.18)]">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pb-1.5 border-b border-cyan-400/20">
              <div className="flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                <span className="tracking-widest uppercase font-semibold">TELEMETRIA LIVE â€¢ EDCRIA STUDIO</span>
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
              Sua presenÃ§a digital afasta ou atrai clientes de{' '}
              <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white underline decoration-cyan-400/60 decoration-2 underline-offset-8 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                alto valor?
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-zinc-100 font-light max-w-2xl leading-relaxed pt-1 drop-shadow-md">
              Criamos <strong className="text-white font-medium">Landing Pages CinematogrÃ¡ficas</strong> que parecem ferramentas de luxo. Sem templates genÃ©ricos, 100% responsivas para a navegaÃ§Ã£o de polegar e programadas para transformar cliques de anÃºncios em vendas diretas no seu WhatsApp.
            </p>
          </motion.div>

          {/* Prova TÃ©cnica RÃ¡pida com Glassmorphism TranslÃºcido */}
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

          {/* SIMULADOR INTERATIVO: TranslÃºcido com Auto-Cycle */}
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
                  SIMULADOR DINÃ‚MICO â€¢ AUTO-CYCLE 3.5s
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Veja a adaptaÃ§Ã£o estÃ©tica para cada segmento:
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

              {/* Preview AutomÃ¡tico */}
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
                    className="w-full h-[240px] sm:h-[300px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <div className="flex items-center justify-between w-full text-[11px] font-mono">
                    <span className="text-zinc-200">{currentSegment.label} â€¢ 4K</span>
                    <span className="text-cyan-400 font-bold">100% Coded React</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* C. DIFERENCIAIS ULTRA TRANSLÃšCIDOS */}
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
            // PADRÃƒO EDCRIA STUDIO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Por que nossas pÃ¡ginas convertem mais?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-light">
            NÃ£o entregamos templates mortos. Criamos arquiteturas digitais vivas, desenhadas com foco obsessivo em autoridade e velocidade.
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
                DireÃ§Ã£o de Arte & Autoridade
              </h3>
              <p className="text-xs text-zinc-200 font-light leading-relaxed">
                Cada layout Ã© concebido como uma peÃ§a de grife. Seus clientes percebem seu valor antes mesmo de lerem a primeira linha do orÃ§amento.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-cyan-300">
              âœ“ Elimina o aspecto amador
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
                Desenvolvemos em cÃ³digo limpo (React + Tailwind). A pÃ¡gina abre instantaneamente no celular do lead, aproveitando cada centavo investido em anÃºncios.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-emerald-400">
              âœ“ PageSpeed 99/100 verificado
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
                VocÃª nÃ£o precisa esperar semanas para colocar sua campanha no ar. Alinhamos o briefing, montamos a pÃ¡gina e publicamos em 1 semana.
              </p>
            </div>
            <div className="pt-3 border-t border-cyan-400/20 text-[11px] font-mono text-cyan-300">
              âœ“ Acompanhamento direto via WhatsApp
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* D. TEMPLATES EM VÃDEO VERTICAL (9:16) â€” AGORA COM 6 VÃDEOS */}
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
              Modelos de Alta ConversÃ£o em VÃ­deo
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-md">
            Assista aos vÃ­deos demonstrativos e escolha a linha visual que melhor se conecta ao pÃºblico da sua empresa.
          </p>
        </motion.div>

        {/* Grade de 6 VÃ­deos em ProporÃ§Ã£o Vertical (Mockup Celular) */}
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
                  <span>VÃDEO AO VIVO</span>
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

              {/* InformaÃ§Ãµes do Template */}
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
                      `OlÃ¡, EdCria Studio! Assisti ao vÃ­deo do template "${item.title}" e gostaria de criar uma Landing Page com essa linha visual para o meu negÃ³cio.`
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
            // FLUXO DO PRIMEIRO CLIQUE AO LANÃ‡AMENTO
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Como funciona o processo de atendimento?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 font-light max-w-2xl mx-auto leading-relaxed">
            Nada de formulÃ¡rios chatos ou semanas de espera. Nosso funil Ã© 100% humanizado e direto com quem realmente executa o projeto:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 pt-5 text-left">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">01. CLIQUE</span>
              <h4 className="text-sm font-semibold text-white mb-1">WhatsApp Imediato</h4>
              <p className="text-xs text-zinc-300 font-light">VocÃª envia a mensagem e nosso especialista jÃ¡ recebe seu contato.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">02. DIAGNÃ“STICO</span>
              <h4 className="text-sm font-semibold text-white mb-1">Briefing RÃ¡pido</h4>
              <p className="text-xs text-zinc-300 font-light">Enviamos um questionÃ¡rio objetivo de 5 minutos para entender seu negÃ³cio.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">03. PRODUÃ‡ÃƒO</span>
              <h4 className="text-sm font-semibold text-white mb-1">Sprint de 7 Dias</h4>
              <p className="text-xs text-zinc-300 font-light">ConstruÃ§Ã£o da interface, copywriting e configuraÃ§Ã£o de conversÃ£o.</p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 backdrop-blur-2xl shadow-md">
              <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">04. NO AR</span>
              <h4 className="text-sm font-semibold text-white mb-1">PÃ¡gina Pronta</h4>
              <p className="text-xs text-zinc-300 font-light">PublicaÃ§Ã£o com Pixel ativo e botÃµes integrados para receber clientes.</p>
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
              <span>Iniciar DiagnÃ³stico no WhatsApp</span>
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
                <span className="text-zinc-300">ÃGIL</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Minisite Bio Premium</h3>
              <p className="text-xs text-zinc-300 font-light mt-1 mb-5">
                Para quem quer substituir links genÃ©ricos por uma pÃ¡gina autoral de alta elegÃ¢ncia.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">Investimento</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 490</div>
                <span className="text-[11px] font-mono text-cyan-400">Entrega expressa em 3 dias</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Design exclusivo adaptado Ã  sua marca</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>AtÃ© 6 links e botÃµes de contato direto</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Carregamento em &lt; 1 segundo no celular</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>DomÃ­nio prÃ³prio ou subdomÃ­nio</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'OlÃ¡, EdCria Studio! Tenho interesse no Minisite Bio Premium (R$ 490). Gostaria de entender o prazo e como iniciar a personalizaÃ§Ã£o da minha bio.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 text-white text-xs font-mono uppercase tracking-wider text-center transition-all block"
            >
              Escolher Minisite
            </a>
          </motion.div>

          {/* Plano 2: Landing Page CinematogrÃ¡fica (DESTAQUE) */}
          <motion.div variants={fadeInUp} className="p-6 rounded-3xl bg-gradient-to-b from-cyan-950/60 via-cyan-950/30 to-cyan-950/15 border-2 border-cyan-400 backdrop-blur-3xl flex flex-col justify-between shadow-[0_0_45px_rgba(6,182,212,0.35)] relative transform md:-translate-y-2">
            
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-cyan-400 text-black font-mono text-[9px] font-bold tracking-widest uppercase shadow-md">
              MAIS ESCOLHIDO â€¢ ALTO RETORNO
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-2 pt-1">
                <span>OFERTA PRINCIPAL</span>
                <span className="font-bold">SPRINT 7 DIAS</span>
              </div>
              <h3 className="text-xl font-bold text-white">Landing Page CinematogrÃ¡fica</h3>
              <p className="text-xs text-zinc-200 font-light mt-1 mb-5">
                ConstruÃ§Ã£o completa para trÃ¡fego pago, autoridade e conversÃ£o direta no WhatsApp.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">Investimento</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 1.250</div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">Em atÃ© 12x ou desconto Ã  vista no Pix</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-100 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span className="font-medium text-white">Design CinematogrÃ¡fico 100% Autoral</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Estrutura completa de vendas e copywriting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>IntegraÃ§Ã£o com WhatsApp e Pixel Meta/Google</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>NavegaÃ§Ã£o de polegar mobile-first ultrarrÃ¡pida</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Hospedagem de alta performance inclusa</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'OlÃ¡, EdCria Studio! Quero contratar o plano Landing Page CinematogrÃ¡fica (R$ 1.250). Gostaria de iniciar o alinhamento da Sprint de 7 dias para minha empresa.'
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
                Para empresas consolidadas que necessitam de site institucional completo e multi-seÃ§Ãµes.
              </p>

              <div className="mb-5 pb-5 border-b border-cyan-400/20">
                <span className="text-xs font-mono text-zinc-300">A partir de</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">R$ 2.400</div>
                <span className="text-[11px] font-mono text-cyan-400">Entrega de 10 a 15 dias</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 font-light mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Site institucional com mÃºltiplas pÃ¡ginas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Design System exclusivo e biblioteca UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>Ãrea de blog ou catÃ¡logo de serviÃ§os</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span>SEO tÃ©cnico otimizado para o Google</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
                'OlÃ¡, EdCria Studio! Gostaria de um orÃ§amento personalizado para o Ecossistema Completo / Site Institucional da minha empresa.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 text-white text-xs font-mono uppercase tracking-wider text-center transition-all block"
            >
              Solicitar OrÃ§amento
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* G. FAQ â€” Perguntas Frequentes */}
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
            // TIRE SUAS DÃšVIDAS
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
                  {openFaq === fIdx ? 'âˆ’' : '+'}
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
              DireÃ§Ã£o de arte digital e engenharia de interfaces para marcas que nÃ£o aceitam o comum.
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
          <span>Â© 2024 a 2027 EdCria Studio. Todos os direitos reservados.</span>
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
