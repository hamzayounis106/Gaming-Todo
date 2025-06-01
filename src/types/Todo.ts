export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  category: string;
  reminderTime?: Date;
  isReminderActive?: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
  theme: 'cyberpunk' | 'dark-matrix' | 'neon-night';
}
