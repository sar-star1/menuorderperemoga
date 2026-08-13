import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body = await req.json().catch(() => ({}));
    const { password, action } = body ?? {};
    const expected = Deno.env.get("ADMIN_PASSWORD");
    if (!expected || typeof password !== "string" || password !== expected) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "save") {
      const overrides = Array.isArray(body.overrides) ? body.overrides : [];
      const clean = overrides
        .filter((o: Record<string, unknown>) => typeof o?.item_key === "string")
        .slice(0, 1000)
        .map((o: Record<string, unknown>) => ({
          item_key: String(o.item_key).slice(0, 300),
          price: o.price ? String(o.price).slice(0, 40) : null,
          original_price: o.original_price ? String(o.original_price).slice(0, 40) : null,
          promo: o.promo ? String(o.promo).slice(0, 80) : null,
          updated_at: new Date().toISOString(),
        }));

      if (clean.length > 0) {
        const { error } = await supabase.from("menu_overrides").upsert(clean);
        if (error) {
          console.error("menu-admin upsert error:", error);
          return json({ error: error.message }, 500);
        }
      }

      if (body.settings) {
        const s = body.settings;
        const { error } = await supabase
          .from("promo_settings")
          .update({
            active: !!s.active,
            title: String(s.title ?? "").slice(0, 120),
            subtitle: String(s.subtitle ?? "").slice(0, 300),
            updated_at: new Date().toISOString(),
          })
          .eq("id", true);
        if (error) {
          console.error("menu-admin settings error:", error);
          return json({ error: error.message }, 500);
        }
      }
    }

    const [{ data: overrides }, { data: settings }] = await Promise.all([
      supabase.from("menu_overrides").select("*"),
      supabase.from("promo_settings").select("*").eq("id", true).maybeSingle(),
    ]);

    return json({ overrides: overrides ?? [], settings });
  } catch (e) {
    console.error("menu-admin error:", e);
    return json({ error: String(e) }, 500);
  }
});
