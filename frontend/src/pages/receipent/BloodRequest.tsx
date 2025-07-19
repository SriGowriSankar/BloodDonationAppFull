import React, { useState } from 'react';
import { AlertTriangle, Calendar, MapPin, Phone, Send } from 'lucide-react';

const BloodRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    unitsNeeded: '1',
    urgency: 'medium',
    hospital: '',
    patientName: '',
    patientAge: '',
    condition: '',
    contactPerson: '',
    contactPhone: '',
    neededBy: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600', desc: 'Routine/Planned' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600', desc: 'Within 24-48 hours' },
    { value: 'high', label: 'High Priority', color: 'text-orange-600', desc: 'Within 12 hours' },
    { value: 'emergency', label: 'Emergency', color: 'text-red-600', desc: 'Immediate (Life-threatening)' }
  ];

  const hospitals = [
    'City General Hospital',
    'St. Mary\'s Medical Center',
    'University Hospital',
    'Children\'s Hospital',
    'Regional Medical Center',
    'Other (Please specify in notes)'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your blood request has been submitted and is now being processed. We're searching for compatible donors in your area.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Request ID: <span className="font-mono text-gray-900">BR-2025-001234</span></p>
              <p className="text-sm text-gray-600">You will receive updates via SMS and email.</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/recipient/dashboard'}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => setSubmitted(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Blood Request</h1>
          <p className="text-gray-600 mt-2">Fill out the form below to request blood from our donor network</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Emergency?</strong> For life-threatening situations, call{' '}
                <a href="tel:911" className="font-medium underline">911</a> or our emergency hotline{' '}
                <a href="tel:+1-555-BLOOD-911" className="font-medium underline">+1-555-BLOOD-911</a>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Blood Requirements */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Requirements</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group Required *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units Needed *
                </label>
                <select
                  name="unitsNeeded"
                  value={formData.unitsNeeded}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num.toString()}>{num} unit{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <div className="space-y-3">
                  {urgencyLevels.map(level => (
                    <label key={level.value} className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <span className={`font-medium ${level.color}`}>{level.label}</span>
                        <p className="text-sm text-gray-500">{level.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Needed By *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="datetime-local"
                    name="neededBy"
                    value={formData.neededBy}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Patient & Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient & Contact Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter patient's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Age *
                </label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  required
                  min="0"
                  max="150"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter patient's age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Condition *
                </label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Brief description of condition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital/Medical Facility *
                </label>
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map(hospital => (
                    <option key={hospital} value={hospital}>{hospital}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Name of contact person"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Any additional information about the request..."
            />
          </div>

          {/* Terms and Submit */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
              />
              <label className="ml-2 text-sm text-gray-700">
                I confirm that the information provided is accurate and I understand that this request will be shared with potential donors and medical facilities. *
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Blood Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;