import type { CSSProperties, ImgHTMLAttributes } from 'react';
import imageMeta from '@/data/imageMeta.json';

type Meta = { w: number; h: number; c: string; s: number[]; p: string };
const META = imageMeta as Record<string, Meta>;
const variant = (photo: string, width: number) => photo.replace(/^\/images\//, '/img/').replace(/\.[^.]+$/, '-' + width + '.webp');

export function imageSources(photo: string) {
  const m=META[photo];
  if (!m || !Array.isArray(m.s) || !m.s.length) return { src: photo, width: undefined, height: undefined, color: undefined, srcSet: undefined, preview: undefined };
  const sizes=[...m.s].sort((a,b)=>a-b);
  return {
    src: variant(photo,sizes[sizes.length-1]),
    srcSet: sizes.map(w=>variant(photo,w) + ' ' + w + 'w').join(', '),
    width: m.w, height: m.h, color: m.c, preview: m.p,
  };
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  photo: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  intrinsic?: boolean;
};

export default function Img({ photo, priority=false, alt='', sizes='100vw', fit='cover', intrinsic=false, className, style, ...rest }: Props) {
  const {src,srcSet,width,height,color,preview}=imageSources(photo);
  const placeholder: CSSProperties=fit==='cover' && preview
    ? {backgroundImage:'url(' + preview + ')',backgroundSize:'cover',backgroundPosition:'center',backgroundColor:color}
    : {backgroundColor:color};
  return <img src={src} srcSet={srcSet} sizes={sizes}
    width={width} height={height}
    alt={alt}
    loading={priority?'eager':'lazy'}
    decoding={priority?'sync':'async'}
    fetchPriority={priority?'high':'auto'}
    className={className}
    style={{...placeholder,...style}}
    {...(intrinsic ? {} : {})}
    {...rest} />;
}
