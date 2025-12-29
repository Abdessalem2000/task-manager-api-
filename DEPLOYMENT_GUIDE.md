# Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your user password)

### Step 2: Deploy to Render
1. Go to [Render](https://render.com)
2. Sign up and click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: saas-analytics-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
6. Click "Create Web Service"

### Step 3: Get Backend URL
After deployment, copy your backend URL (e.g., `https://saas-analytics-api.onrender.com`)

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Environment
1. In the frontend folder, create `.env` file:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
2. Replace with your actual backend URL from Render

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up and click "New Project"
3. Connect your GitHub repository
4. Select the `task-manager-frontend` folder
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `task-manager-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL
7. Click "Deploy"

---

## Alternative: Netlify Deployment

### Step 1: Build Frontend
```bash
cd task-manager-frontend
npm run build
```

### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop the `dist` folder
3. Add environment variable: `VITE_API_URL`

---

## Post-Deployment Checklist

1. **Test Backend**: Visit `https://your-backend.onrender.com/test`
2. **Test Frontend**: Visit your Vercel/Netlify URL
3. **Test CRUD Operations**:
   - Add a new task
   - Delete a task
   - Verify real-time updates
4. **Check Mobile**: Test on your phone browser

---

## Troubleshooting

### Common Issues:
- **CORS Errors**: Ensure backend allows your frontend domain
- **MongoDB Connection**: Verify connection string and IP whitelist
- **Environment Variables**: Double-check all env vars are set
- **Build Errors**: Check console logs for specific errors

### Debug Tips:
- Check Render logs for backend issues
- Check Vercel/Netlify logs for frontend issues
- Use browser DevTools to inspect API calls

---

## URLs After Deployment

- **Backend**: `https://your-app-name.onrender.com`
- **Frontend**: `https://your-app-name.vercel.app` or `.netlify.app`

Your dashboard will be accessible from anywhere, including your phone!
