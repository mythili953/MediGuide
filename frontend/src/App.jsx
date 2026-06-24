import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Landing         from './pages/Landing'
import { LoginPage, RegisterPage } from './pages/Auth'
import Dashboard       from './pages/Dashboard'
import HospitalSearch  from './pages/HospitalSearch'
import HospitalDetail  from './pages/HospitalDetail'
import CostDashboard   from './pages/CostDashboard'
import MapPage         from './pages/MapPage'
import Translator      from './pages/Translator'
import Symptoms        from './pages/Symptoms'
import Emergency       from './pages/Emergency'
import Profile         from './pages/Profile'
import AdminDashboard  from './pages/AdminDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/"          element={<Landing />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />
          <Route path="/emergency" element={<Emergency />} />

          {/* Public read-only pages */}
          <Route path="/search"          element={<HospitalSearch />} />
          <Route path="/hospitals/:id"   element={<HospitalDetail />} />
          <Route path="/costs"           element={<CostDashboard />} />
          <Route path="/map"             element={<MapPage />} />
          <Route path="/translate"       element={<Translator />} />
          <Route path="/symptoms"        element={<Symptoms />} />

          {/* Auth required */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile"   element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin only */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
