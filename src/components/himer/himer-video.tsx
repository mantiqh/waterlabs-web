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

  // 1. Source Loading & Preload Management
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let nearViewport = false;
    let disposed = false;
    const breakpoint = window.matchMedia('(max-width: 719px)');

    const loadSource = () => {
      if (!nearViewport || reducedMotion || !active || container.getBoundingClientRect().width === 0)
        return;
      const src = breakpoint.matches && mobileSrc ? mobileSrc : desktopSrc;
      if (video.getAttribute('src') !== src) {
        setReady(false);
        video.src = src;
        video.preload = 'auto';
        video.load();
      }
    };

    const onReady = () => {
      if (disposed) return;
      setReady(true);
    };

    const onError = () => {
      if (disposed) return;
      setReady(false);
    };

    // Preload within 800px margin of viewport to ensure seamless playback when scrolled into view
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        nearViewport = entry.isIntersecting && entry.boundingClientRect.width > 0;
        loadSource();
      },
      { rootMargin: '800px 0px' },
    );

    preloadObserver.observe(container);
    breakpoint.addEventListener('change', loadSource);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onError);

    return () => {
      disposed = true;
      preloadObserver.disconnect();
      breakpoint.removeEventListener('change', loadSource);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
    };
  }, [active, desktopSrc, mobileSrc, reducedMotion]);

  // Retain buffered media when only the active stage changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
      setReady(false);
    };
  }, [desktopSrc, mobileSrc, reducedMotion]);

  // 2. Playback Control (Decoupled from loading/source teardown)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

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
          /* Fallback: Keep poster visible if autoplay is unavailable or blocked */
        });
      } else {
        video.pause();
      }
    };

    const playbackObserver = new IntersectionObserver(updatePlayback, {
      threshold: [0, 0.1],
    });

    playbackObserver.observe(container);
    document.addEventListener('visibilitychange', updatePlayback);
    updatePlayback();

    return () => {
      playbackObserver.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, [active, reducedMotion, ready]);

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
        className={cn(
          'absolute inset-0 block h-full w-full transition-opacity duration-300',
          ready ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <source media="(max-width: 719px)" srcSet={posterFor(mobileSrc || desktopSrc)} />
        <Image
          src={posterFor(desktopSrc)}
          alt=""
          fill
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
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
        className={cn(mediaClass, 'transition-opacity duration-300', !ready && 'opacity-0')}
      />
    </div>
  );
};

export default HimerVideo;
