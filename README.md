# Full-Stack To-Do Application

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- API Docs: Postman / Swagger

## Features
- User registration & login
- JWT-based authentication
- Task CRUD (Create, Read, Update, Delete)
- User-specific task access
- Responsive UI
- Dark / Light mode
- Pagination
- Task Search
- Task Filter

## Setup Instructions
## Backend Setup

1. Navigate to backend folder
```bash
cd backend
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file
```bash
DATABASE=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
```
4. Start backend server
```bash
npm start
```

## Frontend Setup

1. Navigate to frontend folder
```bash
cd frontend
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file
```bash
VITE_GOOGLE_KEY=your_google_login_key
VITE_SERVER_URL=your_server_url
```
4.Start the frontend application
```bash
npm run dev
```

## API Documentation
- Postman collection included / Swagger URL

## Design Decisions
- Used JWT for stateless authentication
- Protected routes with middleware
