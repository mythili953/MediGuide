import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { hospitalsAPI, reviewsAPI } from '../services/api'
import { Spinner, StarRating, EmptyState, CostCategoryBadge, Toast, useToast } from '../components/UI'
import { useAuth } from '../context/AuthContext'
import { MapPin, Phone, Clock, Globe, Star, DollarSign, User, ChevronLeft } from 'lucide-react'

export default function HospitalDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { toast, show } = useToast()
  const [hospital, setHospital] = useState(null)
  const [reviews,  setReviews]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [tab,      setTab]      = useState('overview')
  const [review,   setReview]   = useState({ rating: 5, languageRating: 5, affordabilityRating: 5, waitTimeMinutes: '', reviewText: '' })

  useEffect(() => {
    Promise.all([
      hospitalsAPI.getById(id).then(r => setHospital(r.data)),
      reviewsAPI.getByHospital(id).then(r => setReviews(r.data)),
    ]).finally(() => setLoading(false))
  }, [id])

  const submitReview = async e => {
    e.preventDefault()
    try {
      const res = await reviewsAPI.create({ ...review, hospitalId: Number(id) })
      setReviews(prev => [res.data, ...prev])
      show('Review submitted! Thank you.', 'success')
      setReview({ rating: 5, languageRating: 5, affordabilityRating: 5, waitTimeMinutes: '', reviewText: '' })
    } catch (err) {
      show(err.response?.data?.message || 'Failed to submit review', 'error')
    }
  }

  if (loading) return <div style={{ paddingTop: 80 }}><Spinner /></div>
  if (!hospital) return <EmptyState icon="🏥" title="Hospital not found" />

  const h = hospital
  const TABS = ['overview', 'doctors', 'costs', 'reviews']

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1100, margin: '0 auto', padding: '80px 24px 60px' }}>
      <Link to="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#94a3b8', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
        <ChevronLeft size={16} /> Back to Search
      </Link>

      {/* Hero */}
      <div className="glass-card" style={{ overflow: 'hidden', marginBottom: 32 }}>
        {h.imageUrl && (
          <img src={h.imageUrl} alt={h.name}
            style={{ width: '100%', height: 260, objectFit: 'cover' }} />
        )}
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{h.name}</h1>
              <p style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} /> {h.address}, {h.city}, {h.country}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {h.emergencyAvailable && (
                <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: 13 }}>
                  🚨 24/7 Emergency
                </span>
              )}
              {h.phoneNumber && (
                <a href={`tel:${h.phoneNumber}`} className="btn-teal" style={{ padding: '8px 18px', fontSize: 14 }}>
                  <Phone size={15} /> Call
                </a>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StarRating value={h.rating || 0} />
              <span style={{ fontWeight: 700 }}>{h.rating?.toFixed(1) || 'N/A'}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>({h.totalReviews || 0} reviews)</span>
            </div>
            {h.openingHours && (
              <span style={{ color: '#94a3b8', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} /> {h.openingHours}
              </span>
            )}
            {h.hospitalType && (
              <span style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', borderRadius: 6, padding: '3px 10px', fontSize: 13 }}>
                {h.hospitalType}
              </span>
            )}
            {h.bedCount && (
              <span style={{ color: '#94a3b8', fontSize: 13 }}>🛏️ {h.bedCount} beds</span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', border: 'none', borderRadius: 8,
            background: tab === t ? '#6366f1' : 'transparent',
            color: tab === t ? 'white' : '#94a3b8',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize',
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          {h.specialties && (
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#a5b4fc' }}>Specialties</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {h.specialties.split(',').map(s => (
                  <span key={s} style={{
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    color: '#a5b4fc', borderRadius: 8, padding: '5px 12px', fontSize: 13
                  }}>{s.trim()}</span>
                ))}
              </div>
            </div>
          )}
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#a5b4fc' }}>Contact & Hours</h3>
            {h.phoneNumber && <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>📞 {h.phoneNumber}</p>}
            {h.email && <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>✉️ {h.email}</p>}
            {h.website && <a href={`https://${h.website}`} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: '#818cf8' }}>🌐 {h.website}</a>}
            {h.openingHours && <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>⏰ {h.openingHours}</p>}
          </div>
        </div>
      )}

      {/* Doctors */}
      {tab === 'doctors' && (
        <div>
          {h.doctors?.length === 0 ? <EmptyState icon="👨‍⚕️" title="No doctors listed yet" /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
              {h.doctors?.map(d => (
                <div key={d.id} className="glass-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12,
                      background: 'linear-gradient(135deg, #6366f1, #14b8a6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                    }}>👨‍⚕️</div>
                    <div>
                      <p style={{ fontWeight: 700, marginBottom: 4 }}>{d.name}</p>
                      <p style={{ color: '#a5b4fc', fontSize: 13 }}>{d.specialty}</p>
                      {d.qualification && <p style={{ color: '#94a3b8', fontSize: 12 }}>{d.qualification}</p>}
                    </div>
                  </div>
                  {d.bio && <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>{d.bio}</p>}
                  <div style={{ display: 'flex', gap: 12, fontSize: 13, flexWrap: 'wrap' }}>
                    {d.experienceYears && <span style={{ color: '#6ee7b7' }}>🏅 {d.experienceYears} yrs exp</span>}
                    {d.consultationFee && <span style={{ color: '#fcd34d' }}>💰 {d.consultationFee}</span>}
                  </div>
                  {d.languages?.length > 0 && (
                    <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {d.languages.map(l => (
                        <span key={l} style={{ background: 'rgba(20,184,166,0.1)', color: '#5eead4', borderRadius: 6, padding: '2px 8px', fontSize: 11 }}>
                          🗣️ {l}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Costs */}
      {tab === 'costs' && (
        <div>
          {h.costs?.length === 0 ? <EmptyState icon="💰" title="No cost data available" /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {h.costs?.map(c => (
                <div key={c.id} className="glass-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h4 style={{ fontWeight: 600, fontSize: 15 }}>{c.procedureName}</h4>
                    <CostCategoryBadge category={c.category} />
                  </div>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#34d399', marginBottom: 4 }}>
                    {c.estimatedCost.toLocaleString()} <span style={{ fontSize: 14, fontWeight: 400, color: '#94a3b8' }}>{c.currency}</span>
                  </p>
                  {c.notes && <p style={{ fontSize: 12, color: '#94a3b8' }}>{c.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews */}
      {tab === 'reviews' && (
        <div>
          {/* Submit Review */}
          {user && (
            <div className="glass-card" style={{ padding: 24, marginBottom: 28 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Write a Review</h3>
              <form onSubmit={submitReview} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
                  {[
                    { key: 'rating', label: 'Overall Rating' },
                    { key: 'languageRating', label: 'Language Support' },
                    { key: 'affordabilityRating', label: 'Affordability' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{label}</label>
                      <select className="input-field" value={review[key]}
                        onChange={e => setReview(r => ({ ...r, [key]: Number(e.target.value) }))}>
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)} ({n}/5)</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Wait Time (minutes)</label>
                    <input className="input-field" type="number" min="1" placeholder="e.g. 30"
                      value={review.waitTimeMinutes}
                      onChange={e => setReview(r => ({ ...r, waitTimeMinutes: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Your Experience</label>
                  <textarea className="input-field" rows={3} placeholder="Share your experience..."
                    value={review.reviewText}
                    onChange={e => setReview(r => ({ ...r, reviewText: e.target.value }))}
                    style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  ⭐ Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Review List */}
          {reviews.length === 0 ? <EmptyState icon="💬" title="No reviews yet" desc="Be the first to review this hospital." /> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {reviews.map(r => (
                <div key={r.id} className="glass-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        {r.userName?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{r.userName}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8' }}>{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <StarRating value={r.rating} /> <span style={{ fontSize: 13, fontWeight: 600 }}>{r.rating}/5</span>
                      </span>
                      {r.languageRating && <span style={{ fontSize: 12, color: '#5eead4' }}>🗣️ Lang: {r.languageRating}/5</span>}
                      {r.affordabilityRating && <span style={{ fontSize: 12, color: '#fcd34d' }}>💰 Cost: {r.affordabilityRating}/5</span>}
                      {r.waitTimeMinutes && <span style={{ fontSize: 12, color: '#94a3b8' }}>⏱️ {r.waitTimeMinutes} min wait</span>}
                    </div>
                  </div>
                  {r.reviewText && <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>{r.reviewText}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => {}} />}
    </div>
  )
}
