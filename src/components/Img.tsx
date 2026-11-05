import type { CSSProperties, ImgHTMLAttributes, SyntheticEvent } from 'react';
import { imageSources } from '@/lib/imageSources';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  photo: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  intrinsic?: boolean;
};

/** Responsive WebP image with original-image fallback and layout-shift protection. */
export default function Img({
  photo,
  priority = false,
  alt = '',
  sizes = '100vw',
  fit = 'cover',
  intrinsic = false,
  className,
  style,
  onError,
  ...rest
}: Props) {
  const { src, srcSet, width, height, color, preview } = imageSources(photo);
  const background: CSSProperties = fit === 'cover' && preview
    ? { backgroundImage: 'url(' + preview + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: color }
    : { backgroundColor: color };

  function fallback(event: SyntheticEvent<HTMLImageElement, Event>) {
    const element = event.currentTarget;
    if (element.dataset.fallback !== 'original' && photo !== src) {
      element.dataset.fallback = 'original';
      element.removeAttribute('srcset');
      element.removeAttribute('sizes');
      element.src = photo;
      return;
    }
    onError?.(event);
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={fallback}
      className={className}
      style={{
        ...background,
        ...(intrinsic && width && height ? { aspectRatio: width / height } : {}),
        ...style,
      }}
      {...rest}
    />
  );
}
