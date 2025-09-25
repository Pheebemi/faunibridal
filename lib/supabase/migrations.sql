-- Create collections table first
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dresses table (references collections)
CREATE TABLE IF NOT EXISTS dresses (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  collection_id TEXT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (after tables are created)
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE dresses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on collections" ON collections
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on dresses" ON dresses
  FOR SELECT USING (true);

-- Create policies for admin access (you'll need to set up authentication)
-- For now, we'll allow all operations - you can restrict this later
CREATE POLICY "Allow all operations on collections" ON collections
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on dresses" ON dresses
  FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dresses_updated_at BEFORE UPDATE ON dresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO collections (id, title, description, image) VALUES
  ('bridal-rentals', 'Bridal Rentals', 'Affordable luxury gowns available for rent.', '/dresses/6.jpg'),
  ('bridal-dresses-for-sale', 'Bridal Dresses for Sale', 'Own your dream wedding dress.', '/dresses/1.jpg'),
  ('made-in-naija-customs', 'Made-in-Naija Customs', 'Locally crafted, bespoke Nigerian designs.', '/dresses/2.jpg'),
  ('luxury-cathedral-veils', 'Luxury Cathedral Veils', 'Statement veils for timeless brides.', '/dresses/3.jpg'),
  ('the-legal-wedding-edit', 'The Legal Wedding Edit', 'Chic outfits perfect for your registry/engagement.', '/dresses/4.jpg'),
  ('luxury-bridal-robes', 'Luxury Bridal Robes', 'Elegant robes for your big-day prep.', '/dresses/5.jpg'),
  ('flower-bouquets', 'Flower Bouquets', 'Handcrafted luxury bouquets for your walk down the aisle.', '/dresses/7.jpg'),
  ('bridesmaids-collection', 'Bridesmaids Collection', 'Stylish dresses for your squad to complement your bridal look.', '/dresses/8.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO dresses (id, name, description, price, image, collection_id) VALUES
  ('1', 'Dress Nhiwo', 'Elegant A-line wedding dress with lace bodice and tulle skirt.', 85000, '/dresses/6.jpg', 'bridal-dresses-for-sale'),
  ('2', 'Dress Tafisu', '2 in 1 mermaid/detachable train. Available in size 14. hip is 46', 170000, '/dresses/8.jpg', 'made-in-naija-customs'),
  ('3', 'Dress Zara', 'Lacey ball gown available in size 14.', 200000, '/dresses/9.jpg', 'bridal-rentals'),
  ('4', 'Dress Zara', 'Lacey ball gown available in size 14.', 200000, '/dresses/9.jpg', 'bridal-rentals')
ON CONFLICT (id) DO NOTHING;

