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

      

      const normalizedTasks = Array.isArray(filteredTasks)
        ? filteredTasks
        : filteredTasks?.tasks || [];

      const normalizedAllTasks = Array.isArray(countTasks)
        ? countTasks
        : countTasks?.tasks || [];

      const normalizedInsights = Array.isArray(insightsData)
        ? insightsData
        : insightsData?.data || [];

      setTasks(normalizedTasks);
      setAllTasks(normalizedAllTasks);
      setInsights(normalizedInsights);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to load tasks'
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const safeTasks = Array.isArray(allTasks) ? allTasks : [];

  const taskCounts = useMemo(
    () => ({
      all: safeTasks.length,
      pending: safeTasks.filter(task => task.status === 'pending').length,
      'in-progress': safeTasks.filter(task => task.status === 'in-progress').length,
      completed: safeTasks.filter(task => task.status === 'completed').length
    }),
    [safeTasks]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(handler);
  }, [loadTasks]);

  const handleReorder = (newTasks) => {
    setTasks(Array.isArray(newTasks) ? newTasks : []);
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

  const handleToggleSubtask = async (
    taskId,
    subtaskId,
    completed,
    allSubtasks
  ) => {
    try {
      const updatedSubtasks = allSubtasks.map(st =>
        st._id === subtaskId
          ? { ...st, completed }
          : st
      );

      await api.updateTask(taskId, {
        subtasks: updatedSubtasks
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === taskId
            ? { ...task, subtasks: updatedSubtasks }
            : task
        )
      );

      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to update subtask'
      );
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