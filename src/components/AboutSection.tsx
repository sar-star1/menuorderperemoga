import { motion } from "framer-motion";
import WheatDivider from "./WheatDivider";
import teamPhoto from "@/assets/team-photo.jpg";

const pillars = [
  {
    title: "Для вашої кав'ярні",
    description: "Отримуйте щоденні поставки авторських десертів, крафтового хліба та випічки — щоб ваші гості поверталися знову.",
  },
  {
    title: "Для ваших свят",
    description: "Довірте нам торт, подарунковий набір чи кейтеринг — ми створимо те, що зробить ваше свято незабутнім.",
  },
  {
    title: "Для нашої перемоги",
    description: "Кожна ваша покупка підтримує наш благодійний проєкт — хліб «Перемога» для прифронтових територій та військових.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Our Story — text left, photo right */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground font-light">
                Ваш провідник у світі ремісничої випічки
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 mb-8 tracking-wide">
                Ми розуміємо, що кожен момент — особливий
              </h2>
              <WheatDivider />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text — left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-muted-foreground text-base md:text-lg leading-[1.9] mb-6 font-light">
                Ви шукаєте не просто випічку — ви шукаєте щось справжнє. Щось, що зробить ваш ранок 
                теплішим, свято — незабутнім, а кав'ярню — улюбленим місцем ваших гостей.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-[1.9] mb-6 font-light">
                З 2021 року ми допомагаємо людям знаходити саме це. Наша пекарня народилася з пристрасті 
                до ремесла, а у 2022 році, з початком війни, отримала своє ім'я — коли ми почали 
                випікати благодійний хліб "Перемога" для прифронтових територій.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-[1.9] mb-6 font-light">
                Сьогодні ми поєднуємо авторські рецептури та натуральні інгредієнти, щоб кожен ваш 
                вибір був осмисленим — і неймовірно смачним.
              </p>
              <p className="text-foreground text-base md:text-lg leading-[1.9] font-medium">
                Наша мета — щоб кожен ваш момент з нашою випічкою став особливим.
              </p>
            </motion.div>

            {/* Team Photo — right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img
                src={teamPhoto}
                alt="Команда пекарні Перемога"
                className="w-full rounded-sm object-contain"
                loading="lazy"
              />
              <p className="text-center text-sm text-muted-foreground mt-4 font-light italic">
                Наша команда — серце пекарні "Перемога"
              </p>
            </motion.div>
          </div>
        </div>

        {/* What we do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground text-center mb-12 tracking-wide">
            Три простих кроки до вашої ідеальної випічки:
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center p-8 border border-border hover:border-wheat/40 transition-colors duration-500"
              >
                <div className="w-8 h-8 mx-auto mb-5 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-wheat">
                    <path d="M24 30V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M24 8C22 6 20 3 20 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M24 8C26 6 28 3 28 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <ellipse cx="20" cy="1" rx="2" ry="3.5" transform="rotate(-15 20 1)" fill="currentColor" opacity="0.5" />
                    <ellipse cx="28" cy="1" rx="2" ry="3.5" transform="rotate(15 28 1)" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
                <h4 className="font-display text-lg font-medium text-foreground mb-3">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-center mt-16 pt-16 border-t border-border"
        >
          <p className="text-muted-foreground text-base leading-[1.9] mb-6 font-light">
            Наші Паски, калачі, штолени та інші традиційні вироби стали улюбленими серед сотень 
            київських родин. Торти на замовлення та подарункові набори — для тих, хто цінує смак 
            і хоче подарувати щось справді особливе.
          </p>
          <p className="text-muted-foreground text-sm leading-[1.9] font-light italic">
            Кожен виріб — авторська рецептура, натуральні інгредієнти та увага до кожної деталі.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border max-w-2xl mx-auto"
        >
          {[
            { value: "2021", label: "Рік заснування" },
            { value: "HORECA (B2B) ", label: "Ключовий напрямок" },
            { value: "24/7", label: "СТАНДАРТИЗОВАНА ЛІНІЙКА " },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-light text-foreground mb-2 tracking-wide">
                {stat.value}
              </div>
              <div className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground font-light">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
