import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { Donor, BloodType } from '../../types';
import { format } from 'date-fns';

const DonorList: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonors(data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.phone.includes(searchTerm);
    const matchesBloodType = selectedBloodType === '' || donor.blood_type === selectedBloodType;
    return matchesSearch && matchesBloodType;
  });

  const handleEdit = (donor: Donor) => {
    setEditingDonor(donor);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        const { error } = await supabase
          .from('donors')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchDonors();
      } catch (error) {
        console.error('Error deleting donor:', error);
      }
    }
  };

  const getEligibilityColor = (isEligible: boolean) => {
    return isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Donors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Donor</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
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
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(donor)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(donor.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getBloodTypeColor(donor.blood_type)}`}>
                  {donor.blood_type}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getEligibilityColor(donor.is_eligible)}`}>
                  {donor.is_eligible ? 'Eligible' : 'Not Eligible'}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={14} />
                <span>{donor.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={14} />
                <span>{donor.phone}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{donor.city}, {donor.state}</span>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Age:</span> {new Date().getFullYear() - new Date(donor.date_of_birth).getFullYear()}
              </div>

              {donor.last_donation_date && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Last Donation:</span> {format(new Date(donor.last_donation_date), 'MMM dd, yyyy')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No donors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DonorList;