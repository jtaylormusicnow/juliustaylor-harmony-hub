
import React, { useState } from 'react';
import { Music, Flame, Mic, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReactionType = 'headnod' | 'bass' | 'barz' | 'nextlevel';

interface Reaction {
  id: ReactionType;
  icon: JSX.Element;
  label: string;
  count: number;
  color: string;
}

interface MusicReactionsProps {
  initialReactions?: {
    headnod?: number;
    bass?: number;
    barz?: number;
    nextlevel?: number;
  };
  onReact?: (type: ReactionType) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'horizontal' | 'grid';
  className?: string;
}

const MusicReactions = ({
  initialReactions = { headnod: 0, bass: 0, barz: 0, nextlevel: 0 },
  onReact,
  size = 'md',
  variant = 'horizontal',
  className
}: MusicReactionsProps) => {
  const [reactions, setReactions] = useState<Record<ReactionType, number>>({
    headnod: initialReactions.headnod || 0,
    bass: initialReactions.bass || 0,
    barz: initialReactions.barz || 0,
    nextlevel: initialReactions.nextlevel || 0,
  });
  
  const [userReactions, setUserReactions] = useState<Record<ReactionType, boolean>>({
    headnod: false,
    bass: false,
    barz: false,
    nextlevel: false,
  });

  const reactionsList: Reaction[] = [
    {
      id: 'headnod',
      icon: <Music className="animate-pulse" />,
      label: 'Head Nod',
      count: reactions.headnod,
      color: 'bg-blue-500'
    },
    {
      id: 'bass',
      icon: <Flame className="animate-pulse" />,
      label: '808 Face',
      count: reactions.bass,
      color: 'bg-orange-500'
    },
    {
      id: 'barz',
      icon: <Mic className="animate-pulse" />,
      label: 'Barz',
      count: reactions.barz,
      color: 'bg-purple-500'
    },
    {
      id: 'nextlevel',
      icon: <Rocket className="animate-pulse" />,
      label: 'Next Level',
      count: reactions.nextlevel,
      color: 'bg-green-500'
    }
  ];

  const handleReaction = (type: ReactionType) => {
    const newUserReactions = { ...userReactions };
    const newReactions = { ...reactions };
    
    // Toggle reaction
    if (newUserReactions[type]) {
      newReactions[type] -= 1;
      newUserReactions[type] = false;
    } else {
      newReactions[type] += 1;
      newUserReactions[type] = true;
    }
    
    setReactions(newReactions);
    setUserReactions(newUserReactions);
    
    if (onReact) {
      onReact(type);
    }
  };

  // Size variants
  const sizeClasses = {
    sm: {
      container: "gap-2",
      button: "p-1.5",
      icon: "h-4 w-4",
      label: "text-xs",
      count: "text-xs"
    },
    md: {
      container: "gap-3",
      button: "p-2",
      icon: "h-5 w-5",
      label: "text-sm",
      count: "text-sm"
    },
    lg: {
      container: "gap-4",
      button: "p-3",
      icon: "h-6 w-6",
      label: "text-base",
      count: "text-base"
    }
  };
  
  // Layout variants
  const layoutClasses = {
    horizontal: "flex flex-row",
    grid: "grid grid-cols-2 md:grid-cols-4"
  };

  return (
    <div 
      className={cn(
        layoutClasses[variant], 
        sizeClasses[size].container,
        className
      )}
    >
      {reactionsList.map((reaction) => (
        <button
          key={reaction.id}
          onClick={() => handleReaction(reaction.id)}
          className={cn(
            "group flex items-center rounded-full transition-all duration-300 hover:shadow-md",
            sizeClasses[size].button,
            userReactions[reaction.id] 
              ? `bg-${reaction.id}/10 border border-${reaction.id} text-${reaction.id}`
              : "bg-secondary/50 border border-transparent hover:border-primary/20"
          )}
        >
          <div className={cn(
            "flex items-center justify-center rounded-full mr-2 transition-transform group-hover:scale-110",
            userReactions[reaction.id] ? reaction.color : "bg-primary/10",
            sizeClasses[size].button
          )}>
            <span className={cn("text-white", sizeClasses[size].icon)}>
              {reaction.icon}
            </span>
          </div>
          
          <div className="flex flex-col items-start">
            <span className={cn(
              "font-medium transition-colors",
              sizeClasses[size].label,
              userReactions[reaction.id] ? "text-foreground" : "text-muted-foreground"
            )}>
              {reaction.label}
            </span>
            <span className={cn("text-muted-foreground", sizeClasses[size].count)}>
              {reaction.count}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MusicReactions;
