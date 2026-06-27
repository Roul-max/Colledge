import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './server/models/Task.js';

dotenv.config();

const tasks = [
  // 10 Work Tasks
  {
    title: "Complete MERN Internship Assignment",
    description: "Finish the drag-and-drop task manager, implement all required features, and deploy it to a hosting service like Vercel or Netlify.",
    status: "in-progress",
    priority: "high",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    subtasks: [
      { title: "Create MongoDB schema for tasks and users", completed: true },
      { title: "Implement backend API for CRUD operations", completed: true },
      { title: "Set up React frontend with Vite", completed: true },
      { title: "Implement drag-and-drop reordering", completed: false },
      { title: "Deploy backend and frontend", completed: false }
    ]
  },
  {
    title: "Integrate Stripe API for Subscription Service",
    description: "Add a new subscription feature to the main application by integrating the Stripe payment gateway. This includes creating subscription plans, handling webhooks, and managing user subscription status.",
    status: "pending",
    priority: "medium",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    subtasks: [
      { title: "Set up Stripe developer account", completed: false },
      { title: "Create subscription product in Stripe dashboard", completed: false },
      { title: "Implement checkout session on the frontend", completed: false },
      { title: "Create a webhook endpoint to handle payment events", completed: false }
    ]
  },
  {
    title: "Code Review for Feature Branch 'feat/user-profiles'",
    description: "Review the pull request for the new user profiles feature. Check for code quality, adherence to style guides, and potential bugs.",
    status: "pending",
    priority: "low",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    subtasks: [
      { title: "Pull down the feature branch locally", completed: false },
      { title: "Test the new functionality", completed: false },
      { title: "Leave comments and suggestions on the PR", completed: false }
    ]
  },
  {
    title: "Deploy Q2 Updates to Staging Environment",
    description: "Merge all completed features from the Q2 development cycle and deploy the consolidated build to the staging server for QA testing.",
    status: "completed",
    priority: "high",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    subtasks: [
      { title: "Ensure all feature branches are merged into 'develop'", completed: true },
      { title: "Run the CI/CD pipeline for staging", completed: true },
      { title: "Notify QA team about the new build", completed: true }
    ]
  },
  {
    title: "Write Unit Tests for Authentication Service",
    description: "Increase test coverage for the authentication service to over 90%. Focus on edge cases for login, registration, and password reset flows.",
    status: "in-progress",
    priority: "medium",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    subtasks: [
      { title: "Set up Jest and React Testing Library", completed: true },
      { title: "Write tests for the login component", completed: false },
      { title: "Write tests for the registration flow", completed: false },
      { title: "Mock API calls for testing", completed: false }
    ]
  },
  {
    title: "Plan and Execute Database Migration",
    description: "Migrate the user analytics data from PostgreSQL to a new MongoDB cluster to improve query performance and scalability.",
    status: "pending",
    priority: "high",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    subtasks: [
      { title: "Create a backup of the current PostgreSQL database", completed: false },
      { title: "Write a migration script", completed: false },
      { title: "Perform a dry run on a test environment", completed: false }
    ]
  },
  {
    title: "Implement UI/UX Feedback for Dashboard",
    description: "Address the UI/UX feedback received from the design team for the main dashboard. This includes adjusting component spacing, color contrast, and font sizes.",
    status: "in-progress",
    priority: "low",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    subtasks: [
      { title: "Update the main chart component styles", completed: true },
      { title: "Adjust layout for mobile responsiveness", completed: false },
      { title: "Ensure accessibility standards are met", completed: false }
    ]
  },
  {
    title: "Update API Documentation for v2.5",
    description: "Document the new endpoints and changes introduced in version 2.5 of the public API. Use Swagger/OpenAPI for documentation.",
    status: "pending",
    priority: "low",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 25)),
    subtasks: []
  },
  {
    title: "Optimize Frontend Asset Loading",
    description: "Improve the application's initial load time by optimizing images, implementing code splitting, and leveraging browser caching.",
    status: "in-progress",
    priority: "medium",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 18)),
    subtasks: [
      { title: "Analyze bundle size with webpack-bundle-analyzer", completed: false },
      { title: "Implement lazy loading for routes", completed: false },
      { title: "Compress all PNG and JPG assets", completed: false }
    ]
  },
  {
    title: "Prepare for Client Demo",
    description: "Prepare a presentation and a live demonstration of the new project management features for the upcoming client meeting.",
    status: "completed",
    priority: "medium",
    category: "work",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    subtasks: [
      { title: "Create a slide deck outlining new features", completed: true },
      { title: "Set up a clean demo environment with sample data", completed: true },
      { title: "Rehearse the demo flow", completed: true }
    ]
  },
  // 8 Personal Tasks
  {
    title: "Go to the Gym 3 Times This Week",
    description: "Stick to the new workout plan. Focus on compound lifts and aim for progressive overload.",
    status: "in-progress",
    priority: "medium",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    subtasks: [
      { title: "Monday: Chest & Triceps", completed: true },
      { title: "Wednesday: Back & Biceps", completed: false },
      { title: "Friday: Legs & Shoulders", completed: false }
    ]
  },
  {
    title: "Read 'Designing Data-Intensive Applications'",
    description: "Read at least two chapters of the book to improve system design knowledge.",
    status: "pending",
    priority: "low",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    subtasks: []
  },
  {
    title: "Plan Weekend Trip to the Mountains",
    description: "Organize a weekend hiking trip. Book accommodation, plan the route, and pack necessary gear.",
    status: "in-progress",
    priority: "medium",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 22)),
    subtasks: [
      { title: "Research and book a cabin", completed: false },
      { title: "Plan hiking trails and daily itinerary", completed: false },
      { title: "Buy snacks and supplies", completed: false }
    ]
  },
  {
    title: "Update Personal Portfolio Website",
    description: "Add the latest projects to my portfolio website. Update the 'About Me' section and refresh the design.",
    status: "completed",
    priority: "high",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    subtasks: [
      { title: "Write case study for the Task Tracker project", completed: true },
      { title: "Take new screenshots and create a video demo", completed: true },
      { title: "Deploy the updated site", completed: true }
    ]
  },
  {
    title: "Practice Spanish on Duolingo",
    description: "Complete daily lessons on Duolingo to maintain the learning streak and improve vocabulary.",
    status: "in-progress",
    priority: "low",
    category: "personal",
    dueDate: null,
    subtasks: []
  },
  {
    title: "Organize Google Drive and Dropbox",
    description: "Clean up and organize all files in cloud storage. Create a consistent folder structure and delete old, unnecessary files.",
    status: "pending",
    priority: "low",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 50)),
    subtasks: [
      { title: "Sort 'Downloads' folder", completed: false },
      { title: "Archive old project files", completed: false },
      { title: "Set up automated backups for important documents", completed: false }
    ]
  },
  {
    title: "Meal Prep for the Week",
    description: "Prepare lunches and dinners for the upcoming week to save time and eat healthier.",
    status: "completed",
    priority: "medium",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    subtasks: [
      { title: "Go grocery shopping", completed: true },
      { title: "Cook chicken, rice, and vegetables", completed: true },
      { title: "Portion meals into containers", completed: true }
    ]
  },
  {
    title: "Call Family",
    description: "Catch up with family over a video call.",
    status: "pending",
    priority: "medium",
    category: "personal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    subtasks: []
  },
  // 5 Urgent Tasks
  {
    title: "Fix Production Bug #PROD-1138",
    description: "A critical bug is causing users to be unable to log in via Google OAuth. This needs to be investigated and hotfixed immediately.",
    status: "in-progress",
    priority: "high",
    category: "urgent",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    subtasks: [
      { title: "Replicate the issue in the development environment", completed: false },
      { title: "Identify the root cause in the OAuth callback handler", completed: false },
      { title: "Deploy a hotfix", completed: false }
    ]
  },
  {
    title: "Submit Operating Systems Assignment 3",
    description: "Complete the programming assignment on process scheduling algorithms (FCFS, SJF, Round Robin) and submit the report before the deadline.",
    status: "pending",
    priority: "high",
    category: "urgent",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    subtasks: [
      { title: "Implement the FCFS algorithm", completed: true },
      { title: "Implement the SJF algorithm", completed: false },
      { title: "Write the analysis and comparison report", completed: false }
    ]
  },
  {
    title: "Prepare for Google Technical Interview",
    description: "Prepare for the upcoming technical interview. Focus on system design and common data structures and algorithms questions.",
    status: "in-progress",
    priority: "high",
    category: "urgent",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 12)),
    subtasks: [
      { title: "Review system design concepts (scaling, caching, load balancing)", completed: false },
      { title: "Solve 5 medium-level LeetCode problems", completed: false },
      { title: "Prepare answers for common behavioral questions", completed: false }
    ]
  },
  {
    title: "Pay Monthly Credit Card Bill",
    description: "Pay the credit card bill to avoid late fees and interest charges.",
    status: "completed",
    priority: "high",
    category: "urgent",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    subtasks: []
  },
  {
    title: "Respond to Investor Inquiry Email",
    description: "Draft and send a detailed response to the inquiry email from the potential investor.",
    status: "pending",
    priority: "high",
    category: "urgent",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    subtasks: []
  },
  // 2 Uncategorized Tasks
  {
    title: "Solve 2 DSA Problems on LeetCode",
    description: "Practice data structures and algorithms. Focus on problems related to trees and graphs.",
    status: "pending",
    priority: "medium",
    category: "uncategorized",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    subtasks: [
      { title: "Solve one 'Medium' problem", completed: false },
      { title: "Solve one 'Easy' problem", completed: false }
    ]
  },
  {
    title: "Research new CSS frameworks",
    description: "Look into new and upcoming CSS frameworks as potential alternatives to Tailwind CSS for future projects.",
    status: "completed",
    priority: "low",
    category: "uncategorized",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 20)),
    subtasks: []
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    await Task.deleteMany({});
    console.log('Existing tasks deleted.');

    await Task.insertMany(tasks);
    console.log(`${tasks.length} tasks inserted.`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDB();
