# River Finder API Documentation

## Overview

River Finder API is a RESTful geospatial service that helps you find rivers near any geographic location. Built with Express.js and MongoDB, it uses geospatial indexing to efficiently query river data and return the nearest river to specified coordinates.

## Purpose

This API enables developers to:
- Find rivers near specific GPS coordinates
- Get distance calculations to the nearest river
- Access detailed river information including names, types, and geographic data
- Build location-based applications that need river proximity data

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 8+
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/dpok360/river-finder.git
cd river-finder-api

# Install dependencies
yarn install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB credentials

# Import river data
yarn import-geojson

# Start development server
yarn dev
```

### Your First API Call

```bash
curl "http://3.91.253.93/api/rivers/nearby?lat=27.7172&lng=85.3240&radius=5"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Bagmati River",
      "type": "river",
      "distance": 1.23,
      "coordinates": [85.3240, 27.7172]
    }
  ],
  "total": 1
}
```

## Technology Stack

### Core Technologies
- **Express.js 5.x** - Web framework
- **TypeScript 5.x** - Type-safe JavaScript
- **MongoDB 8.x** - NoSQL database with geospatial support
- **Mongoose 8.x** - MongoDB ODM

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Joi** - Request validation

### Development Tools
- **tsx** - TypeScript execution
- **Docker** - Containerization

## Documentation Sections

### 📚 [API Reference](./api-reference.md)
Complete endpoint documentation with parameters, responses, and examples.

### 🗄️ [Data Models](./data-models.md)
Schema definitions and data structure documentation.

### ⚙️ [Setup Guide](./setup-guide.md)
Detailed installation, configuration, and database setup instructions.

### 🏗️ [Architecture](./architecture.md)
System design, component interactions, and request flow.

### 🚀 [Deployment](./deployment.md)
Production deployment guides and best practices.

### 💡 [Examples](./examples/)
Code samples and integration patterns for various languages.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rivers/nearby` | Find the nearest river to given coordinates |

## Support

For issues, questions, or contributions, please refer to the repository's issue tracker.

## License

[Add your license information here]

## Version

Current Version: 1.0.0
