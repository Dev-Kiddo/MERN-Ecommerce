import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          utils: ["lodash", "dayjs"],
        },
      },
    },
  },
});

//   server: {
//   proxy: {
//     "/api": {
//       target: "http://localhost:5000",
//     },
//   },
// },
