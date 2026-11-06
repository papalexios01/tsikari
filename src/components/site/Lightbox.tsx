import { Img } from "@/components/site/Img";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Lightbox({
  photos,
  index,
  onChange,
}: {
  photos: string[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const go = useCallback(
    (d: number) => index !== null && onChange((index + d + photos.length) % photos.length),
    [index, photos.length, onChange],
  );
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) =>
      e.key === "Escape"
        ? onChange(null)
        : e.key === "ArrowRight"
          ? go(1)
          : e.key === "ArrowLeft"
            ? go(-1)
            : null;
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [index, go, onChange]);
  if (index === null) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 text-ink-foreground backdrop-blur"
      onClick={() => onChange(null)}
    >
      <Img
        key={index}
        photo={photos[index]!}
        sizes="92vw"
        style={{ background: "none" }}
        alt=""
        className="animate-in fade-in zoom-in-95 h-auto max-h-[86vh] w-auto max-w-[92vw] object-contain shadow-lift duration-500"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        aria-label="Close"
        className="absolute right-6 top-6 p-2 hover:text-gold"
        onClick={() => onChange(null)}
      >
        <X className="h-7 w-7" />
      </button>
      <button
        aria-label="Previous"
        className="absolute left-4 p-3 hover:text-gold"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        <ChevronLeft className="h-9 w-9" />
      </button>
      <button
        aria-label="Next"
        className="absolute right-4 p-3 hover:text-gold"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        <ChevronRight className="h-9 w-9" />
      </button>
      <p className="eyebrow absolute bottom-6">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
