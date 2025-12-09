import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, ShoppingCart, User, LogOut, Settings, Wallet, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useStore } from '@/store/useStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// add at top of `src/components/layout/Navbar.tsx`
import logoUrl from '@/assets/agrolinkerlogo.png';

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, showMenuButton = false }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, cart, notifications, walletBalance, toggleCart, markNotificationRead } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'investor': return '/investor';
      case 'farmer': return '/farmer';
      case 'admin': return '/admin';
      default: return '/investor';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            )}


       <Link to="/" className="flex items-center gap-2">
         <img
           src={logoUrl}
           alt="Agrolinker"
           className="w-10 h-10 rounded-lg object-cover bg-green-600 p-1"
         />
         <span className="text-xl font-bold text-gray-900 hidden sm:block"></span>
       </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Marketplace
            </Link>
            <Link to="/tree-naira" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Tree-Naira
            </Link>
            <Link to="/farm-for-me" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Farm for Me
            </Link>
            <Link to="/equipment" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Equipment
            </Link>
            <Link to="/storage" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Storage
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notifications.slice(0, 5).map(notification => (
                        <DropdownMenuItem
                          key={notification.id}
                          onClick={() => markNotificationRead(notification.id)}
                          className={`p-3 cursor-pointer ${!notification.read ? 'bg-green-50' : ''}`}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-sm">{notification.message}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Wallet Balance */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                  <Wallet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    ₦{walletBalance.toLocaleString()}
                  </span>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-600 text-white text-sm">
                          {user ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 hidden sm:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-xs text-gray-500 font-normal">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wallet')}>
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet (₦{walletBalance.toLocaleString()})
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')} className="hidden sm:flex">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/login')} className="bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link
                    to="/marketplace"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Marketplace
                  </Link>
                  <Link
                    to="/tree-naira"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tree Naira
                  </Link>
                  <Link
                    to="/farm-for-me"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Farm for Me
                  </Link>
                  <Link
                    to="/equipment"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Equipment
                  </Link>
                  <Link
                    to="/storage"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Storage
                  </Link>
                  <Link
                    to="/logistics"
                    className="text-gray-600 hover:text-green-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logistics
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
