import { create } from 'zustand';
import { User, Investment, MarketplaceProduct, demoUsers } from '@/lib/mockData';


interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User) => void;

  // Wallet
  walletBalance: number;
  updateWalletBalance: (amount: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: MarketplaceProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Investments
  userInvestments: Investment[];
  addInvestment: (investment: Investment) => void;

  // Notifications
  notifications: { id: string; message: string; read: boolean; timestamp: Date }[];
  addNotification: (message: string) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  cartOpen: boolean;
  toggleCart: () => void;
}

// Simple store without persist for now to avoid zustand/middleware issues
export const useStore = create<AppState>((set, get) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  login: (email: string, _password: string) => {
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser) {
      set({ user: foundUser, isAuthenticated: true, walletBalance: foundUser.walletBalance });
      get().addNotification('Welcome back, ' + foundUser.name + '!');
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, walletBalance: 0, userInvestments: [] });
  },
  setUser: (user: User) => {
    set({ user, isAuthenticated: true, walletBalance: user.walletBalance });
  },

  // Wallet
  walletBalance: 0,
  updateWalletBalance: (amount: number) => {
    set(state => ({ walletBalance: state.walletBalance + amount }));
  },

  // Cart
  cart: [],
  addToCart: (product: MarketplaceProduct, quantity = 1) => {
    set(state => {
      const existingItem = state.cart.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity }] };
    });
    get().addNotification(`${product.name} added to cart`);
  },
  removeFromCart: (productId: string) => {
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== productId),
    }));
  },
  updateCartQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set(state => ({
      cart: state.cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.product.pricePerKg * item.quantity, 0);
  },

  // Investments
  userInvestments: [],
  addInvestment: (investment: Investment) => {
    set(state => ({
      userInvestments: [...state.userInvestments, investment],
      walletBalance: state.walletBalance - investment.amount,
    }));
    get().addNotification(`Successfully invested ₦${investment.amount.toLocaleString()} in ${investment.projectName}`);
  },

  // Notifications
  notifications: [],
  addNotification: (message: string) => {
    const notification = {
      id: Date.now().toString(),
      message,
      read: false,
      timestamp: new Date(),
    };
    set(state => ({
      notifications: [notification, ...state.notifications].slice(0, 20),
    }));
  },
  markNotificationRead: (id: string) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
  clearNotifications: () => set({ notifications: [] }),

  // UI State
  sidebarOpen: true,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  cartOpen: false,
  toggleCart: () => set(state => ({ cartOpen: !state.cartOpen })),
}));

export default useStore;
