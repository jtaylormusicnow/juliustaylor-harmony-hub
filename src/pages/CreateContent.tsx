
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '@/components/create/ContentHeader';
import FileUploadArea from '@/components/create/FileUploadArea';
import MediaPreview from '@/components/create/MediaPreview';
import { useMediaUpload } from '@/hooks/useMediaUpload';

const CreateContent = () => {
  const navigate = useNavigate();
  const {
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
  } = useMediaUpload();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ContentHeader onBack={() => navigate(-1)} />
      
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        {preview ? (
          <MediaPreview 
            preview={preview}
            isVideo={isVideo}
            caption={caption}
            setCaption={setCaption}
            isUploading={isUploading}
            clearFile={clearFile}
            uploadContent={uploadContent}
          />
        ) : (
          <FileUploadArea 
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        )}
      </main>
    </div>
  );
};

export default CreateContent;
