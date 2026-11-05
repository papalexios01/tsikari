import Img from '@/components/Img';

type Props = { eyebrow: string; title: string; accent?: string; lead?: string; photo: string; alt: string };

export default function PageHeader({ eyebrow, title, accent, lead, photo, alt }: Props) {
  return (
    <section className="bg-sand-50 p-2 sm:p-3">
      <div className="relative flex min-h-[68svh] items-end overflow-hidden rounded-[28px] bg-ink-900 sm:rounded-[36px]">
        <Img photo={photo} priority alt={alt} className="absolute inset-0 h-full w-full animate-slow-zoom object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-ink-900/50" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-36 lg:px-10 lg:pb-16">
          <p className="section-num animate-fade-up text-sand-200" style={{ animationDelay: '150ms' }}>{eyebrow}</p>
          <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h1 className="display max-w-4xl text-6xl text-sand-50 sm:text-7xl lg:text-[112px]">
              <span className="line-mask">
                <span className="block animate-line-up" style={{ animationDelay: '250ms' }}>
                  {title} {accent && <em className="text-sand-200">{accent}</em>}
                </span>
              </span>
            </h1>
            {lead && (
              <p className="max-w-sm animate-fade-up font-light text-sand-100/90 lg:pb-3 lg:text-right" style={{ animationDelay: '450ms' }}>
                {lead}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
