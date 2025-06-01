import React from 'react';
import { Check, Trash2, AlertCircle, Clock, Star, Bell, BellOff } from 'lucide-react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  focusMode?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, focusMode = false }) => {
  const getPriorityIcon = () => {
    switch (todo.priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-accent-red" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-neon-yellow" />;
      case 'low':
        return <Star className="w-4 h-4 text-neon-green" />;
    }
  };

  const getPriorityBorder = () => {
    switch (todo.priority) {
      case 'high': return 'border-l-accent-red';
      case 'medium': return 'border-l-neon-yellow';
      case 'low': return 'border-l-neon-green';
    }
  };  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getReminderStatus = () => {
    if (!todo.reminderTime) return null;
    
    const now = new Date();
    const reminderTime = new Date(todo.reminderTime);
    
    if (todo.completed) {
      return null;
    }
    
    if (reminderTime <= now) {
      return 'overdue';
    }
    
    const timeDiff = reminderTime.getTime() - now.getTime();
    const hoursUntil = timeDiff / (1000 * 60 * 60);
    
    if (hoursUntil <= 1) {
      return 'soon';
    }
    
    return 'scheduled';
  };
  return (
    <div className={`task-card border-l-4 ${getPriorityBorder()} animate-fade-in ${
      focusMode && todo.priority === 'high' && !todo.completed 
        ? 'ring-2 ring-neon-green ring-opacity-50 shadow-lg shadow-neon-green/20' 
        : ''
    }`}>
      <div className="flex items-start space-x-3"><button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'bg-neon-green border-neon-green text-cyber-dark'
              : 'border-text-secondary hover:border-neon-green'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>
          <div className="flex-1 min-w-0">          <div className="flex items-center space-x-2 mb-2">
            {getPriorityIcon()}
            <span className="text-xs font-gaming text-text-muted uppercase tracking-wider">
              {todo.category}
            </span>
            {/* Reminder indicator */}
            {todo.reminderTime && !todo.completed && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-gaming ${
                getReminderStatus() === 'overdue' 
                  ? 'bg-accent-red bg-opacity-20 text-accent-red border border-accent-red' :
                getReminderStatus() === 'soon'
                  ? 'bg-neon-yellow bg-opacity-20 text-neon-yellow border border-neon-yellow' :
                  'bg-neon-blue bg-opacity-20 text-neon-blue border border-neon-blue'
              }`}>
                {todo.isReminderActive ? (
                  <Bell className="w-3 h-3" />
                ) : (
                  <BellOff className="w-3 h-3" />
                )}
                <span>
                  {getReminderStatus() === 'overdue' ? 'OVERDUE' :
                   getReminderStatus() === 'soon' ? 'SOON' : 'SCHEDULED'}
                </span>
              </div>
            )}
          </div>
          <p
            className={`font-gaming text-lg ${
              todo.completed
                ? 'text-text-muted line-through'
                : 'text-text-bright'
            }`}
          >
            {todo.text}
          </p>
            <p className="text-xs text-text-secondary mt-2 font-gaming">
            Created: {formatDate(todo.createdAt)}
            {todo.reminderTime && (
              <span className="ml-3">
                • Reminder: {formatDate(todo.reminderTime)}
              </span>
            )}
          </p>
        </div>
          <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 p-2 text-text-secondary hover:text-accent-red transition-colors duration-200 group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
