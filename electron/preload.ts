import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  closeWindow: () => ipcRenderer.invoke('window-close'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  showNotification: (title: string, body: string) => ipcRenderer.invoke('show-notification', title, body),
  
  // Listen for tray menu events
  onFocusAddTodo: (callback: () => void) => {
    ipcRenderer.on('focus-add-todo', callback);
    return () => ipcRenderer.removeListener('focus-add-todo', callback);
  },
  
  onOpenSettings: (callback: () => void) => {
    ipcRenderer.on('open-settings', callback);
    return () => ipcRenderer.removeListener('open-settings', callback);
  }
});
