import React, { useState, useEffect } from 'react';
import { X, Minimize2, Square, Copy } from 'lucide-react';

interface TitleBarProps {
  title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
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

  return (
    <div className="flex items-center justify-between bg-cyber-dark border-b border-cyber-light px-4 py-2 select-none app-drag">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse-neon"></div>
        <h1 className="text-lg font-cyber font-bold neon-text glow-effect">
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
