import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { hospitalsAPI } from '../services/api'
import { Spinner, StarRating, EmptyState, CostCategoryBadge } from '../components/UI'
import { Search, MapPin, Filter, Clock, Phone, ChevronRight, Ambulance } from 'lucide-react'

const LANGUAGES = [
  { code: '', label: 'Any Language' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'zh', label: 'Mandarin' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ar', label: 'Arabic' },
]

export default function HospitalSearch() {
  const [searchParams] = useSearchParams()
  const [hospitals, setHospitals] = useState([])
  const [cities,    setCities]    = useState([])
  const [loading,   setLoading]   = useState(false)
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    language: '',
    emergency: false,
    sort: 'rating',
  })

  useEffect(() => {
    hospitalsAPI.getCities().then(r => setCities(r.data))
    fetchHospitals()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchHospitals()
    // eslint-disable-next-line
  }, [filters])

  const fetchHospitals = async () => {
    setLoading(true)
    try {
      const res = await hospitalsAPI.getAll(filters.city || undefined)
      let data = res.data

      if (filters.emergency)  data = data.filter(h => h.emergencyAvailable)
      if (filters.language)   data = data.filter(h =>
        h.doctors?.some(d => d.languages?.some(l =>
          l.toLowerCase().includes(filters.language === 'en' ? 'english' :
           filters.language === 'hi' ? 'hindi' :
           filters.language === 'es' ? 'spanish' :
           filters.language === 'fr' ? 'french' :
           filters.language === 'de' ? 'german' :
           filters.language === 'zh' ? 'mandarin' :
           filters.language === 'ja' ? 'japanese' : 'arabic'
          )
        ))
      )

      if (filters.sort === 'rating') data.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      else if (filters.sort === 'reviews') data.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0))

      setHospitals(data)
    } finally {
      setLoading(false)
    }
  }

  const setFilter = (k, v) => setFilters(f => ({ ...f, [k]: v }))

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">Hospital Finder</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Find <span className="gradient-text">Trusted Healthcare</span> Near You
        </h1>
        <p style={{ color: '#94a3b8' }}>Search verified hospitals, filter by language, specialty, and budget.</p>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 24, marginBottom: 32, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {/* City */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>City</label>
          <select className="input-field" value={filters.city} onChange={e => setFilter('city', e.target.value)}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Language */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Doctor Language</label>
          <select className="input-field" value={filters.language} onChange={e => setFilter('language', e.target.value)}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div style={{ flex: '1 1 160px' }}>
          <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Sort By</label>
          <select className="input-field" value={filters.sort} onChange={e => setFilter('sort', e.target.value)}>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

        {/* Emergency toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 4 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#94a3b8' }}>
            <div
              onClick={() => setFilter('emergency', !filters.emergency)}
              style={{
                width: 40, height: 22, borderRadius: 11,
                background: filters.emergency ? '#ef4444' : 'rgba(255,255,255,0.1)',
                position: 'relative', cursor: 'pointer', transition: 'all 0.2s',
                border: `1px solid ${filters.emergency ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 1, left: filters.emergency ? 20 : 1,
                transition: 'left 0.2s',
              }} />
            </div>
            🚨 Emergency Only
          </label>
        </div>
      </div>

      {/* Results */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          {loading ? 'Searching...' : `${hospitals.length} hospital${hospitals.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {loading ? <Spinner /> : hospitals.length === 0 ? (
        <EmptyState icon="🏥" title="No hospitals found"
          desc="Try adjusting your filters or searching in a different city." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {hospitals.map(h => <HospitalCard key={h.id} hospital={h} />)}
        </div>
      )}
    </div>
  )
}

function HospitalCard({ hospital: h }) {
  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {h.imageUrl && (
        <img src={h.imageUrl} alt={h.name}
          style={{ width: '100%', height: 160, objectFit: 'cover' }} />
      )}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{h.name}</h3>
          {h.emergencyAvailable && (
            <span style={{
              background: 'rgba(239,68,68,0.15)', color: '#fca5a5',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0,
            }}>24/7 ER</span>
          )}
        </div>

        <p style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <MapPin size={12} /> {h.address}
        </p>

        {h.openingHours && (
          <p style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <Clock size={12} /> {h.openingHours}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <StarRating value={h.rating || 0} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{h.rating?.toFixed(1) || 'N/A'}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>({h.totalReviews || 0} reviews)</span>
        </div>

        {h.specialties && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {h.specialties.split(',').slice(0, 3).map(s => (
              <span key={s} style={{
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                color: '#a5b4fc', borderRadius: 6, padding: '2px 8px', fontSize: 11
              }}>{s.trim()}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          <Link to={`/hospitals/${h.id}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '9px 16px', fontSize: 13 }}>
            View Details <ChevronRight size={14} />
          </Link>
          {h.phoneNumber && (
            <a href={`tel:${h.phoneNumber}`} className="btn-secondary" style={{ padding: '9px 14px', fontSize: 13 }}>
              <Phone size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
