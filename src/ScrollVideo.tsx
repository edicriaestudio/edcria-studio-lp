import { useEffect, useRef, useCallback, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  const framesRef = useRef<ImageBitmap[]>([]);
  const framesReady = useRef(false);
  const smoothed = useRef(0);
  const targetProgress = useRef(0);

  const cachedDims = useRef({ w: 0, h: 0, dpr: 1 });

  const [posterVisible, setPosterVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);

  // Calcula o progresso do scroll de forma ultra-leve
  const updateScrollProgress = useCallback(() => {
    const scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
    const innerH = window.innerHeight || document.documentElement.clientHeight;
    if (scrollH <= innerH) {
      targetProgress.current = 0;
      return;
    }
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const progress = Math.min(1, Math.max(0, currentY / (scrollH - innerH)));
    targetProgress.current = progress;
  }, []);

  const drawFrame = useCallback(
    (source: ImageBitmap | HTMLVideoElement | HTMLCanvasElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }) || canvas.getContext('2d');
      if (!ctx) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const targetW = Math.round(cw * dpr);
      const targetH = Math.round(ch * dpr);

      if (cachedDims.current.w !== targetW || cachedDims.current.h !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        canvas.style.width = cw + 'px';
        canvas.style.height = ch + 'px';
        cachedDims.current = { w: targetW, h: targetH, dpr };
      }

      const sw = source instanceof ImageBitmap ? source.width : (source as HTMLVideoElement).videoWidth || cw;
      const sh = source instanceof ImageBitmap ? source.height : (source as HTMLVideoElement).videoHeight || ch;

      if (!sw || !sh) return;

      const scale = Math.max(targetW / sw, targetH / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const dx = (targetW - dw) / 2;
      const dy = (targetH - dh) / 2;

      ctx.drawImage(source, dx, dy, dw, dh);
    },
    []
  );

  // Extração de frames apenas no Desktop
  const extractFrames = useCallback(async () => {
    try {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      const maxFrames = 50;
      const maxWidth = 960;

      const offscreen = document.createElement('video');
      offscreen.src = VIDEO_URL;
      offscreen.muted = true;
      offscreen.setAttribute('muted', 'true');
      offscreen.setAttribute('playsinline', 'true');
      offscreen.setAttribute('webkit-playsinline', 'true');
      offscreen.preload = 'auto';

      await new Promise<void>((resolve) => {
        offscreen.addEventListener('loadeddata', () => resolve(), { once: true });
        offscreen.load();
      });

      const dur = offscreen.duration || 5;
      const frameCount = Math.min(maxFrames, Math.max(20, Math.floor(dur * 10)));
      const frames: ImageBitmap[] = [];

      const vw = offscreen.videoWidth || 1280;
      const vh = offscreen.videoHeight || 720;
      const scale = Math.min(1, maxWidth / vw);
      const tw = Math.round(vw * scale);
      const th = Math.round(vh * scale);

      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = tw;
      tmpCanvas.height = th;
      const tmpCtx = tmpCanvas.getContext('2d', { willReadFrequently: true })!;

      for (let i = 0; i < frameCount; i++) {
        const time = (i / (frameCount - 1)) * (dur - 0.05);
        offscreen.currentTime = time;
        await new Promise<void>((resolve) => {
          offscreen.addEventListener('seeked', () => resolve(), { once: true });
        });
        tmpCtx.drawImage(offscreen, 0, 0, tw, th);
        if ('createImageBitmap' in window) {
          const bmp = await createImageBitmap(tmpCanvas);
          frames.push(bmp);
        }
      }

      if (frames.length > 0) {
        framesRef.current = frames;
        framesReady.current = true;
        setCanvasVisible(true);
        setPosterVisible(false);
        setVideoVisible(false);
      }
    } catch (e) {
      console.warn('ScrollVideo fallback ativo:', e);
      setVideoVisible(true);
      setPosterVisible(false);
    }
  }, []);

  // Loop de animação suave e 100% passivo
  useEffect(() => {
    let running = true;
    updateScrollProgress();

    const loop = () => {
      if (!running) return;

      const target = targetProgress.current;
      const lerpSpeed = 0.16;
      smoothed.current += (target - smoothed.current) * lerpSpeed;

      // No Desktop: usa frames pré-computados
      if (framesReady.current && framesRef.current.length > 0) {
        const idx = Math.min(
          framesRef.current.length - 1,
          Math.max(0, Math.round(smoothed.current * (framesRef.current.length - 1)))
        );
        drawFrame(framesRef.current[idx]);
      }
      // No Mobile: o vídeo roda como background contínuo loop sem seek (0% CPU, 0 crash)

      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [updateScrollProgress, drawFrame]);

  // Carrega vídeo de forma leve
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setVideoVisible(true);
      setPosterVisible(false);

      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        const timer = setTimeout(() => {
          extractFrames();
        }, 300);
        return () => clearTimeout(timer);
      }
    };

    video.addEventListener('loadeddata', onLoaded, { once: true });
    video.load();

    return () => {
      video.removeEventListener('loadeddata', onLoaded);
    };
  }, [extractFrames]);

  useEffect(() => {
    const handleResize = () => {
      updateScrollProgress();
      if (framesReady.current && framesRef.current.length > 0) {
        const idx = Math.min(
          framesRef.current.length - 1,
          Math.max(0, Math.round(smoothed.current * (framesRef.current.length - 1)))
        );
        drawFrame(framesRef.current[idx]);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [drawFrame, updateScrollProgress]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#080808] pointer-events-none transform-gpu">
      {/* Layer 1: Poster estático super leve */}
      <img
        ref={posterRef}
        src="/figma/portfolio-hero-cover.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: posterVisible ? 1 : 0 }}
      />

      {/* Layer 2: Vídeo de fundo com loop contínuo e aceleração de GPU */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        autoPlay
        loop
        playsInline
        webkit-playsinline="true"
        x5-video-player-type="h5"
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: videoVisible && !canvasVisible ? 1 : 0 }}
      />

      {/* Layer 3: Canvas (Desktop 60 FPS) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{ opacity: canvasVisible ? 1 : 0 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-transparent to-[#080808]/85 pointer-events-none" />
    </div>
  );
}