# Testing Guide

This document provides instructions for testing the TASPEF application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend API Testing](#backend-api-testing)
- [Frontend Testing](#frontend-testing)
- [Integration Testing](#integration-testing)
- [Manual Testing Checklist](#manual-testing-checklist)

## Prerequisites

1. **Ensure MongoDB is running**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend**
   ```bash
   cd client
   npm run dev
   ```

## Backend API Testing

### Using cURL

#### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

#### 2. Upload File
```bash
curl -X POST http://localhost:5000/api/files \
  -F "file=@/path/to/your/file.pdf" \
  -F "description=Test file upload" \
  -F "tags=test,sample"
```

Expected response:
```json
{
  "success": true,
  "file": {
    "_id": "507f1f77bcf86cd799439011",
    "originalName": "file.pdf",
    "url": "/api/files/507f1f77bcf86cd799439011/download",
    "size": 1048576,
    "mimeType": "application/pdf"
  }
}
```

#### 3. Get Files (Paginated)
```bash
curl http://localhost:5000/api/files?page=1&limit=12
```

Expected response:
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "originalName": "document.pdf",
      "mimeType": "application/pdf",
      "size": 1048576,
      "url": "/api/files/507f1f77bcf86cd799439011/download",
      "uploadedAt": "2024-01-15T10:30:00.000Z",
      "downloads": 0
    }
  ],
  "page": 1,
  "limit": 12,
  "totalItems": 1,
  "totalPages": 1
}
```

#### 4. Get File Metadata
```bash
curl http://localhost:5000/api/files/507f1f77bcf86cd799439011
```

#### 5. Download File
```bash
curl -O http://localhost:5000/api/files/507f1f77bcf86cd799439011/download
```

#### 6. Delete File
```bash
curl -X DELETE http://localhost:5000/api/files/507f1f77bcf86cd799439011
```

Expected response:
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

#### 7. Get File Statistics
```bash
curl http://localhost:5000/api/files/stats
```

### Using Postman

1. **Import the collection**:
   - Open Postman
   - Click "Import"
   - Paste the following JSON:

```json
{
  "info": {
    "name": "TASPEF API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/health"
      }
    },
    {
      "name": "Upload File",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/files",
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "file",
              "type": "file",
              "src": ""
            },
            {
              "key": "description",
              "value": "Test file",
              "type": "text"
            },
            {
              "key": "tags",
              "value": "test,sample",
              "type": "text"
            }
          ]
        }
      }
    },
    {
      "name": "Get Files",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/api/files?page=1&limit=12",
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "12"
            }
          ]
        }
      }
    },
    {
      "name": "Get File by ID",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/files/:id"
      }
    },
    {
      "name": "Download File",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/files/:id/download"
      }
    },
    {
      "name": "Delete File",
      "request": {
        "method": "DELETE",
        "url": "{{baseUrl}}/api/files/:id"
      }
    },
    {
      "name": "Get Statistics",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/files/stats"
      }
    }
  ]
}
```

## Frontend Testing

### Manual Browser Testing

1. **Navigate to http://localhost:5173**

2. **Test Home Page**:
   - Verify hero section displays correctly
   - Check responsive layout (resize browser)
   - Test navigation links
   - Verify footer information

3. **Test Files Page**:
   - Click "Files" in navigation
   - Verify file list loads
   - Test file upload:
     - Click "Upload File" button
     - Select a file (JPG, PNG, PDF, DOC, DOCX)
     - Verify upload progress
     - Verify file appears in list
   - Test file preview:
     - Click "Preview" on an image or PDF
     - Verify modal opens
     - Verify file displays correctly
     - Close modal
   - Test file download:
     - Click "Download" button
     - Verify file downloads
   - Test pagination:
     - Upload multiple files (>12)
     - Verify pagination controls appear
     - Click next/previous buttons
     - Verify page numbers work
   - Test file deletion:
     - Click delete button
     - Confirm deletion
     - Verify file is removed

4. **Test Responsive Design**:
   - Desktop (>1024px): Full navigation, 4-column grid
   - Tablet (768px-1024px): 3-column grid
   - Mobile (<768px): Hamburger menu, 1-column grid

5. **Test Accessibility**:
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test with screen reader (NVDA/JAWS)
   - Verify alt text on images
   - Check color contrast

### Browser Compatibility

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Integration Testing

### End-to-End Flow

1. **Upload → View → Download → Delete**:
   ```bash
   # 1. Upload a file
   curl -X POST http://localhost:5000/api/files \
     -F "file=@test.pdf"
   
   # Note the file ID from response
   
   # 2. Verify it appears in list
   curl http://localhost:5000/api/files
   
   # 3. Download the file
   curl -O http://localhost:5000/api/files/{FILE_ID}/download
   
   # 4. Delete the file
   curl -X DELETE http://localhost:5000/api/files/{FILE_ID}
   
   # 5. Verify it's gone
   curl http://localhost:5000/api/files
   ```

2. **Frontend Integration**:
   - Open browser to http://localhost:5173/files
   - Upload a file through UI
   - Verify it appears in the list
   - Preview the file
   - Download the file
   - Delete the file
   - Verify it's removed from list

## Manual Testing Checklist

### Backend API

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Health check endpoint works
- [ ] File upload works with valid files
- [ ] File upload rejects invalid file types
- [ ] File upload rejects files >10MB
- [ ] Get files returns paginated results
- [ ] Pagination works correctly
- [ ] File download works
- [ ] File deletion works
- [ ] Statistics endpoint works
- [ ] Error handling works (invalid IDs, missing files, etc.)
- [ ] CORS headers are set correctly
- [ ] Security headers (Helmet) are present

### Frontend

- [ ] Application loads without errors
- [ ] Home page displays correctly
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] Files page loads
- [ ] File list displays
- [ ] File upload works
- [ ] Upload progress indicator works
- [ ] File preview modal works (images/PDFs)
- [ ] File download works
- [ ] File deletion works
- [ ] Pagination works
- [ ] Loading states display
- [ ] Error messages display
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Accessibility features work
- [ ] Browser back/forward buttons work

### Error Scenarios

- [ ] Upload file >10MB (should show error)
- [ ] Upload invalid file type (should show error)
- [ ] Download non-existent file (should show error)
- [ ] Navigate to invalid page (should show 404)
- [ ] Server offline (should show connection error)
- [ ] MongoDB offline (server should handle gracefully)

## Performance Testing

### Load Testing

Use Apache Bench or similar tool:

```bash
# Test file list endpoint
ab -n 1000 -c 10 http://localhost:5000/api/files

# Test health check
ab -n 10000 -c 100 http://localhost:5000/health
```

### Frontend Performance

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Verify scores:
   - Performance: >90
   - Accessibility: >90
   - Best Practices: >90
   - SEO: >90

## Automated Testing (Future)

### Backend Tests (Jest + Supertest)

```javascript
// Example test structure
describe('File API', () => {
  test('POST /api/files - uploads file', async () => {
    // Test implementation
  })
  
  test('GET /api/files - returns paginated files', async () => {
    // Test implementation
  })
  
  test('GET /api/files/:id/download - downloads file', async () => {
    // Test implementation
  })
  
  test('DELETE /api/files/:id - deletes file', async () => {
    // Test implementation
  })
})
```

### Frontend Tests (React Testing Library)

```javascript
// Example test structure
describe('FileList Component', () => {
  test('renders file list', () => {
    // Test implementation
  })
  
  test('handles file upload', () => {
    // Test implementation
  })
  
  test('handles pagination', () => {
    // Test implementation
  })
})
```

## Troubleshooting

### Common Issues

1. **MongoDB connection failed**:
   - Verify MongoDB is running
   - Check MONGO_URI in .env
   - Ensure database is accessible

2. **File upload fails**:
   - Check uploads directory exists
   - Verify file permissions
   - Check file size and type

3. **CORS errors**:
   - Verify CLIENT_URL in server .env
   - Check VITE_API_BASE_URL in client .env

4. **Port already in use**:
   - Change PORT in .env
   - Kill process using the port

## Reporting Issues

When reporting issues, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information
- Console errors
- Network tab information

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing tests.

