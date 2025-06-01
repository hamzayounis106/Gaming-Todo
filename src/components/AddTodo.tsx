import React, { useState } from 'react';
import { Plus, Zap, Bell } from 'lucide-react';
import { Todo } from '../types/Todo';

interface AddTodoProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('General');
  const [reminderTime, setReminderTime] = useState('');
  const [isReminderActive, setIsReminderActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const todoData: Omit<Todo, 'id' | 'createdAt'> = {
        text: text.trim(),
        completed: false,
        priority,
        category,
        reminderTime: isReminderActive && reminderTime ? new Date(reminderTime) : undefined,
        isReminderActive: isReminderActive && reminderTime ? true : false,
      };
      onAddTodo(todoData);
      setText('');
      setReminderTime('');
      setIsReminderActive(false);
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-accent-red border-accent-red';
      case 'medium': return 'text-neon-yellow border-neon-yellow';
      case 'low': return 'text-neon-green border-neon-green';
      default: return 'text-neon-blue border-neon-blue';
    }
  };

  return (
    <div className="bg-cyber-gray border border-cyber-light rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Zap className="w-5 h-5 text-neon-green mr-2" />
        <h2 className="text-xl font-gaming font-semibold text-neon-green">
          ADD NEW MISSION
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your mission objective..."
            className="w-full cyber-input rounded font-gaming"
            autoFocus
          />
        </div>
        
        <div className="flex space-x-4">          <div className="flex-1">
            <label className="block text-sm font-gaming text-text-secondary mb-2">
              PRIORITY LEVEL
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className={`w-full cyber-input rounded font-gaming ${getPriorityColor(priority)}`}
            >
              <option value="low">🟢 LOW</option>
              <option value="medium">🟡 MEDIUM</option>
              <option value="high">🔴 HIGH</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-gaming text-text-secondary mb-2">
              CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full cyber-input rounded font-gaming text-neon-blue border-neon-blue"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
            </select>          </div>
        </div>
        
        {/* Reminder Section */}
        <div className="bg-cyber-dark border border-cyber-light rounded-lg p-4">
          <div className="flex items-center mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isReminderActive}
                onChange={(e) => setIsReminderActive(e.target.checked)}
                className="w-4 h-4 text-neon-purple"
              />
              <span className="text-sm font-gaming text-neon-purple font-semibold">
                🔔 SET REMINDER ALARM
              </span>
            </label>
          </div>
          
          {isReminderActive && (
            <div className="space-y-2">
              <label className="block text-xs font-gaming text-text-secondary mb-1">
                REMINDER DATE & TIME
              </label>
              <input
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full cyber-input rounded font-gaming text-neon-purple border-neon-purple"
              />
              <p className="text-xs text-text-muted font-gaming">
                You'll receive a push notification at the specified time
              </p>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full cyber-button rounded flex items-center justify-center space-x-2 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>DEPLOY MISSION</span>
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
