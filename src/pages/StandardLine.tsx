import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Package,
  CalendarClock,
  Phone,
  Instagram,
  Sandwich,
  Beef,
  Flame,
  Wheat,
  Coffee,
  Plus,
  Minus,
} from "lucide-react";

const BaguetteIcon = ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 18c1.5-3 3-7 4.5-9s3.5-3 5-2.5 3 3 4 5.5 2 6.5 2.5 8.5" />
    <path d="M4.5 16.5c1.5-2.5 3-6 4.5-8s3.5-2.5 5-2 3 2.5 4 5 2 6 2.5 8" />
    <path d="M5 15c1.5-2 3-5 4.5-7s3.5-2 5-1.5 3 2 4 4.5 2 5.5 2.5 7.5" />
    <path d="M6 13.5c1.5-1.5 3-4 4.5-6s3.5-1.5 5-1 3 1.5 4 4 2 5 2.5 7" />
  </svg>
);
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CategoryTiles from "@/components/CategoryTiles";
import b2bSupreme from "@/assets/b2b-supreme-croissants.jpeg";
import b2bCake from "@/assets/b2b-cake.jpeg";
import breadSliced from "@/assets/bread-sliced.webp";

import heroAsset from "@/assets/baseline-hero.jpg.asset.json";
import branAsset from "@/assets/baseline-bran-bread.jpg.asset.json";
import burgerAsset from "@/assets/baseline-burger.jpg.asset.json";
import paniniAsset from "@/assets/baseline-panini.jpg.asset.json";
import baguetteAsset from "@/assets/baseline-baguette.jpg.asset.json";
import toastAsset from "@/assets/baseline-toast.jpg.asset.json";

type Product = {
  id: string;
  name: string;
  short: string;
  weight: string;
  image: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: string | number }>;
  tags: string[];
  formats?: string[];
  uses: string[];
  perks: string[];
  kcal: string;
  shelf: string;
  composition: string;
};

const products: Product[] = [
  {
    id: "bran",
    name: "Хліб з висівками",
    short: "Щільна м'якушка, тримає форму, не кришиться.",
    weight: "500 г",
    image: branAsset.url,
    icon: Wheat,
    tags: ["Нарізний", "Цілий"],
    formats: ["Нарізний — рівні скибки", "Цілий — під власну нарізку"],
    uses: ["Сендвічі", "Хлібна корзина", "Подача до супів"],
    perks: ["Стабільна структура", "Не кришиться", "Щоденне використання"],
    kcal: "239",
    shelf: "10 діб · заморозка 3 міс",
    composition:
      "Борошно пшеничне в/г, борошно 1/г, висівки, вода, цукор, дріжджі, олія, сіль.",
  },
  {
    id: "burger",
    name: "Булочка для бургерів",
    short: "Тримає начинку та соуси, не розмокає.",
    weight: "80 г",
    image: burgerAsset.url,
    icon: Beef,
    tags: ["З кунжутом"],
    uses: ["Класичні бургери", "Авторські бургери", "Takeaway"],
    perks: [
      "Не розвалюється при зборці",
      "Тримає соки начинки",
      "Добре підсмажується",
      "Зручна на потоці",
    ],
    kcal: "314",
    shelf: "7 діб · заморозка 2 міс",
    composition:
      "Борошно в/г, вода, цукор, маргарин вершковий, сухе молоко, дріжджі, олія, сіль, кунжут.",
  },
  {
    id: "panini",
    name: "Паніні",
    short: "Не деформується при пресуванні на грилі.",
    weight: "120 г",
    image: paniniAsset.url,
    icon: Flame,
    uses: ["Класичні паніні", "Гарячі сендвічі", "Доставка"],
    perks: [
      "Рівномірно підсмажується",
      "Не розсипається при розрізі",
      "Тримає соковиту начинку",
    ],
    kcal: "314",
    shelf: "7 діб · заморозка 2 міс",
    composition:
      "Борошно в/г, вода, цукор, маргарин вершковий, сухе молоко, дріжджі, олія, сіль.",
    tags: [],
  },
  {
    id: "baguette",
    name: "Багет",
    short: "Хрустка скоринка, еластична м'якушка.",
    weight: "150 г",
    image: baguetteAsset.url,
    icon: BaguetteIcon,
    tags: ["Цілий", "Під сендвіч"],
    formats: ["Цілий — для власної нарізки", "З надрізами — швидка подача"],
    uses: ["Сендвічі", "Брускети", "Хлібна корзина"],
    perks: [
      "Легко ріжеться рівно",
      "Зберігає форму при подачі",
      "Підходить для запікання",
    ],
    kcal: "314",
    shelf: "7 діб · заморозка 2 міс",
    composition:
      "Борошно в/г, вода, цукор, маргарин вершковий, сухе молоко, дріжджі, олія, сіль, кунжут.",
  },
  {
    id: "toast",
    name: "Тостовий хліб",
    short: "Рівномірна пористість, м'яка еластична м'якушка.",
    weight: "—",
    image: toastAsset.url,
    icon: ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M4 16c0-3 2.5-6 5-6h6c2.5 0 5 3 5 6v3c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1z" />
        <path d="M6 10V8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2" />
        <path d="M9 17v2" />
        <path d="M12 17v2" />
        <path d="M15 17v2" />
      </svg>
    ),
    tags: ["Нарізний", "Цілий"],
    formats: ["Нарізний — рівні скибки", "Цілий — під власний формат"],
    uses: ["Тости", "Сендвічі", "Сніданки", "Takeaway"],
    perks: [
      "Рівномірно підсмажується",
      "Не кришиться при нарізці",
      "Зручний на потоці",
    ],
    kcal: "—",
    shelf: "7 діб · заморозка 2 міс",
    composition:
      "Борошно в/г, вода, цукор, маргарин вершковий, сухе молоко, дріжджі, олія, сіль.",
  },
];

const facts = [
  { value: "5+", label: "років з HoReCa" },
  { value: "100+", label: "одиниць — мін. замовлення" },
  { value: "24/7", label: "комунікація з менеджером" },
  { value: "Київ", label: "та область" },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="font-body text-[11px] uppercase tracking-[0.4em] text-accent-blue">
    {children}
  </span>
);

const StandardLine = () => {
  const [activeId, setActiveId] = useState(products[0].id);
  const [specsOpen, setSpecsOpen] = useState(false);
  const active = products.find((p) => p.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 text-primary">
        {/* Hero */}
        <section className="relative overflow-hidden bg-accent-blue-soft">
          <div className="container mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 font-light"
            >
              <ArrowLeft className="w-4 h-4" />
              На головну
            </Link>

            <div className="grid md:grid-cols-12 gap-10 items-end">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="md:col-span-7"
              >
                <Eyebrow>HoReCa · B2B</Eyebrow>
                <h1 className="font-display-black text-foreground text-5xl md:text-7xl lg:text-8xl mt-5 leading-[0.9]">
                  Базова
                  <br />
                  Лінійка
                </h1>
                <p className="mt-8 max-w-md text-muted-foreground text-base md:text-lg leading-[1.7] font-light">
                  Однакова вага, стабільна якість, прогнозована собівартість.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="md:col-span-5 relative"
              >
                <div
                  className="absolute -bottom-4 -left-4 w-full h-full bg-accent-blue"
                  aria-hidden="true"
                />
                <img
                  src={heroAsset.url}
                  alt="Базова лінійка пекарні Перемога"
                  className="relative w-full aspect-[4/5] object-cover"
                />
              </motion.div>
            </div>

            {/* Facts strip */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-accent-blue/20 border border-accent-blue/20">
              {facts.map((f) => (
                <div key={f.label} className="bg-accent-blue-soft p-5 md:p-6">
                  <div className="font-display-black text-foreground text-3xl md:text-4xl leading-none">
                    {f.value}
                  </div>
                  <div className="mt-2 font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive product explorer */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <Eyebrow>Оберіть продукт</Eyebrow>
              <h2 className="font-display-black text-foreground text-4xl md:text-5xl leading-[0.95] mt-4">
                П'ять позицій. Натисніть, щоб дослідити.
              </h2>
            </div>

            {/* Picker */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 max-w-5xl">
              {products.map((p) => {
                const Icon = p.icon;
                const isActive = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveId(p.id);
                      setSpecsOpen(false);
                    }}
                    className={`group relative text-left p-4 md:p-5 border transition-all duration-300 ${
                      isActive
                        ? "bg-accent-blue text-primary-foreground border-accent-blue"
                        : "bg-background border-border hover:border-accent-blue hover:-translate-y-1"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-primary-foreground" : "text-accent-blue"
                      }`}
                      strokeWidth={1.5}
                    />
                    <div
                      className={`mt-4 font-body text-[10px] uppercase tracking-[0.25em] ${
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      0{products.indexOf(p) + 1}
                    </div>
                    <div className="mt-1 font-display-black text-sm md:text-base leading-tight">
                      {p.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active product */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-12 gap-10 md:gap-14 max-w-6xl"
              >
                {/* Image */}
                <div className="md:col-span-5 relative">
                  <div
                    className="absolute -bottom-4 -left-4 w-full h-full bg-pastel-blue"
                    aria-hidden="true"
                  />
                  <img
                    src={active.image}
                    alt={active.name}
                    className="relative w-full aspect-[4/5] object-cover"
                  />
                  {active.weight !== "—" && (
                    <span className="absolute top-4 left-4 z-10 bg-accent-blue text-primary-foreground font-body text-[11px] uppercase tracking-[0.25em] px-3 py-1.5">
                      {active.weight}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-7 flex flex-col">
                  <div className="flex items-center gap-3">
                    <ActiveIcon className="w-5 h-5 text-accent-blue" strokeWidth={1.5} />
                    <Eyebrow>Базова лінійка</Eyebrow>
                  </div>
                  <h3 className="font-display-black text-foreground text-4xl md:text-5xl leading-[0.95] mt-3">
                    {active.name}
                  </h3>
                  <p className="mt-5 text-muted-foreground text-base font-light leading-[1.7] max-w-lg">
                    {active.short}
                  </p>

                  {active.tags && active.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <span
                          key={t}
                          className="font-body text-[11px] uppercase tracking-[0.25em] text-accent-blue border border-accent-blue/40 px-3 py-1.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Uses chips */}
                  <div className="mt-8">
                    <span className="font-body text-[11px] uppercase tracking-[0.3em] text-foreground">
                      Підходить для
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.uses.map((u) => (
                        <span
                          key={u}
                          className="bg-accent-blue-soft text-foreground text-sm px-3 py-1.5"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Perks grid */}
                  <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    {active.perks.map((perk, i) => (
                      <motion.div
                        key={perk}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 * i }}
                        className="flex items-start gap-3 border-l-2 border-accent-blue pl-3 py-1"
                      >
                        <span className="text-sm text-foreground font-light leading-snug">
                          {perk}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Specs accordion */}
                  <button
                    onClick={() => setSpecsOpen((v) => !v)}
                    className="mt-10 flex items-center justify-between w-full max-w-lg border-t border-border pt-5 font-body text-[11px] uppercase tracking-[0.3em] text-foreground"
                  >
                    <span>Склад · зберігання · КБЖУ</span>
                    {specsOpen ? (
                      <Minus className="w-4 h-4 text-accent-blue" />
                    ) : (
                      <Plus className="w-4 h-4 text-accent-blue" />
                    )}
                  </button>
                  <AnimatePresence>
                    {specsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden max-w-lg"
                      >
                        <div className="grid sm:grid-cols-3 gap-5 pt-5 text-xs">
                          <div>
                            <div className="uppercase tracking-[0.25em] text-muted-foreground mb-1.5 text-[10px]">
                              Ккал / 100 г
                            </div>
                            <div className="font-display-black text-foreground text-2xl">
                              {active.kcal}
                            </div>
                          </div>
                          <div>
                            <div className="uppercase tracking-[0.25em] text-muted-foreground mb-1.5 text-[10px]">
                              Зберігання
                            </div>
                            <div className="text-foreground font-light leading-snug">
                              {active.shelf}
                            </div>
                          </div>
                          <div>
                            <div className="uppercase tracking-[0.25em] text-muted-foreground mb-1.5 text-[10px]">
                              Склад
                            </div>
                            <div className="text-muted-foreground font-light leading-relaxed">
                              {active.composition}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Cooperation */}
        <section className="py-24 md:py-32 bg-accent-blue-soft border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Eyebrow>Старт співпраці</Eyebrow>
              <h2 className="font-display-black text-foreground text-4xl md:text-6xl leading-[0.95] mt-5">
                Почати — просто
              </h2>
            </motion.div>

            <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl">
              {[
                { icon: MapPin, label: "Доставка", value: "Київ та область" },
                { icon: Package, label: "Мін. замовлення", value: "від 100 од." },
                { icon: CalendarClock, label: "Графік", value: "Регулярно" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-background p-8 border-t-2 border-accent-blue hover:-translate-y-1 transition-transform"
                >
                  <card.icon className="w-6 h-6 text-accent-blue" strokeWidth={1.5} />
                  <span className="block font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground mt-6">
                    {card.label}
                  </span>
                  <div className="font-display-black text-foreground text-2xl mt-2 leading-tight">
                    {card.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section className="py-24 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 max-w-5xl">
              <div className="md:col-span-5">
                <Eyebrow>Контакти</Eyebrow>
                <h2 className="font-display-black text-foreground text-4xl md:text-5xl mt-4 leading-[0.95]">
                  На зв'язку
                </h2>
              </div>
              <div className="md:col-span-7 grid sm:grid-cols-2 gap-8 text-sm">
                <div>
                  <MapPin className="w-5 h-5 text-accent-blue mb-3" strokeWidth={1.5} />
                  <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Адреса
                  </span>
                  <p className="text-foreground mt-2 font-light leading-relaxed">
                    м. Київ, вул. Григоровича-Барського, 1
                    <br />
                    м. Крюківщина
                  </p>
                </div>
                <div>
                  <Phone className="w-5 h-5 text-accent-blue mb-3" strokeWidth={1.5} />
                  <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Телефон
                  </span>
                  <a
                    href="tel:+380969694485"
                    className="block text-foreground mt-2 font-light hover:text-accent-blue transition-colors"
                  >
                    +38 (096) 96-94-485
                  </a>
                </div>
                <div>
                  <Instagram className="w-5 h-5 text-accent-blue mb-3" strokeWidth={1.5} />
                  <span className="font-body text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Instagram
                  </span>
                  <a
                    href="https://instagram.com/peremogabakery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-foreground mt-2 font-light hover:text-accent-blue transition-colors"
                  >
                    @peremogabakery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryTiles
          eyebrow="Дивіться також"
          heading="Інші напрямки пекарні"
          tiles={[
            {
              to: "/b2b",
              eyebrow: "ДЛЯ ПАРТНЕРСТВА",
              title: "HORECA (B2B) ",
              image: b2bSupreme,
              alt: "HoReCa (B2B) співпраця для кав'ярень та ресторанів",
            },
            {
              to: "/clients",
              eyebrow: "АВТОРСЬКІ ВИРОБИ",
              title: "МЕНЮ ",
              image: b2bCake,
              alt: "Меню та адреса пекарні Перемога",
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

export default StandardLine;
