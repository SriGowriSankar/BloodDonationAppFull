import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { BloodRequest, BloodType } from '../../types';
import { format } from 'date-fns';

const BloodRequestList: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select(`
          *,
          hospitals (
            name,
            phone,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('blood_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      emergency: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      fulfilled: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock size={16} />,
      approved: <CheckCircle size={16} />,
      fulfilled: <CheckCircle size={16} />,
      cancelled: <XCircle size={16} />,
    };
    return icons[status as keyof typeof icons];
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === '' || request.priority === selectedPriority;
    const matchesStatus = selectedStatus === '' || request.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Blood Requests</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          <Plus size={20} />
          <span>New Request</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="emergency">Emergency</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {request.priority === 'emergency' && (
                  <AlertTriangle className="text-red-600" size={20} />
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.patient_name} ({request.patient_age} years)
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(request.priority)}`}>
                  {request.priority}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span>{request.status}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Blood Type</p>
                <p className="font-medium text-lg text-red-600">{request.blood_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Units Needed</p>
                <p className="font-medium">{request.units_needed}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Requested Date</p>
                <p className="font-medium">{format(new Date(request.requested_date), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Required By</p>
                <p className="font-medium">{format(new Date(request.required_by), 'MMM dd, yyyy')}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Reason</p>
              <p className="font-medium">{request.reason}</p>
            </div>

            {request.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => updateRequestStatus(request.id, 'approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateRequestStatus(request.id, 'cancelled')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {request.status === 'approved' && (
              <button
                onClick={() => updateRequestStatus(request.id, 'fulfilled')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Mark as Fulfilled
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blood requests found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BloodRequestList;