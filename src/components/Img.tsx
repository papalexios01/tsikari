import type { CSSProperties, ImgHTMLAttributes } from 'react';
import imageMeta from '@/data/imageMeta.json';

type Meta = { w: number; h: number; c: string; s: number[]; p: string };
const META = imageMeta as Record<string, Meta>;

const variant = (photo: string, width: number) => photo.replace(/^\/images\//, '/img/').replace(/\.[^.]+$/, `-${width}.webp`);

export function imageSources(photo: string) {
  const m = META[photo];
  if (!m) return { src: photo };
  return {
    src: variant(photo, m.s[m.s.length - 1]),
    srcSet: m.s.map((w) => `${variant(photo, w)} ${w}w`).join(', '),
    width: m.w,
    height: m.h,
    color: m.c,
    preview: m.p,
  };
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  photo: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  intrinsic?: boolean;
};

export default function Img({ photo, priority, alt = '', sizes = '100vw', fit = 'cover', intrinsic, className, style, ...rest }: Props) {
  const { src, srcSet, width, height, color, preview } = imageSources(photo);
  const placeholder: CSSProperties =
    fit === 'cover' && preview
      ? { backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: color }
      : { backgroundColor: color };

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={intrinsic ? width : undefined}
      height={intrinsic ? height : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
      className={className}
      style={{ ...placeholder, ...style }}
      {...rest}
    />
  );
}
