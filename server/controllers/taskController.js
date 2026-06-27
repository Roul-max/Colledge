import mongoose from 'mongoose';
import Task from '../models/Task.js';

const VALID_STATUSES = ['pending', 'in-progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const PRIORITY_ORDER = { low: 1, medium: 2, high: 3 };

const createHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateTaskEnums = ({ status, priority }) => {
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    throw createHttpError('Invalid status', 400);
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    throw createHttpError('Invalid priority', 400);
  }
};

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError('Invalid task ID', 400);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, sort, order, search, category, archived } = req.query;
    
    // Build filter object
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (archived === 'true') {
      filter.archived = true;
    } else {
      filter.archived = { $ne: true };
    }
    
    // Build sort object
    const sortObj = {};
    if (sort) {
      const sortOrder = order === 'asc' ? 1 : -1;
      sortObj[sort] = sortOrder;
    } else {
      sortObj.createdAt = -1; // default sort
    }
    
    const tasks = await Task.find(filter).sort(sort === 'priority' ? {} : sortObj);

    if (sort === 'priority') {
      tasks.sort((firstTask, secondTask) => (
        PRIORITY_ORDER[firstTask.priority] - PRIORITY_ORDER[secondTask.priority]
      ));
      if (order === 'desc') {
        tasks.reverse();
      }
    }

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getInsights = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0,0,0,0);
    
    const completedTasks = await Task.find({
      status: 'completed',
      completedAt: { $gte: sevenDaysAgo }
    });
    
    const days = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (!days[dateStr]) days[dateStr] = 0;
    }
    
    completedTasks.forEach(t => {
      const dateStr = new Date(t.completedAt).toLocaleDateString('en-US', { weekday: 'short' });
      if (days[dateStr] !== undefined) {
        days[dateStr]++;
      }
    });
    
    const result = Object.keys(days).map(date => ({
      date,
      count: days[date]
    }));
    
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, category, subtasks } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    validateTaskEnums({ status, priority });
    
    const task = new Task({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      category,
      subtasks: subtasks || []
    });
    
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateObjectId(id);
    validateTaskEnums(req.body || {});

    if (req.body.title !== undefined && (
      typeof req.body.title !== 'string' || !req.body.title.trim()
    )) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.findById(id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    
    // Update only provided fields
    const fieldsToUpdate = ['title', 'description', 'status', 'priority', 'dueDate', 'category', 'subtasks', 'archived'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        const value = req.body[field];
        task[field] = (
          (field === 'title' || field === 'description') && typeof value === 'string'
        ) ? value.trim() : value;
      }
    });

    if ('dueDate' in req.body) {
      task.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : null;
    }
    
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateObjectId(id);

    const task = await Task.findById(id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    
    await Task.deleteOne({ _id: id });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    validateObjectId(id);

    if (!status) {
      const error = new Error('Status is required');
      error.statusCode = 400;
      throw error;
    }

    validateTaskEnums({ status });

    const task = await Task.findById(id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    
    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};
