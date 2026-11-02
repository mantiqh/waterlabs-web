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
  preloadInactive?: boolean;
  preloadDistance?: number;
  onVideoReady?: (desktopSrc: string) => void;
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
  preloadInactive = false,
  preloadDistance = 800,
  onVideoReady,
  priority = false,
  ariaLabel = 'Product demonstration',
}: HimerVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  // 1. Source Loading & Preload Management
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let nearViewport = false;
    let disposed = false;
    let retries = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const breakpoint = window.matchMedia('(max-width: 719px)');

    const scheduleRetry = () => {
      if (
        disposed ||
        retryTimer ||
        retries >= 1 ||
        !video.error ||
        !nearViewport ||
        (!active && !preloadInactive) ||
        reducedMotion ||
        document.hidden ||
        !navigator.onLine
      )
        return;
      retryTimer = setTimeout(() => {
        retryTimer = undefined;
        if (disposed || !nearViewport || document.hidden || !navigator.onLine) return;
        retries += 1;
        video.load();
      }, 1000);
    };

    const loadSource = () => {
      if (
        !nearViewport ||
        reducedMotion ||
        (!active && !preloadInactive) ||
        container.getBoundingClientRect().width === 0
      )
        return;
      const src = breakpoint.matches && mobileSrc ? mobileSrc : desktopSrc;
      if (video.getAttribute('src') !== src) {
        retries = 0;
        setReady(false);
        video.src = src;
        video.preload = 'auto';
        video.load();
      } else {
        scheduleRetry();
      }
    };

    const onReady = () => {
      if (disposed) return;
      setReady(true);
      onVideoReady?.(desktopSrc);
    };

    const onError = () => {
      if (disposed) return;
      setReady(false);
      setPlaying(false);
      scheduleRetry();
    };

    const onOnline = () => {
      retries = 0;
      scheduleRetry();
    };

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        nearViewport = entry.isIntersecting && entry.boundingClientRect.width > 0;
        loadSource();
      },
      { rootMargin: `${preloadDistance}px 0px` },
    );

    preloadObserver.observe(container);
    breakpoint.addEventListener('change', loadSource);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onError);
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', scheduleRetry);

    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      preloadObserver.disconnect();
      breakpoint.removeEventListener('change', loadSource);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', scheduleRetry);
    };
  }, [
    active,
    desktopSrc,
    mobileSrc,
    onVideoReady,
    preloadDistance,
    preloadInactive,
    reducedMotion,
  ]);

  // Retain buffered media when only the active stage changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
      setReady(false);
      setPlaying(false);
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

    let disposed = false;
    let pending = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let retried = false;
    const shouldPlay = () =>
      active && !reducedMotion && !document.hidden && visible() && !!video.src;
    const updatePlayback = () => {
      if (!shouldPlay()) {
        video.pause();
        return;
      }
      if (pending || !video.paused) return;
      pending = true;
      void video
        .play()
        .catch((error: unknown) => {
          if (
            !disposed &&
            error instanceof DOMException &&
            error.name === 'AbortError' &&
            !retried
          ) {
            retried = true;
            retryTimer = setTimeout(updatePlayback, 150);
          }
        })
        .finally(() => {
          pending = false;
        });
    };
    const onPlaying = () => {
      retried = false;
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);

    const playbackObserver = new IntersectionObserver(updatePlayback, {
      threshold: [0, 0.1],
    });

    playbackObserver.observe(container);
    document.addEventListener('visibilitychange', updatePlayback);
    video.addEventListener('canplay', updatePlayback);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    updatePlayback();

    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      playbackObserver.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      video.removeEventListener('canplay', updatePlayback);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.pause();
      setPlaying(false);
    };
  }, [active, reducedMotion]);

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
          playing ? 'pointer-events-none opacity-0' : 'opacity-100',
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
        className={cn(mediaClass, 'transition-opacity duration-300', !playing && 'opacity-0')}
      />
    </div>
  );
};

export default HimerVideo;
