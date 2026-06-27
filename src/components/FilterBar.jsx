import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import Magnetic from './Magnetic.jsx';

const FilterBar = React.memo(function FilterBar({ filters, setFilters, taskCounts }) {
  const statuses = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];

  const handleStatusChange = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleOrder = () => {
    setFilters(prev => ({ ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
      {/* LEFT SIDE: Status Pills & Search */}
      <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
        <div className="flex items-center gap-1 p-1 h-10 bg-surface/40 rounded-lg border border-white/5 backdrop-blur-md overflow-x-auto w-full md:w-auto">
          {statuses.map(status => {
            const isActive = filters.status === status.id;
            return (
              <Magnetic key={status.id}>
                <button
                  onClick={() => handleStatusChange(status.id)}
                  className={`flex items-center justify-center whitespace-nowrap h-full gap-1.5 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {status.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/15 text-white' : 'bg-surface/50 text-text-muted'}`}>
                    {taskCounts[status.id] || 0}
                  </span>
                </button>
              </Magnetic>
            );
          })}
        </div>
        
        <div className="relative group h-10 w-full md:w-64 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-white transition-colors">
            <Search size={14} />
          </div>
          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleFilterChange}
            placeholder="Search tasks..."
            className="pl-9 pr-4 h-full bg-surface/40 hover:bg-surface/60 focus:bg-surface text-white rounded-lg text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all w-full placeholder:text-text-muted/40 border border-white/5"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Filters (Archived, Category, Priority, Sort) */}
      <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
        <label className="flex items-center justify-center gap-2 cursor-pointer px-4 h-10 rounded-lg border border-white/5 bg-surface/40 hover:bg-surface/60 transition-all flex-1 sm:flex-none">
          <input
            type="checkbox"
            name="archived"
            checked={filters.archived || false}
            onChange={(e) => setFilters(prev => ({ ...prev, archived: e.target.checked }))}
            className="w-3.5 h-3.5 rounded text-white focus:ring-violet-500 border-white/20 bg-surface accent-white"
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-white transition-colors">Archived</span>
        </label>

        <select 
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="bg-surface/40 hover:bg-surface/60 focus:bg-surface text-text-muted hover:text-white rounded-lg px-3 h-10 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer border border-white/5 uppercase tracking-wider flex-1 sm:flex-none"
        >
          <option value="all" className="bg-[#0c0c0c] text-white">All Categories</option>
          <option value="work" className="bg-[#0c0c0c] text-white">Work</option>
          <option value="personal" className="bg-[#0c0c0c] text-white">Personal</option>
          <option value="urgent" className="bg-[#0c0c0c] text-white">Urgent</option>
          <option value="uncategorized" className="bg-[#0c0c0c] text-white">Uncategorized</option>
        </select>

        <select 
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="bg-surface/40 hover:bg-surface/60 focus:bg-surface text-text-muted hover:text-white rounded-lg px-3 h-10 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer border border-white/5 uppercase tracking-wider flex-1 sm:flex-none"
        >
          <option value="all" className="bg-[#0c0c0c] text-white">All Priorities</option>
          <option value="low" className="bg-[#0c0c0c] text-white">Low</option>
          <option value="medium" className="bg-[#0c0c0c] text-white">Medium</option>
          <option value="high" className="bg-[#0c0c0c] text-white">High</option>
        </select>

        <div className="flex items-center h-10 bg-surface/40 hover:bg-surface/60 rounded-lg border border-white/5 p-1 transition-all flex-1 sm:flex-none w-full sm:w-auto">
          <select 
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="bg-transparent h-full text-text-muted hover:text-white pl-3 pr-1 text-[11px] font-bold focus:outline-none cursor-pointer uppercase tracking-wider w-full sm:w-auto"
          >
            <option value="createdAt" className="bg-[#0c0c0c] text-white">Sort: Created</option>
            <option value="dueDate" className="bg-[#0c0c0c] text-white">Sort: Due Date</option>
            <option value="priority" className="bg-[#0c0c0c] text-white">Sort: Priority</option>
            <option value="title" className="bg-[#0c0c0c] text-white">Sort: Title</option>
          </select>
          
          <Magnetic>
            <button 
              onClick={toggleOrder}
              className="h-full px-2.5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 rounded-md transition-colors ml-1 shrink-0"
              title={filters.order === 'asc' ? "Ascending" : "Descending"}
            >
              {filters.order === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
});

FilterBar.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string,
    priority: PropTypes.string,
    category: PropTypes.string,
    archived: PropTypes.bool,
    sort: PropTypes.string,
    order: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  taskCounts: PropTypes.object.isRequired,
};

export default FilterBar;
