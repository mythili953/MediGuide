# MediGuide Travel Assist 🏥✈️

> **Healthcare Navigation Platform for International Travelers**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)](https://spring.io/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Java](https://img.shields.io/badge/Java-21-orange)](https://openjdk.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)](https://docker.com/)

---

## 🌍 What is MediGuide?

MediGuide Travel Assist is a production-ready full-stack healthcare navigation platform that helps international travelers:

- 🏥 **Find trusted hospitals** by city, language, specialty, and budget
- 💰 **See transparent costs** (consultation, emergency, MRI, blood tests)
- 🗣️ **Translate medical phrases** into 8 languages with audio playback
- 🩺 **Triage symptoms** with urgency classification
- 📞 **Access emergency helplines** with one-tap calling
- 🗺️ **View hospitals on an interactive map**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 21, Spring Boot 3.2, Spring Security + JWT |
| Database | PostgreSQL 16, Spring Data JPA, Hibernate |
| Frontend | React 18, Vite, Tailwind CSS v4 |
| Maps | Leaflet + OpenStreetMap |
| Charts | Chart.js + react-chartjs-2 |
| Auth | JWT Bearer tokens + BCrypt |
| API Docs | SpringDoc OpenAPI 3 (Swagger) |
| Deploy | Docker + Docker Compose |

---

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 20+
- Docker + Docker Compose
- Maven 3.9+

### Option A — Docker Compose (Recommended)

```bash
# Clone or navigate to project
cd mediguide-travel-assist

# Build and start all services
docker-compose up --build

# App will be available at:
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
# Swagger:  http://localhost:8080/swagger-ui.html
```

### Option B — Local Development

**Backend:**
```bash
cd backend

# 1. Start PostgreSQL (or use local installation)
docker run -d \
  --name mediguide-postgres \
  -e POSTGRES_DB=mediguide_db \
  -e POSTGRES_USER=mediguide_user \
  -e POSTGRES_PASSWORD=mediguide_pass \
  -p 5432:5432 \
  postgres:16-alpine

# 2. Run Spring Boot
mvn spring-boot:run
# → Backend at http://localhost:8080
# → Swagger at http://localhost:8080/swagger-ui.html
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# → Frontend at http://localhost:3000
```

---

## 📁 Project Structure

```
mediguide-travel-assist/
├── backend/
│   ├── src/main/java/com/mediguide/
│   │   ├── config/         # Security, OpenAPI
│   │   ├── controller/     # REST Controllers (Auth, Hospitals, Doctors, Costs, Helplines, Reviews, Symptoms, Phrases, Admin)
│   │   ├── dto/            # Request/Response DTOs
│   │   ├── entity/         # JPA Entities (User, Hospital, Doctor, Language, TreatmentCost, Review, Helpline, Symptom, MedicalPhrase)
│   │   ├── exception/      # Global Exception Handler
│   │   ├── repository/     # Spring Data JPA Repos
│   │   ├── security/       # JWT Provider + Filter
│   │   └── service/        # Business Logic
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── data.sql        # Seed data (21 hospitals, 21 doctors, 60+ costs, 30+ helplines, 15 symptoms, 40+ phrases)
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, UI, ProtectedRoute
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # 9 full pages
│   │   ├── services/       # Axios API layer
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

---

## 🔑 Default Credentials

| Role | Email | Password |
|---|---|---|
| User | `jane@example.com` | `Demo@1234` |
| Admin | `admin@mediguide.com` | `Admin@1234` |

> ⚠️ Change these in production!

---

## 📡 REST API Reference

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login (returns JWT token)
```

### Hospitals
```
GET  /api/hospitals                    # All hospitals (optional ?city=)
GET  /api/hospitals/nearby?lat=&lng=&radius=   # Geospatial search
GET  /api/hospitals/emergency          # 24/7 emergency hospitals
GET  /api/hospitals/cities             # Available cities
GET  /api/hospitals/{id}               # Hospital detail (includes doctors + costs)
```

### Doctors
```
GET  /api/doctors/search?specialty=&language=&hospitalId=
GET  /api/doctors/{id}
GET  /api/doctors/hospital/{hospitalId}
```

### Costs
```
GET  /api/costs?city=&procedure=&category=    # Filtered costs
GET  /api/costs/dashboard?city=               # Analytics dashboard
GET  /api/costs/cities                        # All cities with data
GET  /api/costs/hospital/{id}                 # Hospital-specific costs
```

### Helplines
```
GET  /api/helplines?country=&city=     # Emergency helplines by location
```

### Symptoms
```
GET  /api/symptoms                     # All symptoms
POST /api/symptoms/analyze             # Triage analysis {"query": "chest pain"}
```

### Medical Phrases
```
GET  /api/phrases?language=es&category=Emergency    # Translated phrases
GET  /api/phrases/search?query=allergy&language=fr  # Search phrases
```

### Reviews
```
GET  /api/reviews/hospital/{id}        # Get hospital reviews
POST /api/reviews                      # Submit review (auth required)
DELETE /api/reviews/{id}               # Delete review (auth required)
```

### Admin
```
GET  /api/admin/analytics              # Platform metrics
GET  /api/admin/users                  # All users
DELETE /api/admin/users/{id}           # Delete user
DELETE /api/admin/reviews/{id}         # Moderate review
```

**Swagger UI:** `http://localhost:8080/swagger-ui.html`

---

## 🌐 Frontend Pages

| Page | URL | Access |
|---|---|---|
| Landing | `/` | Public |
| Register | `/register` | Public |
| Login | `/login` | Public |
| Dashboard | `/dashboard` | Auth required |
| Hospital Search | `/search` | Public |
| Hospital Detail | `/hospitals/:id` | Public |
| Map View | `/map` | Public |
| Cost Dashboard | `/costs` | Public |
| Medical Translator | `/translate` | Public |
| Symptoms Triage | `/symptoms` | Public |
| Emergency Center | `/emergency` | Public |
| Profile | `/profile` | Auth required |
| Admin Dashboard | `/admin` | Admin only |

---

## 🗺️ Sample Data Coverage

| City | Country | Hospitals |
|---|---|---|
| New York | USA | 3 |
| London | UK | 3 |
| Tokyo | Japan | 3 |
| Dubai | UAE | 3 |
| Paris | France | 2 |
| Mumbai | India | 3 |
| Singapore | Singapore | 2 |
| Berlin | Germany | 2 |

**Languages supported:** English, Hindi, Spanish, French, German, Mandarin, Japanese, Arabic

---

## 🔒 Security

- JWT Bearer token authentication (24h expiry)
- BCrypt password hashing (strength 10)
- CORS configured per environment
- Role-based access control (USER / ADMIN)
- Input validation on all endpoints
- Global exception handler with structured error responses

---

## 🐳 Docker Configuration

```yaml
# Start all services
docker-compose up --build

# Rebuild just backend
docker-compose up --build backend

# Stop all
docker-compose down

# Full reset (removes DB data)
docker-compose down -v
```

---

## ⚙️ Environment Configuration

Edit `backend/src/main/resources/application.yml` or pass environment variables:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/mediguide_db
SPRING_DATASOURCE_USERNAME=mediguide_user
SPRING_DATASOURCE_PASSWORD=mediguide_pass
APP_JWT_SECRET=your-256-bit-secret
APP_JWT_EXPIRATION=86400000
```

For production, set `spring.jpa.hibernate.ddl-auto: validate` and use Flyway migrations.

---

## 🔮 Future Roadmap

- [ ] Google OAuth 2.0 login
- [ ] Real-time ambulance tracking (WebSocket)
- [ ] Offline emergency information (PWA + Service Worker)
- [ ] Insurance provider integration
- [ ] Telemedicine appointment booking
- [ ] QR Emergency Medical Profile
- [ ] AI-powered symptom triage (LLM integration)
- [ ] Travel health risk alerts by destination

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

> ⚠️ **Medical Disclaimer:** MediGuide Travel Assist provides healthcare navigation information only. It does not provide medical diagnosis or advice. Always consult qualified healthcare professionals. For emergencies, contact local emergency services immediately.
