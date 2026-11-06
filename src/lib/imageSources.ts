import imageMeta from "@/data/imageMeta.json";

type Meta = { w: number; h: number; c: string; s: number[]; p: string };
const META = imageMeta as Record<string, Meta>;
const variant = (photo: string, width: number) =>
  photo.replace(/^\/images\//, "/img/").replace(/\.[^.]+$/, "-" + width + ".webp");

export function imageSources(photo: string) {
  const m = META[photo];
  if (!m || !Array.isArray(m.s) || !m.s.length)
    return {
      src: photo,
      width: undefined,
      height: undefined,
      color: undefined,
      srcSet: undefined,
      preview: undefined,
    };
  const sizes = [...m.s].sort((a, b) => a - b);
  return {
    src: variant(photo, sizes[sizes.length - 1]!),
    srcSet: sizes.map((w) => variant(photo, w) + " " + w + "w").join(", "),
    width: m.w,
    height: m.h,
    color: m.c,
    preview: m.p,
  };
}
