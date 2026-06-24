import { useEffect, useState } from 'react'
import { phrasesAPI } from '../services/api'
import { Spinner, EmptyState } from '../components/UI'
import { Copy, Volume2, Search } from 'lucide-react'

const LANGUAGES = [
  { code: 'es', name: '🇪🇸 Spanish' },
  { code: 'fr', name: '🇫🇷 French' },
  { code: 'hi', name: '🇮🇳 Hindi' },
  { code: 'ja', name: '🇯🇵 Japanese' },
  { code: 'ar', name: '🇸🇦 Arabic' },
  { code: 'de', name: '🇩🇪 German' },
  { code: 'zh', name: '🇨🇳 Mandarin' },
  { code: 'pt', name: '🇵🇹 Portuguese' },
]

const CATEGORIES = ['All', 'Emergency', 'Symptoms', 'Allergies', 'Conditions', 'Medications', 'General']

export default function Translator() {
  const [lang,     setLang]     = useState('es')
  const [category, setCategory] = useState('')
  const [phrases,  setPhrases]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [search,   setSearch]   = useState('')
  const [copied,   setCopied]   = useState(null)

  useEffect(() => {
    fetchPhrases()
    // eslint-disable-next-line
  }, [lang, category])

  const fetchPhrases = async () => {
    setLoading(true)
    try {
      const res = await phrasesAPI.get(lang, category || undefined)
      setPhrases(res.data)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async e => {
    e.preventDefault()
    if (!search.trim()) return fetchPhrases()
    setLoading(true)
    try {
      const res = await phrasesAPI.search(search, lang)
      setPhrases(res.data)
    } finally {
      setLoading(false)
    }
  }

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const speak = (text, langCode) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = langCode
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1100, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">Medical Translator</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Multilingual <span className="gradient-text">Healthcare Phrases</span>
        </h1>
        <p style={{ color: '#94a3b8' }}>Instantly translate essential medical phrases — with phonetics and audio playback.</p>
      </div>

      {/* Language Selector */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Translate To:</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              padding: '8px 18px', borderRadius: 999, border: 'none',
              background: lang === l.code ? '#6366f1' : 'rgba(255,255,255,0.07)',
              color: lang === l.code ? 'white' : '#94a3b8',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}>{l.name}</button>
          ))}
        </div>
      </div>

      {/* Search + Category Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <form onSubmit={handleSearch} style={{ flex: 2, display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input className="input-field" placeholder="Search phrases (e.g. allergic, diabetes...)"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 40 }} />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '10px 20px', flexShrink: 0 }}>
            Search
          </button>
        </form>
        <select className="input-field" style={{ flex: 1, minWidth: 150 }}
          value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c === 'All' ? '' : c}>{c}</option>)}
        </select>
      </div>

      {/* Emergency Banner */}
      <div style={{
        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 12, padding: '14px 20px', marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#fca5a5',
      }}>
        <span style={{ fontSize: 20 }}>⚠️</span>
        <span>For life-threatening emergencies, always call the local emergency number (911, 999, 119, etc.) directly.</span>
      </div>

      {/* Phrases Grid */}
      {loading ? <Spinner /> : phrases.length === 0 ? (
        <EmptyState icon="🗣️" title="No phrases found"
          desc="Try a different language or search term." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(380px,1fr))', gap: 20 }}>
          {phrases.map(p => (
            <div key={p.id} className="glass-card" style={{ padding: 22 }}>
              {/* Category badge */}
              {p.category && (
                <span style={{
                  background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                  borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.05em', display: 'inline-block', marginBottom: 12,
                }}>{p.category.toUpperCase()}</span>
              )}

              {/* English */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>🇬🇧 English</p>
                <p style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>{p.englishText}</p>
              </div>

              {/* Translated */}
              <div style={{
                background: 'rgba(99,102,241,0.06)', borderRadius: 10, padding: '14px 16px', marginBottom: 14,
              }}>
                <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>🌍 {p.languageName}</p>
                <p style={{ fontWeight: 700, fontSize: 17, color: '#e2e8f0', lineHeight: 1.4 }}>{p.translatedText}</p>
                {p.phonetic && (
                  <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, fontStyle: 'italic' }}>
                    📢 {p.phonetic}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => copyText(p.translatedText, p.id)}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: 13 }}>
                  <Copy size={14} />
                  {copied === p.id ? '✅ Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => speak(p.translatedText, lang)}
                  className="btn-teal"
                  style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: 13 }}>
                  <Volume2 size={14} /> Play Audio
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: 40, textAlign: 'center', fontSize: 13, color: '#475569' }}>
        Translations are provided for communication assistance only. Always seek professional medical interpretation for critical situations.
      </p>
    </div>
  )
}
