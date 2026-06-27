import axios from 'axios';

// Use env URL if available, else relative path for proxy
const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
const API_URL = configuredApiUrl.endsWith('/api')
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

export const fetchTasks = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllTasksForCounts = async (params = {}) => {
  try {
    const { status, ...countParams } = params;
    const response = await axios.get(`${API_URL}/tasks`, { params: countParams });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchInsights = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/insights`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
