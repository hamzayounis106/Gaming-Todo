import { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import AddTodo from './components/AddTodo';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { Todo, TodoState } from './types/Todo';

const STORAGE_KEY = 'gaming-todo-data';

function App() {  const [state, setState] = useState<TodoState>({
    todos: [],
    filter: 'all',
    searchTerm: '',
    theme: 'cyberpunk',
  });// UI state management
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState('real-time');
  const [notification, setNotification] = useState<string | null>(null);
  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setState(prev => ({
          ...prev,
          todos: parsed.todos?.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            reminderTime: todo.reminderTime ? new Date(todo.reminderTime) : undefined,
          })) || [],
          theme: parsed.theme || 'cyberpunk',
        }));
      } catch (error) {
        console.error('Failed to load saved todos:', error);
      }
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);  // Save to localStorage whenever todos or theme change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      todos: state.todos,
      theme: state.theme,
    }));
  }, [state.todos, state.theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setFocusMode(!focusMode);
      }
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        setShowAnalytics(!showAnalytics);
      }
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        setShowSettings(!showSettings);
      }
    };    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode, showAnalytics, showSettings]);

  // Reminder checking system
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      state.todos.forEach(todo => {
        if (
          todo.isReminderActive &&
          todo.reminderTime &&
          !todo.completed &&
          todo.reminderTime <= now &&
          todo.reminderTime > new Date(now.getTime() - 60000) // Within last minute
        ) {
          // Show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(`🎯 Mission Reminder`, {
              body: `Time to work on: ${todo.text}`,
              icon: '/favicon.ico',
              badge: '/favicon.ico',
              tag: todo.id,
              requireInteraction: true,
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }          // Play alarm sound
          if (soundEffects) {
            playAlarmSound();
          }

          // Show in-app notification
          setNotification(`⏰ Reminder: ${todo.text}`);
          setTimeout(() => setNotification(null), 5000);

          // Disable reminder to prevent repeated notifications
          setState(prev => ({
            ...prev,
            todos: prev.todos.map(t =>
              t.id === todo.id ? { ...t, isReminderActive: false } : t
            ),
          }));
        }
      });
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [state.todos, soundEffects]);
  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      todos: [newTodo, ...prev.todos],
    }));

    // Play add sound effect
    playActionSound('add');
    
    // Show notification for new task
    if (notifications) {
      setNotification(`New mission added: ${newTodo.text} 🎯`);
      setTimeout(() => setNotification(null), 3000);
    }
  };
  const toggleTodo = (id: string) => {
    const todo = state.todos.find(t => t.id === id);
    const wasCompleted = todo?.completed;
    
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));    // Play completion sound if enabled and task was just completed
    if (soundEffects && !wasCompleted) {
      // Create a simple audio beep using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log('Audio not supported');
      }
    }

    // Show notification if enabled and task was just completed
    if (notifications && !wasCompleted && todo) {
      setNotification(`Mission "${todo.text}" completed! 🎯`);
      setTimeout(() => setNotification(null), 3000);
    }
  };  const deleteTodo = (id: string) => {
    const todo = state.todos.find(t => t.id === id);
    
    setState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => todo.id !== id),
    }));

    // Play delete sound effect
    playActionSound('delete');
    
    // Show notification for deleted task
    if (notifications && todo) {
      setNotification(`Mission deleted: ${todo.text} 🗑️`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Enhanced sound effects system
  const playAlarmSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create alarm-like sound pattern
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Alarm pattern: beep-beep-beep with increasing frequency
      const currentTime = audioContext.currentTime;
      playTone(800, currentTime, 0.2);
      playTone(1000, currentTime + 0.3, 0.2);
      playTone(1200, currentTime + 0.6, 0.3);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playActionSound = (type: 'add' | 'delete' | 'focus') => {
    if (!soundEffects) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'add':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
          break;
        case 'delete':
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
          break;
        case 'focus':
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.05);
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
          break;
      }
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const updateFilter = (filter: 'all' | 'active' | 'completed') => {
    setState(prev => ({ ...prev, filter }));
  };  const updateSearch = (searchTerm: string) => {
    setState(prev => ({ ...prev, searchTerm }));
  };
  // Quick actions handlers
  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };
  const handleToggleFocusMode = () => {
    setFocusMode(!focusMode);
    playActionSound('focus');
    
    // Show notification for focus mode change
    if (notifications) {
      setNotification(`Focus mode ${!focusMode ? 'activated' : 'deactivated'} 🎯`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleOpenSettings = () => {
    setShowSettings(!showSettings);
  };
  // Filter todos based on current filter and search term
  const filteredTodos = state.todos.filter(todo => {
    const matchesFilter = 
      state.filter === 'all' ||
      (state.filter === 'active' && !todo.completed) ||
      (state.filter === 'completed' && todo.completed);

    const matchesSearch = 
      state.searchTerm === '' ||
      todo.text.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(state.searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Theme-specific classes
  const getThemeClasses = () => {
    switch (state.theme) {
      case 'dark-matrix':
        return {
          background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
          accent: 'text-green-400',
          border: 'border-green-500',
          glow: 'shadow-green-500/20',
        };
      case 'neon-night':
        return {
          background: 'bg-gradient-to-br from-purple-900 via-black to-pink-900',
          accent: 'text-pink-400',
          border: 'border-pink-500',
          glow: 'shadow-pink-500/20',
        };
      default: // cyberpunk
        return {
          background: 'bg-cyber-gradient',
          accent: 'text-neon-blue',
          border: 'border-neon-blue',
          glow: 'shadow-neon-blue/20',
        };
    }
  };

  const themeClasses = getThemeClasses();  return (
    <div className={`h-screen ${themeClasses.background} flex flex-col transition-all duration-500 theme-${state.theme}`}>
      <TitleBar title="GAMING TODO" theme={state.theme} />
        <div className="flex-1 flex overflow-hidden">        {/* Enhanced Sidebar */}
        <div className={`w-80 bg-gradient-to-b from-cyber-dark to-cyber-gray border-r-2 ${themeClasses.border} shadow-lg relative overflow-hidden transition-all duration-500`}>          {/* Sidebar Header */}
          <div className={`bg-cyber-dark border-b ${themeClasses.border} p-4`}>            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-4 h-4 ${themeClasses.accent.replace('text-', 'bg-')} rounded-full animate-pulse-neon`}></div>
              <h2 className={`text-lg font-cyber font-bold ${themeClasses.accent} glow-effect`}>
                COMMAND CENTER
              </h2>
            </div><div className="text-xs font-gaming text-text-muted uppercase tracking-wider">
              Mission Control Interface
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="p-6 overflow-y-auto scrollbar-cyber h-full">
            <TodoStats todos={state.todos} />
            <TodoFilters
              filter={state.filter}
              searchTerm={state.searchTerm}
              onFilterChange={updateFilter}
              onSearchChange={updateSearch}
            />
              {/* Quick Actions Panel */}
            <div className="bg-cyber-gray border border-cyber-light rounded-lg p-4 mb-4">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div>
                <h3 className="text-sm font-gaming font-semibold text-neon-green uppercase">
                  Quick Actions
                </h3>
              </div>              <div className="space-y-2">
                <button 
                  onClick={handleViewAnalytics}
                  className={`w-full text-left px-3 py-2 text-xs font-gaming transition-all duration-200 rounded flex items-center justify-between ${
                    showAnalytics 
                      ? 'text-neon-green bg-cyber-light border border-neon-green' 
                      : 'text-text-secondary hover:text-neon-green hover:bg-cyber-light'
                  }`}
                >
                  <span>📊 {showAnalytics ? 'Hide Analytics' : 'View Analytics'}</span>
                  <span className="text-xs text-text-muted">Ctrl+A</span>
                </button>
                <button 
                  onClick={handleToggleFocusMode}
                  className={`w-full text-left px-3 py-2 text-xs font-gaming transition-all duration-200 rounded flex items-center justify-between ${
                    focusMode 
                      ? 'text-neon-blue bg-cyber-light border border-neon-blue' 
                      : 'text-text-secondary hover:text-neon-blue hover:bg-cyber-light'
                  }`}
                >
                  <span>🎯 {focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
                  <span className="text-xs text-text-muted">Ctrl+F</span>
                </button>
                <button 
                  onClick={handleOpenSettings}
                  className={`w-full text-left px-3 py-2 text-xs font-gaming transition-all duration-200 rounded flex items-center justify-between ${
                    showSettings 
                      ? 'text-neon-purple bg-cyber-light border border-neon-purple' 
                      : 'text-text-secondary hover:text-neon-purple hover:bg-cyber-light'
                  }`}
                >
                  <span>⚙️ Settings</span>
                  <span className="text-xs text-text-muted">Ctrl+,</span>
                </button>
              </div>
            </div>            {/* System Status */}
            <div className="bg-cyber-gray border border-cyber-light rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-neon-yellow rounded-full mr-2"></div>
                <h3 className="text-sm font-gaming font-semibold text-neon-yellow uppercase">
                  System Status
                </h3>
              </div>
              <div className="space-y-2 text-xs font-gaming">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Connection:</span>
                  <span className="text-neon-green">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Data Sync:</span>
                  <span className="text-neon-blue">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Performance:</span>
                  <span className="text-neon-purple">OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Background Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-green opacity-5 rounded-full blur-xl"></div>
          </div>
        </div>        {/* Main Content */}
        <div className={`flex-1 p-6 overflow-y-auto scrollbar-cyber relative ${
          focusMode ? 'bg-gradient-to-br from-cyber-dark to-cyber-gray' : ''
        }`}>
          {focusMode && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-neon-green bg-opacity-20 border border-neon-green rounded-lg px-3 py-1">
                <span className="text-xs font-gaming text-neon-green font-bold">🎯 FOCUS MODE</span>
              </div>
            </div>
          )}
          <div className="max-w-4xl mx-auto">
            <AddTodo onAddTodo={addTodo} />
            
            <div className="bg-cyber-gray border border-cyber-light rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-gaming font-bold text-neon-blue">
                    MISSION BRIEFING
                  </h2>
                </div>                <div className="text-sm font-gaming text-text-secondary">
                  {filteredTodos.length} {state.filter.toUpperCase()} MISSION{filteredTodos.length !== 1 ? 'S' : ''}
                </div>
              </div>
                <TodoList
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                focusMode={focusMode}
              />
            </div>
          </div>        </div>
      </div>      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-cyber-gray border-2 border-neon-green rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-cyber font-bold text-neon-green">Mission Analytics</h3>
              <button 
                onClick={() => setShowAnalytics(false)}
                className="text-text-secondary hover:text-accent-red transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-cyber-dark rounded-lg p-4">
                <div className="text-sm font-gaming text-text-secondary mb-2">Total Missions</div>
                <div className="text-2xl font-cyber font-bold text-neon-blue">{state.todos.length}</div>
              </div>
              <div className="bg-cyber-dark rounded-lg p-4">
                <div className="text-sm font-gaming text-text-secondary mb-2">Completed</div>
                <div className="text-2xl font-cyber font-bold text-neon-green">
                  {state.todos.filter(t => t.completed).length}
                </div>
              </div>
              <div className="bg-cyber-dark rounded-lg p-4">
                <div className="text-sm font-gaming text-text-secondary mb-2">Success Rate</div>
                <div className="text-2xl font-cyber font-bold text-neon-purple">
                  {state.todos.length > 0 
                    ? Math.round((state.todos.filter(t => t.completed).length / state.todos.length) * 100)
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-cyber-gray border-2 border-neon-purple rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-cyber font-bold text-neon-purple">System Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-text-secondary hover:text-accent-red transition-colors"
              >
                ✕
              </button>
            </div>            <div className="space-y-4">
              <div className="bg-cyber-dark rounded-lg p-4">
                <label className="block text-sm font-gaming text-text-secondary mb-2">
                  Auto-save Interval
                </label>
                <select 
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(e.target.value)}
                  className="w-full bg-cyber-light border border-cyber-light rounded px-3 py-2 text-text-primary font-gaming"
                >
                  <option value="real-time">Real-time</option>
                  <option value="30s">Every 30 seconds</option>
                  <option value="1m">Every minute</option>
                </select>
              </div>              <div className="bg-cyber-dark rounded-lg p-4">
                <label className="block text-sm font-gaming text-text-secondary mb-2">
                  Theme Mode
                </label>
                <select 
                  value={state.theme}
                  onChange={(e) => setState(prev => ({ 
                    ...prev, 
                    theme: e.target.value as 'cyberpunk' | 'dark-matrix' | 'neon-night' 
                  }))}
                  className="w-full bg-cyber-light border border-cyber-light rounded px-3 py-2 text-text-primary font-gaming"
                >
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="dark-matrix">Dark Matrix</option>
                  <option value="neon-night">Neon Night</option>
                </select>
              </div>
              <div className="bg-cyber-dark rounded-lg p-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                  />
                  <span className="text-sm font-gaming text-text-secondary">
                    Enable sound effects
                  </span>
                </label>
              </div>
              <div className="bg-cyber-dark rounded-lg p-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="text-sm font-gaming text-text-secondary">
                    Show notifications
                  </span>
                </label>
              </div>
            </div>
          </div>        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-cyber-gray border-2 border-neon-green rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-sm font-gaming text-text-bright">{notification}</span>
            </div>
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-green opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-neon-purple opacity-10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}

export default App;
