import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { imageSources } from '@/lib/imageSources';

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
    style={{...placeholder,...(intrinsic && width && height ? {aspectRatio: width / height} : {}),...style}}
    {...rest} />;
}
