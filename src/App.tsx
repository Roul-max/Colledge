/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useTasks } from './hooks/useTasks.js';
import Navbar from './components/Navbar.jsx';
import StatsRow from './components/StatsRow.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import Insights from './components/Insights.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import { Toast } from './components/Toast.jsx';

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const {
    tasks,
    taskCounts,
    insights,
    loading,
    error,
    filters,
    setFilters,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStatusChange,
    handleToggleSubtask,
    handleReorder
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') {
          setIsFormOpen(false);
          setEditingTask(null);
          setDeletingTask(null);
        }
        return;
      }
      
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        onAddTaskClick();
      } else if (e.key === 'Escape') {
        setIsFormOpen(false);
        setEditingTask(null);
        setDeletingTask(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const onAddTaskClick = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleCommandPaletteAction = (actionId) => {
    setIsCommandPaletteOpen(false);
    switch (actionId) {
      case 'create':
        onAddTaskClick();
        break;
      case 'archive':
        setFilters(prev => ({ ...prev, archived: !prev.archived }));
        break;
      case 'theme':
        showToast('Theme switching is coming soon!', 'success');
        break;
      default:
        break;
    }
  };

  const onEditTaskClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const onDeleteTaskClick = (id) => {
    const task = tasks.find(t => t._id === id);
    setDeletingTask(task);
  };

  const handleFormSubmit = async (data) => {
    let success = false;
    if (editingTask) {
      success = await handleUpdate(editingTask._id, data);
      if (success) showToast('Task updated successfully');
    } else {
      success = await handleCreate(data);
      if (success) showToast('Task created successfully');
    }
    
    if (success) {
      setIsFormOpen(false);
      setEditingTask(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingTask) {
      const success = await handleDelete(deletingTask._id);
      if (success) {
        showToast('Task deleted successfully');
      }
      setDeletingTask(null);
    }
  };

  const handleStatusCycle = async (task) => {
    const nextStatus = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    }[task.status];
    
    const success = await handleStatusChange(task._id, nextStatus);
    if (success) {
      showToast(`Status updated to ${nextStatus}`);
    }
  };

  const handleArchiveTask = async (id, archived) => {
    const success = await handleUpdate(id, { archived });
    if (success) {
      showToast(archived ? 'Task archived' : 'Task unarchived');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 flex flex-col relative z-0 transition-colors duration-200">
      <div className="bg-aurora"></div>
      <div className="fixed inset-0 bg-dot-grid opacity-[0.3] pointer-events-none z-[-1]"></div>
      <div className="vignette"></div>
      <div className="noise-overlay"></div>
      
      <Navbar onAddTask={onAddTaskClick} onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      
      <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 flex flex-col gap-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-surface/50 text-[10px] font-bold tracking-wider text-text-muted uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                System Operational
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/10 bg-surface/50 text-[10px] font-bold tracking-wider text-text-muted uppercase shadow-sm">
                SOC 2 Type II
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-white mb-3">
              Your Workspace
            </h2>
            <p className="text-text-muted text-[15px] font-medium leading-relaxed max-w-xl">
              Organize tasks, track progress, and ship faster. All your work in one unified dashboard.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <StatsRow taskCounts={taskCounts} loading={loading} />
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {insights && insights.length > 0 && !filters.archived && (
            <Insights data={insights} />
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            taskCounts={taskCounts} 
          />
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-danger/10 border border-danger/20 text-danger p-4 rounded-xl flex items-center gap-3 text-sm shadow-xl"
          >
            <span className="font-semibold">Error:</span> {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TaskList 
            tasks={tasks}
            loading={loading}
            onEdit={onEditTaskClick}
            onDelete={onDeleteTaskClick}
            onStatusCycle={handleStatusCycle}
            onReorder={handleReorder}
            onToggleSubtask={handleToggleSubtask}
            onArchive={handleArchiveTask}
          />
        </motion.div>
      </main>

      <AnimatePresence>
        {isFormOpen && (
          <TaskForm 
            initialData={editingTask}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingTask && (
          <ConfirmModal 
            title={deletingTask.title}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeletingTask(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onAction={handleCommandPaletteAction}
      />
    </div>
  );
}
