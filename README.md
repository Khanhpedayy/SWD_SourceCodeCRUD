# Quiz Practice System - CRUD Starter

Tech stack:
- Frontend: ReactJS + Vite
- Backend: Node.js + Express.js
- Database: MySQL
- API: REST
- CRUD module: Questions

## Requirements
- Node.js 18+
- MySQL 8+

## 1. Create database

Open MySQL and run:

```sql
SOURCE database/schema.sql;
```

Or copy the contents of `database/schema.sql` into MySQL Workbench.

## 2. Configure backend

Go to `backend/.env.example`, copy it to `.env`, then change the database password if needed.

Example:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quiz_system
PORT=5000

## 3. Install and run backend

```bash
cd backend
npm install
npm run dev
```

Backend:
http://localhost:5000

## 4. Install and run frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

## CRUD API

GET    /api/questions
GET    /api/questions/:id
POST   /api/questions
PUT    /api/questions/:id
DELETE /api/questions/:id

The UI supports:
- Create question
- Read/list questions
- Edit question
- Delete question
- Search questions
- Filter by difficulty
