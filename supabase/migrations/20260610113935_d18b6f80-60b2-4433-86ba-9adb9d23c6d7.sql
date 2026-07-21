CREATE TABLE public.hero_image_layouts (
  viewport TEXT NOT NULL,
  image_id TEXT NOT NULL,
  x DOUBLE PRECISION NOT NULL DEFAULT 0,
  y DOUBLE PRECISION NOT NULL DEFAULT 0,
  size DOUBLE PRECISION NOT NULL DEFAULT 120,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (viewport, image_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_image_layouts TO anon, authenticated;
GRANT ALL ON public.hero_image_layouts TO service_role;

ALTER TABLE public.hero_image_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read layouts"
  ON public.hero_image_layouts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert layouts"
  ON public.hero_image_layouts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update layouts"
  ON public.hero_image_layouts FOR UPDATE
  USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_image_layouts;