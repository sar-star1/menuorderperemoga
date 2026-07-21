import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PromoStripProps {
  eyebrow?: string;
  title: string;
  description: string | React.ReactNode;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
  reverse?: boolean;
  background?: "background" | "warm" | "linen";
  imageContain?: boolean;
}

// Cycle through pastel offset colors per instance for an editorial feel.
const pastelPalette = ["bg-pastel-peach", "bg-pastel-blue", "bg-pastel-lime", "bg-pastel-lavender"];
let stripCounter = 0;

const PromoStrip = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  reverse = false,
  background = "background",
  imageContain = false,
}: PromoStripProps) => {
  const pastel = pastelPalette[stripCounter++ % pastelPalette.length];

  const cta = ctaLabel && ctaHref ? (
    ctaExternal ? (
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 font-body text-[11px] uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity self-start"
      >
        {ctaLabel}
      </a>
    ) : (
      <Link
        to={ctaHref}
        className="inline-block mt-8 font-body text-[11px] uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity self-start"
      >
        {ctaLabel}
      </Link>
    )
  ) : null;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative ${reverse ? "md:order-2" : ""}`}
          >
            <div
              className={`absolute ${reverse ? "-top-4 -right-4" : "-bottom-4 -left-4"} w-full h-full ${pastel}`}
              aria-hidden="true"
            />
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className={`relative w-full aspect-square ${imageContain ? "object-contain bg-background" : "object-contain bg-background"}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`flex flex-col ${reverse ? "md:order-1" : ""}`}
          >
            {eyebrow && (
              <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-5">
                {eyebrow}
              </span>
            )}
            <h2 className="font-display-black text-foreground text-4xl md:text-5xl lg:text-6xl leading-[0.95] uppercase mb-6">
              {title}
            </h2>
            <div className="text-muted-foreground text-sm md:text-base font-light leading-[1.8] space-y-4 max-w-md">
              {typeof description === "string" ? <p>{description}</p> : description}
            </div>
            {cta}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;
