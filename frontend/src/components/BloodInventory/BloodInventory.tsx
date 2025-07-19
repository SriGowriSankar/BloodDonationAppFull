import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { BloodInventory as BloodInventoryType, BloodType } from '../../types';
import { format, isAfter, addDays } from 'date-fns';

const BloodInventory: React.FC = () => {
  const [inventory, setInventory] = useState<BloodInventoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | ''>('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_inventory')
        .select(`
          *,
          blood_banks (
            name,
            city,
            state
          ),
          donors (
            name,
            phone
          )
        `)
        .order('expiration_date', { ascending: true });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const isExpiringSoon = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const sevenDaysFromNow = addDays(new Date(), 7);
    return isAfter(sevenDaysFromNow, expDate);
  };

  const isExpired = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    return isAfter(new Date(), expDate);
  };

  const getExpirationColor = (expirationDate: string) => {
    if (isExpired(expirationDate)) {
      return 'bg-red-100 text-red-800';
    } else if (isExpiringSoon(expirationDate)) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-green-100 text-green-800';
  };

  const getBloodTypeColor = (bloodType: BloodType) => {
    const colors = {
      'A+': 'bg-red-100 text-red-800',
      'A-': 'bg-red-200 text-red-900',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-200 text-blue-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
      'O+': 'bg-green-100 text-green-800',
      'O-': 'bg-green-200 text-green-900',
    };
    return colors[bloodType];
  };

  const filteredInventory = inventory.filter(item => {
    const matchesBloodType = selectedBloodType === '' || item.blood_type === selectedBloodType;
    return matchesBloodType;
  });

  const groupedInventory = filteredInventory.reduce((acc, item) => {
    const key = item.blood_type;
    if (!acc[key]) {
      acc[key] = {
        bloodType: key,
        totalUnits: 0,
        items: [],
      };
    }
    acc[key].totalUnits += item.units_available;
    acc[key].items.push(item);
    return acc;
  }, {} as Record<BloodType, { bloodType: BloodType; totalUnits: number; items: BloodInventoryType[] }>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blood Inventory</h1>
        <div className="flex space-x-2">
          <button
            onClick={fetchInventory}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={20} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <Plus size={20} />
            <span>Add Stock</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <select
          value={selectedBloodType}
          onChange={(e) => setSelectedBloodType(e.target.value as BloodType | '')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="">All Blood Types</option>
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Blood Type Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {bloodTypes.map(type => {
          const group = groupedInventory[type];
          const totalUnits = group?.totalUnits || 0;
          const isLowStock = totalUnits < 10;
          
          return (
            <div key={type} className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className={`text-2xl font-bold mb-2 ${getBloodTypeColor(type)}`}>
                {type}
              </div>
              <div className={`text-lg font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                {totalUnits} units
              </div>
              {isLowStock && (
                <div className="flex items-center justify-center mt-2 text-red-600">
                  <AlertTriangle size={16} className="mr-1" />
                  <span className="text-xs">Low Stock</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Inventory */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collected Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getBloodTypeColor(item.blood_type)}`}>
                      {item.blood_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.units_available}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(item.collected_date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(item.expiration_date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getExpirationColor(item.expiration_date)}`}>
                      {isExpired(item.expiration_date) ? 'Expired' : 
                       isExpiringSoon(item.expiration_date) ? 'Expiring Soon' : 'Good'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blood inventory found.</p>
        </div>
      )}
    </div>
  );
};

export default BloodInventory;