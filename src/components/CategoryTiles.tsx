import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import b2bSupreme from "@/assets/b2b-supreme-croissants.jpeg";
import breadSliced from "@/assets/bread-sliced.webp";
import breadBasket from "@/assets/bread-basket.webp";

type Tile = {
  to: string;
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
};

const defaultTiles: Tile[] = [
  {
    to: "/b2b",
    eyebrow: "ДЛЯ ПАРТНЕРСТВА",
    title: "HORECA (B2B) ",
    image: b2bSupreme,
    alt: "Авторська випічка Supreme для кав'ярень та ресторанів",
  },
  {
    to: "/clients",
    eyebrow: "АВТОРСЬКІ ВИРОБИ",
    title: "МЕНЮ ",
    image: breadSliced,
    alt: "Свіжий крафтовий хліб у пекарні Перемога, Київ",
  },
  {
    to: "/standard-line",
    eyebrow: "МАСОВИЙ РИНОК",
    title: "СТАНДАРТИЗОВАНА ЛІНІЙКА ",
    image: breadBasket,
    alt: "Стандартизована лінійка випічки пекарні Перемога",
  },
];

const offsets = ["bg-pastel-peach", "bg-pastel-blue", "bg-pastel-lime"];

interface CategoryTilesProps {
  tiles?: Tile[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

const CategoryTiles = ({
  tiles = defaultTiles,
  eyebrow = "Що далі",
  heading = "Оберіть свій напрямок",
  className = "",
}: CategoryTilesProps) => {
  return (
    <section className={`py-20 md:py-28 bg-background ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="font-display-black text-foreground text-4xl md:text-6xl lg:text-7xl uppercase mt-4 leading-[0.9]">
            {heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={i % 2 === 1 ? "md:mt-16" : ""}
            >
              <Link to={tile.to} className="group block">
                <div className="relative mb-6">
                  <div
                    className={`absolute -bottom-3 -left-3 w-full h-full ${offsets[i % offsets.length]}`}
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden">
                    <img
                      src={tile.image}
                      alt={tile.alt}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                  {tile.eyebrow}
                </span>
                <h3 className="font-display-black text-foreground text-xl md:text-2xl uppercase mt-2 leading-tight">
                  {tile.title}
                </h3>
                <span className="inline-block mt-4 font-body text-[11px] uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1">
                  Дізнатись більше
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
