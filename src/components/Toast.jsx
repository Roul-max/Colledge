import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function Toast({
  message,
  type = 'success',
  onClose,
}) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  const indicatorStyles = {
    success: 'bg-success text-success',
    error: 'bg-danger text-danger',
    info: 'bg-info text-info',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 glass-card bg-surface/80 rounded-lg px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 border border-primary/20 backdrop-blur-xl"
      role="status"
    >
      <div
        className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${indicatorStyles[type]}`}
      />
      <span className="text-[13px] font-semibold text-white tracking-wide">
        {message}
      </span>
    </motion.div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  onClose: PropTypes.func.isRequired,
};