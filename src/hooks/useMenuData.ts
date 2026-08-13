import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { menuCategories, promoSection, type MenuCategory } from "@/data/menuData";

export type MenuOverride = {
  item_key: string;
  price: string | null;
  original_price: string | null;
  promo: string | null;
};

export const menuKeyOf = (category: string, itemName: string) => `${category}::${itemName}`;

/** Loads admin-editable price / discount / promo overrides and merges them into the static menu. */
export const useMenuData = () => {
  const [overrides, setOverrides] = useState<Record<string, MenuOverride>>({});
  const [promo, setPromo] = useState(promoSection);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [ov, st] = await Promise.all([
        supabase.from("menu_overrides").select("*"),
        supabase.from("promo_settings").select("*").eq("id", true).maybeSingle(),
      ]);
      if (cancelled) return;
      if (ov.data) {
        const map: Record<string, MenuOverride> = {};
        for (const row of ov.data as MenuOverride[]) map[row.item_key] = row;
        setOverrides(map);
      }
      if (st.data) {
        setPromo({
          active: st.data.active,
          title: st.data.title || promoSection.title,
          subtitle: st.data.subtitle ?? "",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories: MenuCategory[] = useMemo(
    () =>
      menuCategories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => {
          const o = overrides[menuKeyOf(cat.name, item.name)];
          if (!o) return item;
          return {
            ...item,
            price: o.price || item.price,
            originalPrice: o.original_price || undefined,
            promo: o.promo || undefined,
          };
        }),
      })),
    [overrides],
  );

  return { categories, promo };
};
