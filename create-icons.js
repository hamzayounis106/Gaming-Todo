// Script to create basic icons for the app build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG icon that we can convert to other formats
const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cyberpunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ff88;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0099ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8800ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="128" cy="128" r="120" fill="url(#cyberpunkGrad)" opacity="0.9"/>
  <circle cx="128" cy="128" r="110" fill="#1a1a2e" stroke="#00ff88" stroke-width="3"/>
  
  <!-- Gaming controller style checkmark -->
  <path d="M80 130 L110 160 L180 90" stroke="#00ff88" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Cyberpunk style corners -->
  <path d="M40 40 L60 40 L60 60" stroke="#0099ff" stroke-width="3" fill="none"/>
  <path d="M196 40 L216 40 L216 60" stroke="#0099ff" stroke-width="3" fill="none"/>
  <path d="M40 216 L60 216 L60 196" stroke="#0099ff" stroke-width="3" fill="none"/>
  <path d="M196 216 L216 216 L216 196" stroke="#0099ff" stroke-width="3" fill="none"/>
  
  <!-- Gaming dots -->
  <circle cx="200" cy="80" r="4" fill="#ff0080"/>
  <circle cx="210" cy="70" r="3" fill="#00ff88"/>
  <circle cx="190" cy="70" r="3" fill="#0099ff"/>
</svg>`;

// Write the SVG file
fs.writeFileSync(path.join(__dirname, 'build', 'icon.svg'), iconSvg);

console.log('Created icon.svg in build directory');
console.log('Note: For production, convert this SVG to:');
console.log('- icon.ico (256x256, 128x128, 64x64, 32x32, 16x16)');
console.log('- icon.png (512x512)');
console.log('- icon.icns (for macOS)');
console.log('- tray-icon.png (16x16 for system tray)');
