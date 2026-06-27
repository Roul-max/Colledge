import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic.jsx';

export default function TaskForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: 'uncategorized',
    dueDate: '',
    subtasks: []
  });
  const [newSubtask, setNewSubtask] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        priority: initialData.priority || 'medium',
        category: initialData.category || 'uncategorized',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        subtasks: initialData.subtasks || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, { title: newSubtask.trim(), completed: false, _id: Date.now().toString() }]
      }));
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (id) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st._id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }
    // Remove temporary _id from new subtasks before submit
    const submitData = {
      ...formData,
      subtasks: formData.subtasks.map(st => {
        if(st._id && st._id.length < 24) { // It's a timestamp ID
           const { _id, ...rest } = st;
           return rest;
        }
        return st;
      })
    };
    onSubmit(submitData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md overflow-y-auto py-10"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-card glow-border rounded-xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] m-4 relative z-50 flex flex-col max-h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-xl" />
        <div className="flex justify-between items-center p-5 border-b border-white/5 relative z-10 shrink-0">
          <h2 className="text-lg font-display font-semibold text-white tracking-tight">
            {initialData ? 'Update Task' : 'Create New Task'}
          </h2>
          <Magnetic>
            <button 
              onClick={onClose}
              type="button"
              className="text-text-muted hover:text-white bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-md p-1.5 transition-all"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </Magnetic>
        </div>

        <div className="overflow-y-auto p-5 relative z-10 flex-1 custom-scrollbar">
          <form id="task-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase">Title <span className="text-danger">*</span></label>
                <span className="text-[10px] text-text-muted/60 font-medium">{formData.title.length} / 100</span>
              </div>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
                placeholder="What needs to be done?"
                className={`w-full bg-surface/50 hover:bg-surface/80 focus:bg-surface text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-text-muted/40 border ${errors.title ? 'border-danger focus:ring-danger/50 focus:border-danger' : 'border-white/10'}`}
              />
              {errors.title && <p className="text-danger text-[11px] mt-1.5 font-semibold">{errors.title}</p>}
            </div>

            <div>
              <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                placeholder="Add some details..."
                className="w-full bg-surface/50 hover:bg-surface/80 focus:bg-surface text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none placeholder:text-text-muted/40 border border-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-surface/50 hover:bg-surface/80 text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer appearance-none border border-white/10"
                >
                  <option value="uncategorized" className="bg-[#000]">Uncategorized</option>
                  <option value="work" className="bg-[#000]">Work</option>
                  <option value="personal" className="bg-[#000]">Personal</option>
                  <option value="urgent" className="bg-[#000]">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Priority</label>
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-surface/50 hover:bg-surface/80 text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer appearance-none border border-white/10"
                >
                  <option value="low" className="bg-[#000]">Low</option>
                  <option value="medium" className="bg-[#000]">Medium</option>
                  <option value="high" className="bg-[#000]">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-surface/50 hover:bg-surface/80 text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer appearance-none border border-white/10"
                >
                  <option value="pending" className="bg-[#000]">Pending</option>
                  <option value="in-progress" className="bg-[#000]">In Progress</option>
                  <option value="completed" className="bg-[#000]">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Due Date <span className="text-text-muted/50 font-normal text-[10px] normal-case">(Optional)</span></label>
                <input 
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full bg-surface/50 hover:bg-surface/80 text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all [color-scheme:dark] border border-white/10"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mb-1.5 block">Subtasks</label>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubtask();
                    }
                  }}
                  placeholder="Add a subtask..."
                  className="flex-1 bg-surface/50 hover:bg-surface/80 focus:bg-surface text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-text-muted/40 border border-white/10"
                />
                <Magnetic>
                  <button 
                    type="button"
                    onClick={handleAddSubtask}
                    className="premium-btn px-3 py-2 rounded-md flex items-center justify-center shrink-0 h-[38px]"
                  >
                    <Plus size={16} strokeWidth={2} />
                  </button>
                </Magnetic>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {formData.subtasks.map((st) => (
                    <motion.div 
                      key={st._id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center bg-surface/30 border border-white/5 rounded-md px-3 py-1.5"
                    >
                      <span className="text-sm text-white/90">{st.title}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveSubtask(st._id)}
                        className="text-text-muted hover:text-danger p-1 rounded hover:bg-danger/10 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2.5 p-5 border-t border-white/5 relative z-10 shrink-0">
          <Magnetic>
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-xs font-semibold text-text bg-surface hover:bg-surface-hover hover:border-white/10 transition-all border border-white/5"
            >
              Cancel
            </button>
          </Magnetic>
          <Magnetic>
            <button 
              type="submit"
              form="task-form"
              className="premium-btn px-5 py-2 rounded-md text-xs font-semibold tracking-wide flex items-center justify-center shimmer-btn"
            >
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </motion.div>
  );
}

TaskForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
