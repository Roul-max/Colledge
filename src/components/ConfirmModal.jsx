import PropTypes from 'prop-types';
import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic.jsx';

export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-card glow-border rounded-xl w-full max-w-sm p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center text-center relative m-4 border-white/10"
      >
        <Magnetic>
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 text-text-muted hover:text-white bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-md p-1.5 transition-all"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </Magnetic>
        <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4 mt-2 shadow-sm border border-danger/20">
          <AlertTriangle size={24} strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-display font-semibold text-white mb-2 tracking-tight">Delete Task?</h3>
        <p className="text-text-muted text-[13px] mb-6 leading-relaxed font-medium">
          Are you sure you want to delete <span className="text-white font-semibold">"{title}"</span>? This action cannot be undone.
        </p>
        
        <div className="flex w-full gap-2.5">
          <Magnetic className="flex-1">
            <button 
              onClick={onCancel}
              className="w-full px-4 py-2 rounded-md text-[13px] font-semibold text-text bg-surface hover:bg-surface-hover hover:border-white/10 transition-all border border-white/5"
            >
              Cancel
            </button>
          </Magnetic>
          <Magnetic className="flex-1">
            <button 
              onClick={onConfirm}
              className="w-full px-4 py-2 rounded-md text-[13px] font-semibold text-white bg-danger hover:bg-danger/90 border border-danger transition-all shadow-[0_2px_10px_rgba(239,68,68,0.2)]"
            >
              Delete
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </motion.div>
  );
}

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
