import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WheatDivider from "@/components/WheatDivider";
import CategoryTiles from "@/components/CategoryTiles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroBakery from "@/assets/b2b-hero-cake.jpeg";
import croissants from "@/assets/hero-croissants.jpg";
import breadBasket from "@/assets/bread-basket.webp";
import breadSliced from "@/assets/bread-sliced.webp";
import b2bSupreme from "@/assets/b2b-supreme-croissants.jpeg";
import b2bBread from "@/assets/b2b-craft-bread.jpeg";
import b2bEclairs from "@/assets/b2b-eclairs.jpeg";
import b2bPavlova from "@/assets/b2b-pavlova.jpeg";
import b2bCake from "@/assets/b2b-cake.jpeg";
import b2bTubes from "@/assets/b2b-tubes.jpeg";
import b2bCheesecake from "@/assets/b2b-cheesecake.jpeg";
import b2bQuiche from "@/assets/b2b-quiche.jpeg";
import b2bSavory from "@/assets/b2b-savory.jpeg";

const products = [
  {
    title: "Випічка",
    image: b2bSupreme,
    text: "Вся випічка виготовляється за власною рецептурою, яка адаптувала традиційний підхід до сучасних тенденцій. Незмінний топ-продажів — наші круглі круасани (Supreme, New York Roll) — сучасний десерт із листкового тіста ідеально круглої форми та з великою кількістю кремової начинки. Також пропонуємо великий вибір хрумких класичних круасанів з начинкою і без, сінабони та іншу випічку.",
  },
  {
    title: "Еклери",
    image: b2bEclairs,
    text: "Ми відтворили смак дитинства та поєднали класичне заварне тістечко з різними начинками. Наші еклери — це естетичне оздоблення, ароматне тісто і велика кількість начинки на будь-який смак.",
  },
  {
    title: "Чізкейки",
    image: b2bCheesecake,
    text: "Ніжні чізкейки нашого виробництва — це свіжі смаки і ароматна пісочна основа. Наш бестселер — чізкейк із солоною карамеллю власного виробництва.",
  },
  {
    title: "Торти",
    image: b2bCake,
    text: "Ми виготовляємо торти на будь-який смак. Незмінне правило кожного рецепту — свіжі і натуральні продукти, які гармонійно поєднуються між собою. Регулярно робимо сезонні оновлення асортименту.",
  },
  {
    title: "Кіші",
    image: b2bQuiche,
    text: "Хрустке тісто і смачні поживні начинки — відомий відкритий пиріг, який смакує як гарячим, так і холодним.",
  },
  {
    title: "«Солоне меню»",
    image: b2bSavory,
    text: "Сендвічі на крафтовому хлібі або хрумкі і повітряні круасани з поживними начинками на будь-який смак.",
  },
  {
    title: "Тарти",
    image: b2bEclairs,
    text: "Популярна позиція меню для будь-якого закладу. Хрумке і ароматне пісочне тісто в поєднанні зі свіжими натуральними начинками.",
  },
  {
    title: "Десерти",
    image: b2bPavlova,
    text: "Виготовляємо великий асортимент десертів на будь-який смак: донати з начинками, макарони, десерт Павлова, картопля з різними смаками, хрумкі трубочки з цікавими начинками і багато інших авторських виробів.",
  },
  {
    title: "Хрумкі трубочки",
    image: b2bTubes,
    text: "Тонкі ароматні трубочки з ніжною кремовою начинкою — улюблений десерт, який пасує як до кави, так і до святкового столу.",
  },
  {
    title: "Крафтовий хліб",
    image: b2bBread,
    text: "Хліб виготовляємо на основі закваски, яка забезпечує природний, повільний процес бродіння тіста. Це дозволяє розвиватись багатьом смаковим нотам і зберігає всі корисні речовини в зерні.",
  },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Вкажіть ім'я").max(100),
  company: z.string().trim().min(1, "Вкажіть назву закладу").max(150),
  phone: z.string().trim().min(5, "Вкажіть телефон").max(30),
  email: z.string().trim().email("Невірний email").max(255).or(z.literal("")),
  message: z.string().trim().max(1000).optional(),
});

const B2B = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "", tastingSet: false });
  const [tasting, setTasting] = useState({ name: "", company: "", phone: "" });

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Перевірте форму", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    const text = `Запит прайсу для закладів%0A%0AІм'я: ${encodeURIComponent(form.name)}%0AЗаклад: ${encodeURIComponent(form.company)}%0AТелефон: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0AКоментар: ${encodeURIComponent(form.message || "—")}%0AДегустаційний сет: ${form.tastingSet ? "Так" : "Ні"}`;
    window.location.href = `mailto:peremogabakery@gmail.com?subject=Запит%20прайсу%20для%20закладів&body=${text}`;
    toast({ title: "Дякуємо!", description: "Відкриваємо ваш email — надішліть листа, ми надішлемо прайс." });
  };

  const handleTastingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tasting.name.trim() || !tasting.company.trim() || !tasting.phone.trim()) {
      toast({ title: "Заповніть усі поля", variant: "destructive" });
      return;
    }
    const text = `Замовлення дегустаційного сету%0A%0AІм'я: ${encodeURIComponent(tasting.name)}%0AЗаклад: ${encodeURIComponent(tasting.company)}%0AТелефон: ${encodeURIComponent(tasting.phone)}`;
    window.location.href = `mailto:peremogabakery@gmail.com?subject=Дегустаційний%20сет&body=${text}`;
    toast({ title: "Дякуємо!", description: "Ми зв'яжемось із вами щодо дегустаційного сету." });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 text-primary">
        {/* Hero / Intro */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBakery})` }} />
          <div className="absolute inset-0 bg-background/40" />
          <Link
            to="/"
            className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            На головну
          </Link>
          <div className="container mx-auto px-6 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center bg-background/85 backdrop-blur-sm p-8 md:p-12 shadow-lg"
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-foreground/70 font-light">
                ДЛЯ ПАРТНЕРСТВА
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 mb-8 tracking-wide">
                Вітаємо Вас в пекарні «Перемога»!
              </h1>
              <div className="space-y-5 text-foreground/90 text-base md:text-lg font-light leading-relaxed text-left md:text-center">
                <p>
                  Наша пекарня — Ваш надійний партнер у постачанні авторської випічки, смачних десертів і
                  крафтового хлібу.
                </p>
                <p>Наразі ми виконуємо поставки в заклади Києва, Ірпеня і Бучі.</p>
                <p>
                  Працюємо виключно з натуральними і органічними продуктами високої якості. Постійно
                  вдосконалюємо рецептуру і оновлюємо асортимент.
                </p>
                <p>А швидка комунікація і персональний менеджер додає гнучкості нашій співпраці.</p>
                <p>
                  Також ви можете отримати <span className="font-normal text-foreground">10% кешбеку щомісяця</span> при
                  виконанні умов нашої програми лояльності для партнерів.
                </p>
              </div>

              <a
                href="#price"
                className="inline-flex items-center justify-center mt-10 px-10 py-4 bg-foreground text-background font-body text-sm uppercase tracking-[0.2em] font-light hover:bg-foreground/90 transition-colors"
              >
                Отримати прайс для закладів
              </a>
              <WheatDivider className="mt-12" />
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground font-light">
                Асортимент
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mt-3 tracking-wide">
                Наша продукція
              </h2>
              <WheatDivider className="mt-6" />
            </div>

            <div className="max-w-5xl mx-auto space-y-20">
              {products.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center ${
                    i % 2 === 1 ? "md:[&>img]:order-2" : ""
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4 tracking-wide">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA after products */}
        <section className="py-12 bg-wheat/10 border-y border-wheat/30">
          <div className="container mx-auto px-6 text-center">
            <p className="font-display text-2xl md:text-3xl font-light text-foreground tracking-wide mb-6">
              Готові співпрацювати?
            </p>
            <a
              href="#price"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-body text-sm uppercase tracking-[0.2em] font-light hover:bg-foreground/90 transition-colors"
            >
              Отримати прайс
            </a>
          </div>
        </section>

        {/* Price request form */}
        <section id="price" className="py-24 pb-32 bg-background">
          <div className="container mx-auto px-6">
            <motion.form
              onSubmit={handlePriceSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto border border-wheat/30 bg-wheat/5 p-8 md:p-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3 tracking-wide text-center">
                Отримати прайс для закладів
              </h2>
              <p className="text-sm text-muted-foreground font-light text-center mb-8">
                Заповніть форму — надішлемо актуальний прайс і умови співпраці.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-body text-xs uppercase tracking-[0.15em] font-light">Ім'я *</Label>
                  <Input id="name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="company" className="font-body text-xs uppercase tracking-[0.15em] font-light">Заклад *</Label>
                  <Input id="company" maxLength={150} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-body text-xs uppercase tracking-[0.15em] font-light">Телефон *</Label>
                  <Input id="phone" maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-body text-xs uppercase tracking-[0.15em] font-light">Email</Label>
                  <Input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-body text-xs uppercase tracking-[0.15em] font-light">Коментар</Label>
                  <Textarea id="message" maxLength={1000} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2" />
                </div>
              </div>
              <label className="flex items-center gap-3 mt-6 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.tastingSet}
                  onChange={(e) => setForm({ ...form, tastingSet: e.target.checked })}
                  className="w-5 h-5 accent-foreground shrink-0"
                />
                <span className="font-body text-sm text-foreground font-light">Замовити Дегустаційний Сет</span>
              </label>
              <button
                type="submit"
                className="w-full mt-6 px-8 py-3 bg-foreground text-background font-body text-sm uppercase tracking-[0.15em] font-light hover:bg-foreground/90 transition-colors"
              >
                Надіслати запит
              </button>
            </motion.form>
          </div>
        </section>

        {/* Cross-link tiles to other destinations */}
        <CategoryTiles
          eyebrow="Дивіться також"
          heading="Інші напрямки пекарні"
          tiles={[
            {
              to: "/clients",
              eyebrow: "АВТОРСЬКІ ВИРОБИ",
              title: "МЕНЮ ",
              image: breadSliced,
              alt: "Меню пекарні Перемога для гостей у Києві",
            },
            {
              to: "/standard-line",
              eyebrow: "МАСОВИЙ РИНОК",
              title: "СТАНДАРТИЗОВАНА ЛІНІЙКА ",
              image: heroBakery,
              alt: "Стандартизована лінійка пекарні Перемога",
            },
            {
              to: "/",
              eyebrow: "Головна",
              title: "На головну",
              image: b2bCake,
              alt: "Повернутись на головну сторінку",
            },
          ]}
        />
      </main>

      {/* Sticky bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-foreground/95 backdrop-blur-sm border-t border-foreground/20">
        <div className="container mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs sm:text-sm text-background/90 font-light tracking-wide text-center sm:text-left">
            Працюємо із закладами Києва, Ірпеня і Бучі · 10% кешбеку щомісяця
          </p>
          <a
            href="#price"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-background text-foreground font-body text-xs uppercase tracking-[0.2em] font-light hover:bg-background/90 transition-colors whitespace-nowrap"
          >
            Отримати прайс
          </a>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default B2B;
