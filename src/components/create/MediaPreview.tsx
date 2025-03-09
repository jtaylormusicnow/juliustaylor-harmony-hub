
import React from 'react';
import { X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MediaPreviewProps {
  preview: string;
  isVideo: boolean;
  caption: string;
  setCaption: (caption: string) => void;
  isUploading: boolean;
  clearFile: () => void;
  uploadContent: () => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  preview,
  isVideo,
  caption,
  setCaption,
  isUploading,
  clearFile,
  uploadContent
}) => {
  return (
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
        <Textarea
          placeholder="Write a caption..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          rows={4}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          disabled={isUploading}
        />
      </div>
      
      <Button
        onClick={uploadContent}
        disabled={isUploading}
        className="mt-6 w-full py-3 rounded-lg"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          'Post'
        )}
      </Button>
    </div>
  );
};

export default MediaPreview;
