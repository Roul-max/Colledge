import { useState, useEffect, useCallback, useMemo } from 'react';
import * as api from '../api/tasks.js';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    archived: false,
    sort: 'createdAt',
    order: 'desc',
    search: ''
  });

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filteredTasks, countTasks, insightsData] = await Promise.all([
        api.fetchTasks(filters),
        api.fetchAllTasksForCounts(filters),
        filters.archived ? Promise.resolve([]) : api.fetchInsights()
      ]);
      setTasks(filteredTasks);
      setAllTasks(countTasks);
      setInsights(insightsData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const taskCounts = useMemo(() => ({
    all: allTasks.length,
    pending: allTasks.filter(task => task.status === 'pending').length,
    'in-progress': allTasks.filter(task => task.status === 'in-progress').length,
    completed: allTasks.filter(task => task.status === 'completed').length,
  }), [allTasks]);

  useEffect(() => {
    // debounce search
    const handler = setTimeout(() => {
      loadTasks();
    }, 300);
    return () => clearTimeout(handler);
  }, [loadTasks]);

  const handleReorder = (newTasks) => {
    setTasks(newTasks);
  };

  const handleCreate = async (data) => {
    try {
      await api.createTask(data);
      await loadTasks();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create task');
      return false;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.updateTask(id, data);
      await loadTasks();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update task');
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      await loadTasks();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete task');
      return false;
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateTaskStatus(id, status);
      await loadTasks();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update status');
      return false;
    }
  };

  const handleToggleSubtask = async (taskId, subtaskId, completed, allSubtasks) => {
    try {
      const updatedSubtasks = allSubtasks.map(st => 
        st._id === subtaskId ? { ...st, completed } : st
      );
      await api.updateTask(taskId, { subtasks: updatedSubtasks });
      // Optimistically update
      setTasks(prev => prev.map(t => t._id === taskId ? { ...t, subtasks: updatedSubtasks } : t));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update subtask');
      return false;
    }
  };

  return {
    tasks,
    allTasks,
    taskCounts,
    insights,
    loading,
    error,
    filters,
    setFilters,
    loadTasks,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStatusChange,
    handleToggleSubtask,
    handleReorder
  };
};
