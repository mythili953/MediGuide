import { useEffect, useState } from 'react'
import { adminAPI, reviewsAPI, hospitalsAPI } from '../services/api'
import { Spinner } from '../components/UI'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Users, Hospital, Star, MapPin, Trash2, ShieldCheck, Plus, X } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [users,     setUsers]     = useState([])
  const [hospitals, setHospitals] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [tab,       setTab]       = useState('overview')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '', address: '', city: '', country: '',
    latitude: '', longitude: '', specialties: '',
    emergencyAvailable: false, openingHours: '24/7',
    phoneNumber: '', website: '', imageUrl: '',
    hospitalType: 'General Hospital', bedCount: ''
  })

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      adminAPI.getAnalytics().then(r => setAnalytics(r.data)),
      adminAPI.getUsers().then(r => setUsers(r.data)),
      hospitalsAPI.getAll().then(r => setHospitals(r.data)),
    ]).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const deleteUser = async id => {
    if (!confirm('Delete this user?')) return
    try {
      await adminAPI.deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      alert('Failed to delete user: ' + (err.response?.data?.message || err.message))
    }
  }

  const deleteHospital = async id => {
    if (!confirm('Delete this hospital? This will remove all associated reviews, costs, and doctors.')) return
    try {
      await adminAPI.deleteHospital(id)
      setHospitals(prev => prev.filter(h => h.id !== id))
      // Refresh analytics
      adminAPI.getAnalytics().then(r => setAnalytics(r.data))
    } catch (err) {
      alert('Failed to delete hospital: ' + (err.response?.data?.message || err.message))
    }
  }

  const onFormChange = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [e.target.name]: val }))
  }

  const onSubmitHospital = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        latitude: parseFloat(form.latitude) || 0.0,
        longitude: parseFloat(form.longitude) || 0.0,
        bedCount: parseInt(form.bedCount) || 0,
      }
      const res = await adminAPI.addHospital(payload)
      setHospitals(prev => [res.data, ...prev])
      setShowModal(false)
      // Reset form
      setForm({
        name: '', address: '', city: '', country: '',
        latitude: '', longitude: '', specialties: '',
        emergencyAvailable: false, openingHours: '24/7',
        phoneNumber: '', website: '', imageUrl: '',
        hospitalType: 'General Hospital', bedCount: ''
      })
      // Refresh analytics
      adminAPI.getAnalytics().then(r => setAnalytics(r.data))
    } catch (err) {
      alert('Failed to add hospital: ' + (err.response?.data?.message || err.message))
    }
  }

  const METRICS = analytics ? [
    { icon: <Users size={22} />, label: 'Total Users', value: analytics.totalUsers, color: '#6366f1' },
    { icon: <Hospital size={22} />, label: 'Hospitals', value: analytics.totalHospitals, color: '#14b8a6' },
    { icon: <Star size={22} />, label: 'Total Reviews', value: analytics.totalReviews, color: '#f59e0b' },
    { icon: <MapPin size={22} />, label: 'Cities', value: analytics.cities?.length || 0, color: '#ec4899' },
  ] : []

  const cityBarData = analytics?.cities ? {
    labels: analytics.cities,
    datasets: [{
      label: 'Hospitals per City',
      data: analytics.cities.map(() => Math.floor(Math.random() * 4) + 1), // sample
      backgroundColor: ['#6366f1','#14b8a6','#f59e0b','#ef4444','#10b981','#ec4899','#8b5cf6','#06b6d4'],
      borderRadius: 6, borderWidth: 0,
    }]
  } : null

  const roleData = {
    labels: ['Users', 'Admins'],
    datasets: [{
      data: [users.filter(u => u.role === 'USER').length, users.filter(u => u.role === 'ADMIN').length],
      backgroundColor: ['#6366f1', '#14b8a6'],
      borderWidth: 2, borderColor: '#1a1d2e',
    }]
  }

  const TABS = ['overview', 'users', 'hospitals']

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p className="section-label" style={{ color: '#a5b4fc' }}>Admin Panel</p>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>
            <ShieldCheck size={28} style={{ display: 'inline', marginRight: 10, color: '#6366f1' }} />
            Admin Dashboard
          </h1>
        </div>
        <button onClick={fetchData} className="btn-secondary" style={{ padding: '10px 20px' }}>
          🔄 Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 24px', border: 'none', borderRadius: 8,
            background: tab === t ? '#6366f1' : 'transparent',
            color: tab === t ? 'white' : '#94a3b8',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize',
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <>
          {tab === 'overview' && analytics && (
            <>
              {/* Metric cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
                {METRICS.map(m => (
                  <div key={m.label} className="stat-card">
                    <div style={{ color: m.color, display: 'flex', justifyContent: 'center', marginBottom: 12 }}>{m.icon}</div>
                    <p style={{ fontSize: 36, fontWeight: 900, color: m.color }}>{m.value}</p>
                    <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))', gap: 24, marginBottom: 32 }}>
                {cityBarData && (
                  <div className="glass-card" style={{ padding: 24 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Hospitals by City</h3>
                    <Bar data={cityBarData} options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                      }
                    }} />
                  </div>
                )}
                <div className="glass-card" style={{ padding: 24 }}>
                  <h3 style={{ fontWeight: 700, marginBottom: 16 }}>User Roles</h3>
                  <div style={{ height: 220 }}>
                    <Doughnut data={roleData} options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 13 }, padding: 16 } }
                      }
                    }} />
                  </div>
                </div>
              </div>

              {/* Cities list */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Covered Cities</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {analytics.cities?.map(c => (
                    <span key={c} style={{
                      background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                      border: '1px solid rgba(99,102,241,0.2)',
                      borderRadius: 8, padding: '5px 14px', fontSize: 13,
                    }}>📍 {c}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === 'users' && (
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18 }}>User Management</h3>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{users.length} users total</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['ID', 'Name', 'Email', 'Nationality', 'Role', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.06em' }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 16px', color: '#475569', fontSize: 13 }}>#{u.id}</td>
                        <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{u.email}</td>
                        <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{u.nationality || '—'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            background: u.role === 'ADMIN' ? 'rgba(99,102,241,0.15)' : 'rgba(20,184,166,0.1)',
                            color: u.role === 'ADMIN' ? '#a5b4fc' : '#5eead4',
                            border: `1px solid ${u.role === 'ADMIN' ? 'rgba(99,102,241,0.3)' : 'rgba(20,184,166,0.3)'}`,
                            borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700,
                          }}>{u.role}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {u.role !== 'ADMIN' && (
                            <button onClick={() => deleteUser(u.id)}
                              style={{ background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fca5a5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                              <Trash2 size={14} /> Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'hospitals' && (
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18 }}>Hospital Management</h3>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13 }}>
                  <Plus size={16} /> Add Hospital
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['ID', 'Name', 'City', 'Country', 'Type', 'Beds', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.06em' }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map(h => (
                      <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 16px', color: '#475569', fontSize: 13 }}>#{h.id}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{h.name}</span>
                          <span style={{ display: 'block', fontSize: 11, color: '#64748b', marginTop: 2 }}>{h.address}</span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#e2e8f0', fontSize: 13 }}>{h.city}</td>
                        <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{h.country}</td>
                        <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{h.hospitalType || '—'}</td>
                        <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{h.bedCount || '—'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <button onClick={() => deleteHospital(h.id)}
                            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fca5a5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal Dialog Form */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 24
        }}>
          <div className="glass-card page-enter" style={{
            width: '100%', maxWidth: 640, padding: 32, position: 'relative',
            maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <button onClick={() => setShowModal(false)} style={{
              position: 'absolute', right: 20, top: 20, background: 'none',
              border: 'none', color: '#94a3b8', cursor: 'pointer'
            }}>
              <X size={20} />
            </button>
            
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Hospital size={22} style={{ color: '#14b8a6' }} /> Add New Hospital
            </h3>
            
            <form onSubmit={onSubmitHospital} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Hospital Name *</label>
                <input name="name" className="input-field" placeholder="e.g. City General Hospital" value={form.name} onChange={onFormChange} required />
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Address *</label>
                <input name="address" className="input-field" placeholder="e.g. 123 Main St" value={form.address} onChange={onFormChange} required />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>City *</label>
                <input name="city" className="input-field" placeholder="e.g. New York" value={form.city} onChange={onFormChange} required />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Country *</label>
                <input name="country" className="input-field" placeholder="e.g. USA" value={form.country} onChange={onFormChange} required />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Latitude *</label>
                <input name="latitude" type="number" step="any" className="input-field" placeholder="e.g. 40.7128" value={form.latitude} onChange={onFormChange} required />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Longitude *</label>
                <input name="longitude" type="number" step="any" className="input-field" placeholder="e.g. -74.0060" value={form.longitude} onChange={onFormChange} required />
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Hospital Type *</label>
                <select name="hospitalType" className="input-field" value={form.hospitalType} onChange={onFormChange}>
                  <option value="General Hospital">General Hospital</option>
                  <option value="Teaching Hospital">Teaching Hospital</option>
                  <option value="Public Hospital">Public Hospital</option>
                  <option value="Private Clinic">Private Clinic</option>
                  <option value="Specialty Center">Specialty Center</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Bed Count</label>
                <input name="bedCount" type="number" className="input-field" placeholder="e.g. 250" value={form.bedCount} onChange={onFormChange} />
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Specialties * (comma-separated)</label>
                <input name="specialties" className="input-field" placeholder="e.g. Cardiology, Pediatrics, Oncology" value={form.specialties} onChange={onFormChange} required />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Phone Number</label>
                <input name="phoneNumber" className="input-field" placeholder="e.g. +1-555-0199" value={form.phoneNumber} onChange={onFormChange} />
              </div>
              
              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Website</label>
                <input name="website" className="input-field" placeholder="e.g. hospital.org" value={form.website} onChange={onFormChange} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Image URL</label>
                <input name="imageUrl" className="input-field" placeholder="https://images.unsplash.com/..." value={form.imageUrl} onChange={onFormChange} />
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Opening Hours</label>
                <input name="openingHours" className="input-field" placeholder="e.g. 24/7 or 8 AM - 8 PM" value={form.openingHours} onChange={onFormChange} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: '100%', paddingTop: 20 }}>
                <input type="checkbox" id="emergencyAvailable" name="emergencyAvailable" checked={form.emergencyAvailable} onChange={onFormChange} style={{ cursor: 'pointer', width: 18, height: 18 }} />
                <label htmlFor="emergencyAvailable" style={{ fontSize: 14, color: '#e2e8f0', cursor: 'pointer' }}>Emergency Available (24/7)</label>
              </div>
              
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 24px' }}>Add Hospital</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
