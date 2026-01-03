# ✅ Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment Setup

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster
- [ ] Get connection string
- [ ] Configure network access (allow from anywhere or specific IPs)
- [ ] Test connection string locally

### 2. Code Preparation
- [ ] Update frontend API URL to use environment variable ✅
- [ ] Update backend CORS configuration ✅
- [ ] Create `.gitignore` file ✅
- [ ] Create `Procfile` for backend ✅
- [ ] Test locally with production-like settings

### 3. Environment Variables
- [ ] Backend: `MONGO_URI` (MongoDB Atlas connection string)
- [ ] Backend: `FRONTEND_URL` (your deployed frontend URL)
- [ ] Frontend: `VITE_API_URL` (your deployed backend URL)

### 4. Git Repository
- [ ] Initialize git repository
- [ ] Add all files
- [ ] Commit changes
- [ ] Push to GitHub

## Deployment Steps

### Backend Deployment
- [ ] Choose deployment platform (Render/Railway/Heroku)
- [ ] Connect GitHub repository
- [ ] Set environment variables:
  - [ ] `MONGO_URI`
  - [ ] `FRONTEND_URL` (set after frontend is deployed)
- [ ] Deploy backend
- [ ] Copy backend URL
- [ ] Test backend endpoint (should return contacts or empty array)

### Frontend Deployment
- [ ] Choose deployment platform (Vercel/Netlify)
- [ ] Connect GitHub repository
- [ ] Set root directory to `my-project`
- [ ] Set environment variable: `VITE_API_URL` (your backend URL)
- [ ] Deploy frontend
- [ ] Copy frontend URL

### Final Configuration
- [ ] Update backend `FRONTEND_URL` environment variable with frontend URL
- [ ] Redeploy backend (to apply CORS changes)
- [ ] Test complete application

## Post-Deployment Testing

- [ ] Visit frontend URL
- [ ] Test adding a new contact
- [ ] Test viewing contacts
- [ ] Test deleting a contact
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Check deployment platform logs for errors

## Troubleshooting

If something doesn't work:
1. Check environment variables are set correctly
2. Check CORS configuration
3. Check MongoDB Atlas network access
4. Check deployment platform logs
5. Verify API URLs are correct (no trailing slashes)

## Quick Reference

### Environment Variables Template

**Backend (.env):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contact_manager
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.onrender.com/api/contacts
```

### Important URLs to Save
- Backend URL: _______________________
- Frontend URL: _______________________
- MongoDB Atlas Dashboard: _______________________

