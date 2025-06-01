import React from 'react';
import { Search, Filter, Zap, Target, CheckCircle } from 'lucide-react';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onSearchChange: (search: string) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  searchTerm,
  onFilterChange,
  onSearchChange,
}) => {
  const filterButtons = [
    { 
      key: 'all', 
      label: 'ALL MISSIONS', 
      color: 'neon-blue', 
      icon: Target,
      bgGlow: 'hover:shadow-blue-500/20' 
    },
    { 
      key: 'active', 
      label: 'ACTIVE', 
      color: 'neon-green', 
      icon: Zap,
      bgGlow: 'hover:shadow-green-500/20' 
    },
    { 
      key: 'completed', 
      label: 'COMPLETED', 
      color: 'neon-purple', 
      icon: CheckCircle,
      bgGlow: 'hover:shadow-purple-500/20' 
    },
  ] as const;
  return (
    <div className="bg-gradient-to-br from-cyber-gray to-cyber-light border-2 border-cyber-light rounded-lg p-4 mb-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-neon-blue rounded-full mr-3 animate-pulse"></div>
        <Filter className="w-4 h-4 text-neon-blue mr-2" />
        <h3 className="text-sm font-gaming font-bold text-neon-blue uppercase tracking-wider">
          MISSION CONTROL
        </h3>
      </div>
      
      {/* Search */}      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary z-10" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Scan for missions..."
          className="w-full bg-cyber-dark border-2 border-cyber-light px-4 py-3 pl-10 text-text-bright placeholder-text-muted focus:border-neon-green focus:outline-none transition-all duration-300 rounded font-gaming text-sm"
          style={{
            boxShadow: searchTerm ? '0 0 10px rgba(0, 255, 136, 0.3)' : 'none'
          }}
        />
      </div>
      
      {/* Filter Buttons */}
      <div className="grid grid-cols-1 gap-2">
        {filterButtons.map(({ key, label, color, icon: IconComponent, bgGlow }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`relative group py-3 px-4 rounded font-gaming font-bold text-xs transition-all duration-300 flex items-center space-x-2 ${bgGlow} ${
              filter === key
                ? `bg-${color} text-cyber-dark shadow-lg border-2 border-${color}`
                : `border-2 border-${color} text-${color} hover:bg-${color} hover:text-cyber-dark bg-cyber-dark/50`
            }`}
            style={{
              boxShadow: filter === key ? `0 0 20px rgba(0, 255, 136, 0.5)` : 'none',
            }}
          >
            <IconComponent className="w-4 h-4" />
            <span className="uppercase tracking-wider">{label}</span>
            {filter === key && (
              <div className="absolute right-2 w-2 h-2 bg-current rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-neon-blue opacity-5 rounded-full blur-xl"></div>
    </div>
  );
};

export default TodoFilters;
