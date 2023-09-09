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
      characters: {
        Row: {
          element: string | null
          id: number
          name: string | null
          rare: number | null
          weapon_type: string | null
        }
        Insert: {
          element?: string | null
          id?: number
          name?: string | null
          rare?: number | null
          weapon_type?: string | null
        }
        Update: {
          element?: string | null
          id?: number
          name?: string | null
          rare?: number | null
          weapon_type?: string | null
        }
        Relationships: []
      }
      characters_banners: {
        Row: {
          characters_id: Json | null
          id: number
          main_character: number | null
          path: string | null
          title: string | null
          weapons_id: Json | null
        }
        Insert: {
          characters_id?: Json | null
          id?: number
          main_character?: number | null
          path?: string | null
          title?: string | null
          weapons_id?: Json | null
        }
        Update: {
          characters_id?: Json | null
          id?: number
          main_character?: number | null
          path?: string | null
          title?: string | null
          weapons_id?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "characters_banners_main_character_fkey"
            columns: ["main_character"]
            referencedRelation: "characters"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
