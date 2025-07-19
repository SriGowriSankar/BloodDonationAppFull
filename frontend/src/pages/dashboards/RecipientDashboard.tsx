import React from 'react';
import { Search, Plus, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecipientDashboard: React.FC = () => {
  const bloodRequests = [
    { 
      id: 1, 
      bloodGroup: 'A+', 
      units: 2, 
      urgency: 'High', 
      status: 'Active', 
      hospital: 'City General Hospital',
      requestDate: '2025-01-15',
      matches: 12
    },
    { 
      id: 2, 
      bloodGroup: 'O-', 
      units: 1, 
      urgency: 'Medium', 
      status: 'Fulfilled', 
      hospital: 'St. Mary\'s Medical Center',
      requestDate: '2025-01-10',
      matches: 8
    }
  ];

  const potentialDonors = [
    { id: 1, name: 'Sankar', bloodGroup: 'A+', location: 'Downtown', distance: '2.3 km', availability: 'Available', lastDonation: '90 days ago', verified: true },
    { id: 2, name: 'Praveen', bloodGroup: 'A+', location: 'City Center', distance: '4.1 km', availability: 'Available', lastDonation: '120 days ago', verified: true },
    { id: 3, name: 'Madhu', bloodGroup: 'A+', location: 'Northside', distance: '5.7 km', availability: 'Available', lastDonation: '85 days ago', verified: true },
    { id: 4, name: 'Pankaj', bloodGroup: 'O-', location: 'Westend', distance: '7.2 km', availability: 'Available', lastDonation: '95 days ago', verified: false },
    { id: 5, name: 'Lokesh', bloodGroup: 'O-', location: 'Southside', distance: '3.8 km', availability: 'Available', lastDonation: '110 days ago', verified: true },
    { id: 6, name: 'Sankar Kumar', bloodGroup: 'O-', location: 'East District', distance: '6.1 km', availability: 'Available', lastDonation: '75 days ago', verified: true }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'Fulfilled':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipient Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your blood requests and find donors</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fulfilled</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Potential Donors</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Urgent Requests</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/recipient/request"
            className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors text-center group"
          >
            <Plus className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg">Create Blood Request</h3>
            <p className="text-red-100 text-sm mt-1">Submit a new request for blood</p>
          </Link>
          
          <Link
            to="/recipient/search"
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center group"
          >
            <Search className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg">Search Donors</h3>
            <p className="text-blue-100 text-sm mt-1">Find compatible donors nearby</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blood Requests */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Blood Requests</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bloodRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(request.status)}
                        <span className="font-medium text-gray-900">
                          {request.bloodGroup} - {request.units} unit{request.units > 1 ? 's' : ''}
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency} Priority
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Hospital:</strong> {request.hospital}</p>
                      <p><strong>Request Date:</strong> {request.requestDate}</p>
                      <p><strong>Potential Matches:</strong> {request.matches} donors</p>
                    </div>

                    {request.status === 'Active' && (
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Matches
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Edit Request
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Potential Donors */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Potential Donors</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {potentialDonors.map((donor) => (
                  <div key={donor.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{donor.name}</p>
                          <p className="text-sm text-gray-500">{donor.bloodGroup} • {donor.distance}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          donor.availability === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {donor.availability}
                        </span>
                        {donor.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <p><strong>Location:</strong> {donor.location}</p>
                      <p><strong>Last donation:</strong> {donor.lastDonation}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Contact Donor
                      </button>
                      <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;