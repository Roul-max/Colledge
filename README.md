<div align="center">
  <h1>MERN Task Tracker</h1>
  <p>A modern, full-stack task management application built with the MERN stack, featuring a sleek, responsive UI with drag-and-drop, advanced filtering, and real-time updates.</p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a></li>
    <li><a href="#-features">Features</a></li>
    <li><a href="#-built-with">Built With</a></li>
    <li><a href="#-getting-started">Getting Started</a></li>
    <li><a href="#-available-scripts">Available Scripts</a></li>
    <li><a href="#-api-endpoints">API Endpoints</a></li>
    <li><a href="#-license">License</a></li>
  </ol>
</details>

---

## ✨ About The Project

This is a feature-rich, production-ready task tracker designed to demonstrate a modern full-stack web development workflow. It provides a seamless and intuitive user experience for managing tasks, with a powerful backend to support filtering, sorting, and data persistence.

The frontend is built with React and Vite, styled with Tailwind CSS, and animated with Framer Motion. The backend is a robust Node.js and Express server connected to a MongoDB database via Mongoose.

## 🚀 Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete tasks.
- **Drag & Drop**: Intuitively reorder tasks within the list.
- **Advanced Filtering**: Filter tasks by status, priority, and category.
- **Dynamic Sorting**: Sort tasks by creation date, due date, or priority.
- **Subtask Management**: Add and toggle the completion status of subtasks within a main task.
- **Task Archiving**: Archive completed tasks to keep the main view clean.
- **Dashboard Insights**: View a chart of completed tasks over the last 7 days.
- **Command Palette**: Quickly access actions like creating a new task using `Ctrl/Cmd + K`.
- **Keyboard Shortcuts**: Use shortcuts like `N` to open the new task form.
- **Responsive Design**: A seamless experience on both desktop and mobile devices.
- **Real-time Feedback**: Toast notifications for all user actions.

## 🛠️ Built With

This project is built with a modern, robust tech stack:

*   **Frontend:**
    *   React
    *   Vite
    *   Tailwind CSS
    *   Framer Motion for animations
    *   dnd-kit for drag and drop
    *   Recharts for data visualization
    *   Axios for API requests
*   **Backend:**
    *   Node.js
    *   Express.js
*   **Database:**
    *   MongoDB
    *   Mongoose
*   **Development:**
    *   TypeScript
    *   tsx for running the TypeScript server in development

## 🏁 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

*   **Node.js**: v18.0.0 or higher
*   **npm**: v8.0.0 or higher
*   **MongoDB**: A running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Open the `.env` file and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

4.  **Seed the database (optional):**
    To populate the database with realistic sample data, run the seed script:
    ```sh
    npm run seed
    ```

5.  **Run the development server:**
    This command starts both the frontend and backend servers concurrently.
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server for both frontend and backend.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server (after running `build`).
- `npm run seed`: Clears and seeds the database with sample tasks.
- `npm run lint`: Lints the TypeScript files for errors.

## 🔑 API Endpoints

| Method | Endpoint                 | Description                               |
| :----- | :----------------------- | :---------------------------------------- |
| `GET`  | `/api/tasks`             | Get all tasks with optional query filters |
| `GET`  | `/api/insights`          | Get task completion data for the last 7 days |
| `POST` | `/api/tasks`             | Create a new task                         |
| `PUT`  | `/api/tasks/:id`         | Update an existing task                   |
| `DELETE`| `/api/tasks/:id`        | Delete a task                             |
| `PATCH`| `/api/tasks/:id/status`  | Update the status of a task               |

## 📄 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
