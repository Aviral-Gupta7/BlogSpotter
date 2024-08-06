import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const port = process.env.VITE_BACKEND_PORT;
  const target = `http://localhost:${port}`;

  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: target,
          secure: false,
        },
      },
    },
    plugins: [react()],
  });
};
// https://vitejs.dev/config/
