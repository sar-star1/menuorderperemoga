CREATE TABLE public.menu_overrides (
  item_key text PRIMARY KEY,
  price text,
  original_price text,
  promo text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_overrides TO anon, authenticated;
GRANT ALL ON public.menu_overrides TO service_role;
ALTER TABLE public.menu_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read menu overrides" ON public.menu_overrides FOR SELECT USING (true);

CREATE TABLE public.promo_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  active boolean NOT NULL DEFAULT true,
  title text NOT NULL DEFAULT 'Товар тижня',
  subtitle text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.promo_settings TO anon, authenticated;
GRANT ALL ON public.promo_settings TO service_role;
ALTER TABLE public.promo_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read promo settings" ON public.promo_settings FOR SELECT USING (true);

INSERT INTO public.promo_settings (id) VALUES (true);