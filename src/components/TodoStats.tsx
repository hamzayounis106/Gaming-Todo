import React from 'react';
import { BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Todo } from '../types/Todo';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const highPriorityTodos = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
  
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const stats = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: 'Total Missions',
      value: totalTodos,
      color: 'neon-blue',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      label: 'Completed',
      value: completedTodos,
      color: 'neon-green',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Active',
      value: activeTodos,
      color: 'neon-yellow',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: 'High Priority',
      value: highPriorityTodos,
      color: 'accent-red',
    },
  ];

  return (
    <div className="bg-cyber-gray border border-cyber-light rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-5 h-5 text-neon-purple mr-2" />
        <h3 className="text-lg font-gaming font-semibold text-neon-purple">
          MISSION ANALYTICS
        </h3>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-gaming text-text-secondary">COMPLETION RATE</span>
          <span className="text-lg font-gaming font-bold text-neon-green">
            {completionRate}%
          </span>
        </div>
        <div className="w-full bg-cyber-dark rounded-full h-3 border border-cyber-light">
          <div
            className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          >
            <div className="h-full bg-neon-green rounded-full animate-pulse-neon"></div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-cyber-dark border border-cyber-light rounded-lg p-4 hover:border-opacity-50 transition-all duration-300"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className={`flex items-center space-x-3 text-${stat.color}`}>
              {stat.icon}              <div>
                <p className="text-xs font-gaming text-text-muted uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-gaming font-bold">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoStats;
