# Gaming ToDo - Electron Desktop App

A sleek, gaming-inspired desktop ToDo application built with Electron, React, Vite, and Tailwind CSS.

## Features

✨ **Gaming-Inspired UI**: Dark theme with neon accents and cyberpunk aesthetics  
🎮 **Desktop Native**: Cross-platform Electron app for Windows, macOS, and Linux  
⚡ **Fast & Modern**: Built with Vite for lightning-fast development  
🎨 **Beautiful Design**: Tailwind CSS with custom gaming color scheme  
📱 **Responsive**: Works perfectly at any window size  
🔥 **Real-time**: Instant updates with smooth animations  

## UI Elements

- **Mission Control Dashboard**: Stats and analytics for your todos
- **Neon Accent Colors**: Bright greens, blues, purples, and reds
- **Custom Fonts**: Orbitron and Rajdhani for that futuristic feel
- **Animated Components**: Smooth transitions and hover effects
- **Priority System**: Visual indicators for task importance
- **Category Organization**: Group tasks by type

## Tech Stack

- **Electron** - Cross-platform desktop app framework
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gaming-todo-electron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   This will start both the Vite dev server and Electron app concurrently.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run dist` - Build and package the app for distribution

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Package for distribution:
   ```bash
   npm run dist
   ```

The packaged app will be available in the `release` directory.

## Project Structure

```
├── electron/           # Electron main process
│   ├── main.ts        # Main Electron process
│   └── tsconfig.json  # TypeScript config for Electron
├── src/               # React application source
│   ├── components/    # React components
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main React component
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles with Tailwind
├── dist/              # Vite build output
├── dist-electron/     # Electron build output
└── release/           # Packaged app output
```

## Features Overview

### Mission Control Dashboard
- Real-time statistics of your tasks
- Completion rate progress bar
- Priority distribution charts
- Motivational status messages

### Task Management
- Add new tasks with priority levels
- Mark tasks as complete
- Delete unwanted tasks
- Search and filter functionality
- Category organization

### Gaming Aesthetics
- Cyberpunk color scheme
- Neon glow effects
- Smooth animations
- Gaming-inspired typography
- Dashboard-style layout

## Customization

The app uses a custom Tailwind configuration with gaming-inspired colors:

- `neon-green`: #00ff88
- `neon-blue`: #00d4ff  
- `neon-purple`: #8b5cf6
- `neon-pink`: #ff0080
- `cyber-dark`: #0a0a0f
- `cyber-gray`: #1a1a2e

You can modify these colors in `tailwind.config.js` to customize the theme.

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Ready to level up your productivity? Deploy your missions and dominate your tasks! 🎮⚡**
