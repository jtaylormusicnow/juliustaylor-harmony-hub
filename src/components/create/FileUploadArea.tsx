
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadAreaProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  fileInputRef,
  handleFileChange,
  handleDrop,
  handleDragOver
}) => {
  return (
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
  );
};

export default FileUploadArea;
