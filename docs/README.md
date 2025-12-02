# API Reference

## Overview

The River Finder API provides a RESTful interface for querying geospatial river data. All endpoints return JSON responses and use standard HTTP status codes.

## Base URL

**Production:**
```
http://3.91.253.93
```

**Local Development:**
```
http://localhost:3000
```

---

## Endpoints

### Get Nearby Rivers

Find the nearest river to specified geographic coordinates.

**Endpoint:** `GET /api/rivers/nearby`

**Description:** Returns the nearest river within a specified radius of the given latitude and longitude coordinates. Uses MongoDB's geospatial indexing for efficient proximity queries.

#### Request Parameters

All parameters are passed as query string parameters.

| Parameter | Type | Required | Constraints | Default | Description |
|-----------|------|----------|-------------|---------|-------------|
| `lat` | number | Yes | -90 to 90 | - | Latitude coordinate in decimal degrees |
| `lng` | number | Yes | -180 to 180 | - | Longitude coordinate in decimal degrees |
| `radius` | number | No | 0 to 100 | 10 | Search radius in kilometers |

#### Validation Rules

The API validates all input parameters and returns detailed error messages for invalid requests:

- **Latitude (`lat`)**
    - Must be a valid number
    - Must be between -90 and 90 (inclusive)
    - Error message: "Latitude must be between -90 and 90"

- **Longitude (`lng`)**
    - Must be a valid number
    - Must be between -180 and 180 (inclusive)
    - Error message: "Longitude must be between -180 and 180"

- **Radius (`radius`)**
    - Must be a valid number
    - Must be greater than 0
    - Cannot exceed 100 kilometers
    - Error message: "Radius must be greater than 0" or "Radius cannot exceed 100 kilometers"

#### Response Format

##### Success Response (200 OK)

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

**Response Fields:**

- `success` (boolean): Indicates if the request was successful
- `data` (array): Array of river objects (limited to 1 result - the nearest river)
    - `id` (string): Unique identifier for the river
    - `name` (string): Name of the river
    - `type` (string): Type of waterway (e.g., "river", "stream")
    - `distance` (number): Distance from query coordinates in kilometers (rounded to 2 decimal places)
    - `coordinates` (array): [longitude, latitude] of the river location
- `total` (number): Number of rivers returned

##### Error Response - Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": "Invalid coordinates provided",
  "message": "Latitude must be between -90 and 90"
}
```

##### Error Response - Not Found (404 Not Found)

```json
{
  "success": false,
  "error": "Not found",
  "message": "Route /api/invalid-route not found"
}
```

##### Error Response - Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to fetch nearby rivers"
}
```

#### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - River data returned |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Invalid endpoint |
| 500 | Internal Server Error - Server-side error |

---

## Example Requests

### Example 1: Bagmati River, Kathmandu

Find rivers near central Kathmandu, Nepal.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=27.7172&lng=85.3240&radius=5"
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

### Example 2: Bishnumati River, West Kathmandu

Find rivers in western Kathmandu with a smaller search radius.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=27.7125&lng=85.3000&radius=3"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Bishnumati River",
      "type": "river",
      "distance": 0.85,
      "coordinates": [85.3000, 27.7125]
    }
  ],
  "total": 1
}
```

### Example 3: Manohara River, East Kathmandu

Find rivers in eastern Kathmandu using default radius.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=27.7000&lng=85.3600"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "name": "Manohara River",
      "type": "river",
      "distance": 2.47,
      "coordinates": [85.3600, 27.7000]
    }
  ],
  "total": 1
}
```

### Example 4: Invalid Latitude

Request with invalid latitude value.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=95&lng=85.3240&radius=5"
```

**Response:**
```json
{
  "success": false,
  "error": "Invalid coordinates provided",
  "message": "Latitude must be between -90 and 90"
}
```

### Example 5: Missing Required Parameter

Request without required longitude parameter.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=27.7172&radius=5"
```

**Response:**
```json
{
  "success": false,
  "error": "Invalid coordinates provided",
  "message": "Longitude is required"
}
```

### Example 6: Radius Exceeds Maximum

Request with radius larger than allowed maximum.

**Request:**
```bash
curl "http://localhost:3000/api/rivers/nearby?lat=27.7172&lng=85.3240&radius=150"
```

**Response:**
```json
{
  "success": false,
  "error": "Invalid coordinates provided",
  "message": "Radius cannot exceed 100 kilometers"
}
```

---

## Rate Limiting

Currently, the API does not implement rate limiting. For production deployments, consider implementing rate limiting based on your usage requirements.

## CORS

The API is configured with CORS enabled, allowing requests from any origin. For production deployments, configure CORS to allow only trusted domains.

## Security

The API uses Helmet.js to set secure HTTP headers. All requests should be made over HTTPS in production environments.
