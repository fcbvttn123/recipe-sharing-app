import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/api/recipe": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/auth": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/api/chat": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   "/uploads": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
})
