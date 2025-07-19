import React from 'react';
import { Home, Users, Building2, Guitar as Hospital, Droplets, Calendar, FileText, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  sidebarOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'blood_bank', 'hospital'] },
    { id: 'donors', label: 'Donors', icon: Users, roles: ['admin', 'blood_bank'] },
    { id: 'blood-banks', label: 'Blood Banks', icon: Building2, roles: ['admin', 'hospital'] },
    { id: 'hospitals', label: 'Hospitals', icon: Hospital, roles: ['admin', 'blood_bank'] },
    { id: 'inventory', label: 'Blood Inventory', icon: Droplets, roles: ['admin', 'blood_bank'] },
    { id: 'requests', label: 'Blood Requests', icon: FileText, roles: ['admin', 'blood_bank', 'hospital'] },
    { id: 'donations', label: 'Donations', icon: Calendar, roles: ['admin', 'blood_bank', 'donor'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'blood_bank'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'blood_bank', 'hospital', 'donor'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${activeTab === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon
                    className={`
                      mr-3 flex-shrink-0 h-6 w-6
                      ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                    `}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;