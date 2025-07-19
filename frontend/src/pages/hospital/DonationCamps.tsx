import React, { useState } from 'react';
import { Calendar, MapPin, Users, Plus, Clock, Edit, Trash2 } from 'lucide-react';

const DonationCamps: React.FC = () => {
  const [camps, setCamps] = useState([
    {
      id: 1,
      name: 'Community Blood Drive',
      date: '2025-01-25',
      time: '09:00 - 15:00',
      location: 'City Hall, Main Street',
      maxDonors: 50,
      registeredDonors: 45,
      status: 'Active',
      organizer: 'City General Hospital'
    },
    {
      id: 2,
      name: 'University Campus Drive',
      date: '2025-02-05',
      time: '10:00 - 16:00',
      location: 'State University, Student Center',
      maxDonors: 60,
      registeredDonors: 32,
      status: 'Active',
      organizer: 'City General Hospital'
    },
    {
      id: 3,
      name: 'Corporate Blood Drive',
      date: '2025-01-20',
      time: '09:00 - 17:00',
      location: 'Tech Corp Headquarters',
      maxDonors: 40,
      registeredDonors: 40,
      status: 'Completed',
      organizer: 'City General Hospital'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxDonors: '',
    description: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCamp = {
      id: camps.length + 1,
      name: formData.name,
      date: formData.date,
      time: `${formData.startTime} - ${formData.endTime}`,
      location: formData.location,
      maxDonors: parseInt(formData.maxDonors),
      registeredDonors: 0,
      status: 'Active',
      organizer: 'City General Hospital'
    };
    setCamps([...camps, newCamp]);
    setFormData({
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      maxDonors: '',
      description: ''
    });
    setShowCreateForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeCamps = camps.filter(camp => camp.status === 'Active').length;
  const totalRegistrations = camps.reduce((sum, camp) => sum + camp.registeredDonors, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Donation Camps</h1>
          <p className="text-gray-600 mt-2">Organize and manage blood donation events</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Camps</p>
                <p className="text-2xl font-bold text-gray-900">{activeCamps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{totalRegistrations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Camp</span>
            </button>
          </div>
        </div>

        {/* Create Camp Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Blood Donation Camp</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Camp Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter camp name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter venue address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Donors *
                  </label>
                  <input
                    type="number"
                    name="maxDonors"
                    value={formData.maxDonors}
                    onChange={handleChange}
                    required
                    min="1"
                    max="200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Maximum number of donors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Additional details about the camp..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Camp
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Camps List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {camps.map((camp) => (
            <div key={camp.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{camp.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(camp.status)}`}>
                  {camp.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(camp.date).toLocaleDateString()} • {camp.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{camp.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{camp.registeredDonors} / {camp.maxDonors} registered</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Registration Progress</span>
                  <span>{Math.round((camp.registeredDonors / camp.maxDonors) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(camp.registeredDonors / camp.maxDonors) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  View Details
                </button>
                {camp.status === 'Active' && (
                  <button className="bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {camps.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No camps scheduled</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first blood donation camp.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Create First Camp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCamps;