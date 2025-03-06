
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Upload, X, Music, Video, Camera, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const CreateContent = () => {
  const { user } = useAuth();
  const [uploadType, setUploadType] = useState<'video' | 'image' | null>(null);
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a preview URL for the uploaded file
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Automatically determine type from file
    if (file.type.startsWith('video/')) {
      setUploadType('video');
    } else if (file.type.startsWith('image/')) {
      setUploadType('image');
    }
  };

  const clearUpload = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setUploadType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!previewUrl) {
      toast({
        title: "No content selected",
        description: "Please upload a video or image to continue",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // This is a placeholder for the actual upload implementation
      // In a real app, you would upload the file to Supabase Storage here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
      
      toast({
        title: "Content posted!",
        description: "Your content has been successfully shared with your followers.",
      });
      
      navigate('/feed');
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold">Create New Content</h1>
            <p className="text-muted-foreground mt-2">
              Upload a video or image to share with your followers
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Upload area */}
                  <div className="flex-1">
                    {!previewUrl ? (
                      <label className="block border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-secondary/5 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Upload size={24} className="text-primary" />
                          </div>
                          <p className="text-lg font-medium mb-2">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Supports MP4, MOV, JPG, PNG, GIF (Max: 100MB)
                          </p>
                          <Button type="button" variant="outline" size="sm">
                            Select File
                          </Button>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="video/*,image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="relative border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background/95"
                          onClick={clearUpload}
                        >
                          <X size={20} />
                        </button>
                        {uploadType === 'video' ? (
                          <video
                            src={previewUrl}
                            controls
                            className="w-full h-auto max-h-[500px] object-contain"
                          />
                        ) : (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-auto max-h-[500px] object-contain"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Upload details */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="caption" className="block text-sm font-medium mb-1">
                          Caption
                        </label>
                        <textarea
                          id="caption"
                          placeholder="Write a caption..."
                          className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Content Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            className={`p-4 rounded-lg border ${
                              uploadType === 'video' 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:bg-secondary/5'
                            } flex items-center gap-3 transition-colors`}
                            onClick={() => setUploadType('video')}
                          >
                            <Video size={20} className={uploadType === 'video' ? 'text-primary' : ''} />
                            <div className="text-left">
                              <p className="font-medium">Video</p>
                              <p className="text-xs text-muted-foreground">Up to 30 seconds</p>
                            </div>
                          </button>
                          <button
                            type="button"
                            className={`p-4 rounded-lg border ${
                              uploadType === 'image' 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:bg-secondary/5'
                            } flex items-center gap-3 transition-colors`}
                            onClick={() => setUploadType('image')}
                          >
                            <Camera size={20} className={uploadType === 'image' ? 'text-primary' : ''} />
                            <div className="text-left">
                              <p className="font-medium">Image</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG, GIF</p>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiration
                        </label>
                        <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                          <Clock size={20} />
                          <div>
                            <p className="font-medium">24 Hours</p>
                            <p className="text-xs text-muted-foreground">
                              Content will disappear after 24 hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/feed')}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!previewUrl || isUploading}
                >
                  {isUploading ? 'Posting...' : 'Post Content'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateContent;
