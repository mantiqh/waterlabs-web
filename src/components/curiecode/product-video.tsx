import { memo } from 'react';

import { ProductVideo as SharedProductVideo } from '@/components/common/product-video';
import { CURIECODE_MEDIA, type CurieCodeMediaId } from '@/data/curiecode';

export const ProductVideo = memo(function ProductVideo({
  id,
  label,
  className,
  active = true,
  priority = false,
  preloadInactive = false,
  preloadDistance,
  preloadMode,
  onVideoReady,
  onPlaybackTime,
  onPlaybackFrame,
  aspectRatio,
  mobileAspectRatio,
  fit = 'contain',
  seekTo,
}: {
  id: CurieCodeMediaId;
  label: string;
  className?: string;
  active?: boolean;
  priority?: boolean;
  preloadInactive?: boolean;
  preloadDistance?: number;
  preloadMode?: 'metadata' | 'auto';
  onVideoReady?: (desktopSrc: string) => void;
  onPlaybackTime?: (seconds: number) => void;
  onPlaybackFrame?: (seconds: number) => void;
  aspectRatio?: string;
  mobileAspectRatio?: string;
  fit?: 'contain' | 'cover';
  seekTo?: { seconds: number };
}) {
  const media = CURIECODE_MEDIA[id];
  return (
    <SharedProductVideo
      desktopSrc={media.desktop.src}
      mobileSrc={media.mobile.src}
      desktopPoster={media.desktop.poster}
      mobilePoster={media.mobile.poster}
      aspectRatio={aspectRatio || `${media.desktop.width} / ${media.desktop.height}`}
      mobileAspectRatio={mobileAspectRatio || `${media.mobile.width} / ${media.mobile.height}`}
      fit={fit}
      ariaLabel={label}
      containerClassName={className}
      active={active}
      priority={priority}
      preloadInactive={preloadInactive}
      preloadDistance={preloadDistance}
      preloadMode={preloadMode}
      onVideoReady={onVideoReady}
      onPlaybackTime={onPlaybackTime}
      onPlaybackFrame={onPlaybackFrame}
      seekTo={seekTo}
    />
  );
});
