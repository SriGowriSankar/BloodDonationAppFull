import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-600 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BloodConnect</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting blood donors with those in need to save lives across the globe.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </a>
              <a href="/how-it-works" className="block text-gray-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="/faq" className="block text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">support@bloodconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">24/7 Emergency Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 BloodConnect. All rights reserved. Made with ❤️ for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;