
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const CreateContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image or video
      if (selectedFile.type.startsWith('image/')) {
        setIsVideo(false);
      } else if (selectedFile.type.startsWith('video/')) {
        setIsVideo(true);
        
        // Check if video is less than 30 seconds
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 30) {
            toast({
              title: "Video too long",
              description: "Please upload a video that is 30 seconds or less",
              variant: "destructive",
            });
            setFile(null);
            setPreview(null);
            return;
          }
        };
        video.src = URL.createObjectURL(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or video file",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check if file is an image or video
      if (droppedFile.type.startsWith('image/')) {
        setIsVideo(false);
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
      } else if (droppedFile.type.startsWith('video/')) {
        setIsVideo(true);
        
        // Check if video is less than 30 seconds
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 30) {
            toast({
              title: "Video too long",
              description: "Please upload a video that is 30 seconds or less",
              variant: "destructive",
            });
            return;
          } else {
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
          }
        };
        video.src = URL.createObjectURL(droppedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or video file",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadContent = async () => {
    if (!file || !user) return;
    
    try {
      setIsUploading(true);
      
      // 1. Upload file to HarmonyHub storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('HarmonyHub')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // 2. Get public URL for the file
      const { data: { publicUrl } } = supabase.storage
        .from('HarmonyHub')
        .getPublicUrl(filePath);
      
      // 3. Insert post into database
 const { error: insertError } = await supabase
    .from('posts')
    .insert([
        {
            user_id: user.id,  // ✅ Ensure `user_id` is included
            media_url: publicUrl,
            media_type: isVideo ? 'video' : 'image',
            caption: caption,
        },
    ]);

if (insertError) {
    console.error("Upload failed:", insertError.message);
}

      toast({
        title: "Success",
        description: "Your post has been uploaded!",
      });
      
      // Navigate back to feed
      navigate('/feed');
      
    } catch (error: any) {
      console.error('Error uploading content:', error.message);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 px-6 border-b">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-secondary/50"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Create Post</h1>
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        {preview ? (
          <div className="relative">
            <button 
              onClick={clearFile}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white z-10"
            >
              <X size={20} />
            </button>
            
            {isVideo ? (
              <video 
                src={preview} 
                className="w-full aspect-square object-cover rounded-xl"
                controls
                autoPlay
                loop
              />
            ) : (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full aspect-square object-cover rounded-xl"
              />
            )}
            
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Caption
              </label>
              <textarea
                placeholder="Write a caption..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isUploading}
              />
            </div>
            
            <button
              onClick={uploadContent}
              disabled={isUploading}
              className="mt-6 w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Post'
              )}
            </button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:bg-secondary/10 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
            
            <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Upload a photo or video</h2>
            <p className="text-muted-foreground mb-6">Drag and drop or click to browse</p>
            <p className="text-sm text-muted-foreground">Videos must be 30 seconds or less</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateContent;
