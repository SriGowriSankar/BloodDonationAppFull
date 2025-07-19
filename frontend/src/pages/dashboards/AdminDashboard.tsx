import React from 'react';
import { Users, Building2, Droplets, AlertTriangle, TrendingUp, Shield } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const platformStats = {
    totalUsers: 25847,
    activeDonors: 12456,
    hospitals: 342,
    bloodRequests: 1823,
    pendingVerifications: 45,
    emergencyRequests: 12
  };

  const recentActivity = [
    { id: 1, type: 'user', action: 'New donor registration', user: 'Sankar', time: '2 minutes ago' },
    { id: 2, type: 'hospital', action: 'Hospital verification', user: 'Praveen Medical Center', time: '15 minutes ago' },
    { id: 3, type: 'emergency', action: 'Emergency blood request', user: 'Emergency at General Hospital', time: '1 hour ago' },
    { id: 4, type: 'camp', action: 'Blood camp scheduled', user: 'Madhu Health Center', time: '2 hours ago' }
  ];

  const regionData = [
    { region: 'North Region', donors: 6542, hospitals: 89, requests: 234 },
    { region: 'South Region', donors: 5821, hospitals: 76, requests: 189 },
    { region: 'East Region', donors: 4893, hospitals: 92, requests: 156 },
    { region: 'West Region', donors: 3987, hospitals: 85, requests: 143 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'hospital':
        return <Building2 className="h-4 w-4 text-green-600" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'camp':
        return <Droplets className="h-4 w-4 text-purple-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform-wide overview and management</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <Droplets className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Donors</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.activeDonors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.hospitals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blood Requests</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.bloodRequests.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.pendingVerifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emergency Requests</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.emergencyRequests}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 py-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Statistics */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Regional Statistics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">{region.region}</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{region.donors.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Donors</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{region.hospitals}</p>
                        <p className="text-xs text-gray-500">Hospitals</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{region.requests}</p>
                        <p className="text-xs text-gray-500">Requests</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Manage Users</h3>
            <p className="text-blue-100 text-sm mt-1">View and manage all users</p>
          </button>
          
          <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center">
            <Building2 className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Manage Hospitals</h3>
            <p className="text-green-100 text-sm mt-1">Hospital verification and management</p>
          </button>
          
          <button className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Emergency Center</h3>
            <p className="text-red-100 text-sm mt-1">Handle urgent blood requests</p>
          </button>
          
          <button className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-purple-100 text-sm mt-1">Platform analytics and reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;