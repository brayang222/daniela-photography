import { MarbleBackdrop } from "@/components/marble-backdrop";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/site";

const SOCIAL_LINKS = [
  { href: INSTAGRAM_URL, label: "Instagram" },
  { href: WHATSAPP_URL, label: "WhatsApp" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy px-12 py-24">
      <MarbleBackdrop opacity={14} />

      <div className="relative border-t-2 border-paper/28 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-14">
          <div>
            <div className="mb-5 text-[11px] font-medium tracking-[0.28em] text-paper/55 uppercase">
              Hablemos
            </div>
            <h2 className="text-[clamp(40px,6vw,96px)] leading-none font-black tracking-[-0.03em] text-paper uppercase">
              Trabajemos
              <br />
              Juntos
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3.5">
            <a
              href="mailto:danielazuluaga2113@gmail.com"
              className="text-[17px] font-semibold tracking-[0.04em] text-paper transition-opacity hover:opacity-60"
            >
              danielazuluaga2113@gmail.com
            </a>
            <div className="mt-1.5 flex gap-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.22em] text-paper/55 uppercase transition-opacity hover:opacity-60"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-21 flex items-center justify-between border-t border-paper/18 pt-7">
          <div className="text-[11px] tracking-[0.2em] text-paper/55 uppercase">
            Daniela Zuluaga © 2026
          </div>
          <div className="text-[11px] tracking-[0.2em] text-paper/55 uppercase">
            Fotógrafa Visual · Medellín
          </div>
        </div>
      </div>
    </section>
  );
}
