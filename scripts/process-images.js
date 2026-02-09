const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    { src: 'public/bright_bg.JPG', dest: 'public/bright_bg_optimized.jpg' },
    { src: 'public/dark_bg.JPG', dest: 'public/dark_bg_optimized.jpg' }
];

async function processImages() {
    for (const img of images) {
        try {
            if (fs.existsSync(img.src)) {
                await sharp(img.src)
                    .resize(800, 800, {
                        fit: 'cover',
                        position: 'center'
                    })
                    .jpeg({ quality: 80 })
                    .toFile(img.dest);
                console.log(`Processed ${img.src} -> ${img.dest}`);
            } else {
                console.warn(`Source image not found: ${img.src}`);
            }
        } catch (err) {
            console.error(`Error processing ${img.src}:`, err);
        }
    }
}

processImages();
