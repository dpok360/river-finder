# River Finder API

A RESTful API service for querying geospatial river data. Find the nearest river to any geographic coordinates using MongoDB's powerful geospatial indexing capabilities.

## Overview

The River Finder API provides a simple interface to query river locations based on latitude/longitude coordinates. It uses MongoDB's 2dsphere indexes for efficient proximity searches and returns the nearest river within a specified radius.

## Features

- **Geospatial Queries**: Find nearest rivers using latitude/longitude coordinates
- **Configurable Search Radius**: Search within 0-100 kilometers
- **Input Validation**: Comprehensive validation with detailed error messages
- **RESTful Design**: Standard HTTP methods and status codes
- **Security**: Helmet.js for secure HTTP headers, CORS enabled
- **Docker Support**: Easy deployment with Docker Compose
- **MongoDB Integration**: Efficient geospatial indexing with Mongoose

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5
- **Database**: MongoDB 8 with Mongoose ODM
- **Validation**: Joi
- **Security**: Helmet.js, CORS
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+ or Docker
- MongoDB 8+ (or use Docker Compose)
- Yarn or npm

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/dpok360/river-finder.git
cd river-finder
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
DB_USERNAME=your_username
DB_PASSWORD=your_password
MONGO_DB=river_finder
PORT=3000
```

4. Start the services:
```bash
docker-compose up -d
```

The API will be available at `http://localhost:80`

### Local Development

1. Install dependencies:
```bash
yarn install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Configure MongoDB connection in `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/river_finder
PORT=3000
```

4. Start MongoDB (if not using Docker)

5. Run development server:
```bash
yarn dev
```

The API will be available at `http://localhost:3000`

## Data Import

To import river data from GeoJSON:

```bash
yarn import-geojson
```

This script parses GeoJSON files and imports river data into MongoDB with proper geospatial indexing.

## API Usage

### Find Nearby Rivers

**Endpoint**: `GET /api/rivers/nearby`

**Query Parameters**:
- `lat` (required): Latitude (-90 to 90)
- `lng` (required): Longitude (-180 to 180)
- `radius` (optional): Search radius in kilometers (0-100, default: 10)

**Example Request**:
```bash
# Local
curl "http://localhost:3000/api/rivers/nearby?lat=27.7172&lng=85.3240&radius=5"

# Production
curl "http://3.91.253.93/api/rivers/nearby?lat=27.7172&lng=80.3240&radius=1"
```

**Example Response**:
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

For complete API documentation, see:
- [API Reference](docs/README.md)
- [Postman Documentation](https://documenter.getpostman.com/view/33442960/2sB3dMwAw2)

## Project Structure

```
.
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── index.ts               # Server entry point
│   ├── config/
│   │   ├── constants.ts       # Application constants
│   │   └── database.ts        # MongoDB connection
│   ├── controllers/
│   │   └── riverController.ts # River query logic
│   ├── middleware/
│   │   ├── errorHandler.ts    # Error handling middleware
│   │   └── validateRequest.ts # Request validation
│   ├── models/
│   │   └── River.ts           # River Mongoose model
│   ├── routes/
│   │   └── riverRoutes.ts     # API routes
│   ├── scripts/
│   │   └── parseGeoJson.ts    # GeoJSON import script
│   └── types.ts               # TypeScript type definitions
├── docs/
│   └── README.md              # API documentation
├── data/                      # MongoDB data directory
├── docker-compose.yml         # Docker services configuration
├── Dockerfile                 # API container definition
└── package.json               # Dependencies and scripts
```

## Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn import-geojson` - Import river data from GeoJSON

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `DB_USERNAME` | MongoDB username (Docker) | - |
| `DB_PASSWORD` | MongoDB password (Docker) | - |
| `MONGO_DB` | Database name (Docker) | river_finder |
| `NODE_ENV` | Environment (development/production) | - |

## Error Handling

The API provides detailed error responses:

- **400 Bad Request**: Invalid parameters
- **404 Not Found**: Invalid endpoint
- **500 Internal Server Error**: Server-side errors

All errors follow this format:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Security

- **Helmet.js**: Sets secure HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Joi schema validation for all inputs
- **Error Handling**: Graceful error handling without exposing internals

## Production Deployment

The API is production-ready with:
- Graceful shutdown handling (SIGTERM)
- Uncaught exception handling
- Unhandled rejection handling
- Docker containerization
- Environment-based configuration

**Live API**: [http://3.91.253.93/api/rivers/nearby](http://3.91.253.93/api/rivers/nearby?lat=27.7172&lng=80.3240&radius=1)

**Try it now**:
```bash
curl "http://3.91.253.93/api/rivers/nearby?lat=27.7172&lng=80.3240&radius=1"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Add your license here]

## Links

- **Repository**: [github.com/dpok360/river-finder](https://github.com/dpok360/river-finder)
- **Live API**: [http://3.91.253.93/api/rivers/nearby](http://3.91.253.93/api/rivers/nearby?lat=27.7172&lng=80.3240&radius=1)
- **Postman Docs**: [API Documentation](https://documenter.getpostman.com/view/33442960/2sB3dMwAw2)

## Support

For issues and questions, please open an issue in the [GitHub repository](https://github.com/dpok360/river-finder/issues).
