import { useMemo, useState } from "react";
import { z } from "zod";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { menuCategories, type MenuItem } from "@/data/menuData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const MIN_QTY = 10;

const parsePrice = (price: string): number => {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

type ProductKey = string;
type CartMap = Record<ProductKey, number>;

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
  const [cart, setCart] = useState<CartMap>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const allItems = useMemo(() => {
    const list: { category: string; item: MenuItem }[] = [];
    for (const cat of menuCategories) {
      for (const item of cat.items) list.push({ category: cat.name, item });
    }
    return list;
  }, []);

  const itemByName = useMemo(() => {
    const map = new Map<string, MenuItem>();
    for (const { item } of allItems) map.set(item.name, item);
    return map;
  }, [allItems]);

  const setQty = (name: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[name];
      else next[name] = qty;
      return next;
    });
  };

  const inc = (name: string) => {
    const cur = cart[name] ?? 0;
    setQty(name, cur === 0 ? MIN_QTY : cur + 1);
  };
  const dec = (name: string) => {
    const cur = cart[name] ?? 0;
    if (cur <= MIN_QTY) setQty(name, 0);
    else setQty(name, cur - 1);
  };

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .map(([name, qty]) => {
          const item = itemByName.get(name);
          if (!item) return null;
          const unit = parsePrice(item.price);
          return { name, qty, unit, subtotal: unit * qty, item };
        })
        .filter(Boolean) as {
        name: string;
        qty: number;
        unit: number;
        subtotal: number;
        item: MenuItem;
      }[],
    [cart, itemByName],
  );

  const totalUah = cartLines.reduce((s, l) => s + l.subtotal, 0);
  const totalUnits = cartLines.reduce((s, l) => s + l.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartLines.length === 0) {
      toast({ title: "Кошик порожній", description: "Додайте позиції в замовлення." });
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
        name: l.name,
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display-black uppercase text-lg sm:text-xl tracking-tight leading-none">
              Peremoga Bakery
            </h1>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1.5">
              Оптове замовлення · мін. {MIN_QTY} шт / позиція
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            disabled={cartLines.length === 0}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Оформити</span>
            <span className="font-mono text-xs">
              {totalUnits > 0 ? `${totalUnits} · ${totalUah} ₴` : "0"}
            </span>
          </Button>
        </div>
      </header>

      {/* Intro */}
      <section className="container mx-auto px-6 pt-10 pb-6 max-w-3xl">
        <h2 className="font-display-black uppercase text-2xl sm:text-3xl leading-tight">
          Меню для B2B замовлень
        </h2>
        <p className="text-sm text-muted-foreground font-light mt-3 leading-relaxed">
          Оптові замовлення для кавʼярень, ресторанів та корпоративних клієнтів.
          Мінімальна кількість — {MIN_QTY} штук за позицією. Оплата та узгодження
          доставки після підтвердження менеджером.
        </p>
      </section>

      {/* Menu */}
      <main className="container mx-auto px-6 space-y-14">
        {menuCategories.map((cat) => (
          <section key={cat.name}>
            <div className="flex items-baseline justify-between border-b border-border pb-3 mb-6">
              <h3 className="font-display-black uppercase text-sm tracking-[0.2em]">
                {cat.name}
              </h3>
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {cat.items.length} позицій
              </span>
            </div>
            <ul className="divide-y divide-border">
              {cat.items.map((item) => {
                const qty = cart[item.name] ?? 0;
                const unit = parsePrice(item.price);
                return (
                  <li
                    key={item.name}
                    className="py-4 flex items-center gap-4 sm:gap-6"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-secondary/40 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display-black uppercase text-sm leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 font-body uppercase tracking-[0.2em]">
                        {item.weight}
                      </p>
                      {qty > 0 && (
                        <p className="text-[11px] text-muted-foreground mt-1 font-mono">
                          {qty} × {unit} ₴ = {qty * unit} ₴
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => dec(item.name)}
                        disabled={qty === 0}
                        aria-label="Зменшити"
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-sm w-10 text-center tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => inc(item.name)}
                        aria-label="Збільшити"
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>

      {/* Sticky cart bar (mobile-friendly) */}
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
            </div>
            <Button type="button" onClick={() => setCheckoutOpen(true)}>
              Оформити замовлення
            </Button>
          </div>
        </div>
      )}

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

          {/* Cart summary */}
          <div className="border border-border p-3 space-y-2">
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Ваше замовлення
            </p>
            {cartLines.length === 0 ? (
              <p className="text-sm text-muted-foreground">Кошик порожній.</p>
            ) : (
              <ul className="space-y-1.5">
                {cartLines.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setQty(l.name, 0)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Видалити ${l.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <span className="flex-1 truncate">{l.name}</span>
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
              <span className="font-display-black uppercase tracking-[0.2em] text-xs">
                Разом
              </span>
              <span>{totalUah} ₴</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="customer_name">Імʼя / Компанія *</Label>
              <Input
                id="customer_name"
                value={form.customer_name}
                onChange={(e) =>
                  setForm({ ...form, customer_name: e.target.value })
                }
                maxLength={120}
                required
              />
              {errors.customer_name && (
                <p className="text-xs text-destructive mt-1">
                  {errors.customer_name}
                </p>
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
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                )}
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
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
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
              {errors.address && (
                <p className="text-xs text-destructive mt-1">{errors.address}</p>
              )}
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
            <Button
              type="submit"
              disabled={submitting || cartLines.length === 0}
              className="w-full"
            >
              {submitting ? "Відправляємо…" : `Підтвердити замовлення · ${totalUah} ₴`}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">
              Натискаючи кнопку, ви погоджуєтесь, що менеджер звʼяжеться з вами для
              підтвердження. Оплата не стягується онлайн.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
