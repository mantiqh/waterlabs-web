'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { useReducedMotion } from './use-scroll-progress';

interface HimerVideoProps {
  desktopSrc: string;
  mobileSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  mobileAspectRatio?: string;
  fit?: 'contain' | 'cover';
  ariaLabel?: string;
  active?: boolean;
}

type VideoStyle = CSSProperties & {
  '--video-desktop-ratio': string;
  '--video-mobile-ratio': string;
};

export const HimerVideo = ({
  desktopSrc,
  mobileSrc,
  className,
  containerClassName,
  aspectRatio = '16 / 9',
  mobileAspectRatio = '1 / 1',
  fit = 'contain',
  active = true,
  ariaLabel = 'Product demonstration',
}: HimerVideoProps) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    const update = () => {
      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const visible =
          rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight && !document.hidden;
        if (visible && active && !reducedMotion)
          void video.play().catch(() => {
            /* The first frame remains visible when autoplay is unavailable. */
          });
        else video.pause();
      });
    };
    const observer = new IntersectionObserver(update, { threshold: [0, 0.1] });
    videos.forEach((video) => observer.observe(video));
    window.addEventListener('resize', update);
    document.addEventListener('visibilitychange', update);
    videos.forEach((video) => video.addEventListener('loadeddata', update));
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
      videos.forEach((video) => {
        video.pause();
        video.removeEventListener('loadeddata', update);
      });
    };
  }, [desktopSrc, mobileSrc, reducedMotion, active]);

  const style: VideoStyle = {
    '--video-desktop-ratio': aspectRatio,
    '--video-mobile-ratio': mobileAspectRatio,
  };
  const videoClass = cn(
    'absolute inset-0 h-full w-full object-center',
    fit === 'contain' ? 'object-contain' : 'object-cover',
    className,
  );
  return (
    <div
      className={cn(
        'himer-video relative w-full overflow-hidden rounded-[20px]',
        containerClassName,
      )}
      style={style}
    >
      <video
        ref={desktopVideoRef}
        src={desktopSrc}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        className={cn(videoClass, 'hidden md:block')}
      />
      <video
        ref={mobileVideoRef}
        src={mobileSrc || desktopSrc}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        className={cn(videoClass, 'block md:hidden')}
      />
    </div>
  );
};

export default HimerVideo;
