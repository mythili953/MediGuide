import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Search, MapPin, DollarSign, Languages, Phone, Activity,
  Star, Globe, Clock, ChevronRight, Shield, Zap, Heart
} from 'lucide-react'

const STATS = [
  { icon: '🏥', value: '500+', label: 'Verified Hospitals' },
  { icon: '👨‍⚕️', value: '2,000+', label: 'Multilingual Doctors' },
  { icon: '🌍', value: '80+', label: 'Countries Covered' },
  { icon: '⭐', value: '4.8/5', label: 'Traveler Rating' },
]

const FEATURES = [
  {
    icon: '🔍',
    title: 'Smart Hospital Finder',
    desc: 'Find trusted hospitals near you, filtered by language, specialty, and budget.',
    color: '#6366f1', to: '/search',
  },
  {
    icon: '💰',
    title: 'Cost Transparency',
    desc: 'See exact consultation, MRI, and procedure costs before you go.',
    color: '#14b8a6', to: '/costs',
  },
  {
    icon: '🗣️',
    title: 'Medical Translator',
    desc: 'Instantly translate medical phrases into 8 languages with phonetics.',
    color: '#f59e0b', to: '/translate',
  },
  {
    icon: '🩺',
    title: 'Symptom Triage',
    desc: 'Describe your symptoms and get urgency classification and specialist recommendations.',
    color: '#ec4899', to: '/symptoms',
  },
  {
    icon: '📞',
    title: 'Emergency Center',
    desc: 'One-tap access to ambulance, police, and tourist helplines worldwide.',
    color: '#ef4444', to: '/emergency',
  },
  {
    icon: '🗺️',
    title: 'Interactive Map',
    desc: 'Pin hospitals, pharmacies, and clinics on an interactive live map.',
    color: '#10b981', to: '/map',
  },
]

const CITIES = ['New York', 'London', 'Tokyo', 'Dubai', 'Paris', 'Mumbai', 'Singapore', 'Berlin']

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="page-enter" style={{ paddingTop: 64 }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-bg" style={{ padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 32,
            fontSize: 13, color: '#a5b4fc', fontWeight: 600,
          }}>
            <Zap size={14} /> Trusted healthcare navigation for global travelers
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Your Health Companion{' '}
            <span className="gradient-text">Wherever You Travel</span>
          </h1>

          <p style={{ fontSize: 19, color: '#94a3b8', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}>
            Find trusted hospitals, multilingual doctors, transparent costs, and emergency helplines — instantly, in any country.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/search" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                <Search size={18} /> Find Hospital Now
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
                  Sign In
                </Link>
              </>
            )}
            <Link to="/emergency" className="btn-danger" style={{ fontSize: 16, padding: '14px 32px' }}>
              🚨 Emergency Help
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 24 }}>
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#818cf8', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p className="section-label">Core Features</p>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>
              Everything You Need When{' '}
              <span className="gradient-text">Traveling Sick</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
              A complete healthcare assistant in your pocket, designed for international travelers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 24 }}>
            {FEATURES.map(f => (
              <Link key={f.title} to={f.to} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: 28 }}>
                  <div className="feature-icon" style={{ background: `${f.color}18` }}>
                    <span style={{ fontSize: 26 }}>{f.icon}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{f.desc}</p>
                  <span style={{ color: f.color, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Learn more <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ─────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label">Global Coverage</p>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Available in Top Travel Cities</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {CITIES.map(city => (
              <Link key={city} to={`/search?city=${city}`} style={{
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 999,
                padding: '8px 20px',
                color: '#a5b4fc',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <MapPin size={12} /> {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ─────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 24 }}>
          {[
            { icon: <Shield size={24} />, color: '#6366f1', title: 'Verified Hospitals', desc: 'All hospitals are verified and regularly reviewed for quality and safety standards.' },
            { icon: <Globe size={24} />, color: '#14b8a6', title: '8 Languages', desc: 'Search in English, Hindi, Spanish, French, German, Japanese, Arabic, and Mandarin.' },
            { icon: <Heart size={24} />, color: '#ef4444', title: 'Emergency Ready', desc: 'One-tap emergency calling for ambulance, police, and medical helplines in 80+ countries.' },
          ].map(t => (
            <div key={t.title} className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ color: t.color, display: 'flex', justifyContent: 'center', marginBottom: 16 }}>{t.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{t.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(20,184,166,0.08) 100%)',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>
          Don't Wait Until You're Sick to Plan
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Set up your medical profile now and access instant help the moment you need it.
        </p>
        <Link to={user ? '/dashboard' : '/register'} className="btn-primary" style={{ fontSize: 17, padding: '16px 40px' }}>
          {user ? '🏠 Go to Dashboard' : '✈️ Start Your Journey'}
        </Link>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{
        padding: '32px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        color: '#475569',
        fontSize: 13,
      }}>
        <p>© 2024 MediGuide Travel Assist · Built for travelers, by travelers · Not a substitute for professional medical advice</p>
      </footer>
    </div>
  )
}
