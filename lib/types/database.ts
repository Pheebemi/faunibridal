export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          created_at?: string
          updated_at?: string
        }
      }
      dresses: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image: string
          collection_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          image: string
          collection_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image?: string
          collection_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Collection = Database['public']['Tables']['collections']['Row']
export type Dress = Database['public']['Tables']['dresses']['Row']
export type NewCollection = Database['public']['Tables']['collections']['Insert']
export type NewDress = Database['public']['Tables']['dresses']['Insert']

