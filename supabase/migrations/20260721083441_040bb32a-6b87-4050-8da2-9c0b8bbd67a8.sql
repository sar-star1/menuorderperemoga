
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total_uah INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(customer_name) BETWEEN 1 AND 120
    AND length(phone) BETWEEN 5 AND 40
    AND length(email) BETWEEN 3 AND 255
    AND length(address) BETWEEN 3 AND 500
    AND (notes IS NULL OR length(notes) <= 1000)
    AND jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) BETWEEN 1 AND 100
    AND total_uah >= 0
  );
