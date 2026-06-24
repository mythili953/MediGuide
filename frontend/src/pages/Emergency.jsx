import { useEffect, useState } from 'react'
import { helplinesAPI } from '../services/api'
import { Spinner, EmptyState } from '../components/UI'
import { Phone } from 'lucide-react'

const COUNTRIES = [
  { code: 'USA', name: '🇺🇸 USA', flag: '🇺🇸' },
  { code: 'UK', name: '🇬🇧 UK', flag: '🇬🇧' },
  { code: 'Japan', name: '🇯🇵 Japan', flag: '🇯🇵' },
  { code: 'UAE', name: '🇦🇪 UAE / Dubai', flag: '🇦🇪' },
  { code: 'France', name: '🇫🇷 France', flag: '🇫🇷' },
  { code: 'India', name: '🇮🇳 India', flag: '🇮🇳' },
  { code: 'Singapore', name: '🇸🇬 Singapore', flag: '🇸🇬' },
  { code: 'Germany', name: '🇩🇪 Germany', flag: '🇩🇪' },
]

const SERVICE_CONFIG = {
  AMBULANCE:        { label: 'Ambulance', icon: '🚑', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
  POLICE:           { label: 'Police',    icon: '🚔', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)' },
  FIRE:             { label: 'Fire',      icon: '🚒', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  MEDICAL_HELPLINE: { label: 'Medical Helpline', icon: '🏥', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.25)' },
  TOURIST_HELPLINE: { label: 'Tourist Helpline', icon: '✈️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
  EMBASSY:          { label: 'Embassy',   icon: '🏛️', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)' },
}

export default function Emergency() {
  const [country,   setCountry]  = useState('USA')
  const [helplines, setHelplines]= useState([])
  const [loading,   setLoading]  = useState(false)

  useEffect(() => {
    setLoading(true)
    helplinesAPI.get(country).then(r => setHelplines(r.data)).finally(() => setLoading(false))
  }, [country])

  const byType = helplines.reduce((acc, h) => {
    acc[h.serviceType] = acc[h.serviceType] || []
    acc[h.serviceType].push(h)
    return acc
  }, {})

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1100, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(245,158,11,0.08) 100%)',
        border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20,
        padding: '32px 36px', marginBottom: 40,
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: 64 }}>🆘</div>
        <div>
          <p className="section-label" style={{ color: '#fca5a5' }}>Emergency Center</p>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: '#fca5a5' }}>
            Emergency Help Center
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            One-click access to ambulance, police, medical helplines, and tourist assistance — by country.
          </p>
        </div>
      </div>

      {/* Country Selector */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Select Your Current Country:</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {COUNTRIES.map(c => (
            <button key={c.code} onClick={() => setCountry(c.code)} style={{
              padding: '9px 20px', borderRadius: 999, border: 'none',
              background: country === c.code ? '#ef4444' : 'rgba(255,255,255,0.07)',
              color: country === c.code ? 'white' : '#94a3b8',
              fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
            }}>{c.name}</button>
          ))}
        </div>
      </div>

      {loading ? <Spinner /> : (
        <>
          {/* Quick emergency numbers at top */}
          {byType['AMBULANCE'] && (
            <div style={{ display: 'flex', gap: 14, marginBottom: 32, flexWrap: 'wrap' }}>
              {byType['AMBULANCE'].slice(0, 3).map(h => (
                <a key={h.id} href={`tel:${h.phoneNumber}`} style={{ textDecoration: 'none', flex: '1 1 200px' }}>
                  <div style={{
                    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 16, padding: '20px 24px', textAlign: 'center',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <p style={{ fontSize: 40, fontWeight: 900, color: '#fca5a5', lineHeight: 1 }}>{h.phoneNumber}</p>
                    <p style={{ color: '#fca5a5', fontWeight: 700, marginTop: 6 }}>🚑 {h.serviceName}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Tap to call</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* By service type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {Object.entries(byType).map(([type, items]) => {
              const config = SERVICE_CONFIG[type] || SERVICE_CONFIG.MEDICAL_HELPLINE
              return (
                <div key={type}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{config.icon}</span> {config.label}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                    {items.map(h => (
                      <div key={h.id} style={{
                        background: config.bg, border: `1px solid ${config.border}`,
                        borderRadius: 14, padding: '18px 20px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
                      }}>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{h.serviceName}</p>
                          {h.description && <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{h.description}</p>}
                          {h.city && <p style={{ fontSize: 12, color: '#94a3b8' }}>📍 {h.city}</p>}
                        </div>
                        <a href={`tel:${h.phoneNumber}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                          <div style={{
                            background: config.color, borderRadius: 12, padding: '10px 16px',
                            display: 'flex', alignItems: 'center', gap: 8, color: 'white',
                          }}>
                            <Phone size={16} />
                            <span style={{ fontWeight: 800, fontSize: 17 }}>{h.phoneNumber}</span>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {helplines.length === 0 && (
            <EmptyState icon="📞" title="No helplines found for this country" desc="We're adding more countries. Try USA, UK, Japan, or India." />
          )}
        </>
      )}

      <p style={{ marginTop: 48, textAlign: 'center', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
        Always save these numbers offline. MediGuide provides this data as a convenience — verify with local authorities.<br/>
        🌍 For EU countries: 112 is the universal emergency number.
      </p>
    </div>
  )
}
