# TaskFlow

A production-grade Task Tracker built with the MERN stack. Create, manage, and track tasks with priority levels, due dates, filtering, sorting, and real-time updates.

## Tech Stack

- Frontend: React.js (Vite), Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose

## Features

### Mandatory

- Full CRUD: Create, view, edit, and delete tasks
- Form validation with inline errors
- REST API with proper status codes
- MongoDB integration via Mongoose
- Responsive layout for mobile, tablet, and desktop
- Dynamic updates without page refresh

### Bonus

- Filter by status and priority
- Sort by created date, due date, logical priority, and title
- Ascending and descending sort order
- Overdue badge for past-due incomplete tasks
- Empty state when no tasks match filters
- Shimmer skeleton loading cards
- Toast notifications for all operations
- Status quick-toggle by clicking the badge
- Character counter on the title input
- Accurate task count badges on status filter pills
- Search, categories, subtasks, archiving, insights, and drag-and-drop ordering

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/task-tracker.git
cd task-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Open .env and fill in your MONGO_URI
```

### Running Locally

```bash
# Development (frontend + backend together)
npm run dev

# Production build
npm run build
npm start
```

### Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `MONGO_URI` | `.env` | MongoDB Atlas connection string |
| `PORT` | `.env` | Server port (default: 5000) |
| `VITE_API_URL` | `.env` | Backend public URL (production only) |
| `CLIENT_URL` | `.env` | Frontend public URL (for CORS) |

Never commit a populated `.env` file or database credentials.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Fetch tasks with optional filters and sorting |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `PATCH` | `/api/tasks/:id/status` | Update task status |

## Deployed Links

- Frontend: [Add Vercel URL here]
- Backend: [Add Render URL here]
