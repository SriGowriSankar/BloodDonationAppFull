import React from 'react';
import { Building2, Droplets, Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

const HospitalDashboard: React.FC = () => {
  const bloodInventory = [
    { bloodGroup: 'A+', units: 45, lowStock: false },
    { bloodGroup: 'A-', units: 12, lowStock: true },
    { bloodGroup: 'B+', units: 38, lowStock: false },
    { bloodGroup: 'B-', units: 8, lowStock: true },
    { bloodGroup: 'AB+', units: 15, lowStock: false },
    { bloodGroup: 'AB-', units: 5, lowStock: true },
    { bloodGroup: 'O+', units: 52, lowStock: false },
    { bloodGroup: 'O-', units: 18, lowStock: false }
  ];

  const recentDonations = [
    { id: 1, donor: 'Sankar', bloodGroup: 'A+', units: 1, date: '2025-01-15', time: '10:30 AM' },
    { id: 2, donor: 'Praveen', bloodGroup: 'O-', units: 1, date: '2025-01-15', time: '11:15 AM' },
    { id: 3, donor: 'Madhu', bloodGroup: 'B+', units: 1, date: '2025-01-14', time: '2:45 PM' },
    { id: 4, donor: 'Pankaj', bloodGroup: 'AB+', units: 1, date: '2025-01-14', time: '9:20 AM' }
  ];

  const upcomingCamps = [
    { id: 1, name: 'Community Blood Drive', date: '2025-01-25', location: 'City Hall', registered: 45 },
    { id: 2, name: 'University Campus Drive', date: '2025-02-05', location: 'State University', registered: 32 }
  ];

  const lowStockCount = bloodInventory.filter(item => item.lowStock).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="text-gray-600 mt-2">City General Hospital - Blood Bank Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <Droplets className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Blood Units</p>
                <p className="text-2xl font-bold text-gray-900">193</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Donations</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Camps</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Blood Inventory</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {bloodInventory.map((item) => (
                  <div key={item.bloodGroup} className={`p-4 rounded-lg border ${
                    item.lowStock ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{item.bloodGroup}</span>
                      {item.lowStock && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-bold ${
                        item.lowStock ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.units}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">units</span>
                    </div>
                    {item.lowStock && (
                      <span className="text-xs text-red-600 font-medium">Low Stock</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Donations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{donation.donor}</p>
                        <p className="text-sm text-gray-500">{donation.bloodGroup} • {donation.units} unit</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{donation.date}</p>
                      <p className="text-sm text-gray-500">{donation.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Blood Camps */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Blood Camps</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingCamps.map((camp) => (
                <div key={camp.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{camp.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{camp.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{camp.registered} registered donors</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Manage Camp
                    </button>
                    <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors text-center">
            <Droplets className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Manage Inventory</h3>
            <p className="text-red-100 text-sm mt-1">Update blood stock levels</p>
          </button>
          
          <button className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Schedule Camp</h3>
            <p className="text-blue-100 text-sm mt-1">Organize new blood drive</p>
          </button>
          
          <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">View Reports</h3>
            <p className="text-green-100 text-sm mt-1">Analytics and statistics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;