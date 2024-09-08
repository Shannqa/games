import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// const server = import.meta.env.VITE_SERVER;
// const port = import.meta.env.VITE_PORT;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      proxy: {
        "/api": {
          target: `${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_PORT}`,
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
  };
});
