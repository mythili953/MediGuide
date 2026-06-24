import { useEffect, useState } from 'react'
import { costsAPI } from '../services/api'
import { Spinner, CostCategoryBadge } from '../components/UI'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const CHART_COLORS = ['#6366f1','#14b8a6','#f59e0b','#ef4444','#10b981','#ec4899','#8b5cf6','#06b6d4']

export default function CostDashboard() {
  const [cities,    setCities]    = useState([])
  const [city,      setCity]      = useState('')
  const [dashboard, setDashboard] = useState(null)
  const [costs,     setCosts]     = useState([])
  const [loading,   setLoading]   = useState(false)
  const [tab,       setTab]       = useState('bar')

  useEffect(() => {
    costsAPI.getCities().then(r => {
      setCities(r.data)
      if (r.data.length > 0) setCity(r.data[0])
    })
  }, [])

  useEffect(() => {
    if (!city) return
    setLoading(true)
    Promise.all([
      costsAPI.getDashboard(city).then(r => setDashboard(r.data)),
      costsAPI.getCosts(city).then(r => setCosts(r.data)),
    ]).finally(() => setLoading(false))
  }, [city])

  const barData = dashboard ? {
    labels: Object.keys(dashboard.averageCosts),
    datasets: [{
      label: `Average Cost (${city})`,
      data: Object.values(dashboard.averageCosts),
      backgroundColor: CHART_COLORS,
      borderRadius: 6,
      borderWidth: 0,
    }]
  } : null

  const doughnutData = dashboard ? {
    labels: Object.keys(dashboard.averageCosts).slice(0, 5),
    datasets: [{
      data: Object.values(dashboard.averageCosts).slice(0, 5),
      backgroundColor: CHART_COLORS.slice(0, 5),
      borderWidth: 2,
      borderColor: '#1a1d2e',
    }]
  } : null

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y?.toLocaleString() || ctx.parsed} (avg cost)`
        }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
    },
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right', labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, padding: 16 } },
    },
  }

  const KEY_METRICS = dashboard ? [
    { label: 'Avg Consultation', value: dashboard.averageConsultationCost, icon: '🩺', color: '#6366f1' },
    { label: 'Avg Emergency',    value: dashboard.averageEmergencyCost,    icon: '🚨', color: '#ef4444' },
    { label: 'Avg MRI Scan',     value: dashboard.averageMriCost,          icon: '🔬', color: '#14b8a6' },
    { label: 'Avg Blood Test',   value: dashboard.averageBloodTestCost,    icon: '🩸', color: '#f59e0b' },
  ] : []

  return (
    <div className="page-enter" style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">Cost Transparency</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Healthcare <span className="gradient-text">Cost Dashboard</span>
        </h1>
        <p style={{ color: '#94a3b8' }}>Compare average medical costs across cities before you travel.</p>
      </div>

      {/* City selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: '#94a3b8', fontSize: 14 }}>Select City:</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cities.map(c => (
            <button key={c} onClick={() => setCity(c)} style={{
              padding: '7px 18px', borderRadius: 999, border: 'none',
              background: city === c ? '#6366f1' : 'rgba(255,255,255,0.07)',
              color: city === c ? 'white' : '#94a3b8',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {loading ? <Spinner /> : (
        <>
          {/* Key metrics */}
          {dashboard && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
              {KEY_METRICS.map(m => (
                <div key={m.label} className="stat-card">
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{m.icon}</div>
                  <p style={{ fontSize: 28, fontWeight: 800, color: m.color }}>
                    {m.value > 0 ? m.value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}
                  </p>
                  <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{m.label}</p>
                  <p style={{ fontSize: 11, color: '#475569' }}>{dashboard.currency} (est. avg)</p>
                </div>
              ))}
            </div>
          )}

          {/* Chart */}
          {dashboard && barData && (
            <div className="glass-card" style={{ padding: 28, marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Average Costs by Procedure — {city}</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['bar', 'doughnut'].map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{
                      padding: '5px 14px', borderRadius: 8, border: 'none',
                      background: tab === t ? '#6366f1' : 'rgba(255,255,255,0.07)',
                      color: tab === t ? 'white' : '#94a3b8',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>{t === 'bar' ? '📊 Bar' : '🍩 Donut'}</button>
                  ))}
                </div>
              </div>
              <div style={{ height: 340 }}>
                {tab === 'bar' && <Bar data={barData} options={{ ...chartOptions, maintainAspectRatio: false }} />}
                {tab === 'doughnut' && <Doughnut data={doughnutData} options={{ ...doughnutOptions, maintainAspectRatio: false }} />}
              </div>
            </div>
          )}

          {/* Cost table */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Detailed Cost Breakdown</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Procedure', 'Hospital', 'Category', 'Estimated Cost', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costs.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, fontSize: 14 }}>{c.procedureName}</td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8', fontSize: 13 }}>{c.hospitalName}</td>
                      <td style={{ padding: '12px 14px' }}><CostCategoryBadge category={c.category} /></td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#34d399', fontSize: 16 }}>
                        {c.estimatedCost.toLocaleString()} <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 400 }}>{c.currency}</span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8', fontSize: 12 }}>{c.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
