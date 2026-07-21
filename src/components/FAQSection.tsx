import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Де знаходиться пекарня Peremoga Bakery?",
    a: "Ми знаходимося за адресою вулиця Григоровича-Барського, 1, Київ, Україна. Зручне розташування з безкоштовною парковкою.",
  },
  {
    q: "Який графік роботи пекарні?",
    a: "Ми працюємо з понеділка по суботу з 08:00 до 20:00. У неділю — вихідний.",
  },
  {
    q: "Чи можна замовити торт або десерти на замовлення?",
    a: "Так! Ми виготовляємо авторські торти та десерти на замовлення для свят, весіль та корпоративів. Зверніться до нас за телефоном або email для обговорення деталей.",
  },
  {
    q: "Чи є у вас B2B постачання для кав'ярень?",
    a: "Так, ми здійснюємо B2B постачання випічки та хліба для кав'ярень, ресторанів та готелів у Києві. Зв'яжіться з нами для обговорення умов співпраці.",
  },
  {
    q: "Чи є у вас безглютенова або веганська випічка?",
    a: "Наше меню постійно оновлюється. Будь ласка, зверніться до нас за телефоном або в Instagram, щоб дізнатися про актуальний асортимент.",
  },
  {
    q: "Чи є парковка біля пекарні?",
    a: "Так, біля нашої пекарні є безкоштовна парковка для відвідувачів.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Маєте запитання?
          </span>
          <h2 className="font-display-black text-foreground text-4xl md:text-6xl uppercase mt-4 leading-[0.9]">
            FAQ
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="border-t border-foreground">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-foreground"
            >
              <AccordionTrigger className="font-display-black text-foreground text-sm md:text-base uppercase hover:no-underline py-6 text-left tracking-tight">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground font-light leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </section>
  );
};

export default FAQSection;
