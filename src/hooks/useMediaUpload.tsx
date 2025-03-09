
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useMediaUpload = () => {
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
                user_id: user.id,
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

  return {
    file,
    preview,
    caption,
    isUploading,
    isVideo,
    fileInputRef,
    setCaption,
    handleFileChange,
    handleDrop,
    handleDragOver,
    clearFile,
    uploadContent
  };
};
