import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
  getInsights
} from '../controllers/taskController.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Body:", JSON.stringify(req.body, null, 2));
  next();
});

router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.get('/insights', getInsights);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(updateStatus);

export default router;
