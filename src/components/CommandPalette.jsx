import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Archive, Moon, Sun } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onAction }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const actions = [
    { id: 'create', title: 'Create new task', icon: Plus, keywords: ['new', 'add', 'create'] },
    { id: 'archive', title: 'View archived tasks', icon: Archive, keywords: ['archive', 'view'] },
    { id: 'theme', title: 'Toggle Theme', icon: Moon, keywords: ['theme', 'dark', 'light'] },
  ];

  const filteredActions = actions.filter(action => {
    const searchStr = query.toLowerCase();
    return action.title.toLowerCase().includes(searchStr) || 
           action.keywords.some(k => k.includes(searchStr));
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-surface/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-white/10">
              <Search size={18} className="text-text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none px-3 py-4 text-[14px] text-white placeholder-text-muted/50"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onClose();
                }}
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2 py-1.5">
                    Actions
                  </div>
                  {filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onAction(action.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors group"
                    >
                      <action.icon size={16} className="text-text-muted group-hover:text-white transition-colors" />
                      <span className="text-[13px] font-medium text-text-muted group-hover:text-white transition-colors">
                        {action.title}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-text-muted text-[13px]">
                  No actions found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

CommandPalette.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};
