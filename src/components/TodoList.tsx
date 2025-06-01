import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  focusMode?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, focusMode = false }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="w-16 h-16 bg-cyber-gray rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyber-light">
            <span className="text-2xl">🎮</span>
          </div>
        </div>        <h3 className="text-xl font-gaming font-semibold text-text-secondary mb-2">
          NO ACTIVE MISSIONS
        </h3>
        <p className="text-text-muted font-gaming">
          Deploy your first mission to get started!
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4 scrollbar-cyber max-h-96 overflow-y-auto pr-2">      {todos.map((todo) => {
        const shouldDim = focusMode && todo.priority === 'low' && !todo.completed;
        const shouldHighlight = focusMode && todo.priority === 'high' && !todo.completed;
        
        return (
          <div 
            key={todo.id}
            className={`transition-all duration-500 ${
              shouldDim ? 'focus-mode-dim' : 
              shouldHighlight ? 'focus-mode-highlight' : 
              'opacity-100 scale-100'
            }`}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              focusMode={focusMode}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
