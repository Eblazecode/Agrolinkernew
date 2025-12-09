import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  TrendingUp,
  TreePine,
  Users,
  ShoppingCart,
  Wallet,
  Tractor,
  Warehouse,
  Truck,
  FileText,
  Settings,
  HelpCircle,
  X,
  Sprout,
  Package,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'investor' | 'farmer' | 'equipment_owner' | 'logistics_provider' | 'admin';
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const investorNav: NavItem[] = [
  { label: 'Dashboard', href: '/investor', icon: LayoutDashboard },
  { label: 'My Investments', href: '/investor/investments', icon: TrendingUp },
  { label: 'Tree Naira', href: '/tree-naira', icon: TreePine },
  { label: 'Farm for Me', href: '/farm-for-me', icon: Users },
  { label: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
  { label: 'Wallet', href: '/wallet', icon: Wallet },
];

const farmerNav: NavItem[] = [
  { label: 'Dashboard', href: '/farmer', icon: LayoutDashboard },
  { label: 'My Farms', href: '/farmer/farms', icon: Sprout },
  { label: 'Request Funding', href: '/farmer/funding', icon: FileText },
  { label: 'Storage & Logistics', href: '/farmer/storage', icon: Warehouse },
  { label: 'Marketplace Listings', href: '/farmer/listings', icon: Package },
  { label: 'Reports', href: '/farmer/reports', icon: ClipboardList },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'KYC Verification', href: '/admin/kyc', icon: FileText },
  { label: 'Projects', href: '/admin/projects', icon: Sprout },
  { label: 'Transactions', href: '/admin/transactions', icon: TrendingUp },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'investor':
      return investorNav;
    case 'farmer':
      return farmerNav;
    case 'admin':
      return adminNav;
    default:
      return investorNav;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  const location = useLocation();
  const { user, walletBalance } = useStore();
  const navItems = getNavItems(userRole);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Agrolinker</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">Wallet Balance</p>
                <p className="text-lg font-semibold text-green-600">₦{walletBalance.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      <item.icon className={cn('h-5 w-5', isActive ? 'text-green-600' : 'text-gray-400')} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Secondary Navigation */}
            <ul className="space-y-1">
              <li>
                <Link
                  to="/settings"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                  Help & Support
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">
              © 2025 Agrolinker
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
