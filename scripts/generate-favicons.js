/**
 * Generate favicon files from existing Odalis logo
 * 
 * Prerequisites:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceLogo = path.join(__dirname, '../public/odalis.png');
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

// Favicon sizes to generate
const faviconSizes = [
  { name: 'favicon.ico', sizes: [16, 32, 48] }, // Multi-size ICO
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicons from', sourceLogo);
  
  try {
    // Generate PNG favicons
    for (const favicon of faviconSizes) {
      if (favicon.size) {
        const outputPath = path.join(publicDir, favicon.name);
        await sharp(sourceLogo)
          .resize(favicon.size, favicon.size, {
            fit: 'contain',
            background: { r: 13, g: 31, b: 50, alpha: 1 } // Navy background: #0d1f32
          })
          .png()
          .toFile(outputPath);
        console.log(`✓ Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
      }
    }

    // Generate ICO file (multi-size)
    // Note: sharp doesn't support ICO directly, so we'll create a 32x32 PNG as favicon.ico
    // Most modern browsers accept PNG as favicon.ico
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(sourceLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 13, g: 31, b: 50, alpha: 1 }
      })
      .png()
      .toFile(icoPath);
    console.log('✓ Generated favicon.ico (32x32 PNG format)');

    console.log('\n✅ All favicons generated successfully!');
    console.log('Files created in:', publicDir);
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
