import { useEffect, useState } from 'react'
import { symptomsAPI } from '../services/api'
import { Spinner, UrgencyBadge, EmptyState } from '../components/UI'
import { Search, AlertTriangle } from 'lucide-react'

export default function Symptoms() {
  const [all,      setAll]      = useState([])
  const [results,  setResults]  = useState(null)
  const [query,    setQuery]    = useState('')
  const [loading,  setLoading]  = useState(true)
  const [analyzing,setAnalyzing]= useState(false)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    symptomsAPI.getAll().then(r => setAll(r.data)).finally(() => setLoading(false))
  }, [])

  const analyze = async e => {
    e.preventDefault()
    if (!query.trim()) return
    setAnalyzing(true)
    try {
      const res = await symptomsAPI.analyze(query)
      setAnalysis(res.data)
      setResults(res.data.results)
    } finally {
      setAnalyzing(false)
    }
  }

  const urgencyConfig = {
    EMERGENCY: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '🚨', color: '#fca5a5' },
    URGENT:    { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚠️', color: '#fcd34d' },
    NON_URGENT:{ bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '✅', color: '#6ee7b7' },
  }

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1000, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">Symptom Assistant</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Understand Your <span className="gradient-text">Symptoms</span>
        </h1>
        <p style={{ color: '#94a3b8' }}>
          Describe your symptoms and get urgency classification and specialist recommendations.
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 12, padding: '14px 20px', marginBottom: 28,
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <AlertTriangle size={20} style={{ color: '#fcd34d', flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 13, color: '#fcd34d', lineHeight: 1.6 }}>
          <strong>Medical Disclaimer:</strong> This tool does not provide medical diagnosis.
          For life-threatening emergencies, contact local emergency services immediately (911, 999, 119, etc.).
          Always consult a qualified healthcare professional.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={analyze} style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input className="input-field" placeholder="Describe your symptoms... (e.g. chest pain, fever, difficulty breathing)"
              value={query} onChange={e => setQuery(e.target.value)}
              style={{ paddingLeft: 46, paddingRight: 16, fontSize: 16, height: 52 }} />
          </div>
          <button type="submit" className="btn-primary" disabled={analyzing}
            style={{ padding: '14px 28px', fontSize: 15, flexShrink: 0 }}>
            {analyzing ? '⏳ Analyzing...' : '🔍 Analyze'}
          </button>
        </div>

        {/* Quick pills */}
        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Chest pain', 'High fever', 'Food poisoning', 'Difficulty breathing', 'Fracture', 'Allergic reaction', 'Back pain'].map(s => (
            <button key={s} type="button" onClick={() => setQuery(s)} style={{
              padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)',
              background: 'none', color: '#94a3b8', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
            }}>{s}</button>
          ))}
        </div>
      </form>

      {/* Analysis Result */}
      {analysis && results !== null && (
        <div style={{ marginBottom: 40 }}>
          <div style={{
            ...urgencyConfig[analysis.topUrgency],
            borderRadius: 16, padding: '20px 24px', marginBottom: 20, border: '1px solid',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{urgencyConfig[analysis.topUrgency]?.icon}</span>
              <div>
                <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Urgency Assessment</p>
                <UrgencyBadge level={analysis.topUrgency} />
              </div>
              <div style={{ marginLeft: 24 }}>
                <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Recommended Specialist</p>
                <p style={{ fontWeight: 700, fontSize: 16, color: urgencyConfig[analysis.topUrgency]?.color }}>
                  {analysis.recommendedSpecialty}
                </p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>{analysis.disclaimer}</p>
          </div>

          {results.length === 0 ? (
            <EmptyState icon="🔍" title="No matching symptoms found"
              desc="Try describing your symptoms differently or browse the list below." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {results.map(s => (
                <SymptomCard key={s.id} symptom={s} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Symptoms */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
          {analysis ? 'All Known Symptoms' : 'Browse Symptoms'}
        </h2>
        {loading ? <Spinner /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {all.map(s => <SymptomCard key={s.id} symptom={s} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function SymptomCard({ symptom: s }) {
  const [expanded, setExpanded] = useState(false)
  const colors = {
    EMERGENCY: { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)', accent: '#fca5a5' },
    URGENT:    { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)', accent: '#fcd34d' },
    NON_URGENT:{ bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', accent: '#6ee7b7' },
  }
  const c = colors[s.urgencyLevel] || colors.NON_URGENT

  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{s.name}</h3>
          <UrgencyBadge level={s.urgencyLevel} />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: c.accent, fontWeight: 600 }}>→ {s.recommendedSpecialty}</span>
          <button onClick={() => setExpanded(e => !e)} style={{
            background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18,
          }}>{expanded ? '▲' : '▼'}</button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {s.description && (
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{s.description}</p>
          )}
          {s.firstAidTip && (
            <div style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{ fontSize: 12, color: '#a5b4fc', fontWeight: 700, marginBottom: 6 }}>🩹 FIRST AID TIP</p>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{s.firstAidTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
