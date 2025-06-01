# Gaming Todo App - Quick Start Guide

## 🚀 Quick Start

### Running the Application
```bash
cd "g:\ElectronJs\todo_react_electron"
npm run dev
```

The app will start in development mode with:
- Web version at: http://localhost:5173
- Electron desktop app window

### Testing the Features

#### 1. Create a Task with Reminder
1. Click the mission input field
2. Enter: "Test the reminder system"
3. Set priority to HIGH
4. Check "SET REMINDER ALARM"
5. Set reminder time to 2-3 minutes from now
6. Click "DEPLOY MISSION"

#### 2. Test Theme Switching
1. Press `Ctrl+,` to open Settings
2. Change "Theme Mode" dropdown
3. Watch the app theme change in real-time
4. Try all three themes:
   - Cyberpunk (blue/green)
   - Dark Matrix (green/black) 
   - Neon Night (pink/purple)

#### 3. Test Focus Mode
1. Create several tasks with different priorities
2. Press `Ctrl+F` to activate Focus Mode
3. Notice high-priority tasks highlighted
4. Listen for the focus mode sound effect

#### 4. Test Audio System
1. Complete a task - hear success sound
2. Delete a task - hear deletion sound
3. Toggle focus mode - hear activation sound
4. Wait for reminder alarm - hear multi-tone alarm

#### 5. Test Keyboard Shortcuts
- `Ctrl+F` - Toggle Focus Mode
- `Ctrl+A` - View Analytics Dashboard
- `Ctrl+,` - Open Settings

#### 6. Test Reminder System
1. Create task with reminder set for 1-2 minutes
2. Watch for browser notification permission request
3. Wait for reminder time - you'll get:
   - Browser push notification
   - Alarm sound effect
   - In-app toast notification
   - Reminder indicator changes

### Expected Behavior

#### Reminder Indicators
- 🔵 **SCHEDULED** - Future reminder (blue badge)
- 🟡 **SOON** - Within 1 hour (yellow badge with glow)
- 🔴 **OVERDUE** - Past due (red badge with pulse)

#### Sound Effects
- **Task Complete**: Rising tone (success)
- **Task Delete**: Falling tone (deletion)
- **Focus Toggle**: Triple tone (mode change)
- **Reminder Alarm**: Multi-tone sequence (urgent)

#### Theme Changes
- **Cyberpunk**: Blue/green neon, dark blue backgrounds
- **Dark Matrix**: Green/black matrix style
- **Neon Night**: Pink/purple neon, dark purple backgrounds

### Troubleshooting

#### No Sound
- Check browser allows audio
- Ensure sound effects enabled in settings
- Some browsers require user interaction before audio

#### No Notifications
- Allow notifications when browser prompts
- Check browser notification settings
- Ensure notifications enabled in app settings

#### Electron App Won't Start
- Ensure all dependencies installed: `npm install`
- Check no other instance running
- Try clearing node_modules and reinstalling

### Development Commands
```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Start built app
npm start
```

### File Locations
- **Settings**: Saved to browser localStorage
- **Tasks**: Saved to browser localStorage
- **Themes**: Applied via CSS classes
- **Audio**: Generated via Web Audio API

The application automatically saves all data to localStorage, so your tasks and settings persist between sessions.
