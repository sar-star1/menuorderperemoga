import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WheatDivider from "@/components/WheatDivider";
import MenuSection from "@/components/MenuSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

import CategoryTiles from "@/components/CategoryTiles";
import breadSliced from "@/assets/bread-sliced.webp";
import b2bSupreme from "@/assets/b2b-supreme-croissants.jpeg";
import charityBread from "@/assets/charity-bread-1.jpg";

const Clients = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 text-primary">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${breadSliced})` }}
          />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
          <div className="container mx-auto px-6 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              На головну
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground font-light">
                АВТОРСЬКІ ВИРОБИ
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 mb-6 tracking-wide">
                МЕНЮ 
              </h1>
              <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Оберіть улюблену випічку, дізнайтесь години роботи та як нас знайти у Києві.
              </p>
              <WheatDivider className="mt-10" />
            </motion.div>
          </div>
        </section>

        <MenuSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />

        <CategoryTiles
          eyebrow="Дивіться також"
          heading="Інші напрямки пекарні"
          tiles={[
            {
              to: "/b2b",
              eyebrow: "ДЛЯ ПАРТНЕРСТВА",
              title: "HORECA (B2B) ",
              image: b2bSupreme,
              alt: "HoReCa (B2B) співпраця для закладів Києва",
            },
            {
              to: "/standard-line",
              eyebrow: "МАСОВИЙ РИНОК",
              title: "СТАНДАРТИЗОВАНА ЛІНІЙКА ",
              image: charityBread,
              alt: "Стандартизована лінійка пекарні Перемога",
            },
            {
              to: "/",
              eyebrow: "Головна",
              title: "На головну",
              image: breadSliced,
              alt: "Повернутись на головну сторінку",
            },
          ]}
        />
      </main>
      <FooterSection />
    </div>
  );
};

export default Clients;
