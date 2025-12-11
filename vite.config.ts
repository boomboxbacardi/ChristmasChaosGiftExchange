import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the app works under sub-paths (e.g. GitHub Pages)
  base: "./",
});
