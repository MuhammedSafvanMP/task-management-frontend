
# Task Management App (MERN Stack)

## Overview
Task Management App is a MERN stack application where **Admins** can assign tasks to **Users**, and users can update their task statuses. The app includes **role-based access control (RBAC)** to ensure only authorized users can perform specific actions.

## Features
- **Admin:**
  - Assign tasks to users.
  - View all tasks.
  - Manage users (optional, if needed).
- **User:**
  - View assigned tasks.
  - Update task status.
- **Authentication & Authorization:**
  - Role-based access (Admin & User).
  - Secure login with JWT authentication.
- **Task Management:**
  - CRUD operations for tasks.
  - Status updates.
- **Database:**
  - MongoDB for storing tasks and users.

---

# Backend
## Tech Stack
- **Node.js** + **Express.js** (Backend API)
- **MongoDB** (Database) with Mongoose ORM
- **JWT Authentication** (for secure access)
- **bcryptjs** (for password hashing)

## Installation
```bash
cd backend
npm install
```

## Environment Variables
Create a `.env` file in the **backend** directory and add:
```env
PORT=6710
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run the Backend
```bash
npm run dev
```

## API Routes
### Authentication
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login user & get JWT token

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID

### Tasks
- `POST /api/tasks` - Create a task (Admin only)
- `GET /api/tasks/users/:userId` - Get tasks assigned to a user
- `PUT /api/tasks/:id` - Update task status (User only)

---

# Frontend
## Tech Stack
- **React.js** (Frontend UI)
- **Axios** (API requests)
- **React Context API** (Authentication & Role-based access)
- **Tailwind CSS** (Styling)

## Installation
```bash
cd frontend
npm install
```

## Environment Variables
Create a `.env` file in the **frontend** directory and add:
```env
VITE_API_URL=http://localhost:6710/api
```

## Run the Frontend
```bash
npm run dev
```

## User Roles & Permissions
- **Admin:**
  - Assign tasks.
  - View all tasks.
- **User:**
  - View assigned tasks.
  - Update task status.

## Folder Structure
```
backend/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── middleware/
frontend/
  ├── components/
  ├── pages/
  ├── context/
```

## How to Use
1. **Admin logs in** → assigns tasks to users.
2. **User logs in** → views assigned tasks → updates status.
3. **Data is stored securely in MongoDB** and accessed via the API.


## important
## over rivew
-- admin login
  email: admin@gmail.com
  password: admin
-- admin create user and task assign pesific user
   user name and email -> user maile to sent his password then he can login
   user accept the task
