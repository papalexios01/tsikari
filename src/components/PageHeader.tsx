import Img from '@/components/Img';

type Props = { eyebrow: string; title: string; accent?: string; lead?: string; photo: string; alt: string };

export default function PageHeader({ eyebrow, title, accent, lead, photo, alt }: Props) {
  return (
    <section className="ge-pagehero" aria-labelledby="page-heading">
      <div className="ge-pagehero__frame">
        <Img photo={photo} priority sizes="100vw" alt={alt} className="ge-pagehero__image" />
        <div className="ge-pagehero__veil" aria-hidden="true" />
        <div className="ge-pagehero__content">
          <p className="ge-eyebrow">{eyebrow}</p>
          <h1 id="page-heading">{title} {accent && <em>{accent}</em>}</h1>
          {lead && <p className="ge-pagehero__lead">{lead}</p>}
        </div>
        <div className="ge-pagehero__bottom"><span>ARCHONTIKO TSIKARI</span><span>VAROS · LEMNOS · GREECE</span></div>
      </div>
    </section>
  );
}
