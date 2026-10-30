'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

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
  priority?: boolean;
}

type VideoStyle = CSSProperties & {
  '--video-desktop-ratio': string;
  '--video-mobile-ratio': string;
};

function posterFor(src: string) {
  return `/images/himer/posters/${src
    .split('/')
    .pop()
    ?.replace(/\.mp4$/, '.webp')}`;
}

export const HimerVideo = ({
  desktopSrc,
  mobileSrc,
  className,
  containerClassName,
  aspectRatio = '16 / 9',
  mobileAspectRatio = '1 / 1',
  fit = 'contain',
  active = true,
  priority = false,
  ariaLabel = 'Product demonstration',
}: HimerVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let nearViewport = false;
    let disposed = false;
    const breakpoint = window.matchMedia('(max-width: 719px)');
    const visible = () => {
      const rect = container.getBoundingClientRect();
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        getComputedStyle(container).visibility !== 'hidden'
      );
    };
    const updatePlayback = () => {
      if (active && !reducedMotion && !document.hidden && visible() && video.src) {
        void video.play().catch(() => {
          /* Keep the poster when the browser cannot autoplay. */
        });
      } else video.pause();
    };
    const loadSource = () => {
      if (
        !nearViewport ||
        !active ||
        reducedMotion ||
        container.getBoundingClientRect().width === 0
      )
        return;
      const src = breakpoint.matches && mobileSrc ? mobileSrc : desktopSrc;
      if (video.getAttribute('src') !== src) {
        setReady(false);
        video.src = src;
        video.preload = 'auto';
        video.load();
      }
      updatePlayback();
    };
    const onReady = () => {
      if (disposed) return;
      setReady(true);
      updatePlayback();
    };
    const onError = () => setReady(false);
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        nearViewport = entry.isIntersecting && entry.boundingClientRect.width > 0;
        loadSource();
      },
      { rootMargin: '400px 0px' },
    );
    const playbackObserver = new IntersectionObserver(updatePlayback, { threshold: [0, 0.1] });

    preloadObserver.observe(container);
    playbackObserver.observe(container);
    breakpoint.addEventListener('change', loadSource);
    document.addEventListener('visibilitychange', updatePlayback);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('error', onError);

    return () => {
      disposed = true;
      preloadObserver.disconnect();
      playbackObserver.disconnect();
      breakpoint.removeEventListener('change', loadSource);
      document.removeEventListener('visibilitychange', updatePlayback);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('error', onError);
      video.pause();
      video.removeAttribute('src');
      video.load();
      setReady(false);
    };
  }, [desktopSrc, mobileSrc, reducedMotion, active]);

  const style: VideoStyle = {
    '--video-desktop-ratio': aspectRatio,
    '--video-mobile-ratio': mobileAspectRatio,
  };
  const mediaClass = cn(
    'absolute inset-0 h-full w-full object-center',
    fit === 'contain' ? 'object-contain' : 'object-cover',
    className,
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'himer-video relative w-full overflow-hidden rounded-[20px]',
        containerClassName,
      )}
      style={style}
      data-video-ready={ready}
    >
      <picture
        aria-hidden="true"
        className={cn('absolute inset-0 block h-full w-full', ready && 'invisible')}
      >
        <source media="(max-width: 719px)" srcSet={posterFor(mobileSrc || desktopSrc)} />
        <Image
          src={posterFor(desktopSrc)}
          alt=""
          fill
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1440px) 1320px, 100vw"
          className={mediaClass}
        />
      </picture>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        aria-label={ariaLabel}
        className={cn(mediaClass, !ready && 'opacity-0')}
      />
    </div>
  );
};

export default HimerVideo;
