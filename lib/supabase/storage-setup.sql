-- Create storage bucket for dress images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dress-images', 'dress-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access to images
CREATE POLICY "Public read access for dress images" ON storage.objects
FOR SELECT USING (bucket_id = 'dress-images');

-- Create policy for authenticated users to upload images
CREATE POLICY "Authenticated users can upload dress images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'dress-images');

-- Create policy for authenticated users to update images
CREATE POLICY "Authenticated users can update dress images" ON storage.objects
FOR UPDATE USING (bucket_id = 'dress-images');

-- Create policy for authenticated users to delete images
CREATE POLICY "Authenticated users can delete dress images" ON storage.objects
FOR DELETE USING (bucket_id = 'dress-images');
