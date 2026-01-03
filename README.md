# Contact Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing contacts.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory (optional):
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/contact_manager
   PORT=5000
   ```
   
   **Note:** If you don't create a `.env` file, the app will use the default MongoDB URI: `mongodb://127.0.0.1:27017/contact_manager`

4. Make sure MongoDB is running on your system:
   - **Local MongoDB**: Start MongoDB service
   - **MongoDB Atlas**: Update `MONGO_URI` in `.env` with your Atlas connection string

5. Start the backend server:
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Running the Application

### Option 1: Run in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd my-project
npm run dev
```

### Option 2: Run Both with npm-run-all (Optional)

If you want to run both servers with one command, you can install `npm-run-all` in the root directory:

```bash
npm install -D npm-run-all
```

Then add this script to root `package.json`:
```json
"scripts": {
  "dev": "npm-run-all --parallel dev:*",
  "dev:backend": "cd backend && npm run dev",
  "dev:frontend": "cd my-project && npm run dev"
}
```

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

### Frontend
- React
- Vite
- Axios
- Tailwind CSS
- React Icons

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running locally or your Atlas connection string is correct.

2. **Port Already in Use**: Change the PORT in backend `.env` file or kill the process using the port.

3. **CORS Errors**: The backend has CORS enabled, but if you still see errors, check that the frontend URL matches the CORS configuration.

4. **Dependencies Not Found**: Run `npm install` in both `backend` and `my-project` directories.

## 🚀 Deployment

Ready to deploy your application? We have comprehensive deployment guides:

- **[Quick Deployment Guide](QUICK_DEPLOY.md)** - Fastest way to get your app live (recommended for first-time deployment)
- **[Complete Deployment Guide](DEPLOYMENT_GUIDE.md)** - Detailed instructions for all deployment options
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist to ensure nothing is missed

### Quick Start Deployment:

1. **Set up MongoDB Atlas** (free cloud database)
2. **Deploy backend** to [Render](https://render.com) (free tier available)
3. **Deploy frontend** to [Vercel](https://vercel.com) (free tier available)
4. **Update environment variables** with your deployed URLs

See `QUICK_DEPLOY.md` for detailed step-by-step instructions!

---

## 📚 Additional Documentation

- **[Project Explanation](PROJECT_EXPLANATION.md)** - Complete codebase explanation and architecture overview

