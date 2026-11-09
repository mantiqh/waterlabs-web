'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/hooks/use-scroll-progress';
import { type VideoRecoveryState, watchVideoRecovery } from '@/lib/product-video-recovery';
import { cn } from '@/lib/utils';

export interface ProductVideoProps {
  desktopSrc: string;
  mobileSrc?: string;
  desktopPoster: string;
  mobilePoster?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  mobileAspectRatio?: string;
  fit?: 'contain' | 'cover';
  ariaLabel?: string;
  active?: boolean;
  preloadInactive?: boolean;
  preloadDistance?: number;
  preloadMode?: 'metadata' | 'auto';
  onVideoReady?: (desktopSrc: string) => void;
  priority?: boolean;
  onPlaybackTime?: (seconds: number) => void;
  onPlaybackFrame?: (seconds: number) => void;
  seekTo?: { seconds: number };
}

type VideoStyle = CSSProperties & {
  '--video-desktop-ratio': string;
  '--video-mobile-ratio': string;
};

export const ProductVideo = memo(function ProductVideo({
  desktopSrc,
  mobileSrc,
  desktopPoster,
  mobilePoster,
  className,
  containerClassName,
  aspectRatio = '16 / 9',
  mobileAspectRatio = '1 / 1',
  fit = 'contain',
  active = true,
  preloadInactive = false,
  preloadDistance = 800,
  preloadMode = 'metadata',
  onVideoReady,
  priority = false,
  onPlaybackTime,
  onPlaybackFrame,
  seekTo,
  ariaLabel = 'Product demonstration',
}: ProductVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recoveryState = useRef<VideoRecoveryState>({ source: '', attempted: false });
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || seekTo === undefined) return;
    if (recoveryState.current.resumeTime !== undefined) {
      recoveryState.current.resumeTime = seekTo.seconds;
    }
    const seek = () => {
      video.currentTime = Math.max(
        0,
        Math.min(seekTo.seconds, Number.isFinite(video.duration) ? video.duration : seekTo.seconds),
      );
    };
    if (video.readyState >= 1) seek();
    else video.addEventListener('loadedmetadata', seek, { once: true });
    return () => video.removeEventListener('loadedmetadata', seek);
  }, [seekTo]);

  // Continuous timelines follow decoded frames; ordinary phase changes keep timeupdate cadence.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onPlaybackFrame || !active || reducedMotion) return;
    let frame: number | undefined;
    let disposed = false;
    const videoFrames = typeof video.requestVideoFrameCallback === 'function';
    const cancel = () => {
      if (frame === undefined) return;
      if (videoFrames) video.cancelVideoFrameCallback(frame);
      else cancelAnimationFrame(frame);
      frame = undefined;
    };
    const tick = (seconds: number) => {
      frame = undefined;
      if (disposed || video.paused || document.hidden) return;
      onPlaybackFrame(seconds);
      schedule();
    };
    const schedule = () => {
      if (frame !== undefined || video.paused || document.hidden) return;
      frame = videoFrames
        ? video.requestVideoFrameCallback((_now, metadata) => tick(metadata.mediaTime))
        : requestAnimationFrame(() => tick(video.currentTime));
    };
    const sync = () => {
      onPlaybackFrame(video.currentTime);
      schedule();
    };
    video.addEventListener('playing', sync);
    video.addEventListener('seeked', sync);
    video.addEventListener('pause', cancel);
    video.addEventListener('emptied', cancel);
    video.addEventListener('ended', cancel);
    schedule();
    return () => {
      disposed = true;
      cancel();
      video.removeEventListener('playing', sync);
      video.removeEventListener('seeked', sync);
      video.removeEventListener('pause', cancel);
      video.removeEventListener('emptied', cancel);
      video.removeEventListener('ended', cancel);
    };
  }, [active, onPlaybackFrame, reducedMotion]);

  // 1. Source Loading & Preload Management
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let nearViewport = priority;
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    const breakpoint = window.matchMedia('(max-width: 719px)');

    const loadSource = () => {
      if (disposed || reducedMotion || (!active && !preloadInactive)) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0) {
        // Wait for container to receive layout dimensions before loading
        if (!resizeObserver && typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              if (entry.contentRect.width > 0) {
                resizeObserver?.disconnect();
                resizeObserver = undefined;
                loadSource();
                break;
              }
            }
          });
          resizeObserver.observe(container);
        }
        return;
      }

      if (!nearViewport) return;

      const src = breakpoint.matches && mobileSrc ? mobileSrc : desktopSrc;
      if (video.getAttribute('src') !== src) {
        if (recoveryState.current.source !== src) {
          recoveryState.current.source = src;
          recoveryState.current.attempted = false;
          recoveryState.current.resumeTime = undefined;
        }
        setReady(false);
        video.defaultMuted = true;
        video.muted = true;
        video.preload = priority ? 'auto' : preloadMode;
        video.src = src;
        video.load();
      } else {
        video.defaultMuted = true;
        video.muted = true;
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

    if (priority) {
      loadSource();
    }

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      preloadObserver.disconnect();
      breakpoint.removeEventListener('change', loadSource);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
    };
  }, [
    active,
    desktopSrc,
    mobileSrc,
    onVideoReady,
    preloadDistance,
    preloadMode,
    preloadInactive,
    priority,
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
    let generation = 0;
    let autoplayBlocked = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let retried = false;
    const shouldPlay = () =>
      active && !reducedMotion && !document.hidden && visible() && !!video.src;
    let userUnlockAttached = false;
    const detachUserUnlock = () => {
      if (!userUnlockAttached) return;
      userUnlockAttached = false;
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };
    const onUserInteraction = () => {
      detachUserUnlock();
      autoplayBlocked = false;
      if (!disposed && shouldPlay()) {
        updatePlayback();
      }
    };
    const attachUserUnlock = () => {
      if (userUnlockAttached || disposed) return;
      userUnlockAttached = true;
      window.addEventListener('pointerdown', onUserInteraction, { once: true, passive: true });
      window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });
      window.addEventListener('keydown', onUserInteraction, { once: true, passive: true });
    };

    const updatePlayback = () => {
      recovery.sync();
      if (!shouldPlay()) {
        video.pause();
        return;
      }
      if (autoplayBlocked || pending || !video.paused) return;
      pending = true;
      const attempt = generation;
      video.defaultMuted = true;
      video.muted = true;
      void video
        .play()
        .then(() => {
          if (disposed || generation !== attempt) return;
          detachUserUnlock();
        })
        .catch((error: unknown) => {
          if (disposed || generation !== attempt) return;
          if (error instanceof DOMException && error.name === 'AbortError' && !retried) {
            retried = true;
            retryTimer = setTimeout(updatePlayback, 150);
          } else if (error instanceof DOMException && error.name === 'NotAllowedError') {
            autoplayBlocked = true;
            recovery.sync();
            // Autoplay blocked by browser policy: unlock on first interaction
            attachUserUnlock();
          }
        })
        .finally(() => {
          if (generation === attempt) pending = false;
        });
    };
    const invalidatePlayback = () => {
      generation += 1;
      pending = false;
      clearTimeout(retryTimer);
      setPlaying(false);
    };
    const recovery = watchVideoRecovery(video, {
      state: recoveryState.current,
      canRecover: () => shouldPlay() && !autoplayBlocked && navigator.onLine,
      onRecover: () => {
        invalidatePlayback();
        setReady(false);
      },
    });
    const onPlaying = () => {
      if (!shouldPlay()) {
        video.pause();
        return;
      }
      retried = false;
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);

    const playbackObserver = new IntersectionObserver(updatePlayback, {
      threshold: [0, 0.1],
    });

    playbackObserver.observe(container);
    document.addEventListener('visibilitychange', updatePlayback);
    window.addEventListener('online', updatePlayback);
    window.addEventListener('offline', updatePlayback);
    video.addEventListener('emptied', invalidatePlayback);
    video.addEventListener('canplay', updatePlayback);
    video.addEventListener('loadedmetadata', updatePlayback);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    updatePlayback();

    return () => {
      disposed = true;
      recovery.dispose();
      clearTimeout(retryTimer);
      detachUserUnlock();
      playbackObserver.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      window.removeEventListener('online', updatePlayback);
      window.removeEventListener('offline', updatePlayback);
      video.removeEventListener('emptied', invalidatePlayback);
      video.removeEventListener('canplay', updatePlayback);
      video.removeEventListener('loadedmetadata', updatePlayback);
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
        'product-video relative aspect-[var(--video-mobile-ratio)] w-full overflow-hidden rounded-[20px] md:aspect-[var(--video-desktop-ratio)]',
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
        <source media="(max-width: 719px)" srcSet={mobilePoster || desktopPoster} />
        <Image
          src={desktopPoster}
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
        autoPlay={priority}
        preload={priority ? 'auto' : 'none'}
        onTimeUpdate={
          onPlaybackTime ? (event) => onPlaybackTime(event.currentTarget.currentTime) : undefined
        }
        aria-label={ariaLabel}
        className={cn(mediaClass, 'transition-opacity duration-300', !playing && 'opacity-0')}
      />
    </div>
  );
});

export default ProductVideo;
