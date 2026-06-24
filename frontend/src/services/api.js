import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: data => api.post('/auth/register', data),
  login:    data => api.post('/auth/login', data),
}

// ─── Hospitals ─────────────────────────────────────────────────────────────────
export const hospitalsAPI = {
  getAll:    (city) => api.get('/hospitals', { params: city ? { city } : {} }),
  getNearby: (lat, lng, radius = 10) => api.get('/hospitals/nearby', { params: { lat, lng, radius } }),
  getById:   id   => api.get(`/hospitals/${id}`),
  getEmergency: () => api.get('/hospitals/emergency'),
  getCities:    () => api.get('/hospitals/cities'),
}

// ─── Doctors ───────────────────────────────────────────────────────────────────
export const doctorsAPI = {
  search:  (specialty, language, hospitalId) =>
    api.get('/doctors/search', { params: { specialty, language, hospitalId } }),
  getById: id => api.get(`/doctors/${id}`),
}

// ─── Costs ─────────────────────────────────────────────────────────────────────
export const costsAPI = {
  getCosts:    (city, procedure, category) =>
    api.get('/costs', { params: { city, procedure, category } }),
  getDashboard: city => api.get('/costs/dashboard', { params: { city } }),
  getCities:    () => api.get('/costs/cities'),
  getByHospital: id => api.get(`/costs/hospital/${id}`),
}

// ─── Helplines ─────────────────────────────────────────────────────────────────
export const helplinesAPI = {
  get: (country, city) => api.get('/helplines', { params: { country, city } }),
}

// ─── Reviews ───────────────────────────────────────────────────────────────────
export const reviewsAPI = {
  getByHospital: id   => api.get(`/reviews/hospital/${id}`),
  create:        data => api.post('/reviews', data),
  delete:        id   => api.delete(`/reviews/${id}`),
}

// ─── Symptoms ──────────────────────────────────────────────────────────────────
export const symptomsAPI = {
  getAll:  () => api.get('/symptoms'),
  analyze: query => api.post('/symptoms/analyze', { query }),
}

// ─── Phrases ───────────────────────────────────────────────────────────────────
export const phrasesAPI = {
  get:    (language, category) => api.get('/phrases', { params: { language, category } }),
  search: (query, language)    => api.get('/phrases/search', { params: { query, language } }),
}

// ─── Admin ─────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
  getUsers:     () => api.get('/admin/users'),
  deleteUser:   id => api.delete(`/admin/users/${id}`),
  deleteReview: id => api.delete(`/admin/reviews/${id}`),
  addHospital:    data => api.post('/admin/hospitals', data),
  deleteHospital: id   => api.delete(`/admin/hospitals/${id}`),
}

export default api
