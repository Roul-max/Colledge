import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge.jsx';
import { Calendar, Edit2, Trash2, Clock, CheckCircle2, Circle, Archive, ArchiveRestore, Tag } from 'lucide-react';
import Magnetic from './Magnetic.jsx';

const TaskCard = React.memo(function TaskCard({ task, onEdit, onDelete, onStatusCycle, onToggleSubtask, onArchive }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const priorityStyles = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    high: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  const categoryColors = {
    work: 'bg-info/10 text-info border-info/10',
    personal: 'bg-purple-500/10 text-purple-400 border-purple-500/10',
    urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/10',
    uncategorized: 'bg-white/5 text-text-muted border-white/5'
  };

  return (
    <div className="glass-card glow-border rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 group relative overflow-hidden h-full hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
      <div className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${priorityStyles[task.priority].split(' ')[1].replace('text-', 'bg-')}`} />
      
      <div className="flex justify-between items-start gap-4 pr-10">
        <div>
          <h3 className="text-white font-display font-semibold text-[15px] leading-snug tracking-tight mb-2.5">
            {task.title}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <div className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border flex items-center uppercase shadow-sm ${categoryColors[task.category] || categoryColors.uncategorized}`}>
              <Tag size={10} className="mr-1.5" />
              {task.category || 'Uncategorized'}
            </div>
            <div className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border flex items-center uppercase shadow-sm ${priorityStyles[task.priority]}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                task.priority === 'low' ? 'bg-emerald-400' :
                task.priority === 'medium' ? 'bg-amber-400' : 'bg-red-400'
              }`}></span>
              {task.priority}
            </div>
          </div>
        </div>
      </div>
      
      {task.description && (
        <p className="text-text-muted/80 text-[13px] line-clamp-2 leading-relaxed font-medium">
          {task.description}
        </p>
      )}

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {task.subtasks.map(subtask => (
            <div 
              key={subtask._id} 
              className="flex items-center gap-2.5 group/subtask cursor-pointer hover:bg-white/5 p-1.5 -mx-1.5 rounded-lg transition-colors"
              onClick={() => onToggleSubtask(task._id, subtask._id, !subtask.completed, task.subtasks)}
            >
              <div className="text-text-muted group-hover/subtask:text-primary transition-colors flex-shrink-0">
                {subtask.completed ? <CheckCircle2 size={15} className="text-success" /> : <Circle size={15} />}
              </div>
              <span className={`text-[13px] font-medium truncate transition-colors ${subtask.completed ? 'text-text-muted/40 line-through' : 'text-text-muted/90 group-hover/subtask:text-white'}`}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        <div 
          onClick={() => onStatusCycle(task)}
          className="cursor-pointer hover:scale-105 transition-transform"
          title="Click to change status"
        >
          <StatusBadge status={task.status} />
        </div>

        {task.dueDate && (
          <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${isOverdue ? 'text-danger' : 'text-text-muted/60'}`}>
            {isOverdue ? <Clock size={14} className="animate-pulse" strokeWidth={2.5} /> : <Calendar size={14} strokeWidth={2} />}
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            {isOverdue && <span className="ml-1 bg-danger/20 px-1.5 py-0.5 rounded text-danger">Overdue</span>}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-20">
        {task.status === 'completed' && onArchive && (
          <Magnetic>
            <button 
              onClick={() => onArchive(task._id, !task.archived)}
              className="p-2 text-text-muted hover:text-white bg-surface/90 hover:bg-surface border border-white/10 hover:border-white/20 rounded-lg transition-all backdrop-blur-md shadow-sm"
              title={task.archived ? "Unarchive Task" : "Archive Task"}
            >
              {task.archived ? <ArchiveRestore size={14} strokeWidth={2} /> : <Archive size={14} strokeWidth={2} />}
            </button>
          </Magnetic>
        )}
        <Magnetic>
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-text-muted hover:text-white bg-surface/90 hover:bg-surface border border-white/10 hover:border-white/20 rounded-lg transition-all backdrop-blur-md shadow-sm"
            title="Edit Task"
          >
            <Edit2 size={14} strokeWidth={2} />
          </button>
        </Magnetic>
        <Magnetic>
          <button 
            onClick={() => onDelete(task._id)}
            className="p-2 text-text-muted hover:text-danger bg-surface/90 hover:bg-danger/10 border border-white/10 hover:border-danger/20 rounded-lg transition-all backdrop-blur-md shadow-sm"
            title="Delete Task"
          >
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </Magnetic>
      </div>
    </div>
  );
});

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusCycle: PropTypes.func.isRequired,
  onToggleSubtask: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
};

export default TaskCard;
