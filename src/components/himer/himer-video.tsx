'use client';

import { ProductVideo, type ProductVideoProps } from '@/components/common/product-video';
import { cn } from '@/lib/utils';

type HimerVideoProps = Omit<ProductVideoProps, 'desktopPoster'> & { desktopPoster?: string };

function posterFor(src: string) {
  return `/images/himer/posters/${src
    .split('/')
    .pop()
    ?.replace(/\.mp4$/, '.webp')}`;
}

/** Retain HIMER poster conventions while sharing the media lifecycle. */
export function HimerVideo(props: HimerVideoProps) {
  return (
    <ProductVideo
      {...props}
      desktopPoster={props.desktopPoster || posterFor(props.desktopSrc)}
      mobilePoster={
        props.mobilePoster || props.desktopPoster || posterFor(props.mobileSrc || props.desktopSrc)
      }
      containerClassName={cn('himer-video', props.containerClassName)}
    />
  );
}

export default HimerVideo;
