export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          author: string
          comment: string
          created_at: string | null
          id: number
          rating: number | null
          related_id: number
          related_type: string
        }
        Insert: {
          author: string
          comment: string
          created_at?: string | null
          id?: never
          rating?: number | null
          related_id: number
          related_type: string
        }
        Update: {
          author?: string
          comment?: string
          created_at?: string | null
          id?: never
          rating?: number | null
          related_id?: number
          related_type?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          description: string
          expires_at: string | null
          id: number
          is_active: boolean | null
          level_id: number | null
          max_discount_amount: number | null
          min_purchase_amount: number | null
          title: string
          type: string
          updated_at: string | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          description: string
          expires_at?: string | null
          id?: number
          is_active?: boolean | null
          level_id?: number | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          title: string
          type: string
          updated_at?: string | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string
          expires_at?: string | null
          id?: number
          is_active?: boolean | null
          level_id?: number | null
          max_discount_amount?: number | null
          min_purchase_amount?: number | null
          title?: string
          type?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "coupons_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      event_seats: {
        Row: {
          created_at: string
          event_id: number
          id: number
          is_reserved: boolean
          reserved_at: string | null
          reserved_by_profile_id: number | null
          seat_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          is_reserved?: boolean
          reserved_at?: string | null
          reserved_by_profile_id?: number | null
          seat_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          is_reserved?: boolean
          reserved_at?: string | null
          reserved_by_profile_id?: number | null
          seat_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_seats_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_seats_reserved_by_profile_id_fkey"
            columns: ["reserved_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          availableseats: number
          city: string | null
          date: string
          description: string
          expectedattendance: number | null
          has_seating: boolean | null
          id: number
          image: string | null
          imagefile: string | null
          isdraft: boolean | null
          location: string
          name: string
          popularity: string | null
          price: number
          tags: string | null
          time: string
          totalseats: number
        }
        Insert: {
          address?: string | null
          availableseats: number
          city?: string | null
          date: string
          description: string
          expectedattendance?: number | null
          has_seating?: boolean | null
          id?: number
          image?: string | null
          imagefile?: string | null
          isdraft?: boolean | null
          location: string
          name: string
          popularity?: string | null
          price: number
          tags?: string | null
          time: string
          totalseats: number
        }
        Update: {
          address?: string | null
          availableseats?: number
          city?: string | null
          date?: string
          description?: string
          expectedattendance?: number | null
          has_seating?: boolean | null
          id?: number
          image?: string | null
          imagefile?: string | null
          isdraft?: boolean | null
          location?: string
          name?: string
          popularity?: string | null
          price?: number
          tags?: string | null
          time?: string
          totalseats?: number
        }
        Relationships: []
      }
      levels: {
        Row: {
          benefits: string
          created_at: string | null
          id: number
          level_number: number
          max_points: number
          min_points: number
          name: string
          updated_at: string | null
        }
        Insert: {
          benefits: string
          created_at?: string | null
          id?: number
          level_number: number
          max_points: number
          min_points: number
          name: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string
          created_at?: string | null
          id?: number
          level_number?: number
          max_points?: number
          min_points?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: number
          item_id: number
          item_name: string
          item_type: string
          order_id: number
          quantity: number
          seats: Json | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_id: number
          item_name: string
          item_type: string
          order_id: number
          quantity: number
          seats?: Json | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_id?: number
          item_name?: string
          item_type?: string
          order_id?: number
          quantity?: number
          seats?: Json | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_id: number | null
          created_at: string | null
          discount: number
          id: number
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string
          profile_id: number
          shipping_address: string | null
          subtotal: number
          total: number
          type: string
          updated_at: string | null
        }
        Insert: {
          coupon_id?: number | null
          created_at?: string | null
          discount?: number
          id?: number
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string
          profile_id: number
          shipping_address?: string | null
          subtotal?: number
          total?: number
          type: string
          updated_at?: string | null
        }
        Update: {
          coupon_id?: number | null
          created_at?: string | null
          discount?: number
          id?: number
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string
          profile_id?: number
          shipping_address?: string | null
          subtotal?: number
          total?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      point_transactions: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: number
          points: number
          profile_id: number
          related_id: number | null
          related_type: string | null
          source: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: number
          points: number
          profile_id: number
          related_id?: number | null
          related_type?: string | null
          source: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: number
          points?: number
          profile_id?: number
          related_id?: number | null
          related_type?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          address: string | null
          availablestock: number | null
          city: string | null
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          imagefile: string | null
          isdraft: boolean | null
          location: string | null
          name: string
          popularity: string | null
          price: number | null
          status: string | null
          tags: string | null
          totalstock: number | null
          unitssaled: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          availablestock?: number | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          imagefile?: string | null
          isdraft?: boolean | null
          location?: string | null
          name: string
          popularity?: string | null
          price?: number | null
          status?: string | null
          tags?: string | null
          totalstock?: number | null
          unitssaled?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          availablestock?: number | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          imagefile?: string | null
          isdraft?: boolean | null
          location?: string | null
          name?: string
          popularity?: string | null
          price?: number | null
          status?: string | null
          tags?: string | null
          totalstock?: number | null
          unitssaled?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string | null
          current_level: number | null
          email: string
          gender: string | null
          id: number
          language: string | null
          name: string | null
          nickname: string | null
          organization: string | null
          points: number | null
          referral_code: string | null
          referred_by: number | null
          timezone: string | null
          total_referrals: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          current_level?: number | null
          email: string
          gender?: string | null
          id?: never
          language?: string | null
          name?: string | null
          nickname?: string | null
          organization?: string | null
          points?: number | null
          referral_code?: string | null
          referred_by?: number | null
          timezone?: string | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          current_level?: number | null
          email?: string
          gender?: string | null
          id?: never
          language?: string | null
          name?: string | null
          nickname?: string | null
          organization?: string | null
          points?: number | null
          referral_code?: string | null
          referred_by?: number | null
          timezone?: string | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: number
          referral_code: string
          referred_profile_id: number
          referrer_profile_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          referral_code: string
          referred_profile_id: number
          referrer_profile_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          referral_code?: string
          referred_profile_id?: number
          referrer_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_profile_id_fkey"
            columns: ["referred_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_profile_id_fkey"
            columns: ["referrer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string | null
          customer_name: string
          date: string
          event_id: number
          id: number
          order_number: string
          payment_status: string | null
          quantity: number
          ticket_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          date: string
          event_id: number
          id?: number
          order_number: string
          payment_status?: string | null
          quantity: number
          ticket_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          date?: string
          event_id?: number
          id?: number
          order_number?: string
          payment_status?: string | null
          quantity?: number
          ticket_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_coupons: {
        Row: {
          coupon_id: number
          earned_at: string | null
          id: number
          is_used: boolean | null
          profile_id: number
          used_at: string | null
        }
        Insert: {
          coupon_id: number
          earned_at?: string | null
          id?: number
          is_used?: boolean | null
          profile_id: number
          used_at?: string | null
        }
        Update: {
          coupon_id?: number
          earned_at?: string | null
          id?: number
          is_used?: boolean | null
          profile_id?: number
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_coupons_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          country: string | null
          created_at: string | null
          email: string
          gender: string | null
          id: number
          language: string | null
          name: string | null
          nickname: string | null
          organization: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          gender?: string | null
          id?: number
          language?: string | null
          name?: string | null
          nickname?: string | null
          organization?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          gender?: string | null
          id?: number
          language?: string | null
          name?: string | null
          nickname?: string | null
          organization?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_points: {
        Args: {
          p_description: string
          p_points: number
          p_profile_id: number
          p_related_id?: number
          p_related_type?: string
          p_source: string
        }
        Returns: undefined
      }
      calculate_user_level: { Args: { user_points: number }; Returns: number }
      generate_referral_code: { Args: never; Returns: string }
      grant_level_coupon: {
        Args: { p_level_number: number; p_profile_id: number }
        Returns: undefined
      }
      initialize_event_seats: {
        Args: { p_event_id: number; p_total_seats: number }
        Returns: undefined
      }
      process_referral: {
        Args: {
          p_referral_code: string
          p_referred_profile_id: number
          p_referrer_profile_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
