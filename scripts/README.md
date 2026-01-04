# Favicon Generation

This script generates all required favicon files from the existing Odalis logo.

## Setup

1. Install the required dependency:
```bash
npm install sharp --save-dev
```

2. Run the generation script:
```bash
npm run generate-favicons
```

## Generated Files

The script will create the following files in the `/public` directory:

- `favicon.ico` - Multi-size ICO (32x32 PNG format for modern browsers)
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG
- `apple-touch-icon.png` - 180x180 PNG (Apple devices)
- `android-chrome-192x192.png` - 192x192 PNG (PWA)
- `android-chrome-512x512.png` - 512x512 PNG (PWA)

## Notes

- All favicons are generated from `/public/odalis.png`
- Background color is set to brand navy (#0d1f32) for better visibility
- Logo proportions are preserved using `fit: 'contain'`
- Files are optimized for web use

## Manual Alternative

If you prefer to generate favicons manually:

1. Use an online tool like [RealFaviconGenerator](https://realfavicongenerator.net/) or [Favicon.io](https://favicon.io/)
2. Upload `/public/odalis.png` as the source
3. Set background color to `#0d1f32` (navy) if transparency reduces readability
4. Download and place all generated files in `/public` directory
