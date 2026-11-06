import type { CSSProperties, ImgHTMLAttributes, SyntheticEvent } from "react";
import { imageSources } from "@/lib/imageSources";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  photo: string;
  priority?: boolean;
};

/** Responsive WebP with blurred preview, intrinsic size and original-file fallback. */
export function Img({ photo, priority = false, alt = "", sizes = "100vw", style, ...rest }: Props) {
  const { src, srcSet, width, height, color, preview } = imageSources(photo);
  const bg: CSSProperties = preview
    ? {
        backgroundImage: `url(${preview})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: color,
      }
    : { backgroundColor: color };
  const fallback = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.dataset["fallback"] !== "1" && photo !== src) {
      el.dataset["fallback"] = "1";
      el.removeAttribute("srcset");
      el.src = photo;
    }
  };
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      onError={fallback}
      style={{ ...bg, ...style }}
      {...rest}
    />
  );
}
