export type Size = 'S' | 'M' | 'L' | 'XL';

export type Language = 'fr' | 'ar';

export interface LocalizedString {
  fr: string;
  ar: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: LocalizedString;
  sizes: Size[];
  mainImage: string;
  images: string[];
  isLimited?: boolean;
  isNew?: boolean;
  lore?: LocalizedString;
  reviews?: Review[];
}

export interface CartItem {
  cartItemId: string; // Unique ID for cart item (product.id + size)
  product: Product;
  size: Size;
  quantity: number;
}

export type ViewType = 'home' | 'store' | 'product' | 'about';

export interface ViewState {
  view: ViewType;
  productId?: string;
}
