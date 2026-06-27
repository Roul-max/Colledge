import PropTypes from 'prop-types';

export default function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    'in-progress': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 line-through',
  };
  
  const dots = {
    pending: 'bg-amber-400',
    'in-progress': 'bg-blue-400',
    completed: 'bg-emerald-400 hidden',
  }

  const label = status === 'in-progress' ? 'In Progress' : status;

  return (
    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}>
      {status !== 'completed' && <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />}
      {label}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired,
};
