import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Required: Recharts does not accept Tailwind classes.
const CHART_STYLES = {
  axisTick: { fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 },
  tooltipCursor: { fill: 'rgba(124,58,237,0.08)' },
  tooltipContent: {
    backgroundColor: 'rgba(17, 17, 24, 0.92)',
    borderColor: 'rgba(124,58,237,0.3)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)'
  },
  tooltipItem: { color: '#fff', fontWeight: 600 },
};

const Insights = React.memo(function Insights({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card glow-border rounded-xl p-6 w-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-sm">
          <TrendingUp size={18} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-white font-display font-semibold text-[15px] tracking-tight">Productivity Trends</h3>
          <p className="text-[13px] font-medium text-text-muted/70">Tasks completed over the last 7 days</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={CHART_STYLES.axisTick}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={CHART_STYLES.axisTick}
              allowDecimals={false}
            />
            <Tooltip
              cursor={CHART_STYLES.tooltipCursor}
              contentStyle={CHART_STYLES.tooltipContent}
              itemStyle={CHART_STYLES.tooltipItem}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#ffffff' : 'rgba(255,255,255,0.1)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

Insights.propTypes = {
  data: PropTypes.array.isRequired
};

export default Insights;
