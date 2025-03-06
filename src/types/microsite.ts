
import { Json } from '@/integrations/supabase/types';

export interface Microsite {
  id: string;
  user_id: string;
  theme: string;
  custom_links: any[];
  featured_song_url: string;
  featured_song_title: string;
  featured_song_artist: string;
  created_at: string;
  updated_at: string;
}

export const transformMicrositeData = (data: any): Microsite => {
  // Convert Json type to array if it's not already
  let customLinks: any[] = [];
  if (data.custom_links) {
    if (Array.isArray(data.custom_links)) {
      customLinks = data.custom_links;
    } else if (typeof data.custom_links === 'string') {
      try {
        customLinks = JSON.parse(data.custom_links);
      } catch (e) {
        console.error('Error parsing custom links:', e);
      }
    }
  }

  return {
    id: data.id,
    user_id: data.user_id,
    theme: data.theme || 'default',
    custom_links: customLinks,
    featured_song_url: data.featured_song_url || '',
    featured_song_title: data.featured_song_title || '',
    featured_song_artist: data.featured_song_artist || '',
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};
