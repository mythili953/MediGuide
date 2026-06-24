import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { hospitalsAPI } from '../services/api'
import { Spinner } from '../components/UI'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom colored markers
const makeIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:${color};border:3px solid white;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
})

const EMERGENCY_ICON = makeIcon('#ef4444')
const NORMAL_ICON    = makeIcon('#6366f1')

export default function MapPage() {
  const [hospitals, setHospitals] = useState([])
  const [cities,    setCities]    = useState([])
  const [city,      setCity]      = useState('')
  const [filter,    setFilter]    = useState('all')
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    hospitalsAPI.getCities().then(r => setCities(r.data))
    hospitalsAPI.getAll().then(r => { setHospitals(r.data); setLoading(false) })
  }, [])

  const filtered = hospitals.filter(h => {
    if (city && h.city !== city) return false
    if (filter === 'emergency' && !h.emergencyAvailable) return false
    return true
  })

  const center = filtered.length > 0
    ? [filtered[0].latitude, filtered[0].longitude]
    : [20, 0]

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px' }}>
      <div style={{ marginBottom: 28 }}>
        <p className="section-label">Interactive Map</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Hospital <span className="gradient-text">Map View</span>
        </h1>
        <p style={{ color: '#94a3b8' }}>Explore hospitals and clinics visually on the map.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <select className="input-field" style={{ maxWidth: 200 }} value={city} onChange={e => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ value: 'all', label: '🏥 All' }, { value: 'emergency', label: '🚨 Emergency' }].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{
              padding: '9px 18px', borderRadius: 999, border: 'none',
              background: filter === f.value ? '#6366f1' : 'rgba(255,255,255,0.07)',
              color: filter === f.value ? 'white' : '#94a3b8',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>
        <span style={{ color: '#94a3b8', fontSize: 13 }}>{filtered.length} hospitals shown</span>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 13, color: '#94a3b8' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} /> Regular Hospital
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} /> 24/7 Emergency
        </span>
      </div>

      {loading ? <Spinner /> : (
        <div className="map-container">
          <MapContainer
            center={center}
            zoom={city ? 12 : 3}
            style={{ height: '100%', width: '100%' }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {filtered.map(h => (
              <Marker
                key={h.id}
                position={[h.latitude, h.longitude]}
                icon={h.emergencyAvailable ? EMERGENCY_ICON : NORMAL_ICON}
              >
                <Popup>
                  <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 220 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{h.name}</p>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{h.address}</p>
                    {h.emergencyAvailable && (
                      <p style={{ color: '#ef4444', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🚨 24/7 Emergency</p>
                    )}
                    <p style={{ fontSize: 12, marginBottom: 10 }}>⭐ {h.rating?.toFixed(1) || 'N/A'} ({h.totalReviews || 0} reviews)</p>
                    <a href={`/hospitals/${h.id}`} style={{ color: '#6366f1', fontWeight: 600, fontSize: 13 }}>
                      View Details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* Hospital list below map */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Hospitals in View</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
          {filtered.slice(0, 9).map(h => (
            <Link key={h.id} to={`/hospitals/${h.id}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: h.emergencyAvailable ? '#ef4444' : '#6366f1',
                }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.name}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>{h.city} · {h.rating?.toFixed(1)}⭐</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
