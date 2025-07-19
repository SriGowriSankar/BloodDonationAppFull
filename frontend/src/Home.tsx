import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Clock, Shield, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Save Lives with Every
              <span className="block text-red-200">Drop of Blood</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Connect blood donors with recipients instantly. Join thousands saving lives across the globe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Become a Donor
              </Link>
              <Link
                to="/recipient/search"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
              >
                Find Blood Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50,000+</h3>
              <p className="text-gray-600">Lives Saved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25,000+</h3>
              <p className="text-gray-600">Registered Donors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Partner Hospitals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-600">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose BloodConnect?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes blood donation and requests seamless, secure, and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instant Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our smart algorithm instantly matches blood requests with nearby compatible donors
                based on location, blood type, and availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Verified & Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                All donors and hospitals are thoroughly verified. Your personal information 
                is protected with enterprise-grade security.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Location-Based</h3>
              <p className="text-gray-600 leading-relaxed">
                Find donors within your preferred radius. GPS-enabled matching ensures 
                you get help from the nearest available donors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Join our community of heroes. Whether you're donating blood or need blood, 
            we're here to connect you with the right people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-all transform hover:scale-105"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;