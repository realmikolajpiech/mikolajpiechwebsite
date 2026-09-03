import type { ImgHTMLAttributes } from 'react';
import manifest from '../data/image-manifest.json';

const bySource = new Map(Object.values(manifest).map((image) => [image.src, image]));

export function ResponsiveImage({ src, sizes = '(max-width: 767px) 90vw, 640px', loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = bySource.get(src ?? '');
  return <img decoding="async" {...(image ? {
    width: image.width, height: image.height, srcSet: image.srcSet, sizes,
  } : {})} {...props} src={src} loading={loading} />;
}
