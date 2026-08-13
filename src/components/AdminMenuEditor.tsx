import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { menuCategories, promoSection } from "@/data/menuData";
import { menuKeyOf, type MenuOverride } from "@/hooks/useMenuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

type Draft = { price: string; original_price: string; promo: string };

const AdminMenuEditor = ({ password }: { password: string }) => {
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [settings, setSettings] = useState(promoSection);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const buildDrafts = (overrides: MenuOverride[]) => {
    const byKey = new Map(overrides.map((o) => [o.item_key, o]));
    const next: Record<string, Draft> = {};
    for (const cat of menuCategories) {
      for (const item of cat.items) {
        const key = menuKeyOf(cat.name, item.name);
        const o = byKey.get(key);
        next[key] = {
          price: o?.price || item.price,
          original_price: o?.original_price ?? (o ? "" : item.originalPrice ?? ""),
          promo: o?.promo ?? (o ? "" : item.promo ?? ""),
        };
      }
    }
    return next;
  };

  const load = async (action: "get" | "save" = "get") => {
    const payload: Record<string, unknown> = { password, action };
    if (action === "save") {
      payload.settings = settings;
      payload.overrides = Object.entries(drafts).map(([item_key, d]) => ({
        item_key,
        price: d.price.trim(),
        original_price: d.original_price.trim(),
        promo: d.promo.trim(),
      }));
    }
    const { data, error } = await supabase.functions.invoke("menu-admin", { body: payload });
    if (error || !data || data.error) {
      toast({
        title: action === "save" ? "Не вдалося зберегти" : "Не вдалося завантажити меню",
        variant: "destructive",
      });
      return false;
    }
    setDrafts(buildDrafts((data.overrides ?? []) as MenuOverride[]));
    if (data.settings) {
      setSettings({
        active: data.settings.active,
        title: data.settings.title || promoSection.title,
        subtitle: data.settings.subtitle ?? "",
      });
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      await load("get");
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    const ok = await load("save");
    setSaving(false);
    if (ok) toast({ title: "Збережено", description: "Меню оновлено на сайті." });
  };

  const set = (key: string, field: keyof Draft, value: string) =>
    setDrafts((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  if (loading) return <p className="text-sm text-muted-foreground">Завантаження меню…</p>;

  return (
    <div className="space-y-8">
      <div className="border border-border p-4 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display-black uppercase text-sm">Рубрика «Товар тижня»</p>
            <p className="text-xs text-muted-foreground">
              Вмикає кнопку і секцію «Акції» на сайті.
            </p>
          </div>
          <Switch
            checked={settings.active}
            onCheckedChange={(v) => setSettings((s) => ({ ...s, active: v }))}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Назва</Label>
            <Input
              value={settings.title}
              onChange={(e) => setSettings((s) => ({ ...s, title: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Підзаголовок</Label>
            <Input
              value={settings.subtitle}
              onChange={(e) => setSettings((s) => ({ ...s, subtitle: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Ціна — те, що бачить клієнт. Стара ціна — закреслена ціна поруч (залиште порожнім, якщо
        без знижки). Акція — напис на картці (наприклад «Товар тижня · -15%»); якщо заповнено,
        позиція зʼявляється в рубриці «Акції».
      </p>

      {menuCategories.map((cat) => (
        <div key={cat.name} className="space-y-3">
          <h3 className="font-display-black uppercase text-sm border-b border-border pb-2">
            {cat.name}
          </h3>
          <ul className="space-y-3">
            {cat.items.map((item) => {
              const key = menuKeyOf(cat.name, item.name);
              const d = drafts[key] ?? { price: item.price, original_price: "", promo: "" };
              return (
                <li key={key} className="grid gap-2 sm:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] sm:items-center">
                  <span className="text-xs">{item.name}</span>
                  <Input
                    aria-label={`Ціна ${item.name}`}
                    placeholder="Ціна"
                    value={d.price}
                    onChange={(e) => set(key, "price", e.target.value)}
                    className="h-9 font-mono text-xs"
                  />
                  <Input
                    aria-label={`Стара ціна ${item.name}`}
                    placeholder="Стара ціна"
                    value={d.original_price}
                    onChange={(e) => set(key, "original_price", e.target.value)}
                    className="h-9 font-mono text-xs"
                  />
                  <Input
                    aria-label={`Акція ${item.name}`}
                    placeholder="Акція / Товар тижня"
                    value={d.promo}
                    onChange={(e) => set(key, "promo", e.target.value)}
                    className="h-9 text-xs"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border py-3 flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? "Збереження…" : "Зберегти зміни"}
        </Button>
      </div>
    </div>
  );
};

export default AdminMenuEditor;
