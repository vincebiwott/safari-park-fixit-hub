
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Wrench, 
  BarChart3, 
  Users, 
  Settings,
  Archive,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home }
    ];

    switch (user?.role) {
      case 'supervisor':
        return [
          ...baseItems,
          { name: 'Submit Ticket', href: '/submit-ticket', icon: FileText },
          { name: 'My Tickets', href: '/my-tickets', icon: FileText },
          { name: 'History', href: '/history', icon: Archive }
        ];
      
      case 'technician':
        return [
          ...baseItems,
          { name: 'Available Tasks', href: '/available-tasks', icon: Wrench },
          { name: 'My Tasks', href: '/my-tasks', icon: FileText },
          { name: 'Calendar', href: '/calendar', icon: Calendar }
        ];
      
      case 'hod':
        return [
          ...baseItems,
          { name: 'All Tickets', href: '/all-tickets', icon: FileText },
          { name: 'Reports', href: '/reports', icon: BarChart3 },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'Alerts', href: '/alerts', icon: AlertTriangle }
        ];
      
      case 'super_admin':
        return [
          ...baseItems,
          { name: 'All Tickets', href: '/all-tickets', icon: FileText },
          { name: 'User Management', href: '/users', icon: Users },
          { name: 'System Settings', href: '/settings', icon: Settings },
          { name: 'Reports', href: '/reports', icon: BarChart3 },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 }
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
