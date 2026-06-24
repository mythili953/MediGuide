import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Toast, useToast } from '../components/UI'
import { User, Mail, Globe, Phone, Droplets, AlertTriangle, Shield, Contact } from 'lucide-react'
import api from '../services/api'

export default function Profile() {
  const { user, logout } = useAuth()
  const { toast, show } = useToast()
  const [form, setForm] = useState({
    name: '', email: '', nationality: '', preferredLanguage: 'en',
    phoneNumber: '', bloodGroup: '', allergies: '', insuranceProvider: '', emergencyContact: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) setForm({
      name: user.name || '',
      email: user.email || '',
      nationality: user.nationality || '',
      preferredLanguage: user.preferredLanguage || 'en',
      phoneNumber: user.phoneNumber || '',
      bloodGroup: user.bloodGroup || '',
      allergies: user.allergies || '',
      insuranceProvider: user.insuranceProvider || '',
      emergencyContact: user.emergencyContact || '',
    })
  }, [user])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put(`/users/${user.userId || user.id}`, form)
      show('Profile updated successfully!', 'success')
      const stored = JSON.parse(localStorage.getItem('user') || '{}')
      localStorage.setItem('user', JSON.stringify({ ...stored, ...form }))
    } catch {
      show('Failed to update profile. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const SECTIONS = [
    {
      title: 'Personal Information',
      icon: <User size={18} />,
      color: '#6366f1',
      fields: [
        { name: 'name', label: 'Full Name', placeholder: 'Jane Traveler', icon: <User size={14} /> },
        { name: 'email', label: 'Email Address', placeholder: 'jane@example.com', icon: <Mail size={14} />, type: 'email', disabled: true },
        { name: 'phoneNumber', label: 'Phone Number', placeholder: '+1-555-0100', icon: <Phone size={14} /> },
        { name: 'nationality', label: 'Nationality', placeholder: 'American', icon: <Globe size={14} /> },
      ]
    },
    {
      title: 'Medical Information',
      icon: <Droplets size={18} />,
      color: '#ef4444',
      fields: [
        { name: 'bloodGroup', label: 'Blood Group', placeholder: 'e.g. O+, AB-', icon: <Droplets size={14} /> },
        { name: 'allergies', label: 'Known Allergies', placeholder: 'e.g. Penicillin, Peanuts', icon: <AlertTriangle size={14} /> },
        { name: 'insuranceProvider', label: 'Insurance Provider', placeholder: 'e.g. Cigna, Aetna', icon: <Shield size={14} /> },
        { name: 'emergencyContact', label: 'Emergency Contact', placeholder: 'Name: +1-555-0100', icon: <Contact size={14} /> },
      ]
    },
  ]

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 800, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Avatar Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, fontWeight: 800, margin: '0 auto 16px',
          boxShadow: '0 0 0 4px rgba(99,102,241,0.2)',
        }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>{user?.name}</h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>{user?.email}</p>
        {user?.role === 'ADMIN' && (
          <span style={{
            display: 'inline-block', marginTop: 8, background: 'rgba(99,102,241,0.15)',
            color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 999, padding: '3px 14px', fontSize: 12, fontWeight: 700,
          }}>🛡️ Administrator</span>
        )}
      </div>

      {/* Emergency Card Preview */}
      {(form.bloodGroup || form.allergies) && (
        <div style={{
          background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 32,
          display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, fontWeight: 700 }}>EMERGENCY CARD PREVIEW</p>
            <p style={{ fontSize: 13, color: '#fca5a5' }}>This critical info is shown to first responders</p>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {form.bloodGroup && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 9, color: '#94a3b8', marginBottom: 2 }}>BLOOD GROUP</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: '#fb7185' }}>{form.bloodGroup}</p>
              </div>
            )}
            {form.allergies && (
              <div>
                <p style={{ fontSize: 9, color: '#94a3b8', marginBottom: 4 }}>ALLERGIES</p>
                <p style={{ color: '#fcd34d', fontWeight: 600, fontSize: 14 }}>⚠️ {form.allergies}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {SECTIONS.map(section => (
          <div key={section.title} className="glass-card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ color: section.color }}>{section.icon}</div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>{section.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
              {section.fields.map(f => (
                <div key={f.name}>
                  <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                      {f.icon}
                    </span>
                    <input
                      name={f.name}
                      type={f.type || 'text'}
                      className="input-field"
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={onChange}
                      disabled={f.disabled}
                      style={{ paddingLeft: 40, opacity: f.disabled ? 0.6 : 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Language pref */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Preferences</h2>
          <div>
            <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Preferred Language</label>
            <select name="preferredLanguage" className="input-field" style={{ maxWidth: 280 }}
              value={form.preferredLanguage} onChange={onChange}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Mandarin</option>
              <option value="ja">Japanese</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '12px 32px' }}>
            {saving ? '⏳ Saving...' : '💾 Save Profile'}
          </button>
          <button type="button" onClick={logout} className="btn-danger" style={{ padding: '12px 24px' }}>
            🚪 Sign Out
          </button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}
    </div>
  )
}
