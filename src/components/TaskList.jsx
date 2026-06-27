import PropTypes from 'prop-types';
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortableTaskCard } from './SortableTaskCard.jsx';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

export default function TaskList({ tasks, loading, onEdit, onDelete, onStatusCycle, onReorder, onToggleSubtask, onArchive }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t._id === active.id);
      const newIndex = tasks.findIndex((t) => t._id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      if (onReorder) {
        onReorder(newTasks);
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="glass-card rounded-xl p-5 h-[200px] flex flex-col justify-between overflow-hidden relative border border-white/5 bg-surface/30">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
            <div>
              <div className="flex gap-2 mb-4">
                <div className="h-4 w-16 bg-white/10 rounded-md"></div>
                <div className="h-4 w-12 bg-white/10 rounded-md"></div>
              </div>
              <div className="h-5 bg-white/10 rounded-md w-3/4 mb-4"></div>
              <div className="h-3 bg-white/5 rounded w-full mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-4/5"></div>
            </div>
            <div className="flex justify-between mt-auto pt-4 border-t border-white/5 relative z-0">
              <div className="h-6 w-20 bg-white/10 rounded-full"></div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-white/10 rounded-md"></div>
                <div className="h-6 w-6 bg-white/10 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-text-muted">
        <div className="w-20 h-20 glass-card glow-border rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 shadow-sm border-white/10">
          <Layers size={32} className="text-text-muted/50" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-display font-semibold text-text tracking-tight mb-2.5">No tasks found</h3>
        <p className="text-[13px] font-medium text-text-muted/80 text-center max-w-sm">
          You don't have any tasks matching your criteria. Try adjusting your filters or create a new task.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map(t => t._id)}
        strategy={rectSortingStrategy}
      >
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {tasks.map(task => (
              <SortableTaskCard 
                key={task._id} 
                task={task} 
                onEdit={onEdit} 
                onDelete={onDelete}
                onStatusCycle={onStatusCycle}
                onToggleSubtask={onToggleSubtask}
                onArchive={onArchive}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </SortableContext>
    </DndContext>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusCycle: PropTypes.func.isRequired,
  onToggleSubtask: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
};
