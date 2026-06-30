export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export type PriceBracket = 'Under ₹100' | '₹100 - ₹149' | '₹150 & Above';
export type OrderStatus = 'Pending' | 'Approved' | 'Rejected';
export type TopUpStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Game extends CosmicObject {
  type: 'games';
  metadata: {
    game_title?: string;
    poster_image?: CosmicImage;
    description?: string;
    genre?: string;
    price?: number;
    price_bracket?: PriceBracket;
    discount_percent?: number;
    featured_deal?: boolean;
    recommended?: boolean;
    stock_limit?: number;
  };
}

export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    customer_name?: string;
    customer_email?: string;
    game?: Game;
    status?: OrderStatus;
    platform_details?: string;
    steam_username?: string;
    steam_password?: string;
    transaction_id?: string;
    amount_paid?: number;
    order_date?: string;
  };
}

export interface WalletTopUp extends CosmicObject {
  type: 'wallet-top-ups';
  metadata: {
    customer_name?: string;
    customer_email?: string;
    amount?: number;
    transaction_id?: string;
    status?: TopUpStatus;
    request_date?: string;
  };
}

export interface HeroSlide extends CosmicObject {
  type: 'hero-slides';
  metadata: {
    headline?: string;
    subtext?: string;
    background_image?: CosmicImage;
    button_link?: string;
    display_order?: number;
  };
}

export interface WhyFeature {
  title?: string;
  description?: string;
  icon?: string;
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    brand_text?: string;
    logo?: CosmicImage;
    upi_qr_code?: CosmicImage;
    instagram_link?: string;
    whatsapp_admin_1?: string;
    whatsapp_admin_2?: string;
    whatsapp_admin_3?: string;
    live_broadcast?: string;
    why_features?: WhyFeature[];
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}