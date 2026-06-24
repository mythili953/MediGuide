import { useState } from 'react'
import { Star } from 'lucide-react'

export function StarRating({ value, max = 5 }) {
  const full  = Math.floor(value)
  const half  = value - full >= 0.5
  const empty = max - full - (half ? 1 : 0)

  return (
    <span className="stars" title={`${value} / ${max}`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  )
}

export function UrgencyBadge({ level }) {
  const classes = {
    EMERGENCY: 'badge-emergency',
    URGENT: 'badge-urgent',
    NON_URGENT: 'badge-non-urgent',
  }
  const labels = {
    EMERGENCY: '🚨 Emergency',
    URGENT: '⚠️ Urgent',
    NON_URGENT: '✅ Non-Urgent',
  }
  return <span className={classes[level] || 'badge-non-urgent'}>{labels[level] || level}</span>
}

export function Spinner({ size = 32 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{
        width: size, height: size,
        border: '3px solid rgba(99,102,241,0.3)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast ${type}`} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto', fontSize: 18 }}>×</button>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState(null)
  const show = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }
  return { toast, show }
}

export function EmptyState({ icon = '🔍', title, desc }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>{title}</h3>
      {desc && <p style={{ fontSize: 14, maxWidth: 360, margin: '0 auto' }}>{desc}</p>}
    </div>
  )
}

export function CostCategoryBadge({ category }) {
  const config = {
    BUDGET:   { color: '#6ee7b7', bg: 'rgba(16,185,129,0.12)', label: '💰 Budget' },
    MODERATE: { color: '#fcd34d', bg: 'rgba(245,158,11,0.12)', label: '💵 Moderate' },
    PREMIUM:  { color: '#c4b5fd', bg: 'rgba(139,92,246,0.12)', label: '💎 Premium' },
  }
  const c = config[category] || config.MODERATE
  return (
    <span style={{
      background: c.bg, color: c.color,
      border: `1px solid ${c.color}30`,
      borderRadius: 999, padding: '2px 10px', fontSize: 12, fontWeight: 600
    }}>{c.label}</span>
  )
}

export function PageHeader({ label, title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {label && <p className="section-label">{label}</p>}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{title}</h1>
      {subtitle && <p style={{ color: '#94a3b8', fontSize: 16 }}>{subtitle}</p>}
      {children}
    </div>
  )
}
