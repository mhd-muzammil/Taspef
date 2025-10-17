# TASPEF - Tamil Nadu Association of Senior Professionals of Environment and Forests

A full-stack web application for managing TASPEF's digital presence, including e-magazines, AGM reports, member directories, and file management.

## 🏗️ Architecture

This is a monorepo containing:
- **`/client`** - React + Vite + Tailwind CSS frontend
- **`/server`** - Node.js + Express + MongoDB backend

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taspef-monorepo
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**

   Create `.env` files in both `/client` and `/server` directories:

   **`/server/.env`**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taspef
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **`/client/.env`**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**

   **Option A: Run both concurrently (recommended for development)**
   ```bash
   npm run dev
   ```

   **Option B: Run separately**
   ```bash
   # Terminal 1 - Backend
   npm run dev:server

   # Terminal 2 - Frontend
   npm run dev:client
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
taspef-monorepo/
├── client/                    # React frontend
│   ├── public/
│   │   └── assets/           # Static assets (images, icons)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── FileCard.jsx
│   │   │   ├── FileList.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Files.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useFetchFiles.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   └── db.js
│   │   ├── models/           # Mongoose models
│   │   │   └── File.js
│   │   ├── controllers/      # Route controllers
│   │   │   └── fileController.js
│   │   ├── routes/           # API routes
│   │   │   └── files.js
│   │   ├── middleware/       # Custom middleware
│   │   │   └── upload.js
│   │   └── index.js          # Entry point
│   ├── uploads/              # File storage directory
│   ├── .env.example
│   └── package.json
│
├── CHANGELOG.md              # Project decisions and changes
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🔌 API Endpoints

### File Management

#### Upload File
```bash
POST /api/files
Content-Type: multipart/form-data

curl -X POST http://localhost:5000/api/files \
  -F "file=@/path/to/your/file.pdf"

Response:
{
  "success": true,
  "file": {
    "_id": "507f1f77bcf86cd799439011",
    "originalName": "file.pdf",
    "url": "/api/files/507f1f77bcf86cd799439011/download"
  }
}
```

#### Get Files (Paginated)
```bash
GET /api/files?page=1&limit=12

curl http://localhost:5000/api/files?page=1&limit=12

Response:
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "originalName": "document.pdf",
      "mimeType": "application/pdf",
      "size": 1048576,
      "url": "/api/files/507f1f77bcf86cd799439011/download",
      "uploadedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "page": 1,
  "limit": 12,
  "totalItems": 50,
  "totalPages": 5
}
```

#### Download File
```bash
GET /api/files/:id/download

curl -O http://localhost:5000/api/files/507f1f77bcf86cd799439011/download
```

#### Delete File
```bash
DELETE /api/files/:id

curl -X DELETE http://localhost:5000/api/files/507f1f77bcf86cd799439011

Response:
{
  "success": true,
  "message": "File deleted successfully"
}
```

## 🎨 Design & Styling

The frontend is built to match the Figma design with:
- **Responsive breakpoints**: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)
- **Color palette**: Extracted from Figma design tokens
- **Typography**: System fonts with fallbacks (see CHANGELOG.md for font decisions)
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA attributes, and keyboard navigation

### Tailwind Configuration

Custom colors and spacing extracted from Figma:
- Primary: `#2D5016` (Forest Green)
- Secondary: `#8B4513` (Earth Brown)
- Accent: `#FFD700` (Gold)
- Background: `#F5F5DC` (Beige)

## 🧪 Testing

### Backend Testing with Postman

Import the following collection:

```json
{
  "info": {
    "name": "TASPEF API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
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
              "src": "/path/to/file"
            }
          ]
        }
      }
    },
    {
      "name": "Get Files",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/files?page=1&limit=12"
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    }
  ]
}
```

### Frontend Testing

```bash
cd client
npm run test
```

## 🐳 Docker (Optional)

Create `docker-compose.yml` in the root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: taspef-mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: taspef

  server:
    build: ./server
    container_name: taspef-server
    restart: always
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/taspef
      - PORT=5000
    depends_on:
      - mongodb
    volumes:
      - ./server/uploads:/app/uploads

  client:
    build: ./client
    container_name: taspef-client
    restart: always
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=http://localhost:5000/api
    depends_on:
      - server

volumes:
  mongodb_data:
```

Run with Docker:
```bash
docker-compose up -d
```

## 📝 Known Deviations from Figma

See `CHANGELOG.md` for detailed decisions. Summary:

1. **Fonts**: Using system font stack instead of custom fonts to avoid licensing issues
2. **Complex animations**: Simplified to CSS transitions for performance
3. **Image optimization**: Implemented lazy loading and responsive images
4. **File size limits**: Set to 10MB (configurable via environment variable)

## 🔒 Security

- CORS configured for client origin only
- Helmet.js for security headers
- File type validation (whitelist approach)
- File size limits enforced
- Filename sanitization to prevent path traversal
- MongoDB injection protection via Mongoose

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)

```bash
cd server
# Set environment variables in your hosting platform
# Deploy with npm start
```

### MongoDB (MongoDB Atlas)

Update `MONGO_URI` in server `.env` to your Atlas connection string.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

- TASPEF Team
- Powered by Skiez Technologies India Private Limited

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

