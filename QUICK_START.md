# Quick Start Guide

Get TASPEF up and running in 5 minutes! 🚀

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm 9+ installed (`npm --version`)
- ✅ MongoDB installed and running (`mongod --version`)

## Step-by-Step Setup

### 1️⃣ Clone and Install (2 minutes)

```bash
# Clone the repository
git clone <repository-url>
cd taspef-monorepo

# Install all dependencies
npm run install:all
```

### 2️⃣ Configure Environment (1 minute)

**Backend Configuration:**
```bash
# Navigate to server directory
cd server

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taspef
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
CLIENT_URL=http://localhost:5173
EOF

cd ..
```

**Frontend Configuration:**
```bash
# Navigate to client directory
cd client

# Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
EOF

cd ..
```

### 3️⃣ Start MongoDB (30 seconds)

```bash
# Start MongoDB (in a new terminal)
mongod

# Or if using MongoDB as a service
# sudo service mongod start  # Linux
# brew services start mongodb-community  # macOS
```

### 4️⃣ Run the Application (30 seconds)

```bash
# Run both frontend and backend concurrently
npm run dev
```

**That's it!** 🎉

## Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## First Steps

### 1. Verify Everything Works

Open http://localhost:5173 in your browser. You should see the TASPEF home page.

### 2. Test File Upload

1. Click "Files" in the navigation
2. Click "Upload File" button
3. Select a file (image, PDF, or document)
4. Watch the upload progress
5. See your file in the list!

### 3. Test File Operations

- **Preview**: Click "Preview" on an image or PDF
- **Download**: Click "Download" to save the file
- **Delete**: Click the delete icon to remove a file

## Quick API Test

Test the API with cURL:

```bash
# Health check
curl http://localhost:5000/health

# Get files
curl http://localhost:5000/api/files

# Upload a file
curl -X POST http://localhost:5000/api/files \
  -F "file=@/path/to/your/file.pdf"
```

## Troubleshooting

### Port Already in Use

```bash
# Change ports in .env files
# Server: PORT=5001
# Client: Update vite.config.js server.port
```

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod

# Or check MongoDB service status
systemctl status mongod  # Linux
brew services list  # macOS
```

### Dependencies Installation Failed

```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm cache clean --force
npm run install:all
```

### CORS Errors

Ensure `CLIENT_URL` in `server/.env` matches your frontend URL:
```env
CLIENT_URL=http://localhost:5173
```

## Next Steps

### Explore the Documentation

- 📖 [README.md](README.md) - Full documentation
- 🧪 [TESTING.md](TESTING.md) - Testing guide
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

### Customize the Application

1. **Update Branding**: Edit colors in `client/tailwind.config.js`
2. **Add Pages**: Create new components in `client/src/pages/`
3. **Extend API**: Add routes in `server/src/routes/`
4. **Modify Database**: Update models in `server/src/models/`

### Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions to:
- Vercel (Frontend)
- Railway (Backend)
- MongoDB Atlas (Database)

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Changes reflect immediately
- Backend: Nodemon restarts server on changes

### View Logs

```bash
# Frontend logs: Check browser console
# Backend logs: Check terminal where server is running
```

### Database GUI

Use MongoDB Compass to view your database:
```bash
# Connection string
mongodb://localhost:27017/taspef
```

## Common Commands

```bash
# Install dependencies
npm run install:all

# Run both (recommended)
npm run dev

# Run frontend only
npm run dev:client

# Run backend only
npm run dev:server

# Build frontend for production
npm run build:client

# Start backend in production mode
npm run start:server

# Clean all node_modules
npm run clean
```

## Need Help?

- 📧 Email: info@taspef.org
- 🐛 Issues: Create an issue on GitHub
- 💬 Discussions: Check GitHub Discussions

## Success Checklist

- [ ] Dependencies installed successfully
- [ ] MongoDB running
- [ ] Environment variables configured
- [ ] Frontend accessible at http://localhost:5173
- [ ] Backend accessible at http://localhost:5000
- [ ] File upload works
- [ ] File download works
- [ ] Pagination works

If all items are checked, you're ready to develop! 🎉

---

**Estimated Setup Time**: 5 minutes

**Difficulty**: Beginner-friendly

**Support**: Available via GitHub Issues

