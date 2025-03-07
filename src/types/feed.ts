
export interface Post {
  id: string;
  media_url: string;
  media_type: string;
  caption: string | null;
  created_at: string | null;
  expires_at: string | null;
  views: number | null;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
}
