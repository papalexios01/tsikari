import Img from '@/components/Img';

type Props = { eyebrow: string; title: string; accent?: string; lead?: string; photo: string; alt: string };

export default function PageHeader({ eyebrow, title, accent, lead, photo, alt }: Props) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-ink-900">
      <Img photo={photo} priority alt={alt} className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-ink-900/40" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-36 lg:px-10 lg:pb-20">
        <p className="eyebrow animate-fade-up text-sand-200" style={{ animationDelay: '150ms' }}>{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl animate-fade-up text-5xl text-sand-50 sm:text-6xl lg:text-7xl" style={{ animationDelay: '280ms' }}>
          {title} {accent && <em className="text-clay-300">{accent}</em>}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl animate-fade-up font-light text-sand-100/90 sm:text-lg" style={{ animationDelay: '420ms' }}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
