import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState([
    { bloodGroup: 'A+', units: 45, lowThreshold: 20, expiryData: { expiring: 5, expired: 0 } },
    { bloodGroup: 'A-', units: 12, lowThreshold: 15, expiryData: { expiring: 2, expired: 0 } },
    { bloodGroup: 'B+', units: 38, lowThreshold: 20, expiryData: { expiring: 3, expired: 0 } },
    { bloodGroup: 'B-', units: 8, lowThreshold: 15, expiryData: { expiring: 1, expired: 0 } },
    { bloodGroup: 'AB+', units: 15, lowThreshold: 10, expiryData: { expiring: 1, expired: 0 } },
    { bloodGroup: 'AB-', units: 5, lowThreshold: 10, expiryData: { expiring: 0, expired: 0 } },
    { bloodGroup: 'O+', units: 52, lowThreshold: 25, expiryData: { expiring: 4, expired: 0 } },
    { bloodGroup: 'O-', units: 18, lowThreshold: 20, expiryData: { expiring: 2, expired: 0 } }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    bloodGroup: '',
    units: '',
    donorId: '',
    notes: ''
  });

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const lowStockCount = inventory.filter(item => item.units <= item.lowThreshold).length;
  const expiringUnits = inventory.reduce((sum, item) => sum + item.expiryData.expiring, 0);

  const handleAddUnits = (bloodGroup: string, units: number) => {
    setInventory(prev => prev.map(item => 
      item.bloodGroup === bloodGroup 
        ? { ...item, units: item.units + units }
        : item
    ));
  };

  const handleRemoveUnits = (bloodGroup: string, units: number) => {
    setInventory(prev => prev.map(item => 
      item.bloodGroup === bloodGroup 
        ? { ...item, units: Math.max(0, item.units - units) }
        : item
    ));
  };

  const handleAddFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const units = parseInt(addFormData.units);
    handleAddUnits(addFormData.bloodGroup, units);
    setAddFormData({ bloodGroup: '', units: '', donorId: '', notes: '' });
    setShowAddForm(false);
  };

  const getStockStatus = (item: any) => {
    if (item.units <= item.lowThreshold) {
      return { status: 'Low Stock', color: 'text-red-600', bgColor: 'bg-red-100' };
    } else if (item.units <= item.lowThreshold * 1.5) {
      return { status: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    } else {
      return { status: 'Good Stock', color: 'text-green-600', bgColor: 'bg-green-100' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage blood bank inventory</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <RefreshCw className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">{expiringUnits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Stock</span>
            </button>
          </div>
        </div>

        {/* Add Stock Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock</h3>
            <form onSubmit={handleAddFormSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={addFormData.bloodGroup}
                  onChange={(e) => setAddFormData({...addFormData, bloodGroup: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Blood Group</option>
                  {inventory.map(item => (
                    <option key={item.bloodGroup} value={item.bloodGroup}>{item.bloodGroup}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units
                </label>
                <input
                  type="number"
                  min="1"
                  value={addFormData.units}
                  onChange={(e) => setAddFormData({...addFormData, units: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Number of units"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor ID
                </label>
                <input
                  type="text"
                  value={addFormData.donorId}
                  onChange={(e) => setAddFormData({...addFormData, donorId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Optional"
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Stock
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {inventory.map((item) => {
            const stockStatus = getStockStatus(item);
            return (
              <div key={item.bloodGroup} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{item.bloodGroup}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bgColor} ${stockStatus.color}`}>
                    {stockStatus.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{item.units}</p>
                    <p className="text-sm text-gray-500">units available</p>
                  </div>

                  {item.expiryData.expiring > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                      <p className="text-xs text-yellow-700">
                        {item.expiryData.expiring} units expiring within 7 days
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveUnits(item.bloodGroup, 1)}
                      disabled={item.units === 0}
                      className="flex-1 bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAddUnits(item.bloodGroup, 1)}
                      className="flex-1 bg-green-100 text-green-600 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Low stock threshold: {item.lowThreshold} units
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Low Stock Alerts */}
        {lowStockCount > 0 && (
          <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Low Stock Alert</h3>
                <p className="text-red-700 mt-1">
                  {lowStockCount} blood group{lowStockCount > 1 ? 's are' : ' is'} running low on stock. 
                  Consider organizing blood drives or contacting donors.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;