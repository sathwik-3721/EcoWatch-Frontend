import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard';
import ForgotPasswordPage from './components/ForgetPasswordPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        </Routes>
        {/* <footer className="py-4 text-center text-gray-600">
          <p>&copy; 2024 Sathwik. All rights reserved.</p>
        </footer> */}
      </div>
    </Router>
  )
}