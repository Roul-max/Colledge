import PropTypes from 'prop-types';
import { Zap, Plus, Search, Command } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic.jsx';

export default function Navbar({ onAddTask, onOpenCommandPalette }) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-surface/40 backdrop-blur-2xl border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between relative">
        <Magnetic>
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="bg-primary text-white p-1 rounded-md shadow-[0_0_18px_rgba(124,58,237,0.35)]"
            >
              <Zap size={14} className="fill-current" />
            </motion.div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[14px] font-display font-semibold text-white tracking-tight leading-none">TaskFlow</h1>
            </div>
          </div>
        </Magnetic>
        
        <div className="flex items-center gap-4">
          <Magnetic>
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface/50 border border-white/10 hover:border-white/20 text-text-muted hover:text-white transition-all text-xs font-medium"
            >
              <Search size={14} />
              <span>Search...</span>
              <div className="flex items-center gap-1 ml-4">
                <Command size={10} />
                <span className="font-mono text-[10px]">K</span>
              </div>
            </button>
          </Magnetic>

          <Magnetic>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddTask}
              className="premium-btn flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold tracking-wide"
              aria-label="Add new task"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>+ Add Task</span>
            </motion.button>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  onOpenCommandPalette: PropTypes.func,
};
