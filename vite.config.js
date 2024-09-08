import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const server = import.meta.env.VITE_SERVER;
const port = import.meta.env.VITE_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `${server}:${port}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
