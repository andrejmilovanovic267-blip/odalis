/**
 * Generate Apple Touch Icon from existing Odalis logo
 * 
 * Prerequisites:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-apple-touch-icon.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceLogo = path.join(__dirname, '../public/odalis.png');
const outputPath = path.join(__dirname, '../public/apple-touch-icon.png');
const publicDir = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Check if source logo exists
if (!fs.existsSync(sourceLogo)) {
  console.error('Error: Source logo not found at', sourceLogo);
  process.exit(1);
}

async function generateAppleTouchIcon() {
  console.log('Generating Apple Touch Icon from', sourceLogo);
  
  try {
    // Generate 180x180 Apple Touch Icon with navy background
    await sharp(sourceLogo)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 13, g: 31, b: 50, alpha: 1 } // Navy background: #0d1f32
      })
      .png()
      .toFile(outputPath);
    
    console.log('✓ Generated apple-touch-icon.png (180x180)');
    console.log('File created at:', outputPath);
    console.log('\n✅ Apple Touch Icon generated successfully!');
    
  } catch (error) {
    console.error('Error generating Apple Touch Icon:', error);
    process.exit(1);
  }
}

generateAppleTouchIcon();
