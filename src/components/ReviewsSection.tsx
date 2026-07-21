import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Тетяна Нікітішина",
    text: "Щодня ходжу в цю кав'ярню з дочкою, нам дуже подобається😍 Випічка завжди дуже свіжа і кава дуже смачна!! Бариста дуже мила та привітна) В кав'ярні приємна атмосфера, гарні декорації, дуже тепло та затишно. Раджу всім!!",
    rating: 5,
  },
  {
    name: "Мария Ходзицкая",
    text: "Це місце, де завжди зустрічають з посмішкою на обличчі, запропонують найсмачнішу випічку, та ароматну каву. Я таких еклерів більше ніде не куштувала — ніжнюсінькі, дуже-дуже смачні! А ще, рекомендую скуштувати хлібчик!",
    rating: 5,
  },
  {
    name: "Aeris",
    text: "Атмосфера дуже затишна, а кава завжди смачна та ароматна. Бариста Каріна — просто чудова, завжди привітна і допоможе обрати ідеальний напій. Місце ідеально підходить як для швидкої кави, так і для неспішного відпочинку.",
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-foreground text-foreground" strokeWidth={0} />
    ))}
  </div>
);

const ReviewsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Успіх наших гостей
          </span>
          <h2 className="font-display-black text-foreground text-4xl md:text-6xl lg:text-7xl uppercase mt-4 leading-[0.9]">
            Вони вже обрали
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <a
            href="https://maps.app.goo.gl/QyoiGuZsLpDQeFmB9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-b border-foreground pb-1 text-foreground hover:opacity-60 transition-opacity"
          >
            <Stars count={5} />
            <span className="font-body text-[11px] uppercase tracking-[0.3em]">Google Reviews</span>
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-t border-foreground pt-6"
            >
              <Stars count={review.rating} />
              <p className="text-foreground text-sm leading-[1.8] font-light mt-5 mb-6">
                "{review.text}"
              </p>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                — {review.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://maps.app.goo.gl/QyoiGuZsLpDQeFmB9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-[11px] uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Усі відгуки на Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
