import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const port = import.meta.env.VITE_PORT;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${port}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
