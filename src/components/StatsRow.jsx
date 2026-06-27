import React from 'react';
import PropTypes from 'prop-types';
import { LayoutList, Clock, Activity, CheckCircle2 } from 'lucide-react';

const StatsRow = React.memo(function StatsRow({ taskCounts, loading }) {
  const stats = [
    { label: 'Total', count: taskCounts.all || 0, icon: LayoutList, color: 'text-primary-hover' },
    { label: 'Pending', count: taskCounts.pending || 0, icon: Clock, color: 'text-amber-400' },
    { label: 'In Progress', count: taskCounts['in-progress'] || 0, icon: Activity, color: 'text-blue-400' },
    { label: 'Completed', count: taskCounts.completed || 0, icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-surface/50 border border-white/5 rounded-md px-3 py-1.5 flex items-center gap-2 h-9 w-24 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="w-3 h-3 rounded-full bg-white/5" />
            <div className="w-8 h-2 rounded bg-white/5" />
            <div className="w-3 h-3 rounded bg-white/5 ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-surface/50 border border-white/5 rounded-md px-3 py-1.5 flex items-center gap-2 transition-all duration-300 hover:bg-surface cursor-default hover:border-white/10 shadow-sm">
            <Icon size={12} className={stat.color} strokeWidth={2.5} />
            <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">{stat.label}</span>
            <span className="text-white font-mono font-semibold text-[13px] ml-1">{stat.count}</span>
          </div>
        );
      })}
    </div>
  );
});

StatsRow.propTypes = {
  taskCounts: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default StatsRow;
