export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string
          name: string
          description: string | null
          slug: string
          created_at: string
          updated_at: string
          image_url: string | null
          is_featured: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          slug: string
          created_at?: string
          updated_at?: string
          image_url?: string | null
          is_featured?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
          image_url?: string | null
          is_featured?: boolean
        }
      }
      dresses: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          collection_id: string
          created_at: string
          updated_at: string
          images: string[]
          sizes: string[]
          colors: string[]
          is_featured: boolean
          style: string | null
          silhouette: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          collection_id: string
          created_at?: string
          updated_at?: string
          images?: string[]
          sizes?: string[]
          colors?: string[]
          is_featured?: boolean
          style?: string | null
          silhouette?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          collection_id?: string
          created_at?: string
          updated_at?: string
          images?: string[]
          sizes?: string[]
          colors?: string[]
          is_featured?: boolean
          style?: string | null
          silhouette?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
