import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hospitalsAPI, symptomsAPI, helplinesAPI } from '../services/api'
import { Spinner, StarRating } from '../components/UI'
import { Search, Phone, MapPin, DollarSign, Activity, Globe } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [hospitals, setHospitals] = useState([])
  const [symptoms,  setSymptoms]  = useState([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([
      hospitalsAPI.getAll().then(r => setHospitals(r.data.slice(0, 6))),
      symptomsAPI.getAll().then(r => setSymptoms(r.data.slice(0, 5))),
    ]).finally(() => setLoading(false))
  }, [])

  const QUICK_ACTIONS = [
    { icon: <Search size={22} />, label: 'Find Hospital', color: '#6366f1', to: '/search' },
    { icon: <Phone size={22} />, label: 'Emergency Help', color: '#ef4444', to: '/emergency' },
    { icon: <DollarSign size={22} />, label: 'Cost Dashboard', color: '#14b8a6', to: '/costs' },
    { icon: <Globe size={22} />, label: 'Translate', color: '#f59e0b', to: '/translate' },
    { icon: <Activity size={22} />, label: 'Symptoms', color: '#ec4899', to: '/symptoms' },
    { icon: <MapPin size={22} />, label: 'View Map', color: '#10b981', to: '/map' },
  ]

  if (loading) return <div style={{ paddingTop: 80 }}><Spinner /></div>

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 40px' }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(20,184,166,0.1) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 20, padding: '32px 40px', marginBottom: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <p style={{ color: '#a5b4fc', fontSize: 14, marginBottom: 6 }}>Good to see you back 👋</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Welcome, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Traveler'}</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            {user?.nationality && `📍 ${user.nationality} · `}Your health assistant is ready.
          </p>
        </div>
        <Link to="/search" className="btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>
          <Search size={18} /> Find Care Now
        </Link>
      </div>

      {/* Quick Actions */}
      <section style={{ marginBottom: 40 }}>
        <p className="section-label">Quick Actions</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
          {QUICK_ACTIONS.map(a => (
            <Link key={a.to} to={a.to} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${a.color}18`,
                  color: a.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>{a.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{a.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* User Medical Profile Summary */}
      {(user?.bloodGroup || user?.allergies || user?.insuranceProvider) && (
        <section style={{ marginBottom: 40 }}>
          <p className="section-label">Your Medical Profile</p>
          <div className="glass-card" style={{ padding: 24, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {user.bloodGroup && (
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>BLOOD GROUP</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#fb7185' }}>{user.bloodGroup}</p>
              </div>
            )}
            {user.allergies && (
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>ALLERGIES</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#fcd34d' }}>⚠️ {user.allergies}</p>
              </div>
            )}
            {user.insuranceProvider && (
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>INSURANCE</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#6ee7b7' }}>🛡️ {user.insuranceProvider}</p>
              </div>
            )}
            <Link to="/profile" style={{ marginLeft: 'auto', color: '#818cf8', fontSize: 13, textDecoration: 'none', alignSelf: 'center' }}>
              Edit Profile →
            </Link>
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>

        {/* Featured Hospitals */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p className="section-label" style={{ marginBottom: 0 }}>Featured Hospitals</p>
            <Link to="/search" style={{ fontSize: 13, color: '#818cf8', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {hospitals.slice(0, 4).map(h => (
              <Link key={h.id} to={`/hospitals/${h.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                  {h.imageUrl && (
                    <img src={h.imageUrl} alt={h.name}
                      style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} /> {h.city}, {h.country}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <StarRating value={h.rating || 0} />
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{h.rating?.toFixed(1)}</span>
                      {h.emergencyAvailable && <span style={{ fontSize: 11, color: '#fb7185', fontWeight: 700 }}>24/7 ER</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Symptom Checker Teaser */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p className="section-label" style={{ marginBottom: 0 }}>Common Symptoms</p>
            <Link to="/symptoms" style={{ fontSize: 13, color: '#818cf8', textDecoration: 'none' }}>Check symptoms →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => {
              const colors = { EMERGENCY: '#fb7185', URGENT: '#fcd34d', NON_URGENT: '#6ee7b7' }
              return (
                <Link key={s.id} to="/symptoms" style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: colors[s.urgencyLevel], flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8' }}>{s.recommendedSpecialty}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors[s.urgencyLevel] }}>{s.urgencyLevel}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Emergency Banner */}
          <div style={{
            marginTop: 16,
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 12, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🚨</span>
            <div>
              <p style={{ fontWeight: 700, color: '#fca5a5', fontSize: 14 }}>Emergency?</p>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>Access local emergency helplines instantly</p>
            </div>
            <Link to="/emergency" className="btn-danger" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: 13 }}>
              Help Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
