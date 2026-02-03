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

## API Documentation ✅

This project exposes a small, well-documented REST API for user authentication and task management. The backend server runs on **http://localhost:4000** by default and provides an interactive Swagger UI at `http://localhost:4000/api-docs`.

---

### Base URL

- **Local (default):** `http://localhost:4000`

### Authentication 🔐

- Authentication is done via **JWT**.
- Include the token in the **Authorization** header as:

  `Authorization: Bearer <token>`

- Tokens are generated at login and contain the user's email in the payload (`userMail`). The middleware looks for `Authorization` and sets `req.payload = userMail`.

---

### Endpoints (Overview) 🔧

#### Authentication

- **POST /user-register**
  - Public. Body: `{ username, email, password }`
  - Success: **201** – "Account Created Successfully! Please Login!"
  - Errors: **409** (user exists), **500** (server)

- **POST /user-login**
  - Public. Body: `{ email, password }`
  - Success: **200** – `{ message, user: { username, email, profile }, token }`
  - Errors: **401** (invalid password), **404** (user not found)

- **POST /google-user-login**
  - Public. Body: `{ username, email, profile, password }`
  - Success: **200** – `{ user, token }` (creates user if not exists)

#### Tasks (Protected — Bearer token required)

- **POST /create-task**
  - Body: `{ title }`
  - Success: **201** – "Task Created Successful!"
  - Errors: **401** (unauthorized), **404** (user not found)

- **GET /get-task**
  - Query optional: `?search=<term>` (case-insensitive search by title)
  - Success: **200** – `[]` array of task objects

- **GET /task/:id/details**
  - Success: **200** – single task object
  - Errors: **403** (forbidden if not owner), **404** (task/user not found)

- **PUT /update-task**
  - Body: `{ _id, title, status, description }`
  - Success: **200** – "Task Updated!!"
  - Errors: **403** (not owner), **404** (task/user not found)

- **DELETE /delete-task/:id**
  - Success: **200** – "Task Deleted!"
  - Errors: **403** (not owner), **404** (task/user not found)

---

### Task Schema (response)

A task object contains:

- `_id` (string)
- `userId` (string)
- `title` (string)
- `description` (string)
- `status` (string) — defaults to `Not Completed`
- `createdAt` (ISO date-time)

---

### Quick cURL Examples 🧪

- Login (get token):

```bash
curl -X POST http://localhost:4000/user-login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

- Create Task (use token returned from login):

```bash
curl -X POST http://localhost:4000/create-task \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"Finish docs"}'
```

---

### Swagger & API Testing

- Interactive documentation is available at **`/api-docs`** when the server is running.

---

### Environment Variables

- **DATABASE** – MongoDB connection string
- **JWT_KEY** – secret used to sign JWT tokens
- (Frontend) **VITE_SERVER_URL**, **VITE_GOOGLE_KEY** as used in the `frontend` folder

---

## Assumptions & Design Decisions

### Assumptions

- Default task status is “Not Completed”
- Google-authenticated users are handled like normal users after login
- Pagination size is fixed (example: 10 tasks per page)
- Task title is mandatory


### Design Decisions

- Used JWT for stateless authentication
- Protected routes with middleware
- Stored JWT on frontend and sent via Authorization header
- Separated controllers, routes, middleware for clean architecture
- Used Swagger for API documentation
