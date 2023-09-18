import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/baseapp'
  },
  server: {
    headers: {
      "access-control-allow-origin": "*"
    },
    cors: {
      origin: "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 注册自定义组件micro-app 防止控制台警告
          isCustomElement: tag => /^micro-app/.test(tag)
        }
      }
    }
    ),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': fileURLToPath(new URL('./', import.meta.url)),
    }
  }
})
