
-- Create a storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Create security policies for the media bucket
CREATE POLICY "Media files are publicly accessible" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Users can upload their own media files" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Users can update their own media files" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'media' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Users can delete their own media files" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'media' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );
