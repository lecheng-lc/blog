import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const packageJsonPath = path.join(__dirname, 'package.json')
let packageJson 
async function readPackageJson() {
  try {
    const packageJsonContent =  fs.readFileSync(packageJsonPath, 'utf-8');
    packageJson = JSON.parse(packageJsonContent)
  } catch (error:any) {
    console.error('Error reading package.json:', error.message);
  }
}
readPackageJson()
export default defineConfig({
  base: './',
  build: {
    outDir: `../../dist/${packageJson!.name}`
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': fileURLToPath(new URL('../../', import.meta.url)),
    }
  }
})
