import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = {
  // Windows ICO sizes
  ico: [16, 24, 32, 48, 64, 128, 256],
  // macOS ICNS sizes
  icns: [16, 32, 64, 128, 256, 512, 1024],
  // PNG sizes for various use cases
  png: [16, 24, 32, 48, 64, 128, 256, 512, 1024]
};

const buildDir = './build';
const svgPath = path.join(buildDir, 'icon.svg');

async function generateIcons() {
  try {
    console.log('🎮 Generating Gaming ToDo app icons...');
    
    // Ensure build directory exists
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    
    // Create subdirectories for different formats
    const iconDir = path.join(buildDir, 'icons');
    if (!fs.existsSync(iconDir)) {
      fs.mkdirSync(iconDir, { recursive: true });
    }
    
    // Read and convert SVG
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate PNG icons
    console.log('📱 Generating PNG icons...');
    for (const size of sizes.png) {
      const outputPath = path.join(iconDir, `icon-${size}x${size}.png`);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`  ✅ Generated ${size}x${size} PNG`);
    }
    
    // Generate specific sizes for electron-builder
    console.log('🖼️ Generating specific app icons...');
    
    // App icon (main)
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(buildDir, 'icon.png'));
    console.log('  ✅ Generated main app icon (512x512)');
    
    // Windows tray icon
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(buildDir, 'tray-icon.png'));
    console.log('  ✅ Generated tray icon (16x16)');
    
    // Windows installer icon
    await sharp(svgBuffer)
      .resize(256, 256)
      .png()
      .toFile(path.join(buildDir, 'installer-icon.png'));
    console.log('  ✅ Generated installer icon (256x256)');
    
    // For Windows ICO format, we'll create a 256x256 PNG that electron-builder can use
    await sharp(svgBuffer)
      .resize(256, 256)
      .png()
      .toFile(path.join(buildDir, 'icon.ico.png'));
    console.log('  ✅ Generated ICO source (256x256)');
    
    // For macOS ICNS format
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .png()
      .toFile(path.join(buildDir, 'icon.icns.png'));
    console.log('  ✅ Generated ICNS source (1024x1024)');
    
    console.log('🎉 All icons generated successfully!');
    console.log(`📁 Icons saved to: ${path.resolve(buildDir)}`);
    
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
