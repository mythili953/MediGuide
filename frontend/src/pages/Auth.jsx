import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, Globe } from 'lucide-react'
import { Toast, useToast } from '../components/UI'

function AuthPage({ mode }) {
  const { login, register } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const { toast, show } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPw,  setShowPw]  = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({
    name: '', email: '', password: '', nationality: '', preferredLanguage: 'en'
  })

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
        navigate(from, { replace: true })
      } else {
        await register(form)
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      show(err.response?.data?.message || 'Authentication failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), var(--surface-dark)',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px',
          }}>🏥</div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ color: '#94a3b8', marginTop: 8, fontSize: 15 }}>
            {mode === 'login'
              ? 'Sign in to access your medical travel assistant'
              : 'Start navigating healthcare globally'}
          </p>
        </div>

        <div className="glass-card" style={{ padding: 32 }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {mode === 'register' && (
              <div>
                <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input name="name" className="input-field" placeholder="Jane Traveler"
                    value={form.name} onChange={onChange} required
                    style={{ paddingLeft: 40 }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input name="email" type="email" className="input-field" placeholder="jane@example.com"
                  value={form.email} onChange={onChange} required
                  style={{ paddingLeft: 40 }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input name="password" type={showPw ? 'text' : 'password'} className="input-field"
                  placeholder="Minimum 8 characters"
                  value={form.password} onChange={onChange} required minLength={8}
                  style={{ paddingLeft: 40, paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Nationality</label>
                  <div style={{ position: 'relative' }}>
                    <Globe size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input name="nationality" className="input-field" placeholder="e.g. American, Indian, British"
                      value={form.nationality} onChange={onChange}
                      style={{ paddingLeft: 40 }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Preferred Language</label>
                  <select name="preferredLanguage" className="input-field"
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
              </>
            )}

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Please wait...' : mode === 'login' ? '🔐 Sign In' : '🚀 Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#94a3b8' }}>
            {mode === 'login' ? (
              <>Don't have an account? <Link to="/register" style={{ color: '#818cf8', fontWeight: 600 }}>Sign up</Link></>
            ) : (
              <>Already have an account? <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>Sign in</Link></>
            )}
          </div>

          {/* Demo credentials */}
          <div style={{
            marginTop: 20, padding: '12px 16px', borderRadius: 10,
            background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)',
            fontSize: 12, color: '#5eead4',
          }}>
            <strong>Demo:</strong> jane@example.com / Demo@1234 &nbsp;|&nbsp;
            <strong>Admin:</strong> admin@mediguide.com / Admin@1234
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}
    </div>
  )
}

export function LoginPage()    { return <AuthPage mode="login" /> }
export function RegisterPage() { return <AuthPage mode="register" /> }
