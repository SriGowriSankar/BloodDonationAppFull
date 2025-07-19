import React, { useState, useEffect } from 'react';
import { Users, Building2, Guitar as Hospital, Droplets, AlertTriangle, Calendar } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { DashboardStats, BloodType } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [
        { count: donorCount },
        { count: bloodBankCount },
        { count: hospitalCount },
        { count: donationCount },
        { count: pendingRequestCount },
        { count: emergencyRequestCount },
      ] = await Promise.all([
        supabase.from('donors').select('*', { count: 'exact', head: true }),
        supabase.from('blood_banks').select('*', { count: 'exact', head: true }),
        supabase.from('hospitals').select('*', { count: 'exact', head: true }),
        supabase.from('donations').select('*', { count: 'exact', head: true }),
        supabase.from('blood_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('blood_requests').select('*', { count: 'exact', head: true }).eq('priority', 'emergency'),
      ]);

      // Get blood inventory
      const { data: inventoryData } = await supabase
        .from('blood_inventory')
        .select('blood_type, units_available');

      const bloodInventory: Record<BloodType, number> = {
        'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
        'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
      };

      inventoryData?.forEach(item => {
        bloodInventory[item.blood_type] += item.units_available;
      });

      setStats({
        total_donors: donorCount || 0,
        total_blood_banks: bloodBankCount || 0,
        total_hospitals: hospitalCount || 0,
        total_donations: donationCount || 0,
        pending_requests: pendingRequestCount || 0,
        emergency_requests: emergencyRequestCount || 0,
        blood_inventory: bloodInventory,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const bloodTypeData = Object.entries(stats?.blood_inventory || {}).map(([type, units]) => ({
    type,
    units,
  }));

  const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

  const statCards = [
    { title: 'Total Donors', value: stats?.total_donors || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Blood Banks', value: stats?.total_blood_banks || 0, icon: Building2, color: 'bg-green-500' },
    { title: 'Hospitals', value: stats?.total_hospitals || 0, icon: Hospital, color: 'bg-purple-500' },
    { title: 'Total Donations', value: stats?.total_donations || 0, icon: Calendar, color: 'bg-indigo-500' },
    { title: 'Pending Requests', value: stats?.pending_requests || 0, icon: Droplets, color: 'bg-yellow-500' },
    { title: 'Emergency Requests', value: stats?.emergency_requests || 0, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Type Inventory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bloodTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="units"
              >
                {bloodTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <p className="font-medium">Register Donor</p>
            <p className="text-sm text-gray-600">Add new blood donor</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Droplets className="h-8 w-8 text-red-600 mb-2" />
            <p className="font-medium">Update Inventory</p>
            <p className="text-sm text-gray-600">Manage blood stock</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <p className="font-medium">Schedule Donation</p>
            <p className="text-sm text-gray-600">Book appointment</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mb-2" />
            <p className="font-medium">Emergency Request</p>
            <p className="text-sm text-gray-600">Urgent blood need</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;