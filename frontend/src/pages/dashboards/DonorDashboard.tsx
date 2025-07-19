import React, { useState } from 'react';
import { Heart, Calendar, MapPin, User, Bell, Award, Clock, Users, CheckCircle, AlertCircle, Save, X, Search, Phone, Navigation, Filter } from 'lucide-react';

const DonorDashboard: React.FC = () => {
  const [showCampRegistration, setShowCampRegistration] = useState(false);
  const [showDonateNow, setShowDonateNow] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState<any>(null);
  const [registrationData, setRegistrationData] = useState({
    preferredTime: '',
    specialRequests: '',
    emergencyContact: '',
    medicalConditions: ''
  });

  // Profile update state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    bloodGroup: 'A+',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, City, State 12345',
    weight: '70',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    medicalConditions: '',
    availability: true
  });

  // Donate Now state
  const [donationFilters, setDonationFilters] = useState({
    location: '',
    radius: '10',
    date: '',
    type: 'all'
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Emergency Blood Request',
      message: 'A+ blood urgently needed at City General Hospital',
      time: '5 minutes ago',
      read: false,
      action: 'Respond Now'
    },
    {
      id: 2,
      type: 'camp',
      title: 'New Blood Camp Scheduled',
      message: 'Community Blood Drive on Jan 25th - Register now!',
      time: '2 hours ago',
      read: false,
      action: 'Register'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Donation Eligibility',
      message: 'You are now eligible to donate blood again',
      time: '1 day ago',
      read: true,
      action: 'Find Centers'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You earned the "Life Saver" badge',
      time: '3 days ago',
      read: true,
      action: 'View Badge'
    },
    {
      id: 5,
      type: 'request',
      title: 'Blood Request Match',
      message: 'Your blood type matches a request in your area',
      time: '1 week ago',
      read: true,
      action: 'View Request'
    }
  ]);

  // Donation centers data
  const donationCenters = [
    {
      id: 1,
      name: 'City General Hospital Blood Bank',
      address: '123 Medical Center Dr, Downtown',
      distance: '2.3 km',
      hours: '8:00 AM - 6:00 PM',
      phone: '+1 (555) 123-4567',
      type: 'Hospital',
      rating: 4.8,
      waitTime: '15 mins',
      availableSlots: 12
    },
    {
      id: 2,
      name: 'Red Cross Blood Center',
      address: '456 Community Blvd, Midtown',
      distance: '4.1 km',
      hours: '9:00 AM - 7:00 PM',
      phone: '+1 (555) 234-5678',
      type: 'Red Cross',
      rating: 4.9,
      waitTime: '10 mins',
      availableSlots: 8
    },
    {
      id: 3,
      name: 'University Medical Center',
      address: '789 University Ave, Campus',
      distance: '5.7 km',
      hours: '7:00 AM - 8:00 PM',
      phone: '+1 (555) 345-6789',
      type: 'University',
      rating: 4.7,
      waitTime: '20 mins',
      availableSlots: 15
    },
    {
      id: 4,
      name: 'Community Health Center',
      address: '321 Health St, Suburbs',
      distance: '7.2 km',
      hours: '8:00 AM - 5:00 PM',
      phone: '+1 (555) 456-7890',
      type: 'Community',
      rating: 4.6,
      waitTime: '25 mins',
      availableSlots: 6
    }
  ];

  const donationHistory = [
    { id: 1, date: '2024-12-15', location: 'City Hospital', units: 1, status: 'Completed' },
    { id: 2, date: '2024-09-20', location: 'Red Cross Center', units: 1, status: 'Completed' },
    { id: 3, date: '2024-06-10', location: 'Community Blood Drive', units: 1, status: 'Completed' }
  ];

  const upcomingCamps = [
    { 
      id: 1, 
      name: 'Central Hospital Blood Drive', 
      date: '2025-01-25', 
      time: '9:00 AM - 3:00 PM', 
      location: 'Central Hospital, Main Building',
      address: '123 Medical Center Dr, Downtown',
      organizer: 'Central Hospital',
      slotsAvailable: 45,
      totalSlots: 60,
      requirements: ['Age 18-65', 'Weight >50kg', 'Good health'],
      facilities: ['Free health checkup', 'Refreshments', 'Certificate'],
      registered: false
    },
    { 
      id: 2, 
      name: 'University Campus Drive', 
      date: '2025-02-05', 
      time: '10:00 AM - 4:00 PM', 
      location: 'State University, Student Center',
      address: '456 University Ave, Campus District',
      organizer: 'State University Health Center',
      slotsAvailable: 28,
      totalSlots: 40,
      requirements: ['Age 18-65', 'Weight >50kg', 'Valid ID'],
      facilities: ['Free lunch', 'Health screening', 'Parking available'],
      registered: false
    },
    { 
      id: 3, 
      name: 'Community Center Blood Drive', 
      date: '2025-02-12', 
      time: '8:00 AM - 2:00 PM', 
      location: 'Riverside Community Center',
      address: '789 Community Blvd, Riverside',
      organizer: 'Red Cross Society',
      slotsAvailable: 15,
      totalSlots: 30,
      requirements: ['Age 18-60', 'Weight >55kg', 'No recent illness'],
      facilities: ['Free breakfast', 'Blood type testing', 'Donation certificate'],
      registered: true
    }
  ];

  const myRegistrations = [
    {
      id: 3,
      campName: 'Community Center Blood Drive',
      date: '2025-02-12',
      time: '10:30 AM',
      location: 'Riverside Community Center',
      status: 'Confirmed',
      registrationDate: '2025-01-10'
    }
  ];

  const eligibleDate = new Date('2025-03-15');
  const daysUntilEligible = Math.ceil((eligibleDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  const handleCampRegistration = (camp: any) => {
    setSelectedCamp(camp);
    setShowCampRegistration(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationData({
      preferredTime: '',
      specialRequests: '',
      emergencyContact: '',
      medicalConditions: ''
    });
    setShowCampRegistration(false);
    setSelectedCamp(null);
    alert(`Successfully registered for ${selectedCamp.name}! You will receive a confirmation email shortly.`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate profile update
    alert('Profile updated successfully!');
    setShowUpdateProfile(false);
  };

  const handleDonationFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDonationFilters({
      ...donationFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleBookAppointment = (center: any) => {
    alert(`Booking appointment at ${center.name}. You will receive a confirmation shortly.`);
  };

  const handleNotificationAction = (notification: any) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    // Handle different actions
    switch (notification.type) {
      case 'urgent':
        alert('Redirecting to emergency blood request...');
        break;
      case 'camp':
        setShowNotifications(false);
        // Could open camp registration
        break;
      case 'reminder':
        setShowNotifications(false);
        setShowDonateNow(true);
        break;
      default:
        alert(`Handling ${notification.action}...`);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'camp':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, John! Thank you for being a life-saver.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Next Eligible</p>
                <p className="text-2xl font-bold text-gray-900">{daysUntilEligible} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Camp Registrations */}
        {myRegistrations.length > 0 && (
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Camp Registrations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {myRegistrations.map((registration) => (
                  <div key={registration.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{registration.campName}</h3>
                          <p className="text-sm text-gray-600">
                            {registration.date} at {registration.time} • {registration.location}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {registration.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation History */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Donations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Heart className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{donation.location}</p>
                        <p className="text-sm text-gray-500">{donation.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{donation.units} unit</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Blood Camps */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Blood Camps</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {upcomingCamps.map((camp) => (
                  <div key={camp.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{camp.name}</h3>
                      {camp.registered ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Registered
                        </span>
                      ) : (
                        <span className={`text-sm font-medium ${getAvailabilityColor(camp.slotsAvailable, camp.totalSlots)}`}>
                          {camp.slotsAvailable}/{camp.totalSlots} slots
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{camp.date} • {camp.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{camp.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Organized by {camp.organizer}</span>
                      </div>
                    </div>

                    {!camp.registered && camp.slotsAvailable > 0 ? (
                      <button 
                        onClick={() => handleCampRegistration(camp)}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Register for Camp
                      </button>
                    ) : camp.registered ? (
                      <button className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                        Already Registered
                      </button>
                    ) : (
                      <button className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                        Camp Full
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Availability Status</h2>
              <p className="text-gray-600 mt-1">Let recipients know if you're available to donate</p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="sr-only"
                defaultChecked
              />
              <div className="relative">
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Available</span>
            </label>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => setShowDonateNow(true)}
            className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors text-center"
          >
            <Heart className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Donate Now</h3>
            <p className="text-red-100 text-sm mt-1">Find nearby donation centers</p>
          </button>
          
          <button 
            onClick={() => setShowUpdateProfile(true)}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <User className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Update Profile</h3>
            <p className="text-blue-100 text-sm mt-1">Keep your information current</p>
          </button>
          
          <button 
            onClick={() => setShowNotifications(true)}
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center relative"
          >
            <Bell className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-green-100 text-sm mt-1">Manage your alerts</p>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Donate Now Modal */}
        {showDonateNow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Find Donation Centers</h2>
                <button
                  onClick={() => setShowDonateNow(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Search Filters */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="location"
                          value={donationFilters.location}
                          onChange={handleDonationFilterChange}
                          placeholder="Enter area or zip code"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Radius
                      </label>
                      <select
                        name="radius"
                        value={donationFilters.radius}
                        onChange={handleDonationFilterChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="25">25 km</option>
                        <option value="50">50 km</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={donationFilters.date}
                        onChange={handleDonationFilterChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Center Type
                      </label>
                      <select
                        name="type"
                        value={donationFilters.type}
                        onChange={handleDonationFilterChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="all">All Centers</option>
                        <option value="hospital">Hospitals</option>
                        <option value="redcross">Red Cross</option>
                        <option value="community">Community Centers</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Donation Centers List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {donationCenters.map((center) => (
                    <div key={center.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{center.name}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {center.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500">
                            <span className="text-sm font-medium">{center.rating}</span>
                            <span className="ml-1">★</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{center.address} • {center.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{center.hours}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{center.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm">
                          <span className="text-gray-600">Wait time: </span>
                          <span className="font-medium text-green-600">{center.waitTime}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Available slots: </span>
                          <span className="font-medium text-blue-600">{center.availableSlots}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBookAppointment(center)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Book Appointment
                        </button>
                        <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          <Navigation className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Profile Modal */}
        {showUpdateProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Update Profile</h2>
                <button
                  onClick={() => setShowUpdateProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={profileData.bloodGroup}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleProfileChange}
                      min="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={handleProfileChange}
                    placeholder="Name - Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions (Optional)
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={profileData.medicalConditions}
                    onChange={handleProfileChange}
                    rows={3}
                    placeholder="Any medical conditions or medications"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={profileData.availability}
                    onChange={handleProfileChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I am available for blood donation
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpdateProfile(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all as read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg p-4 ${
                        notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-blue-800'}`}>
                            {notification.message}
                          </p>
                          <button
                            onClick={() => handleNotificationAction(notification)}
                            className={`mt-2 text-sm font-medium ${
                              notification.read ? 'text-blue-600 hover:text-blue-800' : 'text-blue-700 hover:text-blue-900'
                            }`}
                          >
                            {notification.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {notifications.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Camp Registration Modal */}
        {showCampRegistration && selectedCamp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Register for Blood Camp</h2>
                <p className="text-gray-600 mt-1">{selectedCamp.name}</p>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-6">
                {/* Camp Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Camp Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date & Time</p>
                      <p className="font-medium">{selectedCamp.date} • {selectedCamp.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{selectedCamp.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Address</p>
                      <p className="font-medium">{selectedCamp.address}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Available Slots</p>
                      <p className="font-medium">{selectedCamp.slotsAvailable} remaining</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600 text-sm mb-2">Requirements:</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {selectedCamp.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600 text-sm mb-2">Facilities Provided:</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {selectedCamp.facilities.map((facility: string, index: number) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Registration Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      name="preferredTime"
                      value={registrationData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
                      <option value="anytime">Any time available</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={registrationData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      placeholder="Name and phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Conditions (if any)
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={registrationData.medicalConditions}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Please mention any medical conditions, medications, or allergies"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests or Notes
                    </label>
                    <textarea
                      name="specialRequests"
                      value={registrationData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any special accommodations or requests"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <div className="text-sm">
                      <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• Please arrive 15 minutes before your scheduled time</li>
                        <li>• Bring a valid photo ID</li>
                        <li>• Eat a healthy meal and stay hydrated before donation</li>
                        <li>• Avoid alcohol 24 hours before donation</li>
                        <li>• You can cancel your registration up to 24 hours before the camp</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I confirm that I meet all the eligibility criteria and agree to the terms and conditions for blood donation. *
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Confirm Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCampRegistration(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;