import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import TaskCard from './TaskCard.jsx';

export const SortableTaskCard = forwardRef(function SortableTaskCard(
  {
    task,
    onEdit,
    onDelete,
    onStatusCycle,
    onToggleSubtask,
    onArchive,
  },
  ref
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: task._id,
  });

  const combinedRef = (node) => {
    setNodeRef(node);

    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <motion.div
      ref={combinedRef}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        x: transform?.x ?? 0,
        y: transform?.y ?? 0,
        scaleX: transform?.scaleX ?? 1,
        scaleY: transform?.scaleY ?? 1,
        opacity: isDragging ? 0.8 : 1,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`h-full relative ${isDragging ? 'z-10' : 'z-[1]'}`}
    >
      <div className="h-full transition-transform duration-300 hover:-translate-y-1">
        <TaskCard
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusCycle={onStatusCycle}
          onToggleSubtask={onToggleSubtask}
          onArchive={onArchive}
        />
      </div>
    </motion.div>
  );
});

SortableTaskCard.displayName = 'SortableTaskCard';

SortableTaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusCycle: PropTypes.func.isRequired,
  onToggleSubtask: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
};