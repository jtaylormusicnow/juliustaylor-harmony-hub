
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentHeaderProps {
  onBack: () => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ onBack }) => {
  return (
    <header className="py-4 px-6 border-b">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-secondary/50"
          size="icon"
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Create Post</h1>
      </div>
    </header>
  );
};

export default ContentHeader;
