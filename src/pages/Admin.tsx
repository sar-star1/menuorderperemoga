import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/peremoga-logo.jpg.asset.json";

type OrderItem = {
  name: string;
  qty: number;
  unit_price_uah: number;
  subtotal_uah: number;
};

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  notes: string | null;
  total_uah: number;
  items: OrderItem[];
  completed_at: string | null;
};

const Admin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("get-orders", {
      body: { password },
    });
    setLoading(false);
    if (error || !data?.orders) {
      toast({
        title: "Не вдалось завантажити",
        description: "Перевірте пароль адміністратора.",
        variant: "destructive",
      });
      return;
    }
    setOrders(data.orders as Order[]);
  };

  const toggleComplete = async (order: Order) => {
    setUpdatingId(order.id);
    const nextCompleted = !order.completed_at;
    const { data, error } = await supabase.functions.invoke("update-order-status", {
      body: { password, orderId: order.id, completed: nextCompleted },
    });
    setUpdatingId(null);
    if (error || !data?.order) {
      toast({
        title: "Не вдалося оновити",
        description: "Спробуйте ще раз.",
        variant: "destructive",
      });
      return;
    }
    setOrders((prev) =>
      prev
        ? prev.map((o) =>
            o.id === order.id ? { ...o, completed_at: data.order.completed_at } : o,
          )
        : prev,
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-30">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <img src={logo.url} alt="Peremoga Bakery" className="h-9 w-9 object-contain" />
          <div>
            <h1 className="font-display-black uppercase text-lg leading-none">
              Peremoga Bakery
            </h1>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
              Адмін · замовлення
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {orders === null ? (
          <form onSubmit={load} className="max-w-sm space-y-3">
            <Label htmlFor="pwd">Пароль адміністратора</Label>
            <Input
              id="pwd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Завантаження…" : "Увійти"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {orders.length} замовлень
              </p>
              <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
                {loading ? "…" : "Оновити"}
              </Button>
            </div>
            {orders.length === 0 && (
              <p className="text-sm text-muted-foreground">Поки що немає замовлень.</p>
            )}
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="border border-border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-display-black uppercase text-sm">
                        {o.customer_name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {new Date(o.created_at).toLocaleString("uk-UA")}
                      </p>
                    </div>
                    <span className="font-mono text-sm">{o.total_uah} ₴</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Тел: </span>
                      <a href={`tel:${o.phone}`} className="underline">
                        {o.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      <a href={`mailto:${o.email}`} className="underline">
                        {o.email}
                      </a>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-muted-foreground">Адреса: </span>
                      {o.address}
                    </div>
                    {o.notes && (
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground">Коментар: </span>
                        {o.notes}
                      </div>
                    )}
                  </div>
                  <ul className="border-t border-border pt-2 space-y-1 text-xs">
                    {(o.items ?? []).map((it, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between font-mono gap-3"
                      >
                        <span className="truncate">{it.name}</span>
                        <span className="text-muted-foreground whitespace-nowrap">
                          {it.qty} × {it.unit_price_uah} ₴
                        </span>
                        <span className="w-16 text-right whitespace-nowrap">
                          {it.subtotal_uah} ₴
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
