# MedAura AI - API Documentation

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: Configure based on your deployment

## Authentication

Currently, the API does not require authentication. For production, implement API key or JWT authentication.

## Endpoints

### Health Check

```http
GET /
```

**Response:**
```json
{
  "message": "MedAuraAI API",
  "version": "1.0.0"
}
```

---

### Create Case

Creates a new medical case and starts AI agent analysis in the background.

```http
POST /api/cases
Content-Type: application/json
```

**Request Body:**
```json
{
  "patientId": "P12345",
  "name": "John Doe",
  "age": 45,
  "gender": "Male",
  "chiefComplaint": "Persistent abdominal pain for 2 weeks",
  "familyHistory": "Father had colon cancer",
  "personalHistory": "No previous surgeries",
  "lifestyle": "Non-smoker, occasional alcohol",
  "medications": "Ibuprofen as needed",
  "colonoscopy": "Not performed",
  "stoolStudies": "Normal",
  "bloodTests": "CBC normal, CRP slightly elevated",
  "vitals": "BP 120/80, HR 72, Temp 98.6F",
  "abdominalExam": "Mild tenderness in lower right quadrant"
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "patientId": "P12345",
  "name": "John Doe",
  "age": 45,
  "gender": "Male",
  "chiefComplaint": "Persistent abdominal pain for 2 weeks",
  "status": "Queued",
  "createdAt": "2026-01-09T12:00:00.000Z",
  "updatedAt": "2026-01-09T12:00:00.000Z",
  "agentResults": null
}
```

**Status Codes:**
- `200` - Case created successfully
- `422` - Validation error

---

### List Cases

Retrieves all cases, optionally filtered by status.

```http
GET /api/cases?status={status}
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter by status: `Queued`, `Running`, `Completed`, `Error`, or `all` |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid-1",
      "patientId": "P12345",
      "name": "John Doe",
      "status": "Completed",
      "createdAt": "2026-01-09T12:00:00.000Z",
      ...
    }
  ],
  "total": 1
}
```

---

### Get Case

Retrieves a specific case by ID.

```http
GET /api/cases/{case_id}
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| case_id | string | Yes | UUID of the case |

**Response (Completed):**
```json
{
  "id": "uuid-string",
  "patientId": "P12345",
  "name": "John Doe",
  "status": "Completed",
  "agentResults": {
    "specialists": {
      "Internist": { ... },
      "Neurologist": { ... },
      "Cardiologist": { ... },
      "Gastroenterologist": { ... },
      "Psychiatrist": { ... }
    },
    "teamSummary": {
      "diagnosis": "...",
      "confidence": 85,
      "recommendations": [ ... ]
    },
    "treatmentOptions": [ ... ]
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Case not found

---

### Rerun Agents

Reruns all AI agents for an existing case.

```http
POST /api/cases/{case_id}/rerun
```

**Response:**
```json
{
  "message": "Agents rerun initiated",
  "case_id": "uuid-string"
}
```

---

### Parse PDF Report

Uploads and parses a PDF medical report using AI.

```http
POST /api/cases/parse-report
Content-Type: multipart/form-data
```

**Request:**
- `file`: PDF file (required)

**Response:**
```json
{
  "patientId": "P12345",
  "name": "John Doe",
  "age": 45,
  "gender": "Male",
  "chiefComplaint": "...",
  "familyHistory": "...",
  "personalHistory": "...",
  "lifestyle": "...",
  "medications": "...",
  "colonoscopy": "...",
  "stoolStudies": "...",
  "bloodTests": "...",
  "vitals": "...",
  "abdominalExam": "..."
}
```

**Status Codes:**
- `200` - Parsed successfully
- `400` - Invalid file or empty PDF
- `500` - Processing error

---

## Case Status Values

| Status | Description |
|--------|-------------|
| `Queued` | Case created, waiting for processing |
| `Running` | AI agents are analyzing the case |
| `Completed` | Analysis complete, results available |
| `Error` | An error occurred during processing |

## Error Responses

```json
{
  "detail": "Error message describing what went wrong"
}
```

## Interactive Documentation

When running the server, interactive API docs are available:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
