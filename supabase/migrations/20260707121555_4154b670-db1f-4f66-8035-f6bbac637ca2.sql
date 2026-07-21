
DROP POLICY IF EXISTS "Authenticated users can insert layouts" ON public.hero_image_layouts;
DROP POLICY IF EXISTS "Authenticated users can update layouts" ON public.hero_image_layouts;

CREATE POLICY "Authenticated users can insert layouts"
ON public.hero_image_layouts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update layouts"
ON public.hero_image_layouts
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);
