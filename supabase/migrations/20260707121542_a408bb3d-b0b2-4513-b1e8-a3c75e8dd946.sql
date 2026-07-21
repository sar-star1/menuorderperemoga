
DROP POLICY IF EXISTS "Anyone can insert layouts" ON public.hero_image_layouts;
DROP POLICY IF EXISTS "Anyone can update layouts" ON public.hero_image_layouts;

CREATE POLICY "Authenticated users can insert layouts"
ON public.hero_image_layouts
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update layouts"
ON public.hero_image_layouts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

REVOKE INSERT, UPDATE ON public.hero_image_layouts FROM anon;
GRANT INSERT, UPDATE ON public.hero_image_layouts TO authenticated;
