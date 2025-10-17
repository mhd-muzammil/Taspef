# Deployment Guide

This guide provides instructions for deploying the TASPEF application to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [CI/CD Pipeline](#cicd-pipeline)

## Prerequisites

- Node.js >= 18.0.0
- MongoDB database (local or cloud)
- Git repository
- Hosting accounts (Vercel, Railway, Render, etc.)

## Environment Variables

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taspef?retryWrites=true&w=majority
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd client
   vercel --prod
   ```

4. **Configure Environment Variables**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add `VITE_API_BASE_URL`

5. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure Environment Variables**:
   - Go to Netlify Dashboard
   - Site settings → Environment variables
   - Add `VITE_API_BASE_URL`

### Option 3: GitHub Pages

1. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   })
   ```

2. **Build and deploy**:
   ```bash
   cd client
   npm run build
   
   # Deploy to gh-pages branch
   git subtree push --prefix client/dist origin gh-pages
   ```

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize project**:
   ```bash
   cd server
   railway init
   ```

4. **Add environment variables**:
   ```bash
   railway variables set NODE_ENV=production
   railway variables set MONGO_URI=your-mongodb-uri
   railway variables set CLIENT_URL=your-frontend-url
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

### Option 2: Render

1. **Create `render.yaml`** in server directory:
   ```yaml
   services:
     - type: web
       name: taspef-api
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: MONGO_URI
           sync: false
         - key: CLIENT_URL
           sync: false
   ```

2. **Connect GitHub repository**:
   - Go to Render Dashboard
   - New → Web Service
   - Connect your repository
   - Select `server` directory
   - Add environment variables

3. **Deploy**:
   - Render will automatically deploy on push

### Option 3: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create app**:
   ```bash
   cd server
   heroku create taspef-api
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your-mongodb-uri
   heroku config:set CLIENT_URL=your-frontend-url
   ```

5. **Create `Procfile`**:
   ```
   web: node src/index.js
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create account**: https://www.mongodb.com/cloud/atlas

2. **Create cluster**:
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create database user**:
   - Database Access → Add New Database User
   - Choose authentication method
   - Set username and password
   - Grant read/write permissions

4. **Whitelist IP addresses**:
   - Network Access → Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for production
   - Or add specific IPs

5. **Get connection string**:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `taspef`

6. **Update environment variables**:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taspef?retryWrites=true&w=majority
   ```

## Docker Deployment

### Create Dockerfiles

#### Backend Dockerfile
```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
# client/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
# client/nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Docker Compose

```yaml
# docker-compose.yml
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

  backend:
    build: ./server
    container_name: taspef-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/taspef
      - PORT=5000
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - mongodb
    volumes:
      - ./server/uploads:/app/uploads

  frontend:
    build: ./client
    container_name: taspef-frontend
    restart: always
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=http://localhost:5000/api
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### Deploy with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./client
        run: npm ci
      
      - name: Build
        working-directory: ./client
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./client

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: taspef-api
```

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] File uploads working
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Domain configured
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Backup strategy in place
- [ ] Performance monitoring enabled
- [ ] Security headers configured
- [ ] API rate limiting enabled (if needed)

## Monitoring

### Recommended Tools

1. **Error Tracking**: Sentry
2. **Performance Monitoring**: New Relic, DataDog
3. **Uptime Monitoring**: UptimeRobot, Pingdom
4. **Log Management**: Logtail, Papertrail

### Health Checks

Set up monitoring for:
- Backend: `https://your-api.com/health`
- Frontend: `https://your-app.com`
- Database: Connection status

## Backup Strategy

### Database Backups

```bash
# Manual backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/taspef" --out=./backup

# Restore
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/taspef" ./backup/taspef
```

### Automated Backups

- MongoDB Atlas: Enable automated backups in cluster settings
- Set retention period (7-30 days)
- Test restore process regularly

### File Backups

- Use cloud storage (AWS S3, Google Cloud Storage)
- Implement regular backup scripts
- Store backups in multiple locations

## Scaling

### Horizontal Scaling

- Use load balancers (Nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session management
- Implement caching (Redis, Memcached)

### Vertical Scaling

- Upgrade server resources (CPU, RAM)
- Optimize database queries
- Implement database indexing
- Use CDN for static assets

## Security

### Production Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] File upload restrictions enforced
- [ ] CORS properly configured
- [ ] Security headers set (Helmet)
- [ ] Dependencies updated
- [ ] Vulnerability scanning enabled

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version, dependencies
2. **Database connection fails**: Verify connection string, IP whitelist
3. **CORS errors**: Check CLIENT_URL environment variable
4. **File uploads fail**: Verify upload directory permissions
5. **High memory usage**: Implement file streaming, optimize queries

## Support

For deployment issues:
- Check logs in hosting platform
- Review error messages
- Consult platform documentation
- Contact support team

## Rollback Strategy

If deployment fails:

1. **Immediate rollback**:
   ```bash
   # Vercel
   vercel rollback
   
   # Railway
   railway rollback
   ```

2. **Manual rollback**:
   - Revert to previous Git commit
   - Redeploy previous version

3. **Database rollback**:
   - Restore from backup
   - Run migration rollback scripts

