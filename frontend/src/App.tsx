import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DonorDashboard from './pages/dashboards/DonorDashboard';
import RecipientDashboard from './pages/dashboards/RecipientDashboard';
import HospitalDashboard from './pages/dashboards/HospitalDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DonorProfile from './pages/donor/DonorProfile';
import SearchDonors from './pages/recipient/SearchDonors';
import BloodRequest from './pages/recipient/BloodRequest';
import InventoryManagement from './pages/hospital/InventoryManagement';
import DonationCamps from './pages/hospital/DonationCamps';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Donor Routes */}
              <Route 
                path="/donor/dashboard" 
                element={
                  <ProtectedRoute role="donor">
                    <DonorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/donor/profile" 
                element={
                  <ProtectedRoute role="donor">
                    <DonorProfile />
                  </ProtectedRoute>
                } 
              />

              {/* Recipient Routes */}
              <Route 
                path="/recipient/dashboard" 
                element={
                  <ProtectedRoute role="recipient">
                    <RecipientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recipient/search" 
                element={
                  <ProtectedRoute role="recipient">
                    <SearchDonors />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recipient/request" 
                element={
                  <ProtectedRoute role="recipient">
                    <BloodRequest />
                  </ProtectedRoute>
                } 
              />

              {/* Hospital Routes */}
              <Route 
                path="/hospital/dashboard" 
                element={
                  <ProtectedRoute role="hospital">
                    <HospitalDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hospital/inventory" 
                element={
                  <ProtectedRoute role="hospital">
                    <InventoryManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hospital/camps" 
                element={
                  <ProtectedRoute role="hospital">
                    <DonationCamps />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;