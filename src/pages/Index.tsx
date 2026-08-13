import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Minus, Plus, ShoppingCart, X, Snowflake, Info, Tag } from "lucide-react";
import { deliveryTerms, type MenuItem } from "@/data/menuData";
import { useMenuData } from "@/hooks/useMenuData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import logo from "@/assets/peremoga-logo.jpg.asset.json";

const slugify = (name: string) =>
  "cat-" +
  name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");

const parsePrice = (price: string): number => {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

type CartMap = Record<string, number>;

const keyOf = (category: string, item: MenuItem) => `${category}::${item.name}`;
const minOf = (categoryMin: number, item: MenuItem) => item.minOrder ?? categoryMin;

const checkoutSchema = z.object({
  customer_name: z.string().trim().min(1, "Вкажіть імʼя").max(120),
  phone: z
    .string()
    .trim()
    .min(5, "Вкажіть телефон")
    .max(40)
    .regex(/^[+\d\s()-]+$/, "Некоректний телефон"),
  email: z.string().trim().email("Некоректний email").max(255),
  address: z.string().trim().min(3, "Вкажіть адресу доставки").max(500),
  notes: z.string().trim().max(1000).optional(),
});

const Index = () => {
  const { categories, promo } = useMenuData();
  const [cart, setCart] = useState<CartMap>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const promoItems = useMemo(
    () =>
      promo.active
        ? categories.flatMap((cat) =>
            cat.items.filter((i) => i.promo).map((item) => ({ category: cat.name, item })),
          )
        : [],
    [],
  );

  const scrollToCategory = (id: string) => {
    setNavOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const itemByKey = useMemo(() => {
    const map = new Map<string, { item: MenuItem; category: string; min: number }>();
    for (const cat of categories) {
      for (const item of cat.items) {
        map.set(keyOf(cat.name, item), {
          item,
          category: cat.name,
          min: minOf(cat.minOrder, item),
        });
      }
    }
    return map;
  }, []);

  const setQty = (key: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });
  };

  const inc = (key: string) => setQty(key, (cart[key] ?? 0) + 1);
  const dec = (key: string) => setQty(key, (cart[key] ?? 0) - 1);

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .map(([key, qty]) => {
          const entry = itemByKey.get(key);
          if (!entry) return null;
          const unit = parsePrice(entry.item.price);
          return {
            key,
            name: entry.item.name,
            category: entry.category,
            qty,
            unit,
            subtotal: unit * qty,
          };
        })
        .filter(Boolean) as {
        key: string;
        name: string;
        category: string;
        qty: number;
        unit: number;
        subtotal: number;
      }[],
    [cart, itemByKey],
  );

  const totalUah = cartLines.reduce((s, l) => s + l.subtotal, 0);
  const totalUnits = cartLines.reduce((s, l) => s + l.qty, 0);

  // Minimums are per group: the sum of all items in a category (excluding items
  // that carry their own individual minimum) must reach the category minimum.
  const groupStatus = useMemo(() => {
    const map = new Map<string, { qty: number; min: number; ok: boolean }>();
    for (const cat of categories) {
      let qty = 0;
      for (const item of cat.items) {
        if (item.minOrder) continue;
        qty += cart[keyOf(cat.name, item)] ?? 0;
      }
      map.set(cat.name, { qty, min: cat.minOrder, ok: qty === 0 || qty >= cat.minOrder });
    }
    return map;
  }, [cart]);

  const itemMinIssues = useMemo(
    () =>
      cartLines
        .map((l) => {
          const entry = itemByKey.get(l.key);
          const own = entry?.item.minOrder;
          if (!own || l.qty >= own) return null;
          return `${l.name} — мінімум ${own} шт.`;
        })
        .filter(Boolean) as string[],
    [cartLines, itemByKey],
  );

  const groupIssues = useMemo(
    () =>
      [...groupStatus.entries()]
        .filter(([, s]) => !s.ok)
        .map(([name, s]) => `${name} — мінімум ${s.min} шт. у групі (зараз ${s.qty})`),
    [groupStatus],
  );

  const blockingIssues = [...groupIssues, ...itemMinIssues];
  const canCheckout = cartLines.length > 0 && blockingIssues.length === 0;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartLines.length === 0) {
      toast({ title: "Кошик порожній", description: "Додайте позиції в замовлення." });
      return;
    }
    if (blockingIssues.length > 0) {
      toast({
        title: "Не дотримано мінімального замовлення",
        description: blockingIssues.join("; "),
        variant: "destructive",
      });
      return;
    }
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      address: parsed.data.address,
      notes: parsed.data.notes ?? null,
      items: cartLines.map((l) => ({
        name: `${l.category} — ${l.name}`,
        qty: l.qty,
        unit_price_uah: l.unit,
        subtotal_uah: l.subtotal,
      })),
      total_uah: totalUah,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Не вдалося оформити замовлення",
        description: "Спробуйте ще раз або звʼяжіться з нами напряму.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Замовлення прийнято",
      description: "Ми звʼяжемось з вами найближчим часом для підтвердження.",
    });
    setCart({});
    setForm({ customer_name: "", phone: "", email: "", address: "", notes: "" });
    setCheckoutOpen(false);
  };

  const renderItem = (categoryName: string, item: MenuItem) => {
    const key = keyOf(categoryName, item);
    const qty = cart[key] ?? 0;
    const unit = parsePrice(item.price);
    return (
      <li
        key={key}
        className="flex flex-row sm:flex-col gap-3 sm:gap-0 border-b border-border pb-4 sm:border-0 sm:pb-0"
      >
        <div className="relative order-2 sm:order-none w-24 h-24 sm:w-full sm:h-auto sm:aspect-[4/3] flex-shrink-0 bg-secondary/40 overflow-hidden flex items-center justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display-black uppercase text-[9px] sm:text-xs text-muted-foreground">
              Peremoga
            </span>
          )}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex flex-col items-start gap-1">
            {item.promo && (
              <span className="bg-destructive text-destructive-foreground font-body uppercase tracking-[0.2em] text-[8px] sm:text-[9px] px-1.5 py-0.5 sm:px-2 sm:py-1">
                {item.promo}
              </span>
            )}
            {item.badge && (
              <span
                className={`font-body uppercase tracking-[0.2em] text-[8px] sm:text-[9px] px-1.5 py-0.5 sm:px-2 sm:py-1 ${
                  item.badge === "NEW" || item.badge === "\n"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {item.badge}
              </span>
            )}
            {item.freezable && (
              <span className="hidden sm:flex items-center gap-1 bg-background/90 text-foreground font-body uppercase tracking-[0.2em] text-[9px] px-2 py-1">
                <Snowflake className="h-3 w-3" />
                Можна заморожувати
              </span>
            )}
          </div>
        </div>

        <div className="order-1 sm:order-none flex-1 min-w-0 flex flex-col">
          <div className="sm:mt-3 flex items-start justify-between gap-3">
            <h3 className="font-display-black uppercase text-sm leading-tight">{item.name}</h3>
            <span className="font-mono text-sm whitespace-nowrap">
              {item.originalPrice && (
                <span className="line-through text-muted-foreground mr-2">{item.originalPrice}</span>
              )}
              {item.price}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 sm:mt-2 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
            {item.description}
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1 sm:mt-2">
            {item.weight}
            {item.minOrder ? ` · мін. ${item.minOrder} шт.` : ""}
            {item.freezable ? " · можна заморожувати" : ""}
          </p>
          {item.storage && (
            <p className="hidden sm:block font-body text-[10px] text-muted-foreground/80 mt-1">
              {item.storage}
            </p>
          )}

          <div className="mt-auto pt-2 sm:pt-4 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {qty > 0 ? `${qty} × ${unit} ₴ = ${qty * unit} ₴` : ""}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => dec(key)}
                disabled={qty === 0}
                aria-label={`Зменшити ${item.name}`}
                className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono text-sm w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => inc(key)}
                aria-label={`Збільшити ${item.name}`}
                className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Категорії меню"
                className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity"
              >
                <img
                  src={logo.url}
                  alt="Peremoga Bakery"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain flex-shrink-0"
                />
                <span className="min-w-0">
                  <h1 className="font-display-black uppercase text-base sm:text-xl tracking-tight leading-none truncate">
                    Peremoga Bakery
                  </h1>
                  <span className="block font-body uppercase tracking-[0.25em] text-[9px] text-muted-foreground mt-1">
                    Категорії
                  </span>
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display-black uppercase text-lg">Категорії</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col">
                {promo.active && (
                  <button
                    type="button"
                    onClick={() => scrollToCategory("cat-akcii")}
                    className="text-left border-b border-border py-3 font-display-black uppercase text-sm hover:text-primary transition-colors"
                  >
                    Акції · {promo.title}
                  </button>
                )}
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => scrollToCategory(slugify(cat.name))}
                    className="text-left border-b border-border py-3 font-display-black uppercase text-sm hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            {promo.active && (
              <button
                type="button"
                onClick={() => scrollToCategory("cat-akcii")}
                className="hidden sm:flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-sm ring-2 ring-primary/30 hover:opacity-90 transition-opacity animate-pulse"
              >
                <Tag className="h-4 w-4" />
                <span className="font-body uppercase tracking-[0.2em] text-[11px]">
                  {promo.title}
                </span>
              </button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => setTermsOpen(true)}
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              <span className="font-body uppercase tracking-[0.2em] text-[11px]">Умови</span>
            </Button>
            <Button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              disabled={cartLines.length === 0}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="font-mono text-xs">
                {totalUnits > 0 ? `${totalUnits} · ${totalUah} ₴` : "0"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {promo.active && (
        <button
          type="button"
          onClick={() => scrollToCategory("cat-akcii")}
          className="sm:hidden w-full bg-primary text-primary-foreground py-2.5 flex items-center justify-center gap-2"
        >
          <Tag className="h-4 w-4" />
          <span className="font-body uppercase tracking-[0.25em] text-[10px]">
            {promo.title} · Акції
          </span>
        </button>
      )}

      {/* Menu */}
      <main className="container mx-auto px-6 pt-10 space-y-16">
        {promo.active && (
          <section id="cat-akcii" className="scroll-mt-24">
            <div className="border-b border-foreground pb-3 mb-8">
              <h2 className="font-display-black uppercase text-2xl sm:text-3xl tracking-tight leading-none flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Акції · {promo.title}
              </h2>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                {promo.subtitle}
              </p>
            </div>
            {promoItems.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-10">
                {promoItems.map(({ category, item }) => renderItem(category, item))}
              </ul>
            ) : (
              <p className="font-body text-sm text-muted-foreground">
                Зараз акційних позицій немає. Слідкуйте за оновленнями — тут зʼявиться «Товар тижня».
              </p>
            )}
          </section>
        )}
        {categories.map((cat) => {
          const status = groupStatus.get(cat.name)!;
          return (
          <section key={cat.name} id={slugify(cat.name)} className="scroll-mt-24">
            <div className="border-b border-foreground pb-3 mb-8">
              <h2 className="font-display-black uppercase text-2xl sm:text-3xl tracking-tight leading-none">
                {cat.name}
              </h2>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                {cat.note ?? `Мінімум ${cat.minOrder} шт. сумарно у групі`}
              </p>
              {status.qty > 0 && (
                <p
                  className={`font-mono text-[11px] mt-1 ${
                    status.ok ? "text-muted-foreground" : "text-destructive"
                  }`}
                >
                  У групі: {status.qty} шт.
                  {status.ok ? "" : ` — потрібно ще ${status.min - status.qty} шт.`}
                </p>
              )}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-10">
              {cat.items.map((item) => renderItem(cat.name, item))}
            </ul>
          </section>
          );
        })}
      </main>

      {/* Sticky cart bar */}
      {cartLines.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Кошик
              </p>
              <p className="font-mono text-sm truncate">
                {totalUnits} шт · {totalUah} ₴
              </p>
              {blockingIssues.length > 0 && (
                <p className="font-mono text-[11px] text-destructive truncate">
                  {blockingIssues[0]}
                </p>
              )}
            </div>
            <Button type="button" onClick={() => setCheckoutOpen(true)} disabled={!canCheckout}>
              Оформити замовлення
            </Button>
          </div>
        </div>
      )}

      {/* Terms dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display-black uppercase text-xl">
              {deliveryTerms.title}
            </DialogTitle>
            <DialogDescription className="font-body text-xs text-muted-foreground">
              Умови співпраці та доставки для партнерів Peremoga Bakery.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            {deliveryTerms.blocks.map((block) => (
              <div key={block.heading}>
                <h3 className="font-display-black uppercase text-xs tracking-[0.25em] border-b border-border pb-2">
                  {block.heading}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {block.lines.map((line) => (
                    <li key={line} className="text-xs text-muted-foreground leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display-black uppercase text-lg">
              Оформлення замовлення
            </DialogTitle>
            <DialogDescription className="font-body text-xs text-muted-foreground">
              Ми звʼяжемось з вами для підтвердження, узгодження оплати та доставки.
            </DialogDescription>
          </DialogHeader>

          <div className="border border-border p-3 space-y-2">
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Ваше замовлення
            </p>
            {cartLines.length === 0 ? (
              <p className="text-sm text-muted-foreground">Кошик порожній.</p>
            ) : (
              <ul className="space-y-1.5">
                {cartLines.map((l) => (
                  <li key={l.key} className="flex items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setQty(l.key, 0)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Видалити ${l.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <span className="flex-1 truncate">
                      {l.name}
                      <span className="text-muted-foreground"> · {l.category}</span>
                    </span>
                    <span className="font-mono text-muted-foreground whitespace-nowrap">
                      {l.qty} × {l.unit} ₴
                    </span>
                    <span className="font-mono whitespace-nowrap w-16 text-right">
                      {l.subtotal} ₴
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center justify-between border-t border-border pt-2 font-mono text-sm">
              <span className="font-display-black uppercase tracking-[0.2em] text-xs">Разом</span>
              <span>{totalUah} ₴</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="customer_name">Імʼя / Компанія *</Label>
              <Input
                id="customer_name"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                maxLength={120}
                required
              />
              {errors.customer_name && (
                <p className="text-xs text-destructive mt-1">{errors.customer_name}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={40}
                  required
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  required
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="address">Адреса доставки *</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                maxLength={500}
                required
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>
            <div>
              <Label htmlFor="notes">Коментар (необовʼязково)</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                maxLength={1000}
                rows={3}
              />
            </div>
            {blockingIssues.length > 0 && (
              <ul className="border border-destructive/40 p-3 space-y-1">
                {blockingIssues.map((msg) => (
                  <li key={msg} className="text-[11px] text-destructive">
                    {msg}
                  </li>
                ))}
              </ul>
            )}
            <Button
              type="submit"
              disabled={submitting || !canCheckout}
              className="w-full"
            >
              {submitting ? "Відправляємо…" : `Підтвердити замовлення · ${totalUah} ₴`}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">
              Натискаючи кнопку, ви погоджуєтесь, що менеджер звʼяжеться з вами для підтвердження.
              Оплата не стягується онлайн.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© Peremoga Bakery</span>
          <Link
            to="/admin"
            className="font-body uppercase tracking-[0.25em] text-[10px] hover:text-foreground transition-colors"
          >
            Адмін доступ
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
