export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      hotline: {
        Row: {
          author_id: string;
          body: string | null;
          id: number;
          parent_id: number | null;
          posted_at: string;
        };
        Insert: {
          author_id: string;
          body?: string | null;
          id?: number;
          parent_id?: number | null;
          posted_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string | null;
          id?: number;
          parent_id?: number | null;
          posted_at?: string;
        };
      };
      pageviews: {
        Row: {
          id: number;
          slug: string;
          view_count: number;
        };
        Insert: {
          id?: number;
          slug: string;
          view_count?: number;
        };
        Update: {
          id?: number;
          slug?: string;
          view_count?: number;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
          user_name?: string | null;
        };
      };
    };
    Views: {
      hotline_bling: {
        Row: {
          author_id: string | null;
          avatar: string | null;
          body: string | null;
          fullname: string | null;
          id: number | null;
          posted_at: string | null;
          username: string | null;
        };
      };
    };
    Functions: {
      increment_page_view: {
        Args: {
          page_slug: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
