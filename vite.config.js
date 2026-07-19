import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Programmable copy of generated illustrations since terminal commands are restricted
const srcDir = 'C:\\Users\\rakat\\.gemini\\antigravity\\brain\\d7eee0f2-9a6f-49cf-a3e8-364f9bf3c4fd';
const destDir = path.resolve('src/assets/images');

const filesToCopy = {
  'bima_illustration_1784085067872.png': 'bima.png',
  'sari_illustration_1784085083559.png': 'sari.png',
  'dodi_illustration_1784085100532.png': 'dodi.png',
  'nadia_illustration_1784085113903.png': 'nadia.png',
  'wulan_citra_illustration_1784085128254.png': 'wulan_citra.png'
};

if (!fs.existsSync(destDir)){
  fs.mkdirSync(destDir, { recursive: true });
}

Object.entries(filesToCopy).forEach(([srcName, destName]) => {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcName} to ${destName}`);
    } catch (err) {
      console.error(`Error copying ${srcName}:`, err);
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    allowedHosts: true,
  }
})


