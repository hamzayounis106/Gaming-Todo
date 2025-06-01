import React, { useState, useEffect } from 'react';
import { X, Minimize2, Square, Copy } from 'lucide-react';

interface TitleBarProps {
  title: string;
  theme?: 'cyberpunk' | 'dark-matrix' | 'neon-night';
}

const TitleBar: React.FC<TitleBarProps> = ({ title, theme = 'cyberpunk' }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const checkMaximizedState = async () => {
      if (window.electronAPI) {
        const maximized = await window.electronAPI.isMaximized();
        setIsMaximized(maximized);
      }
    };

    checkMaximizedState();
  }, []);

  const handleClose = async () => {
    if (window.electronAPI) {
      await window.electronAPI.closeWindow();
    }
  };

  const handleMinimize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.maximizeWindow();
      const maximized = await window.electronAPI.isMaximized();
      setIsMaximized(maximized);
    }
  };
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark-matrix':
        return {
          background: 'bg-gray-900',
          border: 'border-green-500',
          accent: 'text-green-400',
          pulse: 'bg-green-400',
        };
      case 'neon-night':
        return {
          background: 'bg-purple-900',
          border: 'border-pink-500',
          accent: 'text-pink-400',
          pulse: 'bg-pink-400',
        };
      default: // cyberpunk
        return {
          background: 'bg-cyber-dark',
          border: 'border-cyber-light',
          accent: 'text-neon-blue',
          pulse: 'bg-neon-green',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`flex items-center justify-between ${themeClasses.background} border-b ${themeClasses.border} px-4 py-2 select-none app-drag transition-all duration-500`}>      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 ${themeClasses.pulse} rounded-full animate-pulse-neon`}></div>
        <h1 className={`text-lg font-cyber font-bold ${themeClasses.accent} glow-effect`}>
          {title}
        </h1>
      </div>
      
      <div className="flex items-center space-x-2 app-no-drag">
        <button
          onClick={handleMinimize}
          className="p-2 hover:bg-cyber-light rounded transition-colors duration-200 group"
          title="Minimize"
        >
          <Minimize2 className="w-4 h-4 text-gray-400 group-hover:text-neon-blue" />
        </button>
        <button
          onClick={handleMaximize}
          className="p-2 hover:bg-cyber-light rounded transition-colors duration-200 group"
          title={isMaximized ? "Restore Down" : "Maximize"}
        >
          {isMaximized ? (
            <Copy className="w-4 h-4 text-gray-400 group-hover:text-neon-yellow" />
          ) : (
            <Square className="w-4 h-4 text-gray-400 group-hover:text-neon-yellow" />
          )}
        </button>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-red-600 rounded transition-colors duration-200 group"
          title="Close"
        >
          <X className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
