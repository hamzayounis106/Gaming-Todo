/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {      colors: {
        // Gaming-inspired color palette with better contrast
        'neon-green': '#00ff88',
        'neon-blue': '#00d4ff',
        'neon-purple': '#8b5cf6',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffff00',
        'cyber-dark': '#0a0a0f',
        'cyber-gray': '#1a1a2e',
        'cyber-light': '#16213e',
        'glow-blue': '#00bcd4',
        'glow-green': '#4caf50',
        'accent-red': '#ff4444',
        // Better text colors for readability
        'text-bright': '#f8fafc',
        'text-primary': '#e2e8f0',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        'cyber-blue-text': '#66d9ff',
        'cyber-purple-text': '#b794f6',
        'cyber-yellow-text': '#ffd700',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { 
            boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88',
          },
          '100%': { 
            boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
          },
        },
        'glow': {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'slide-in': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'gaming': ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
