import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home, Search, DollarSign, Languages, Phone, Map,
  User, LogOut, ShieldCheck, Menu, X, Activity
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { to: '/dashboard',  icon: Home,       label: 'Dashboard' },
  { to: '/search',     icon: Search,     label: 'Find Hospital' },
  { to: '/map',        icon: Map,        label: 'Map View' },
  { to: '/costs',      icon: DollarSign, label: 'Cost Dashboard' },
  { to: '/translate',  icon: Languages,  label: 'Translator' },
  { to: '/symptoms',   icon: Activity,   label: 'Symptoms' },
  { to: '/emergency',  icon: Phone,      label: 'Emergency' },
]

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  const isActive = (to) => location.pathname === to

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(15,17,23,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>🏥</div>
          <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#818cf8,#2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MediGuide
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hide-mobile">
          {user && NAV.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8, textDecoration: 'none',
              fontSize: 13, fontWeight: 500,
              color: isActive(to) ? '#a5b4fc' : '#94a3b8',
              background: isActive(to) ? 'rgba(99,102,241,0.12)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>
                  <ShieldCheck size={14} /> Admin
                </Link>
              )}
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: 'white'
                }}>
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>
                <LogOut size={14} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-secondary" style={{ padding: '8px 18px', fontSize: 14 }}>Login</Link>
              <Link to="/register" className="btn-primary"   style={{ padding: '8px 18px', fontSize: 14 }}>Sign Up</Link>
            </>
          )}

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'none' }} className="show-mobile">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: '#0f1117',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 24px',
        }}>
          {user && NAV.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              textDecoration: 'none', color: '#94a3b8', fontSize: 15,
            }}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
