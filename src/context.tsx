import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Size, ViewState, Language } from './types';
import { dict } from './i18n';
import { synth } from './audio';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof dict['fr']) => string;
  // Navigation State
  viewState: ViewState;
  navigate: (view: ViewState['view'], productId?: string) => void;
  
  // Audio State
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;

  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart State
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: Size, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [viewState, setViewState] = useState<ViewState>({ view: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const t = (key: keyof typeof dict['fr']) => dict[language][key] || key;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mm_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('mm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const navigate = (view: ViewState['view'], productId?: string) => {
    synth.playClick();
    setViewState({ view, productId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => {
    synth.playClick();
    setIsCartOpen(true);
  };
  
  const closeCart = () => {
    synth.playClick();
    setIsCartOpen(false);
  };

  const addToCart = (product: Product, size: Size, quantity: number) => {
    synth.playClick();
    setCartItems(prev => {
      const cartItemId = `${product.id}-${size}`;
      const existingItem = prev.find(item => item.cartItemId === cartItemId);
      
      if (existingItem) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { cartItemId, product, size, quantity }];
    });
    openCart();
  };

  const removeFromCart = (cartItemId: string) => {
    synth.playClick();
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    synth.playClick();
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    synth.playClick();
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      language, setLanguage, t,
      viewState, navigate,
      audioEnabled, setAudioEnabled,
      searchQuery, setSearchQuery,
      cartItems, isCartOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
