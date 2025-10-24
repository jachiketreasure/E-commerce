# Environment Variables for Live Deployment

## Backend (.env in backend directory)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_please_change_this_in_production
PORT=8000
```

## Frontend (.env in root directory)
```
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Important Notes:

### 1. MongoDB Atlas Setup:
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Get your connection string
- Replace `username`, `password`, and `cluster` in MONGO_URI

### 2. Backend Hosting:
- Deploy backend to platforms like:
  - **Railway**: railway.app
  - **Render**: render.com
  - **Heroku**: heroku.com
  - **DigitalOcean**: digitalocean.com

### 3. Frontend Hosting:
- Deploy frontend to:
  - **Netlify**: netlify.com
  - **Vercel**: vercel.com
  - **GitHub Pages**: pages.github.com

### 4. CORS Configuration:
Update the CORS origins in `backend/server.js` with your actual domains:
```javascript
origin: [
  "https://your-frontend-domain.com",
  "https://your-app.netlify.app"
]
```

### 5. Environment Variables in Production:
- **Backend**: Set environment variables in your hosting platform
- **Frontend**: Set VITE_API_BASE_URL to your backend URL
