# 🎬 Movie Explorer

A comprehensive full-stack movie exploration application built with Django, React, MySQL, Redis, and Envoy Proxy. Browse movies, actors, directors, and genres with advanced filtering, caching, and favorites management.

## ✨ Features

- **Movie Management**: Browse, search, and filter movies by title, year, genre, director, and cast
- **Advanced Filtering**: Backend-powered filtering for movies, actors, and directors
- **Favorites System**: Save favorite movies, actors, and directors (uses local storage)
- **Smart Caching**: Redis-based caching for improved performance
- **Connection Pooling**: Envoy proxy with connection pooling and load balancing
- **Comprehensive API**: RESTful API with Swagger/OpenAPI documentation
- **Full-Text Search**: Search across movies, descriptions, and crew
- **Responsive Design**: Modern UI with Tailwind CSS
- **Docker Support**: Complete containerization with docker-compose
- **Testing**: Comprehensive unit and integration tests for both frontend and backend

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Vite + TS)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────┐
│  Envoy Proxy    │◄────►│  Connection  │
│  (Port 8000)    │      │    Pooling   │
└────────┬────────┘      └──────────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────┐
│   Django App    │◄────►│  Redis Cache │
│  (Port 8000)    │      │  (Port 6379) │
└────────┬────────┘      └──────────────┘
         │
         ↓
┌──────────────────┐
│  MySQL Database  │
│  (Port 3306)     │
└──────────────────┘
```

## 📋 Prerequisites

- Docker & Docker Compose 20.10+
- Git
- (Optional) Python 3.11+ for local development
- (Optional) Node 20+ for frontend development

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/sanjaykumardabli/Movie-Explorer.git
cd movie-explorer
```

2. **Build and start services**
```bash
docker-compose build
docker-compose up -d
```

3. **Create superuser**
```bash
docker-compose exec backend python manage.py createsuperuser
```

4. **Access the application**
- Frontend: http://localhost:5173
- API: http://localhost:8000/api/
- API Documentation: http://localhost:8000/api/docs

## 📖 API Documentation

### Movie Endpoints

**List Movies**
```
GET /api/v1/movies/
Query Parameters:
  - title: Search by title (contains)
  - release_year: Exact year
  - release_year_min/max: Year range
  - genres: Comma-separated genre IDs
  - director: Director ID
  - cast: Comma-separated actor IDs
  - rating_min/max: Rating range

Example: /api/v1/movies/?title=Inception&genres=1,2&release_year_min=2010
```

**Get Movie Detail**
```
GET /api/v1/movies/{id}/
Returns: Complete movie details with cast and crew
```

**Search Movies**
```
GET /api/movies/search/?q=Inception
Returns: Full-text search results (movies, descriptions, crew)
```

**Trending Movies**
```
GET /api/v1/movies/trending/
Returns: Top 10 movies by rating (≥7.0)
```

**Recent Movies**
```
GET /api/movies/recent/
Returns: Latest 10 released movies
```

### Actor Endpoints

**List Actors**
```
GET /api/actors/
Query Parameters:
  - name: Search by last name (contains)
  - movies: Filter by movies (actor appeared in)
  - genres: Filter by genres (actor appeared in)
```

**Get Actor Detail**
```
GET /api/v1/actors/{id}/
Returns: Actor profile with filmography
```

### Director Endpoints

**List Directors**
```
GET /api/v1/directors/
Query Parameters:
  - name: Search by last name (contains)
```

**Get Director Detail**
```
GET /api/v1/directors/{id}/
Returns: Director profile with filmography
```

### Genre Endpoints

**List Genres**
```
GET /api/v1/genres/
Returns: All genres with movie counts
```

## 🗄️ Database Schema

### Tables
- **genres**: Movie categories/genres
- **directors**: Director information
- **actors**: Actor/cast information
- **movies**: Movie catalog with metadata
- **movie_genres**: Movie-Genre many-to-many relationship
- **movie_cast**: Movie-Actor many-to-many relationship with role info

### Key Indexes
- Movies: title, release_year, director, release_date
- Actors: last_name, first_name
- Directors: last_name, first_name
- Genres: name

## ⚡ Caching Strategy

### Redis Cache Layers
1. **Movie Lists**: Cached for 1 hour with query parameters as key
2. **Movie Details**: Cached for 1 hour per movie ID
3. **Actor/Director Details**: Cached for 1 hour
4. **Genre Lists**: Cached for 24 hours

Cache invalidation happens automatically on data updates.

## 🔌 Envoy Proxy Configuration

### Connection Pooling
- **Max Connections**: 100
- **Max Pending Requests**: 100
- **Max Concurrent Streams**: 100 (HTTP/2)
- **Keepalive**: 30s interval with 5s timeout

### Load Balancing
- **Policy**: Round Robin
- **Circuit Breaker**: Enabled with 3 retries
- **Health Checks**: Every 10s with 2s timeout
- **Unhealthy Threshold**: 3 consecutive failures

## 📁 Project Structure

```
movie-explorer/
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── movies/
│   │   ├── actors/
│   │   ├── directors/
│   │   └── genres/
│   ├── migrations/
│   ├── tests/
│   ├── manage.py
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── tests/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   └── tsconfig.json
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── nginx.conf
│   └── envoy/
│       └── envoy.yaml
├── docker-compose.yml
├── .env.example
└── README.md
```