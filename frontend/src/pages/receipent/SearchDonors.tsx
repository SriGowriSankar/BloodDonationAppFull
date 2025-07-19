import React, { useState } from 'react';
import { Search, MapPin, Phone, Heart, Filter, User } from 'lucide-react';

const SearchDonors: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    bloodGroup: '',
    location: '',
    radius: '10',
    availability: 'available'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Complete donor database with various blood groups
  const allDonors = [
    // A+ Donors
    { id: 1, name: 'Sankar', bloodGroup: 'A+', location: 'Downtown', distance: '2.3 km', lastDonation: '90 days ago', totalDonations: 12, availability: 'Available', phone: '8367739782', verified: true },
    { id: 2, name: 'Praveen', bloodGroup: 'A+', location: 'City Center', distance: '4.1 km', lastDonation: '120 days ago', totalDonations: 8, availability: 'Available', phone: '9603335599', verified: true },
    { id: 3, name: 'Madhu', bloodGroup: 'A+', location: 'Northside', distance: '5.7 km', lastDonation: '85 days ago', totalDonations: 15, availability: 'Available', phone: '9666869782', verified: true },
    { id: 4, name: 'Pankaj', bloodGroup: 'A+', location: 'Westend', distance: '7.2 km', lastDonation: '95 days ago', totalDonations: 6, availability: 'Available', phone: '8500480882', verified: false },
    
    // A- Donors
    { id: 5, name: 'Lokesh', bloodGroup: 'A-', location: 'Eastside', distance: '3.5 km', lastDonation: '105 days ago', totalDonations: 9, availability: 'Available', phone: '8367739782', verified: true },
    { id: 6, name: 'Sankar Kumar', bloodGroup: 'A-', location: 'Central Park', distance: '6.8 km', lastDonation: '78 days ago', totalDonations: 11, availability: 'Available', phone: '9603335599', verified: true },
    { id: 7, name: 'Praveen Kumar', bloodGroup: 'A-', location: 'Riverside', distance: '8.1 km', lastDonation: '130 days ago', totalDonations: 7, availability: 'Available', phone: '9666869782', verified: true },
    
    // B+ Donors
    { id: 8, name: 'Madhu Nanda', bloodGroup: 'B+', location: 'Tech District', distance: '4.7 km', lastDonation: '88 days ago', totalDonations: 13, availability: 'Available', phone: '8500480882', verified: true },
    { id: 9, name: 'Pankaj Kumar', bloodGroup: 'B+', location: 'University Area', distance: '5.2 km', lastDonation: '92 days ago', totalDonations: 10, availability: 'Available', phone: '8367739782', verified: true },
    { id: 10, name: 'Lokesh Kanaka', bloodGroup: 'B+', location: 'Shopping District', distance: '6.3 km', lastDonation: '115 days ago', totalDonations: 5, availability: 'Available', phone: '9603335599', verified: false },
    
    // B- Donors
    { id: 11, name: 'Sankar Reddy', bloodGroup: 'B-', location: 'Financial District', distance: '3.9 km', lastDonation: '82 days ago', totalDonations: 14, availability: 'Available', phone: '9666869782', verified: true },
    { id: 12, name: 'Praveen Reddy', bloodGroup: 'B-', location: 'Arts Quarter', distance: '7.5 km', lastDonation: '98 days ago', totalDonations: 8, availability: 'Available', phone: '8500480882', verified: true },
    
    // AB+ Donors
    { id: 13, name: 'Madhu Prakash', bloodGroup: 'AB+', location: 'Medical District', distance: '2.8 km', lastDonation: '76 days ago', totalDonations: 16, availability: 'Available', phone: '8367739782', verified: true },
    { id: 14, name: 'Pankaj Sharma', bloodGroup: 'AB+', location: 'Suburban Area', distance: '9.1 km', lastDonation: '125 days ago', totalDonations: 4, availability: 'Available', phone: '9603335599', verified: true },
    { id: 15, name: 'Lokesh Sharma', bloodGroup: 'AB+', location: 'Industrial Zone', distance: '8.7 km', lastDonation: '87 days ago', totalDonations: 12, availability: 'Available', phone: '9666869782', verified: false },
    
    // AB- Donors
    { id: 16, name: 'Sankar Prasad', bloodGroup: 'AB-', location: 'Historic District', distance: '5.4 km', lastDonation: '103 days ago', totalDonations: 7, availability: 'Available', phone: '8500480882', verified: true },
    { id: 17, name: 'Praveen Prasad', bloodGroup: 'AB-', location: 'Lakeside', distance: '6.9 km', lastDonation: '89 days ago', totalDonations: 9, availability: 'Available', phone: '8367739782', verified: true },
    
    // O+ Donors
    { id: 18, name: 'Madhu Krishna', bloodGroup: 'O+', location: 'Sports Complex', distance: '4.2 km', lastDonation: '94 days ago', totalDonations: 18, availability: 'Available', phone: '9603335599', verified: true },
    { id: 19, name: 'Pankaj Krishna', bloodGroup: 'O+', location: 'Business Park', distance: '5.8 km', lastDonation: '81 days ago', totalDonations: 11, availability: 'Available', phone: '9666869782', verified: true },
    { id: 20, name: 'Lokesh Krishna', bloodGroup: 'O+', location: 'Residential Area', distance: '7.3 km', lastDonation: '107 days ago', totalDonations: 6, availability: 'Available', phone: '8500480882', verified: true },
    { id: 21, name: 'Sankar Krishna', bloodGroup: 'O+', location: 'Airport Area', distance: '9.5 km', lastDonation: '72 days ago', totalDonations: 20, availability: 'Available', phone: '8367739782', verified: true },
    
    // O- Donors (Universal donors)
    { id: 22, name: 'Praveen Rao', bloodGroup: 'O-', location: 'Hospital District', distance: '1.8 km', lastDonation: '85 days ago', totalDonations: 22, availability: 'Available', phone: '9603335599', verified: true },
    { id: 23, name: 'Madhu Rao', bloodGroup: 'O-', location: 'Emergency Services', distance: '3.1 km', lastDonation: '96 days ago', totalDonations: 17, availability: 'Available', phone: '9666869782', verified: true },
    { id: 24, name: 'Pankaj Rao', bloodGroup: 'O-', location: 'Red Cross Center', distance: '4.6 km', lastDonation: '79 days ago', totalDonations: 19, availability: 'Available', phone: '8500480882', verified: true },
    { id: 25, name: 'Lokesh Rao', bloodGroup: 'O-', location: 'Community Center', distance: '6.2 km', lastDonation: '112 days ago', totalDonations: 13, availability: 'Available', phone: '8367739782', verified: true },
    { id: 26, name: 'Sankar Rao', bloodGroup: 'O-', location: 'Fire Station', distance: '7.8 km', lastDonation: '88 days ago', totalDonations: 15, availability: 'Available', phone: '9603335599', verified: false }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Blood compatibility rules
  const getCompatibleDonors = (recipientBloodGroup: string) => {
    const compatibility: { [key: string]: string[] } = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal recipient
      'AB-': ['A-', 'B-', 'AB-', 'O-'],
      'O+': ['O+', 'O-'],
      'O-': ['O-']
    };
    
    return compatibility[recipientBloodGroup] || [];
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchFilters.bloodGroup) {
      setSearchResults([]);
      return;
    }

    // Get compatible blood groups for the requested blood group
    const compatibleBloodGroups = getCompatibleDonors(searchFilters.bloodGroup);
    
    // Filter donors based on compatibility and other criteria
    let filteredDonors = allDonors.filter(donor => {
      // Blood group compatibility check
      const isCompatible = compatibleBloodGroups.includes(donor.bloodGroup);
      
      // Availability check
      const isAvailable = searchFilters.availability === 'all' || donor.availability === 'Available';
      
      // Distance check (convert radius to number for comparison)
      const maxDistance = parseInt(searchFilters.radius);
      const donorDistance = parseFloat(donor.distance.replace(' km', ''));
      const withinRadius = donorDistance <= maxDistance;
      
      // Location filter (if specified)
      const locationMatch = !searchFilters.location || 
        donor.location.toLowerCase().includes(searchFilters.location.toLowerCase());
      
      return isCompatible && isAvailable && withinRadius && locationMatch;
    });

    // Sort by distance (closest first)
    filteredDonors.sort((a, b) => {
      const distanceA = parseFloat(a.distance.replace(' km', ''));
      const distanceB = parseFloat(b.distance.replace(' km', ''));
      return distanceA - distanceB;
    });

    setSearchResults(filteredDonors);
  };

  const handleContactDonor = (donor: any) => {
    // Implement contact functionality
    console.log('Contacting donor:', donor.name);
    alert(`Contacting ${donor.name} at ${donor.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Donors</h1>
          <p className="text-gray-600 mt-2">Find compatible blood donors in your area</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group Required *
                </label>
                <select
                  name="bloodGroup"
                  value={searchFilters.bloodGroup}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={searchFilters.location}
                    onChange={handleFilterChange}
                    placeholder="Enter area or district"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Radius
                </label>
                <select
                  name="radius"
                  value={searchFilters.radius}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search Donors</span>
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <Filter className="h-4 w-4" />
                <span>Advanced Filters</span>
              </button>
              <p className="text-sm text-gray-500">
                {searchResults.length > 0 ? `Found ${searchResults.length} compatible donors` : 'Enter blood group to search'}
              </p>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={searchFilters.availability}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="available">Available Now</option>
                      <option value="all">All Donors</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Blood Compatibility Info */}
        {searchFilters.bloodGroup && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Blood Compatibility Info</h3>
                <p className="text-blue-700 text-sm mt-1">
                  For {searchFilters.bloodGroup} recipients, compatible donors are: {getCompatibleDonors(searchFilters.bloodGroup).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((donor) => (
              <div key={donor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{donor.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-600 font-medium">{donor.bloodGroup}</span>
                        {donor.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    donor.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.availability}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{donor.location} • {donor.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Last donation: {donor.lastDonation}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-center text-xs font-bold text-red-600">#</span>
                    <span>Total donations: {donor.totalDonations}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleContactDonor(donor)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Contact Donor</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : searchFilters.bloodGroup ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No compatible donors found</h3>
            <p className="text-gray-600 mb-4">
              Try expanding your search radius or check back later for new donors.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600 mb-4">
              Select a blood group above to find compatible donors in your area.
            </p>
          </div>
        )}

        {/* Emergency Banner */}
        <div className="mt-12 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Heart className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Emergency Blood Needed?</h3>
              <p className="text-red-700 mt-1">
                If this is an emergency, please contact our 24/7 emergency hotline at{' '}
                <a href="tel:+1-555-BLOOD-911" className="font-medium underline">
                  +1-555-BLOOD-911
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;